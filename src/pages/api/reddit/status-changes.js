import { getAllowedCompanyIds, verifyRequestUser } from '@/lib/serverAuth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  let userCtx;
  try { userCtx = await verifyRequestUser(req); } catch (e) {
    return res.status(e.status || 401).json({ error: e.message });
  }
  const allowedCompanyIds = await getAllowedCompanyIds(userCtx);

  // GET /api/reddit/status-changes — fetch recent change notifications
  if (req.method === 'GET') {
    const { limit = '50', unreadOnly = 'false', companyId } = req.query;

    const applyScope = (q) => {
      if (companyId) return q.eq('company_id', companyId);
      if (!userCtx.isAdmin && Array.isArray(allowedCompanyIds)) return q.in('company_id', allowedCompanyIds);
      return q;
    };

    // Paginated data query
    let dataQuery = applyScope(
      supabase.from('reddit_status_changes').select('*').order('changed_at', { ascending: false }).limit(Math.min(parseInt(limit) || 50, 200))
    );
    if (unreadOnly === 'true') dataQuery = dataQuery.eq('is_read', false);

    // Separate total unread count — no limit, count only
    const unreadCountQuery = applyScope(
      supabase.from('reddit_status_changes').select('id', { count: 'exact', head: true }).eq('is_read', false)
    );

    const [{ data, error }, { count: totalUnread, error: countErr }] = await Promise.all([dataQuery, unreadCountQuery]);

    if (error) return res.status(500).json({ error: error.message });
    if (countErr) console.warn('[status-changes] count error (non-fatal):', countErr.message);

    return res.status(200).json({ success: true, data: data || [], unreadCount: totalUnread || 0 });
  }

  // PATCH /api/reddit/status-changes — mark notifications as read
  if (req.method === 'PATCH') {
    const { ids } = req.body || {};

    let query = supabase.from('reddit_status_changes').update({ is_read: true });

    if (ids && Array.isArray(ids) && ids.length > 0) {
      query = query.in('id', ids);
    } else if (!userCtx.isAdmin && Array.isArray(allowedCompanyIds)) {
      // Mark all for this user's companies
      query = query.in('company_id', allowedCompanyIds).eq('is_read', false);
    } else if (userCtx.isAdmin) {
      query = query.eq('is_read', false);
    }

    const { error } = await query;
    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
