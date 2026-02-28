"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Search, Plus, X, ArrowUpDown } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import { normalizeStatus as sharedNormalizeStatus, fetchThreadflowData, getCurrentMonthItems, STATUS_COLORS as SHARED_STATUS_COLORS } from "@/lib/threadflow-data";

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

  const [search, setSearch] = useState("");
  const [paceFilters, setPaceFilters] = useState(new Set());
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredSort, setHoveredSort] = useState(null);
  const [hoveredPill, setHoveredPill] = useState(null);
  const [animateIn, setAnimateIn] = useState(true);

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
            const { items, companies } = await fetchThreadflowData(token);
            setAllItems(items);
            setCompaniesList(companies);
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

  // ── Build client objects from real data (current month only) ─────────────
  const currentMonthItems = useMemo(() => getCurrentMonthItems(allItems), [allItems]);

  const clients = useMemo(() => {
    return companiesList.map((company) => {
      const companyItems = currentMonthItems.filter((item) => item.company_id === company.id);
      const total = companyItems.length;

      const live = companyItems.filter((item) => sharedNormalizeStatus(item) === "Live").length;
      const pending = companyItems.filter((item) => sharedNormalizeStatus(item) === "Pending").length;
      const approved = companyItems.filter((item) => sharedNormalizeStatus(item) === "Under Approval").length;

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
  }, [companiesList, currentMonthItems]);

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
          Add Client
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
          filtered.map((client, i) => {
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
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: pace.color,
                      }}
                    />
                    {pace.label}
                  </span>
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
              </div>
            );
          })
        )}
      </div>

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
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
                Add Client
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
            <div style={{ padding: "20px 24px" }}>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: FONT,
                  lineHeight: 1.6,
                }}
              >
                Clients are managed through the system administration panel. New companies added via the admin panel will automatically appear here with their engagement data.
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                padding: "16px 24px 20px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px 16px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 7,
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: FONT,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "#ededed";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
