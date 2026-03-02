import { verifyRequestUser } from "@/lib/serverAuth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Auto-create the cadence_config table if it doesn't exist.
// Uses Supabase's rpc to run raw SQL via a one-time bootstrap.
let tableVerified = false;

async function ensureTable() {
  if (tableVerified) return;
  const { error } = await supabase
    .from("cadence_config")
    .select("id")
    .limit(1);

  if (error && error.code === "PGRST205") {
    // Table doesn't exist — try to create it via rpc if available,
    // otherwise seed from companies on first successful PUT.
    console.error(
      "cadence_config table missing! Run this SQL in Supabase Dashboard:\n" +
        "CREATE TABLE IF NOT EXISTS cadence_config (\n" +
        "  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,\n" +
        "  company_name text UNIQUE NOT NULL,\n" +
        "  monthly_limit integer NOT NULL DEFAULT 8,\n" +
        "  alert_threshold integer NOT NULL DEFAULT 75,\n" +
        "  created_at timestamptz DEFAULT now(),\n" +
        "  updated_at timestamptz DEFAULT now()\n" +
        ");"
    );
    throw new Error(
      "Table cadence_config does not exist. Run the migration in supabase/migrations/cadence_config.sql"
    );
  }
  if (!error) tableVerified = true;
}

export default async function handler(req, res) {
  let userCtx;
  try {
    userCtx = await verifyRequestUser(req);
  } catch (e) {
    return res.status(e.status || 401).json({ error: e.message });
  }

  try {
    await ensureTable();

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

    // DELETE — remove a company's cadence config
    if (req.method === "DELETE") {
      const { company_name } = req.body || {};
      if (!company_name) {
        return res.status(400).json({ error: "company_name is required" });
      }

      const { error } = await supabase
        .from("cadence_config")
        .delete()
        .eq("company_name", company_name);

      if (error) throw error;
      return res.status(200).json({ success: true, deleted: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    console.error("cadence-config error:", e);
    const isMissingTable = e.message?.includes("cadence_config") && e.message?.includes("not exist");
    return res.status(isMissingTable ? 503 : 500).json({
      error: e.message || "Internal Server Error",
      ...(isMissingTable ? { setup: "Run: supabase/migrations/cadence_config.sql in Supabase SQL Editor" } : {}),
    });
  }
}
