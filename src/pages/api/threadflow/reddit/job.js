import { forbid, getAllowedCompanyIds, verifyRequestUser } from '@/lib/serverAuth';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'id required' });
  let userCtx; try { userCtx = await verifyRequestUser(req); } catch (e) { return res.status(e.status||401).json({ error: e.message }); }
  const { data, error } = await supabase.from('reddit_ingestion_jobs').select('*').eq('id', id).single();
  if (error) return res.status(500).json({ error: error.message });
  const allowed = await getAllowedCompanyIds(userCtx);
  if (!userCtx.isAdmin && data?.company_id && Array.isArray(allowed) && !allowed.includes(data.company_id)) return forbid(res);
  res.status(200).json({ success: true, job: data });
}
