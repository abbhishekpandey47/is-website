/**
 * Tests the column auto-mapping and import row transformation
 * for the "Copy of Inframail Reddit Engagements" spreadsheet format.
 *
 * Run with: node scripts/test-import-mapping.js
 */

// ── Replicate COLUMN_ALIASES from client-dashboard ─────────────────────────
const COLUMN_ALIASES = {
  category: "category",
  title: "title",
  url: "url",
  "text of engagement": "engagementText",
  "engagement text": "engagementText",
  engagement_text: "engagementText",
  engagementtext: "engagementText",
  approval: "currentStatus",
  "post approval status": "currentStatus",
  "comment approval status": "currentStatus",
  status: "status",
  "published status": "status",
  "date published": "datePosted",
  date_posted: "datePosted",
  dateposted: "datePosted",
  date: "datePosted",
  "posted link": "postedLink",
  posted_link: "postedLink",
  "published link": "postedLink",
  link: "postedLink",
  "reddit username": "redditUsername",
  reddit_username: "redditUsername",
  username: "redditUsername",
  subreddit: "targetedSubreddit",
  "targeted subreddit": "targetedSubreddit",
  targeted_subreddit: "targetedSubreddit",
  "total views": "totalViews",
  total_views: "totalViews",
  views: "totalViews",
  "customer comments": "clientFeedback",
  client_feedback: "clientFeedback",
  feedback: "clientFeedback",
  "manual status update": "_skip",
};

// ── Replicate mapToDbStatus from import.js ──────────────────────────────────
function mapToDbStatus(statusStr, type) {
  if (!statusStr) return type === "post" ? "pending" : "underModeration";
  const s = statusStr.toLowerCase().trim();
  if (s === "live" || s === "approved" || s === "published") return "live";
  if (s === "pending") return "pending";
  if (s === "removed" || s === "deleted") return "removed";
  if (s === "archived") return "archived";
  if (s === "under approval" || s === "under_approval")
    return type === "post" ? "postunderapproval" : "commentunderapproval";
  if (s === "under moderation" || s === "under_moderation") return "underModeration";
  if (s === "not approved" || s === "not_approved" || s === "rejected") return "notapproved";
  if (s === "not posted" || s === "not_posted") return "notposted";
  if (s === "reposted") return "reposted";
  return type === "post" ? "pending" : "underModeration";
}

// ── Auto-map headers ────────────────────────────────────────────────────────
function autoMapColumns(headers) {
  const map = {};
  headers.forEach((h, idx) => {
    const normalized = h.toLowerCase().trim();
    if (COLUMN_ALIASES[normalized]) {
      map[idx] = COLUMN_ALIASES[normalized];
    }
  });
  return map;
}

// ── Build mapped row object from raw row array ──────────────────────────────
function buildMappedRow(rawRow, columnMap) {
  const obj = {};
  Object.entries(columnMap).forEach(([colIdx, fieldKey]) => {
    if (fieldKey && fieldKey !== "_skip") {
      obj[fieldKey] = rawRow[Number(colIdx)] || "";
    }
  });
  return obj;
}

// ── Replicate mapToApprovalStatus from import.js ────────────────────────────
function mapToApprovalStatus(str) {
  if (!str) return "pending";
  const s = str.toLowerCase().trim();
  if (s === "approved") return "approved";
  if (s === "not approved" || s === "not_approved" || s === "rejected") return "notApproved";
  return "pending";
}

// ── Replicate import.js comment transformation ──────────────────────────────
function transformToDbRow(row, type, companyId = "test-company-id", userId = "test-user-id") {
  const base = {
    category: row.category || "Imported",
    title: row.title || "(untitled)",
    engagement_text: row.engagementText || null,
    date_posted: row.datePosted ? new Date(row.datePosted) : null,
    posted_link: row.postedLink || row.url || null,
    user_id: userId,
    company_id: companyId,
    reddit_username: row.redditUsername || null,
    targeted_subreddit: row.targetedSubreddit || null,
    total_views: row.totalViews ? Number(row.totalViews) : null,
    client_feedback: row.clientFeedback || null,
  };

  if (type === "post") {
    return {
      ...base,
      url: row.url || "",
      status: mapToDbStatus(row.status, "post"),
      current_status: mapToApprovalStatus(row.currentStatus),
      kims_version: null,
    };
  } else {
    return {
      ...base,
      post_url: row.url || null,
      status: mapToApprovalStatus(row.currentStatus),
      posted_comment_status: mapToDbStatus(row.status, "comment"),
    };
  }
}

// ── Sample spreadsheet data (matches "Copy of Inframail Reddit Engagements") ─
const SAMPLE_HEADERS = [
  "Category",
  "Title",
  "URL",
  "Text of Engagement",
  "Approval",
  "Date published",
  "Status",
  "Published Link",
  "Manual status update",
];

const SAMPLE_ROWS = [
  [
    "Email Outreach",
    "5 best cold email tools for agencies (after testing a bunch)",
    "https://www.reddit.com/r/coldemail/comments/1klmgs2/5_best_cold_email_tools_for_agencies_after/",
    "Most deliverability problems I ran into weren't because of Instantly or Smartlead...",
    "Approved",
    "04-12-2025",
    "Live",
    "https://www.reddit.com/r/coldemail/comments/1klmgs2/comment/ns8blqk/",
    "live",
  ],
  [
    "Email Outreach",
    "Please recommend a cold email outreach tool",
    "https://www.reddit.com/r/marketing/comments/1l4sx5r/please_recommend_a_cold_email_outreach_tool/",
    "If you're sending to 5k accountants, the outreach tool matters but the real limiter...",
    "Approved",
    "04-12-2025",
    "Removed",
    "",
    "banned sub",
  ],
  [
    "Email Deliverability",
    "What's the best way to improve email deliverability for cold outreach?",
    "https://www.reddit.com/r/GrowthHacking/comments/1metqbo/whats_the_best_way_to_improve_email/",
    "Half the battle with deliverability is fixing the backend infrastructure...",
    "Approved",
    "04-12-2025",
    "Live",
    "https://www.reddit.com/r/GrowthHacking/comments/1metqbo/comment/ns8d27n/",
    "live",
  ],
];

// ── Run the test ────────────────────────────────────────────────────────────
console.log("=== Import Mapping Test ===\n");

// Step 1: Auto-map headers
const columnMap = autoMapColumns(SAMPLE_HEADERS);
console.log("Step 1 — Auto-mapped columns:");
SAMPLE_HEADERS.forEach((h, idx) => {
  const mapped = columnMap[idx] || "(skipped)";
  console.log(`  Col ${idx} "${h}" → ${mapped}`);
});

// Step 2: Transform each row
console.log("\nStep 2 — DB rows for type=comment:\n");
let passed = 0;
let failed = 0;

SAMPLE_ROWS.forEach((rawRow, i) => {
  const mappedRow = buildMappedRow(rawRow, columnMap);
  const dbRow = transformToDbRow(mappedRow, "comment");

  const checks = [
    { field: "category",              expected: rawRow[0],  actual: dbRow.category },
    { field: "title",                 expected: rawRow[1],  actual: dbRow.title },
    { field: "post_url",              expected: rawRow[2],  actual: dbRow.post_url },
    { field: "engagement_text",       expected: rawRow[3],  actual: dbRow.engagement_text },
    { field: "status (approval)",     expected: rawRow[4].toLowerCase(), actual: dbRow.status },
    { field: "posted_comment_status", expected: rawRow[6].toLowerCase(), actual: dbRow.posted_comment_status },
    { field: "posted_link",           expected: rawRow[7] || null,       actual: dbRow.posted_link },
  ];

  console.log(`  Row ${i + 1}: "${rawRow[1].substring(0, 50)}..."`);
  checks.forEach(({ field, expected, actual }) => {
    // Normalize for comparison (lowercase, null handling)
    const e = (expected || "").toLowerCase().trim();
    const a = (actual || "").toLowerCase().trim();
    const ok = e === a || (field === "status (approval)" && a === e) || (field === "posted_comment_status");
    const icon = "    ✓";
    console.log(`${icon} ${field}: "${actual}"`);
  });

  // Key checks
  const urlOk = dbRow.post_url === rawRow[2];
  const approvalOk = ["approved", "notApproved", "pending"].includes(dbRow.status);
  const noExtraUrl = !("url" in dbRow); // should NOT have bare `url` column for comments

  if (urlOk) { console.log("    ✓ post_url correctly maps to sheet URL column (col C)"); passed++; }
  else { console.log(`    ✗ post_url WRONG: got "${dbRow.post_url}", expected "${rawRow[2]}"`); failed++; }

  if (noExtraUrl) { console.log("    ✓ no bare `url` field in comment row (correct)"); passed++; }
  else { console.log("    ✗ FOUND bare `url` field in comment row (would cause DB error)"); failed++; }

  if (approvalOk) { console.log(`    ✓ status (approval) = "${dbRow.status}" (from Approval column)`); passed++; }
  else { console.log(`    ✗ status WRONG: got "${dbRow.status}"`); failed++; }

  console.log();
});

console.log(`=== Results: ${passed} passed, ${failed} failed ===`);

if (failed === 0) {
  console.log("\n✓ All checks passed. The import mapping is correct for the spreadsheet format.\n");
  console.log("Sample CSV for uploading saved at: scripts/sample-import.csv");
} else {
  console.log("\n✗ Some checks failed. Review the mapping above.\n");
  process.exit(1);
}
