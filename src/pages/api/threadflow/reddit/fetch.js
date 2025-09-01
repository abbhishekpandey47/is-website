import { fetchWithRetry } from '@/app/tools/reddit-tools/utils/fetchWithRetry';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const API_BASE = 'https://reddit-comment-gen.onrender.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { firebaseUserId, companyId, companyName, fullRefresh = false, maxBatches = 3 } = req.body || {};
  if (!firebaseUserId || !companyId || !companyName) return res.status(400).json({ error: 'Missing fields' });
  try {
    const batchLimit = Math.min(parseInt(maxBatches) || 1, 8); // prevent runaway
    const { data: job, error: jobErr } = await supabase
      .from('reddit_ingestion_jobs')
      .insert({ company_id: companyId, status: 'running' })
      .select('*')
      .single();
    if (jobErr) throw jobErr;

  // Track overall cursors we will persist back to company + job
  let postsAfter = null, commentsAfter = null;
    const sentiment = (u, d) => {
      if (typeof d === 'number') { if (u > d) return 'positive'; if (u < d) return 'negative'; return 'neutral'; }
      return u > 0 ? 'positive' : 'neutral';
    };
    const allTransformed = [];
    const seenUrls = new Set();
    let batches = 0;
    // fetch existing cursors if not fullRefresh
    // Load existing cursors if doing incremental ingestion
    let nextPostsAfter = null;
    let nextCommentsAfter = null;
    if (!fullRefresh) {
      const { data: comp, error: compErr } = await supabase.from('companies').select('last_posts_after,last_comments_after').eq('id', companyId).single();
      if (!compErr && comp) {
        nextPostsAfter = comp.last_posts_after || null;
        nextCommentsAfter = comp.last_comments_after || null;
      }
    }
    while (batches < batchLimit) {
      batches++;
      const payload = {
        company_name: companyName,
        limit_posts: fullRefresh ? 150 : 80,
        limit_comments: fullRefresh ? 150 : 80,
        posts_after: fullRefresh ? undefined : nextPostsAfter || undefined,
        comments_after: fullRefresh ? undefined : nextCommentsAfter || undefined
      };
      const data = await fetchWithRetry(`${API_BASE}/search_company_mentions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), retries: 2 });
      const posts = Array.isArray(data.posts) ? data.posts : [];
      const comments = Array.isArray(data.comments) ? data.comments : [];
      // Update rolling cursors for persistence (keep the most recent returned token)
      if (data.posts_after) {
        postsAfter = data.posts_after; // final value to persist
        // Advance for next batch
        nextPostsAfter = data.posts_after;
      } else if (postsAfter === null && nextPostsAfter) {
        // preserve initial cursor if API stops returning after token
        postsAfter = nextPostsAfter;
      }
      if (data.comments_after) {
        commentsAfter = data.comments_after;
        nextCommentsAfter = data.comments_after;
      } else if (commentsAfter === null && nextCommentsAfter) {
        commentsAfter = nextCommentsAfter;
      }
      const preCount = allTransformed.length;
      posts.forEach(p => {
        const url = p.post_url;
        if (!url || seenUrls.has(url)) return;
        seenUrls.add(url);
        allTransformed.push({
          company_id: companyId,
          type: 'post',
          subreddit: p.subreddit,
          author: p.author || null,
          title: p.post_title,
          body: (p.post_content || ''),
          url,
          upvotes: p.upvotes || 0,
          downvotes: p.downvotes || 0,
          total_comments: p.total_comments || 0,
          created_utc: p.post_age_hours ? new Date(Date.now() - p.post_age_hours * 3600 * 1000).toISOString() : null,
          sentiment: sentiment(p.upvotes || 0, p.downvotes),
          engagement_score: (p.upvotes || 0) + (p.total_comments || 0)
        });
      });
      comments.forEach(c => {
        const url = c.comment_url;
        if (!url || seenUrls.has(url)) return;
        seenUrls.add(url);
        allTransformed.push({
          company_id: companyId,
          type: 'comment',
          subreddit: c.subreddit,
          author: c.author,
          title: null,
          body: c.comment_body || '',
          url,
          upvotes: c.upvotes || 0,
          downvotes: c.downvotes || 0,
          total_comments: null,
          created_utc: c.post_age_hours ? new Date(Date.now() - c.post_age_hours * 3600 * 1000).toISOString() : null,
          sentiment: sentiment(c.upvotes || 0, c.downvotes),
          engagement_score: (c.upvotes || 0)
        });
      });
      const addedThisBatch = allTransformed.length - preCount;
      // Stop early if nothing new OR API did not provide new cursors (pagination exhausted)
      if (addedThisBatch === 0 || (!fullRefresh && !data.posts_after && !data.comments_after)) break;
      // small delay between batches to be polite
      if (batches < batchLimit) await new Promise(r => setTimeout(r, 800));
    }
    // bulk upsert
    for (let chunk = 0; chunk < allTransformed.length; chunk += 500) {
      const slice = allTransformed.slice(chunk, chunk + 500);
      // Use composite conflict target to allow identical URLs across different companies
      const { error: insErr } = await supabase.from('reddit_mentions').upsert(slice, { onConflict: 'company_id,url' });
      if (insErr) throw insErr;
    }
    const totalAddedPosts = allTransformed.filter(r=>r.type==='post').length;
    const totalAddedComments = allTransformed.filter(r=>r.type==='comment').length;
    await supabase.from('reddit_ingestion_jobs').update({ status: 'success', finished_at: new Date().toISOString(), total_added_posts: totalAddedPosts, total_added_comments: totalAddedComments, posts_after: postsAfter, comments_after: commentsAfter }).eq('id', job.id);
  await supabase.from('companies').update({ last_ingested_at: new Date().toISOString(), last_posts_after: postsAfter, last_comments_after: commentsAfter }).eq('id', companyId);
    return res.status(200).json({ success: true, jobId: job.id, batchesUsed: batches, added: { posts: totalAddedPosts, comments: totalAddedComments }, cursors: { postsAfter, commentsAfter } });
  } catch (e) {
    console.error('fetch error', e);
    return res.status(500).json({ error: e.message });
  }
}
