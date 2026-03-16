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
    const clientOnly = req.query.clientOnly === 'true'

    const { data, error } = await supabase
      .from('user_companies')
      .select('company:companies(*)')
      .eq('firebase_user_id', userCtx.uid)
      .order('last_accessed_at', { ascending: false, nullsFirst: false });
    if (error) throw error;
    let companies = (data || []).map(r => r.company).filter(Boolean);

    // When clientOnly=true, filter to companies that have a cadence_config entry
    // (client companies are always onboarded with cadence_config; SS/CS research companies are not)
    if (clientOnly) {
      const { data: cadenceRows } = await supabase.from('cadence_config').select('company_name')
      const clientNames = new Set((cadenceRows || []).map(r => r.company_name).filter(Boolean))
      companies = companies.filter(c => clientNames.has(c.name))
    }

    return res.status(200).json({ success: true, companies });
  } catch (e) {
    console.error('my-companies error', e);
    return res.status(500).json({ error: e.message || 'Internal Server Error' });
  }
}
