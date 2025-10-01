// pages/api/authVerify.js
import { createClient } from "@supabase/supabase-js";
import { verifyRequestUser } from "@/lib/serverAuth";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // service role key (server-only)
  { auth: { persistSession: false } }
);

// helpers
const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
const inferCompanyNameFromDomain = (domain) => {
  const core = (domain?.split(".")[0] || "").replace(/[-_]/g, " ").trim();
  return core ? titleCase(core) : "My Company";
};
const parseDomains = (csv) =>
  (csv || "")
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
const appendDomainCSV = (csv, domainToAdd) => {
  const set = new Set(parseDomains(csv));
  if (domainToAdd) set.add(domainToAdd.toLowerCase());
  return Array.from(set).join(",");
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

    // 2) Use company from verifyRequestUser if present; otherwise create (handling 23505)
    let company = ctx.company; // { id, name, slug, domain } or null

    if (!company) {
      const name = inferCompanyNameFromDomain(userDomain);
      const normalizedName = name.toLowerCase().trim();

      const insert = await supabaseAdmin
        .from("companies")
        .insert({ name, domain: userDomain || null }) // seed with user's domain
        .select("id, name, name_normalized, domain")
        .single();

      if (insert.error) {
        // ---- FIX: handle unique(name_normalized) collision ----
        if (insert.error.code === "23505") {
          // fetch the existing company by normalized name
          const existing = await supabaseAdmin
            .from("companies")
            .select("id, name, name_normalized, domain")
            .eq("name_normalized", normalizedName)
            .single();

          if (existing.error) {
            return res.status(500).json({ error: existing.error.message });
          }

          // ensure this domain is present in CSV
          const newCSV = appendDomainCSV(existing.data.domain, userDomain);
          if (newCSV !== (existing.data.domain || "")) {
            const upd = await supabaseAdmin
              .from("companies")
              .update({ domain: newCSV })
              .eq("id", existing.data.id);

            if (upd.error) return res.status(500).json({ error: upd.error.message });

            existing.data.domain = newCSV;
          }

          company = {
            id: existing.data.id,
            name: existing.data.name,
            slug: existing.data.name_normalized,
            domain: existing.data.domain,
          };
        } else {
          return res.status(500).json({ error: insert.error.message });
        }
      } else {
        company = {
          id: insert.data.id,
          name: insert.data.name,
          slug: insert.data.name_normalized,
          domain: insert.data.domain,
        };
      }
    } else {
      // If company came from verifyRequestUser, optionally ensure CSV includes this domain
      const newCSV = appendDomainCSV(company.domain, userDomain);
      if (newCSV !== (company.domain || "")) {
        const upd = await supabaseAdmin
          .from("companies")
          .update({ domain: newCSV })
          .eq("id", company.id);
        if (upd.error) return res.status(500).json({ error: upd.error.message });
        company = { ...company, domain: newCSV };
      }
    }

    if (!company) {
      return res.status(500).json({ error: "Failed to find or create a company for the user." });
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

    // 4) Return payload your layout uses
    return res.status(200).json({
      success: true,
      user: {
        uid,
        email,
        isAdmin: !!isAdmin, // remains true for infrasity.com admins
        company: {
          id: company.id,
          name: company.name,
          slug: company.slug,          // name_normalized used as slug
          domain: company.domain || userDomain, // CSV or single
        },
      },
    });
  } catch (err) {
    console.error("authVerify error:", err);
    return res.status(500).json({ error: err?.message || "Internal Server Error" });
  }
}
