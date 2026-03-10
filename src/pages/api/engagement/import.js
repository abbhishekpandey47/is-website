import { forbid, getAllowedCompanyIds, verifyRequestUser } from "@/lib/serverAuth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Max rows per import to prevent abuse
const MAX_IMPORT_ROWS = 500;

/**
 * Parse a date string into ISO YYYY-MM-DD.
 * Supports DD/MM/YYYY, DD-MM-YYYY (primary — sheet format) and YYYY-MM-DD (ISO).
 * Falls back to JS Date constructor for other formats.
 */
function parseDate(str) {
  if (!str || !str.trim()) return null;
  const s = str.trim();

  // Skip non-date values
  if (/repost|sprint/i.test(s)) return null;

  // DD/MM/YYYY or DD-MM-YYYY
  const ddmm = s.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
  if (ddmm) {
    const [, day, month, year] = ddmm;
    if (+month >= 1 && +month <= 12 && +day >= 1 && +day <= 31) {
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }

  // YYYY-MM-DD (ISO)
  const iso = s.match(/^(\d{4})[/\-.](\d{1,2})[/\-.](\d{1,2})$/);
  if (iso) {
    return `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;
  }

  // Fallback: let JS parse it (handles "March 8, 2026" etc.)
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split("T")[0];
  }

  return null;
}

/**
 * POST /api/engagement/import
 *
 * Bulk-import engagement rows into the posts or comment table.
 * Body: { companyId, type: "post"|"comment", rows: [...] }
 *
 * Each row: {
 *   category, title, url, engagementText,
 *   status, datePosted, postedLink,
 *   redditUsername, targetedSubreddit, totalViews,
 *   clientFeedback, currentStatus, postedCommentStatus
 * }
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Auth
  let userCtx;
  try {
    userCtx = await verifyRequestUser(req);
  } catch (e) {
    return res.status(e.status || 401).json({ error: e.message || "Unauthorized" });
  }

  const allowedCompanyIds = await getAllowedCompanyIds(userCtx);
  const { companyId, type, rows } = req.body || {};

  // Validate
  if (!companyId) {
    return res.status(400).json({ error: "companyId is required" });
  }
  if (!type || !["post", "comment"].includes(type)) {
    return res.status(400).json({ error: "type must be 'post' or 'comment'" });
  }
  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ error: "rows array is required and must not be empty" });
  }
  if (rows.length > MAX_IMPORT_ROWS) {
    return res.status(400).json({ error: `Maximum ${MAX_IMPORT_ROWS} rows per import` });
  }

  // Access check
  if (!userCtx.isAdmin) {
    if (!allowedCompanyIds || allowedCompanyIds.length === 0) return forbid(res, "No company access");
    if (!allowedCompanyIds.includes(companyId)) return forbid(res);
  }

  try {
    const table = type === "post" ? "posts" : "comment";

    // --- Duplicate detection ---
    // Build a set of existing (title, url) pairs for this company so we can skip dupes.
    const urlField = type === "post" ? "url" : "post_url";
    const { data: existing, error: existErr } = await supabase
      .from(table)
      .select(`title,${urlField}`)
      .eq("company_id", companyId);

    if (existErr) {
      console.error("Duplicate-check query error:", existErr);
      return res.status(500).json({ error: existErr.message });
    }

    const existingKeys = new Set(
      (existing || []).map((r) => `${(r.title || "").trim()}||${(r[urlField] || "").trim()}`)
    );

    const dbRows = [];
    let skipped = 0;

    for (const row of rows) {
      const title = (row.title || "(untitled)").trim();
      const url = (row.url || "").trim();
      const key = `${title}||${url}`;

      if (existingKeys.has(key)) {
        skipped++;
        continue;
      }
      existingKeys.add(key); // prevent in-batch dupes too

      const base = {
        category: row.category || "Imported",
        title: title || "(untitled)",
        engagement_text: row.engagementText || null,
        date_posted: parseDate(row.datePosted),
        posted_link: row.postedLink || row.url || null,
        user_id: userCtx.uid,
        company_id: companyId,
        reddit_username: row.redditUsername || null,
        targeted_subreddit: row.targetedSubreddit || null,
        total_views: row.totalViews ? Number(row.totalViews) : null,
        client_feedback: row.clientFeedback || null,
      };

      if (type === "post") {
        dbRows.push({
          ...base,
          url: row.url || "",
          status: mapToDbStatus(row.status, "post"),
          current_status: mapToApprovalStatus(row.currentStatus),
          kims_version: null,
        });
      } else {
        dbRows.push({
          ...base,
          post_url: row.url || null,
          status: mapToApprovalStatus(row.currentStatus),
          posted_comment_status: mapToDbStatus(row.status, "comment"),
        });
      }
    }

    if (dbRows.length === 0) {
      return res.status(200).json({
        success: true,
        imported: 0,
        skipped,
        type,
        message: `All ${skipped} rows already exist — nothing imported.`,
      });
    }

    const { data, error } = await supabase
      .from(table)
      .insert(dbRows)
      .select("id");

    if (error) {
      console.error("Bulk import insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      imported: (data || []).length,
      skipped,
      type,
    });
  } catch (err) {
    console.error("engagement/import error:", err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

/**
 * Map "Approval" column values to DB client-approval status.
 * Sheet values: "Approved", "Not Approved", "Pending"
 * DB values:    "approved", "notApproved", "pending"
 */
function mapToApprovalStatus(str) {
  if (!str) return "pending";
  const s = str.toLowerCase().trim();
  if (s === "approved") return "approved";
  if (s === "not approved" || s === "not_approved" || s === "rejected") return "notApproved";
  return "pending";
}

/**
 * Map user-facing status strings to DB status values.
 * Accepts common status labels from spreadsheets.
 */
function mapToDbStatus(statusStr, type) {
  if (!statusStr) return type === "post" ? "pending" : "underModeration";

  const s = statusStr.toLowerCase().trim();

  // Direct matches
  if (s === "live" || s === "approved" || s === "published") return "live";
  if (s === "pending") return "pending";
  if (s === "removed" || s === "deleted") return "removed";
  if (s === "archived") return "archived";
  if (s === "under approval" || s === "under_approval") {
    return type === "post" ? "postunderapproval" : "commentunderapproval";
  }
  if (s === "under moderation" || s === "under_moderation") return "underModeration";
  if (s === "not approved" || s === "not_approved" || s === "rejected") return "notapproved";
  if (s === "not posted" || s === "not_posted") return "notposted";
  if (s === "reposted") return "reposted";

  // Fallback
  return type === "post" ? "pending" : "underModeration";
}
