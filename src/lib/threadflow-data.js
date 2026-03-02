/**
 * Shared ThreadFlow Data Layer
 *
 * Single source of truth for ALL ThreadFlow pages.
 * Every page MUST import status mapping and data processing from here
 * instead of defining its own version.
 *
 * API: All data comes from two endpoints:
 *   GET /api/allContent  → { data: [...posts, ...comments] }
 *   GET /api/companies   → { data: [{ id, name }] }
 */

// ─── HTML Stripping ─────────────────────────────────────────────────────────

/**
 * Strip HTML tags and decode common HTML entities from a string.
 * Used to clean engagement text and titles that may contain raw HTML.
 */
export function stripHtml(str) {
  if (!str) return "";
  return str
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

// ─── Status Colors ──────────────────────────────────────────────────────────

export const STATUS_COLORS = {
  Live: "#34d399",
  Pending: "#fbbf24",
  "Under Approval": "#60a5fa",
  Removed: "#f87171",
  Archived: "#71717a",
};

// ─── Core Status Normalization ──────────────────────────────────────────────

/**
 * Returns the raw status string from an item based on its type.
 * Posts use `status`, comments use `posted_comment_status`.
 */
export function getRawStatus(item) {
  return item.type === "comment"
    ? item.posted_comment_status
    : item.status;
}

/**
 * Normalize a raw item into a unified display status.
 *
 * This is the SINGLE source of truth for status mapping.
 * Every page must use this function — do NOT create local alternatives.
 *
 * Returns: "Live" | "Under Approval" | "Pending" | "Removed" | "Archived"
 */
export function normalizeStatus(item) {
  const s = (getRawStatus(item) || "").toLowerCase();

  if (s === "live" || s === "approved") return "Live";
  if (s === "postunderapproval" || s === "commentunderapproval")
    return "Under Approval";
  if (
    s === "pending" ||
    s === "undermoderation" ||
    s === "under_moderation" ||
    s === "notposted" ||
    s === "reposted"
  )
    return "Pending";
  if (s === "removed" || s === "deleted" || s === "notapproved")
    return "Removed";
  if (s === "archived") return "Archived";

  return "Pending"; // fallback for unknown statuses
}

// ─── Data Fetching ──────────────────────────────────────────────────────────

/**
 * Fetch allContent + companies in parallel with a Firebase auth token.
 * Returns { items: [...], companies: [{ id, name }] }
 */
export async function fetchThreadflowData(token) {
  const [contentRes, companyRes] = await Promise.allSettled([
    fetch("/api/allContent", {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch("/api/companies", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  let items = [];
  let companies = [];

  if (contentRes.status === "fulfilled" && contentRes.value.ok) {
    const result = await contentRes.value.json();
    items = result.data || [];
  }
  if (companyRes.status === "fulfilled" && companyRes.value.ok) {
    const result = await companyRes.value.json();
    companies = result.data || [];
  }

  return { items, companies };
}

// ─── Filtering Helpers ──────────────────────────────────────────────────────

/**
 * Filter items by company ID.
 */
export function getItemsByCompany(items, companyId) {
  if (!companyId) return items;
  return items.filter((item) => item.company_id === companyId);
}

/**
 * Filter items for the current calendar month.
 */
export function getCurrentMonthItems(items) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  return items.filter((item) => {
    if (!item.date_posted) return false;
    const d = new Date(item.date_posted);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

/**
 * Filter items for a specific year/month (0-indexed month).
 */
export function getItemsByMonth(items, year, month) {
  return items.filter((item) => {
    if (!item.date_posted) return false;
    const d = new Date(item.date_posted);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

// ─── Status Counting ────────────────────────────────────────────────────────

/**
 * Count items by normalized status.
 * Returns { Live, "Under Approval", Pending, Removed, Archived }
 */
export function getStatusCounts(items) {
  const counts = {
    Live: 0,
    "Under Approval": 0,
    Pending: 0,
    Removed: 0,
    Archived: 0,
  };
  items.forEach((item) => {
    const status = normalizeStatus(item);
    if (counts[status] !== undefined) counts[status]++;
  });
  return counts;
}

/**
 * Get comprehensive stats for a set of items.
 */
export function getClientStats(items) {
  const counts = getStatusCounts(items);
  const total = items.length;
  const live = counts.Live;
  const completion = total > 0 ? Math.round((live / total) * 100) : 0;
  const remaining = Math.max(0, total - live);

  return {
    ...counts,
    total,
    live,
    completion,
    remaining,
  };
}

// ─── Cadence Helpers ────────────────────────────────────────────────────────

/**
 * Build weekly breakdown for the current month.
 * Returns [{ week: "Wk 1", count }, ...]
 */
export function buildWeeklyData(items) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const weeks = [
    { week: "Wk 1", count: 0 },
    { week: "Wk 2", count: 0 },
    { week: "Wk 3", count: 0 },
    { week: "Wk 4", count: 0 },
  ];

  items.forEach((item) => {
    if (!item.date_posted) return;
    const d = new Date(item.date_posted);
    if (d.getFullYear() !== year || d.getMonth() !== month) return;
    const day = d.getDate();
    if (day <= 7) weeks[0].count++;
    else if (day <= 14) weeks[1].count++;
    else if (day <= 21) weeks[2].count++;
    else weeks[3].count++;
  });

  return weeks;
}

/**
 * Determine pace label from live count and total.
 */
export function getPace(liveCount, total) {
  if (total === 0) return "No Data";
  const pct = Math.round((liveCount / total) * 100);
  if (pct >= 75) return "On Track";
  if (pct >= 50) return "Behind";
  return "At Risk";
}

/**
 * Get overview data for ALL clients — used by Cadence Planner.
 * Filters to current month only.
 */
export function getAllClientsOverview(allItems, companies) {
  const monthItems = getCurrentMonthItems(allItems);

  return companies.map((company) => {
    const companyItems = monthItems.filter(
      (item) => item.company_id === company.id
    );
    const stats = getClientStats(companyItems);
    const weeklyData = buildWeeklyData(companyItems);
    const pace = getPace(stats.live, stats.total);

    return {
      id: company.id,
      name: company.name,
      ...stats,
      pace,
      weeklyData,
    };
  });
}

// ─── Engagement Row Builder ─────────────────────────────────────────────────

/**
 * Map a raw item into an engagement row with normalized fields.
 * Used by Client Dashboard, etc.
 */
export function buildEngagementRow(item, idx, companyMap) {
  return {
    id: item.id || `item-${idx}`,
    type: item.type || "post",
    topic: item.category || item.targeted_subreddit || "--",
    title: stripHtml(item.title) || "(untitled)",
    displayTitle: stripHtml(item.title) || (item.type === "comment" ? "Comment" : "Untitled"),
    displayType: item.type === "comment" ? "Comment" : "Post",
    threadUrl: item.posted_link || "",
    engagementText: stripHtml(item.engagement_text) || "",
    status: normalizeStatus(item),
    rawStatus: getRawStatus(item),
    publishedUrl: item.posted_link || "",
    date: item.date_posted ? item.date_posted.split("T")[0] : "--",
    datePosted: item.date_posted || null,
    redditUsername: item.reddit_username || "",
    subreddit: item.targeted_subreddit || "",
    totalViews: item.total_views || 0,
    companyId: item.company_id,
    companyName: companyMap ? companyMap[item.company_id] || "" : "",
  };
}

/**
 * Build a companyId → companyName lookup map.
 */
export function buildCompanyMap(companies) {
  const map = {};
  companies.forEach((c) => {
    map[c.id] = c.name;
  });
  return map;
}

// ─── Cadence Config (Supabase-backed) ───────────────────────────────────────

/**
 * Fetch all cadence configs from the API.
 * GET is public (no auth required) so targets always load even if
 * the Firebase token is missing or expired.
 * Returns array of { company_name, monthly_limit, alert_threshold, ... }
 */
export async function fetchCadenceConfig() {
  try {
    const res = await fetch("/api/cadence-config");
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error("fetchCadenceConfig: HTTP", res.status, body.error || "");
      return [];
    }
    const result = await res.json();
    const data = result.data || [];
    if (data.length === 0) {
      console.warn("fetchCadenceConfig: API returned 0 configs");
    }
    return data;
  } catch (err) {
    console.error("fetchCadenceConfig error:", err);
    return [];
  }
}

/**
 * Upsert a single company's cadence config via the API.
 * Returns the updated row, or throws on failure so callers can show feedback.
 */
export async function updateCadenceConfig(token, companyName, monthlyLimit) {
  const res = await fetch("/api/cadence-config", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company_name: companyName,
      monthly_limit: monthlyLimit,
    }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = body.error || `Failed to save cadence (${res.status})`;
    console.error("updateCadenceConfig error:", msg);
    throw new Error(msg);
  }
  const result = await res.json();
  return result.data || null;
}

/**
 * Build a companyName → monthly_limit lookup map from cadence config array.
 */
export function buildCadenceMap(configs) {
  const map = {};
  (configs || []).forEach((c) => {
    map[c.company_name] = c.monthly_limit;
  });
  return map;
}

// ─── Cadence Target History (localStorage per-month snapshots) ───────────

const TARGET_HISTORY_KEY = "cadence_target_history";

/**
 * Get the full target history map from localStorage.
 * Shape: { "ClientName": { "2026-01": 30, "2026-02": 45, ... }, ... }
 */
export function getTargetHistory() {
  try {
    const raw = localStorage.getItem(TARGET_HISTORY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Save a target snapshot for a specific client and month.
 * monthKey format: "YYYY-MM" (e.g. "2026-03")
 */
export function saveTargetSnapshot(clientName, target, monthKey) {
  if (!clientName || !target || target <= 0) return;
  const key = monthKey || (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  })();
  const history = getTargetHistory();
  if (!history[clientName]) history[clientName] = {};
  history[clientName][key] = target;
  try {
    localStorage.setItem(TARGET_HISTORY_KEY, JSON.stringify(history));
  } catch { /* noop */ }
}

/**
 * Snapshot all current targets for the current month (used on page load).
 * Only writes if the current month doesn't already have a value for that client.
 */
export function seedCurrentMonthTargets(cadenceTargets) {
  if (!cadenceTargets || typeof cadenceTargets !== "object") return;
  const d = new Date();
  const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const history = getTargetHistory();
  let changed = false;
  Object.entries(cadenceTargets).forEach(([name, target]) => {
    if (!target || target <= 0) return;
    if (!history[name]) history[name] = {};
    if (!history[name][monthKey]) {
      history[name][monthKey] = target;
      changed = true;
    }
  });
  if (changed) {
    try {
      localStorage.setItem(TARGET_HISTORY_KEY, JSON.stringify(history));
    } catch { /* noop */ }
  }
}

/**
 * Get the target for a specific client and month.
 * Falls back to the current cadenceTarget if no historical value exists.
 */
export function getTargetForMonth(clientName, year, month, fallbackTarget) {
  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
  const history = getTargetHistory();
  if (history[clientName] && history[clientName][monthKey] != null) {
    return history[clientName][monthKey];
  }
  return fallbackTarget || 0;
}

/**
 * Build monthly cadence history data with per-month targets.
 * Returns last 6 months with { label, month, year, total, live, target }.
 */
export function buildCadenceHistory(items, clientName, currentTarget) {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const m = d.getMonth();
    const y = d.getFullYear();
    const target = getTargetForMonth(clientName, y, m, currentTarget);
    months.push({
      label: d.toLocaleString("en-US", { month: "short", year: "numeric" }),
      month: m,
      year: y,
      total: 0,
      live: 0,
      target,
    });
  }

  items.forEach((item) => {
    if (!item.date_posted) return;
    const d = new Date(item.date_posted);
    const m = d.getMonth();
    const y = d.getFullYear();
    const entry = months.find((e) => e.month === m && e.year === y);
    if (entry) {
      entry.total++;
      if (normalizeStatus(item) === "Live") entry.live++;
    }
  });

  return months;
}

// ─── Month-Scoping Helpers (for engagement rows) ─────────────────────────

/**
 * Filter engagement rows by a specific year/month (1-indexed month).
 * Works with both raw items (date_posted) and engagement rows (date/datePosted).
 * Items with no date are included (they represent pending/approved content).
 */
export function filterByMonth(engagements, year, month) {
  return engagements.filter((e) => {
    const dateStr = e.date_posted || e.datePosted || e.date;
    if (!dateStr || dateStr === "--") return true;
    const d = new Date(dateStr);
    return d.getFullYear() === year && d.getMonth() === month - 1;
  });
}

/**
 * Filter engagement rows to the current calendar month.
 * Items with no date are included (pending/approved).
 */
export function getCurrentMonthEngagements(engagements) {
  const now = new Date();
  return filterByMonth(engagements, now.getFullYear(), now.getMonth() + 1);
}
