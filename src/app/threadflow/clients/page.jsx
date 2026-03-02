"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, Plus, X, ArrowUpDown, MoreVertical, Pencil, EyeOff, Trash2, RotateCcw, ChevronDown, Check } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import { normalizeStatus, fetchThreadflowData, updateCadenceConfig, fetchCadenceConfig, buildCadenceMap } from "@/lib/threadflow-data";

// ── Color Palette for deterministic company colors ──────────────────────────
const COLOR_PALETTE = [
  "#3ECF8E", "#5E6AD2", "#F9BD2B", "#E04E6A", "#6366F1", "#00E599",
  "#C049EF", "#6C47FF", "#00E9A3", "#4636E3", "#5D5CDE", "#7C3AED",
  "#FFB900", "#FD3A5C", "#1F8DED", "#52BD94", "#405BFF", "#F9BD2B",
  "#E04E6A", "#3B82F6", "#0D9373", "#818CF8", "#27C581", "#4FF8D2",
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function getColorForName(name) {
  return COLOR_PALETTE[hashString(name) % COLOR_PALETTE.length];
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function getPace(live, total) {
  if (total === 0) return "no-data";
  const pct = live / total;
  if (pct >= 0.75) return "on-track";
  if (pct >= 0.5) return "behind";
  return "at-risk";
}

const PACE_CONFIG = {
  "on-track": { label: "On Track", color: "#34d399", bg: "rgba(52,211,153,0.10)" },
  behind: { label: "Behind", color: "#fbbf24", bg: "rgba(251,191,36,0.10)" },
  "at-risk": { label: "At Risk", color: "#f87171", bg: "rgba(248,113,113,0.10)" },
  "no-data": { label: "No Data", color: "rgba(255,255,255,0.25)", bg: "rgba(255,255,255,0.04)" },
};

const FONT = "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// ── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard({ delay = 0 }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding: 20,
        animation: `pulse 1.5s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {/* Top row skeleton */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ width: 80, height: 14, borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
        </div>
        <div style={{ width: 60, height: 20, borderRadius: 12, background: "rgba(255,255,255,0.04)" }} />
      </div>
      {/* Middle row skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ width: 32, height: 22, borderRadius: 4, background: "rgba(255,255,255,0.04)", margin: "0 auto 3px" }} />
            <div style={{ width: 28, height: 10, borderRadius: 3, background: "rgba(255,255,255,0.04)", margin: "0 auto" }} />
          </div>
        ))}
      </div>
      {/* Bottom bar skeleton */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.04)" }} />
        <div style={{ width: 32, height: 12, borderRadius: 3, background: "rgba(255,255,255,0.04)" }} />
      </div>
    </div>
  );
}

// ── Skeleton Stat Card ───────────────────────────────────────────────────────
function SkeletonStatCard({ delay = 0 }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding: "18px 20px",
        animation: `pulse 1.5s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div style={{ width: 80, height: 10, borderRadius: 3, background: "rgba(255,255,255,0.04)", marginBottom: 8 }} />
      <div style={{ width: 48, height: 28, borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────
export default function ClientsOverviewPage() {
  const router = useRouter();
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companiesList, setCompaniesList] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [cadenceLimits, setCadenceLimits] = useState({});

  const [search, setSearch] = useState("");
  const [paceFilters, setPaceFilters] = useState(new Set());
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredSort, setHoveredSort] = useState(null);
  const [hoveredPill, setHoveredPill] = useState(null);
  const [animateIn, setAnimateIn] = useState(true);

  // Add/Edit/Delete client state
  const [newClientName, setNewClientName] = useState("");
  const [newClientTarget, setNewClientTarget] = useState("35");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editTargetId, setEditTargetId] = useState(null);
  const [editTargetValue, setEditTargetValue] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [hiddenClients, setHiddenClients] = useState([]);
  const [showHidden, setShowHidden] = useState(false);
  const tokenRef = useRef(null);

  // ── Firebase auth + data fetching ────────────────────────────────────────
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
            setCadenceLimits(buildCadenceMap(configs));
          } catch (err) {
            console.error("Failed to fetch client data:", err);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }
    });
    return () => unsubscribe();
  }, [router]);

  // ── Build client objects from real data (all-time) ───────────────────────
  const clients = useMemo(() => {
    return companiesList.map((company) => {
      const companyItems = allItems.filter((item) => item.company_id === company.id);
      const total = companyItems.length;

      const live = companyItems.filter((item) => normalizeStatus(item) === "Live").length;

      const pending = companyItems.filter((item) => normalizeStatus(item) === "Pending").length;

      const approved = companyItems.filter((item) => normalizeStatus(item) === "Under Approval").length;

      return {
        id: company.id,
        name: company.name,
        color: getColorForName(company.name),
        total,
        live,
        pending,
        approved,
      };
    });
  }, [companiesList, allItems]);

  // Derived data
  const enrichedClients = useMemo(() => {
    return clients.map((c) => ({
      ...c,
      pace: getPace(c.live, c.total),
      pct: c.total > 0 ? Math.round((c.live / c.total) * 100) : 0,
    }));
  }, [clients]);

  const filtered = useMemo(() => {
    let result = enrichedClients;

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }

    if (paceFilters.size > 0) {
      result = result.filter((c) => paceFilters.has(c.pace));
    }

    if (sortKey) {
      result = [...result].sort((a, b) => {
        let aVal, bVal;
        switch (sortKey) {
          case "name":
            aVal = a.name.toLowerCase();
            bVal = b.name.toLowerCase();
            return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
          case "pct":
            aVal = a.pct;
            bVal = b.pct;
            break;
          case "live":
            aVal = a.live;
            bVal = b.live;
            break;
          case "total":
            aVal = a.total;
            bVal = b.total;
            break;
          default:
            return 0;
        }
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      });
    }

    return result;
  }, [enrichedClients, search, paceFilters, sortKey, sortDir]);

  // Summary stats
  const stats = useMemo(() => {
    const totalClients = enrichedClients.length;
    const totalLive = enrichedClients.reduce((s, c) => s + c.live, 0);
    const onTrack = enrichedClients.filter((c) => c.pace === "on-track").length;
    const atRisk = enrichedClients.filter((c) => c.pace === "at-risk").length;
    return { totalClients, totalLive, onTrack, atRisk };
  }, [enrichedClients]);

  // Handlers
  const togglePaceFilter = useCallback((pace) => {
    setPaceFilters((prev) => {
      const next = new Set(prev);
      if (next.has(pace)) next.delete(pace);
      else next.add(pace);
      return next;
    });
  }, []);

  const handleSort = useCallback(
    (key) => {
      if (sortKey === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
    },
    [sortKey]
  );

  const handleCardClick = useCallback((clientName) => {
    const formatted = clientName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    router.push(`/threadflow/c/${formatted}`);
  }, [router]);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Hidden clients persistence ────────────────────────────────────────────
  const hiddenInitRef = useRef(false);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("threadflow_hidden_clients") || "[]");
      if (stored.length > 0) setHiddenClients(stored);
    } catch {}
    hiddenInitRef.current = true;
  }, []);
  useEffect(() => {
    if (!hiddenInitRef.current) return;
    try { localStorage.setItem("threadflow_hidden_clients", JSON.stringify(hiddenClients)); } catch {}
  }, [hiddenClients]);

  const visibleFiltered = useMemo(
    () => filtered.filter((c) => !hiddenClients.includes(c.id)),
    [filtered, hiddenClients]
  );
  const hiddenClientsList = useMemo(
    () => enrichedClients.filter((c) => hiddenClients.includes(c.id)),
    [enrichedClients, hiddenClients]
  );

  // ── Add Client handler ────────────────────────────────────────────────────
  const handleAddClient = async () => {
    if (!newClientName.trim()) return;
    setSaving(true);
    try {
      const token = tokenRef.current || (firebaseUser ? await firebaseUser.getIdToken(true) : null);
      if (!token) throw new Error("Not authenticated");

      const res = await fetch("/api/companies", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ name: newClientName.trim() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to add client");
      }
      const { data: newCompany } = await res.json();

      const targetVal = parseInt(newClientTarget, 10) || 35;
      await updateCadenceConfig(token, newClientName.trim(), targetVal);

      setCompaniesList((prev) => [...prev, newCompany]);
      setCadenceLimits((prev) => ({ ...prev, [newClientName.trim()]: targetVal }));
      setNewClientName("");
      setNewClientTarget("35");
      setShowModal(false);
      showToast("Client added to tracking");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Edit cadence target ───────────────────────────────────────────────────
  const handleSaveTarget = async (clientName) => {
    const val = parseInt(editTargetValue, 10);
    if (isNaN(val) || val < 0) return;
    try {
      const token = tokenRef.current || (firebaseUser ? await firebaseUser.getIdToken(true) : null);
      await updateCadenceConfig(token, clientName, val);
      setCadenceLimits((prev) => ({ ...prev, [clientName]: val }));
      setEditTargetId(null);
      showToast(`Target set to ${val} for ${clientName}`);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // ── Hide client ───────────────────────────────────────────────────────────
  const handleHide = (clientId) => {
    setHiddenClients((prev) => [...prev, clientId]);
    setMenuOpen(null);
    showToast("Client hidden from dashboard");
  };
  const handleRestore = (clientId) => {
    setHiddenClients((prev) => prev.filter((id) => id !== clientId));
  };

  // ── Delete client ─────────────────────────────────────────────────────────
  const handleDelete = async (client) => {
    try {
      const token = tokenRef.current || (firebaseUser ? await firebaseUser.getIdToken(true) : null);
      if (!token) throw new Error("Not authenticated");

      await fetch("/api/companies", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ id: client.id }),
      });

      await fetch("/api/cadence-config", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ company_name: client.name }),
      });

      setCompaniesList((prev) => prev.filter((c) => c.id !== client.id));
      setDeleteConfirm(null);
      showToast(`${client.name} removed`);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // ── Close menu on outside click ────────────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = () => setMenuOpen(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  // ── Keyframes style (injected once) ──────────────────────────────────────
  const keyframesStyle = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes overlayFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: FONT,
        color: "#ededed",
        padding: "32px 40px",
      }}
    >
      <style>{keyframesStyle}</style>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <h1
          style={{
            fontSize: 16,
            fontWeight: 600,
            margin: 0,
            color: "#ededed",
            fontFamily: FONT,
          }}
        >
          Clients
        </h1>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            background: "#ededed",
            color: "#0a0a0a",
            border: "none",
            borderRadius: 7,
            fontSize: 13,
            fontWeight: 500,
            fontFamily: FONT,
            cursor: "pointer",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <Plus size={14} strokeWidth={2} />
          Add Client to Tracking
        </button>
      </div>

      {/* ── Summary Stats ───────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {loading ? (
          <>
            {[0, 1, 2, 3].map((i) => (
              <SkeletonStatCard key={i} delay={i * 0.1} />
            ))}
          </>
        ) : (
          [
            { label: "Total Clients", value: stats.totalClients, color: "#ededed" },
            { label: "Total Live Engagements", value: stats.totalLive, color: "#34d399" },
            { label: "On Track", value: stats.onTrack, color: "#34d399" },
            { label: "At Risk", value: stats.atRisk, color: "#f87171" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "18px 20px",
                animation: animateIn ? `fadeUp 0.3s ease both` : "none",
                animationDelay: `${i * 0.04}s`,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: 8,
                  fontFamily: FONT,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: stat.color,
                  fontVariantNumeric: "tabular-nums",
                  fontFamily: FONT,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Filter Bar ──────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <div
          style={{
            position: "relative",
            flex: "0 0 240px",
          }}
        >
          <Search
            size={14}
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.25)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px 8px 32px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 7,
              color: "#ededed",
              fontSize: 13,
              fontFamily: FONT,
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.06)")}
          />
        </div>

        {/* Pace Filter Pills */}
        {(["on-track", "behind", "at-risk"]).map((pace) => {
          const cfg = PACE_CONFIG[pace];
          const active = paceFilters.has(pace);
          const isHovered = hoveredPill === pace;
          return (
            <button
              key={pace}
              onClick={() => togglePaceFilter(pace)}
              onMouseEnter={() => setHoveredPill(pace)}
              onMouseLeave={() => setHoveredPill(null)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                background: active ? cfg.bg : isHovered ? "rgba(255,255,255,0.03)" : "transparent",
                border: `1px solid ${active ? cfg.color + "33" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 20,
                color: active ? cfg.color : "rgba(255,255,255,0.4)",
                fontSize: 12,
                fontWeight: 500,
                fontFamily: FONT,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: active ? cfg.color : "rgba(255,255,255,0.25)",
                  flexShrink: 0,
                }}
              />
              {cfg.label}
            </button>
          );
        })}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Sort Buttons */}
        {[
          { key: "name", label: "Name" },
          { key: "pct", label: "Cadence %" },
          { key: "live", label: "Live Count" },
          { key: "total", label: "Total" },
        ].map((s) => {
          const active = sortKey === s.key;
          const isHovered = hoveredSort === s.key;
          return (
            <button
              key={s.key}
              onClick={() => handleSort(s.key)}
              onMouseEnter={() => setHoveredSort(s.key)}
              onMouseLeave={() => setHoveredSort(null)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "6px 10px",
                background: active
                  ? "rgba(255,255,255,0.06)"
                  : isHovered
                  ? "rgba(255,255,255,0.03)"
                  : "transparent",
                border: `1px solid ${active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 6,
                color: active ? "#ededed" : "rgba(255,255,255,0.4)",
                fontSize: 12,
                fontWeight: 500,
                fontFamily: FONT,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {s.label}
              {active && (
                <ArrowUpDown
                  size={11}
                  style={{
                    transform: sortDir === "desc" ? "scaleY(-1)" : "none",
                    opacity: 0.6,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Client Card Grid ────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 14,
        }}
      >
        {loading ? (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <SkeletonCard key={i} delay={i * 0.08} />
            ))}
          </>
        ) : (
          visibleFiltered.map((client, i) => {
            const pace = PACE_CONFIG[client.pace];
            const isHovered = hoveredCard === client.id;
            return (
              <div
                key={client.id}
                onClick={() => handleCardClick(client.name)}
                onMouseEnter={() => setHoveredCard(client.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: isHovered ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isHovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 10,
                  padding: 20,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  animation: animateIn ? `fadeUp 0.3s ease both` : "none",
                  animationDelay: `${i * 0.03}s`,
                }}
              >
                {/* Top Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 18,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: client.color,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#ededed",
                        fontFamily: FONT,
                      }}
                    >
                      {client.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {/* Pace Badge */}
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "3px 9px",
                        background: pace.bg,
                        borderRadius: 12,
                        fontSize: 11,
                        fontWeight: 500,
                        color: pace.color,
                        fontFamily: FONT,
                        lineHeight: 1.4,
                      }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: pace.color }} />
                      {pace.label}
                    </span>
                    {/* Three-dot menu */}
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === client.id ? null : client.id); }}
                        style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", padding: 2, display: "flex", borderRadius: 4 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                      >
                        <MoreVertical size={14} />
                      </button>
                      {menuOpen === client.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: "absolute", top: "100%", right: 0, marginTop: 4, zIndex: 50,
                            background: "#161616", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
                            minWidth: 180, padding: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                          }}
                        >
                          <button
                            onClick={() => { setEditTargetId(client.id); setEditTargetValue(cadenceLimits[client.name]?.toString() || "35"); setMenuOpen(null); }}
                            style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: FONT, cursor: "pointer", borderRadius: 4, textAlign: "left" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                          >
                            <Pencil size={13} /> Edit Target
                          </button>
                          <button
                            onClick={() => handleHide(client.id)}
                            style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: FONT, cursor: "pointer", borderRadius: 4, textAlign: "left" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                          >
                            <EyeOff size={13} /> Hide from Dashboard
                          </button>
                          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />
                          <button
                            onClick={() => { setDeleteConfirm(client); setMenuOpen(null); }}
                            style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", background: "none", border: "none", color: "#f87171", fontSize: 12, fontFamily: FONT, cursor: "pointer", borderRadius: 4, textAlign: "left" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.06)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                          >
                            <Trash2 size={13} /> Delete Client
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Middle: Three Columns */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 8,
                    marginBottom: 18,
                  }}
                >
                  {/* Live */}
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        color: "#34d399",
                        fontVariantNumeric: "tabular-nums",
                        fontFamily: FONT,
                        lineHeight: 1.2,
                      }}
                    >
                      {client.live}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginTop: 3,
                        fontFamily: FONT,
                      }}
                    >
                      live
                    </div>
                  </div>
                  {/* Total */}
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.25)",
                        fontVariantNumeric: "tabular-nums",
                        fontFamily: FONT,
                        lineHeight: 1.2,
                      }}
                    >
                      {client.total}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginTop: 3,
                        fontFamily: FONT,
                      }}
                    >
                      total
                    </div>
                  </div>
                  {/* Pending */}
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        color: client.pending > 0 ? "#fbbf24" : "rgba(255,255,255,0.6)",
                        fontVariantNumeric: "tabular-nums",
                        fontFamily: FONT,
                        lineHeight: 1.2,
                      }}
                    >
                      {client.pending}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginTop: 3,
                        fontFamily: FONT,
                      }}
                    >
                      pending
                    </div>
                  </div>
                </div>

                {/* Bottom: Progress Bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      flex: 1,
                      height: 4,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(client.pct, 100)}%`,
                        height: "100%",
                        background: pace.color,
                        borderRadius: 2,
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.4)",
                      fontVariantNumeric: "tabular-nums",
                      fontFamily: FONT,
                      minWidth: 32,
                      textAlign: "right",
                    }}
                  >
                    {client.pct}%
                  </span>
                </div>

                {/* Cadence target display */}
                {cadenceLimits[client.name] > 0 && (
                  <div style={{ marginTop: 8, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                    Target: {cadenceLimits[client.name]}/mo
                  </div>
                )}

                {/* Inline edit target overlay */}
                {editTargetId === client.id && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      marginTop: 10, padding: "10px 12px", background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
                    }}
                  >
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Monthly Cadence Target</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <input
                        type="number" min="0" value={editTargetValue}
                        onChange={(e) => setEditTargetValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSaveTarget(client.name); if (e.key === "Escape") setEditTargetId(null); }}
                        autoFocus
                        style={{
                          flex: 1, padding: "6px 10px", fontSize: 13, fontFamily: FONT, color: "#ededed",
                          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 6, outline: "none",
                        }}
                      />
                      <button
                        onClick={() => handleSaveTarget(client.name)}
                        style={{
                          padding: "6px 12px", fontSize: 12, fontWeight: 500, fontFamily: FONT,
                          color: "#0a0a0a", background: "#ededed", border: "none", borderRadius: 6, cursor: "pointer",
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditTargetId(null)}
                        style={{
                          padding: "6px 8px", fontSize: 12, fontFamily: FONT,
                          color: "rgba(255,255,255,0.5)", background: "none",
                          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, cursor: "pointer",
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Hidden clients section */}
      {hiddenClientsList.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => setShowHidden((v) => !v)}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 0",
              background: "none", border: "none", color: "rgba(255,255,255,0.35)",
              fontSize: 12, fontFamily: FONT, cursor: "pointer",
            }}
          >
            <ChevronDown size={14} style={{ transform: showHidden ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
            {hiddenClientsList.length} hidden client{hiddenClientsList.length > 1 ? "s" : ""}
          </button>
          {showHidden && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              {hiddenClientsList.map((c) => (
                <div
                  key={c.id}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "6px 12px",
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: FONT,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.color }} />
                  {c.name}
                  <button
                    onClick={() => handleRestore(c.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 4, padding: "2px 8px",
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 4, color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: FONT, cursor: "pointer",
                    }}
                  >
                    <RotateCcw size={10} /> Restore
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!loading && visibleFiltered.length === 0 && hiddenClientsList.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "rgba(255,255,255,0.25)",
            fontSize: 13,
            fontFamily: FONT,
          }}
        >
          No clients match your current filters.
        </div>
      )}

      {/* ── Add Client Modal ────────────────────────────────────────────── */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.60)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "overlayFadeIn 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 440,
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: 0,
              animation: "modalFadeIn 0.25s ease",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  margin: 0,
                  color: "#ededed",
                  fontFamily: FONT,
                }}
              >
                Add Client to Tracking
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                  borderRadius: 4,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ededed")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: FONT, display: "block", marginBottom: 6 }}>Company Name *</label>
                <input
                  type="text" value={newClientName} onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  onKeyDown={(e) => { if (e.key === "Enter") handleAddClient(); }}
                  autoFocus
                  style={{
                    width: "100%", padding: "9px 12px", fontSize: 13, fontFamily: FONT, color: "#ededed",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 7, outline: "none", transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.16)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: FONT, display: "block", marginBottom: 6 }}>Monthly Cadence Target</label>
                <input
                  type="number" min="0" value={newClientTarget} onChange={(e) => setNewClientTarget(e.target.value)}
                  style={{
                    width: 120, padding: "9px 12px", fontSize: 13, fontFamily: FONT, color: "#ededed",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 7, outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                display: "flex", justifyContent: "flex-end", gap: 10,
                padding: "16px 24px 20px", borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <button
                onClick={() => { setShowModal(false); setNewClientName(""); setNewClientTarget("35"); }}
                style={{
                  padding: "8px 16px", background: "transparent", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 7, color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500, fontFamily: FONT, cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                disabled={saving || !newClientName.trim()}
                style={{
                  padding: "8px 16px", background: saving || !newClientName.trim() ? "rgba(255,255,255,0.08)" : "#ededed",
                  border: "none", borderRadius: 7,
                  color: saving || !newClientName.trim() ? "rgba(255,255,255,0.3)" : "#0a0a0a",
                  fontSize: 13, fontWeight: 500, fontFamily: FONT, cursor: saving ? "wait" : "pointer",
                }}
              >
                {saving ? "Adding..." : "Add Client"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ───────────────────────────────────── */}
      {deleteConfirm && (
        <div
          onClick={() => setDeleteConfirm(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.60)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
            animation: "overlayFadeIn 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 400,
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: "24px",
              animation: "modalFadeIn 0.25s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(248,113,113,0.1)",
              }}>
                <Trash2 size={18} color="#f87171" />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "#ededed", fontFamily: FONT }}>
                Delete Client
              </h3>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: FONT, lineHeight: 1.5, margin: "0 0 20px" }}>
              Are you sure you want to remove <strong style={{ color: "#ededed" }}>{deleteConfirm.name}</strong> from tracking?
              This will delete the company and its cadence configuration. Engagement data in Supabase will remain intact.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: "8px 16px", background: "transparent", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 7, color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500, fontFamily: FONT, cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                style={{
                  padding: "8px 16px", background: "#f87171", border: "none",
                  borderRadius: 7, color: "#fff", fontSize: 13, fontWeight: 500, fontFamily: FONT, cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast Notification ───────────────────────────────────────────── */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            background: toast.type === "error" ? "rgba(248,113,113,0.15)" : "rgba(52,211,153,0.15)",
            border: `1px solid ${toast.type === "error" ? "rgba(248,113,113,0.3)" : "rgba(52,211,153,0.3)"}`,
            borderRadius: 8,
            color: toast.type === "error" ? "#f87171" : "#34d399",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: FONT,
            animation: "fadeUp 0.3s ease",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}
        >
          {toast.type === "error" ? <X size={14} /> : <Check size={14} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
