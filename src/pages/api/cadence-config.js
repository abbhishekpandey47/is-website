import { verifyRequestUser } from "@/lib/serverAuth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  let userCtx;
  try {
    userCtx = await verifyRequestUser(req);
  } catch (e) {
    return res.status(e.status || 401).json({ error: e.message });
  }

  try {
    // GET — return all cadence configs
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("cadence_config")
        .select("id, company_name, monthly_limit, alert_threshold, updated_at")
        .order("company_name");

      if (error) throw error;
      return res.status(200).json({ success: true, data });
    }

    // PUT — upsert one company's cadence config
    if (req.method === "PUT") {
      const { company_name, monthly_limit, alert_threshold } = req.body || {};

      if (!company_name) {
        return res.status(400).json({ error: "company_name is required" });
      }

      const updates = {};
      if (monthly_limit !== undefined) updates.monthly_limit = Number(monthly_limit);
      if (alert_threshold !== undefined) updates.alert_threshold = Number(alert_threshold);

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      const { data, error } = await supabase
        .from("cadence_config")
        .upsert(
          { company_name, ...updates },
          { onConflict: "company_name" }
        )
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json({ success: true, data });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("cadence-config error", e);
    return res.status(500).json({ error: e.message || "Internal Server Error" });
  }
}
