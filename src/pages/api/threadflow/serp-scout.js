import { createClient } from '@supabase/supabase-js'
import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'
import { verifyRequestUser } from '@/lib/serverAuth'
import { getCompanyContext, saveCompanyContext } from '@/lib/companyContext'

const OPENROUTER_ENDPOINT = process.env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ''
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'google/gemma-3-27b-it:free'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const CONTEXT_PAGE_PATHS = ['', '/product', '/features', '/pricing', '/about']
const MAX_PAGE_CHARS = 3000
const MAX_PAGES = 4
const CONTEXT_TEMPERATURE = 0.25
const CONTEXT_MAX_TOKENS = 1400
const KEYWORD_TEMPERATURE = 0.65
const KEYWORD_MAX_TOKENS = 1024
const SUPERLATIVE_REGEX = /\b(best|leading|top|premier|world[- ]class|industry[- ]leading|cutting[- ]edge|#1)\b/gi
const CTA_REGEX = /\b(visit|click|learn more|book (now|a demo)?|download|try now|get started|sign up|subscribe|unlock|schedule)\b/gi
const defaultConstraints = [
  'Stay neutral, factual, and respectful in tone.',
  'Do not use marketing adjectives or calls to action.',
  'Base every signal on information visible on the scraped pages.'
]

const DATAFORSEO_TASK_POST = 'https://api.dataforseo.com/v3/serp/google/organic/task_post'
const DATAFORSEO_TASK_GET = 'https://api.dataforseo.com/v3/serp/google/organic/task_get'
const DATAFORSEO_USERNAME = process.env.DATAFORSEO_USERNAME
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD
const DATAFORSEO_LANGUAGE = process.env.DATAFORSEO_LANGUAGE || 'English'
const DATAFORSEO_LOCATION = process.env.DATAFORSEO_LOCATION || 'United States'
const DATAFORSEO_POLL_INTERVAL = 3000
const DATAFORSEO_POLL_TIMEOUT = 30_000

function ensureDomain(input) {
  if (!input) return null
  return input
    .toString()
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .replace(/\s+/g, '')
}

function createDataForSeoAuthHeader() {
  if (!DATAFORSEO_USERNAME || !DATAFORSEO_PASSWORD) return null
  const token = Buffer.from(`${DATAFORSEO_USERNAME}:${DATAFORSEO_PASSWORD}`).toString('base64')
  return `Basic ${token}`
}

async function fetchViaDataForSeo(domain) {
  const authHeader = createDataForSeoAuthHeader()
  if (!authHeader) {
    throw new Error('DataForSEO credentials are missing')
  }

  console.debug('[serp-scout] using DataForSEO auth header', {
    username: DATAFORSEO_USERNAME ? `${DATAFORSEO_USERNAME.slice(0, 3)}***` : null,
    hasPassword: Boolean(DATAFORSEO_PASSWORD)
  })

  const payload = {
    include_history: false,
    language_name: DATAFORSEO_LANGUAGE,
    location_name: DATAFORSEO_LOCATION,
    keyword: `site:${domain}`,
    priority: 'low',
    search_engine: 'google.com'
  }

  const postResp = await fetch(DATAFORSEO_TASK_POST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader
    },
    body: JSON.stringify(payload)
  })
  console.debug('[serp-scout] DataForSEO task_post status', postResp.status)
  if (!postResp.ok) {
    const body = await postResp.text()
    console.error('[serp-scout] DataForSEO task_post error', { status: postResp.status, body })
    throw new Error(`DataForSEO task_post failed: ${postResp.status} ${body}`)
  }
  const { tasks } = await postResp.json()
  const task = Array.isArray(tasks) ? tasks[0] : null
  if (!task) {
    throw new Error('DataForSEO task_post returned no tasks')
  }

  const start = Date.now()
  while (Date.now() - start < DATAFORSEO_POLL_TIMEOUT) {
    const getResp = await fetch(`${DATAFORSEO_TASK_GET}/${task.id}`, {
      headers: {
        Authorization: authHeader
      }
    })
    console.debug('[serp-scout] DataForSEO task_get status', getResp.status)
    if (!getResp.ok) {
      const body = await getResp.text()
      console.error('[serp-scout] DataForSEO task_get error', { status: getResp.status, body })
      throw new Error(`DataForSEO task_get failed: ${getResp.status} ${body}`)
    }
    const getJson = await getResp.json()
    const current = Array.isArray(getJson.tasks) ? getJson.tasks[0] : null
    if (current?.status === 'ready') {
      const items = current.result?.[0]?.items ?? []
      const snippets = items.map((item) => {
        const textParts = []
        if (item.title) textParts.push(item.title)
        if (item.snippet) textParts.push(item.snippet)
        if (item.page_context?.text) textParts.push(item.page_context.text)
        return textParts.join(' ')
      })
      const merged = snippets.filter(Boolean).join('\n')
      if (merged) return merged
      throw new Error('DataForSEO task produced no searchable text')
    }
    await new Promise((resolve) => setTimeout(resolve, DATAFORSEO_POLL_INTERVAL))
  }
  throw new Error('DataForSEO task timed out after waiting for results')
}

async function fetchLandingPage(domain) {
  const url = `https://${domain}`
  try {
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Threadflow-SerpScout/1.0'
      }
    })
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`)
    }
    return resp.text()
  } catch (error) {
    console.warn('[serp-scout] direct fetch failed', { domain, error: error.message })
    const authHeader = createDataForSeoAuthHeader()
    if (!authHeader) {
      throw new Error(
        `Unable to reach ${domain} directly (${error.message}). Configure DataForSEO credentials or ensure the domain allows direct requests.`
      )
    }
    try {
      return await fetchViaDataForSeo(domain)
    } catch (fallbackError) {
      throw new Error(
        `DataForSEO fallback failed (${fallbackError.message}). Check that DATAFORSEO_USERNAME and DATAFORSEO_PASSWORD are correct.`
      )
    }
  }
}

function buildPageUrls(domain) {
  const base = domain.includes('://') ? domain : `https://${domain}`
  try {
    const parsed = new URL(base)
    const origin = parsed.origin
    const seen = new Set()
    const candidates = []
    CONTEXT_PAGE_PATHS.forEach((path) => {
      if (candidates.length >= MAX_PAGES) return
      const url = path ? `${origin}${path}` : origin
      if (!seen.has(url)) {
        seen.add(url)
        candidates.push(url)
      }
    })
    return candidates
  } catch (error) {
    return []
  }
}

async function fetchPageText(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Threadflow-Context-Scanner/1.0'
      }
    })
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const html = await resp.text()
    const dom = new JSDOM(html, { url })
    const reader = new Readability(dom.window.document)
    const article = reader.parse()
    const rawText = (article?.textContent ?? dom.window.document.body?.textContent ?? '').replace(/\s+/g, ' ')
    const cleaned = rawText.replace(/https?:\/\/\S+/g, '').trim()
    return { url, text: cleaned.slice(0, MAX_PAGE_CHARS) }
  } catch (error) {
    console.warn('[serp-scout] skip page', url, error.message)
    return null
  }
}

async function createCompanyIfNeeded(companyName, domain, userId) {
  const norm = companyName.trim().toLowerCase()
  
  // 1. Try to find existing company
  let { data: company, error: fetchErr } = await supabase
    .from('companies')
    .select('*')
    .eq('name_normalized', norm)
    .maybeSingle()
  
  if (fetchErr) throw fetchErr
  
  // 2. Create if doesn't exist
  if (!company) {
    const { data: inserted, error: insErr } = await supabase
      .from('companies')
      .upsert({ name: companyName, domain }, { onConflict: 'name_normalized' })
      .select('*')
      .single()
    
    if (insErr) throw insErr
    company = inserted
    console.log('[serp-scout] Created new company', { id: company.id, name: companyName, domain })
  } else {
    console.log('[serp-scout] Using existing company', { id: company.id, name: company.name })
  }
  
  return company
}

async function scrapeDomainPages(domain) {
  const urls = buildPageUrls(domain)
  const pages = []
  console.log('[serp-scout] scraping domain', { domain, urls: urls.slice(0, MAX_PAGES) })
  for (const url of urls) {
    if (pages.length >= MAX_PAGES) break
    const page = await fetchPageText(url)
    if (page?.text) {
      console.log('[serp-scout] scraped page', { url, charCount: page.text.length, preview: page.text.slice(0, 200) })
      pages.push(page)
    }
  }
  console.log('[serp-scout] total pages scraped', { domain, count: pages.length })
  return pages
}

function extractCompanyNameFromContent(pages, domain) {
  if (!pages || !pages.length) {
    console.log('[extractCompanyNameFromContent] No pages provided, using domain', { domain })
    return domain
  }
  
  // Try to find company name from page title or first paragraph
  const firstPage = pages[0].text
  if (!firstPage) {
    console.log('[extractCompanyNameFromContent] First page has no text, using fallback', { domain })
    return domain
  }
  
  const sentences = firstPage.split(/[.!?]\s+/)
  
  // Look for patterns like "CompanyName is...", "Welcome to CompanyName", etc.
  for (const sentence of sentences.slice(0, 3)) {
    const match = sentence.match(/^([A-Z][a-zA-Z0-9\s]{2,30})(?:\s+is|\s+-|\s+provides|\s+offers|:|,)/)
    if (match && match[1]) {
      const name = match[1].trim()
      console.log('[extractCompanyNameFromContent] Pattern matched', { name, from: sentence.slice(0, 100) })
      return name
    }
  }
  
  // Fallback: capitalize domain name
  const fallbackName = domain
    .replace(/\.(com|io|net|org|co|ai|dev)$/i, '')
    .split(/[.-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  console.log('[extractCompanyNameFromContent] Using fallback', { fallbackName, domain })
  return fallbackName
}

function buildNormalizedContent(pages, companyName, domain) {
  const headerName = companyName || domain
  const paragraphs = pages
    .map((page) => page.text)
    .join('\n\n')
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)

  const summary = paragraphs[0] ?? ''
  const featureMatches = paragraphs.filter((part) => /feature|capabil|solution|platform|offering/i.test(part))
  const problemMatches = paragraphs.filter((part) => /problem|challenge|pain|issue|friction/i.test(part))
  const features = featureMatches.length ? featureMatches : paragraphs.slice(1, 5)
  const problems = problemMatches.length ? problemMatches : paragraphs.slice(5, 9)

  const normalizedLines = [
    `Company Name: ${headerName}`,
    `Domain: ${domain}`,
    '',
    'What the company does:',
    summary || 'Content did not provide a clear summary.',
    '',
    'Key features and capabilities:',
    ...features.slice(0, 4).map((item, idx) => `${idx + 1}. ${item}`),
    '',
    'Problems addressed:',
    ...problems.slice(0, 4).map((item, idx) => `${idx + 1}. ${item}`)
  ]
  const content = normalizedLines.join('\n')
  console.log('[serp-scout] normalized content', { domain, lines: normalizedLines.length, preview: content.slice(0, 300) })
  return content
}

function limitSentences(value, max = 3) {
  if (!value) return ''
  const sentences = value
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)
  return sentences.slice(0, max).join(' ').trim()
}

function removeBannedTerms(value) {
  if (!value) return ''
  return value
    .replace(SUPERLATIVE_REGEX, '')
    .replace(CTA_REGEX, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeList(raw) {
  if (!Array.isArray(raw)) return []
  return raw
    .map((entry) => removeBannedTerms(String(entry || '')))
    .map((entry) => entry.replace(/^[\d\.\)\-\s]+/, ''))
    .map((entry) => entry.trim())
    .filter(Boolean)
}

function sanitizeContextPayload(raw) {
  if (!raw) return null
  const companySummary = limitSentences(removeBannedTerms(raw.companySummary ?? raw.summary ?? ''), 3)
  const coreCapabilities = normalizeList(raw.coreCapabilities ?? raw.capabilities ?? [])
  const problemSpaces = normalizeList(raw.problemSpaces ?? raw.problems ?? [])
  const constraints = normalizeList(raw.constraints ?? raw.tone ?? [])

  if (!companySummary) return null
  if (!coreCapabilities.length) return null
  if (!problemSpaces.length) return null

  return {
    companySummary,
    coreCapabilities,
    problemSpaces,
    constraints: constraints.length ? constraints : defaultConstraints
  }
}

function extractJsonFromText(raw) {
  const trimmed = (raw || '').trim()

  // If wrapped in a markdown code fence, capture inner content
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
  const candidate = fenceMatch ? fenceMatch[1].trim() : trimmed

  // Find first balanced JSON object or array by bracket matching
  const start = candidate.search(/[\[{]/)
  if (start === -1) {
    console.error('[extractJsonFromText] No JSON start token found in:', candidate.slice(0, 200))
    throw new Error('Unable to locate JSON payload in LLM response')
  }

  let depth = 0
  let inString = false
  let escape = false
  const openChar = candidate[start]
  const closeChar = openChar === '{' ? '}' : ']'

  for (let i = start; i < candidate.length; i++) {
    const ch = candidate[i]
    if (inString) {
      if (escape) {
        escape = false
      } else if (ch === '\\') {
        escape = true
      } else if (ch === '"') {
        inString = false
      }
      continue
    }

    if (ch === '"') {
      inString = true
      continue
    }
    if (ch === '{' || ch === '[') {
      depth++
    } else if (ch === '}' || ch === ']') {
      depth--
      if (depth === 0 && ch === closeChar) {
        // Return exactly the balanced JSON slice
        return candidate.slice(start, i + 1)
      }
    }
  }

  // Fallback: try simple slicing to last closing brace/bracket
  const lastObj = candidate.lastIndexOf('}')
  const firstObj = candidate.indexOf('{')
  if (firstObj !== -1 && lastObj > firstObj) {
    return candidate.slice(firstObj, lastObj + 1)
  }
  const lastArr = candidate.lastIndexOf(']')
  const firstArr = candidate.indexOf('[')
  if (firstArr !== -1 && lastArr > firstArr) {
    return candidate.slice(firstArr, lastArr + 1)
  }

  console.error('[extractJsonFromText] Unable to find JSON in response (fallback failed):', candidate.slice(0, 200))
  throw new Error('Unable to locate JSON payload in LLM response')
}

async function callOpenRouter(messages, temperature = 0.65, max_tokens = 1024) {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not configured')
  }
  const payload = {
    model: OPENROUTER_MODEL,
    messages,
    temperature,
    max_tokens,
    stream: false
  }
  const resp = await fetch(OPENROUTER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`
    },
    body: JSON.stringify(payload)
  })
  if (!resp.ok) {
    const body = await resp.text()
    throw new Error(`LLM ${resp.status} ${body}`)
  }
  const json = await resp.json()
  const result = json?.choices?.[0]?.message?.content || json?.choices?.[0]?.text || ''
  console.debug('[serp-scout] openrouter response', result)
  return result
}

async function promptKeywords(payload) {
  const companyName = payload.companyName || payload.domain
  const prompt = `You are an SEO and LLM visibility expert. Analyze the landing page content and generate EXACTLY 5 high-impact keywords.

For each keyword, provide:
1. term: the keyword phrase
2. intent: search intent (informational/commercial/navigational)
3. why: brief rationale (max 20 words)
4. prompts: array of EXACTLY 5 general ranking/comparison prompts that would naturally rank ${companyName} in citations

CRITICAL: Generate GENERAL ranking prompts, NOT company-specific questions.

Examples of CORRECT prompts (general "top best" style - would naturally show ${companyName} in rankings/citations):
- "Top 5 B2B SaaS content marketing agencies"
- "Best platforms for developer content marketing"
- "Which technical content writing services are best for startups?"
- "Top content marketing solutions for DevTools companies"
- "Best agencies specializing in technical documentation"
- "What are the top alternatives for [category]?"
- "Best tools for [specific use case]"
- "Top [category] platforms 2024"

Examples of WRONG prompts (do NOT generate these - these are company-specific, not ranking):
- "What is the ROI of content marketing with ${companyName}?" ❌
- "How does ${companyName} approach content marketing?" ❌
- "Can ${companyName} help my startup?" ❌

The ranking prompts should be broad enough that when LLMs answer them, they naturally include ${companyName} in their rankings and recommendations.

Return JSON with this exact structure:
{
  "explain": "summary of the company's primary market position",
  "keywords": [
    {
      "term": "keyword phrase",
      "intent": "informational",
      "why": "rationale",
      "prompts": ["general ranking prompt 1", "general ranking prompt 2", "general ranking prompt 3", "general ranking prompt 4", "general ranking prompt 5"]
    }
  ]
}

Page content: ${payload.pageContent.slice(0, 4000)}`
  const messages = [
    { role: 'system', content: 'You are an SEO and LLM visibility strategist. Generate exactly 5 keywords with 5 prompts each.' },
    { role: 'user', content: prompt }
  ]
  const raw = await callOpenRouter(messages, KEYWORD_TEMPERATURE, 2048)
  try {
    const json = JSON.parse(extractJsonFromText(raw))
    // Ensure exactly 5 keywords
    if (json.keywords && Array.isArray(json.keywords)) {
      json.keywords = json.keywords.slice(0, 5)
      // Ensure each keyword has exactly 5 prompts
      json.keywords = json.keywords.map(kw => ({
        ...kw,
        prompts: Array.isArray(kw.prompts) ? kw.prompts.slice(0, 5) : []
      }))
    }
    return json
  } catch (error) {
    throw new Error('Unable to parse JSON from OpenRouter keyword response')
  }
}

async function fetchCompanyById(id) {
  if (!id) return null
  const { data, error } = await supabase
    .from('companies')
    .select('id, name, name_normalized, domain')
    .eq('id', id)
    .maybeSingle()
  if (error) {
    console.error('[serp-scout] fetchCompanyById error', error.message)
    return null
  }
  return data
}

async function findCompanyByDomain(domain) {
  if (!domain) return null
  const patterns = [
    domain,
    `${domain},%`,
    `%, ${domain}`,
    `%,${domain}`,
    `%, ${domain},%`,
    `%,${domain},%`
  ]
  for (const pattern of patterns) {
    const { data } = await supabase
      .from('companies')
      .select('id, name, name_normalized, domain')
      .ilike('domain', pattern)
      .limit(1)
      .maybeSingle()
    if (data) return data
  }
  return null
}

async function generateCompanyContext(domain, companyId, companyName, forceContext, existingPages = null) {
  const stored = companyId ? await getCompanyContext(companyId) : null
  if (stored && !forceContext) {
    return { ...stored, companyName, companyId, domain }
  }
  // Use existing pages if provided to avoid re-scraping
  const pages = existingPages || await scrapeDomainPages(domain)
  if (!pages.length) {
    throw new Error('Unable to scrape any landing page content for the domain')
  }
  const normalized = buildNormalizedContent(pages, companyName, domain)
  const metadata = {
    pagesUsed: pages.map((p) => p.url),
    generatedAt: new Date().toISOString(),
    companyName: companyName || null,
    domain
  }
  const systemMessage = 'You are generating internal context for Reddit engagement. Describe the company neutrally, without marketing language, links, or calls to action.'
  const userPrompt = `Normalized content:\n${normalized}\n\nReturn valid JSON only with the following schema: {"companySummary": "2-3 sentence neutral summary", "coreCapabilities": ["..."] , "problemSpaces": ["..."], "constraints": ["..."]}. Constraints should mention tone rules or usage guardrails.`
  const messages = [
    { role: 'system', content: systemMessage },
    { role: 'user', content: userPrompt }
  ]
  let sanitized = null
  let attempts = 0
  while (attempts < 3 && !sanitized) {
    attempts += 1
    const raw = await callOpenRouter(messages, CONTEXT_TEMPERATURE, CONTEXT_MAX_TOKENS)
    try {
      const parsed = JSON.parse(extractJsonFromText(raw))
      sanitized = sanitizeContextPayload(parsed)
    } catch (error) {
      console.warn('[serp-scout] context parse failed', error.message)
    }
  }
  if (!sanitized) {
    throw new Error('Unable to generate a neutral company context. Try again with a reachable domain.')
  }
  const approvedContext = forceContext ? sanitized : stored?.approvedContext ?? sanitized
  const persisted = companyId
    ? await saveCompanyContext(companyId, {
        domain,
        metadata,
        llmContext: sanitized,
        approvedContext,
        generatedAt: metadata.generatedAt
      })
    : null
  return {
    companyId,
    companyName,
    domain,
    metadata,
    llmContext: sanitized,
    approvedContext,
    ...persisted
  }
}

export async function resolveCompanyIdBySlug(slug) {
  if (!slug) return null
  const { data, error } = await supabase
    .from('companies')
    .select('id')
    .eq('name_normalized', slug)
    .maybeSingle()
  if (error) throw error
  return data?.id ?? null
}

async function saveKeywords(companyId, domain, keywords, userId, companyName) {
  console.log('[serp-scout] saveKeywords called', { companyId, domain, keywordCount: keywords?.length, userId, companyName })
  
  if (!companyId) {
    // Auto-create company if name is provided
    if (companyName && domain) {
      console.log('[serp-scout] Auto-creating company', { companyName, domain, userId })
      try {
        const newCompany = await createCompanyIfNeeded(companyName, domain, userId)
        companyId = newCompany.id
        console.log('[serp-scout] Created new company', { companyId, companyName })
      } catch (error) {
        console.error('[serp-scout] Failed to create company', error.message)
        return { saved: true, local: true, keywords, error: 'Failed to create company' }
      }
    } else {
      // No company name provided, save locally
      console.log('[serp-scout] No companyId or companyName, keywords saved locally', { domain, keywordCount: keywords.length, userId })
      return { saved: true, local: true, keywords }
    }
  }
  const context = await getCompanyContext(companyId)
  const updatedContext = {
    domain: domain || context?.domain,
    metadata: {
      ...(context?.metadata || {}),
      keywordsUpdatedAt: new Date().toISOString()
    },
    llmContext: context?.llmContext,
    approvedContext: {
      ...(context?.approvedContext || {}),
      keywords: keywords
    }
  }
  const result = await saveCompanyContext(companyId, updatedContext)
  if (!result) {
    console.warn('[serp-scout] saveCompanyContext returned null; falling back to local save semantics')
    return { saved: true, local: true, companyId, domain, keywords }
  }
  return { ...result, companyId, saved: true }
}

async function testCitations(prompts, domain) {
  const citationApiUrl = process.env.CITATION_API_URL || 'http://127.0.0.1:8000/cite'
  try {
    const resp = await fetch(citationApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompts, domain })
    })
    if (!resp.ok) {
      throw new Error(`Citation API returned ${resp.status}`)
    }
    return await resp.json()
  } catch (error) {
    console.error('[serp-scout] citation test failed', error.message)
    throw new Error(`Citation API error: ${error.message}`)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify user is authenticated
  let userCtx
  try {
    userCtx = await verifyRequestUser(req)
  } catch (err) {
    return res.status(err?.status || 401).json({ error: err?.message || 'Unauthorized' })
  }

  const { 
    domain: rawDomain, 
    companyId: bodyCompanyId, 
    companySlug, 
    forceContext,
    action,
    keywords: bodyKeywords,
    prompts: bodyPrompts,
    companyName: bodyCompanyName
  } = req.body || {}

  // Handle save keywords action
  if (action === 'saveKeywords') {
    if (!bodyKeywords) {
      return res.status(400).json({ error: 'keywords are required' })
    }
    const companyId = bodyCompanyId ?? null
    try {
      const result = await saveKeywords(companyId, rawDomain, bodyKeywords, userCtx.userId, bodyCompanyName)
      return res.status(200).json({ 
        success: true, 
        message: result.companyId ? 'Keywords saved to database' : (result.local ? 'Keywords processed successfully' : 'Keywords saved to database'),
        saved: result,
        companyId: result.companyId
      })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Handle test citations action
  if (action === 'testCitations') {
    if (!bodyPrompts || !Array.isArray(bodyPrompts) || !rawDomain) {
      return res.status(400).json({ error: 'prompts array and domain are required' })
    }
    try {
      const citations = await testCitations(bodyPrompts, rawDomain)
      return res.status(200).json({ success: true, citations })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Handle suggest prompts action
  if (action === 'suggestPrompts') {
    const { keyword, intent, companyName, domain } = req.body
    if (!keyword || !companyName || !domain) {
      return res.status(400).json({ error: 'keyword, companyName, and domain are required' })
    }
    try {
      const promptText = `Generate EXACTLY 5 general ranking/comparison prompts for the keyword "${keyword}" (intent: ${intent || 'informational'}).

CRITICAL: Generate GENERAL ranking prompts, NOT company-specific questions. These should be prompts where LLMs would naturally mention "${companyName}" in their answer/rankings.

Examples of CORRECT prompts (general "top best" style):
- "Top 5 B2B SaaS content marketing agencies"
- "Best platforms for ${keyword.replace(/[^a-z0-9]/gi, ' ')}"
- "Which ${keyword} solutions are best for startups?"
- "Top alternatives for ${keyword}"
- "Best ${keyword} tools and platforms"

Examples of WRONG prompts (do NOT generate - company-specific):
- "Is ${companyName} the best choice?" ❌
- "How does ${companyName} compare?" ❌
- "Does ${companyName} support...?" ❌

The prompts should be broad enough that when LLMs rank solutions, they naturally include ${companyName}.

Return ONLY a JSON array of 5 general ranking prompts:
["prompt 1", "prompt 2", "prompt 3", "prompt 4", "prompt 5"]`

      const messages = [
        { role: 'system', content: `You are an SEO expert. Generate general ranking/comparison prompts that would naturally surface "${companyName}" in LLM recommendations.` },
        { role: 'user', content: promptText }
      ]
      const raw = await callOpenRouter(messages, 0.7, 512)
      console.log('[serp-scout] openrouter response for suggestPrompts', raw.slice(0, 500))
      
      let prompts = []
      try {
        const json = JSON.parse(extractJsonFromText(raw))
        prompts = Array.isArray(json) ? json.slice(0, 5) : []
      } catch (parseError) {
        console.error('[serp-scout] failed to parse LLM response, using fallback prompts', parseError.message)
        // Fallback: generate ranking prompts
        prompts = [
          `Top 5 ${keyword} solutions`,
          `Best platforms for ${keyword}`,
          `Which ${keyword} tools are best for startups?`,
          `Top alternatives in the ${keyword} space`,
          `Best ${keyword} services and platforms 2024`
        ]
      }
      
      return res.status(200).json({ success: true, prompts })
    } catch (error) {
      if (error.message.includes('429') || error.message.includes('Rate limit')) {
        return res.status(429).json({
          error: 'API rate limit exceeded',
          message: 'The AI service has reached its daily request limit. Please try again later.'
        })
      }
      console.error('[serp-scout] suggest prompts failed', error.message)
      return res.status(500).json({ error: error.message })
    }
  }

  const domain = ensureDomain(rawDomain)
  if (!domain) {
    return res.status(400).json({ error: 'domain is required' })
  }

  // Only use company ID if explicitly provided by user (optional)
  const requestedCompanyId = bodyCompanyId ?? null
  const resolvedCompanyId = requestedCompanyId

  console.log('[serp-scout] company association', { domain, requestedCompanyId, resolvedCompanyId, isIndependent: !resolvedCompanyId })

  // Scrape domain pages to extract content and company name
  let pages
  try {
    pages = await scrapeDomainPages(domain)
    if (!pages || !pages.length) {
      throw new Error('Unable to scrape any pages from the domain')
    }
  } catch (error) {
    return res.status(502).json({ error: error.message })
  }

  // Extract company name from scraped content (independent of database)
  const extractedCompanyName = extractCompanyNameFromContent(pages, domain)
  console.log('[serp-scout] DOMAIN FETCH - extracted company name', { domain, extractedCompanyName, pagesCount: pages.length })

  // Use first page for keyword generation
  const landingText = pages.map(p => p.text).join('\n\n')
  let keywords
  try {
    keywords = await promptKeywords({ domain, pageContent: landingText, companyName: extractedCompanyName })
  } catch (error) {
    if (error.message.includes('429') || error.message.includes('Rate limit')) {
      return res.status(429).json({
        error: 'API rate limit exceeded',
        message: 'The AI service has reached its daily request limit. Please try again later or upgrade your API plan.',
        retryAfter: new Date(1767830400000).toISOString()
      })
    }
    console.error('[serp-scout] keyword generation failed', error.message)
    return res.status(500).json({ error: 'Failed to generate keywords', details: error.message })
  }

  // Generate company context (will use extracted name, pass existing pages to avoid re-scraping)
  let companyContext = null
  let contextError = null
  try {
    companyContext = await generateCompanyContext(domain, resolvedCompanyId, extractedCompanyName, Boolean(forceContext), pages)
  } catch (error) {
    console.error('[serp-scout] context generation failed', error.message)
    contextError = error.message
  }

  console.log('[serp-scout] RETURNING DOMAIN FETCH RESPONSE', { 
    domain, 
    companyName: extractedCompanyName, 
    companyId: resolvedCompanyId,
    keywordCount: keywords?.keywords?.length
  })

  return res.status(200).json({
    success: true,
    domain,
    companyId: resolvedCompanyId || null,
    companyName: extractedCompanyName,
    keywords: keywords?.keywords || [],
    explain: keywords?.explain || null,
    companyContext,
    contextError
  })
}
