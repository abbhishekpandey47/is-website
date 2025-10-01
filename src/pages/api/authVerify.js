// pages/api/authVerify.js
import { createClient } from "@supabase/supabase-js";
import { verifyRequestUser } from "@/lib/serverAuth";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // service role key (server-only)
  { auth: { persistSession: false } }
);

// tiny helper to name the company from its domain
const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
const inferCompanyNameFromDomain = (domain) => {
  const core = (domain?.split(".")[0] || "").replace(/[-_]/g, " ").trim();
  return core ? titleCase(core) : "My Company";
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // 1) Verify + get context (uid, email, domain, company|null, isAdmin)
    let ctx;
    try {
      ctx = await verifyRequestUser(req);
    } catch (e) {
      return res.status(e?.status || 401).json({ error: e?.message || "Unauthorized" });
    }

    const { uid, email, domain: userDomain, isAdmin } = ctx || {};
    if (!uid || !email) {
      return res.status(401).json({ error: "INVALID_TOKEN_NO_UID_OR_EMAIL" });
    }

    // 2) Use company from verifyRequestUser if present; otherwise create one quickly
    let company = ctx.company; // { id, name, slug(name_normalized), domain } or null

    if (!company) {
      const name = inferCompanyNameFromDomain(userDomain);
      const insert = await supabaseAdmin
        .from("companies")
        .insert({ name, domain: userDomain || null }) // seed with user's domain
        .select("id, name, name_normalized, domain")
        .single();

      if (insert.error) return res.status(500).json({ error: insert.error.message });

      company = insert.data
        ? {
            id: insert.data.id,
            name: insert.data.name,
            slug: insert.data.name_normalized, // frontend expects .slug
            domain: insert.data.domain,
          }
        : null;
    }

    // 3) Ensure user_companies link exists (unique: firebase_user_id + company_id)
    const link = await supabaseAdmin
      .from("user_companies")
      .upsert(
        { firebase_user_id: uid, company_id: company.id },
        { onConflict: "firebase_user_id,company_id", ignoreDuplicates: false }
      )
      .select("*")
      .maybeSingle();

    if (link.error) return res.status(500).json({ error: link.error.message });

    // 4) Return a minimal payload your layout already uses
    return res.status(200).json({
      success: true,
      user: {
        uid,
        email,
        isAdmin: !!isAdmin,
        company: {
          id: company.id,
          name: company.name,
          slug: company.slug,     // use in /threadflow/c/:slug
          domain: company.domain, // may be single domain or CSV in your model
        },
      },
    });
  } catch (err) {
    console.error("authVerify error:", err);
    return res.status(500).json({ error: err?.message || "Internal Server Error" });
  }
}
