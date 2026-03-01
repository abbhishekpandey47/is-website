import { verifyRequestUser } from "@/lib/serverAuth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * POST /api/setup-cadence-config
 * Creates the cadence_config table and seeds it from the companies table.
 * Only admins can call this. Safe to call multiple times (idempotent).
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let userCtx;
  try {
    userCtx = await verifyRequestUser(req);
  } catch (e) {
    return res.status(e.status || 401).json({ error: e.message });
  }

  if (!userCtx.isAdmin) {
    return res.status(403).json({ error: "Admin only" });
  }

  try {
    // Step 1: Check if table already exists by trying to select from it
    const { error: checkError } = await supabase
      .from("cadence_config")
      .select("id")
      .limit(1);

    if (checkError && checkError.code === "PGRST205") {
      // Table doesn't exist — user needs to create it in Supabase Dashboard
      return res.status(400).json({
        error: "Table cadence_config does not exist yet.",
        action: "Run the following SQL in your Supabase Dashboard → SQL Editor:",
        sql: `CREATE TABLE IF NOT EXISTS cadence_config (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name  text UNIQUE NOT NULL,
  monthly_limit integer NOT NULL DEFAULT 8,
  alert_threshold integer NOT NULL DEFAULT 75,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);`,
      });
    }

    // Step 2: Table exists — seed it from companies table
    const { data: companies, error: compError } = await supabase
      .from("companies")
      .select("name")
      .not("name", "is", null);

    if (compError) throw compError;

    let seeded = 0;
    for (const c of companies) {
      if (!c.name) continue;
      const { error: upsertError } = await supabase
        .from("cadence_config")
        .upsert(
          { company_name: c.name, monthly_limit: 8, alert_threshold: 75 },
          { onConflict: "company_name" }
        );
      if (!upsertError) seeded++;
    }

    return res.status(200).json({
      success: true,
      message: `cadence_config table exists. Seeded/verified ${seeded} companies.`,
    });
  } catch (e) {
    console.error("setup-cadence-config error:", e);
    return res.status(500).json({ error: e.message || "Internal Server Error" });
  }
}
