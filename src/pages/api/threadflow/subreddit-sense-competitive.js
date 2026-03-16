import { createClient } from '@supabase/supabase-js'
import { verifyRequestUser } from '@/lib/serverAuth'
import { getCompanyContext, saveCompanyContext } from '@/lib/companyContext'
import pLimit from 'p-limit'

const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

const REDDIT_API_BASE = 'https://reddit-comment-gen.onrender.com'
const POST_DETAILS_ENDPOINT = `${REDDIT_API_BASE}/fetch_post_details`
const POST_DETAILS_TIMEOUT_MS = 12000
const POST_DETAILS_CONCURRENCY = 4
const MENTION_SNIPPET_RADIUS = 120
const MENTION_SNIPPET_MAX_LENGTH = 200

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const postDetailsLimiter = pLimit(POST_DETAILS_CONCURRENCY)
// Render.com free-tier server queues concurrent requests → serialize mention fetches
const mentionFetchLimiter = pLimit(1)

/**
 * Extract mention snippet from text with context
 */
function extractMentionSnippet(text, mention) {
  if (!text || !mention) return ''
  const idx = text.toLowerCase().indexOf(mention.toLowerCase())
  if (idx === -1) return ''
  const start = Math.max(0, idx - MENTION_SNIPPET_RADIUS)
  const end = Math.min(text.length, idx + mention.length + MENTION_SNIPPET_RADIUS)
  let snippet = text.slice(start, end)
  if (start > 0) snippet = '...' + snippet
  if (end < text.length) snippet = snippet + '...'
  return snippet.slice(0, MENTION_SNIPPET_MAX_LENGTH)
}

/**
 * Check if text mentions a target
 */
function mentionsTarget(text, target) {
  if (!text || !target) return false
  const pattern = new RegExp(`\\b${target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
  return pattern.test(text)
}

/**
 * Build mention data for a post/comment with brand and competitor mentions
 */
function buildMentionData(thread, brandTargets, competitorTargets) {
  const mentionHighlights = []
  const mentionedBrand = new Set()
  const mentionedCompetitors = new Set()
  
  const fullText = (thread.title || '') + ' ' + (thread.post_content || thread.comment_content || '')

  // Extract brand mentions
  brandTargets.forEach(target => {
    if (mentionsTarget(fullText, target)) {
      mentionedBrand.add(target)
      const snippet = extractMentionSnippet(fullText, target)
      if (snippet) {
        mentionHighlights.push({ type: 'brand', term: target, snippet })
      }
    }
  })

  // Extract competitor mentions
  competitorTargets.forEach(target => {
    if (mentionsTarget(fullText, target)) {
      mentionedCompetitors.add(target)
      const snippet = extractMentionSnippet(fullText, target)
      if (snippet) {
        mentionHighlights.push({ type: 'competitor', term: target, snippet })
      }
    }
  })

  return {
    mentionsBrand: mentionedBrand.size > 0,
    mentionedBrandTerms: Array.from(mentionedBrand),
    mentionsCompetitors: Array.from(mentionedCompetitors),
    mentionHighlights: mentionHighlights.slice(0, 3)
  }
}

const MENTION_FETCH_TIMEOUT_MS = 120_000

/**
 * Fetch Reddit posts that mention a company — same endpoint as SubredditSense.
 * Returns { posts, comments } where every item already mentions the company name.
 */
async function fetchMentionsByCompanyName(companyName) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), MENTION_FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(`${REDDIT_API_BASE}/search_company_mentions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company_name: companyName }),
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error('[competitive-sense] Reddit API error', { status: response.status, companyName })
      return { posts: [], comments: [] }
    }

    const data = await response.json()
    return {
      posts: Array.isArray(data.posts) ? data.posts : [],
      comments: Array.isArray(data.comments) ? data.comments : []
    }
  } catch (error) {
    clearTimeout(timeoutId)
    const reason = error.name === 'AbortError' ? `timed out after ${MENTION_FETCH_TIMEOUT_MS}ms` : error.message
    console.error('[competitive-sense] Failed to fetch mentions', { companyName, error: reason })
    return { posts: [], comments: [] }
  }
}

/**
 * Fetch full post details to get content for mention extraction
 */
async function fetchRedditPostDetails(postUrl) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), POST_DETAILS_TIMEOUT_MS)
  try {
    const response = await fetch(POST_DETAILS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: postUrl }),
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (err) {
    clearTimeout(timeoutId)
    return null
  }
}

/**
 * Aggregate mention data by subreddit
 */
function aggregateBySubreddit(posts, comments, mentionAnalysis) {
  const subredditData = {}

  // Process posts
  posts.forEach((post, idx) => {
    const sub = post.subreddit || 'unknown'
    if (!subredditData[sub]) {
      subredditData[sub] = {
        subreddit: sub,
        totalPosts: 0,
        totalComments: 0,
        brandMentions: 0,
        competitorMentions: 0,
        avgEngagement: 0,
        avgSentiment: 0,
        topPosts: [],
        postWithBrand: [],
        postWithCompetitors: []
      }
    }
    subredditData[sub].totalPosts++

    const analysis = mentionAnalysis.posts[idx]
    if (analysis?.mentionsBrand) {
      subredditData[sub].brandMentions++
      subredditData[sub].postWithBrand.push({
        title: post.title,
        url: post.url,
        upvotes: post.upvotes || 0,
        terms: analysis.mentionedBrandTerms,
        highlights: analysis.mentionHighlights.filter(h => h.type === 'brand')
      })
    }

    if (analysis?.mentionsCompetitors.length > 0) {
      subredditData[sub].competitorMentions++
      subredditData[sub].postWithCompetitors.push({
        title: post.title,
        url: post.url,
        upvotes: post.upvotes || 0,
        competitors: analysis.mentionsCompetitors,
        highlights: analysis.mentionHighlights.filter(h => h.type === 'competitor')
      })
    }

    const engagement = (post.upvotes || 0) + (post.total_comments || 0)
    subredditData[sub].avgEngagement += engagement
    subredditData[sub].topPosts.push({ title: post.title, url: post.url, upvotes: post.upvotes || 0 })
  })

  // Process comments similarly
  comments.forEach((comment, idx) => {
    const sub = comment.subreddit || 'unknown'
    if (!subredditData[sub]) {
      subredditData[sub] = {
        subreddit: sub,
        totalPosts: 0,
        totalComments: 0,
        brandMentions: 0,
        competitorMentions: 0,
        avgEngagement: 0,
        avgSentiment: 0,
        topPosts: [],
        postWithBrand: [],
        postWithCompetitors: []
      }
    }
    subredditData[sub].totalComments++

    const analysis = mentionAnalysis.comments[idx]
    if (analysis?.mentionsBrand) {
      subredditData[sub].brandMentions++
    }
    if (analysis?.mentionsCompetitors.length > 0) {
      subredditData[sub].competitorMentions++
    }

    const engagement = (comment.upvotes || 0)
    subredditData[sub].avgEngagement += engagement
  })

  // Calculate averages
  Object.keys(subredditData).forEach(sub => {
    const total = subredditData[sub].totalPosts + subredditData[sub].totalComments
    if (total > 0) {
      subredditData[sub].avgEngagement = Math.round(subredditData[sub].avgEngagement / total)
      subredditData[sub].topPosts = subredditData[sub].topPosts.slice(0, 3)
    }
  })

  return subredditData
}

function buildThreadRecord(post, analysis) {
  return {
    url: post.url || post.post_url || '',
    title: post.title || post.post_title || '',
    subreddit: post.subreddit || 'unknown',
    upvotes: post.upvotes || 0,
    comments: post.total_comments || 0,
    mentionsBrand: Boolean(analysis?.mentionsBrand),
    brandTerms: Array.isArray(analysis?.mentionedBrandTerms) ? analysis.mentionedBrandTerms : [],
    competitors: Array.isArray(analysis?.mentionsCompetitors) ? analysis.mentionsCompetitors : [],
    mentionHighlights: Array.isArray(analysis?.mentionHighlights) ? analysis.mentionHighlights : []
  }
}

function normalizeStringList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || '').trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split(/\n|,|;/)
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

function dedupeBy(items, getKey) {
  const seen = new Set()
  const out = []
  for (const item of items || []) {
    const key = getKey(item)
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(item)
  }
  return out
}

export default async function handler(req, res) {
  // Safety check - ensure req is defined
  if (!req) {
    console.error('[competitive-sense] CRITICAL: req is undefined')
    return res.status(500).json({ error: 'Internal server error: missing request object' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    let user
    try {
      user = await verifyRequestUser(req)
    } catch (authErr) {
      console.warn('[competitive-sense] Auth verification failed:', authErr.message)
      // Allow unauthenticated access for now (will still require companyId)
      user = null
    }

    if (!user) {
      // For now, allow access without user verification
      // In production, you may want to require auth
      console.warn('[competitive-sense] Proceeding without authenticated user')
    }

    const { topic, companyId, companyName: bodyCompanyName, competitors: bodyCompetitors } = req.body || {}

    if (!companyId) {
      return res.status(400).json({ error: 'companyId required' })
    }

    // Get company context
    const context = await getCompanyContext(companyId)
    if (!context) {
      return res.status(404).json({ error: 'Company context not found' })
    }

    // companyName priority: request body > metadata (set by analyze_domain) > approvedContext
    const companyName = String(
      bodyCompanyName ||
      context.metadata?.companyName ||
      context.approvedContext?.companyName ||
      ''
    ).trim()
    // Dedupe competitors — skip any entry that matches the brand name (case-insensitive)
    // Prefer DB-saved competitors; fall back to request body (for fresh sessions without saved keywords)
    const brandLower = companyName.toLowerCase()
    const dbCompetitors = normalizeStringList(context.approvedContext?.competitors)
    const fallbackCompetitors = normalizeStringList(bodyCompetitors)
    const competitors = (dbCompetitors.length > 0 ? dbCompetitors : fallbackCompetitors)
      .filter(c => c.toLowerCase() !== brandLower)

    if (!companyName) {
      return res.status(400).json({ error: 'Company name not found. Please run domain analysis first.' })
    }

    // ── 24-hour cache ──────────────────────────────────────────────────────────
    const cached = context.approvedContext?.competitiveSenseCache
    const cacheKey = competitors.sort().join(',')
    if (
      cached &&
      cached.cacheKey === cacheKey &&
      cached.cachedAt &&
      Date.now() - new Date(cached.cachedAt).getTime() < CACHE_TTL_MS
    ) {
      console.log('[competitive-sense] Returning cached result (< 24h old)')
      return res.status(200).json({ ...cached.data, fromCache: true, cachedAt: cached.cachedAt })
    }

    console.log('[competitive-sense] Fetching mentions via search_company_mentions (same as SubredditSense):', {
      companyName,
      competitors
    })

    // ── Fetch brand + competitor mentions using the same endpoint as SubredditSense ──
    // Serialized via mentionFetchLimiter (concurrency=1) — Render.com free tier queues
    // parallel requests which causes all of them to time out simultaneously.
    const allNames = [companyName, ...competitors.slice(0, 4)]
    const allResults = await Promise.all(
      allNames.map(name => mentionFetchLimiter(() => fetchMentionsByCompanyName(name)))
    )
    const [brandData, ...competitorResults] = allResults

    // Brand targets: company name + any short alias (first word if multi-word)
    const brandTargets = [companyName]
    const firstWord = companyName.split(/\s+/)[0]
    if (firstWord && firstWord.length > 3 && firstWord.toLowerCase() !== companyName.toLowerCase()) {
      brandTargets.push(firstWord)
    }

    // Normalize brand posts — guaranteed to mention brand (fetched by brand name search)
    // Also scan title for any competitor mentions present in the same thread
    const brandPosts = dedupeBy(
      [...(brandData.posts || [])],
      p => String(p.post_url || p.url || '')
    ).map(p => {
      const title = p.post_title || p.title || ''
      const body = p.selftext || p.post_content || ''
      const fullText = `${title} ${body}`
      // Scan for which competitors are also mentioned in this brand post
      const mentionedCompetitors = competitors.filter(comp => mentionsTarget(fullText, comp))
      return {
        url: p.post_url || p.url || '',
        title,
        subreddit: p.subreddit || 'unknown',
        upvotes: typeof p.upvotes === 'number' ? p.upvotes : (p.score || 0),
        comments: typeof p.total_comments === 'number' ? p.total_comments : (p.num_comments || 0),
        mentionsBrand: true,
        competitors: mentionedCompetitors,
        mentionHighlights: []
      }
    })

    const brandComments = (brandData.comments || []).map(c => ({
      url: c.comment_url || c.url || '',
      subreddit: c.subreddit || 'unknown',
      upvotes: typeof c.upvotes === 'number' ? c.upvotes : 0,
      mentionsBrand: true,
      competitors: []
    }))

    // Normalize competitor posts — guaranteed to mention that competitor
    // Also scan title for brand mentions present in the same thread
    const competitorPostsByName = {}
    competitors.slice(0, 5).forEach((comp, idx) => {
      const data = competitorResults[idx] || { posts: [], comments: [] }
      competitorPostsByName[comp] = dedupeBy(
        data.posts || [],
        p => String(p.post_url || p.url || '')
      ).map(p => {
        const title = p.post_title || p.title || ''
        const body = p.selftext || p.post_content || ''
        const fullText = `${title} ${body}`
        const mentionsBrand = brandTargets.some(t => mentionsTarget(fullText, t))
        return {
          url: p.post_url || p.url || '',
          title,
          subreddit: p.subreddit || 'unknown',
          upvotes: typeof p.upvotes === 'number' ? p.upvotes : (p.score || 0),
          comments: typeof p.total_comments === 'number' ? p.total_comments : (p.num_comments || 0),
          mentionsBrand,
          competitors: [comp],
          mentionHighlights: []
        }
      })
    })

    // Merge all posts into a single map, combining brand + competitor flags per URL
    const mergedMap = new Map()
    brandPosts.forEach(p => mergedMap.set(p.url, { ...p }))
    Object.entries(competitorPostsByName).forEach(([comp, posts]) => {
      posts.forEach(p => {
        if (mergedMap.has(p.url)) {
          const existing = mergedMap.get(p.url)
          existing.competitors = [...new Set([...existing.competitors, comp])]
          if (p.mentionsBrand) existing.mentionsBrand = true
        } else {
          mergedMap.set(p.url, { ...p })
        }
      })
    })

    const allMergedPosts = Array.from(mergedMap.values()).filter(p => p.url)
    const allCompetitorPosts = allMergedPosts.filter(p => p.competitors.length > 0)

    // Aggregate by subreddit
    const subredditData = {}
    allMergedPosts.forEach(post => {
      const sub = post.subreddit || 'unknown'
      if (!subredditData[sub]) {
        subredditData[sub] = {
          subreddit: sub,
          totalPosts: 0,
          brandMentions: 0,
          competitorMentions: 0,
          avgEngagement: 0,
          topPosts: [],
          postWithBrand: [],
          postWithCompetitors: []
        }
      }
      subredditData[sub].totalPosts++
      const eng = (post.upvotes || 0) + (post.comments || 0)
      subredditData[sub].avgEngagement += eng
      subredditData[sub].topPosts.push({ title: post.title, url: post.url, upvotes: post.upvotes || 0 })
      if (post.mentionsBrand) {
        subredditData[sub].brandMentions++
        subredditData[sub].postWithBrand.push({ title: post.title, url: post.url, upvotes: post.upvotes || 0 })
      }
      if (post.competitors.length > 0) {
        subredditData[sub].competitorMentions++
        subredditData[sub].postWithCompetitors.push({ title: post.title, url: post.url, upvotes: post.upvotes || 0, competitors: post.competitors })
      }
    })
    Object.keys(subredditData).forEach(sub => {
      const total = subredditData[sub].totalPosts
      if (total > 0) {
        subredditData[sub].avgEngagement = Math.round(subredditData[sub].avgEngagement / total)
        subredditData[sub].topPosts = subredditData[sub].topPosts.slice(0, 3)
      }
    })

    // Thread lists
    const allMatchedThreads = allMergedPosts
      .filter(p => p.mentionsBrand || p.competitors.length > 0)
      .sort((a, b) => ((b.upvotes + b.comments) - (a.upvotes + a.comments)))
    const brandMentionThreads = allMatchedThreads.filter(t => t.mentionsBrand)
    const competitorMentionThreads = allMatchedThreads.filter(t => t.competitors.length > 0)
    const competitorThreadsByName = competitors.reduce((acc, comp) => {
      acc[comp] = allMatchedThreads.filter(t => t.competitors.includes(comp))
      return acc
    }, {})

    // Metrics
    const brandMentions = brandPosts.length + brandComments.length
    const competitorMentionCount = allCompetitorPosts.length
    const positivePosts = allMergedPosts.filter(p => (p.upvotes || 0) > 100).length

    const responseData = {
      success: true,
      mode: 'company-mention',
      metrics: {
        totalMentions: brandMentions + competitorMentionCount,
        brandMentions,
        competitorMentions: competitorMentionCount,
        positivePosts,
        activeSubreddits: Object.keys(subredditData).length
      },
      subreddits: subredditData,
      posts: brandPosts.slice(0, 10),
      comments: brandComments.slice(0, 20),
      threads: {
        all: allMatchedThreads,
        brand: brandMentionThreads,
        competitor: competitorMentionThreads,
        competitorByName: competitorThreadsByName
      },
      competitorBreakdown: competitors.reduce((acc, comp) => {
        acc[comp] = (competitorPostsByName[comp] || []).length
        return acc
      }, {}),
      coverage: {
        analyzedPosts: allMergedPosts.length,
        matchedPosts: allMatchedThreads.length,
        note: 'Posts fetched via direct company mention search — same method as SubredditSense.'
      }
    }

    // Persist result to 24-hour cache (fire-and-forget)
    const cachedAt = new Date().toISOString()
    saveCompanyContext(companyId, {
      ...context,
      approvedContext: {
        ...(context.approvedContext || {}),
        competitiveSenseCache: { cacheKey, cachedAt, data: responseData }
      }
    }).catch(e => console.warn('[competitive-sense] Cache save failed:', e.message))

    res.status(200).json(responseData)
  } catch (error) {
    console.error('[competitive-sense] Error:', error)
    res.status(500).json({ error: error.message })
  }
}
