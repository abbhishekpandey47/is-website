import { verifyRequestUser } from '@/lib/serverAuth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  let userCtx;
  try { userCtx = await verifyRequestUser(req); } catch (e) { return res.status(e.status||401).json({ error: e.message }); }
  try {
    if(!userCtx.isAdmin) return res.status(403).json({error : "Access Denied"});

    const { data, error } = await supabase
      .from('companies')
      .select('id , name')

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (e) {
    console.error('Companies error', e);
    return res.status(500).json({ error: e.message || 'Internal Server Error' });
  }
}
