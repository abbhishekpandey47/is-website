/**
 * BrightData AI Citation Scanner — per-platform trigger + poll
 *
 * Each AI platform has its own BrightData dataset. We trigger them in parallel,
 * then poll all snapshots together so partial results can be shown as platforms complete.
 *
 * POST { action: 'trigger', prompts, companyName }
 *   → { status: 'triggered', snapshots: [{ platform, snapshot_id }], prompts, wrappedToOriginal, companyName }
 *
 * POST { action: 'poll', snapshots, prompts, companyName, wrappedToOriginal }
 *   → { overallStatus: 'running'|'ready', platforms: { [name]: { status, ...data? } }, partial }
 */

const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY || ''
const BRIGHTDATA_BASE    = 'https://api.brightdata.com/datasets/v3'

// Each AI platform uses its own BrightData dataset with different allowed input fields.
// ChatGPT accepts: web_search, country, additional_prompt
// Perplexity/Gemini/Google AI reject web_search and additional_prompt — only prompt + url allowed
const AI_PLATFORMS = [
  { name: 'ChatGPT',    url: 'https://chatgpt.com/',       datasetId: 'gd_m7aof0k82r803d5bjm', extraFields: { additional_prompt: '', web_search: true, country: 'US' } },
  { name: 'Perplexity', url: 'https://www.perplexity.ai/', datasetId: 'gd_m7dhdot1vw9a7gc1n', extraFields: { country: 'US' } },
  { name: 'Gemini',     url: 'https://gemini.google.com/', datasetId: 'gd_mbz66arm2mf9cu856y', extraFields: { country: 'US' } },
  { name: 'Google AI',  url: 'https://google.com/aimode',  datasetId: 'gd_mcswdt6z2elth3zqr2', extraFields: { country: 'US' } },
]

const SNAPSHOT_URL = (id) => `${BRIGHTDATA_BASE}/snapshot/${id}?format=json`
const SCRAPE_URL   = (datasetId) =>
  `${BRIGHTDATA_BASE}/scrape?dataset_id=${datasetId}&notify=false&include_errors=true`

// ── Helpers ──────────────────────────────────────────────────────────────────

function extractRedditUrls(text) {
  if (!text) return []
  const matches = text.match(/https?:\/\/(www\.)?reddit\.com\/r\/[^\s"'<>)\]]+/gi) || []
  return [...new Set(matches.map(u => u.replace(/[.,;:!?)]+$/, '')))]
}

function cleanRedditUrl(raw) {
  return raw
    .replace(/[.,;:!?)]+$/, '')  // trailing punctuation
    .split('?utm_')[0]           // UTM params
    .split('&utm_')[0]
    .split('#:~:text=')[0]       // Google AI text fragments
    .split('#')[0]               // any other fragment
}

function extractCitationRedditUrls(citations) {
  if (!Array.isArray(citations)) return []
  const urls = []
  citations.forEach(c => {
    const raw = typeof c === 'string' ? c : (c?.url || c?.link || '')
    if (!raw) return
    if (/reddit\.com\/r\//i.test(raw)) {
      urls.push(cleanRedditUrl(raw))
    }
  })
  return [...new Set(urls)]
}

function getResponseText(result) {
  return (
    result?.answer_text_markdown ||
    result?.answer_text          ||
    result?.answer_text_raw      ||
    result?.answer               ||
    result?.response             ||
    result?.output               ||
    result?.content              ||
    result?.text                 ||
    result?.result               ||
    (typeof result?.data === 'string' ? result.data : '') ||
    ''
  )
}

/**
 * Parse raw BrightData result items for a single platform into per-prompt results.
 */
function parsePlatformResults(resultItems, selectedPrompts, companyName, wrappedToOriginal) {
  // Pre-populate all expected prompts
  const byPrompt = {}
  selectedPrompts.forEach(p => {
    byPrompt[p] = { prompt: p, mentionsCompany: false, redditUrls: [], responsePreview: '', error: null }
  })

  resultItems.forEach((result, idx) => {
    if (!result || typeof result !== 'object') return

    // Log first item's schema so we know what BrightData actually returns
    if (idx === 0) {
      const keys = Object.keys(result)
      console.log('[brightdata-citations] item keys:', keys)
      console.log('[brightdata-citations] item sample:', JSON.stringify(result).slice(0, 800))
    }

    // Try multiple fields where BrightData might echo back the prompt
    const rawPrompt = result?.prompt || result?.input?.prompt || result?.query || result?.search_query || ''
    const prompt = wrappedToOriginal[rawPrompt] || rawPrompt

    const responseText = getResponseText(result)
    const urlsFromText      = extractRedditUrls(responseText)
    const urlsFromCitations = extractCitationRedditUrls(result?.citations)
    const urlsFromRefs      = extractCitationRedditUrls(result?.references)
    const urlsFromSources   = extractCitationRedditUrls(result?.sources)         // Perplexity
    const urlsFromWebRes    = extractCitationRedditUrls(result?.web_results)     // some platforms
    const urlsFromLinks     = extractCitationRedditUrls(result?.links)
    const redditUrls = [...new Set([
      ...urlsFromText, ...urlsFromCitations, ...urlsFromRefs,
      ...urlsFromSources, ...urlsFromWebRes, ...urlsFromLinks,
    ])]

    if (redditUrls.length) {
      console.log(`[brightdata-citations] item[${idx}] prompt="${prompt}" reddit urls:`, redditUrls)
    }

    const mentionsCompany = companyName
      ? responseText.toLowerCase().includes(companyName.toLowerCase())
      : false

    // Match to an expected prompt; if not found and only one prompt, attribute to it;
    // otherwise distribute to all prompts so we never silently discard results.
    const targetPrompt = byPrompt[prompt]
      ? prompt
      : selectedPrompts.length === 1
        ? selectedPrompts[0]
        : null

    if (targetPrompt) {
      byPrompt[targetPrompt].redditUrls = [...new Set([...byPrompt[targetPrompt].redditUrls, ...redditUrls])]
      if (mentionsCompany) byPrompt[targetPrompt].mentionsCompany = true
      if (!byPrompt[targetPrompt].responsePreview && responseText) {
        byPrompt[targetPrompt].responsePreview = responseText.slice(0, 400)
      }
      if (result?.error) byPrompt[targetPrompt].error = result.error
    } else if (redditUrls.length > 0) {
      // Can't identify prompt — distribute URLs across all expected prompts
      selectedPrompts.forEach(p => {
        byPrompt[p].redditUrls = [...new Set([...byPrompt[p].redditUrls, ...redditUrls])]
      })
    }
  })

  return Object.values(byPrompt)
}

/**
 * Trigger a single platform's BrightData dataset with given prompts.
 * Returns snapshot_id or throws.
 */
async function triggerPlatform(platform, selectedPrompts, wrappedToOriginal) {
  const inputs = selectedPrompts.map(prompt => {
    wrappedToOriginal[prompt] = prompt
    return {
      url: platform.url,
      prompt,
      ...platform.extraFields,
    }
  })

  // /scrape endpoint expects a raw array body (unlike /trigger which wraps in {input:[...]})
  const resp = await fetch(SCRAPE_URL(platform.datasetId), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BRIGHTDATA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  })

  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`BrightData scrape error for ${platform.name} (${resp.status}): ${text}`)
  }

  const triggerBody = await resp.json()
  console.log(`[brightdata-citations] ${platform.name} trigger response:`, JSON.stringify(triggerBody).slice(0, 300))
  const snapshot_id = triggerBody?.snapshot_id
  if (!snapshot_id) throw new Error(`No snapshot_id returned for ${platform.name} — got: ${JSON.stringify(triggerBody).slice(0, 200)}`)
  return snapshot_id
}

/**
 * Poll a single snapshot. Returns { status: 'running' } or { status: 'ready', items: [] }
 */
async function pollSnapshot(snapshot_id) {
  const controller = new AbortController()
  const tid = setTimeout(() => controller.abort(), 12_000)
  try {
    const resp = await fetch(SNAPSHOT_URL(snapshot_id), {
      headers: { Authorization: `Bearer ${BRIGHTDATA_API_KEY}` },
      signal: controller.signal,
    })
    clearTimeout(tid)

    if (resp.status === 202) return { status: 'running' }

    if (resp.status === 200) {
      const rawData = await resp.json()
      const items = Array.isArray(rawData) ? rawData : []
      console.log(`[brightdata-citations] snapshot ${snapshot_id} ready — ${items.length} items`)
      if (items.length) console.log('[brightdata-citations] first item keys:', Object.keys(items[0]))
      return { status: 'ready', items }
    }

    const errText = await resp.text()
    return { status: 'error', error: `Snapshot ${resp.status}: ${errText}` }
  } catch (err) {
    clearTimeout(tid)
    return { status: 'error', error: err.message }
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────

export const config = { api: { responseLimit: false } }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!BRIGHTDATA_API_KEY) return res.status(500).json({ error: 'BRIGHTDATA_API_KEY env variable not set' })

  const body = req.body || {}
  const action = body.action || 'trigger'

  // ── POLL ─────────────────────────────────────────────────────────────────────
  if (action === 'poll') {
    const { snapshots = [], prompts = [], companyName = '', wrappedToOriginal = {} } = body

    if (!snapshots.length) return res.status(400).json({ error: 'snapshots array required' })

    // Poll all platform snapshots in parallel
    const pollResults = await Promise.all(
      snapshots.map(async ({ platform, snapshot_id }) => {
        const result = await pollSnapshot(snapshot_id)
        return { platform, snapshot_id, ...result }
      })
    )

    const platformsData = {}
    let allReady = true

    for (const { platform, status, items, error } of pollResults) {
      if (status === 'running') {
        allReady = false
        platformsData[platform] = { status: 'running' }
      } else if (status === 'ready') {
        const parsed = parsePlatformResults(items, prompts, companyName, wrappedToOriginal)
        const redditUrls = [...new Set(parsed.flatMap(r => r.redditUrls))]
        const mentionCount = parsed.filter(r => r.mentionsCompany).length

        console.log(`[brightdata-citations] ${platform} ready — items:${items.length} reddit:${redditUrls.length} mentions:${mentionCount}`)

        platformsData[platform] = {
          status: 'ready',
          results: parsed,
          redditUrls,
          mentionCount,
          mentionRate: prompts.length ? Math.round((mentionCount / prompts.length) * 100) : 0,
        }
      } else {
        // error — treat as done so we don't block forever
        platformsData[platform] = { status: 'error', error }
      }
    }

    // Aggregate across all ready platforms
    const readyPlatforms = Object.values(platformsData).filter(p => p.status === 'ready')
    const allRedditUrls = [...new Set(readyPlatforms.flatMap(p => p.redditUrls || []))]

    return res.status(200).json({
      overallStatus: allReady ? 'ready' : 'running',
      partial: !allReady && readyPlatforms.length > 0,
      platforms: platformsData,
      // Aggregate summary (across completed platforms)
      summary: {
        totalRedditUrlsFound: allRedditUrls.length,
        uniqueRedditUrls: allRedditUrls,
        platformsComplete: readyPlatforms.length,
        platformsTotal: snapshots.length,
      },
    })
  }

  // ── TRIGGER ───────────────────────────────────────────────────────────────────
  const { prompts = [], companyName = '', maxPromptsPerPlatform = 2 } = body

  if (!Array.isArray(prompts) || prompts.length === 0) {
    return res.status(400).json({ error: 'prompts array is required' })
  }

  const selectedPrompts = prompts.slice(0, maxPromptsPerPlatform)
  const wrappedToOriginal = {}

  // Trigger all platforms in parallel — each uses its own dataset
  const triggerResults = await Promise.allSettled(
    AI_PLATFORMS.map(async platform => {
      const snapshot_id = await triggerPlatform(platform, selectedPrompts, wrappedToOriginal)
      return { platform: platform.name, snapshot_id }
    })
  )

  const snapshots = []
  const failures = []
  triggerResults.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      snapshots.push(r.value)
    } else {
      failures.push({ platform: AI_PLATFORMS[i].name, error: r.reason?.message })
      console.error(`[brightdata-citations] Trigger failed for ${AI_PLATFORMS[i].name}:`, r.reason?.message)
    }
  })

  if (!snapshots.length) {
    return res.status(502).json({ error: 'All platform triggers failed', failures })
  }

  console.log(`[brightdata-citations] Triggered ${snapshots.length} platform snapshots:`, snapshots.map(s => `${s.platform}:${s.snapshot_id}`).join(', '))

  return res.status(200).json({
    status: 'triggered',
    snapshots,
    prompts: selectedPrompts,
    wrappedToOriginal,
    companyName,
    ...(failures.length ? { warnings: failures } : {}),
  })
}
