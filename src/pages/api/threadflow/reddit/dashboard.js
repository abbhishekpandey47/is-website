import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { companyId, range = '30d', legacy } = req.query;
  if (!companyId) return res.status(400).json({ error: 'companyId required' });
  // range=all returns full history without date filtering
  let since = null;
  let days = null;
  if (range !== 'all') {
    days = (range === '30d' && !req.query.range) ? 365 : (parseInt(range) || 30);
    since = new Date(Date.now() - days * 24 * 3600 * 1000).toISOString();
  }
  try {
    let query = supabase
      .from('reddit_mentions')
  .select('type, subreddit, upvotes, total_comments, created_utc, fetched_at, engagement_score, title, body, url')
      .eq('company_id', companyId);
    if (range !== 'all') {
      query = query.or(`created_utc.is.null,created_utc.gte.${since}`);
    }
    const { data: mentions, error: mErr } = await query;
    if (mErr) throw mErr;
    const totalMentions = mentions.length;
    const subsSet = new Set(mentions.map(m => m.subreddit).filter(Boolean));
    const activeSubreddits = subsSet.size;
    const engagements = mentions.map(m => (m.upvotes || 0) + (m.total_comments || 0));
    const avgEngagement = engagements.length ? (engagements.reduce((a,b)=>a+b,0) / engagements.length).toFixed(2) : '0.00';
    // Reddit API provides a net score (ups - downs). We approximate up/down counts:
    // If score >=0: estimated_up = score + 1 (include OP), estimated_down = 1 (baseline) => net still approximates.
    // If score <0: estimated_up = 1 (OP), estimated_down = (-score) + 1.
    // This keeps ratios directional without needing real downvote counts.
    let estUpTotal = 0, estDownTotal = 0;
    mentions.forEach(m => {
      const score = typeof m.upvotes === 'number' ? m.upvotes : 0; // 'upvotes' field holds net score
      if (score >= 0) { estUpTotal += (score + 1); estDownTotal += 1; }
      else { estUpTotal += 1; estDownTotal += ((-score) + 1); }
    });
    const positiveSentiment = (estUpTotal + estDownTotal) ? Math.round((estUpTotal / (estUpTotal + estDownTotal)) * 100) : 0;
    // Time series by date (UTC date key)
    const map = {};
    mentions.forEach(m => {
      const effectiveDate = (m.created_utc || m.fetched_at || '').substring(0,10) || 'unknown';
      const d = effectiveDate;
      if (!map[d]) map[d] = { date: d, mentions: 0, posts: 0, comments: 0 };
      map[d].mentions += 1;
      if (m.type === 'post') map[d].posts += 1; else map[d].comments += 1;
    });
    const timeSeries = Object.values(map).sort((a,b)=> a.date.localeCompare(b.date));
    // Compute full historical span (min -> max effective date) irrespective of gaps
    const effectiveDates = mentions
      .map(m => (m.created_utc || m.fetched_at || '').substring(0,10))
      .filter(d => d && d !== 'unknown');
    let firstDate = null, lastDate = null, spanDays = 0;
    if (effectiveDates.length) {
      firstDate = effectiveDates.reduce((a,b)=> a < b ? a : b);
      lastDate = effectiveDates.reduce((a,b)=> a > b ? a : b);
      spanDays = Math.max(1, Math.round((new Date(lastDate).getTime() - new Date(firstDate).getTime())/86400000) + 1);
    }
    // Heatmap weeks (last 8 weeks bucket by age): compute age hours now
    const now = Date.now();
    function weekBucket(createdUtc, fetchedAt){
      const tsStr = createdUtc || fetchedAt;
      if(!tsStr) return 'W1';
      const ts = new Date(tsStr).getTime();
      const ageH = (now - ts)/(3600*1000);
      const weekNum = Math.max(1, Math.min(8, 8 - Math.floor(ageH/168)));
      return 'W'+weekNum;
    }
    const heatMapMap = {}; // subreddit -> week -> {count, engagement}
    mentions.forEach(m => {
      if (!m.subreddit) return;
      const w = weekBucket(m.created_utc, m.fetched_at);
      heatMapMap[m.subreddit] = heatMapMap[m.subreddit] || {};
      const slot = heatMapMap[m.subreddit][w] || { count:0, engagement:0, acc:0 };
      slot.count += 1;
      slot.acc += (m.upvotes||0) + (m.total_comments||0);
      heatMapMap[m.subreddit][w] = slot;
    });
    const weeks = ['W1','W2','W3','W4','W5','W6','W7','W8'];
    const heatmap = Object.entries(heatMapMap).map(([sub, wk]) => ({
      subreddit: sub,
      data: weeks.map(w => ({
        week: w,
        value: wk[w]?.count || 0,
        engagement: wk[w]?.count ? Math.round(wk[w].acc / wk[w].count) : 0
      }))
    }));
    // Funnel simple: posts with upvotes>=5, posts with comments>=3 among posts
    const postMentions = mentions.filter(m=> m.type==='post');
    const upvotes5 = postMentions.filter(p=> (p.upvotes||0)>=5).length;
    const comments3 = postMentions.filter(p=> (p.total_comments||0)>=3).length;
    const funnel = [
      { stage: 'All Verified\nMentions', count: totalMentions, percentage: 100 },
      { stage: 'Upvotes ≥5', count: upvotes5, percentage: totalMentions? Math.round((upvotes5/totalMentions)*100):0 },
      { stage: 'Comments ≥3', count: comments3, percentage: totalMentions? Math.round((comments3/totalMentions)*100):0 }
    ];
    // Top threads (posts only, sort by engagement_score)
    const topThreads = postMentions
      .slice()
      .sort((a,b)=> (b.engagement_score||0)-(a.engagement_score||0))
      .slice(0,10)
      .map((p,i)=> ({
        id: i,
        subreddit: p.subreddit,
        upvotes: p.upvotes||0,
        comments: p.total_comments||0,
        engagement: (p.upvotes||0)+(p.total_comments||0),
        url: p.url,
        title: p.title || '(Untitled)'
      }));
    // Simple topic clusters (frequent 2-word phrases in titles)
    const phraseCounts = {};
    const stop = new Set(['this','that','with','from','your','about','have','will','they','their','there','what','when','where','which','them','into','over','under','after','before','still','just','more','some','been','than','then','many','also','such','because','while','could','should','would','until','these','those','using','used','uses','able']);
    mentions.filter(m=>m.title).forEach(m => {
      const words = m.title.toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(w=> w.length>3 && !stop.has(w));
      for (let i=0;i<words.length-1;i++) {
        const phrase = words[i]+" "+words[i+1];
        phraseCounts[phrase] = phraseCounts[phrase] || { cluster_key: phrase, representative_phrase: phrase, mentions_count:0, total_engagement:0 };
        phraseCounts[phrase].mentions_count += 1;
        phraseCounts[phrase].total_engagement += (m.upvotes||0) + (m.total_comments||0);
      }
    });
    const topicClusters = Object.values(phraseCounts)
      .filter(p=>p.mentions_count>=1) // lowered threshold so clusters appear for smaller datasets
      .sort((a,b)=> b.mentions_count - a.mentions_count)
      .slice(0, 12)
      .map(p=> ({ ...p, avg_engagement: p.mentions_count ? Math.round(p.total_engagement / p.mentions_count) : 0 }));
    const { data: company, error: cErr } = await supabase.from('companies').select('last_ingested_at').eq('id', companyId).single();
    if (cErr && cErr.code !== 'PGRST116') throw cErr;
    // Legacy mode: return raw posts/comments arrays shaped like original UI expects (with post_age_hours)
    let legacyPayload = undefined;
    if (legacy) {
      const nowMs = Date.now();
      const posts = mentions.filter(m=>m.type==='post').map(p=>({
        post_title: p.title,
        post_url: p.url,
        subreddit: p.subreddit,
        upvotes: p.upvotes||0,
        total_comments: p.total_comments||0,
        post_age_hours: (p.created_utc || p.fetched_at) ? (nowMs - new Date(p.created_utc || p.fetched_at).getTime())/3600000 : 0,
        post_content: p.body || '',
  // downvotes removed
      }));
      const comments = mentions.filter(m=>m.type==='comment').map(c=>({
        comment_body: c.body || '',
        comment_url: c.url,
        post_title: c.title || '',
        subreddit: c.subreddit,
        upvotes: c.upvotes||0,
        replies: 0,
        author: '',
        post_url: c.url, // not perfect but keeps shape
        post_age_hours: (c.created_utc || c.fetched_at) ? (nowMs - new Date(c.created_utc || c.fetched_at).getTime())/3600000 : 0,
  // downvotes removed
      }));
      legacyPayload = { posts, comments };
    }
    return res.status(200).json({
      success: true,
  metrics: { totalMentions, activeSubreddits, avgEngagement, positiveSentimentPct: positiveSentiment, estUpVotes: estUpTotal },
      timeSeries,
      heatmap,
      funnel,
      topThreads,
      topicClusters,
      lastIngestedAt: company?.last_ingested_at || null,
  meta: { firstDate, lastDate, spanDays, distinctDays: timeSeries.length },
      ...(legacyPayload || {})
    });
  } catch (e) {
    console.error('dashboard error', e);
    return res.status(500).json({ error: e.message });
  }
}
