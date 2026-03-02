"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter, useParams } from "next/navigation";
import {
  normalizeStatus as sharedNormalizeStatus,
  fetchThreadflowData,
  fetchCadenceConfig,
  updateCadenceConfig,
  buildCadenceMap,
} from "@/lib/threadflow-data";
import {
  Search,
  Download,
  AlertTriangle,
  Target,
  CheckCircle2,
  Clock,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

// ── Colors ───────────────────────────────────────────────────────────────────

const COLORS = [
  "#34d399", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa",
  "#fb923c", "#38bdf8", "#e879f9", "#4ade80", "#f472b6",
  "#818cf8", "#facc15", "#2dd4bf", "#c084fc", "#fb7185",
  "#22d3ee", "#a3e635", "#fca5a1", "#67e8f9", "#d946ef",
  "#84cc16", "#f97316", "#06b6d4", "#8b5cf6", "#ec4899",
];

// ── Cadence Limits (Supabase-backed via /api/cadence-config) ─────────────────
// cadenceLimits state is keyed by company NAME (not ID).

// ── Helpers ──────────────────────────────────────────────────────────────────

function getWeekOfMonth(dateStr) {
  const d = new Date(dateStr);
  const day = d.getUTCDate();
  if (day <= 7) return 0;
  if (day <= 14) return 1;
  if (day <= 21) return 2;
  return 3;
}

function getCurrentWeekOfMonth() {
  const day = new Date().getDate();
  if (day <= 7) return 1;
  if (day <= 14) return 2;
  if (day <= 21) return 3;
  return 4;
}

function isCurrentMonth(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return d.getUTCFullYear() === now.getFullYear() && d.getUTCMonth() === now.getMonth();
}

function isSelectedMonthMatch(dateStr, year, month) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return d.getUTCFullYear() === year && d.getUTCMonth() === month - 1;
}

function isItemLive(item) {
  return sharedNormalizeStatus(item) === "Live";
}

function isItemPending(item) {
  return sharedNormalizeStatus(item) === "Pending";
}

function isItemApproved(item) {
  return sharedNormalizeStatus(item) === "Under Approval";
}

function buildClientsFromData(allItems, companiesList, cadenceLimits = {}, selectedYear = null, selectedMonthNum = null) {
  const isCurrentMonthSelected = selectedYear === null || (selectedYear === new Date().getFullYear() && selectedMonthNum === new Date().getMonth() + 1);
  const currentMonthItems = selectedYear
    ? allItems.filter((item) => isSelectedMonthMatch(item.date_posted, selectedYear, selectedMonthNum))
    : allItems.filter((item) => isCurrentMonth(item.date_posted));
  const currentWeek = isCurrentMonthSelected ? getCurrentWeekOfMonth() : 4;

  const companyMap = {};
  companiesList.forEach((company) => {
    companyMap[company.id] = {
      id: company.id,
      name: company.name,
      items: [],
    };
  });

  currentMonthItems.forEach((item) => {
    if (companyMap[item.company_id]) {
      companyMap[item.company_id].items.push(item);
    }
  });

  const clients = Object.values(companyMap).map((company, i) => {
    const items = company.items;
    const live = items.filter(isItemLive).length;
    const pending = items.filter(isItemPending).length;
    const approved = items.filter(isItemApproved).length;
    const target = cadenceLimits[company.name] || 0;
    const pct = target > 0 ? Math.round((live / target) * 100) : 0;
    const remaining = target > 0 ? Math.max(0, target - live) : 0;

    let pace;
    if (target <= 0) {
      pace = "No Data";
    } else {
      const expectedByNow = Math.ceil((currentWeek / 4) * target);
      if (live >= expectedByNow) {
        pace = "On Track";
      } else if (live >= expectedByNow * 0.65) {
        pace = "Behind";
      } else {
        pace = "At Risk";
      }
    }

    const weeklyActuals = [0, 0, 0, 0];
    items.forEach((item) => {
      if (item.date_posted) {
        const week = getWeekOfMonth(item.date_posted);
        weeklyActuals[week]++;
      }
    });

    return {
      id: company.id,
      name: company.name,
      target,
      live,
      approved,
      pending,
      remaining,
      pct,
      pace,
      color: COLORS[i % COLORS.length],
      weeklyActuals,
    };
  });

  return clients;
}

// ── Loading Skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  const font = "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  const shimmerStyle = {
    background: "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: 6,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: font,
        color: "#ededed",
        padding: "32px 40px 48px",
      }}
    >
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <div style={{ ...shimmerStyle, width: 160, height: 20, marginBottom: 8 }} />
          <div style={{ ...shimmerStyle, width: 100, height: 14 }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ ...shimmerStyle, width: 100, height: 34 }} />
          <div style={{ ...shimmerStyle, width: 110, height: 34 }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ ...shimmerStyle, width: "70%", height: 12, marginBottom: 14 }} />
            <div style={{ ...shimmerStyle, width: "40%", height: 24 }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ ...shimmerStyle, width: 260, height: 36 }} />
        <div style={{ ...shimmerStyle, width: 80, height: 30, borderRadius: 20 }} />
        <div style={{ ...shimmerStyle, width: 60, height: 30, borderRadius: 20 }} />
        <div style={{ ...shimmerStyle, width: 60, height: 30, borderRadius: 20 }} />
      </div>
      <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "12px 14px", background: "rgba(255,255,255,0.01)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ ...shimmerStyle, width: "100%", height: 12 }} />
        </div>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} style={{ padding: "14px 14px", borderBottom: i < 7 ? "1px solid rgba(255,255,255,0.04)" : "none", display: "flex", gap: 20, alignItems: "center" }}>
            <div style={{ ...shimmerStyle, width: 8, height: 8, borderRadius: "50%", flexShrink: 0 }} />
            <div style={{ ...shimmerStyle, width: 120, height: 14, flexShrink: 0 }} />
            <div style={{ ...shimmerStyle, flex: 1, height: 14 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Set Limits Modal ─────────────────────────────────────────────────────────

function SetLimitsModal({ clients, cadenceLimits, onSave, onClose, font }) {
  const [localLimits, setLocalLimits] = useState({});
  const [applyAllValue, setApplyAllValue] = useState("");

  useEffect(() => {
    const initial = {};
    clients.forEach((c) => {
      if (cadenceLimits[c.name]) {
        initial[c.name] = cadenceLimits[c.name].toString();
      }
    });
    setLocalLimits(initial);
  }, [clients, cadenceLimits]);

  const handleInputChange = (companyName, value) => {
    setLocalLimits((prev) => ({ ...prev, [companyName]: value }));
  };

  const handleApplyAll = () => {
    if (!applyAllValue) return;
    const updated = { ...localLimits };
    clients.forEach((c) => {
      if (!cadenceLimits[c.name]) {
        updated[c.name] = applyAllValue;
      }
    });
    setLocalLimits(updated);
  };

  const handleSave = () => {
    const changes = [];
    clients.forEach((c) => {
      const val = parseInt(localLimits[c.name], 10);
      const prev = cadenceLimits[c.name] || 0;
      if (val > 0 && val !== prev) {
        changes.push({ name: c.name, limit: val });
      }
    });
    onSave(changes);
  };

  const sortedClients = [...clients].sort((a, b) => a.name.localeCompare(b.name));
  const inputStyle = {
    width: 72, padding: "6px 10px", fontSize: 13, fontFamily: font, color: "#ededed",
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 6, outline: "none", textAlign: "center", fontVariantNumeric: "tabular-nums",
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 12, width: 520, maxHeight: "80vh", display: "flex", flexDirection: "column", fontFamily: font, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        {/* Header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#ededed", margin: 0 }}>Set Monthly Cadence Limits</h2>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "4px 0 0" }}>Set the monthly engagement target for each client</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 4, marginTop: -2, marginRight: -4 }}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", padding: "10px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.25)" }}>Client</span>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.25)", textAlign: "center" }}>Current</span>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.25)", textAlign: "center" }}>New Limit</span>
          </div>
          {sortedClients.map((client) => (
            <div key={client.id} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", padding: "8px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: client.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#ededed", fontWeight: 500 }}>{client.name}</span>
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textAlign: "center", fontVariantNumeric: "tabular-nums" }}>{cadenceLimits[client.name] || "\u2014"}</span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="number" min="0" value={localLimits[client.name] || ""} onChange={(e) => handleInputChange(client.name, e.target.value)} placeholder="\u2014" style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
                />
              </div>
            </div>
          ))}
          {/* Apply to all */}
          <div style={{ padding: "12px 24px", borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>Apply to all</span>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: "2px 0 0" }}>Sets limit for all clients without a custom value</p>
            </div>
            <input type="number" min="0" value={applyAllValue} onChange={(e) => setApplyAllValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleApplyAll(); }} placeholder="\u2014" style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
            />
            <button onClick={handleApplyAll} style={{ padding: "6px 12px", fontSize: 12, fontWeight: 500, fontFamily: font, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap" }}>
              Apply
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={{ padding: "8px 16px", fontSize: 13, fontWeight: 500, fontFamily: font, color: "rgba(255,255,255,0.5)", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: "8px 16px", fontSize: 13, fontWeight: 500, fontFamily: font, color: "#0a0a0a", background: "#34d399", border: "1px solid #34d399", borderRadius: 8, cursor: "pointer" }}>Save All</button>
        </div>
      </div>
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function CadencePlannerPage() {
  const router = useRouter();
  const params = useParams();
  const companySlug = params?.company;
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);

  const [search, setSearch] = useState("");
  const [paceFilter, setPaceFilter] = useState(null);
  const [progressFilter, setProgressFilter] = useState(null);
  const [hideEmpty, setHideEmpty] = useState(false);
  const [sortBy, setSortBy] = useState("risk");
  const [mounted, setMounted] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Cadence limits state
  const [cadenceLimits, setCadenceLimitsState] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [flashCell, setFlashCell] = useState(null);
  const [showLimitsModal, setShowLimitsModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  });


  // Token ref for API calls
  const tokenRef = useRef(null);

  // ── Auth + Data Fetching ─────────────────────────────────────────────────

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
              fetchCadenceConfig(token),
            ]);
            setAllItems(items);
            setCompaniesList(companies);
            const apiMap = buildCadenceMap(configs);
            if (Object.keys(apiMap).length > 0) {
              setCadenceLimitsState(apiMap);
              try { localStorage.setItem("cadence_targets", JSON.stringify(apiMap)); } catch (e) { /* noop */ }
            } else {
              try {
                const saved = localStorage.getItem("cadence_targets");
                if (saved) setCadenceLimitsState(JSON.parse(saved));
              } catch (e) { /* noop */ }
            }
          } catch (err) {
            console.error("Error fetching cadence data:", err);
            try {
              const saved = localStorage.getItem("cadence_targets");
              if (saved) setCadenceLimitsState(JSON.parse(saved));
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

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Save a single cadence limit (inline edit) ─────────────────────────────

  const handleSaveLimit = async (companyName, value) => {
    const numLimit = parseInt(value, 10);
    if (numLimit > 0) {
      const updated = { ...cadenceLimits, [companyName]: numLimit };
      setCadenceLimitsState(updated);
      setFlashCell(companyName);
      setTimeout(() => setFlashCell(null), 600);
      try { localStorage.setItem("cadence_targets", JSON.stringify(updated)); } catch (e) { /* noop */ }
      if (tokenRef.current) {
        await updateCadenceConfig(tokenRef.current, companyName, numLimit);
      }
    }
    setEditingCell(null);
    setEditValue("");
  };

  // ── Save bulk limits (modal) ───────────────────────────────────────────────

  const handleBulkSave = async (changes) => {
    if (changes.length === 0) {
      setShowLimitsModal(false);
      return;
    }
    const newLimits = { ...cadenceLimits };
    changes.forEach(({ name, limit }) => {
      newLimits[name] = limit;
    });
    setCadenceLimitsState(newLimits);
    setShowLimitsModal(false);
    setSuccessMessage(`Updated ${changes.length} client${changes.length > 1 ? "s" : ""}`);
    setTimeout(() => setSuccessMessage(""), 2500);
    try { localStorage.setItem("cadence_targets", JSON.stringify(newLimits)); } catch (e) { /* noop */ }
    if (tokenRef.current) {
      await Promise.all(
        changes.map(({ name, limit }) =>
          updateCadenceConfig(tokenRef.current, name, limit)
        )
      );
    }
  };

  // ── Build clients from real data ─────────────────────────────────────────

  const clients = useMemo(() => {
    if (companiesList.length === 0) return [];
    return buildClientsFromData(allItems, companiesList, cadenceLimits, selectedMonth.year, selectedMonth.month);
  }, [allItems, companiesList, cadenceLimits, selectedMonth]);

  // ── Filtering & Sorting ──────────────────────────────────────────────────

  const filteredClients = useMemo(() => {
    let data = [...clients];
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      data = data.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (paceFilter) {
      data = data.filter((c) => c.pace === paceFilter);
    }
    if (progressFilter) {
      data = data.filter((c) => {
        if (progressFilter === "0") return c.pct === 0;
        if (progressFilter === "1-25") return c.pct >= 1 && c.pct <= 25;
        if (progressFilter === "26-50") return c.pct >= 26 && c.pct <= 50;
        if (progressFilter === "51-75") return c.pct >= 51 && c.pct <= 75;
        if (progressFilter === "76-100") return c.pct >= 76 && c.pct <= 100;
        if (progressFilter === "100+") return c.pct > 100;
        return true;
      });
    }
    if (hideEmpty) {
      data = data.filter((c) => c.live > 0);
    }
    const paceOrder = { "At Risk": 0, Behind: 1, "On Track": 2, "No Data": 3 };
    if (sortBy === "risk") {
      data.sort((a, b) => (paceOrder[a.pace] ?? 3) - (paceOrder[b.pace] ?? 3) || a.name.localeCompare(b.name));
    } else if (sortBy === "name") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "cadence") {
      data.sort((a, b) => a.pct - b.pct);
    } else if (sortBy === "total") {
      data.sort((a, b) => b.target - a.target);
    } else if (sortBy === "live") {
      data.sort((a, b) => b.live - a.live || a.name.localeCompare(b.name));
    } else if (sortBy === "remaining") {
      data.sort((a, b) => b.remaining - a.remaining || a.name.localeCompare(b.name));
    } else if (sortBy === "progress") {
      data.sort((a, b) => a.pct - b.pct || a.name.localeCompare(b.name));
    }
    return data;
  }, [clients, search, paceFilter, progressFilter, hideEmpty, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search.trim()) count++;
    if (paceFilter) count++;
    if (progressFilter) count++;
    if (hideEmpty) count++;
    return count;
  }, [search, paceFilter, progressFilter, hideEmpty]);

  const clearAllFilters = () => {
    setSearch("");
    setPaceFilter(null);
    setProgressFilter(null);
    setHideEmpty(false);
  };

  // ── Summary Stats ────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const clientsWithTargets = clients.filter((c) => c.target > 0);
    const totalTarget = clientsWithTargets.reduce((s, c) => s + c.target, 0);
    const totalLive = clients.reduce((s, c) => s + c.live, 0);
    const overallPct = totalTarget > 0 ? Math.round((totalLive / totalTarget) * 100) : 0;
    const behind = clientsWithTargets.filter((c) => c.pace === "Behind").length;
    const atRisk = clientsWithTargets.filter((c) => c.pace === "At Risk").length;
    return { totalTarget, totalLive, overallPct, behind, atRisk };
  }, [clients]);

  // ── Export CSV ───────────────────────────────────────────────────────────

  const handleExport = () => {
    const shortMonthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthLabel = `${shortMonthNames[selectedMonth.month - 1]}-${selectedMonth.year}`;
    const headers = ["Client", "Target", "Live", "Approved", "Pending", "Live %", "Wk1", "Wk2", "Wk3", "Wk4", "Pace"];
    const rows = filteredClients.map((c) => [
      c.name, c.target || "", c.live, c.approved, c.pending,
      c.target > 0 ? c.pct : "",
      c.target > 0 ? c.weeklyActuals[0] : "", c.target > 0 ? c.weeklyActuals[1] : "",
      c.target > 0 ? c.weeklyActuals[2] : "", c.target > 0 ? c.weeklyActuals[3] : "",
      c.pace,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cadence-planner-${monthLabel.toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Helpers ──────────────────────────────────────────────────────────────

  const progressColor = (pct) => {
    if (pct >= 75) return "#34d399";
    if (pct >= 50) return "#60a5fa";
    if (pct >= 25) return "#fbbf24";
    return "#f87171";
  };

  const paceStyles = (pace) => {
    if (pace === "On Track") return { bg: "rgba(52,211,153,0.10)", text: "#34d399", dot: "#34d399" };
    if (pace === "Behind") return { bg: "rgba(251,191,36,0.10)", text: "#fbbf24", dot: "#fbbf24" };
    if (pace === "No Data") return { bg: "rgba(255,255,255,0.05)", text: "rgba(255,255,255,0.35)", dot: "rgba(255,255,255,0.25)" };
    return { bg: "rgba(248,113,113,0.10)", text: "#f87171", dot: "#f87171" };
  };

  const rowBg = (pace, isHovered) => {
    let base = "transparent";
    if (pace === "At Risk") base = "rgba(248,113,113,0.03)";
    else if (pace === "Behind") base = "rgba(251,191,36,0.03)";
    if (isHovered) return pace === "At Risk" ? "rgba(248,113,113,0.06)" : pace === "Behind" ? "rgba(251,191,36,0.06)" : "rgba(255,255,255,0.02)";
    return base;
  };

  const font = "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  if (!mounted || loading) return <LoadingSkeleton />;

  const now = new Date();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const monthOptions = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return { year: d.getFullYear(), month: d.getMonth() + 1, label: d.toLocaleString("default", { month: "long", year: "numeric" }) };
  });
  const isCurrentMonthSelected = selectedMonth.year === now.getFullYear() && selectedMonth.month === now.getMonth() + 1;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: font, color: "#ededed", padding: "32px 40px 48px", opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease" }}>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s" }}>
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 600, color: "#ededed", margin: 0, lineHeight: 1.4 }}>Cadence Planner</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
            <select
              value={`${selectedMonth.year}-${selectedMonth.month}`}
              onChange={(e) => {
                const [y, m] = e.target.value.split("-").map(Number);
                setSelectedMonth({ year: y, month: m });
              }}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#ededed",
                padding: "6px 30px 6px 12px",
                fontSize: 13,
                fontFamily: "inherit",
                cursor: "pointer",
                outline: "none",
                appearance: "none",
                WebkitAppearance: "none",
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              {monthOptions.map((opt) => (
                <option key={`${opt.year}-${opt.month}`} value={`${opt.year}-${opt.month}`} style={{ background: "#161616", color: "#ededed" }}>
                  {opt.label}
                </option>
              ))}
            </select>
            {isCurrentMonthSelected && (
              <span style={{ fontSize: 11, color: "#34d399", fontWeight: 500, padding: "2px 8px", background: "rgba(52,211,153,0.1)", borderRadius: 4 }}>CURRENT</span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setShowLimitsModal(true)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 13, fontWeight: 500, fontFamily: font, color: "#0a0a0a", background: "#ededed", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, cursor: "pointer", transition: "all 0.15s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#ffffff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#ededed"; }}
          >
            <Settings size={14} />
            Set Limits
          </button>
          <button
            onClick={handleExport}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", fontSize: 13, fontWeight: 500, fontFamily: font, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, cursor: "pointer", transition: "all 0.15s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#ededed"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* ── Summary Stats ────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total Target", value: stats.totalTarget > 0 ? stats.totalTarget : "\u2014", icon: <Target size={15} style={{ color: "rgba(255,255,255,0.25)" }} /> },
          { label: "Total Live", value: stats.totalLive, icon: <CheckCircle2 size={15} style={{ color: "#34d399" }} /> },
          { label: "Overall Live %", value: stats.totalTarget > 0 ? `${stats.overallPct}%` : "\u2014", icon: <BarChart3 size={15} style={{ color: "#60a5fa" }} />, progressBar: stats.totalTarget > 0 },
          { label: "Clients Behind Pace", value: stats.behind, icon: <Clock size={15} style={{ color: "#fbbf24" }} />, valueColor: "#fbbf24" },
          { label: "Clients At Risk", value: stats.atRisk, icon: <AlertTriangle size={15} style={{ color: "#f87171" }} />, valueColor: "#f87171" },
        ].map((card, idx) => (
          <div key={card.label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "16px 18px", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(6px)", transition: `opacity 0.3s ease ${0.08 + idx * 0.04}s, transform 0.3s ease ${0.08 + idx * 0.04}s` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{card.label}</span>
              {card.icon}
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, color: card.valueColor || "#ededed", fontVariantNumeric: "tabular-nums" }}>{card.value}</div>
            {card.progressBar && (
              <div style={{ marginTop: 10, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.min(stats.overallPct, 100)}%`, background: progressColor(stats.overallPct), borderRadius: 2, transition: "width 0.6s ease" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Filter Bar ───────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.3s ease 0.28s, transform 0.3s ease 0.28s" }}>
        {/* Row 1: Search, Pace Pills, Progress Dropdown, Hide Empty */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative", flex: "0 0 220px" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.25)", pointerEvents: "none" }} />
            <input
              type="text" placeholder="Search clients..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "8px 12px 8px 32px", fontSize: 13, fontFamily: font, color: "#ededed", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, outline: "none", transition: "border-color 0.15s ease" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            />
          </div>
          {[
            { label: "On Track", color: "#34d399" },
            { label: "Behind", color: "#fbbf24" },
            { label: "At Risk", color: "#f87171" },
            { label: "No Data", color: "rgba(255,255,255,0.35)" },
          ].map((p) => {
            const active = paceFilter === p.label;
            return (
              <button key={p.label} onClick={() => setPaceFilter(active ? null : p.label)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", fontSize: 12, fontWeight: 500, fontFamily: font, color: active ? p.color : "rgba(255,255,255,0.4)", background: active ? `${p.color}10` : "transparent", border: `1px solid ${active ? `${p.color}30` : "rgba(255,255,255,0.06)"}`, borderRadius: 20, cursor: "pointer", transition: "all 0.15s ease" }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; } }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, opacity: active ? 1 : 0.4 }} />
                {p.label}
              </button>
            );
          })}
          {/* Progress Filter Dropdown */}
          <select
            value={progressFilter || ""}
            onChange={(e) => setProgressFilter(e.target.value || null)}
            style={{
              background: progressFilter ? "rgba(96,165,250,0.10)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${progressFilter ? "rgba(96,165,250,0.3)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 20, color: progressFilter ? "#60a5fa" : "rgba(255,255,255,0.4)",
              padding: "6px 28px 6px 12px", fontSize: 12, fontWeight: 500, fontFamily: font,
              cursor: "pointer", outline: "none", appearance: "none", WebkitAppearance: "none",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", transition: "all 0.15s ease",
            }}
          >
            <option value="" style={{ background: "#161616", color: "#ededed" }}>All Progress</option>
            <option value="0" style={{ background: "#161616", color: "#ededed" }}>0%</option>
            <option value="1-25" style={{ background: "#161616", color: "#ededed" }}>1–25%</option>
            <option value="26-50" style={{ background: "#161616", color: "#ededed" }}>26–50%</option>
            <option value="51-75" style={{ background: "#161616", color: "#ededed" }}>51–75%</option>
            <option value="76-100" style={{ background: "#161616", color: "#ededed" }}>76–100%</option>
            <option value="100+" style={{ background: "#161616", color: "#ededed" }}>100%+</option>
          </select>
          {/* Hide Empty Toggle */}
          <button
            onClick={() => setHideEmpty((v) => !v)}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", fontSize: 12, fontWeight: 500, fontFamily: font,
              color: hideEmpty ? "#a78bfa" : "rgba(255,255,255,0.4)",
              background: hideEmpty ? "rgba(167,139,250,0.10)" : "transparent",
              border: `1px solid ${hideEmpty ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: 20, cursor: "pointer", transition: "all 0.15s ease", whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { if (!hideEmpty) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; } }}
            onMouseLeave={(e) => { if (!hideEmpty) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; } }}
          >
            <span style={{
              width: 14, height: 14, borderRadius: 3,
              border: `1.5px solid ${hideEmpty ? "#a78bfa" : "rgba(255,255,255,0.25)"}`,
              background: hideEmpty ? "#a78bfa" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, color: "#0a0a0a", fontWeight: 700, flexShrink: 0, transition: "all 0.15s ease",
            }}>
              {hideEmpty ? "\u2713" : ""}
            </span>
            Hide empty
          </button>
          <div style={{ flex: 1 }} />
          {/* Filter status + Clear all */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
              {filteredClients.length === clients.length ? `${clients.length} clients` : `${filteredClients.length} of ${clients.length}`}
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                style={{ padding: "3px 8px", fontSize: 11, fontWeight: 500, fontFamily: font, color: "rgba(255,255,255,0.45)", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, cursor: "pointer", transition: "all 0.15s ease", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#ededed"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                Clear all
              </button>
            )}
          </div>
        </div>
        {/* Row 2: Sort Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.2)", marginRight: 4 }}>Sort</span>
          {[
            { key: "risk", label: "Risk First" },
            { key: "name", label: "Name" },
            { key: "cadence", label: "Live %" },
            { key: "total", label: "Target" },
            { key: "live", label: "Live" },
            { key: "remaining", label: "Remaining" },
            { key: "progress", label: "Progress" },
          ].map((s) => {
            const active = sortBy === s.key;
            return (
              <button key={s.key} onClick={() => setSortBy(s.key)}
                style={{ padding: "5px 10px", fontSize: 11, fontWeight: 500, fontFamily: font, color: active ? "#ededed" : "rgba(255,255,255,0.35)", background: active ? "rgba(255,255,255,0.06)" : "transparent", border: `1px solid ${active ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.04)"}`, borderRadius: 6, cursor: "pointer", transition: "all 0.15s ease" }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.background = "transparent"; } }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Cadence Table ────────────────────────────────────────────────── */}
      <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, overflow: "hidden", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.3s ease 0.34s, transform 0.3s ease 0.34s" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
            <thead>
              <tr>
                {[
                  { label: "Client", width: "16%" },
                  { label: "Target", width: "6%", align: "center" },
                  { label: "Live", width: "6%", align: "right" },
                  { label: "Approved", width: "7%", align: "right" },
                  { label: "Pending", width: "7%", align: "right" },
                  { label: "Progress", width: "14%" },
                  { label: "Wk1", width: "7%", align: "center" },
                  { label: "Wk2", width: "7%", align: "center" },
                  { label: "Wk3", width: "7%", align: "center" },
                  { label: "Wk4", width: "7%", align: "center" },
                  { label: "Pace", width: "10%", align: "center" },
                ].map((col) => (
                  <th key={col.label} style={{ padding: "12px 14px", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.25)", textAlign: col.align || "left", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)", width: col.width, whiteSpace: "nowrap" }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, idx) => {
                const ps = paceStyles(client.pace);
                const isHovered = hoveredRow === client.id;
                const hasTarget = client.target > 0;
                const isFlashing = flashCell === client.name;
                return (
                  <tr
                    key={client.id}
                    onMouseEnter={() => setHoveredRow(client.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{ background: rowBg(client.pace, isHovered), cursor: "default", transition: "background 0.12s ease", borderBottom: idx < filteredClients.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                  >
                    {/* Client */}
                    <td style={{ padding: "11px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: client.color, flexShrink: 0 }} />
                        <span
                          onClick={() => router.push(`/threadflow/c/${companySlug}/client-dashboard?client=${encodeURIComponent(client.name)}`)}
                          style={{ fontSize: 13, fontWeight: 500, color: "#ededed", whiteSpace: "nowrap", cursor: "pointer" }}
                          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                        >{client.name}</span>
                      </div>
                    </td>

                    {/* Target (editable — click to set) */}
                    <td
                      style={{ padding: "11px 14px", fontSize: 13, textAlign: "center", fontVariantNumeric: "tabular-nums", cursor: "pointer", background: isFlashing ? "rgba(52,211,153,0.15)" : "transparent", transition: "background 0.3s ease" }}
                      onClick={(e) => { e.stopPropagation(); if (editingCell !== client.name) { setEditingCell(client.name); setEditValue(client.target > 0 ? client.target.toString() : ""); } }}
                    >
                      {editingCell === client.name ? (
                        <input
                          ref={(el) => { if (el) requestAnimationFrame(() => el.focus()); }}
                          type="number" min="0" value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); handleSaveLimit(client.name, editValue); }
                            else if (e.key === "Escape") { setEditingCell(null); setEditValue(""); }
                          }}
                          onBlur={() => { handleSaveLimit(client.name, editValue); }}
                          onClick={(e) => e.stopPropagation()}
                          style={{ width: 60, padding: "4px 8px", fontSize: 13, fontFamily: font, color: "#ededed", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 4, outline: "none", textAlign: "center", fontVariantNumeric: "tabular-nums" }}
                        />
                      ) : (
                        <span
                          style={{ cursor: "pointer", padding: "2px 8px", borderRadius: 4, color: hasTarget ? "#ededed" : "rgba(255,255,255,0.35)", fontWeight: hasTarget ? 600 : 400, background: hasTarget ? "transparent" : "rgba(255,255,255,0.04)", border: hasTarget ? "none" : "1px dashed rgba(255,255,255,0.12)", transition: "background 0.15s ease" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = hasTarget ? "transparent" : "rgba(255,255,255,0.04)"; }}
                        >
                          {hasTarget ? client.target : "Set"}
                        </span>
                      )}
                    </td>

                    {/* Live */}
                    <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 600, color: "#34d399", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{client.live}</td>
                    {/* Approved */}
                    <td style={{ padding: "11px 14px", fontSize: 13, color: "#60a5fa", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{client.approved}</td>
                    {/* Pending */}
                    <td style={{ padding: "11px 14px", fontSize: 13, color: "#fbbf24", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{client.pending}</td>

                    {/* Progress */}
                    <td style={{ padding: "11px 14px" }}>
                      {hasTarget ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${Math.min(client.pct, 100)}%`, background: progressColor(client.pct), borderRadius: 2, transition: "width 0.5s ease" }} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 500, color: progressColor(client.pct), minWidth: 32, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{`${client.pct}%`}</span>
                        </div>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2 }} />
                          <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.2)", minWidth: 32, textAlign: "right" }}>{"\u2014"}</span>
                        </div>
                      )}
                    </td>

                    {/* Weekly Columns */}
                    {[0, 1, 2, 3].map((w) => {
                      if (!hasTarget) {
                        return <td key={w} style={{ padding: "11px 14px", fontSize: 12, textAlign: "center", color: "rgba(255,255,255,0.2)", fontWeight: 500 }}>{"\u2014"}</td>;
                      }
                      const actual = client.weeklyActuals[w];
                      return <td key={w} style={{ padding: "11px 14px", fontSize: 12, textAlign: "center", fontVariantNumeric: "tabular-nums", color: actual > 0 ? "#ededed" : "rgba(255,255,255,0.2)", fontWeight: 500 }}>{actual}</td>;
                    })}

                    {/* Pace Badge */}
                    <td style={{ padding: "11px 14px", textAlign: "center" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", fontSize: 11, fontWeight: 500, color: ps.text, background: ps.bg, borderRadius: 20, whiteSpace: "nowrap" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: ps.dot }} />
                        {client.pace}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={11} style={{ padding: "48px 14px", textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
                    No clients match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Footer Tip ───────────────────────────────────────────────────── */}
      <p style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.25)", fontStyle: "italic", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.3s ease 0.4s, transform 0.3s ease 0.4s" }}>
        Tip: Focus on At Risk clients first. Clients ahead of pace can absorb slack if needed.
      </p>

      {/* ── Set Limits Modal ──────────────────────────────────────────────── */}
      {showLimitsModal && (
        <SetLimitsModal clients={clients} cadenceLimits={cadenceLimits} onSave={handleBulkSave} onClose={() => setShowLimitsModal(false)} font={font} />
      )}

      {/* ── Success Toast ─────────────────────────────────────────────────── */}
      {successMessage && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", padding: "10px 20px", background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 8, color: "#34d399", fontSize: 13, fontWeight: 500, zIndex: 1001, fontFamily: font }}>
          {successMessage}
        </div>
      )}
    </div>
  );
}
