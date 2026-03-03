"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import {
  normalizeStatus as sharedNormalizeStatus,
  fetchThreadflowData,
  fetchCadenceConfig,
  updateCadenceConfig,
  buildCadenceMap,
  stripHtml,
  STATUS_COLORS as SHARED_STATUS_COLORS,
  saveTargetSnapshot,
  seedCurrentMonthTargets,
  buildCadenceHistory,
} from "@/lib/threadflow-data";
import {
  ChevronDown,
  Search,
  ExternalLink,
  X,
  FileText,
  MessageSquare,
  Share2,
  Check,
  Upload,
  AlertCircle,
  Loader2,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_COLORS = SHARED_STATUS_COLORS;

const FONT_FAMILY = "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const TABULAR = { fontVariantNumeric: "tabular-nums" };

// ─── Helper functions ─────────────────────────────────────────────────────────

function getCurrentMonth() {
  const d = new Date();
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

// Uses shared normalizeStatus from @/lib/threadflow-data
function normalizeStatus(item) {
  return sharedNormalizeStatus(item);
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Build weekly cadence data for the current month from a set of items.
 * Groups items by which week of the month their date_posted falls in.
 */
function buildWeeklyData(items) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const weeks = [
    { week: "Wk 1", count: 0 },
    { week: "Wk 2", count: 0 },
    { week: "Wk 3", count: 0 },
    { week: "Wk 4", count: 0 },
  ];

  items.forEach((item) => {
    const d = new Date(item.date_posted);
    if (d.getFullYear() !== year || d.getMonth() !== month) return;
    const dayOfMonth = d.getDate();
    if (dayOfMonth <= 7) weeks[0].count++;
    else if (dayOfMonth <= 14) weeks[1].count++;
    else if (dayOfMonth <= 21) weeks[2].count++;
    else weeks[3].count++;
  });

  return weeks;
}

/**
 * Build month-by-month cadence data from items.
 * Returns last 6 months (including current) sorted oldest → newest.
 * Each entry: { label: "Jan 2026", month: 0, year: 2026, total: N, live: N }
 */
function buildMonthlyData(items) {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleString("en-US", { month: "short", year: "numeric" }),
      month: d.getMonth(),
      year: d.getFullYear(),
      total: 0,
      live: 0,
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
      if (sharedNormalizeStatus(item) === "Live") entry.live++;
    }
  });

  return months;
}

// ─── Skeleton Loader ──────────────────────────────────────────────────────────

const pulseKeyframes = `
@keyframes skeletonPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
`;

function SkeletonBlock({ width, height, borderRadius = 6, style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: "rgba(255,255,255,0.04)",
        animation: "skeletonPulse 1.5s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

function SkeletonDashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#ededed",
        fontFamily: FONT_FAMILY,
        padding: "32px 40px",
        boxSizing: "border-box",
      }}
    >
      <style>{pulseKeyframes}</style>

      {/* Selector skeleton */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <SkeletonBlock width={260} height={42} borderRadius={8} />
        <SkeletonBlock width={80} height={30} borderRadius={20} />
        <SkeletonBlock width={80} height={30} borderRadius={20} />
        <SkeletonBlock width={80} height={30} borderRadius={20} />
      </div>

      {/* Stat cards skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 28 }}>
        {[...Array(5)].map((_, i) => (
          <SkeletonBlock key={i} width="100%" height={80} borderRadius={10} />
        ))}
      </div>

      {/* Table skeleton */}
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 28,
        }}
      >
        <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <SkeletonBlock width={160} height={20} />
        </div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 14,
              padding: "10px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <SkeletonBlock width={30} height={16} />
            <SkeletonBlock width={100} height={16} />
            <SkeletonBlock width={180} height={16} />
            <SkeletonBlock width={60} height={16} />
            <SkeletonBlock width={220} height={16} />
            <SkeletonBlock width={60} height={16} />
            <SkeletonBlock width={70} height={16} />
            <SkeletonBlock width={80} height={16} />
          </div>
        ))}
      </div>

      {/* Bottom two columns skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
        <SkeletonBlock width="100%" height={280} borderRadius={10} />
        <SkeletonBlock width="100%" height={280} borderRadius={10} />
      </div>

      {/* Action bar skeleton */}
      <SkeletonBlock width="100%" height={56} borderRadius={10} />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ClientDashboardPage() {
  const router = useRouter();

  // Auth & data loading state
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);

  // UI state
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [recentClients, setRecentClients] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [showShareToast, setShowShareToast] = useState(false);
  const [cadenceTargets, setCadenceTargets] = useState({});
  const [editingCadence, setEditingCadence] = useState(false);
  const [cadenceInput, setCadenceInput] = useState("");
  const [cadenceSaveError, setCadenceSaveError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 15;
  const dropdownRef = useRef(null);
  const tokenRef = useRef(null);

  // Upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadData, setUploadData] = useState(null); // { headers: [], rows: [] }
  const [uploadColumnMap, setUploadColumnMap] = useState({});
  const [uploadType, setUploadType] = useState(null); // null = not yet chosen
  const [uploadImporting, setUploadImporting] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const fileInputRef = useRef(null);

  // ─── Firebase auth + data fetching ───
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (!user) {
        setLoading(false);
        router.push("/auth/signin");
      } else {
        const fetchData = async () => {
          try {
            const token = await user.getIdToken();
            tokenRef.current = token;
            const [{ items, companies }, configs] = await Promise.all([
              fetchThreadflowData(token),
              fetchCadenceConfig(),
            ]);
            setAllItems(items);
            setCompaniesList(companies);
            // API is the SINGLE source of truth for cadence targets.
            const apiMap = buildCadenceMap(configs);
            setCadenceTargets(apiMap);
            try { localStorage.setItem("cadence_targets", JSON.stringify(apiMap)); } catch (e) { /* noop */ }
            if (Object.keys(apiMap).length > 0) {
              seedCurrentMonthTargets(apiMap);
            }
            // Auto-select first company
            if (companies.length > 0) {
              setSelectedClientId(companies[0].id);
              setRecentClients(companies.slice(0, 3).map((c) => c.id));
            }
          } catch (err) {
            console.error("Error fetching dashboard data:", err);
            try {
              const saved = localStorage.getItem("cadence_targets");
              if (saved) {
                const parsed = JSON.parse(saved);
                setCadenceTargets(parsed);
                seedCurrentMonthTargets(parsed);
              }
            } catch (e) { /* noop */ }
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Trigger animation on mount and client switch
  useEffect(() => {
    setAnimateIn(false);
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimateIn(true));
    });
    return () => cancelAnimationFrame(t);
  }, [selectedClientId]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ─── Derived data ───

  const client = useMemo(
    () => companiesList.find((c) => c.id === selectedClientId) || companiesList[0] || null,
    [companiesList, selectedClientId]
  );

  // Items filtered for the selected client
  const clientItems = useMemo(() => {
    if (!selectedClientId) return [];
    return allItems.filter((item) => item.company_id === selectedClientId);
  }, [allItems, selectedClientId]);

  // Map items into engagement rows with normalized status
  const clientEngagements = useMemo(() => {
    return clientItems.map((item, idx) => ({
      id: item.id || `item-${idx}`,
      type: item.type || "post",
      topic: item.category || item.targeted_subreddit || "--",
      title: stripHtml(item.title) || "(untitled)",
      threadUrl: item.posted_link || "",
      engagementText: stripHtml(item.engagement_text) || "",
      status: normalizeStatus(item),
      publishedUrl: item.posted_link || "",
      date: item.date_posted ? item.date_posted.split("T")[0] : "--",
      redditUsername: item.reddit_username || "",
      subreddit: item.targeted_subreddit || "",
      totalViews: item.total_views || 0,
    }));
  }, [clientItems]);

  // Current-month engagements for stat cards & cadence (table still shows all)
  const currentMonthEngagements = useMemo(() => {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth();
    return clientEngagements.filter((e) => {
      if (e.date === "--") {
        // Un-dated items: include only if Pending or Under Approval
        return e.status === "Pending" || e.status === "Under Approval";
      }
      const d = new Date(e.date);
      return d.getFullYear() === curYear && d.getMonth() === curMonth;
    });
  }, [clientEngagements]);

  // Status counts — scoped to current month
  const liveCount = useMemo(() => currentMonthEngagements.filter((e) => e.status === "Live").length, [currentMonthEngagements]);
  const pendingCount = useMemo(() => currentMonthEngagements.filter((e) => e.status === "Pending").length, [currentMonthEngagements]);
  const underApprovalCount = useMemo(() => currentMonthEngagements.filter((e) => e.status === "Under Approval").length, [currentMonthEngagements]);
  const removedCount = useMemo(() => currentMonthEngagements.filter((e) => e.status === "Removed").length, [currentMonthEngagements]);
  const archivedCount = useMemo(() => currentMonthEngagements.filter((e) => e.status === "Archived").length, [currentMonthEngagements]);
  const totalEngagements = clientEngagements.length;

  // Filtered engagements for table
  const filteredEngagements = statusFilter
    ? clientEngagements.filter((e) => e.status === statusFilter)
    : clientEngagements;

  // Filtered companies for dropdown search
  const filteredClients = companiesList.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Compute live count per company for dropdown display
  const liveCountByCompany = useMemo(() => {
    const counts = {};
    allItems.forEach((item) => {
      const ns = normalizeStatus(item);
      if (ns === "Live") {
        counts[item.company_id] = (counts[item.company_id] || 0) + 1;
      }
    });
    return counts;
  }, [allItems]);

  const totalCountByCompany = useMemo(() => {
    const counts = {};
    allItems.forEach((item) => {
      counts[item.company_id] = (counts[item.company_id] || 0) + 1;
    });
    return counts;
  }, [allItems]);

  // Cadence target (from Supabase via company name)
  const selectedClientName = client ? client.name : null;
  const cadenceTarget = selectedClientName && cadenceTargets[selectedClientName] ? cadenceTargets[selectedClientName] : 0;
  const weeklyTarget = Math.ceil(cadenceTarget / 4);
  const progressPct = cadenceTarget > 0 ? (liveCount / cadenceTarget) * 100 : 0;
  const progressColor = progressPct > 60 ? "#34d399" : progressPct >= 30 ? "#fbbf24" : "#f87171";

  // Weekly cadence data
  const weeklyData = useMemo(() => buildWeeklyData(clientItems), [clientItems]);
  const chartMax = Math.max(...weeklyData.map((w) => w.count), 1);

  // Monthly cadence data (last 6 months)
  const monthlyData = useMemo(
    () => buildCadenceHistory(clientItems, selectedClientName, cadenceTarget),
    [clientItems, selectedClientName, cadenceTarget]
  );

  const switchClient = useCallback(
    (id) => {
      setSelectedClientId(id);
      setStatusFilter(null);
      setCurrentPage(1);
      setDropdownOpen(false);
      setSearchQuery("");
      setRecentClients((prev) => {
        const filtered = prev.filter((r) => r !== id);
        return [id, ...filtered].slice(0, 3);
      });
    },
    []
  );

  const handleShare = useCallback(() => {
    if (!client) return;
    const slug = slugify(client.name);
    const url = `${window.location.origin}/threadflow/c/${slug}/dashboard`;
    navigator.clipboard.writeText(url).then(() => {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    });
  }, [client]);

  // Stat cards data
  const statCards = [
    { label: "PENDING", count: pendingCount, status: "Pending", color: STATUS_COLORS.Pending },
    { label: "UNDER APPROVAL", count: underApprovalCount, status: "Under Approval", color: STATUS_COLORS["Under Approval"] },
    { label: "LIVE", count: liveCount, status: "Live", color: STATUS_COLORS.Live },
    { label: "REMOVED", count: removedCount, status: "Removed", color: STATUS_COLORS.Removed },
    { label: "ARCHIVED", count: archivedCount, status: "Archived", color: STATUS_COLORS.Archived },
  ];

  const saveCadenceTarget = useCallback(async (value) => {
    const num = parseInt(value, 10);
    if (!num || num <= 0 || !selectedClientName) return;
    const updated = { ...cadenceTargets, [selectedClientName]: num };
    setCadenceTargets(updated);
    setEditingCadence(false);
    // Persist to localStorage immediately
    try { localStorage.setItem("cadence_targets", JSON.stringify(updated)); } catch (e) { /* noop */ }
    // Snapshot this target for the current month's history
    saveTargetSnapshot(selectedClientName, num);
    // Refresh token before API call
    try {
      if (firebaseUser) {
        tokenRef.current = await firebaseUser.getIdToken(true);
      }
      if (tokenRef.current) {
        await updateCadenceConfig(tokenRef.current, selectedClientName, num);
      }
    } catch (err) {
      console.error("saveCadenceTarget API error:", err);
      const msg = err.message?.includes("not exist")
        ? "DB table missing — run supabase/migrations/cadence_config.sql"
        : "Saved locally, will sync when server is available";
      setCadenceSaveError(msg);
      setTimeout(() => setCadenceSaveError(""), 4000);
    }
  }, [cadenceTargets, selectedClientName, firebaseUser]);

  // ── Generate Report (CSV download) ────────────────────────────────────────
  const generateReport = useCallback(() => {
    if (!client) return;
    const clientName = client.name;
    const now = new Date();
    const monthName = now.toLocaleString("default", { month: "long", year: "numeric" });

    const escapeCSV = (v) => {
      const s = String(v ?? "").replace(/\r/g, "");
      if (s.includes(",") || s.includes('"') || s.includes("\n")) {
        return `"${s.replace(/"/g, '""')}"`;
      }
      return s;
    };

    let csv = "";
    csv += `ThreadFlow Report: ${escapeCSV(clientName)}\n`;
    csv += `Generated: ${now.toISOString().split("T")[0]}\n`;
    csv += `Month: ${monthName}\n`;
    csv += `\n`;
    csv += `CADENCE SUMMARY\n`;
    csv += `Target,${cadenceTarget}\n`;
    csv += `Live (this month),${liveCount}\n`;
    csv += `Completion,${cadenceTarget > 0 ? Math.round((liveCount / cadenceTarget) * 100) : 0}%\n`;
    csv += `Remaining,${Math.max(0, cadenceTarget - liveCount)}\n`;
    csv += `\n`;
    csv += `ALL ENGAGEMENTS\n`;
    csv += `#,Type,Title,Subreddit,Status,Date,Link\n`;

    clientEngagements.forEach((e, i) => {
      csv += [
        i + 1,
        capitalize(e.type),
        escapeCSV(e.title),
        escapeCSV(e.subreddit || "\u2014"),
        e.status,
        e.date,
        e.publishedUrl || "\u2014",
      ].join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(clientName)}-report-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [client, cadenceTarget, liveCount, clientEngagements]);

  // ── CSV/XLSX Upload Handlers ──────────────────────────────────────────────

  // Known spreadsheet column names → our field keys
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
  };

  const TARGET_FIELDS = [
    { key: "category", label: "Category" },
    { key: "title", label: "Title" },
    { key: "url", label: "URL (Post/Thread URL)" },
    { key: "engagementText", label: "Text of Engagement" },
    { key: "currentStatus", label: "Approval (Client Approval Status)" },
    { key: "status", label: "Status (Published/Posted Status)" },
    { key: "datePosted", label: "Date Published" },
    { key: "postedLink", label: "Published Link (Comment URL)" },
    { key: "redditUsername", label: "Reddit Username" },
    { key: "targetedSubreddit", label: "Subreddit" },
    { key: "totalViews", label: "Total Views" },
    { key: "clientFeedback", label: "Customer Comments" },
  ];

  const parseCSV = useCallback((text) => {
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) return null;

    // Parse a CSV line handling quoted fields
    const parseLine = (line) => {
      const result = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += ch;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseLine(lines[0]);
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = parseLine(lines[i]);
      if (cols.length > 0 && cols.some((c) => c)) {
        rows.push(cols);
      }
    }

    return { headers, rows };
  }, []);

  const autoMapColumns = useCallback((headers) => {
    const map = {};
    headers.forEach((h, idx) => {
      const normalized = h.toLowerCase().trim();
      if (COLUMN_ALIASES[normalized]) {
        map[idx] = COLUMN_ALIASES[normalized];
      }
    });
    return map;
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploadSuccess("");
    setUploadType(null); // reset type so user must choose each time

    if (file.name.endsWith(".csv") || file.name.endsWith(".tsv") || file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const parsed = parseCSV(evt.target.result);
        if (!parsed || parsed.rows.length === 0) {
          setUploadError("Could not parse file or file is empty");
          return;
        }
        setUploadData(parsed);
        setUploadColumnMap(autoMapColumns(parsed.headers));
        setUploadModalOpen(true);
      };
      reader.readAsText(file);
    } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      // Use ExcelJS for xlsx files
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const ExcelJS = (await import("exceljs")).default;
          const wb = new ExcelJS.Workbook();
          await wb.xlsx.load(evt.target.result);
          const ws = wb.worksheets[0];
          if (!ws || ws.rowCount < 2) {
            setUploadError("Spreadsheet is empty or has no data rows");
            return;
          }
          const headers = [];
          const rows = [];
          ws.eachRow((row, rowNum) => {
            const vals = [];
            row.eachCell({ includeEmpty: true }, (cell) => {
              vals.push(cell.text || "");
            });
            if (rowNum === 1) {
              headers.push(...vals);
            } else {
              if (vals.some((v) => v)) rows.push(vals);
            }
          });
          if (rows.length === 0) {
            setUploadError("No data rows found in spreadsheet");
            return;
          }
          setUploadData({ headers, rows });
          setUploadColumnMap(autoMapColumns(headers));
          setUploadModalOpen(true);
        } catch (err) {
          console.error("Excel parse error:", err);
          setUploadError("Failed to parse Excel file");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setUploadError("Unsupported file format. Use .csv or .xlsx");
    }

    // Reset input so same file can be re-selected
    e.target.value = "";
  }, [parseCSV, autoMapColumns]);

  const handleImport = useCallback(async () => {
    if (!uploadData || !client) return;
    setUploadImporting(true);
    setUploadError("");

    try {
      // Build mapped rows
      const mappedRows = uploadData.rows.map((row) => {
        const obj = {};
        Object.entries(uploadColumnMap).forEach(([colIdx, fieldKey]) => {
          if (fieldKey && fieldKey !== "_skip") {
            obj[fieldKey] = row[Number(colIdx)] || "";
          }
        });
        return obj;
      });

      // Filter out rows that have no title and no engagement text
      const validRows = mappedRows.filter(
        (r) => (r.title && r.title.trim()) || (r.engagementText && r.engagementText.trim())
      );

      if (validRows.length === 0) {
        setUploadError("No valid rows to import (need at least a Title or Engagement Text)");
        setUploadImporting(false);
        return;
      }

      // Refresh token
      if (firebaseUser) {
        tokenRef.current = await firebaseUser.getIdToken(true);
      }

      const res = await fetch("/api/engagement/import", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenRef.current}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId: client.id,
          type: uploadType,
          rows: validRows,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || `Import failed (${res.status})`);
      }

      setUploadSuccess(`Successfully imported ${result.imported} ${uploadType === "post" ? "original posts (OP)" : "comments"} for ${client.name}`);

      // Refresh data
      if (tokenRef.current) {
        const { items, companies } = await fetchThreadflowData(tokenRef.current);
        setAllItems(items);
        setCompaniesList(companies);
      }

      // Close modal after brief delay
      setTimeout(() => {
        setUploadModalOpen(false);
        setUploadData(null);
        setUploadColumnMap({});
        setUploadSuccess("");
      }, 2000);
    } catch (err) {
      console.error("Import error:", err);
      setUploadError(err.message);
    } finally {
      setUploadImporting(false);
    }
  }, [uploadData, uploadColumnMap, uploadType, client, firebaseUser]);

  // Status breakdown data
  const statusBreakdown = [
    { status: "Live", count: liveCount, color: STATUS_COLORS.Live },
    { status: "Pending", count: pendingCount, color: STATUS_COLORS.Pending },
    { status: "Under Approval", count: underApprovalCount, color: STATUS_COLORS["Under Approval"] },
    { status: "Removed", count: removedCount, color: STATUS_COLORS.Removed },
    { status: "Archived", count: archivedCount, color: STATUS_COLORS.Archived },
  ];
  const maxStatusCount = Math.max(...statusBreakdown.map((s) => s.count), 1);

  // fadeUp helper
  const fadeUp = (i) => ({
    opacity: animateIn ? 1 : 0,
    transform: animateIn ? "translateY(0)" : "translateY(6px)",
    transition: `opacity 0.3s ease ${i * 0.04}s, transform 0.3s ease ${i * 0.04}s`,
  });

  // ─── Loading / unauthenticated states ───
  if (loading) {
    return <SkeletonDashboard />;
  }

  if (!firebaseUser) {
    return null; // Will redirect to signin
  }

  if (companiesList.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0a0a0a",
          color: "#ededed",
          fontFamily: FONT_FAMILY,
          padding: "32px 40px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>No companies found</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            There are no companies associated with your account.
          </p>
        </div>
      </div>
    );
  }

  if (!client) {
    return <SkeletonDashboard />;
  }

  // A default dot color derived from company name
  const dotColor = "#ededed";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#ededed",
        fontFamily: FONT_FAMILY,
        padding: "32px 40px",
        boxSizing: "border-box",
      }}
    >
      {/* ─── Section 1: Client Selector ─── */}
      <div style={{ ...fadeUp(0), display: "flex", alignItems: "center", gap: 16, marginBottom: 28, position: "relative", zIndex: 20 }}>
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              backgroundColor: dropdownOpen ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.02)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: dropdownOpen ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
              borderRadius: 8,
              color: "#ededed",
              fontFamily: FONT_FAMILY,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.15s ease",
              minWidth: 260,
            }}
            onMouseEnter={(e) => {
              if (!dropdownOpen) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
              }
            }}
            onMouseLeave={(e) => {
              if (!dropdownOpen) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
              }
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: dotColor,
                flexShrink: 0,
              }}
            />
            <span style={{ fontWeight: 500, flex: 1, textAlign: "left" }}>{client.name}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, ...TABULAR }}>
              {liveCount} live &middot; {totalEngagements} total
            </span>
            <ChevronDown
              size={14}
              style={{
                color: "rgba(255,255,255,0.4)",
                transition: "transform 0.15s ease",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                width: 320,
                backgroundColor: "#141414",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                zIndex: 100,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "8px 8px 4px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 10px",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderRadius: 6,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Search size={13} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search clients..."
                    autoFocus
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#ededed",
                      fontFamily: FONT_FAMILY,
                      fontSize: 13,
                    }}
                  />
                </div>
              </div>
              <div style={{ maxHeight: 320, overflowY: "auto", padding: "4px 4px 8px" }}>
                {filteredClients.map((c) => {
                  const cLive = liveCountByCompany[c.id] || 0;
                  const cTotal = totalCountByCompany[c.id] || 0;
                  const isSelected = c.id === selectedClientId;
                  return (
                    <button
                      key={c.id}
                      onClick={() => switchClient(c.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        padding: "8px 12px",
                        backgroundColor: isSelected ? "rgba(255,255,255,0.06)" : "transparent",
                        border: "none",
                        borderRadius: 6,
                        color: "#ededed",
                        fontFamily: FONT_FAMILY,
                        fontSize: 13,
                        cursor: "pointer",
                        transition: "background-color 0.15s ease",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          backgroundColor: "#ededed",
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ flex: 1, fontWeight: isSelected ? 500 : 400 }}>{c.name}</span>
                      <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, ...TABULAR }}>
                        {cLive} live &middot; {cTotal} total
                      </span>
                    </button>
                  );
                })}
                {filteredClients.length === 0 && (
                  <div style={{ padding: "16px 12px", color: "rgba(255,255,255,0.3)", fontSize: 12, textAlign: "center" }}>
                    No clients found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Recent pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.03em" }}>Recent:</span>
          {recentClients.map((rId) => {
            const rc = companiesList.find((c) => c.id === rId);
            if (!rc) return null;
            const isActive = rId === selectedClientId;
            return (
              <button
                key={rId}
                onClick={() => switchClient(rId)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 12px",
                  backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 20,
                  color: isActive ? "#ededed" : "rgba(255,255,255,0.5)",
                  fontFamily: FONT_FAMILY,
                  fontSize: 12,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)";
                  e.currentTarget.style.backgroundColor = isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)";
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#ededed",
                  }}
                />
                {rc.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Section 2: Stat Cards Row ─── */}
      <div style={{ ...fadeUp(1), display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 28 }}>
        {statCards.map((card, idx) => {
          const isActive = statusFilter === card.status;
          const isHovered = hoveredCard === card.status;
          return (
            <button
              key={card.status}
              onClick={() => { setStatusFilter(isActive ? null : card.status); setCurrentPage(1); }}
              onMouseEnter={() => setHoveredCard(card.status)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 8,
                padding: "16px 18px",
                backgroundColor: isActive
                  ? `${card.color}10`
                  : isHovered
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${isActive ? `${card.color}30` : isHovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 10,
                borderLeft: isActive ? `3px solid ${card.color}` : `1px solid ${isActive ? `${card.color}30` : isHovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
                cursor: "pointer",
                transition: "all 0.15s ease",
                fontFamily: FONT_FAMILY,
                color: "#ededed",
                textAlign: "left",
                outline: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: card.color,
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: isActive ? card.color : "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                  }}
                >
                  {card.label}
                </span>
              </div>
              <span style={{ fontSize: 28, fontWeight: 600, lineHeight: 1, ...TABULAR }}>
                {card.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── Section 3: Monthly Cadence History (chart + table) ─── */}
      <div
        style={{
          ...fadeUp(2),
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Monthly Cadence History</span>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                backgroundColor: "rgba(255,255,255,0.04)",
                padding: "2px 8px",
                borderRadius: 10,
              }}
            >
              Last 6 months
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: "#34d399" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Live</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.12)" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Target</span>
            </div>
          </div>
        </div>

        {/* ── Bar Chart ── */}
        {(() => {
          const chartMax = Math.max(...monthlyData.map((m) => m.target || 0), ...monthlyData.map((m) => m.live), ...monthlyData.map((m) => m.total), 1);
          return (
            <div style={{ padding: "20px 20px 8px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ position: "relative", height: 160 }}>
                {/* Bars */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: "100%", paddingBottom: 4 }}>
                  {monthlyData.map((m, idx) => {
                    const isCurrentMo = m.month === new Date().getMonth() && m.year === new Date().getFullYear();
                    const mTarget = m.target || 0;
                    const liveH = chartMax > 0 ? (m.live / chartMax) * 100 : 0;
                    const targetH = chartMax > 0 ? (mTarget / chartMax) * 100 : 0;
                    const livePct = mTarget > 0 ? Math.round((m.live / mTarget) * 100) : 0;
                    const liveColor = livePct >= 80 ? "#34d399" : livePct >= 40 ? "#fbbf24" : "#f87171";

                    return (
                      <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 130, width: "100%" }}>
                          {/* Target bar (per-month) */}
                          <div
                            style={{
                              flex: 1,
                              height: `${targetH}%`,
                              backgroundColor: "rgba(255,255,255,0.04)",
                              borderRadius: "3px 3px 0 0",
                              minHeight: mTarget > 0 ? 4 : 0,
                              position: "relative",
                            }}
                          >
                            {mTarget > 0 && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: -16,
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  fontSize: 9,
                                  color: "rgba(255,255,255,0.25)",
                                  ...TABULAR,
                                }}
                              >
                                {mTarget}
                              </span>
                            )}
                          </div>
                          {/* Live bar */}
                          <div
                            style={{
                              flex: 1,
                              height: `${liveH}%`,
                              backgroundColor: liveColor,
                              borderRadius: "3px 3px 0 0",
                              minHeight: m.live > 0 ? 4 : 0,
                              opacity: isCurrentMo ? 1 : 0.7,
                              transition: "height 0.4s ease",
                              position: "relative",
                            }}
                          >
                            {m.live > 0 && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: -16,
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  fontSize: 10,
                                  color: liveColor,
                                  fontWeight: 600,
                                  ...TABULAR,
                                }}
                              >
                                {m.live}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* Month label */}
                        <span style={{ fontSize: 10, color: isCurrentMo ? "#ededed" : "rgba(255,255,255,0.35)", fontWeight: isCurrentMo ? 500 : 400, ...TABULAR }}>
                          {m.label.split(" ")[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── Data Table ── */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              {["Month", "Target", "Live", "Total", "Completion", ""].map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: "10px 14px",
                    textAlign: i === 4 ? "left" : i === 5 ? "right" : "left",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.35)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.02em",
                    ...(i === 4 ? { width: "35%" } : {}),
                    ...(i === 5 ? { width: 60 } : {}),
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((m, idx) => {
              const target = m.target || 0;
              const pct = target > 0 ? Math.round((m.live / target) * 100) : 0;
              const isCurrentMonth =
                m.month === new Date().getMonth() && m.year === new Date().getFullYear();
              const barColor =
                pct >= 80 ? "#34d399" : pct >= 40 ? "#fbbf24" : "#f87171";

              return (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: isCurrentMonth
                      ? "rgba(52,211,153,0.04)"
                      : "transparent",
                  }}
                >
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      color: isCurrentMonth ? "#ededed" : "rgba(255,255,255,0.6)",
                      fontWeight: isCurrentMonth ? 500 : 400,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m.label}
                    {isCurrentMonth && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 10,
                          color: "#34d399",
                          fontWeight: 500,
                        }}
                      >
                        CURRENT
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.4)",
                      ...TABULAR,
                    }}
                  >
                    {target}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      color: barColor,
                      fontWeight: 600,
                      ...TABULAR,
                    }}
                  >
                    {m.live}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.35)",
                      ...TABULAR,
                    }}
                  >
                    {m.total}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: 4,
                          backgroundColor: "rgba(255,255,255,0.06)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.min(pct, 100)}%`,
                            height: "100%",
                            backgroundColor: barColor,
                            borderRadius: 2,
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      textAlign: "right",
                      fontSize: 12,
                      fontWeight: 600,
                      color: barColor,
                      ...TABULAR,
                    }}
                  >
                    {pct}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ─── Section 4: Monthly Cadence + Status Breakdown ─── */}
      <div style={{ ...fadeUp(3), display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
        {/* Left: Monthly Cadence Progress */}
        <div
          style={{
            padding: "22px 24px",
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Monthly Cadence</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", backgroundColor: "rgba(255,255,255,0.04)", padding: "2px 8px", borderRadius: 10 }}>{getCurrentMonth()}</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
              <span style={{ fontSize: 24, fontWeight: 600, color: progressColor, ...TABULAR }}>
                {liveCount}
              </span>
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", ...TABULAR }}>/</span>
              {editingCadence ? (
                <input
                  autoFocus
                  type="number"
                  value={cadenceInput}
                  onChange={(e) => setCadenceInput(e.target.value)}
                  onBlur={() => saveCadenceTarget(cadenceInput)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveCadenceTarget(cadenceInput);
                    if (e.key === "Escape") setEditingCadence(false);
                  }}
                  style={{
                    width: 52,
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#ededed",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 6,
                    padding: "2px 6px",
                    outline: "none",
                    fontFamily: FONT_FAMILY,
                    ...TABULAR,
                  }}
                />
              ) : (
                <span
                  onClick={() => { setCadenceInput(String(cadenceTarget)); setEditingCadence(true); }}
                  title="Click to set monthly target"
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    borderBottom: "1px dashed rgba(255,255,255,0.2)",
                    ...TABULAR,
                  }}
                >
                  {cadenceTarget > 0 ? cadenceTarget : "Set"}
                </span>
              )}
            </div>
          </div>
          {cadenceTarget > 0 && (
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: "-12px 0 16px" }}>
              {liveCount} live of {cadenceTarget} target engagements
            </p>
          )}

          {/* Quick-set pills */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {[8, 15, 30, 45, 60].map((val) => (
              <button
                key={val}
                onClick={() => saveCadenceTarget(val)}
                style={{
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 500,
                  fontFamily: FONT_FAMILY,
                  color: cadenceTarget === val ? "#0a0a0a" : "rgba(255,255,255,0.4)",
                  background: cadenceTarget === val ? "#34d399" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${cadenceTarget === val ? "#34d399" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  ...TABULAR,
                }}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div
            style={{
              width: "100%",
              height: 4,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 2,
              marginBottom: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.min(progressPct, 100)}%`,
                height: "100%",
                backgroundColor: progressColor,
                borderRadius: 2,
                transition: "width 0.4s ease, background-color 0.3s ease",
              }}
            />
          </div>

          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 24, ...TABULAR }}>
            {liveCount} live of {cadenceTarget} target engagements
          </div>

          {/* Weekly Chart */}
          {(() => {
            const chartMaxWithTarget = Math.max(chartMax, weeklyTarget, 1);
            return (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 120 }}>
                {weeklyData.map((w, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 90, width: "100%" }}>
                      {/* Target bar (gray) */}
                      <div
                        style={{
                          flex: 1,
                          height: `${(weeklyTarget / chartMaxWithTarget) * 100}%`,
                          backgroundColor: "rgba(255,255,255,0.06)",
                          borderRadius: "3px 3px 0 0",
                          minHeight: weeklyTarget > 0 ? 4 : 0,
                        }}
                      />
                      {/* Actual bar (green) */}
                      <div
                        style={{
                          flex: 1,
                          height: `${(w.count / chartMaxWithTarget) * 100}%`,
                          backgroundColor: "#34d399",
                          borderRadius: "3px 3px 0 0",
                          minHeight: w.count > 0 ? 4 : 0,
                          transition: "height 0.4s ease",
                          position: "relative",
                        }}
                      >
                        {w.count > 0 && (
                          <span
                            style={{
                              position: "absolute",
                              top: -18,
                              left: "50%",
                              transform: "translateX(-50%)",
                              fontSize: 10,
                              color: "#34d399",
                              fontWeight: 600,
                              ...TABULAR,
                            }}
                          >
                            {w.count}
                          </span>
                        )}
                      </div>
                    </div>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", ...TABULAR }}>{w.week}</span>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: "#34d399" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Actual</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.12)" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Target ({weeklyTarget}/wk)</span>
            </div>
          </div>
        </div>

        {/* Right: Status Breakdown + Total Summary */}
        <div
          style={{
            padding: "22px 24px",
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500, marginBottom: 20 }}>Status Breakdown</span>

          {/* Horizontal bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {statusBreakdown.map((s) => (
              <div key={s.status} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    width: 90,
                    flexShrink: 0,
                  }}
                >
                  {s.status}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 6,
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: maxStatusCount > 0 ? `${(s.count / maxStatusCount) * 100}%` : "0%",
                      height: "100%",
                      backgroundColor: s.color,
                      borderRadius: 3,
                      transition: "width 0.4s ease",
                      minWidth: s.count > 0 ? 4 : 0,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: s.color,
                    width: 24,
                    textAlign: "right",
                    ...TABULAR,
                  }}
                >
                  {s.count}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ─── Section 5: Engagement Table ─── */}
      <div
        style={{
          ...fadeUp(4),
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 28,
        }}
      >
        {/* Table Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Engagements</span>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                backgroundColor: "rgba(255,255,255,0.04)",
                padding: "2px 8px",
                borderRadius: 10,
                ...TABULAR,
              }}
            >
              {filteredEngagements.length}
            </span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>All months</span>
            {statusFilter && (
              <button
                onClick={() => { setStatusFilter(null); setCurrentPage(1); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 8px",
                  fontSize: 11,
                  color: STATUS_COLORS[statusFilter],
                  backgroundColor: `${STATUS_COLORS[statusFilter]}15`,
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontFamily: FONT_FAMILY,
                }}
              >
                {statusFilter}
                <X size={10} />
              </button>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                backgroundColor: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.2)",
                borderRadius: 7,
                color: "#fbbf24",
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(251,191,36,0.35)";
                e.currentTarget.style.backgroundColor = "rgba(251,191,36,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(251,191,36,0.2)";
                e.currentTarget.style.backgroundColor = "rgba(251,191,36,0.08)";
              }}
            >
              <Upload size={12} />
              Import Spreadsheet
            </button>
            <button
              onClick={handleShare}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 7,
                color: "rgba(255,255,255,0.6)",
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "#ededed";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
              }}
            >
              <Share2 size={12} />
              Share
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
            }}
          >
            <thead>
              <tr>
                {["#", "Type", "Title", "Subreddit", "Engagement Text", "Status", "Link", "Date"].map(
                  (h, i) => (
                    <th
                      key={i}
                      style={{
                        padding: "10px 14px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.35)",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.02em",
                        ...(i === 0 ? { width: 40, textAlign: "center" } : {}),
                        ...(i === 1 ? { minWidth: 80 } : {}),
                        ...(i === 2 ? { minWidth: 180 } : {}),
                        ...(i === 3 ? { minWidth: 120 } : {}),
                        ...(i === 4 ? { minWidth: 220, maxWidth: 300 } : {}),
                        ...(i === 6 ? { minWidth: 80 } : {}),
                        ...(i === 7 ? { minWidth: 90 } : {}),
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {(() => {
                const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
                const paginatedEngagements = filteredEngagements.slice(startIndex, startIndex + ROWS_PER_PAGE);
                return paginatedEngagements.map((eng, idx) => {
                const isRowHovered = hoveredRow === eng.id;
                return (
                  <tr
                    key={eng.id}
                    onMouseEnter={() => setHoveredRow(eng.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      backgroundColor: isRowHovered ? "rgba(255,255,255,0.02)" : "transparent",
                      transition: "background-color 0.15s ease",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px 14px",
                        textAlign: "center",
                        color: "rgba(255,255,255,0.25)",
                        fontSize: 12,
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        ...TABULAR,
                      }}
                    >
                      {startIndex + idx + 1}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        color: "rgba(255,255,255,0.6)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "2px 8px",
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 500,
                          backgroundColor: eng.type === "post" ? "rgba(96,165,250,0.12)" : "rgba(52,211,153,0.12)",
                          color: eng.type === "post" ? "#60a5fa" : "#34d399",
                          textTransform: "capitalize",
                        }}
                      >
                        {eng.type}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        color: "#ededed",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 220,
                        fontWeight: 450,
                      }}
                      title={eng.title}
                    >
                      {eng.title}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        color: "rgba(255,255,255,0.5)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 140,
                        fontSize: 12,
                      }}
                    >
                      {eng.subreddit || eng.topic}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        color: "rgba(255,255,255,0.5)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 300,
                        fontSize: 12,
                        lineHeight: 1.4,
                      }}
                      title={eng.engagementText}
                    >
                      {eng.engagementText || <span style={{ color: "rgba(255,255,255,0.15)" }}>&mdash;</span>}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 500,
                          backgroundColor: `${STATUS_COLORS[eng.status] || "#71717a"}15`,
                          color: STATUS_COLORS[eng.status] || "#71717a",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            backgroundColor: STATUS_COLORS[eng.status] || "#71717a",
                          }}
                        />
                        {eng.status}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      {eng.publishedUrl ? (
                        <a
                          href={eng.publishedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#60a5fa",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 12,
                            transition: "opacity 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                          Link
                          <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>&mdash;</span>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                        whiteSpace: "nowrap",
                        ...TABULAR,
                      }}
                    >
                      {eng.date}
                    </td>
                  </tr>
                );
              });
              })()}
              {filteredEngagements.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      padding: "40px 14px",
                      textAlign: "center",
                      color: "rgba(255,255,255,0.25)",
                      fontSize: 13,
                    }}
                  >
                    {statusFilter ? `No ${statusFilter.toLowerCase()} engagements` : "No engagements yet"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {(() => {
          const totalPages = Math.ceil(filteredEngagements.length / ROWS_PER_PAGE);
          const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
          if (totalPages <= 1) return null;
          return (
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
              <span style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>
                Showing {startIndex + 1}&ndash;{Math.min(startIndex + ROWS_PER_PAGE, filteredEngagements.length)} of {filteredEngagements.length}
              </span>
              <div style={{display:"flex",gap:4,alignItems:"center"}}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{padding:"6px 12px",background: currentPage === 1 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:6,color: currentPage === 1 ? "rgba(255,255,255,0.2)" : "#ededed",fontSize:13,cursor: currentPage === 1 ? "not-allowed" : "pointer",fontFamily:"inherit"}}
                >
                  &larr; Prev
                </button>
                {Array.from({length: Math.min(totalPages, 7)}, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (currentPage <= 4) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = currentPage - 3 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      style={{padding:"6px 10px",background: currentPage === pageNum ? "rgba(255,255,255,0.12)" : "transparent",border: currentPage === pageNum ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",borderRadius:6,color: currentPage === pageNum ? "#fff" : "rgba(255,255,255,0.4)",fontSize:13,cursor:"pointer",fontFamily:"inherit",fontVariantNumeric:"tabular-nums",minWidth:32,textAlign:"center"}}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{padding:"6px 12px",background: currentPage === totalPages ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:6,color: currentPage === totalPages ? "rgba(255,255,255,0.2)" : "#ededed",fontSize:13,cursor: currentPage === totalPages ? "not-allowed" : "pointer",fontFamily:"inherit"}}
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ─── Section 6: Month-End Actions Bar ─── */}
      <div
        style={{
          ...fadeUp(5),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 22px",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Month-End Actions</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            {client.name} &middot; {getCurrentMonth()}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Generate Report */}
          <button
            onClick={generateReport}
            onMouseEnter={() => setHoveredAction("report")}
            onMouseLeave={() => setHoveredAction(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 16px",
              backgroundColor: hoveredAction === "report" ? "rgba(96,165,250,0.18)" : "rgba(96,165,250,0.10)",
              border: "1px solid rgba(96,165,250,0.2)",
              borderRadius: 7,
              color: "#60a5fa",
              fontSize: 12,
              fontWeight: 500,
              fontFamily: FONT_FAMILY,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <FileText size={13} />
            Generate Report
          </button>
          {/* Import Spreadsheet */}
          <button
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={() => setHoveredAction("upload")}
            onMouseLeave={() => setHoveredAction(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 16px",
              backgroundColor: hoveredAction === "upload" ? "rgba(251,191,36,0.18)" : "rgba(251,191,36,0.10)",
              border: "1px solid rgba(251,191,36,0.2)",
              borderRadius: 7,
              color: "#fbbf24",
              fontSize: 12,
              fontWeight: 500,
              fontFamily: FONT_FAMILY,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <Upload size={13} />
            Import Spreadsheet
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          {/* Send Slack Alert */}
          <button
            title="Coming soon"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 16px",
              backgroundColor: "rgba(52,211,153,0.06)",
              border: "1px solid rgba(52,211,153,0.12)",
              borderRadius: 7,
              color: "rgba(52,211,153,0.4)",
              fontSize: 12,
              fontWeight: 500,
              fontFamily: FONT_FAMILY,
              cursor: "not-allowed",
              opacity: 0.5,
            }}
          >
            <MessageSquare size={13} />
            Send Slack Alert
          </button>
        </div>
      </div>

      {/* ─── Cadence Save Error Toast ─── */}
      {cadenceSaveError && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            background: "rgba(248,113,113,0.15)",
            border: "1px solid rgba(248,113,113,0.3)",
            borderRadius: 8,
            color: "#f87171",
            fontSize: 13,
            fontWeight: 500,
            zIndex: 9999,
            fontFamily: FONT_FAMILY,
          }}
        >
          {cadenceSaveError}
        </div>
      )}

      {/* ─── Share Toast ─── */}
      {showShareToast && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            backgroundColor: "#161616",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            zIndex: 9999,
            animation: "toastSlideIn 0.2s ease",
          }}
        >
          <style>{`
            @keyframes toastSlideIn {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <Check size={13} style={{ color: "#34d399", flexShrink: 0 }} />
          <span
            style={{
              fontSize: 12,
              color: "#ededed",
              fontFamily: FONT_FAMILY,
              fontWeight: 450,
            }}
          >
            Client dashboard link copied!
          </span>
        </div>
      )}

      {/* ─── Upload Modal ─── */}
      {uploadModalOpen && uploadData && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !uploadImporting) {
              setUploadModalOpen(false);
              setUploadData(null);
              setUploadError("");
              setUploadSuccess("");
            }
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 840,
              maxHeight: "90vh",
              backgroundColor: "#141414",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Upload size={16} style={{ color: "#fbbf24" }} />
                <span style={{ fontSize: 15, fontWeight: 600 }}>
                  Import Engagements
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  {client.name} &middot; {uploadData.rows.length} rows
                </span>
              </div>
              <button
                onClick={() => {
                  if (!uploadImporting) {
                    setUploadModalOpen(false);
                    setUploadData(null);
                    setUploadError("");
                    setUploadSuccess("");
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.4)",
                  cursor: uploadImporting ? "not-allowed" : "pointer",
                  padding: 4,
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "20px 24px", overflow: "auto", flex: 1 }}>
              {/* ── Step 1: Type selector (required) ── */}
              <div
                style={{
                  marginBottom: 20,
                  padding: "16px 18px",
                  borderRadius: 10,
                  border: uploadType
                    ? "1px solid rgba(52,211,153,0.2)"
                    : "1px solid rgba(251,191,36,0.35)",
                  backgroundColor: uploadType
                    ? "rgba(52,211,153,0.04)"
                    : "rgba(251,191,36,0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span
                    style={{
                      width: 20, height: 20, borderRadius: "50%",
                      backgroundColor: uploadType ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)",
                      border: `1px solid ${uploadType ? "#34d399" : "#fbbf24"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700,
                      color: uploadType ? "#34d399" : "#fbbf24",
                      flexShrink: 0,
                    }}
                  >
                    {uploadType ? "✓" : "1"}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: uploadType ? "#34d399" : "#fbbf24" }}>
                    What type of content are you importing?
                  </span>
                  {!uploadType && (
                    <span style={{ fontSize: 11, color: "rgba(251,191,36,0.7)", marginLeft: 4 }}>
                      — required before you can import
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { value: "comment", label: "Comments", desc: "Replies posted on Reddit threads" },
                    { value: "post", label: "Original Posts (OP)", desc: "Threads created by your accounts" },
                  ].map(({ value, label, desc }) => (
                    <button
                      key={value}
                      onClick={() => setUploadType(value)}
                      style={{
                        flex: 1,
                        padding: "12px 16px",
                        fontSize: 13,
                        fontWeight: uploadType === value ? 600 : 400,
                        fontFamily: FONT_FAMILY,
                        borderRadius: 8,
                        border: `1.5px solid ${uploadType === value ? "#34d399" : "rgba(255,255,255,0.1)"}`,
                        backgroundColor: uploadType === value ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.03)",
                        color: uploadType === value ? "#34d399" : "rgba(255,255,255,0.55)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div>{label}</div>
                      <div style={{ fontSize: 11, opacity: 0.6, marginTop: 3, fontWeight: 400 }}>{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Step 2: Column Mapping (only shown once type is chosen) ── */}
              <div style={{ marginBottom: 20, opacity: uploadType ? 1 : 0.35, pointerEvents: uploadType ? "auto" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span
                    style={{
                      width: 20, height: 20, borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)",
                      flexShrink: 0,
                    }}
                  >2</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Column Mapping</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr", gap: "8px 0", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Spreadsheet Column
                  </span>
                  <span />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Maps To
                  </span>
                  {uploadData.headers.map((header, idx) => (
                    <div key={idx} style={{ display: "contents" }}>
                      <div style={{ fontSize: 13, color: "#ededed", padding: "6px 10px", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 5, border: "1px solid rgba(255,255,255,0.06)" }}>
                        {header || `(Column ${idx + 1})`}
                      </div>
                      <span style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: 12 }}>&rarr;</span>
                      <select
                        value={uploadColumnMap[idx] || "_skip"}
                        onChange={(e) => setUploadColumnMap((prev) => ({ ...prev, [idx]: e.target.value }))}
                        style={{
                          fontSize: 12,
                          padding: "6px 10px",
                          backgroundColor: "#1a1a1a",
                          border: `1px solid ${uploadColumnMap[idx] && uploadColumnMap[idx] !== "_skip" ? "rgba(251,191,36,0.25)" : "rgba(255,255,255,0.08)"}`,
                          borderRadius: 5,
                          color: uploadColumnMap[idx] && uploadColumnMap[idx] !== "_skip" ? "#fbbf24" : "rgba(255,255,255,0.4)",
                          fontFamily: FONT_FAMILY,
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        <option value="_skip">-- Skip --</option>
                        {TARGET_FIELDS.map((f) => (
                          <option key={f.key} value={f.key}>{f.label}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Preview */}
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 10 }}>
                  Preview (first 5 rows)
                </span>
                <div style={{ overflow: "auto", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                    <thead>
                      <tr>
                        {uploadData.headers.map((h, i) => (
                          <th
                            key={i}
                            style={{
                              padding: "8px 10px",
                              textAlign: "left",
                              borderBottom: "1px solid rgba(255,255,255,0.08)",
                              color: uploadColumnMap[i] && uploadColumnMap[i] !== "_skip" ? "#fbbf24" : "rgba(255,255,255,0.35)",
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              backgroundColor: "rgba(255,255,255,0.02)",
                            }}
                          >
                            {h || `Col ${i + 1}`}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {uploadData.rows.slice(0, 5).map((row, ri) => (
                        <tr key={ri}>
                          {uploadData.headers.map((_, ci) => (
                            <td
                              key={ci}
                              style={{
                                padding: "6px 10px",
                                borderBottom: "1px solid rgba(255,255,255,0.04)",
                                color: "rgba(255,255,255,0.6)",
                                maxWidth: 200,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {row[ci] || ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {uploadData.rows.length > 5 && (
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6, display: "block" }}>
                    ... and {uploadData.rows.length - 5} more rows
                  </span>
                )}
              </div>

              {/* Error / Success */}
              {uploadError && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 7, marginBottom: 12 }}>
                  <AlertCircle size={14} style={{ color: "#f87171", flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "#f87171" }}>{uploadError}</span>
                </div>
              )}
              {uploadSuccess && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", backgroundColor: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 7, marginBottom: 12 }}>
                  <Check size={14} style={{ color: "#34d399", flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "#34d399" }}>{uploadSuccess}</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                {Object.values(uploadColumnMap).filter((v) => v && v !== "_skip").length} of {uploadData.headers.length} columns mapped
              </span>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => {
                    setUploadModalOpen(false);
                    setUploadData(null);
                    setUploadError("");
                    setUploadSuccess("");
                  }}
                  disabled={uploadImporting}
                  style={{
                    padding: "8px 18px",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: FONT_FAMILY,
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 7,
                    color: "rgba(255,255,255,0.6)",
                    cursor: uploadImporting ? "not-allowed" : "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={uploadImporting || !uploadType || Object.values(uploadColumnMap).filter((v) => v && v !== "_skip").length === 0}
                  style={{
                    padding: "8px 22px",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: FONT_FAMILY,
                    backgroundColor: uploadImporting ? "rgba(251,191,36,0.08)" : "rgba(251,191,36,0.15)",
                    border: "1px solid rgba(251,191,36,0.3)",
                    borderRadius: 7,
                    color: "#fbbf24",
                    cursor: uploadImporting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    transition: "all 0.15s ease",
                  }}
                >
                  {uploadImporting ? (
                    <>
                      <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload size={13} />
                      Import {uploadData.rows.length} {uploadType === "post" ? "Original Posts (OP)" : uploadType === "comment" ? "Comments" : "..."}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spinner keyframe for loader */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
