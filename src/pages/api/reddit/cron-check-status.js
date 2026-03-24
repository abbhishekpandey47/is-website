/**
 * GET /api/reddit/cron-check-status
 *
 * Called by Vercel Cron every 4 hours to automatically check all live posts/comments.
 * Protected by CRON_SECRET env var — Vercel sends this as Authorization: Bearer <secret>.
 *
 * Add to your Vercel environment variables:
 *   CRON_SECRET=<any random string you choose>
 */

import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'nodejs', maxDuration: 120 };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const BACKEND = 'https://reddit-comment-gen.onrender.com';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // Verify cron secret
  const authHeader = req.headers.authorization || '';
  const secret = process.env.CRON_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Fetch ALL posted content across all companies — anything with a posted_link
    // that hasn't already been confirmed as removed/not-posted.
    const [{ data: livePosts, error: postsErr }, { data: liveComments, error: commentsErr }] = await Promise.all([
      supabase.from('posts').select('id, title, posted_link, status, company_id')
        .not('posted_link', 'is', null).neq('posted_link', '')
        .not('status', 'in', '("removed","notposted","notPosted","pending","not posted")'),
      supabase.from('comment').select('id, title, posted_link, status, company_id')
        .not('posted_link', 'is', null).neq('posted_link', '')
        .not('status', 'in', '("removed","notposted","notPosted","pending","not posted")'),
    ]);

    if (postsErr) throw postsErr;
    if (commentsErr) throw commentsErr;

    const items = [
      ...(livePosts || []).map(p => ({ id: p.id, url: p.posted_link, type: 'post', title: p.title, company_id: p.company_id, old_status: p.status })),
      ...(liveComments || []).map(c => ({ id: c.id, url: c.posted_link, type: 'comment', title: c.title, company_id: c.company_id, old_status: c.status })),
    ];

    console.log('[cron-check-status] total items to check:', items.length);

    if (items.length === 0) {
      return res.status(200).json({ success: true, checked: 0, changes: [] });
    }

    // Call backend in batches of 50 to avoid oversized payloads
    const BATCH = 50;
    const allResults = [];
    for (let i = 0; i < items.length; i += BATCH) {
      const batch = items.slice(i, i + BATCH);
      const backendRes = await fetch(`${BACKEND}/check_content_status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: batch.map(b => ({ url: b.url })) }),
      });
      if (!backendRes.ok) {
        console.error('[cron-check-status] backend error on batch', i, await backendRes.text());
        continue;
      }
      const { results } = await backendRes.json();
      allResults.push(...(results || []));
    }

    // Find changed items
    const changedItems = [];
    for (const result of allResults) {
      if (result.status === 'removed' || result.status === 'deleted') {
        const item = items.find(i => i.url === result.url);
        if (item) changedItems.push({ ...item, new_status: result.status });
      }
    }

    if (changedItems.length === 0) {
      return res.status(200).json({ success: true, checked: items.length, changes: [] });
    }

    // Update status to 'removed' in main posts/comment tables
    const postChanges = changedItems.filter(i => i.type === 'post');
    const commentChanges = changedItems.filter(i => i.type === 'comment');
    await Promise.all([
      ...postChanges.map(i => supabase.from('posts').update({ status: 'removed' }).eq('id', i.id)),
      ...commentChanges.map(i => supabase.from('comment').update({ status: 'removed' }).eq('id', i.id)),
    ]);

    // Deduplication: skip items that already have an unread notification
    const changedIds = changedItems.map(i => i.id);
    const { data: existingUnread } = await supabase
      .from('reddit_status_changes')
      .select('content_id, new_status')
      .in('content_id', changedIds)
      .eq('is_read', false);

    const existingSet = new Set((existingUnread || []).map(e => `${e.content_id}:${e.new_status}`));

    const changeRecords = changedItems
      .filter(i => !existingSet.has(`${i.id}:${i.new_status}`))
      .map(i => ({
        company_id: i.company_id,
        content_type: i.type,
        content_id: i.id,
        content_title: i.title || '',
        posted_link: i.url,
        old_status: i.old_status,
        new_status: i.new_status,
      }));

    if (changeRecords.length > 0) {
      const { error: logErr } = await supabase.from('reddit_status_changes').insert(changeRecords);
      if (logErr) console.error('[cron-check-status] log error:', logErr.message);
    }

    console.log('[cron-check-status] done. checked:', items.length, 'changed:', changedItems.length, 'notified:', changeRecords.length);

    return res.status(200).json({
      success: true,
      checked: items.length,
      changed: changedItems.length,
      notified: changeRecords.length,
    });
  } catch (e) {
    console.error('[cron-check-status] error:', e);
    return res.status(500).json({ error: e.message });
  }
}
