import { createClient } from '@supabase/supabase-js'
import { verifyRequestUser } from '@/lib/serverAuth'
import { getCompanyContext } from '@/lib/companyContext'
import pLimit from 'p-limit'

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

/**
 * Fetch Reddit posts via the external API
 */
async function fetchRedditPostsForKeyword(keyword) {
  try {
    const response = await fetch(`${REDDIT_API_BASE}/find_top_posts_comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword }),
      timeout: 30000
    })

    if (!response.ok) {
      console.error('[competitive-sense] Reddit API error', { status: response.status, keyword })
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
    console.error('[competitive-sense] Failed to fetch Reddit posts', { keyword, error: error.message })
    return { top_posts: [], new_posts: [], top_comments: [], new_comments: [] }
  }
}

/**
 * Fetch full post details to get content for mention extraction
 */
async function fetchRedditPostDetails(postUrl) {
  try {
    const response = await fetch(POST_DETAILS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: postUrl }),
      timeout: POST_DETAILS_TIMEOUT_MS
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (err) {
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

    const { topic, companyId } = req.body || {}

    if (!companyId) {
      return res.status(400).json({ error: 'companyId required' })
    }

    // Get company context
    const context = await getCompanyContext(companyId)
    if (!context) {
      return res.status(404).json({ error: 'Company context not found' })
    }

    const companyName = String(context.approvedContext?.companyName || '').trim()
    const competitors = normalizeStringList(context.approvedContext?.competitors)
    const capabilities = normalizeStringList(context.approvedContext?.coreCapabilities)

    // Build brand and competitor targets
    const brandTargets = companyName
      ? [companyName, ...capabilities.slice(0, 3)]
      : capabilities.slice(0, 3)
    const competitorTargets = competitors

    const explicitTopic = typeof topic === 'string' ? topic.trim() : ''
    const queryPlan = explicitTopic
      ? [explicitTopic]
      : [
          companyName,
          ...competitorTargets.slice(0, 4),
          ...capabilities.slice(0, 2).map((cap) => companyName ? `${companyName} ${cap}` : cap)
        ].filter(Boolean)

    const uniqueQueries = Array.from(new Set(queryPlan)).slice(0, 6)

    if (!uniqueQueries.length) {
      return res.status(400).json({
        error: 'No analysis queries could be derived. Add company name/capabilities/competitors in Overview or provide a topic.'
      })
    }

    console.log('[competitive-sense] Analyzing:', {
      mode: explicitTopic ? 'topic' : 'general',
      topic: explicitTopic || null,
      queries: uniqueQueries,
      brandTargets,
      competitorTargets
    })

    // Fetch Reddit posts/comments for all planned queries, then merge + dedupe
    const allQueryResults = await Promise.all(uniqueQueries.map((q) => fetchRedditPostsForKeyword(q)))
    const allPosts = dedupeBy(
      allQueryResults.flatMap((data) => [...(data.top_posts || []), ...(data.new_posts || [])]),
      (post) => String(post?.url || post?.post_url || '')
    )
    const allComments = dedupeBy(
      allQueryResults.flatMap((data) => [...(data.top_comments || []), ...(data.new_comments || [])]),
      (comment) => String(comment?.comment_url || `${comment?.subreddit || ''}:${comment?.comment_id || comment?.id || ''}:${comment?.author || ''}`)
    )

    console.log('[competitive-sense] Fetched:', { postCount: allPosts.length, commentCount: allComments.length })

    // Enrich posts with full content
    const enrichedPosts = await Promise.all(
      allPosts.slice(0, 20).filter(Boolean).map((post) =>
        postDetailsLimiter(async () => {
          const url = post.url || post.post_url
          if (!url) return post
          const details = await fetchRedditPostDetails(url).catch(() => null)
          return details ? { ...post, ...details } : post
        })
      )
    )

    // Extract mentions
    const postMentionAnalysis = enrichedPosts.map(post =>
      buildMentionData(post, brandTargets, competitorTargets)
    )
    const commentMentionAnalysis = allComments.slice(0, 50).map(comment =>
      buildMentionData(comment, brandTargets, competitorTargets)
    )

    // Aggregate by subreddit
    const subredditData = aggregateBySubreddit(
      enrichedPosts,
      allComments.slice(0, 50),
      { posts: postMentionAnalysis, comments: commentMentionAnalysis }
    )

    // Build full thread-level lists (with direct Reddit links)
    const allMatchedThreads = enrichedPosts
      .map((post, idx) => buildThreadRecord(post, postMentionAnalysis[idx]))
      .filter((thread) => thread.mentionsBrand || thread.competitors.length > 0)
      .sort((a, b) => ((b.upvotes + b.comments) - (a.upvotes + a.comments)))

    const brandMentionThreads = allMatchedThreads.filter((thread) => thread.mentionsBrand)
    const competitorMentionThreads = allMatchedThreads.filter((thread) => thread.competitors.length > 0)

    const competitorThreadsByName = competitorTargets.reduce((acc, competitor) => {
      acc[competitor] = allMatchedThreads.filter((thread) => thread.competitors.includes(competitor))
      return acc
    }, {})

    // Calculate metrics
    const totalMentions = postMentionAnalysis.filter(m => m.mentionsBrand || m.mentionsCompetitors.length > 0).length
    const brandMentions = postMentionAnalysis.filter(m => m.mentionsBrand).length
    const competitorMentionsData = postMentionAnalysis.map(m => m.mentionsCompetitors).flat()
    const positivePosts = enrichedPosts.filter(p => (p.upvotes || 0) > 100).length

    res.status(200).json({
      success: true,
      topic: explicitTopic || null,
      mode: explicitTopic ? 'topic' : 'general',
      queryPlan: uniqueQueries,
      metrics: {
        totalMentions,
        brandMentions,
        competitorMentions: competitorMentionsData.length,
        positivePosts,
        activeSubreddits: Object.keys(subredditData).length
      },
      subreddits: subredditData,
      posts: enrichedPosts.slice(0, 10),
      comments: allComments.slice(0, 20),
      threads: {
        all: allMatchedThreads,
        brand: brandMentionThreads,
        competitor: competitorMentionThreads,
        competitorByName: competitorThreadsByName
      },
      competitorBreakdown: competitors.reduce((acc, comp) => {
        acc[comp] = competitorMentionsData.filter(m => m === comp).length
        return acc
      }, {}),
      coverage: {
        analyzedPosts: enrichedPosts.length,
        matchedPosts: allMatchedThreads.length,
        note: 'Thread-level lists are built from analyzed posts with Reddit links.'
      }
    })
  } catch (error) {
    console.error('[competitive-sense] Error:', error)
    res.status(500).json({ error: error.message })
  }
}
