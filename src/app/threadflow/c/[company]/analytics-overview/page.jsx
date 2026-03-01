"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import { normalizeStatus as sharedNormalizeStatus, fetchThreadflowData, STATUS_COLORS as SHARED_STATUS_COLORS } from "@/lib/threadflow-data";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

/* ──────────────────────── constants ──────────────────────── */

const FONT = "'Geist', -apple-system, BlinkMacSystemFont, sans-serif";
const TABULAR = "tabular-nums";

const COLORS = {
  bg: "#0a0a0a",
  surface: "rgba(255,255,255,0.02)",
  border: "rgba(255,255,255,0.06)",
  textPrimary: "#ededed",
  textSecondary: "rgba(255,255,255,0.6)",
  textMuted: "rgba(255,255,255,0.25)",
  gridLine: "rgba(255,255,255,0.04)",
  axisText: "rgba(255,255,255,0.4)",
  tooltipBg: "#161616",
  tooltipBorder: "rgba(255,255,255,0.1)",
  blue: "#60a5fa",
  green: "#34d399",
  purple: "#8b5cf6",
  yellow: "#fbbf24",
  red: "#f87171",
  gray: "#71717a",
};

const DATE_RANGES = ["7d", "30d", "90d"];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// STATUS_COLOR_MAP and STATUS_LABEL_MAP replaced by sharedNormalizeStatus + SHARED_STATUS_COLORS

function getCadenceColor(pct) {
  if (pct >= 75) return COLORS.green;
  if (pct >= 50) return COLORS.yellow;
  return COLORS.red;
}

/* ──────────────────────── custom tooltip ──────────────────────── */

function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: COLORS.tooltipBg,
        border: `1px solid ${COLORS.tooltipBorder}`,
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        fontFamily: FONT,
        fontSize: 12,
        color: COLORS.textPrimary,
        lineHeight: 1.5,
      }}
    >
      {label && (
        <div
          style={{
            color: COLORS.textSecondary,
            marginBottom: 4,
            fontSize: 11,
          }}
        >
          {label}
        </div>
      )}
      {payload.map((entry, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontVariantNumeric: TABULAR,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: entry.color || entry.fill || COLORS.blue,
              flexShrink: 0,
            }}
          />
          <span style={{ color: COLORS.textSecondary }}>
            {entry.name || "Value"}:
          </span>
          <span style={{ fontWeight: 600 }}>
            {formatter ? formatter(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function CustomTooltipPct({ active, payload, label }) {
  return (
    <CustomTooltip
      active={active}
      payload={payload}
      label={label}
      formatter={(v) => `${v}%`}
    />
  );
}

/* ──────────────────────── skeleton loader ──────────────────────── */

function SkeletonCard({ height = 220, delay = 0 }) {
  return (
    <div
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 10,
        padding: 20,
        animation: `fadeUp 0.45s ease ${delay}ms both`,
      }}
    >
      <div
        style={{
          width: 160,
          height: 14,
          borderRadius: 4,
          background: "rgba(255,255,255,0.06)",
          marginBottom: 16,
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          width: "100%",
          height,
          borderRadius: 6,
          background: "rgba(255,255,255,0.03)",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ──────────────────────── page component ──────────────────────── */

export default function AnalyticsOverviewPage() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState("30d");
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ──── Firebase auth + data fetching ──── */
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
            console.error("Failed to fetch analytics data:", err);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }
    });
    return () => unsubscribe();
  }, [router]);

  /* ──── Build company lookup ──── */
  const companyMap = useMemo(() => {
    const map = {};
    companiesList.forEach((c) => {
      map[c.id] = c.name;
    });
    return map;
  }, [companiesList]);

  /* ──── Date range cutoff ──── */
  const dateRangeCutoff = useMemo(() => {
    const now = new Date();
    const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);
    cutoff.setHours(0, 0, 0, 0);
    return cutoff;
  }, [dateRange]);

  /* ──── Filtered items (by client + date range) ──── */
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Client filter
      if (selectedClient !== "All Clients") {
        const company = companiesList.find((c) => c.name === selectedClient);
        if (!company || item.company_id !== company.id) return false;
      }
      // Date range filter
      if (item.date_posted) {
        const itemDate = new Date(item.date_posted);
        if (itemDate < dateRangeCutoff) return false;
      }
      return true;
    });
  }, [allItems, selectedClient, companiesList, dateRangeCutoff]);

  /* ──── Chart 1: Engagement Over Time ──── */
  const engagementData = useMemo(() => {
    const dayMap = {};
    filteredItems.forEach((item) => {
      if (!item.date_posted) return;
      const d = new Date(item.date_posted);
      const key = d.toISOString().slice(0, 10);
      dayMap[key] = (dayMap[key] || 0) + 1;
    });

    const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
    const result = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const month = d.toLocaleString("en-US", { month: "short" });
      const day = d.getDate();
      result.push({
        date: `${month} ${day}`,
        fullDate: `${month} ${day}, ${d.getFullYear()}`,
        count: dayMap[key] || 0,
      });
    }
    return result;
  }, [filteredItems, dateRange]);

  /* ──── Chart 2: Top Clients by Item Count ──── */
  const topClientsData = useMemo(() => {
    // Count all items per company (respect date range but NOT client filter)
    const itemsInRange = allItems.filter((item) => {
      if (item.date_posted) {
        const itemDate = new Date(item.date_posted);
        if (itemDate < dateRangeCutoff) return false;
      }
      return true;
    });

    const counts = {};
    itemsInRange.forEach((item) => {
      const name = companyMap[item.company_id] || "Unknown";
      counts[name] = (counts[name] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [allItems, companyMap, dateRangeCutoff]);

  /* ──── Chart 3: Status Distribution ──── */
  const statusData = useMemo(() => {
    const counts = {};
    filteredItems.forEach((item) => {
      const label = sharedNormalizeStatus(item);
      counts[label] = (counts[label] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({
        name,
        value,
        color: SHARED_STATUS_COLORS[name] || COLORS.gray,
      }))
      .sort((a, b) => b.value - a.value);
  }, [filteredItems]);

  const statusTotal = useMemo(
    () => statusData.reduce((s, d) => s + d.value, 0),
    [statusData]
  );

  /* ──── Chart 4: Top Subreddits ──── */
  const subredditData = useMemo(() => {
    const counts = {};
    filteredItems.forEach((item) => {
      const sub = item.targeted_subreddit;
      if (!sub) return;
      const name = sub.startsWith("r/") ? sub : `r/${sub}`;
      counts[name] = (counts[name] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [filteredItems]);

  /* ──── Chart 5: Activity by Day of Week ──── */
  const dayOfWeekData = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    filteredItems.forEach((item) => {
      if (!item.date_posted) return;
      const d = new Date(item.date_posted);
      counts[d.getDay()]++;
    });

    return DAY_NAMES.map((name, i) => ({ name, count: counts[i] }));
  }, [filteredItems]);

  /* ──── Chart 6: Cadence Completion by Client ──── */
  const cadenceData = useMemo(() => {
    // For each company, compute % of items that are "live"
    const itemsInRange = allItems.filter((item) => {
      if (item.date_posted) {
        const itemDate = new Date(item.date_posted);
        if (itemDate < dateRangeCutoff) return false;
      }
      return true;
    });

    const totals = {};
    const liveCounts = {};
    itemsInRange.forEach((item) => {
      const name = companyMap[item.company_id] || "Unknown";
      totals[name] = (totals[name] || 0) + 1;
      if (sharedNormalizeStatus(item) === "Live") {
        liveCounts[name] = (liveCounts[name] || 0) + 1;
      }
    });

    return Object.keys(totals)
      .map((name) => ({
        name,
        pct: totals[name] > 0
          ? Math.round(((liveCounts[name] || 0) / totals[name]) * 100)
          : 0,
      }))
      .sort((a, b) => b.pct - a.pct);
  }, [allItems, companyMap, dateRangeCutoff]);

  const handleClientSelect = useCallback((client) => {
    setSelectedClient(client);
    setDropdownOpen(false);
  }, []);

  /* ──── styles ──── */

  const pageStyle = {
    minHeight: "100vh",
    background: COLORS.bg,
    fontFamily: FONT,
    color: COLORS.textPrimary,
    padding: "28px 32px 48px",
  };

  const headerStyle = {
    marginBottom: 24,
  };

  const titleStyle = {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.textPrimary,
    margin: 0,
    lineHeight: 1.4,
  };

  const subtitleStyle = {
    fontSize: 13,
    color: COLORS.textSecondary,
    margin: "4px 0 0",
    lineHeight: 1.4,
  };

  const controlsRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    flexWrap: "wrap",
  };

  const pillGroupStyle = {
    display: "flex",
    alignItems: "center",
    gap: 2,
    background: "rgba(255,255,255,0.04)",
    borderRadius: 8,
    padding: 2,
  };

  const pillStyle = (active) => ({
    fontSize: 12,
    fontWeight: 500,
    fontFamily: FONT,
    fontVariantNumeric: TABULAR,
    padding: "5px 14px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    transition: "all 0.15s ease",
    background: active ? "#fff" : "transparent",
    color: active ? "#0a0a0a" : COLORS.textSecondary,
  });

  const dropdownWrapperStyle = {
    position: "relative",
    marginLeft: 4,
  };

  const dropdownButtonStyle = {
    fontSize: 12,
    fontWeight: 500,
    fontFamily: FONT,
    padding: "6px 14px",
    borderRadius: 8,
    border: `1px solid ${COLORS.border}`,
    background: COLORS.surface,
    color: COLORS.textSecondary,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    transition: "border-color 0.15s ease",
    whiteSpace: "nowrap",
  };

  const dropdownMenuStyle = {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    minWidth: 180,
    background: COLORS.tooltipBg,
    border: `1px solid ${COLORS.tooltipBorder}`,
    borderRadius: 10,
    padding: "4px 0",
    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
    zIndex: 50,
    maxHeight: 280,
    overflowY: "auto",
  };

  const dropdownItemStyle = (active) => ({
    fontSize: 12,
    fontFamily: FONT,
    padding: "7px 14px",
    cursor: "pointer",
    background: active ? "rgba(255,255,255,0.06)" : "transparent",
    color: active ? COLORS.textPrimary : COLORS.textSecondary,
    border: "none",
    width: "100%",
    textAlign: "left",
    display: "block",
    transition: "background 0.1s ease",
  });

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  };

  const cardStyle = (delay) => ({
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    padding: 20,
    animation: mounted ? `fadeUp 0.45s ease ${delay}ms both` : "none",
  });

  const cardTitleStyle = {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.textPrimary,
    margin: "0 0 16px",
  };

  /* ──── render ──── */

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .analytics-dropdown-item:hover {
          background: rgba(255,255,255,0.06) !important;
        }
        .analytics-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .analytics-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
        }
      `}</style>

      <div style={pageStyle}>
        {/* ──── Header ──── */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>Analytics</h1>
          <p style={subtitleStyle}>
            Overview of engagement metrics across all clients
          </p>
        </div>

        {/* ──── Controls ──── */}
        <div style={controlsRowStyle}>
          <div style={pillGroupStyle}>
            {DATE_RANGES.map((r) => (
              <button
                key={r}
                style={pillStyle(dateRange === r)}
                onClick={() => setDateRange(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <div style={dropdownWrapperStyle}>
            <button
              style={dropdownButtonStyle}
              onClick={() => setDropdownOpen((o) => !o)}
            >
              {selectedClient}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.15s ease",
                }}
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <>
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 40,
                  }}
                  onClick={() => setDropdownOpen(false)}
                />
                <div
                  style={dropdownMenuStyle}
                  className="analytics-scrollbar"
                >
                  <button
                    className="analytics-dropdown-item"
                    style={dropdownItemStyle(selectedClient === "All Clients")}
                    onClick={() => handleClientSelect("All Clients")}
                  >
                    All Clients
                  </button>
                  {companiesList.map((c) => (
                    <button
                      key={c.id}
                      className="analytics-dropdown-item"
                      style={dropdownItemStyle(selectedClient === c.name)}
                      onClick={() => handleClientSelect(c.name)}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ──── Loading State ──── */}
        {loading && (
          <div style={gridStyle}>
            <SkeletonCard delay={0} />
            <SkeletonCard delay={60} />
            <SkeletonCard delay={120} height={190} />
            <SkeletonCard delay={180} />
            <SkeletonCard delay={240} />
            <SkeletonCard delay={300} height={320} />
          </div>
        )}

        {/* ──── Charts Grid ──── */}
        {!loading && (
          <div style={gridStyle}>
            {/* ── Chart 1: Engagements Over Time ── */}
            <div style={cardStyle(0)}>
              <h3 style={cardTitleStyle}>Engagements Over Time</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="areaBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={COLORS.blue}
                        stopOpacity={0.15}
                      />
                      <stop
                        offset="100%"
                        stopColor={COLORS.blue}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="none"
                    stroke={COLORS.gridLine}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{
                      fill: COLORS.axisText,
                      fontSize: 11,
                      fontFamily: FONT,
                    }}
                    axisLine={{ stroke: COLORS.gridLine }}
                    tickLine={false}
                    interval={dateRange === "7d" ? 0 : dateRange === "30d" ? 4 : 13}
                  />
                  <YAxis
                    tick={{
                      fill: COLORS.axisText,
                      fontSize: 11,
                      fontFamily: FONT,
                      fontVariantNumeric: TABULAR,
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                    allowDecimals={false}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: "rgba(255,255,255,0.08)",
                      strokeDasharray: "4 4",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke={COLORS.blue}
                    strokeWidth={2}
                    fill="url(#areaBlue)"
                    name="Engagements"
                    dot={false}
                    activeDot={{
                      r: 4,
                      fill: COLORS.blue,
                      stroke: COLORS.bg,
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* ── Chart 2: Top Clients by Item Count ── */}
            <div style={cardStyle(60)}>
              <h3 style={cardTitleStyle}>Top Clients by Live Count</h3>
              {topClientsData.length === 0 ? (
                <div
                  style={{
                    height: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.textMuted,
                    fontSize: 13,
                  }}
                >
                  No data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={topClientsData}
                    layout="vertical"
                    margin={{ left: 10, right: 20, top: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="none"
                      stroke={COLORS.gridLine}
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{
                        fill: COLORS.axisText,
                        fontSize: 11,
                        fontFamily: FONT,
                        fontVariantNumeric: TABULAR,
                      }}
                      axisLine={{ stroke: COLORS.gridLine }}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{
                        fill: COLORS.axisText,
                        fontSize: 11,
                        fontFamily: FONT,
                      }}
                      axisLine={false}
                      tickLine={false}
                      width={85}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Bar
                      dataKey="count"
                      fill={COLORS.green}
                      radius={[0, 4, 4, 0]}
                      barSize={14}
                      name="Live Count"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* ── Chart 3: Status Distribution ── */}
            <div style={cardStyle(120)}>
              <h3 style={cardTitleStyle}>Status Distribution</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ position: "relative", width: 190, height: 190 }}>
                  {statusData.length === 0 ? (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLORS.textMuted,
                        fontSize: 13,
                      }}
                    >
                      No data available
                    </div>
                  ) : (
                    <>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                          >
                            {statusData.map((entry, i) => (
                              <Cell key={i} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Center text */}
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                          pointerEvents: "none",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 22,
                            fontWeight: 700,
                            color: COLORS.textPrimary,
                            fontVariantNumeric: TABULAR,
                            lineHeight: 1.2,
                          }}
                        >
                          {statusTotal}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: COLORS.textSecondary,
                            marginTop: 2,
                          }}
                        >
                          Total
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Legend */}
                {statusData.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "8px 16px",
                      marginTop: 8,
                    }}
                  >
                    {statusData.map((entry) => (
                      <div
                        key={entry.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 11,
                          color: COLORS.textSecondary,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: entry.color,
                            flexShrink: 0,
                          }}
                        />
                        {entry.name}
                        <span
                          style={{
                            fontWeight: 600,
                            color: COLORS.textPrimary,
                            fontVariantNumeric: TABULAR,
                          }}
                        >
                          {entry.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Chart 4: Engagements by Subreddit ── */}
            <div style={cardStyle(180)}>
              <h3 style={cardTitleStyle}>Engagements by Subreddit</h3>
              {subredditData.length === 0 ? (
                <div
                  style={{
                    height: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.textMuted,
                    fontSize: 13,
                  }}
                >
                  No data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={subredditData}
                    layout="vertical"
                    margin={{ left: 10, right: 20, top: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="none"
                      stroke={COLORS.gridLine}
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{
                        fill: COLORS.axisText,
                        fontSize: 11,
                        fontFamily: FONT,
                        fontVariantNumeric: TABULAR,
                      }}
                      axisLine={{ stroke: COLORS.gridLine }}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{
                        fill: COLORS.axisText,
                        fontSize: 11,
                        fontFamily: FONT,
                      }}
                      axisLine={false}
                      tickLine={false}
                      width={95}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Bar
                      dataKey="count"
                      fill={COLORS.purple}
                      radius={[0, 4, 4, 0]}
                      barSize={14}
                      name="Engagements"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* ── Chart 5: Activity by Day of Week ── */}
            <div style={cardStyle(240)}>
              <h3 style={cardTitleStyle}>Activity by Day of Week</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={dayOfWeekData}
                  margin={{ left: -10, right: 10, top: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="none"
                    stroke={COLORS.gridLine}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: COLORS.axisText,
                      fontSize: 11,
                      fontFamily: FONT,
                    }}
                    axisLine={{ stroke: COLORS.gridLine }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fill: COLORS.axisText,
                      fontSize: 11,
                      fontFamily: FONT,
                      fontVariantNumeric: TABULAR,
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Bar
                    dataKey="count"
                    fill={COLORS.blue}
                    radius={[4, 4, 0, 0]}
                    barSize={28}
                    name="Activity"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* ── Chart 6: Cadence Completion by Client ── */}
            <div style={cardStyle(300)}>
              <h3 style={cardTitleStyle}>Cadence Completion by Client</h3>
              {cadenceData.length === 0 ? (
                <div
                  style={{
                    height: 320,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.textMuted,
                    fontSize: 13,
                  }}
                >
                  No data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart
                    data={cadenceData}
                    layout="vertical"
                    margin={{ left: 10, right: 20, top: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="none"
                      stroke={COLORS.gridLine}
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{
                        fill: COLORS.axisText,
                        fontSize: 11,
                        fontFamily: FONT,
                        fontVariantNumeric: TABULAR,
                      }}
                      axisLine={{ stroke: COLORS.gridLine }}
                      tickLine={false}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{
                        fill: COLORS.axisText,
                        fontSize: 11,
                        fontFamily: FONT,
                      }}
                      axisLine={false}
                      tickLine={false}
                      width={85}
                    />
                    <Tooltip content={<CustomTooltipPct />} cursor={false} />
                    <Bar
                      dataKey="pct"
                      radius={[0, 4, 4, 0]}
                      barSize={14}
                      name="Completion"
                    >
                      {cadenceData.map((entry, i) => (
                        <Cell key={i} fill={getCadenceColor(entry.pct)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
