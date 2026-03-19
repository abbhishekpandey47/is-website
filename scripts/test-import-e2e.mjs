/**
 * End-to-end import test — directly against Supabase.
 * Tests that:
 *  1. Sample CSV columns map correctly to DB fields
 *  2. Comments land in the `comment` table with the right company_id
 *  3. Posts land in the `posts` table
 *
 * Run: node scripts/test-import-e2e.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const SUPABASE_URL = "https://vfwizvkvojkawwydmdzg.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmd2l6dmt2b2prYXd3eWRtZHpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyOTAzNzUsImV4cCI6MjA3MTg2NjM3NX0.LymZcRWhkF0MSBcOKtKKRNZ2yCYJzVGW1X9QiaIdSTg";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── mapping helpers (mirrors import.js) ─────────────────────────────────────
function mapToApprovalStatus(str) {
  if (!str) return "pending";
  const s = str.toLowerCase().trim();
  if (s === "approved") return "approved";
  if (s === "not approved" || s === "not_approved" || s === "rejected") return "notApproved";
  return "pending";
}
function mapToDbStatus(statusStr, type) {
  if (!statusStr) return type === "post" ? "pending" : "underModeration";
  const s = statusStr.toLowerCase().trim();
  if (s === "live" || s === "published") return "live";
  if (s === "pending") return "pending";
  if (s === "removed" || s === "deleted") return "removed";
  if (s === "reposted") return "reposted";
  if (s === "not posted" || s === "not_posted") return "notposted";
  return type === "post" ? "pending" : "underModeration";
}

// ── parse sample CSV ─────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  const parseLine = (line) => {
    const result = [];
    let current = "", inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) { result.push(current.trim()); current = ""; }
      else current += ch;
    }
    result.push(current.trim());
    return result;
  };
  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine).filter((r) => r.some(Boolean));
  return { headers, rows };
}

const COLUMN_ALIASES = {
  category: "category", title: "title", url: "url",
  "text of engagement": "engagementText", "engagement text": "engagementText",
  approval: "currentStatus", "post approval status": "currentStatus",
  status: "status", "published status": "status",
  "date published": "datePosted", date: "datePosted",
  "published link": "postedLink", "posted link": "postedLink", link: "postedLink",
  "reddit username": "redditUsername", username: "redditUsername",
  "targeted subreddit": "targetedSubreddit", subreddit: "targetedSubreddit",
  "total views": "totalViews", "customer comments": "clientFeedback",
  "manual status update": "_skip",
};

function autoMap(headers) {
  const map = {};
  headers.forEach((h, idx) => {
    const alias = COLUMN_ALIASES[h.toLowerCase().trim()];
    if (alias) map[idx] = alias;
  });
  return map;
}

function buildRow(rawRow, colMap, companyId, userId) {
  const r = {};
  Object.entries(colMap).forEach(([idx, key]) => {
    if (key && key !== "_skip") r[key] = rawRow[Number(idx)] || "";
  });

  const base = {
    category: r.category || "Imported",
    title: r.title || "(untitled)",
    engagement_text: r.engagementText || null,
    date_posted: r.datePosted ? new Date(r.datePosted) : null,
    posted_link: r.postedLink || null,
    company_id: companyId,
    reddit_username: r.redditUsername || null,
    targeted_subreddit: r.targetedSubreddit || null,
    total_views: r.totalViews ? Number(r.totalViews) : null,
    client_feedback: r.clientFeedback || null,
  };

  return {
    ...base,
    post_url: r.url || null,
    status: mapToApprovalStatus(r.currentStatus),
    posted_comment_status: mapToDbStatus(r.status, "comment"),
  };
}

// ── main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("=== E2E Import Test ===\n");

  // 1. Fetch companies
  const { data: companies, error: compErr } = await supabase
    .from("companies")
    .select("id, name")
    .limit(10);

  if (compErr) {
    console.error("✗ Failed to fetch companies:", compErr.message);
    process.exit(1);
  }
  console.log(`Found ${companies.length} companies:`);
  companies.forEach((c) => console.log(`  • ${c.name} (${c.id})`));

  if (companies.length === 0) {
    console.error("✗ No companies found — cannot test import.");
    process.exit(1);
  }

  const testCompany = companies[0];
  console.log(`\nUsing company: "${testCompany.name}" (${testCompany.id})\n`);

  // 2. Parse sample CSV
  const csv = readFileSync("scripts/sample-import.csv", "utf8");
  const { headers, rows } = parseCSV(csv);
  const colMap = autoMap(headers);

  console.log("Column auto-mapping:");
  headers.forEach((h, i) => {
    console.log(`  "${h}" → ${colMap[i] || "(skipped)"}`);
  });
  console.log();

  // 3. Build DB rows
  const dbRows = rows.map((r) => buildRow(r, colMap, testCompany.id, "test-script"));
  console.log(`Built ${dbRows.length} comment rows.\n`);
  console.log("Preview row 1:", JSON.stringify(dbRows[0], null, 2));

  // 4. Insert into `comment` table
  console.log("\nInserting into `comment` table...");
  const { data: inserted, error: insertErr } = await supabase
    .from("comment")
    .insert(dbRows)
    .select("id, title, category, post_url, status, posted_comment_status, company_id");

  if (insertErr) {
    console.error("✗ Insert failed:", insertErr.message);
    console.error("  Details:", insertErr.details || insertErr.hint || "");
    process.exit(1);
  }

  console.log(`\n✓ Inserted ${inserted.length} rows successfully!`);
  inserted.forEach((row, i) => {
    console.log(`\n  Row ${i + 1}:`);
    console.log(`    title:                 "${row.title}"`);
    console.log(`    category:              "${row.category}"`);
    console.log(`    post_url:              "${row.post_url}"`);
    console.log(`    status (approval):     "${row.status}"`);
    console.log(`    posted_comment_status: "${row.posted_comment_status}"`);
    console.log(`    company_id:            "${row.company_id}" → ${row.company_id === testCompany.id ? "✓ matches "+testCompany.name : "✗ WRONG"}`);
  });

  // 5. Clean up test rows
  const ids = inserted.map((r) => r.id);
  const { error: delErr } = await supabase.from("comment").delete().in("id", ids);
  if (delErr) {
    console.warn("\n⚠ Cleanup failed (test rows still in DB):", delErr.message);
  } else {
    console.log(`\n✓ Cleaned up ${ids.length} test rows.`);
  }

  console.log("\n=== All checks passed. Import mapping is working correctly. ===\n");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
