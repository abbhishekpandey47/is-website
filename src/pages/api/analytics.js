import { getAllowedCompanyIds, verifyRequestUser } from '@/lib/serverAuth';
import { createClient } from '@supabase/supabase-js';
import pLimit from 'p-limit';

const POST_API_BASE = 'https://reddit-comment-gen.onrender.com/fetch_post_details';
const COMMENT_API_BASE = 'https://reddit-comment-gen.onrender.com/fetch_comment_details';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const limit = pLimit(5);

const toInt = (v, d) => {
  const n = parseInt(String(v), 10);
  return Number.isFinite(n) && n > 0 ? n : d;
};

const fetchWithTimeout = (url, { timeoutMs = 7500, ...opts } = {}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...opts, signal: controller.signal }).finally(() => clearTimeout(id));
};

export default async function handler(req, res) {
  let userCtx;
  try {
    userCtx = await verifyRequestUser(req);
  } catch (e) {
    return res.status(e.status || 401).json({ error: e.message || 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const allowedCompanyIds = await getAllowedCompanyIds(userCtx);

  // pagination params
  const pagePosts = toInt(req.query.pagePosts, 1);
  const pageComments = toInt(req.query.pageComments, 1);
  const pageSizePosts = Math.min(toInt(req.query.pageSizePosts, 10), 50);
  const pageSizeComments = Math.min(toInt(req.query.pageSizeComments, 10), 50);

  const pFrom = (pagePosts - 1) * pageSizePosts;
  const pTo = pFrom + pageSizePosts - 1;
  const cFrom = (pageComments - 1) * pageSizeComments;
  const cTo = cFrom + pageSizeComments - 1;

  try {
    let postsQ = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('date_posted', { ascending: false })
      .range(pFrom, pTo);

    if (!userCtx.isAdmin && Array.isArray(allowedCompanyIds)) {
      postsQ = postsQ.in('company_id', allowedCompanyIds);
    }

    let commentsQ = supabase
      .from('comment')
      .select('*', { count: 'exact' })
      .order('date_posted', { ascending: false })
      .range(cFrom, cTo);

    if (!userCtx.isAdmin && Array.isArray(allowedCompanyIds)) {
      commentsQ = commentsQ.in('company_id', allowedCompanyIds);
    }

    const [
      { data: PostPageData, count: PostTotal, error: PostError },
      { data: CommentPageData, count: CommentTotal, error: CommentError },
    ] = await Promise.all([postsQ, commentsQ]);

    if (PostError || CommentError) {
      return res.status(500).json({ error: (PostError || CommentError).message });
    }

    const fetchDetails = async (record, type) => {
      const url = record?.posted_link;
      if (!url) return null;
      try {
        const response = await fetchWithTimeout(
          type === 'post' ? POST_API_BASE : COMMENT_API_BASE,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reddit_url: url }),
            timeoutMs: 7500,
          }
        );
        if (!response.ok) throw new Error('bad status');
        return await response.json();
      } catch {
        return null; // skip silently
      }
    };

    const [postResults, commentResults] = await Promise.all([
      Promise.allSettled((PostPageData ?? []).map(p => limit(() => fetchDetails(p, 'post')))),
      Promise.allSettled((CommentPageData ?? []).map(c => limit(() => fetchDetails(c, 'comment')))),
    ]);

    const postDetails = postResults
      .filter(r => r.status === 'fulfilled' && r.value)
      .map(r => r.value);

    const commentDetails = commentResults
      .filter(r => r.status === 'fulfilled' && r.value)
      .map(r => r.value);

    return res.status(200).json({
      success: true,
      data: {
        posts: {
          items: postDetails,
          total: PostTotal ?? 0,
          page: pagePosts,
          pageSize: pageSizePosts,
          totalPages: Math.max(1, Math.ceil((PostTotal ?? 0) / pageSizePosts)),
        },
        comments: {
          items: commentDetails,
          total: CommentTotal ?? 0,
          page: pageComments,
          pageSize: pageSizeComments,
          totalPages: Math.max(1, Math.ceil((CommentTotal ?? 0) / pageSizeComments)),
        },
      },
    });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
