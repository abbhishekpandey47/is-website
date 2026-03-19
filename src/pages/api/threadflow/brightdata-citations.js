/**
 * BrightData AI Citation Scanner — sync + async platform support
 *
 * Perplexity, Gemini, Google AI return data SYNCHRONOUSLY in the trigger response.
 * ChatGPT returns only snapshot_id and requires async polling.
 *
 * POST { action: 'trigger', prompts, companyName }
 *   → {
 *       status: 'triggered',
 *       snapshots: [{ platform, snapshot_id }],          // async platforms only (ChatGPT)
 *       immediateResults: { [platform]: platformData },   // sync platforms already processed
 *       prompts, wrappedToOriginal, companyName
 *     }
 *
 * POST { action: 'poll', snapshots, prompts, companyName, wrappedToOriginal }
 *   → { overallStatus: 'running'|'ready', platforms: { [name]: { status, ...data? } } }
 */

const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY || ''
const BRIGHTDATA_BASE    = 'https://api.brightdata.com/datasets/v3'

// Per-platform dataset IDs and allowed extra fields.
// ChatGPT accepts: additional_prompt, web_search, country
// Perplexity/Gemini/Google AI: only url, prompt, country (reject web_search + additional_prompt)
const AI_PLATFORMS = [
  { name: 'ChatGPT',    url: 'https://chatgpt.com/',       datasetId: 'gd_m7aof0k82r803d5bjm', extraFields: { additional_prompt: '', web_search: true, country: 'US' } },
  { name: 'Perplexity', url: 'https://www.perplexity.ai/', datasetId: 'gd_m7dhdot1vw9a7gc1n', extraFields: { country: 'US' } },
  { name: 'Gemini',     url: 'https://gemini.google.com/', datasetId: 'gd_mbz66arm2mf9cu856y', extraFields: { country: 'US' } },
  { name: 'Google AI',  url: 'https://google.com/aimode',  datasetId: 'gd_mcswdt6z2elth3zqr2', extraFields: { country: 'US' } },
]

const SNAPSHOT_URL = (id) => `${BRIGHTDATA_BASE}/snapshot/${id}?format=json`
const SCRAPE_URL   = (datasetId) =>
  `${BRIGHTDATA_BASE}/scrape?dataset_id=${datasetId}&notify=false&include_errors=true`

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractRedditUrls(text) {
  if (!text) return []
  const matches = text.match(/https?:\/\/(www\.)?reddit\.com\/r\/[^\s"'<>)\]]+/gi) || []
  return [...new Set(matches.map(u => u.replace(/[.,;:!?)]+$/, '')))]
}

function cleanRedditUrl(raw) {
  return raw
    .replace(/[.,;:!?)]+$/, '')
    .split('?utm_')[0]
    .split('&utm_')[0]
    .split('#:~:text=')[0]
    .split('#')[0]
}

function extractCitationRedditUrls(citations) {
  if (!Array.isArray(citations)) return []
  const urls = []
  citations.forEach(c => {
    const raw = typeof c === 'string' ? c : (c?.url || c?.link || '')
    if (!raw) return
    if (/reddit\.com\/r\//i.test(raw)) urls.push(cleanRedditUrl(raw))
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
 * Detect whether a BrightData trigger response is synchronous (has data) or asynchronous (needs polling).
 * Sync responses contain answer text or source arrays directly.
 * Async responses contain only snapshot_id + status:'building'.
 */
function isSyncResponse(body) {
  if (Array.isArray(body)) return true  // array of result objects → sync
  if (!body || typeof body !== 'object') return false
  // Has actual answer content → sync
  if (
    body.answer_text_markdown ||
    body.answer_text          ||
    body.answer_text_raw      ||
    body.answer_html          ||
    body.answer               ||
    Array.isArray(body.sources) ||
    Array.isArray(body.citations)
  ) return true
  return false
}

/**
 * Normalise a BrightData sync trigger body into an array of result items.
 */
function normaliseSyncItems(body) {
  if (Array.isArray(body)) return body
  return [body]
}

/**
 * Parse raw result items for a single platform into per-prompt results.
 */
function parsePlatformResults(resultItems, selectedPrompts, companyName, wrappedToOriginal) {
  const byPrompt = {}
  selectedPrompts.forEach(p => {
    byPrompt[p] = { prompt: p, mentionsCompany: false, redditUrls: [], responsePreview: '', error: null }
  })

  resultItems.forEach((result, idx) => {
    if (!result || typeof result !== 'object') return

    if (idx === 0) {
      console.log('[brightdata-citations] item keys:', Object.keys(result))
      console.log('[brightdata-citations] item sample:', JSON.stringify(result).slice(0, 600))
    }

    const rawPrompt = result?.prompt || result?.input?.prompt || result?.query || result?.search_query || ''
    const prompt = wrappedToOriginal[rawPrompt] || rawPrompt

    const responseText = getResponseText(result)
    const redditUrls = [...new Set([
      ...extractRedditUrls(responseText),
      ...extractCitationRedditUrls(result?.citations),
      ...extractCitationRedditUrls(result?.references),
      ...extractCitationRedditUrls(result?.sources),
      ...extractCitationRedditUrls(result?.web_results),
      ...extractCitationRedditUrls(result?.links),
    ])]

    if (redditUrls.length) {
      console.log(`[brightdata-citations] item[${idx}] prompt="${prompt}" reddit urls:`, redditUrls)
    }

    const mentionsCompany = companyName
      ? responseText.toLowerCase().includes(companyName.toLowerCase())
      : false

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
      selectedPrompts.forEach(p => {
        byPrompt[p].redditUrls = [...new Set([...byPrompt[p].redditUrls, ...redditUrls])]
      })
    }
  })

  return Object.values(byPrompt)
}

function buildPlatformData(items, selectedPrompts, companyName, wrappedToOriginal) {
  const parsed = parsePlatformResults(items, selectedPrompts, companyName, wrappedToOriginal)
  const redditUrls = [...new Set(parsed.flatMap(r => r.redditUrls))]
  const mentionCount = parsed.filter(r => r.mentionsCompany).length
  return {
    status: 'ready',
    results: parsed,
    redditUrls,
    mentionCount,
    mentionRate: selectedPrompts.length ? Math.round((mentionCount / selectedPrompts.length) * 100) : 0,
  }
}

/**
 * Trigger one platform. Returns:
 *   { type: 'sync', items: [...] }         — data available immediately
 *   { type: 'async', snapshot_id: '...' }  — needs polling
 */
async function triggerPlatform(platform, selectedPrompts) {
  const inputs = selectedPrompts.map(prompt => ({
    url: platform.url,
    prompt,
    ...platform.extraFields,
  }))

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

  const body = await resp.json()
  console.log(`[brightdata-citations] ${platform.name} trigger body (first 400):`, JSON.stringify(body).slice(0, 400))

  if (isSyncResponse(body)) {
    const items = normaliseSyncItems(body)
    console.log(`[brightdata-citations] ${platform.name} → SYNC — ${items.length} items`)
    return { type: 'sync', items }
  }

  const snapshot_id = body?.snapshot_id
  if (!snapshot_id) {
    throw new Error(`No snapshot_id for ${platform.name} and no sync data — got: ${JSON.stringify(body).slice(0, 200)}`)
  }
  console.log(`[brightdata-citations] ${platform.name} → ASYNC snapshot_id=${snapshot_id}`)
  return { type: 'async', snapshot_id }
}

/**
 * Poll a single snapshot. Returns { status: 'running' | 'ready' | 'error', items? }
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
      // Handle both array responses and single-object responses
      const items = Array.isArray(rawData)
        ? rawData
        : (rawData && typeof rawData === 'object' ? [rawData] : [])
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

  // ── POLL ──────────────────────────────────────────────────────────────────────
  if (action === 'poll') {
    const { snapshots = [], prompts = [], companyName = '', wrappedToOriginal = {} } = body

    if (!snapshots.length) return res.status(400).json({ error: 'snapshots array required' })

    const pollResults = await Promise.all(
      snapshots.map(async ({ platform, snapshot_id }) => {
        const result = await pollSnapshot(snapshot_id)
        return { platform, snapshot_id, ...result }
      })
    )

    // Group by platform — merge items from multiple snapshots of the same platform.
    // This happens when 1-prompt-per-trigger is used: each prompt creates its own snapshot_id
    // for ChatGPT, but all belong to the same platform name.
    const platformAccum = {}
    const snapshotStatuses = {} // per-snapshot_id status for client-side filtering

    for (const { platform, snapshot_id, status, items, error } of pollResults) {
      snapshotStatuses[snapshot_id] = status
      if (!platformAccum[platform]) {
        platformAccum[platform] = { statuses: [], allItems: [], errors: [] }
      }
      platformAccum[platform].statuses.push(status)
      if (status === 'ready' && items?.length) platformAccum[platform].allItems.push(...items)
      if (status === 'error' && error) platformAccum[platform].errors.push(error)
    }

    const platformsData = {}
    let allReady = true

    for (const [platform, { statuses, allItems, errors }] of Object.entries(platformAccum)) {
      const isRunning = statuses.some(s => s === 'running')
      const allError   = statuses.every(s => s === 'error')

      if (isRunning) {
        allReady = false
        platformsData[platform] = { status: 'running' }
      } else if (allError) {
        platformsData[platform] = { status: 'error', error: errors[0] }
      } else {
        // All done (ready, or mix of ready + error) — build from merged items
        const data = buildPlatformData(allItems, prompts, companyName, wrappedToOriginal)
        console.log(`[brightdata-citations] ${platform} poll-ready — reddit:${data.redditUrls.length} mentions:${data.mentionCount}`)
        platformsData[platform] = data
      }
    }

    const readyPlatforms = Object.values(platformsData).filter(p => p.status === 'ready')
    const allRedditUrls = [...new Set(readyPlatforms.flatMap(p => p.redditUrls || []))]

    return res.status(200).json({
      overallStatus: allReady ? 'ready' : 'running',
      partial: !allReady && readyPlatforms.length > 0,
      platforms: platformsData,
      snapshotStatuses, // per-snapshot_id completion for client to filter pendingSnapshots
      summary: {
        totalRedditUrlsFound: allRedditUrls.length,
        uniqueRedditUrls: allRedditUrls,
        platformsComplete: readyPlatforms.length,
        platformsTotal: Object.keys(platformAccum).length,
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
  selectedPrompts.forEach(p => { wrappedToOriginal[p] = p })

  // Trigger all platforms in parallel
  const triggerResults = await Promise.allSettled(
    AI_PLATFORMS.map(async platform => {
      const result = await triggerPlatform(platform, selectedPrompts)
      return { platform: platform.name, ...result }
    })
  )

  const snapshots = []        // async platforms — need polling
  const immediateResults = {} // sync platforms — data already available
  const failures = []

  triggerResults.forEach((r, i) => {
    const platformName = AI_PLATFORMS[i].name
    if (r.status === 'fulfilled') {
      const { type, snapshot_id, items } = r.value
      if (type === 'sync') {
        const data = buildPlatformData(items, selectedPrompts, companyName, wrappedToOriginal)
        immediateResults[platformName] = data
        console.log(`[brightdata-citations] ${platformName} immediate — reddit:${data.redditUrls.length} mentions:${data.mentionCount}`)
      } else {
        snapshots.push({ platform: platformName, snapshot_id })
      }
    } else {
      failures.push({ platform: platformName, error: r.reason?.message })
      console.error(`[brightdata-citations] Trigger failed for ${platformName}:`, r.reason?.message)
    }
  })

  const hasAnyResults = snapshots.length > 0 || Object.keys(immediateResults).length > 0
  if (!hasAnyResults) {
    return res.status(502).json({ error: 'All platform triggers failed', failures })
  }

  console.log(
    `[brightdata-citations] Triggered — async:${snapshots.map(s => s.platform).join(',')} sync:${Object.keys(immediateResults).join(',')}`
  )

  return res.status(200).json({
    status: 'triggered',
    snapshots,
    immediateResults,
    prompts: selectedPrompts,
    wrappedToOriginal,
    companyName,
    ...(failures.length ? { warnings: failures } : {}),
  })
}
