import { createClient } from '@supabase/supabase-js'
import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'
import { verifyRequestUser } from '@/lib/serverAuth'
import { getCompanyContext, saveCompanyContext, getContextByDomainAndUser } from '@/lib/companyContext'
import pLimit from 'p-limit'
import { withSlackLog, logSerpAction } from '@/lib/slackLogger'

const OPENROUTER_ENDPOINT = process.env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ''
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-oss-20b'
const OPENROUTER_FALLBACK_MODELS = [
  'openai/gpt-oss-20b',
]
const OPENROUTER_CITATION_MODEL =
  process.env.OPENROUTER_CITATION_MODEL || 'perplexity/sonar:online'

const CITATION_MODELS = [
  'perplexity/sonar:online',
  'openai/gpt-oss-120b:online',
  'anthropic/claude-3.5-haiku:online',
]

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const CONTEXT_PAGE_PATHS = ['', '/product', '/features', '/pricing', '/about']
const MAX_PAGE_CHARS = 3000
const MAX_PAGES = 4
const MIN_READABILITY_CHARS = 400
const CONTEXT_TEMPERATURE = 0.25
const CONTEXT_MAX_TOKENS = 1400
const KEYWORD_TEMPERATURE = 0.65
const KEYWORD_MAX_TOKENS = 1024
const CITATION_SEARCH_TEMPERATURE = 0
const CITATION_SEARCH_MAX_TOKENS = 2000
const buildCitationSearchSystemMessage = (prompt) => `CRITICAL: Return ONLY JSON. No explanations, no text before or after.

Web search for Reddit posts about: "${prompt}"

Return ONLY:
[{"url":"https://www.reddit.com/r/subreddit/comments/id/slug/","subreddit":"name","title":"title","reason":"why"}]

Empty: []
`.trim()

// For plugin-based models (openai/gpt-4o-mini + plugins:[{id:'web'}]):
// Keep the prompt simple — the plugin already injects search results as context.
// Complex restriction rules cause the model to over-cautiously return [].
const buildCitationSearchSystemMessageForSearchModel = (prompt) => `CRITICAL: You MUST return ONLY valid JSON. NO explanations. NO descriptions. NO search process. ONLY JSON.

Using web search, find Reddit posts about: "${prompt}"

RETURN ONLY THIS JSON ARRAY FORMAT:
[{"url":"https://www.reddit.com/r/subreddit/comments/postid/slug/","subreddit":"name","title":"title","reason":"why"}]

ZERO OTHER TEXT. If no posts: []
`.trim()

// For Claude - use web search but return ONLY JSON, zero other text
const buildCitationSearchSystemMessageForClaude = (prompt) => `CRITICAL: Return ONLY valid JSON. NO text before or after. NO explanations.

Using web search, find Reddit posts about: "${prompt}"

Return this format exactly:
[{"url":"...","subreddit":"...","title":"..."}]

If no posts found: []
If error: []

NO other text. Only JSON.
`.trim()

const buildCitationSearchUserMessage = (prompt, domain) => `Search reddit.com for posts about: "${prompt}". Use the search query: site:reddit.com ${prompt}. Domain for context: ${domain && domain.length ? domain : 'N/A'}. Return only the JSON array of real Reddit post URLs found.`

const buildCitationSearchUserMessageForSearchModel = (prompt, domain) => `Find Reddit posts about: "${prompt}". Search for "${prompt} reddit" to locate real discussions. Domain for context: ${domain && domain.length ? domain : 'N/A'}. Return only the JSON array of real Reddit post URLs found.`

const buildCitationSearchUserMessageForClaude = (prompt, domain) => `Search for: "${prompt} reddit". Return ONLY real Reddit posts you found in actual search results. For each post, include: url (exact from browser, not constructed), title, and subreddit. Format as JSON array: [{url: "...", title: "...", subreddit: "..."}]. Never construct or guess URLs. Domain context: ${domain && domain.length ? domain : 'N/A'}.`
const LLM_PROMPTS = Number(process.env.SERP_SCOUT_LLM_PROMPTS) || 5
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
const REDDIT_API_BASE = 'https://reddit-comment-gen.onrender.com'
const POST_DETAILS_ENDPOINT = `${REDDIT_API_BASE}/fetch_post_details`
const POST_DETAILS_TIMEOUT_MS = Number(process.env.SERP_SCOUT_POST_DETAILS_TIMEOUT_MS) || 25000
const CITATION_SEARCH_TIMEOUT_MS = 120_000 // 120 seconds for citation searches (web search can be slow)
const POST_DETAILS_CONCURRENCY = Number(process.env.SERP_SCOUT_POST_DETAILS_CONCURRENCY) || 4
const MENTION_SNIPPET_RADIUS = 120
const MENTION_SNIPPET_MAX_LENGTH = 200
const postDetailsLimiter = pLimit(POST_DETAILS_CONCURRENCY)

/**
 * Fetch top and new Reddit posts/comments for a keyword
 * @param {string} keyword - The search keyword
 * @returns {Promise<{top_posts: Array, new_posts: Array, top_comments: Array, new_comments: Array}>}
 */
async function fetchRedditTopNewPosts(keyword) {
  try {
    const response = await fetch(`${REDDIT_API_BASE}/find_top_posts_comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword }),
      signal: AbortSignal.timeout(30000)
    })

    if (!response.ok) {
      console.error('[serp-scout] Reddit API error', { status: response.status, keyword })
      return { top_posts: [], new_posts: [], top_comments: [], new_comments: [] }
    }

    const data = await response.json()
    return {
      top_posts: Array.isArray(data.top_posts) ? data.top_posts : [],
      new_posts: Array.isArray(data.new_posts) ? data.new_posts : [],
      top_comments: Array.isArray(data.top_comments) ? data.top_comments : [],
      new_comments: Array.isArray(data.new_comments) ? data.new_comments : []
    }
  } catch (error) {
    console.error('[serp-scout] Failed to fetch Reddit posts', { keyword, error: error.message })
    return { top_posts: [], new_posts: [], top_comments: [], new_comments: [] }
  }
}

/**
 * Fetch Reddit posts via DataForSEO "site:reddit.com" search
 * @param {string} keyword - The search keyword
 * @returns {Promise<{top_posts: Array, new_posts: Array}>}
 */
async function fetchRedditViaDataForSeo(keyword) {
  try {
    const authHeader = createDataForSeoAuthHeader()
    if (!authHeader) {
      throw new Error('DataForSEO credentials are missing')
    }

    // Dork query for Reddit
    const query = `site:reddit.com ${keyword}`

    const payload = {
      keyword: query,
      location_code: 2840, // US
      language_code: 'en',
      device: 'desktop',
      os: 'windows',
      depth: 50 // scan top 50 Google results for better coverage
    }

    const resp = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader
      },
      body: JSON.stringify([payload])
    })

    if (!resp.ok) {
      console.error('[serp-scout] DataForSEO Reddit search failed', resp.status)
      return { top_posts: [], new_posts: [] }
    }

    const json = await resp.json()
    let items = []

    if (json.tasks?.[0]?.result?.[0]?.items) {
      items = json.tasks[0].result[0].items.filter(item => item.type === 'organic')
    }

    console.log(`[serp-scout] DataForSEO dork search returned ${items.length} organic items for "${query}"`)

    // Map to "post" structure, preserving Google's SERP rank
    const posts = items.map(item => {
      const snippet = item.snippet || ''
      const title = item.title || ''

      // Heuristic extraction of engagement from snippet
      // Google snippets often show: "123 votes, 45 comments" or "45 comments" or "Posted by ... 123 upvotes"
      const commentsMatch = snippet.match(/(\d[\d,]*)\s+comments?/i) || snippet.match(/(\d[\d,]*)\s+replies/i)
      const comments = commentsMatch ? parseInt(commentsMatch[1].replace(/,/g, ''), 10) : 0

      const votesMatch = snippet.match(/(\d[\d,]*)\s+(?:votes?|upvotes?|points?)/i)
      const upvotes = votesMatch ? parseInt(votesMatch[1].replace(/,/g, ''), 10) : 0

      // Extract subreddit from URL
      const subMatch = item.url?.match(/reddit\.com\/r\/([^/]+)/i)
      const subreddit = subMatch ? subMatch[1] : 'reddit'

      return {
        post_title: title,
        post_url: item.url,
        post_content: snippet,
        subreddit,
        upvotes,
        total_comments: comments,
        serp_rank: item.rank_group || item.rank_absolute || 999, // Preserve Google's ranking
        source: 'dataforseo'
      }
    })

    // "Top" = sorted by Google SERP rank (this IS what Google thinks is most relevant)
    // We keep them in SERP order — that's the whole point of a dork search
    const topPosts = [...posts].sort((a, b) => a.serp_rank - b.serp_rank)

    // "New" = same list, there's no reliable date extraction from SERP
    const newPosts = posts.slice(0, 10)

    return {
      top_posts: topPosts.slice(0, 15),
      new_posts: newPosts
    }

  } catch (error) {
    console.error('[serp-scout] fetchRedditViaDataForSeo failed', error.message)
    return { top_posts: [], new_posts: [] }
  }
}

/**
 * Use LLM to analyze and suggest the best Reddit posts for engagement
 * @param {Array} topPosts - Top Reddit posts
 * @param {Array} newPosts - New Reddit posts
 * @param {string} keyword - The search keyword
 * @param {string} companyContext - Company context/description
 * @returns {Promise<Array>} - Array of 5 suggested posts with engagement strategies
 */
async function suggestBestPostsWithLLM(topPosts, newPosts, keyword, companyContext = '') {
  try {
    const allPosts = [...topPosts, ...newPosts]
    if (allPosts.length === 0) {
      return []
    }

    // Prepare posts summary for LLM
    const postsSummary = allPosts.slice(0, 20).map((post, idx) => ({
      index: idx,
      title: post.post_title || '',
      content: (post.post_content || '').slice(0, 300),
      url: post.post_url || '',
      subreddit: post.subreddit || '',
      upvotes: post.upvotes || 0,
      total_comments: post.total_comments || 0,
      post_age_hours: post.post_age_hours || 0
    }))

    const prompt = `You are an expert Reddit engagement strategist. Analyze these Reddit posts about "${keyword}" and suggest the TOP 5 posts that would be most valuable for engagement.

Company Context:
${companyContext || 'Not provided'}

Reddit Posts:
${JSON.stringify(postsSummary, null, 2)}

For each of the 5 recommended posts, provide:
1. Post index (from the list above)
2. Why this post is valuable for engagement
3. A brief engagement strategy (what to say, how to add value)
4. Engagement score (1-10)

Return ONLY a valid JSON array with this structure:
[
  {
    "index": 0,
    "reason": "High engagement post with specific pain point mentioned",
    "strategy": "Share relevant case study or insight that addresses the pain point naturally",
    "engagementScore": 9
  }
]

Be strategic - prioritize posts where:
- The company can add genuine value without being salesy
- Discussion is active and recent
- The tone is receptive to expert input
- There's a clear pain point or question the company can address

Return ONLY the JSON array, no other text.`

    const response = await fetch(OPENROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://infrasity.com',
        'X-Title': 'Infrasity SERP Scout'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      console.error('[serp-scout] LLM suggestion failed', { status: response.status })
      return allPosts.slice(0, 5)
    }

    const data = await response.json()
    const llmText = data.choices?.[0]?.message?.content || '[]'

    // Extract JSON from response (handle code blocks)
    let jsonText = llmText.trim()
    if (jsonText.includes('```')) {
      const match = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/)
      if (match) jsonText = match[1].trim()
    }

    const suggestions = JSON.parse(jsonText)

    // Map suggestions back to original posts with engagement metadata
    return suggestions.slice(0, 5).map(suggestion => {
      const originalPost = allPosts[suggestion.index] || allPosts[0]
      return {
        ...originalPost,
        engagementReason: suggestion.reason || '',
        engagementStrategy: suggestion.strategy || '',
        engagementScore: suggestion.engagementScore || 0
      }
    })
  } catch (error) {
    console.error('[serp-scout] LLM post suggestion failed', { error: error.message })
    // Fallback: return top 5 by upvotes + comments
    return [...topPosts, ...newPosts]
      .sort((a, b) => ((b.upvotes || 0) + (b.total_comments || 0)) - ((a.upvotes || 0) + (a.total_comments || 0)))
      .slice(0, 5)
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

async function fetchRedditPostDetails(url) {
  if (!url) return null
  try {
    const response = await fetchWithTimeout(
      POST_DETAILS_ENDPOINT,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reddit_url: url })
      },
      POST_DETAILS_TIMEOUT_MS
    )

    if (!response.ok) {
      console.warn('[serp-scout] fetchRedditPostDetails failed', { url, status: response.status })
      return null
    }

    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('[serp-scout] fetchRedditPostDetails timed out', { url })
    } else {
      console.warn('[serp-scout] fetchRedditPostDetails error', { url, error: error.message })
    }
    return null
  }
}

async function enrichRedditThread(thread) {
  if (!thread || !thread.url) {
    return { ...thread, fullContent: thread?.snippet || thread?.title || '' }
  }

  const details = await fetchRedditPostDetails(thread.url)
  const fallback = thread?.snippet || thread?.title || ''
  return {
    ...thread,
    fullContent: details?.post_content || fallback
  }
}

function findMentionSnippet(source, normalizedTerm, radius = MENTION_SNIPPET_RADIUS) {
  if (!source || !normalizedTerm) return null
  const lowerSource = source.toLowerCase()
  const idx = lowerSource.indexOf(normalizedTerm)
  if (idx === -1) return null

  const start = Math.max(0, idx - radius)
  const end = Math.min(source.length, idx + normalizedTerm.length + radius)
  let snippet = source.slice(start, end).replace(/\s+/g, ' ').trim()
  if (!snippet) return null
  if (snippet.length > MENTION_SNIPPET_MAX_LENGTH) {
    snippet = snippet.slice(0, MENTION_SNIPPET_MAX_LENGTH).trim()
  }
  const prefix = start > 0 ? '...' : ''
  const suffix = end < source.length ? '...' : ''
  return `${prefix}${snippet}${suffix}`.replace(/\s+/g, ' ')
}

function findMentionSnippetInSources(normalizedTerm, sources = [], radius = MENTION_SNIPPET_RADIUS) {
  for (const source of sources) {
    const snippet = findMentionSnippet(source, normalizedTerm, radius)
    if (snippet) return snippet
  }
  return null
}

function buildThreadMentionData(thread, competitorTargets, brandTargets) {
  const sources = [thread.fullContent, thread.snippet, thread.title].filter(Boolean)
  const mentionHighlights = []
  const matchedCompetitors = new Set()

  competitorTargets.forEach(target => {
    const snippet = findMentionSnippetInSources(target.normalized, sources)
    if (snippet) {
      matchedCompetitors.add(target.raw)
      mentionHighlights.push({ type: 'competitor', term: target.raw, snippet })
    }
  })

  let brandMentionSnippet = null
  let brandMentionLabel = null
  for (const target of brandTargets) {
    const snippet = findMentionSnippetInSources(target.normalized, sources)
    if (snippet) {
      brandMentionSnippet = snippet
      brandMentionLabel = target.label
      break
    }
  }

  if (brandMentionSnippet) {
    mentionHighlights.unshift({ type: 'brand', term: brandMentionLabel, snippet: brandMentionSnippet })
  }

  return {
    mentionsCompetitors: Array.from(matchedCompetitors),
    mentionsBrand: Boolean(brandMentionSnippet),
    brandMentionSnippet,
    mentionHighlights
  }
}

function normalizeMentionValue(value) {
  if (!value) return ''
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .replace(/\/.*$/, '')  // strip path, query, and fragment — not just trailing slash
    .trim()
}

/**
 * Build a deduplicated list of mention targets from a competitor list.
 * For each entry we add:
 *   1. The normalized value itself (e.g. "hubspot.com")
 *   2. If it looks like a domain, also the bare company name without TLD
 *      (e.g. "hubspot") so Reddit mentions of just the brand name are caught.
 */
function buildCompetitorTargets(competitorList) {
  const targets = []
  const seenNormalized = new Set()

  const addTarget = (raw, normalized) => {
    if (!normalized || seenNormalized.has(normalized)) return
    seenNormalized.add(normalized)
    targets.push({ raw, normalized })
  }

  const list = Array.isArray(competitorList)
    ? competitorList
    : competitorList ? [competitorList] : []

  list.forEach(entry => {
    const display = entry != null ? String(entry).trim() : ''
    if (!display) return
    const normalized = normalizeMentionValue(display)
    if (!normalized) return

    // Add the full normalized value (domain or company name as entered)
    addTarget(display, normalized)

    // If it looks like a domain (has a dot, e.g. "hubspot.com", "monday.io")
    // also add a bare short name so Reddit threads that just say "HubSpot" are matched.
    if (/^[a-z0-9][a-z0-9-]*\.[a-z]{2,}$/.test(normalized)) {
      const shortName = normalized
        .replace(/\.[a-z]{2,6}$/, '')  // strip TLD
        .replace(/-/g, ' ')            // hyphens → spaces ("some-company" → "some company")
        .trim()
      if (shortName && shortName.length > 2) {
        addTarget(display, shortName)
      }
    }
  })

  return targets
}

function ensureDomain(input) {
  if (!input) return null
  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/.*$/, '')
    .replace(/\s+/g, '')
}

function normalizeUrlForMatch(url) {
  return ensureDomain(url) || ''
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
    body: JSON.stringify([payload])
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
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)
  try {
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Threadflow-Context-Scanner/1.0',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    })
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const html = await resp.text()
    const dom = new JSDOM(html, { url })
    const reader = new Readability(dom.window.document)
    const article = reader.parse()
    const doc = dom.window.document
    const readabilityText = (article?.textContent ?? '').replace(/\s+/g, ' ').trim()

    const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content') || ''
    const title = doc.querySelector('title')?.textContent || ''
    const headings = Array.from(doc.querySelectorAll('h1, h2'))
      .map((node) => node.textContent || '')
      .map((text) => text.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .slice(0, 6)
    const bodyText = (doc.body?.textContent ?? '').replace(/\s+/g, ' ').trim()

    const fallbackText = [title, metaDescription, ...headings, bodyText]
      .filter(Boolean)
      .join('\n')

    const preferredText = readabilityText.length >= MIN_READABILITY_CHARS ? readabilityText : fallbackText
    const cleaned = preferredText.replace(/https?:\/\/\S+/g, '').trim()

    if (readabilityText.length < MIN_READABILITY_CHARS) {
      console.warn('[serp-scout] readability short, using fallback extraction', {
        url,
        readabilityChars: readabilityText.length,
        fallbackChars: fallbackText.length
      })
    }

    return { url, text: cleaned.slice(0, MAX_PAGE_CHARS) }
  } catch (error) {
    console.warn('[serp-scout] skip page', url, error.message)
    return null
  } finally {
    clearTimeout(timeout)
  }
}

function createCompanyIfNeeded(companyName, domain) {
  // Generate a UUID-based company ID — no companies table insert needed.
  // User scoping and all data is stored in threadflow_company_contexts via firebase_user_id in metadata.
  const id = crypto.randomUUID()
  console.log('[serp-scout] Generated new company id', { id, name: companyName, domain })
  return { id, name: companyName, domain }
}

async function scrapeDomainPages(domain) {
  const urls = buildPageUrls(domain)
  console.log('[serp-scout] scraping domain in parallel', { domain, urlCount: urls.length })
  const results = await Promise.all(urls.map(url => fetchPageText(url)))
  const pages = results.filter(p => p?.text)
  pages.forEach(p => console.log('[serp-scout] scraped page', { url: p.url, charCount: p.text.length }))
  if (!pages.length) {
    console.warn('[serp-scout] no readable pages after direct fetch, attempting DataForSEO fallback', { domain })
    try {
      const fallbackText = await fetchViaDataForSeo(domain)
      const normalized = fallbackText.replace(/\s+/g, ' ').trim()
      if (normalized) {
        pages.push({ url: `https://${domain}`, text: normalized.slice(0, MAX_PAGE_CHARS) })
        console.log('[serp-scout] DataForSEO fallback succeeded', { domain, charCount: normalized.length })
      }
    } catch (error) {
      console.error('[serp-scout] DataForSEO fallback failed', { domain, error: error.message })
    }
  }
  console.log('[serp-scout] total pages scraped', { domain, count: pages.length })
  return pages
}

function extractCompanyNameFromContent(pages, domain) {
  // Primary: Extract from domain name directly (most reliable)
  // This is the company name the user provided/entered
  const baseDomain = domain
    .replace(/^(https?:\/\/)?(www\.)?/, '')  // Remove protocol and www
    .replace(/\.(com|io|net|org|co|ai|dev|app|cloud|ly|gg|me|tv)$/i, '')  // Remove TLD
    .split(/[.-]/)  // Split by dash or dot
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize each word
    .join(' ')

  if (baseDomain && baseDomain.length > 1 && baseDomain.length < 100) {
    console.log('[extractCompanyNameFromContent] Using domain-based name', { baseDomain, domain })
    return baseDomain
  }

  // Fallback: Try to extract from website content if domain extraction fails
  if (!pages || !pages.length) {
    console.log('[extractCompanyNameFromContent] No pages provided, using domain', { domain })
    return domain
  }

  const firstPage = pages[0].text
  if (!firstPage || firstPage.length < 50) {
    console.log('[extractCompanyNameFromContent] First page has insufficient text, using domain', { domain })
    return baseDomain || domain
  }

  // Remove newlines and extra whitespace
  const cleanText = firstPage.replace(/\n+/g, ' ').trim()
  
  // Try content patterns as secondary option
  const patterns = [
    /^([A-Z][a-zA-Z0-9\s&]{2,50}?)(?:\s+is\s+|\s+-\s+|:\s+)/i,
    /Welcome\s+(?:to\s+)?([A-Z][a-zA-Z0-9\s&]{2,50}?)[\.,!]/i,
    /^([A-Z][a-zA-Z0-9\s&]{2,50}?)\s+–\s/i,
  ]

  for (const pattern of patterns) {
    const match = cleanText.match(pattern)
    if (match && match[1]) {
      const name = match[1].trim()
      if (name.length > 2 && name.length < 100) {
        console.log('[extractCompanyNameFromContent] Found company name in content', { name })
        return name
      }
    }
  }

  // Final fallback: use domain-based name
  console.log('[extractCompanyNameFromContent] Using domain-based fallback', { baseDomain, domain })
  return baseDomain || domain
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
  // Build candidate list: env-specified model first, then fallbacks (deduped)
  const primaryModel = OPENROUTER_MODEL
  const candidates = [primaryModel, ...OPENROUTER_FALLBACK_MODELS.filter(m => m !== primaryModel)]
  let lastError = null
  for (const model of candidates) {
    const payload = {
      model,
      messages,
      temperature,
      max_tokens,
      stream: false,
      transforms: ['middle-out']
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
      lastError = new Error(`LLM ${resp.status} ${body}`)
      console.warn(`[serp-scout] model ${model} failed (${resp.status}), trying next fallback`)
      continue
    }
    const json = await resp.json()
    const result = json?.choices?.[0]?.message?.content || json?.choices?.[0]?.text || ''
    if (model !== primaryModel) {
      console.log(`[serp-scout] used fallback model: ${model}`)
    }
    return result
  }
  throw lastError
}

async function promptKeywords(payload) {
  const companyName = payload.companyName || payload.domain
  const prompt = `You are an SEO and LLM visibility expert. Analyze the landing page content and generate EXACTLY 20 high-impact keywords.

For each keyword, provide:
1. term: the keyword phrase
2. intent: search intent (informational/commercial/navigational)
3. why: brief rationale (max 20 words)
4. prompts: array of EXACTLY ${LLM_PROMPTS} ranking/comparison prompts (Top N / Best / Alternatives / Compare / Rank) that would naturally lead LLMs to list multiple solutions and include ${companyName} in citations

CRITICAL: Prompts MUST be ranking/comparison oriented. DO NOT generate generic Q&A or company-specific questions.

GOOD prompt patterns (list-style, ranking/comparison):
- "Top 10 ${companyName ? '[category]' : ''} platforms for ${payload.companyName ? 'enterprises' : 'professional teams'}"
- "Best ${companyName ? '[category]' : ''} tools for startups in 2026"
- "Compare leading ${companyName ? '[category]' : ''} solutions: features and pricing"
- "Alternatives to leading ${companyName ? '[category]' : ''} platforms"
- "Rank ${companyName ? '[category]' : ''} providers by integration depth"

BAD prompt patterns (do NOT generate):
- "What is [keyword]?" ❌
- "How to do [keyword]?" ❌
- "Guide to [keyword]" ❌
- "Is ${companyName} the best [keyword]?" ❌
- "Does ${companyName} support [keyword]?" ❌

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

Page content: ${payload.pageContent.slice(0, 10000)}`
  const messages = [
    { role: 'system', content: `You are an SEO and LLM visibility strategist. Generate exactly 20 keywords with ${LLM_PROMPTS} prompts each.` },
    { role: 'user', content: prompt }
  ]
  const raw = await callOpenRouter(messages, KEYWORD_TEMPERATURE, 6000)
  try {
    const json = JSON.parse(extractJsonFromText(raw))
    // Ensure exactly 20 keywords
    if (json.keywords && Array.isArray(json.keywords)) {
      json.keywords = json.keywords.slice(0, 20)
      // Ensure each keyword has exactly LLM_PROMPTS prompts
      json.keywords = json.keywords.map(kw => ({
        ...kw,
        prompts: Array.isArray(kw.prompts) ? kw.prompts.slice(0, LLM_PROMPTS) : []
      }))
    }
    return json
  } catch (error) {
    console.error('[promptKeywords] raw response (first 500 chars):', (raw || '').slice(0, 500))
    throw new Error('Unable to parse JSON from OpenRouter keyword response')
  }
}


async function fetchKeywordSerpPosition(keyword, targetDomain, depth = 100) {
  const authHeader = createDataForSeoAuthHeader()
  if (!authHeader) {
    throw new Error('DataForSEO credentials are missing')
  }

  const payload = {
    keyword,
    location_code: 2840, // United States
    language_code: 'en',
    device: 'desktop',
    os: 'windows',
    depth,
    group_organic_results: true
  }

  const resp = await fetch('https://api.dataforseo.com/v3/serp/google/organic/live/advanced', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader
    },
    body: JSON.stringify([payload])
  })

  if (!resp.ok) {
    const text = await resp.text()
    console.error('[serp-scout] DataForSEO live/advanced error', { status: resp.status, text })
    throw new Error(`DataForSEO request failed: ${resp.status} ${text}`)
  }

  const json = await resp.json()

  // Gather all organic items from response
  let allItems = []
  if (Array.isArray(json.tasks)) {
    for (const task of json.tasks) {
      if (Array.isArray(task.result)) {
        for (const result of task.result) {
          if (Array.isArray(result.items)) {
            allItems = allItems.concat(result.items.filter(item => item.type === 'organic'))
          }
        }
      }
    }
  }

  if (!allItems.length) {
    return { position: null, examined: 0, redditThreads: [] }
  }

  const normalizedTarget = normalizeUrlForMatch(targetDomain)
  let domainPosition = null
  let examined = 0
  const redditThreads = []

  for (const item of allItems) {
    const url = item.url || item.domain || ''
    const rank = typeof item.rank_absolute === 'number' ? item.rank_absolute : item.rank_group

    if (!url || typeof rank !== 'number') continue
    examined += 1

    // Check if this is a Reddit thread
    const isReddit = url.toLowerCase().includes('reddit.com')
    if (isReddit) {
      redditThreads.push({
        title: item.title || '',
        url: url,
        snippet: item.snippet || '',
        position: rank,
        domain: item.domain || ''
      })
    }

    // Check if domain matches
    let normalizedUrl = normalizeUrlForMatch(url)
    if (normalizedUrl === normalizedTarget && domainPosition === null) {
      domainPosition = rank
      console.debug('[serp-scout] domain match found', { keyword, targetDomain, url, rank })
    }
  }

  return {
    position: domainPosition,
    examined,
    redditThreads: redditThreads.slice(0, 10), // Return top 10 Reddit threads
    organicResults: allItems // Return all organic items for competitor analysis
  }
}

function needsRefresh(timestamp, hoursOld = 24) {
  if (!timestamp) return true
  const age = Date.now() - new Date(timestamp).getTime()
  return age > hoursOld * 60 * 60 * 1000
}

async function generateCompanyContext(domain, companyId, companyName, forceContext, existingPages = null, userId = null) {
  const stored = companyId ? await getCompanyContext(companyId) : null

  // Keywords and overview are permanent - only regenerate if forced or never generated
  if (stored && !forceContext) {
    console.log('[serp-scout] using existing company context and keywords (permanent)', {
      companyId,
      domain,
      hasKeywords: Boolean(stored.approvedContext?.keywords?.length)
    })
    return { ...stored, companyName, companyId, domain, fromCache: true }
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
    domain,
    ...(userId ? { firebase_user_id: userId } : {})
  }
  const systemMessage = 'You are generating internal context for Reddit engagement. Describe the company neutrally, without marketing language, links, or calls to action but bit professionally'
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
  // When forcing regeneration, merge new summary fields over existing approvedContext so
  // saved keywords/competitors/serpAnalysis are preserved alongside the fresh overview
  const approvedContext = forceContext
    ? { ...(stored?.approvedContext || {}), ...sanitized }
    : stored?.approvedContext ?? sanitized
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

async function saveKeywords(companyId, domain, keywords, userId, companyName, competitors, llmContext, approvedContext) {
  console.log('[serp-scout] saveKeywords called - PERMANENT save', { companyId, domain, keywordCount: keywords?.length, userId, companyName })

  if (!companyId) {
    // Auto-create company if name is provided
    if (companyName && domain) {
      console.log('[serp-scout] Auto-creating company', { companyName, domain, userId })
      try {
        const newCompany = createCompanyIfNeeded(companyName, domain)
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
      companyName,
      keywordsSavedAt: new Date().toISOString(),
      keywordsGenerated: true,
      ...(userId ? { firebase_user_id: userId } : {})
    },
    // Prefer DB-stored llmContext; fall back to what frontend passed (first-time users whose
    // companyId was null during analysis so generateCompanyContext never saved to DB)
    llmContext: context?.llmContext ?? llmContext ?? null,
    approvedContext: {
      // Merge: DB base → passed approvedContext (user edits) → always set keywords/competitors/serp
      ...(context?.approvedContext || {}),
      ...(approvedContext || {}),
      keywords: keywords,
      competitors: competitors || context?.approvedContext?.competitors || [],
      serpAnalysis: context?.approvedContext?.serpAnalysis || {}
    }
  }
  const result = await saveCompanyContext(companyId, updatedContext)
  if (!result) {
    console.warn('[serp-scout] saveCompanyContext returned null; falling back to local save semantics')
    return { saved: true, local: true, companyId, domain, keywords }
  }

  // Return full saved data from DB
  const savedContext = await getCompanyContext(companyId)
  return {
    ...result,
    companyId,
    saved: true,
    permanent: true,
    fullContext: savedContext
  }
}

async function saveSerpAnalysis(companyId, keyword, serpData) {
  if (!companyId) return null

  const context = await getCompanyContext(companyId)
  if (!context) return null

  const serpAnalysis = context.approvedContext?.serpAnalysis || {}
  // Merge into existing record so serpAndDork and redditTopNew can each save their portion
  serpAnalysis[keyword] = {
    ...(serpAnalysis[keyword] || {}),
    ...serpData,
    analyzedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
  }

  const updatedContext = {
    domain: context.domain,
    metadata: context.metadata,
    llmContext: context.llmContext,
    approvedContext: {
      ...context.approvedContext,
      serpAnalysis
    }
  }

  return saveCompanyContext(companyId, updatedContext)
}

async function getSerpAnalysis(companyId, keyword) {
  if (!companyId || !keyword) return null

  const context = await getCompanyContext(companyId)
  if (!context?.approvedContext?.serpAnalysis?.[keyword]) return null

  const analysis = context.approvedContext.serpAnalysis[keyword]
  const stale = needsRefresh(analysis.analyzedAt, 12)

  console.log('[serp-scout] getSerpAnalysis', { keyword, stale, analyzedAt: analysis.analyzedAt })
  // Always return cached data — let the caller decide what to do with stale data
  return { ...analysis, stale }
}

async function testCitations(prompts, domain, competitors = []) {
  const sanitizedPrompts = Array.isArray(prompts)
    ? prompts.map((prompt) => (prompt || '').trim()).filter(Boolean)
    : []

  if (!sanitizedPrompts.length) {
    throw new Error('At least one prompt is required for citation testing')
  }

  const normalizedDomain = ensureDomain(domain)
  const records = []

  // Build mention targets for self/competitor detection in citation posts
  const brandDomain = normalizedDomain  // ensureDomain already stripped path/www
  const brandTargets = []
  const brandDomainNormalized = normalizeMentionValue(brandDomain)
  if (brandDomainNormalized) {
    brandTargets.push({ normalized: brandDomainNormalized, label: brandDomain })
    // Also add short company name (strip TLD) so "infrasity" matches as well as "infrasity.com"
    if (/^[a-z0-9][a-z0-9-]*\.[a-z]{2,}$/.test(brandDomainNormalized)) {
      const shortBrand = brandDomainNormalized.replace(/\.[a-z]{2,6}$/, '').replace(/-/g, ' ').trim()
      if (shortBrand && shortBrand.length > 2) {
        brandTargets.push({ normalized: shortBrand, label: shortBrand })
      }
    }
  }
  const competitorTargets = buildCompetitorTargets(
    Array.isArray(competitors) ? competitors : (competitors ? [competitors] : [])
  )

  for (const prompt of sanitizedPrompts) {
    const record = {
      prompt,
      timestamp: new Date().toISOString(),
      models: {}
    }

    for (const model of CITATION_MODELS) {
      const isPerplexityModel = model.startsWith('perplexity/')
      const isClaudeModel = model.startsWith('anthropic/')
      // Perplexity handles site: dorks natively; Claude needs anti-hallucination prompt;
      // everything else (openai/:online, etc.) gets the natural-language search prompt.
      const systemMessage = isClaudeModel
        ? buildCitationSearchSystemMessageForClaude(prompt)
        : isPerplexityModel
          ? buildCitationSearchSystemMessage(prompt)
          : buildCitationSearchSystemMessageForSearchModel(prompt)
      const userMessage = isClaudeModel
        ? buildCitationSearchUserMessageForClaude(prompt, normalizedDomain)
        : isPerplexityModel
          ? buildCitationSearchUserMessage(prompt, normalizedDomain)
          : buildCitationSearchUserMessageForSearchModel(prompt, normalizedDomain)
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), CITATION_SEARCH_TIMEOUT_MS)
        
        // Web plugin enabled for fresh, current Reddit data
        // Temperature set to 0 for deterministic output (prevents model from explaining search)
        const requestBody = {
          model,
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: userMessage }
          ],
          temperature: 0,  // Deterministic - prevents explanations/rambling
          top_p: 0.1,  // Reduce randomness
          max_tokens: CITATION_SEARCH_MAX_TOKENS,
          stream: false,
          plugins: [{ id: 'web' }]  // Web search for current Reddit discussions
        }
        
        const resp = await fetch(OPENROUTER_ENDPOINT, {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://infrasity.com',
            'X-Title': 'Infrasity SERP Scout - Reddit Citation Search'
          },
          body: JSON.stringify(requestBody)
        })
        
        clearTimeout(timeoutId)

        if (!resp.ok) {
          const body = await resp.text()
          throw new Error(`OpenRouter ${resp.status} ${body}`)
        }

        const json = await resp.json()
        const raw = json?.choices?.[0]?.message?.content || ''
        console.log(`[testCitations] ${model} RAW RESPONSE (${raw.length} chars):`, raw.slice(0, 800))
        
        // Handle empty responses - sometimes models return nothing
        if (!raw || raw.trim().length === 0) {
          console.warn(`[testCitations] ${model} returned empty response (0 chars), skipping`)
          record.models[model] = { error: 'Model returned empty response' }
          continue  // Skip to next model
        }
        
        let parsed = null
        try {
          parsed = JSON.parse(extractJsonFromText(raw))
        } catch (parseError) {
          console.warn(`[testCitations] ${model} JSON parsing failed, skipping this model`, parseError.message)
          record.models[model] = { error: `Failed to parse response: ${parseError.message}` }
          continue  // Skip to next model
        }
        
        // Verify parsed is actually an array (not an object or other type)
        if (!Array.isArray(parsed)) {
          console.warn(`[testCitations] ${model} returned non-array JSON (${typeof parsed}), skipping this model`)
          record.models[model] = { error: `Expected array, got ${typeof parsed}` }
          continue  // Skip to next model
        }
        
        // Only keep Reddit posts whose URLs match a real post pattern:
        // reddit.com/r/{subreddit}/comments/{post_id}/...
        // STRICT validation to reject AI-hallucinated URLs
        // Real Reddit post IDs are base36, 5–7 chars (e.g. "1bcd23")
        // Reject: IDs < 5 or > 7 chars, suspicious subreddit/title patterns, repeated characters
        const REAL_REDDIT_POST_RE = /reddit\.com\/r\/[a-z0-9_]{3,20}\/comments\/[a-z0-9]{5,7}(?:\/|$|\?)/i
        const SUSPICIOUS_PATTERN_RE = /(search.?result|test|fake|fake.?post|sample|example|tutorial|guide)/i
        console.log(`[testCitations] ${model} raw entries (${Array.isArray(parsed) ? parsed.length : typeof parsed}):`,
          Array.isArray(parsed) ? parsed.map(e => e?.url).slice(0, 5) : String(parsed).slice(0, 200))
        const validated = Array.isArray(parsed)
          ? parsed
              .filter((entry) => {
                if (!entry || typeof entry.url !== 'string') return false;
                const url = entry.url.trim()
                const subreddit = (entry.subreddit || '').toLowerCase()
                const title = (entry.title || '').toLowerCase()
                
                // Check URL format
                if (!REAL_REDDIT_POST_RE.test(url)) {
                  console.log(`[testCitations] ${model} rejected URL format: ${url}`)
                  return false;
                }
                
                // Reject suspicious subreddit names
                if (SUSPICIOUS_PATTERN_RE.test(subreddit)) {
                  console.log(`[testCitations] ${model} rejected suspicious subreddit: ${subreddit}`)
                  return false;
                }
                
                // Reject suspicious titles
                if (SUSPICIOUS_PATTERN_RE.test(title) || /^\[|^test|^sample|^fake/i.test(title)) {
                  console.log(`[testCitations] ${model} rejected suspicious title: ${title}`)
                  return false;
                }
                
                // Check ID for repeated characters (hallucination sign)
                const idMatch = url.match(/comments\/([a-z0-9]+)/i)
                if (idMatch) {
                  const id = idMatch[1]
                  if (/^(.)(\1){3,}$/.test(id)) { // Matches "aaaa", "1111" etc
                    console.log(`[testCitations] ${model} rejected repeated-char ID: ${id}`)
                    return false;
                  }
                }
                
                return typeof entry.subreddit === 'string' && typeof entry.title === 'string';
              })
              .slice(0, 10)
          : [];
        console.log(`[testCitations] ${model} validated ${validated.length} posts after URL filter`)

        // Fetch actual post content for each citation — drop any posts where fetch fails
        // (avoids showing AI-hallucinated titles paired with wrong URLs)
        const enrichedCitations = (await Promise.all(
          validated.map(async (entry) => {
            const details = await fetchRedditPostDetails(entry.url).catch(() => null)
            if (!details) {
              console.log(`[testCitations] ${model} dropping unverified post (fetch failed): ${entry.url}`)
              return null
            }
            return {
              ...entry,
              title: details.title || entry.title,
              subreddit: details.subreddit || entry.subreddit,
              fullContent: details.post_content || ''
            }
          })
        )).filter(Boolean).map(({ _fetched, ...c }) => c)

        // Run full competitor/brand mention detection on actual post content
        record.models[model] = enrichedCitations.map((entry) => {
          const mentionData = (brandTargets.length || competitorTargets.length)
            ? buildThreadMentionData(
                { fullContent: entry.fullContent || '', title: entry.title || '', snippet: entry.reason || '' },
                competitorTargets, brandTargets
              )
            : { mentionsBrand: false, mentionsCompetitors: [], mentionHighlights: [] }
          const { fullContent, ...entryClean } = entry
          return { ...entryClean, ...mentionData, mentionHighlights: (mentionData.mentionHighlights || []).slice(0, 3) }
        })
      } catch (err) {
        let errorMsg = err.message || 'Citation search failed'
        if (err.name === 'AbortError') {
          errorMsg = `${model} request timed out after ${CITATION_SEARCH_TIMEOUT_MS / 1000}s`
        }
        record.models[model] = {
          error: errorMsg
        }
      }
    }

    records.push(record)
  }

  return {
    domain: normalizedDomain,
    records
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
    companyName: bodyCompanyName,
    competitors: bodyCompetitors,
    llmContext: bodyLlmContext,
    approvedContext: bodyApprovedContext
  } = req.body || {}

  // Handle save keywords action (PERMANENT save, not time-limited)
  if (action === 'saveKeywords') {
    if (!bodyKeywords) {
      return res.status(400).json({ error: 'keywords are required' })
    }
    const companyId = bodyCompanyId ?? null
    try {
      const result = await saveKeywords(companyId, rawDomain, bodyKeywords, userCtx.uid, bodyCompanyName, bodyCompetitors, bodyLlmContext, bodyApprovedContext)
      return res.status(200).json({
        success: true,
        message: result.companyId
          ? 'Keywords and overview saved permanently to database'
          : (result.local ? 'Keywords processed successfully' : 'Keywords saved permanently'),
        saved: result,
        companyId: result.companyId,
        context: result.fullContext,
        keywords: result.fullContext?.approvedContext?.keywords || bodyKeywords,
        domain: result.domain || rawDomain,
        permanent: true,
        savedAt: new Date().toISOString(),
        note: 'Keywords are saved permanently and will not be regenerated. Use SERP analysis to check positions (cached 24hrs).'
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
      const citations = await testCitations(bodyPrompts, rawDomain, req.body.competitors)
      return res.status(200).json({ success: true, ...citations })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Handle fetch post details action (for full content scanning)
  if (action === 'fetchPostDetails') {
    const { url } = req.body
    if (!url) {
      return res.status(400).json({ error: 'url is required' })
    }
    try {
      const postContent = await fetchRedditPostDetails(url)
      return res.status(200).json({ success: true, ...postContent })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // Handle generate post content action
  if (action === 'generatePostContent') {
    const { keyword, domain, companyId: requestCompanyId, redditContext, postStyle = 'with-company' } = req.body
    if (!keyword || !domain) {
      return res.status(400).json({ error: 'keyword and domain are required' })
    }

    try {
      // Get company context
      let companyContext = ''
      let companyName = domain
      if (requestCompanyId) {
        try {
          const context = await getCompanyContext(requestCompanyId)
          const summary = context?.approvedContext?.companySummary || context?.llmContext?.companySummary || ''
          const capabilities = context?.approvedContext?.coreCapabilities || context?.llmContext?.coreCapabilities || []
          const problems = context?.approvedContext?.problemSpaces || context?.llmContext?.problemSpaces || []
          companyName = context?.metadata?.companyName || domain
          companyContext = `${summary}\n\nCapabilities: ${capabilities.join(', ')}\n\nProblems: ${problems.join(', ')}`
        } catch (err) {
          console.warn('[serp-scout] context fetch failed', err.message)
        }
      }

      // Build Reddit discussion context
      let redditDiscussionContext = ''
      if (redditContext && (redditContext.topPosts?.length || redditContext.newPosts?.length)) {
        const topDiscussions = redditContext.topPosts?.slice(0, 3).map(p => ({
          title: p.post_title || '',
          subreddit: p.subreddit || '',
          upvotes: p.upvotes || 0,
          comments: p.total_comments || 0
        })) || []

        const newDiscussions = redditContext.newPosts?.slice(0, 3).map(p => ({
          title: p.post_title || '',
          subreddit: p.subreddit || '',
          comments: p.total_comments || 0
        })) || []

        redditDiscussionContext = `\n\nTop discussions on Reddit about "${keyword}":\n`
        topDiscussions.forEach((post, i) => {
          redditDiscussionContext += `${i + 1}. "${post.title}" in r/${post.subreddit} (${post.upvotes} upvotes, ${post.comments} comments)\n`
        })

        if (newDiscussions.length) {
          redditDiscussionContext += `\nRecent posts:\n`
          newDiscussions.forEach((post, i) => {
            redditDiscussionContext += `${i + 1}. "${post.title}" in r/${post.subreddit} (${post.comments} comments)\n`
          })
        }
      }

      // Build prompt based on post style
      let companyMentionInstruction = ''
      if (postStyle === 'without-company') {
        companyMentionInstruction = `DO NOT mention "${companyName}" or any company by name in these posts. Focus on the problem space, industry insights, and lessons learned without promoting any specific solution.`
      } else {
        companyMentionInstruction = `Mention "${companyName}" naturally (e.g., "I partnered with ${companyName}..." or "${companyName} helped unblock...") without sounding like a marketing pitch if possible.`
      }

      const systemMsg = `You write realistic Reddit posts. Output ONLY valid JSON array with exactly 3 posts. Each post must have: title, content (50-100 words), subreddit name (no r/), and rationale. No other text.`
      
      const prompt = `Write 3 Reddit posts about "${keyword}".
${companyMentionInstruction}

Return this exact format - ONLY JSON, nothing else:
[{"title":"post title","content":"post body here","subreddit":"subname","rationale":"why good"},{"title":"post title","content":"post body here","subreddit":"subname","rationale":"why good"},{"title":"post title","content":"post body here","subreddit":"subname","rationale":"why good"}]`

      const messages = [
        { role: 'system', content: systemMsg },
        { role: 'user', content: prompt }
      ]

      const raw = await callOpenRouter(messages, 0.5, 1536)
      let posts = []
      
      // If response is empty or too short, skip parsing and use fallback
      if (raw && raw.trim().length > 50) {
        try {
          const extracted = extractJsonFromText(raw)
          const json = JSON.parse(extracted)
          posts = Array.isArray(json) ? json.slice(0, 3) : []
          
          // Ensure all required fields exist
          posts = posts.filter(p => p.title && p.content && p.subreddit)
        } catch (parseError) {
          console.error('[serp-scout] failed to parse post content', parseError.message)
          console.error('[serp-scout] raw response was:', raw.slice(0, 500))
        }
      } else {
        console.warn('[serp-scout] empty or short LLM response, using fallback directly')
      }
      
      // If no posts from LLM, use template-based fallback
      if (posts.length === 0) {
        posts = [
          {
            title: `My experience with ${keyword} - lessons learned`,
            content: `Been dealing with ${keyword} for a while now. Here's what I've learned: Start small, test thoroughly, and don't skip the documentation. The teams that succeed understand their use case first before diving in.`,
            subreddit: 'webdev',
            rationale: 'Authentic experience-sharing that adds practical value'
          },
          {
            title: `${keyword} implementation checklist - what actually matters`,
            content: `After going through this multiple times, here's what actually matters for ${keyword}: Clear requirements, team alignment, testing strategy, and monitoring. Skip any of these and you'll regret it later. The investments upfront save so much pain.`,
            subreddit: 'devops',
            rationale: 'Practical checklist that readers can immediately apply'
          },
          {
            title: `Is ${keyword} worth it? Real talk`,
            content: `Honest answer: it depends. For teams scaling fast, yes. For teams staying small, maybe not yet. The key is understanding your actual needs before you commit. We started using it when we had 5 people, and it's been solid as we've grown to 15.`,
            subreddit: 'startups',
            rationale: 'Balanced perspective that different readers can relate to'
          }
        ]
      }

      return res.status(200).json({ success: true, posts })
    } catch (error) {
      console.error('[serp-scout] generate post content failed', error.message)
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
      const promptText = `You are generating prompts that guide LLMs to produce authentic ranking or comparison lists where ${companyName} would naturally appear alongside other reputable solutions.

    INSTRUCTIONS:
    - Generate EXACTLY ${LLM_PROMPTS} prompts for the keyword "${keyword}" (intent: ${intent || 'informational'}).
    - Each prompt should describe a real research question someone might ask, like "Top X" or "Compare" statements, that invite measurable comparison without sounding promotional.
    - Mention real-world angles (e.g., "teams evaluating", "platforms trusted by", "alternatives for", "leading" etc.) so the resulting answers naturally include ${companyName} in context.
    - Avoid vague question stems ("What is...", "How to...") or prompts that read like a product page.
    - Prompts should stay neutral but signal that the author wants multiple credible contenders, not just the single company.

    EXAMPLES:
    - "Top 10 ${keyword} platforms for engineering teams balancing speed and security"
    - "Compare ${keyword} solutions trusted by developer-first B2B SaaS companies"
    - "Alternatives to ${keyword} vendors for customer-facing AI agents"
    - "Rank ${keyword} orchestration tools used by enterprise scalability teams"
    - "Best ${keyword} stacks for lean engineering organizations"

    Return ONLY a strict JSON array of ${LLM_PROMPTS} strings. No prose, no code fences, no keys. Example:
    ["Top 10 ${keyword} platforms for enterprises","Compare ${keyword} solutions trusted by teams","Alternatives to ${keyword} vendors","Rank ${keyword} providers by resilience","Best ${keyword} stacks for lean engineering"]`

      const messages = [
        { role: 'system', content: `You are an SEO expert. Generate general ranking/comparison prompts that would naturally surface "${companyName}" in LLM recommendations.` },
        { role: 'user', content: promptText }
      ]
      const raw = await callOpenRouter(messages, 0.7, 512)
      console.log('[serp-scout] openrouter response for suggestPrompts', raw.slice(0, 500))

      let prompts = []
      try {
        const json = JSON.parse(extractJsonFromText(raw))
        prompts = Array.isArray(json) ? json.slice(0, LLM_PROMPTS) : []
      } catch (parseError) {
        console.error('[serp-scout] failed to parse LLM response, using fallback prompts', parseError.message)
        // Fallback: generate ranking prompts
        const base = [
          `Top 5 ${keyword} solutions`,
          `Best platforms for ${keyword}`,
          `Which ${keyword} tools are best for startups?`,
          `Top alternatives in the ${keyword} space`,
          `Best ${keyword} services and platforms 2024`
        ]
        prompts = base.slice(0, LLM_PROMPTS)
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

  // Handle update company context action
  if (action === 'updateCompanyContext') {
    if (!bodyCompanyId) return res.status(400).json({ error: 'companyId is required' })
    const { companySummary, coreCapabilities, problemSpaces, constraints } = req.body

    try {
      const context = await getCompanyContext(bodyCompanyId)
      if (!context) return res.status(404).json({ error: 'Company not found' })

      const updatedContext = {
        ...context,
        approvedContext: {
          ...(context.approvedContext || {}),
          companySummary: companySummary !== undefined ? companySummary : context.approvedContext?.companySummary,
          coreCapabilities: coreCapabilities !== undefined ? coreCapabilities : context.approvedContext?.coreCapabilities,
          problemSpaces: problemSpaces !== undefined ? problemSpaces : context.approvedContext?.problemSpaces,
          constraints: constraints !== undefined ? constraints : context.approvedContext?.constraints,
          competitors: req.body.competitors !== undefined ? req.body.competitors : context.approvedContext?.competitors
        },
        metadata: {
          ...(context.metadata || {}),
          updatedAt: new Date().toISOString()
        }
      }

      const saved = await saveCompanyContext(bodyCompanyId, updatedContext)
      if (!saved) return res.status(500).json({ error: 'Failed to update context' })

      return res.status(200).json({ success: true, companyContext: saved })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  // ── Citation cache ────────────────────────────────────────────────────────
  if (action === 'getCitationCache') {
    const { companyId: reqCompanyId, keyword } = req.body
    if (!reqCompanyId || !keyword) return res.status(400).json({ error: 'companyId and keyword required' })
    try {
      const context = await getCompanyContext(reqCompanyId)
      const cached = context?.approvedContext?.citationCache?.[keyword]
      if (!cached?.records?.length) return res.status(200).json({ found: false })
      const stale = needsRefresh(cached.cachedAt, 24)
      return res.status(200).json({ found: true, stale, records: cached.records, summary: cached.summary, cachedAt: cached.cachedAt })
    } catch (e) {
      return res.status(200).json({ found: false })
    }
  }

  if (action === 'saveCitationCache') {
    const { companyId: reqCompanyId, keyword, records, summary } = req.body
    if (!reqCompanyId || !keyword || !records?.length) return res.status(400).json({ error: 'missing params' })
    try {
      const context = await getCompanyContext(reqCompanyId)
      if (!context) return res.status(404).json({ error: 'company not found' })
      const citationCache = context.approvedContext?.citationCache || {}
      citationCache[keyword] = { records, summary, cachedAt: new Date().toISOString() }
      await saveCompanyContext(reqCompanyId, {
        domain: context.domain,
        metadata: context.metadata,
        llmContext: context.llmContext,
        approvedContext: { ...context.approvedContext, citationCache },
      })
      return res.status(200).json({ success: true })
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  }

  // Fast path: DataForSEO SERP position + dork only (no Reddit API, no enrichment)
  // Returns SERP Threads + dork links in ~3s so the UI can show that tab immediately.
  if (action === 'serpAndDork') {
    const { keyword, domain, companyId: reqCompanyId, force } = req.body
    if (!keyword || !domain) return res.status(400).json({ error: 'keyword and domain are required' })
    const _t0 = Date.now()
    try {
      const targetDomain = ensureDomain(domain)

      // Serve from cache unless force refresh requested
      if (reqCompanyId && !force) {
        const cached = await getSerpAnalysis(reqCompanyId, keyword)
        if (cached && (cached.redditThreads?.length || cached.position != null)) {
          console.log('[serp-scout] serpAndDork cache hit', { keyword, stale: cached.stale })
          logSerpAction({ user: userCtx, action: 'serpAndDork', domain: targetDomain, keyword, durationMs: Date.now() - _t0, fromCache: true, audit: true }).catch(() => {})
          return res.status(200).json({
            success: true,
            keyword,
            domain: targetDomain,
            position: cached.position,
            examined: cached.examined,
            redditThreads: cached.redditThreads || [],
            dorkRedditLinks: cached.dorkRedditLinks || [],
            enriched: false,
            fromCache: true,
            stale: cached.stale || false,
            analyzedAt: cached.analyzedAt,
          })
        }
      }

      const [serpData, dataForSeoData] = await Promise.all([
        fetchKeywordSerpPosition(keyword, targetDomain, 100),
        fetchRedditViaDataForSeo(keyword),
      ])
      const redditThreads = Array.isArray(serpData.redditThreads) ? serpData.redditThreads : []
      const organicUrls = new Set(redditThreads.map(t => (t.url || '').toLowerCase()))
      const dorkFiltered = (dataForSeoData.top_posts || []).slice(0, 15).filter(p => {
        const u = (p.post_url || '').toLowerCase()
        return u && !organicUrls.has(u)
      })
      const mappedThreads = redditThreads.map(t => {
        const snip = t.snippet || ''
        const votesMatch = snip.match(/(\d[\d,]*)\s+(?:votes?|upvotes?|points?)/i)
        const commentsMatch = snip.match(/(\d[\d,]*)\s+(?:comments?|replies)/i)
        const upvotes = votesMatch ? parseInt(votesMatch[1].replace(/,/g, ''), 10) : 0
        const total_comments = commentsMatch ? parseInt(commentsMatch[1].replace(/,/g, ''), 10) : 0
        return { ...t, upvotes, total_comments, mentionsBrand: false, mentionsCompetitors: [], mentionHighlights: [] }
      })
      const mappedDork = dorkFiltered.map(p => ({ ...p, mentionsBrand: false, mentionsCompetitors: [], mentionHighlights: [] }))

      // Save in background — don't block response
      if (reqCompanyId) {
        saveSerpAnalysis(reqCompanyId, keyword, {
          position: serpData.position,
          examined: serpData.examined,
          redditThreads: mappedThreads,
          dorkRedditLinks: mappedDork,
        }).catch(e => console.warn('[serp-scout] serpAndDork save failed', e.message))
      }

      logSerpAction({ user: userCtx, action: 'serpAndDork', domain: targetDomain, keyword, durationMs: Date.now() - _t0, fromCache: false, audit: true }).catch(() => {})
      return res.status(200).json({
        success: true,
        keyword,
        domain: targetDomain,
        position: serpData.position,
        examined: serpData.examined,
        redditThreads: mappedThreads,
        dorkRedditLinks: mappedDork,
        enriched: false,
        fromCache: false,
      })
    } catch (error) {
      console.error('[serp-scout] serpAndDork failed', error.message)
      logSerpAction({ user: userCtx, action: 'serpAndDork', domain, keyword: req.body.keyword, durationMs: Date.now() - _t0, error: error.message }).catch(() => {})
      return res.status(500).json({ error: error.message })
    }
  }

  // Fast path: Reddit API top/new posts only (independent of DataForSEO)
  if (action === 'redditTopNew') {
    const { keyword, companyId: reqCompanyId, force } = req.body
    if (!keyword) return res.status(400).json({ error: 'keyword is required' })
    const _t0 = Date.now()
    try {
      // Serve from cache unless force refresh requested.
      // Skip cache if ALL posts have 0 upvotes — means old bad data was saved.
      if (reqCompanyId && !force) {
        const cached = await getSerpAnalysis(reqCompanyId, keyword)
        const cachedTop = cached?.topRedditPosts || []
        const hasRealUpvotes = cachedTop.some(p => (p.upvotes || p.score || 0) > 0)
        if (cached && cachedTop.length > 0 && hasRealUpvotes) {
          console.log('[serp-scout] redditTopNew cache hit', { keyword, stale: cached.stale, sampleUpvotes: cachedTop[0]?.upvotes })
          logSerpAction({ user: userCtx, action: 'redditTopNew', domain: req.body.domain, keyword, durationMs: Date.now() - _t0, fromCache: true }).catch(() => {})
          return res.status(200).json({
            success: true,
            keyword,
            topRedditPosts: cached.topRedditPosts || [],
            newRedditPosts: cached.newRedditPosts || [],
            enriched: false,
            fromCache: true,
            stale: cached.stale || false,
            analyzedAt: cached.analyzedAt,
          })
        }
        if (cached && cachedTop.length > 0 && !hasRealUpvotes) {
          console.log('[serp-scout] redditTopNew cache has 0 upvotes — skipping cache, fetching fresh')
        }
      }

      const normalize = (post) => {
        // Parse as number — API may return string like "1.2k" or numeric
        const toNum = v => { const n = parseInt(v, 10); return isNaN(n) ? 0 : n }
        const upvotes = toNum(post.upvotes ?? post.score ?? post.ups ?? post.vote_count ?? post.likes ?? post.points ?? 0)
        const total_comments = toNum(post.total_comments ?? post.num_comments ?? post.comment_count ?? post.comments ?? 0)
        return {
          ...post, // pass all raw fields through so PostCard can find any field name
          post_url: post.post_url || post.url || '',
          post_title: post.post_title || post.title || post.name || '',
          subreddit: post.subreddit || post.community || post.subreddit_name_prefixed?.replace('r/', '') || '',
          upvotes,
          total_comments,
          post_content: post.post_content || post.selftext || post.body || '',
          source: 'reddit_api',
          mentionsBrand: false,
          mentionsCompetitors: [],
          mentionHighlights: [],
        }
      }

      const redditData = await fetchRedditTopNewPosts(keyword)
      // Debug: log raw field names from the API so we can verify normalization
      if (redditData.top_posts?.length > 0) {
        const sample = redditData.top_posts[0]
        console.log('[redditTopNew] raw post fields:', Object.keys(sample).join(', '))
        console.log('[redditTopNew] raw post sample:', JSON.stringify({
          upvotes: sample.upvotes, score: sample.score, ups: sample.ups,
          vote_count: sample.vote_count, likes: sample.likes,
          num_comments: sample.num_comments, total_comments: sample.total_comments,
          comment_count: sample.comment_count,
        }))
      }
      const topRedditPosts = (redditData.top_posts || []).slice(0, 10).map(normalize)
      const newRedditPosts = (redditData.new_posts || []).slice(0, 10).map(normalize)

      console.log('[redditTopNew] normalized top[0]:', topRedditPosts[0] ? {
        title: topRedditPosts[0].post_title?.substring(0, 40),
        upvotes: topRedditPosts[0].upvotes,
        total_comments: topRedditPosts[0].total_comments,
      } : 'no posts')

      // Only save to cache if we got real upvote data — avoids poisoning cache with 0s
      if (reqCompanyId && topRedditPosts.some(p => p.upvotes > 0)) {
        saveSerpAnalysis(reqCompanyId, keyword, { topRedditPosts, newRedditPosts })
          .catch(e => console.warn('[serp-scout] redditTopNew save failed', e.message))
      }

      logSerpAction({ user: userCtx, action: 'redditTopNew', domain: req.body.domain, keyword, durationMs: Date.now() - _t0, fromCache: false }).catch(() => {})
      return res.status(200).json({
        success: true,
        keyword,
        topRedditPosts,
        newRedditPosts,
        enriched: false,
        fromCache: false,
      })
    } catch (error) {
      console.error('[serp-scout] redditTopNew failed', error.message)
      logSerpAction({ user: userCtx, action: 'redditTopNew', domain: req.body.domain, keyword: req.body.keyword, durationMs: Date.now() - _t0, error: error.message }).catch(() => {})
      return res.status(500).json({ error: error.message })
    }
  }

  if (action === 'keywordSerp') {
    const { keyword, domain, companyId: requestCompanyId, quickMode } = req.body
    if (!keyword) {
      return res.status(400).json({ error: 'keyword is required' })
    }
    if (!domain) {
      return res.status(400).json({ error: 'domain is required' })
    }
    const _t0 = Date.now()
    try {
      const targetDomain = ensureDomain(domain)

      // Check if we have cached SERP analysis for this keyword (24hr cache)
      // Skip cache for quickMode so phase 2 can still run full enrichment
      if (requestCompanyId && !quickMode) {
        const cachedAnalysis = await getSerpAnalysis(requestCompanyId, keyword)
        if (cachedAnalysis) {
          console.log('[serp-scout] returning cached SERP analysis', { keyword, companyId: requestCompanyId })
          return res.status(200).json({
            success: true,
            keyword,
            domain: targetDomain,
            position: cachedAnalysis.position,
            examined: cachedAnalysis.examined,
            redditThreads: cachedAnalysis.redditThreads,
            hasRedditMentions: cachedAnalysis.hasRedditMentions,
            topRedditPosts: cachedAnalysis.topRedditPosts || cachedAnalysis.redditThreads || [],
            newRedditPosts: cachedAnalysis.newRedditPosts || [],
            suggestedPosts: cachedAnalysis.suggestedPosts || (cachedAnalysis.redditThreads || []).slice(0, 5),
            organicResults: cachedAnalysis.organicResults || [],
            fromCache: true,
            analyzedAt: cachedAnalysis.analyzedAt,
            expiresAt: cachedAnalysis.expiresAt
          })
        }
      }

      // --- 1. KEYWORD SERP ANALYSIS (Step 5) ---
      // Run SERP fetch, Reddit API, DataForSEO, and company context fetch all in parallel
      console.log('[serp-scout] fetching fresh SERP data + Reddit posts in parallel', { keyword, domain: targetDomain })

      const [serpData, redditApiData, dataForSeoData, storedCompanyContext] = await Promise.all([
        fetchKeywordSerpPosition(keyword, targetDomain, 100),
        fetchRedditTopNewPosts(keyword),
        fetchRedditViaDataForSeo(keyword),
        requestCompanyId ? getCompanyContext(requestCompanyId).catch(err => {
          console.warn('[serp-scout] context fetch failed', err.message)
          return null
        }) : Promise.resolve(null)
      ])

      const redditThreads = Array.isArray(serpData.redditThreads) ? serpData.redditThreads : []

      // Debug: log raw API data
      if (redditApiData.top_posts && redditApiData.top_posts.length > 0) {
        console.log('[serp-scout] Reddit API top_posts[0]:', JSON.stringify({
          keys: Object.keys(redditApiData.top_posts[0]),
          sample: {
            title: redditApiData.top_posts[0].post_title || redditApiData.top_posts[0].title,
            url: redditApiData.top_posts[0].post_url || redditApiData.top_posts[0].url,
            upvotes: redditApiData.top_posts[0].upvotes || redditApiData.top_posts[0].score,
            score: redditApiData.top_posts[0].score,
            comments: redditApiData.top_posts[0].total_comments || redditApiData.top_posts[0].comments
          }
        }, null, 2))
      }
      if (dataForSeoData.top_posts && dataForSeoData.top_posts.length > 0) {
        console.log('[serp-scout] DataForSEO top_posts[0]:', JSON.stringify({
          keys: Object.keys(dataForSeoData.top_posts[0]),
          upvotes: dataForSeoData.top_posts[0].upvotes,
          total_comments: dataForSeoData.top_posts[0].total_comments
        }, null, 2))
      }
      // Keep raw dork results before merging — these are the pure `site:reddit.com keyword` hits
      const rawDorkResults = (dataForSeoData.top_posts || []).slice(0, 15)

      // MERGE STRATEGY:
      // 1. Combine both lists, dedup by URL
      // 2. When a post exists in BOTH sources — enrich Reddit API data with DataForSEO's serp_rank
      // 3. Sort by composite score: engagement (from Reddit API) + SERP relevance (from DataForSEO)

      const mergePosts = (redditList, seoList) => {
        const map = new Map()

        // Helper to normalize URL for dedup key
        const getKey = (url) => url ? url.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '').replace(/\/+$/, '') : ''

        // Build a lookup from DataForSEO results (keyed by URL)
        const seoLookup = new Map()
        seoList.forEach(post => {
          const key = getKey(post.post_url)
          if (key) seoLookup.set(key, post)
        })

        // Add Reddit API posts first (better metadata: real upvotes/comments)
        redditList.forEach(post => {
          const rawUrl = post.post_url || post.url || ''
          const key = getKey(rawUrl)
          if (!key) return
          const seoMatch = seoLookup.get(key)
          map.set(key, {
            ...post,
            // Normalize URL field so downstream code can always use post_url
            post_url: post.post_url || post.url || '',
            // Normalize title field
            post_title: post.post_title || post.title || '',
            // Normalize upvote/comment fields from Reddit API (may use score/ups/num_comments)
            upvotes: post.upvotes || post.score || post.ups || post.points || 0,
            total_comments: post.total_comments || post.num_comments || post.comments || 0,
            source: seoMatch ? 'both' : 'reddit_api',
            serp_rank: seoMatch?.serp_rank || 999 // Enrich with SERP rank if available
          })
        })

        // Add DataForSEO-only posts (ones NOT found in Reddit API)
        seoList.forEach(post => {
          const key = getKey(post.post_url)
          if (key && !map.has(key)) {
            map.set(key, { ...post, source: 'dataforseo' })
          }
        })

        return Array.from(map.values())
      }

      // Merge "Top" candidates
      const allTopCandidates = mergePosts(redditApiData.top_posts || [], dataForSeoData.top_posts || [])

      // Debug: log what we got from merge
      if (allTopCandidates.length > 0) {
        const post = allTopCandidates[0]
        console.log('[serp-scout] 📦 MERGED POST SAMPLE:', JSON.stringify({
          title: post.post_title?.substring(0, 40),
          upvotes: post.upvotes,
          score: post.score,
          upvotesType: typeof post.upvotes,
          hasUpvoteField: 'upvotes' in post,
          source: post.source,
          sourceCheck: {
            isRedditApi: post.source === 'reddit_api',
            isBoth: post.source === 'both'
          }
        }, null, 2))
      }

      // Sort by COMPOSITE SCORE:
      // - Posts found in both sources get a bonus (they're validated by Google AND Reddit)
      // - Then sort by engagement (upvotes + comments) as primary
      // - Use SERP rank as tiebreaker (lower rank = higher in Google = better)
      const topRedditPosts = allTopCandidates
        .sort((a, b) => {
          const bothBonus = (src) => src === 'both' ? 1000 : 0
          const engagementA = (a.upvotes || 0) + (a.total_comments || 0) + bothBonus(a.source)
          const engagementB = (b.upvotes || 0) + (b.total_comments || 0) + bothBonus(b.source)
          if (engagementB !== engagementA) return engagementB - engagementA
          return (a.serp_rank || 999) - (b.serp_rank || 999) // tiebreaker: Google rank
        })
        .slice(0, 10)

      // Merge "New" candidates — prioritize Reddit API's new posts, backfill with DataForSEO
      const allNewCandidates = mergePosts(redditApiData.new_posts || [], dataForSeoData.new_posts || [])
      const newRedditPosts = allNewCandidates.slice(0, 10)


      // Build mention targets from already-fetched company context
      const companyContext = (() => {
        if (!storedCompanyContext) return ''
        const summary = storedCompanyContext?.approvedContext?.companySummary || storedCompanyContext?.llmContext?.companySummary || ''
        const capabilities = storedCompanyContext?.approvedContext?.coreCapabilities || storedCompanyContext?.llmContext?.coreCapabilities || []
        const problems = storedCompanyContext?.approvedContext?.problemSpaces || storedCompanyContext?.llmContext?.problemSpaces || []
        return `${summary}\n\nCapabilities: ${capabilities.join(', ')}\n\nProblems: ${problems.join(', ')}`
      })()

      // Pre-compute dork filter from raw redditThreads URLs (before enrichment)
      // so all 4 enrichment batches can run in parallel
      const organicThreadUrls = new Set(redditThreads.map(t => (t.url || '').toLowerCase()))
      const dorkResultsFiltered = rawDorkResults.filter(post => {
        const url = (post.post_url || '').toLowerCase()
        return url && !organicThreadUrls.has(url)
      })

      // quickMode: skip fetching full post content (fast path — caller will enrich in a second request)
      if (quickMode) {
        console.log('[serp-scout] quickMode — skipping post enrichment, returning raw data immediately')
        return res.status(200).json({
          success: true,
          keyword,
          domain: targetDomain,
          position: serpData.position,
          examined: serpData.examined,
          redditThreads: redditThreads.map(t => ({ ...t, mentionsBrand: false, mentionsCompetitors: [], mentionHighlights: [] })),
          hasRedditMentions: redditThreads.length > 0,
          topRedditPosts: topRedditPosts.map(p => ({ ...p, mentionsBrand: false, mentionsCompetitors: [], mentionHighlights: [] })),
          newRedditPosts: newRedditPosts.map(p => ({ ...p, mentionsBrand: false, mentionsCompetitors: [], mentionHighlights: [] })),
          dorkRedditLinks: dorkResultsFiltered.map(p => ({ ...p, mentionsBrand: false, mentionsCompetitors: [], mentionHighlights: [] })),
          suggestedPosts: [],
          organicResults: [],
          fromCache: false,
          enriched: false,
          analyzedAt: new Date().toISOString(),
        })
      }

      // Run all 4 enrichment batches in parallel — all tasks queue into the shared limiter together
      console.log('[serp-scout] enriching all posts in parallel', {
        threads: redditThreads.length, top: topRedditPosts.length,
        new: newRedditPosts.length, dork: dorkResultsFiltered.length
      })
      const fetchContent = (post) => postDetailsLimiter(async () => {
        const details = await fetchRedditPostDetails(post.post_url || post.url)
        return { ...post, fullContent: details?.post_content || post.post_content || post.snippet || '' }
      })

      const [threadsWithContent, topPostsWithContent, newPostsWithContent, dorkResultsWithContent] = await Promise.all([
        redditThreads.length
          ? Promise.all(redditThreads.map(thread => postDetailsLimiter(() => enrichRedditThread(thread))))
          : Promise.resolve([]),
        topRedditPosts.length > 0
          ? Promise.all(topRedditPosts.map(fetchContent))
          : Promise.resolve(topRedditPosts),
        newRedditPosts.length > 0
          ? Promise.all(newRedditPosts.map(fetchContent))
          : Promise.resolve(newRedditPosts),
        dorkResultsFiltered.length > 0
          ? Promise.all(dorkResultsFiltered.map(fetchContent))
          : Promise.resolve(dorkResultsFiltered),
      ])

      const reqCompetitors = Array.isArray(req.body.competitors)
        ? req.body.competitors
        : req.body.competitors
          ? [req.body.competitors]
          : [];
      // Also pull in any competitors saved in the company context (stored previously)
      const storedCompetitors = storedCompanyContext?.approvedContext?.competitors || []
      const allCompetitorEntries = [
        ...reqCompetitors,
        ...storedCompetitors.filter(c => c != null).map(c => String(c))
      ]
      const competitorTargets = buildCompetitorTargets(allCompetitorEntries)

      const brandDomain = targetDomain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')
      const brandDisplayName = (storedCompanyContext?.metadata?.companyName || brandDomain).trim()
      const brandTargets = []
      const brandNameNormalized = normalizeMentionValue(brandDisplayName)
      if (brandNameNormalized) {
        brandTargets.push({ normalized: brandNameNormalized, label: brandDisplayName })
      }
      const brandDomainNormalized = normalizeMentionValue(brandDomain)
      if (brandDomainNormalized && brandDomainNormalized !== brandNameNormalized) {
        brandTargets.push({ normalized: brandDomainNormalized, label: brandDomain })
      }
      // Also add short brand name without TLD (e.g. "infrasity" from "infrasity.com")
      // so posts that mention the name without .com are still detected
      if (/^[a-z0-9][a-z0-9-]*\.[a-z]{2,}$/.test(brandDomainNormalized)) {
        const shortBrand = brandDomainNormalized.replace(/\.[a-z]{2,6}$/, '').replace(/-/g, ' ').trim()
        if (shortBrand && shortBrand.length > 2 && shortBrand !== brandNameNormalized && shortBrand !== brandDomainNormalized) {
          brandTargets.push({ normalized: shortBrand, label: shortBrand })
        }
      }

      // Debug mention targets
      console.log('[serp-scout] 🎯 MENTION SEARCH TARGETS:', JSON.stringify({
        brandTargets: brandTargets.map(t => t.normalized),
        competitorCount: competitorTargets.length,
        sampleCompetitors: competitorTargets.slice(0, 3).map(t => t.normalized)
      }, null, 2))

      const enrichedRedditThreads = threadsWithContent.map(thread => {
        const { fullContent, ...threadCore } = thread
        const mentionData = buildThreadMentionData(thread, competitorTargets, brandTargets)
        return {
          ...threadCore,
          ...mentionData,
          mentionHighlights: (mentionData.mentionHighlights || []).slice(0, 3)
        }
      })

      // Enrich top/new posts with competitor/brand mention detection
      const enrichedTopPosts = topPostsWithContent.map(post => {
        const mentionData = buildThreadMentionData(
          {
            fullContent: post.fullContent || post.post_content || '',
            snippet: post.post_snippet || post.snippet || '',
            title: post.post_title || post.title || ''
          },
          competitorTargets, brandTargets
        )
        return {
          ...post,
          upvotes: post.upvotes || post.score || post.points || 0,
          total_comments: post.total_comments || post.comments || post.num_comments || 0,
          ...mentionData,
          mentionHighlights: (mentionData.mentionHighlights || []).slice(0, 3)
        }
      })
      const enrichedNewPosts = newPostsWithContent.map(post => {
        const mentionData = buildThreadMentionData(
          {
            fullContent: post.fullContent || post.post_content || '',
            snippet: post.post_snippet || post.snippet || '',
            title: post.post_title || post.title || ''
          },
          competitorTargets, brandTargets
        )
        return {
          ...post,
          upvotes: post.upvotes || post.score || post.points || 0,
          total_comments: post.total_comments || post.comments || post.num_comments || 0,
          ...mentionData,
          mentionHighlights: (mentionData.mentionHighlights || []).slice(0, 3)
        }
      })

      // Debug logging: check post structure and mention detection
      if (enrichedTopPosts.length > 0) {
        const sample = enrichedTopPosts[0]
        console.log('[serp-scout] ✓ ENRICHED TOP POST #1:', JSON.stringify({
          title: sample.post_title?.substring(0, 40),
          url: sample.post_url?.substring(0, 40),
          upvotes: sample.upvotes,
          score: sample.score,
          comments: sample.total_comments,
          mentionsBrand: sample.mentionsBrand,
          competitorsFound: sample.mentionsCompetitors?.length || 0,
          source: sample.source,
          fullContentLength: sample.fullContent?.length || 0,
          mentionHighlights: sample.mentionHighlights?.length || 0
        }, null, 2))
      }
      if (enrichedNewPosts.length > 0) {
        const sample = enrichedNewPosts[0]
        console.log('[serp-scout] ✓ ENRICHED NEW POST #1:', JSON.stringify({
          title: sample.post_title?.substring(0, 40),
          upvotes: sample.upvotes,
          mentionsBrand: sample.mentionsBrand,
          competitorsFound: sample.mentionsCompetitors?.length || 0,
          fullContentLength: sample.fullContent?.length || 0
        }, null, 2))
      }
      const enrichedDorkLinks = dorkResultsWithContent.map(post => {
        const mentionData = buildThreadMentionData(
          {
            fullContent: post.fullContent || post.post_content || '',
            snippet: post.post_snippet || post.snippet || '',
            title: post.post_title || post.title || ''
          },
          competitorTargets, brandTargets
        )
        return {
          ...post,
          upvotes: post.upvotes || post.score || post.points || 0,
          total_comments: post.total_comments || post.comments || post.num_comments || 0,
          ...mentionData,
          mentionHighlights: (mentionData.mentionHighlights || []).slice(0, 3)
        }
      })
      if (enrichedDorkLinks.length > 0) {
        const sample = enrichedDorkLinks[0]
        console.log('[serp-scout] ✓ ENRICHED DORK LINK #1:', JSON.stringify({
          title: sample.post_title?.substring(0, 40),
          mentionsBrand: sample.mentionsBrand,
          fullContentLength: sample.fullContent?.length || 0
        }, null, 2))
      }

      // Save SERP analysis for 24hr cache
      if (requestCompanyId) {
        await saveSerpAnalysis(requestCompanyId, keyword, {
          position: serpData.position,
          examined: serpData.examined,
          redditThreads: enrichedRedditThreads,
          hasRedditMentions: enrichedRedditThreads.length > 0,
          topRedditPosts: enrichedTopPosts,
          newRedditPosts: enrichedNewPosts,
          dorkRedditLinks: enrichedDorkLinks,
          suggestedPosts: [],
          organicResults: []
        })
      }

      logSerpAction({ user: userCtx, action: 'keywordSerp', domain: targetDomain, keyword, durationMs: Date.now() - _t0, fromCache: false }).catch(() => {})
      return res.status(200).json({
        success: true,
        keyword,
        domain: targetDomain,
        position: serpData.position,
        examined: serpData.examined,
        redditThreads: enrichedRedditThreads,
        hasRedditMentions: enrichedRedditThreads.length > 0,
        topRedditPosts: enrichedTopPosts,
        newRedditPosts: enrichedNewPosts,
        dorkRedditLinks: enrichedDorkLinks,
        suggestedPosts: [],
        organicResults: [],
        fromCache: false,
        analyzedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      })
    } catch (error) {
      console.error('[serp-scout] keyword SERP failed', error.message)
      logSerpAction({ user: userCtx, action: 'keywordSerp', domain: req.body.domain, keyword: req.body.keyword, durationMs: Date.now() - _t0, error: error.message }).catch(() => {})
      if (error.message.includes('429') || error.message.includes('Rate limit')) {
        return res.status(429).json({ error: 'DataForSEO rate limit exceeded', message: 'Please retry shortly.' })
      }
      return res.status(500).json({ error: error.message })
    }
  }

  const domain = ensureDomain(rawDomain)
  if (!domain) {
    return res.status(400).json({ error: 'domain is required' })
  }
  const _domainStart = Date.now()

  // Only use company ID if explicitly provided by user (optional)
  const requestedCompanyId = bodyCompanyId ?? null
  let resolvedCompanyId = requestedCompanyId

  // If no company ID provided, look up this user's existing context by domain first
  if (!resolvedCompanyId && !forceContext) {
    const existingCtx = await getContextByDomainAndUser(domain, userCtx.uid)
    if (existingCtx?.companyId) {
      resolvedCompanyId = existingCtx.companyId
      console.log('[serp-scout] found user-scoped context by domain', { domain, companyId: resolvedCompanyId, userId: userCtx.uid })
    }
  }

  console.log('[serp-scout] company association', { domain, requestedCompanyId, resolvedCompanyId, isIndependent: !resolvedCompanyId })

  // Check if keywords already exist for this company (permanent data, not time-limited)
  if (resolvedCompanyId && !forceContext) {
    const existingContext = await getCompanyContext(resolvedCompanyId)
    const existingKeywords = existingContext?.approvedContext?.keywords || []

    if (existingKeywords.length > 0) {
      // Check if company overview (summary) is present — older users may have keywords but no context
      const hasSummary = existingContext?.approvedContext?.companySummary || existingContext?.llmContext?.companySummary
      let returnContext = existingContext

      if (!hasSummary) {
        // Regenerate and save context so returning users get their overview
        console.log('[serp-scout] keywords exist but no company summary — regenerating context', { companyId: resolvedCompanyId })
        try {
          const pages = await scrapeDomainPages(domain)
          if (pages?.length) {
            const extractedName = extractCompanyNameFromContent(pages, domain)
            returnContext = await generateCompanyContext(domain, resolvedCompanyId, extractedName, true, pages, userCtx.uid)
          }
        } catch (e) {
          console.warn('[serp-scout] context regeneration failed (non-fatal):', e.message)
        }
      }

      console.log('[serp-scout] returning existing keywords and overview (PERMANENT)', {
        companyId: resolvedCompanyId,
        domain,
        keywordCount: existingKeywords.length,
        savedAt: existingContext.metadata?.keywordsSavedAt || existingContext.generatedAt
      })
      logSerpAction({ user: userCtx, action: 'analyzeDomain', domain, durationMs: Date.now() - _domainStart, fromCache: true, audit: true }).catch(() => {})
      return res.status(200).json({
        success: true,
        domain: returnContext?.domain || existingContext.domain || domain,
        companyId: resolvedCompanyId,
        companyName: returnContext?.metadata?.companyName || existingContext.metadata?.companyName || domain,
        keywords: existingKeywords,
        explain: null,
        companyContext: returnContext,
        fromExisting: true,
        savedAt: existingContext.metadata?.keywordsSavedAt || existingContext.generatedAt,
        message: 'Keywords and overview already exist. Use SERP analysis to check positions.'
      })
    }
  }

  // Scrape domain pages to extract content and company name
  let pages
  try {
    pages = await scrapeDomainPages(domain)
    if (!pages || !pages.length) {
      throw new Error('Unable to scrape any pages from the domain')
    }
  } catch (error) {
    logSerpAction({ user: userCtx, action: 'analyzeDomain', domain, durationMs: Date.now() - _domainStart, error: `scrape failed: ${error.message}` }).catch(() => {})
    return res.status(502).json({ error: error.message })
  }

  // Extract company name from scraped content (independent of database)
  const extractedCompanyName = extractCompanyNameFromContent(pages, domain)
  console.log('[serp-scout] DOMAIN FETCH - extracted company name', { domain, extractedCompanyName, pagesCount: pages.length })

  // Run keyword generation and company context generation in parallel — both use the same pages
  const landingText = pages.map(p => p.text).join('\n\n')
  const [keywordsResult, companyContextResult] = await Promise.allSettled([
    promptKeywords({ domain, pageContent: landingText, companyName: extractedCompanyName }),
    generateCompanyContext(domain, resolvedCompanyId, extractedCompanyName, Boolean(forceContext), pages, userCtx.uid)
  ])

  if (keywordsResult.status === 'rejected') {
    const err = keywordsResult.reason
    if (err.message.includes('429') || err.message.includes('Rate limit')) {
      logSerpAction({ user: userCtx, action: 'analyzeDomain', domain, durationMs: Date.now() - _domainStart, error: 'API rate limit exceeded' }).catch(() => {})
      return res.status(429).json({
        error: 'API rate limit exceeded',
        message: 'The AI service has reached its daily request limit. Please try again later or upgrade your API plan.',
        retryAfter: new Date(1767830400000).toISOString()
      })
    }
    console.error('[serp-scout] keyword generation failed', err.message)
    logSerpAction({ user: userCtx, action: 'analyzeDomain', domain, durationMs: Date.now() - _domainStart, error: `keyword generation failed: ${err.message}` }).catch(() => {})
    return res.status(500).json({ error: 'Failed to generate keywords', details: err.message })
  }

  const keywords = keywordsResult.value
  const companyContext = companyContextResult.status === 'fulfilled' ? companyContextResult.value : null
  const contextError = companyContextResult.status === 'rejected' ? companyContextResult.reason?.message : null
  if (contextError) console.error('[serp-scout] context generation failed', contextError)

  console.log('[serp-scout] RETURNING DOMAIN FETCH RESPONSE', {
    domain,
    companyName: extractedCompanyName,
    companyId: resolvedCompanyId,
    keywordCount: keywords?.keywords?.length
  })

  const responseTimestamp = new Date().toISOString()
  logSerpAction({ user: userCtx, action: 'analyzeDomain', domain, durationMs: Date.now() - _domainStart, fromCache: false, audit: true }).catch(() => {})
  return res.status(200).json({
    success: true,
    domain,
    companyId: resolvedCompanyId || null,
    companyName: extractedCompanyName,
    keywords: keywords?.keywords || [],
    explain: keywords?.explain || null,
    companyContext,
    contextError,
    firstTimeGeneration: true,
    generatedAt: responseTimestamp,
    note: 'Keywords generated for the first time. Save them to avoid regeneration. Use SERP analysis to check positions.'
  })
}
