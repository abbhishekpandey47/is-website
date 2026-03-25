/**
 * POST /api/reddit/check-live-status
 *
 * Checks all "live" posts and comments against the Reddit backend and updates
 * their status in Supabase if they have been removed or deleted.
 * Logs every status change to the `reddit_status_changes` table.
 *
 * Required Supabase migration (run once):
 * -------------------------------------------------------
 * CREATE TABLE reddit_status_changes (
 *   id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *   company_id      uuid REFERENCES companies(id) ON DELETE CASCADE,
 *   content_type    text NOT NULL CHECK (content_type IN ('post','comment')),
 *   content_id      uuid NOT NULL,
 *   content_title   text,
 *   posted_link     text NOT NULL,
 *   old_status      text,
 *   new_status      text NOT NULL,
 *   changed_at      timestamptz DEFAULT now(),
 *   is_read         boolean DEFAULT false NOT NULL
 * );
 * CREATE INDEX idx_rsc_company   ON reddit_status_changes(company_id);
 * CREATE INDEX idx_rsc_unread    ON reddit_status_changes(is_read) WHERE is_read = false;
 * CREATE INDEX idx_rsc_date      ON reddit_status_changes(changed_at DESC);
 *
 * Also add last_status_checked_at column to posts and comment tables:
 * ALTER TABLE posts   ADD COLUMN IF NOT EXISTS last_status_checked_at timestamptz;
 * ALTER TABLE comment ADD COLUMN IF NOT EXISTS last_status_checked_at timestamptz;
 * -------------------------------------------------------
 */

import { forbid, getAllowedCompanyIds, verifyRequestUser } from '@/lib/serverAuth';
import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'nodejs', maxDuration: 120 };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const BACKEND = 'https://reddit-comment-gen.onrender.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let userCtx;
  try { userCtx = await verifyRequestUser(req); } catch (e) {
    return res.status(e.status || 401).json({ error: e.message });
  }

  const allowedCompanyIds = await getAllowedCompanyIds(userCtx);
  const companyId = req.body?.companyId || null;

  if (!userCtx.isAdmin && companyId && Array.isArray(allowedCompanyIds) && !allowedCompanyIds.includes(companyId)) {
    return forbid(res);
  }

  try {
    // Build queries scoped to user's accessible companies
    const applyScope = (query) => {
      if (companyId) return query.eq('company_id', companyId);
      if (!userCtx.isAdmin && Array.isArray(allowedCompanyIds)) return query.in('company_id', allowedCompanyIds);
      return query;
    };

    // Check ALL content that has a posted_link and hasn't already been confirmed removed/not-posted.
    // This covers: live, reposted, approved, underModeration, postunderapproval, commentunderapproval, etc.
    const basePostsQuery = supabase.from('posts').select('id, title, posted_link, status, company_id')
      .not('posted_link', 'is', null).neq('posted_link', '')
      .not('status', 'in', '("removed","notposted","notPosted","pending","not posted")');
    const baseCommentsQuery = supabase.from('comment').select('id, title, posted_link, status, company_id')
      .not('posted_link', 'is', null).neq('posted_link', '')
      .not('status', 'in', '("removed","notposted","notPosted","pending","not posted")');

    const [{ data: livePosts, error: postsErr }, { data: liveComments, error: commentsErr }] = await Promise.all([
      applyScope(basePostsQuery),
      applyScope(baseCommentsQuery),
    ]);

    if (postsErr) throw postsErr;
    if (commentsErr) throw commentsErr;

    const items = [
      ...(livePosts || []).map(p => ({ id: p.id, url: p.posted_link, type: 'post', title: p.title, company_id: p.company_id, old_status: p.status })),
      ...(liveComments || []).map(c => ({ id: c.id, url: c.posted_link, type: 'comment', title: c.title, company_id: c.company_id, old_status: c.status })),
    ];

    if (items.length === 0) {
      return res.status(200).json({ success: true, checked: 0, changes: [] });
    }

    console.log('[check-live-status] checking', items.length, 'items');

    // Call the Reddit status backend
    const backendRes = await fetch(`${BACKEND}/check_content_status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.map(i => ({ url: i.url })) }),
    });

    if (!backendRes.ok) {
      throw new Error(`Backend returned ${backendRes.status}: ${await backendRes.text()}`);
    }

    const { results } = await backendRes.json();

    // Identify items whose status changed to removed/deleted
    const changedItems = [];
    for (const result of results || []) {
      if (result.status === 'removed' || result.status === 'deleted') {
        const item = items.find(i => i.url === result.url);
        if (item) changedItems.push({ ...item, new_status: result.status });
      }
    }

    if (changedItems.length === 0) {
      return res.status(200).json({ success: true, checked: items.length, changes: [] });
    }

    console.log('[check-live-status]', changedItems.length, 'status changes detected');

    // Update status to 'removed' in main posts/comment tables
    const postChanges = changedItems.filter(i => i.type === 'post');
    const commentChanges = changedItems.filter(i => i.type === 'comment');
    await Promise.all([
      ...postChanges.map(i => supabase.from('posts').update({ status: 'removed' }).eq('id', i.id)),
      ...commentChanges.map(i => supabase.from('comment').update({ status: 'removed' }).eq('id', i.id)),
    ]);

    // Deduplication: skip inserting a notification if one already exists for this
    // content_id with the same new_status and is still unread. This prevents duplicate
    // notifications when two users trigger the check simultaneously.
    const changedIds = changedItems.map(i => i.id);
    const { data: existingUnread } = await supabase
      .from('reddit_status_changes')
      .select('content_id, new_status')
      .in('content_id', changedIds)
      .eq('is_read', false);

    const existingSet = new Set(
      (existingUnread || []).map(e => `${e.content_id}:${e.new_status}`)
    );

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
      if (logErr) console.error('[check-live-status] notification log error (non-fatal):', logErr.message);
    }
    console.log('[check-live-status] notifications inserted:', changeRecords.length, 'skipped duplicates:', changedItems.length - changeRecords.length);

    return res.status(200).json({
      success: true,
      checked: items.length,
      changes: changedItems.map(i => ({
        id: i.id,
        type: i.type,
        title: i.title,
        url: i.url,
        old_status: i.old_status,
        new_status: i.new_status,
      })),
    });
  } catch (e) {
    console.error('[check-live-status] error:', e);
    return res.status(500).json({ error: e.message });
  }
}
