import { verifyRequestUser } from '@/lib/serverAuth';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabase = null;
if (supabaseUrl && serviceKey) {
  supabase = createClient(supabaseUrl, serviceKey);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!supabase) return res.status(500).json({ error: 'Supabase environment variables missing (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)' });
  const { companyName, source } = req.body || {};
  const isResearch = !!source; // any source (competitor/research/etc) = skip user_companies
  if (!companyName) return res.status(400).json({ error: 'companyName required' });
  let userCtx; try { userCtx = await verifyRequestUser(req); } catch (e) { return res.status(e.status||401).json({ error: e.message }); }
  const norm = companyName.trim().toLowerCase();
  try {
    // 1. Try fetch existing (maybeSingle avoids throwing on no rows)
    let { data: company, error: fetchErr } = await supabase
      .from('companies')
      .select('*')
      .eq('name_normalized', norm)
      .maybeSingle();
    if (fetchErr) throw fetchErr;
    if (!company) {
      // Insert; rely on unique constraint for race safety (ignore duplicate conflict by upsert)
      const { data: inserted, error: insErr } = await supabase
        .from('companies')
        .upsert({ name: companyName }, { onConflict: 'name_normalized' })
        .select('*')
        .single();
      if (insErr) throw insErr;
      company = inserted;
    }
    // 2. Link user -> company — skip for research/competitor lookups so they don't appear in My Companies
    if (!isResearch) {
      const { error: linkErr } = await supabase
        .from('user_companies')
        .upsert({ firebase_user_id: userCtx.uid, company_id: company.id, last_accessed_at: new Date().toISOString() }, { onConflict: 'firebase_user_id,company_id' })
        .select('*')
        .single();
      if (linkErr) throw linkErr;
    }
    // 2b. Optionally set company domain if empty and user email domain seems corporate
    if (!isResearch && !company.domain && userCtx.email) {
      const domain = (userCtx.email.split('@')[1] || '').toLowerCase();
      const free = new Set(['gmail.com','yahoo.com','outlook.com','hotmail.com','proton.me']);
      if (domain && !free.has(domain)) {
        await supabase.from('companies').update({ domain }).eq('id', company.id);
      }
    }
    // 3. Determine if ingestion recommended (stale threshold 6h)
    const stale = !company.last_ingested_at || (Date.now() - new Date(company.last_ingested_at).getTime()) > 6*3600*1000;
    return res.status(200).json({ success: true, company, stale });
  } catch (e) {
    console.error('link-company error', e);
    return res.status(500).json({ error: e.message || 'Unknown error linking company' });
  }
}
