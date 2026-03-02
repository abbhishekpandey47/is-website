import { verifyRequestUser } from '@/lib/serverAuth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  let userCtx;
  try { userCtx = await verifyRequestUser(req); } catch (e) { return res.status(e.status||401).json({ error: e.message }); }
  if(!userCtx.isAdmin) return res.status(403).json({error : "Access Denied"});

  try {
    // GET — list all companies
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('companies')
        .select('id , name')

      if (error) throw error;
      return res.status(200).json({ success: true, data });
    }

    // POST — add a new company
    if (req.method === 'POST') {
      const { name, monthly_limit } = req.body || {};
      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Company name is required' });
      }

      const { data, error } = await supabase
        .from('companies')
        .insert([{ name: name.trim() }])
        .select()
        .single();

      if (error) throw error;

      // Also create cadence config for the new company
      await supabase
        .from('cadence_config')
        .upsert(
          { company_name: name.trim(), monthly_limit: monthly_limit || 35 },
          { onConflict: 'company_name' }
        );

      return res.status(201).json({ success: true, data });
    }

    // DELETE — remove a company by id
    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) {
        return res.status(400).json({ error: 'Company id is required' });
      }

      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ success: true, deleted: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('Companies error', e);
    return res.status(500).json({ error: e.message || 'Internal Server Error' });
  }
}
