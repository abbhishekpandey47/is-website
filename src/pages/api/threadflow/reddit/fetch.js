import { fetchWithRetry } from '@/app/tools/reddit-tools/utils/fetchWithRetry';
import { forbid, getAllowedCompanyIds, verifyRequestUser } from '@/lib/serverAuth';
import { createClient } from '@supabase/supabase-js';

// Opt into longer execution for Fluid Compute on Vercel (Hobby: up to 300s)
export const config = { runtime: 'nodejs', maxDuration: 300 };

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const API_BASE = 'https://reddit-comment-gen.onrender.com';
const toISOStringSafe = (value) => {
  if (value === undefined || value === null) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};
const isoFromAgeHours = (hours) => (typeof hours === 'number' ? new Date(Date.now() - hours * 3600 * 1000).toISOString() : null);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { companyId, companyName, fullRefresh = false, maxBatches = 3 } = req.body || {};
  if (!companyId || !companyName) return res.status(400).json({ error: 'Missing fields' });
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Server not configured' });
  }
  let userCtx; try { userCtx = await verifyRequestUser(req); } catch (e) { return res.status(e.status||401).json({ error: e.message }); }
  const allowed = await getAllowedCompanyIds(userCtx);
  if (!userCtx.isAdmin && Array.isArray(allowed) && !allowed.includes(companyId)) return forbid(res);
  try {
    // Keep ingestion bounded per invocation; Vercel functions have strict time limits.
    const batchLimit = Math.min(parseInt(maxBatches) || 1, 2); // hard-cap to 2 per call
  console.log('[reddit_fetch_v2] invocation', { companyId, companyName, fullRefresh, batchLimit });
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
  // Cap upstream timeout to ensure we finish well within function limit; prefer smaller chunks + multiple invocations
  const TIMEOUT_MS = parseInt(process.env.REDDIT_FETCH_TIMEOUT_MS || '1100000', 10);
    console.log('[reddit_fetch_v2] env', { supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0,30)+'...', serviceKeyPresent: !!process.env.SUPABASE_SERVICE_ROLE_KEY, timeoutMs: TIMEOUT_MS });
    let emptyBatches = 0;
    while (batches < batchLimit) {
      batches++;
      const payload = {
        company_name: companyName,
        // Let backend decide default limits (100). Only pass after cursors.
        posts_after: fullRefresh ? undefined : nextPostsAfter || undefined,
        comments_after: fullRefresh ? undefined : nextCommentsAfter || undefined
      };
      const started = Date.now();
      console.log('[reddit_fetch_v2] batch', batches, 'payload', payload);
      let data;
      try {
        data = await fetchWithRetry(`${API_BASE}/search_company_mentions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), retries: 0, timeoutMs: TIMEOUT_MS });
      } catch (e) {
        // Handle upstream timeout/abort explicitly to avoid opaque 500s
        if (e?.name === 'AbortError' || e?.code === 20) {
          console.warn('[reddit_fetch_v2] upstream timeout/abort');
          await supabase.from('reddit_ingestion_jobs').update({ status: 'error', finished_at: new Date().toISOString(), error_message: 'upstream-timeout' }).eq('id', job.id);
          return res.status(504).json({ error: 'Upstream timed out. Please retry shortly.' });
        }
        throw e;
      }
      console.log('[reddit_fetch_v2] upstream duration(ms):', Date.now() - started, 'keys:', Object.keys(data||{}));
      const posts = Array.isArray(data.posts) ? data.posts : [];
      const comments = Array.isArray(data.comments) ? data.comments : [];
      console.log('[reddit_fetch_v2] counts', { posts: posts.length, comments: comments.length, posts_after: data.posts_after, comments_after: data.comments_after });
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
          subreddit: p.subreddit || '',
          author: p.author || '',
          title: p.post_title || '',
            body: p.post_content || '',
          url,
          upvotes: typeof p.upvotes === 'number' ? p.upvotes : 0,
          total_comments: typeof p.total_comments === 'number' ? p.total_comments : 0,
        created_utc:
          toISOStringSafe(p.post_created_at) ??
          isoFromAgeHours(p.post_age_hours) ??
          new Date().toISOString(),
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
          subreddit: c.subreddit || '',
          author: c.author || '',
          title: '',
          body: c.comment_body || '',
          url,
          upvotes: typeof c.upvotes === 'number' ? c.upvotes : 0,
          total_comments: null,
          created_utc:
            toISOStringSafe(c.comment_created_at) ??
            isoFromAgeHours(c.post_age_hours) ??
            new Date().toISOString(),
          engagement_score: c.upvotes || 0
        });
      });
      const addedThisBatch = allTransformed.length - preCount;
      if (addedThisBatch === 0) {
        emptyBatches++;
        console.warn('[reddit_fetch_v2] empty batch', batches, 'cursors', { nextPostsAfter, nextCommentsAfter });
      }
      // Break conditions: consecutive empty (2) OR no new cursors (pagination exhausted)
      const paginationExhausted = !fullRefresh && !data.posts_after && !data.comments_after;
      if ((emptyBatches >= 2) || paginationExhausted) {
        console.log('[reddit_fetch_v2] stopping ingestion', { emptyBatches, paginationExhausted });
        break;
      }
      // small delay between batches to be polite
      if (batches < batchLimit) await new Promise(r => setTimeout(r, 800));
    }
    // bulk upsert
    for (let chunk = 0; chunk < allTransformed.length; chunk += 500) {
      const slice = allTransformed.slice(chunk, chunk + 500);
      console.log('[reddit_fetch_v2] upsert chunk', { chunkStart: chunk, size: slice.length });
      if (slice.length > 0) console.log('[reddit_fetch_v2] sample row', JSON.stringify(slice[0]));
      const { error: insErr, data: insData, status: insStatus } = await supabase.from('reddit_mentions').upsert(slice, { onConflict: 'company_id,url' });
      if (insErr) {
        console.error('[reddit_fetch_v2] upsert error', insErr);
        throw insErr;
      }
      console.log('[reddit_fetch_v2] upsert status', insStatus, 'returned rows', insData?.length);
    }
    const totalAddedPosts = allTransformed.filter(r=>r.type==='post').length;
    const totalAddedComments = allTransformed.filter(r=>r.type==='comment').length;
    if (allTransformed.length === 0) {
      console.warn('[reddit_fetch_v2] no transformed rows – upstream returned zero content. Investigate backend search for companyName or limits.');
    }
    await supabase.from('reddit_ingestion_jobs').update({ status: 'success', finished_at: new Date().toISOString(), total_added_posts: totalAddedPosts, total_added_comments: totalAddedComments, posts_after: postsAfter, comments_after: commentsAfter }).eq('id', job.id);
  await supabase.from('companies').update({ last_ingested_at: new Date().toISOString(), last_posts_after: postsAfter, last_comments_after: commentsAfter }).eq('id', companyId);
    // Optionally fetch a quick count of mentions for visibility
    const { data: countRows, error: countErr } = await supabase.rpc?.('edge_count_company_mentions', { p_company_id: companyId }) || { data: null, error: null }; // optional if function exists
    if (countErr) console.warn('[reddit_fetch_v2] count rpc error (non-fatal)', countErr.message);
    return res.status(200).json({ success: true, jobId: job.id, batchesUsed: batches, added: { posts: totalAddedPosts, comments: totalAddedComments }, cursors: { postsAfter, commentsAfter }, totalMentionsEstimate: countRows || null });
  } catch (e) {
    console.error('[reddit_fetch_v2] fetch error', e);
    try {
      // Best-effort: mark latest running job for this company as error to avoid dangling state
      const { data: latestJob } = await supabase
        .from('reddit_ingestion_jobs')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (latestJob && latestJob.status === 'running') {
        await supabase
          .from('reddit_ingestion_jobs')
          .update({ status: 'error', finished_at: new Date().toISOString(), error_message: e.message?.slice(0, 500) || 'error' })
          .eq('id', latestJob.id);
      }
    } catch {}
    return res.status(500).json({ error: e.message });
  }
}
