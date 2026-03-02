"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import {
  normalizeStatus as sharedNormalizeStatus,
  fetchThreadflowData,
  fetchCadenceConfig,
  buildCadenceMap,
  STATUS_COLORS as SHARED_STATUS_COLORS,
} from "@/lib/threadflow-data";
import { ExternalLink } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_COLORS = SHARED_STATUS_COLORS;

const FONT_FAMILY =
  "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const TABULAR = { fontVariantNumeric: "tabular-nums" };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCurrentMonth() {
  const d = new Date();
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeStatus(item) {
  return sharedNormalizeStatus(item);
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function buildWeeklyData(items) {
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

function formatLastUpdated() {
  const now = new Date();
  return now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

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

function SkeletonPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        fontFamily: FONT_FAMILY,
      }}
    >
      <style>{pulseKeyframes}</style>
      {/* Navbar skeleton */}
      <div
        style={{
          height: 56,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          gap: 16,
        }}
      >
        <SkeletonBlock width={28} height={28} borderRadius={6} />
        <SkeletonBlock width={120} height={18} />
        <div style={{ flex: 1 }} />
        <SkeletonBlock width={180} height={14} />
      </div>
      <div style={{ padding: "32px 40px", maxWidth: 1280, margin: "0 auto" }}>
        {/* Stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 12,
            marginBottom: 28,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <SkeletonBlock key={i} width="100%" height={80} borderRadius={10} />
          ))}
        </div>
        {/* Table */}
        <SkeletonBlock
          width="100%"
          height={340}
          borderRadius={10}
          style={{ marginBottom: 28 }}
        />
        {/* Bottom cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <SkeletonBlock width="100%" height={280} borderRadius={10} />
          <SkeletonBlock width="100%" height={280} borderRadius={10} />
        </div>
      </div>
    </div>
  );
}

// ─── Not Found ────────────────────────────────────────────────────────────────

function NotFoundView({ slug }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#ededed",
        fontFamily: FONT_FAMILY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "rgba(255,255,255,0.08)",
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          404
        </div>
        <p
          style={{
            fontSize: 16,
            fontWeight: 500,
            marginBottom: 8,
          }}
        >
          Client not found
        </p>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.35)",
            maxWidth: 340,
          }}
        >
          No client matches &ldquo;{slug}&rdquo;. Check the URL and try again.
        </p>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ companyName }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 20px",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          fontSize: 24,
        }}
      >
        <span style={{ opacity: 0.3 }}>&#8212;</span>
      </div>
      <p
        style={{
          fontSize: 15,
          fontWeight: 500,
          marginBottom: 6,
        }}
      >
        No engagements yet
      </p>
      <p
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.35)",
          maxWidth: 360,
          margin: "0 auto",
          lineHeight: 1.5,
        }}
      >
        There are no Reddit engagements for {companyName} this month. Engagements
        will appear here once they are created.
      </p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ClientShareableDashboard() {
  const params = useParams();
  const companySlug = (params.company || "").toLowerCase();

  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);
  const [cadenceTargets, setCadenceTargets] = useState({});
  const [animateIn, setAnimateIn] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [lastUpdated] = useState(() => formatLastUpdated());
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 15;

  // ─── Auth + data fetching ───
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        return;
      }
      const fetchData = async () => {
        try {
          const token = await user.getIdToken();
          const [{ items, companies }, configs] = await Promise.all([
            fetchThreadflowData(token),
            fetchCadenceConfig(),
          ]);
          setAllItems(items);
          setCompaniesList(companies);
          const apiMap = buildCadenceMap(configs);
          if (Object.keys(apiMap).length > 0) {
            setCadenceTargets(apiMap);
            try { localStorage.setItem("cadence_targets", JSON.stringify(apiMap)); } catch (e) { /* noop */ }
          } else {
            try {
              const saved = localStorage.getItem("cadence_targets");
              if (saved) setCadenceTargets(JSON.parse(saved));
            } catch (e) { /* noop */ }
          }
        } catch (err) {
          console.error("Error fetching dashboard data:", err);
          try {
            const saved = localStorage.getItem("cadence_targets");
            if (saved) setCadenceTargets(JSON.parse(saved));
          } catch (e) { /* noop */ }
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    });
    return () => unsubscribe();
  }, []);

  // Animate entrance
  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
    }
  }, [loading]);

  // ─── Resolve company from slug ───
  const matchedCompany = useMemo(() => {
    if (!companiesList.length) return null;
    return (
      companiesList.find((c) => slugify(c.name) === companySlug) || null
    );
  }, [companiesList, companySlug]);

  // ─── Derived data ───
  const clientItems = useMemo(() => {
    if (!matchedCompany) return [];
    return allItems.filter((item) => item.company_id === matchedCompany.id);
  }, [allItems, matchedCompany]);

  const clientEngagements = useMemo(() => {
    return clientItems.map((item, idx) => ({
      id: item.id || `item-${idx}`,
      type: item.type || "post",
      topic: item.category || item.targeted_subreddit || "--",
      title: item.title || "(untitled)",
      engagementText: item.engagement_text || "",
      status: normalizeStatus(item),
      publishedUrl: item.posted_link || "",
      date: item.date_posted ? item.date_posted.split("T")[0] : "--",
      subreddit: item.targeted_subreddit || "",
    }));
  }, [clientItems]);

  const liveCount = useMemo(
    () => clientEngagements.filter((e) => e.status === "Live").length,
    [clientEngagements]
  );
  const pendingCount = useMemo(
    () => clientEngagements.filter((e) => e.status === "Pending").length,
    [clientEngagements]
  );
  const underApprovalCount = useMemo(
    () => clientEngagements.filter((e) => e.status === "Under Approval").length,
    [clientEngagements]
  );
  const removedCount = useMemo(
    () => clientEngagements.filter((e) => e.status === "Removed").length,
    [clientEngagements]
  );
  const archivedCount = useMemo(
    () => clientEngagements.filter((e) => e.status === "Archived").length,
    [clientEngagements]
  );
  const totalEngagements = clientEngagements.length;

  const statCards = [
    { label: "PENDING", count: pendingCount, color: STATUS_COLORS.Pending },
    { label: "UNDER APPROVAL", count: underApprovalCount, color: STATUS_COLORS["Under Approval"] },
    { label: "LIVE", count: liveCount, color: STATUS_COLORS.Live },
    { label: "REMOVED", count: removedCount, color: STATUS_COLORS.Removed },
    { label: "ARCHIVED", count: archivedCount, color: STATUS_COLORS.Archived },
  ];

  // Cadence target from Supabase (read-only on this page)
  const cadenceTarget = matchedCompany && cadenceTargets[matchedCompany.name]
    ? cadenceTargets[matchedCompany.name]
    : totalEngagements;

  const progressPct =
    cadenceTarget > 0 ? (liveCount / cadenceTarget) * 100 : 0;
  const progressColor =
    progressPct > 60 ? "#34d399" : progressPct >= 30 ? "#fbbf24" : "#f87171";

  const statusBreakdown = [
    { status: "Live", count: liveCount, color: STATUS_COLORS.Live },
    { status: "Pending", count: pendingCount, color: STATUS_COLORS.Pending },
    { status: "Under Approval", count: underApprovalCount, color: STATUS_COLORS["Under Approval"] },
    { status: "Removed", count: removedCount, color: STATUS_COLORS.Removed },
    { status: "Archived", count: archivedCount, color: STATUS_COLORS.Archived },
  ];
  const maxStatusCount = Math.max(...statusBreakdown.map((s) => s.count), 1);

  const weeklyData = useMemo(() => buildWeeklyData(clientItems), [clientItems]);
  const chartMax = Math.max(...weeklyData.map((w) => w.count), 1);

  const fadeUp = (i) => ({
    opacity: animateIn ? 1 : 0,
    transform: animateIn ? "translateY(0)" : "translateY(6px)",
    transition: `opacity 0.3s ease ${i * 0.04}s, transform 0.3s ease ${i * 0.04}s`,
  });

  // ─── Loading state ───
  if (loading) {
    return <SkeletonPage />;
  }

  // ─── 404: no matching company ───
  if (!loading && companiesList.length > 0 && !matchedCompany) {
    return <NotFoundView slug={companySlug} />;
  }

  // ─── No auth / no companies loaded yet ───
  if (!matchedCompany) {
    return <SkeletonPage />;
  }

  const companyName = matchedCompany.name;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#ededed",
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{pulseKeyframes}</style>

      {/* ─── Top Navbar ─── */}
      <nav
        style={{
          height: 56,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: "linear-gradient(135deg, #ededed 0%, #a0a0a0 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#0a0a0a",
              lineHeight: 1,
            }}
          >
            I
          </span>
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#ededed",
            marginRight: 16,
          }}
        >
          Infrasity
        </span>
        <span
          style={{
            width: 1,
            height: 20,
            backgroundColor: "rgba(255,255,255,0.08)",
            marginRight: 16,
          }}
        />
        {/* Company dot + name */}
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#ededed",
            marginRight: 8,
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 14, fontWeight: 500 }}>{companyName}</span>
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            marginLeft: 12,
          }}
        >
          {getCurrentMonth()}
        </span>
        <div style={{ flex: 1 }} />
        {/* Last updated */}
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            ...TABULAR,
          }}
        >
          Last updated: {lastUpdated}
        </span>
      </nav>

      {/* ─── Main Content ─── */}
      <div
        style={{
          flex: 1,
          padding: "32px 40px",
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Page header */}
        <div
          style={{
            ...fadeUp(0),
            marginBottom: 28,
          }}
        >
          <h1
            style={{
              fontSize: 20,
              fontWeight: 600,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Engagement Overview
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              margin: "6px 0 0",
            }}
          >
            Reddit engagement tracker for {companyName} &middot;{" "}
            {getCurrentMonth()}
          </p>
        </div>

        {/* Empty state */}
        {totalEngagements === 0 ? (
          <div style={fadeUp(1)}>
            <EmptyState companyName={companyName} />
          </div>
        ) : (
          <>
            {/* ─── Stat Cards ─── */}
            <div
              style={{
                ...fadeUp(1),
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 12,
                marginBottom: 28,
              }}
            >
              {statCards.map((card) => (
                <div
                  key={card.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 8,
                    padding: "16px 18px",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
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
                        color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase",
                      }}
                    >
                      {card.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 600,
                      lineHeight: 1,
                      ...TABULAR,
                    }}
                  >
                    {card.count}
                  </span>
                </div>
              ))}
            </div>

            {/* ─── Engagement Table ─── */}
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500 }}>
                    Engagements
                  </span>
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
                    {clientEngagements.length}
                  </span>
                </div>
              </div>

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
                      {[
                        "#",
                        "Type",
                        "Title",
                        "Subreddit",
                        "Engagement Text",
                        "Status",
                        "Link",
                        "Date",
                      ].map((h, i) => (
                        <th
                          key={i}
                          style={{
                            padding: "10px 14px",
                            textAlign: "left",
                            fontSize: 11,
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.35)",
                            borderBottom:
                              "1px solid rgba(255,255,255,0.06)",
                            whiteSpace: "nowrap",
                            letterSpacing: "0.02em",
                            ...(i === 0
                              ? { width: 40, textAlign: "center" }
                              : {}),
                            ...(i === 1 ? { minWidth: 80 } : {}),
                            ...(i === 2 ? { minWidth: 180 } : {}),
                            ...(i === 3 ? { minWidth: 120 } : {}),
                            ...(i === 4
                              ? { minWidth: 220, maxWidth: 300 }
                              : {}),
                            ...(i === 6 ? { minWidth: 80 } : {}),
                            ...(i === 7 ? { minWidth: 90 } : {}),
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
                      const paginatedEngagements = clientEngagements.slice(startIndex, startIndex + ROWS_PER_PAGE);
                      return paginatedEngagements.map((eng, idx) => {
                      const isRowHovered = hoveredRow === eng.id;
                      return (
                        <tr
                          key={eng.id}
                          onMouseEnter={() => setHoveredRow(eng.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                          style={{
                            backgroundColor: isRowHovered
                              ? "rgba(255,255,255,0.02)"
                              : "transparent",
                            transition: "background-color 0.15s ease",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 14px",
                              textAlign: "center",
                              color: "rgba(255,255,255,0.25)",
                              fontSize: 12,
                              borderBottom:
                                "1px solid rgba(255,255,255,0.04)",
                              ...TABULAR,
                            }}
                          >
                            {startIndex + idx + 1}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              borderBottom:
                                "1px solid rgba(255,255,255,0.04)",
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
                                backgroundColor:
                                  eng.type === "post"
                                    ? "rgba(96,165,250,0.12)"
                                    : "rgba(52,211,153,0.12)",
                                color:
                                  eng.type === "post"
                                    ? "#60a5fa"
                                    : "#34d399",
                                textTransform: "capitalize",
                              }}
                            >
                              {eng.type}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              borderBottom:
                                "1px solid rgba(255,255,255,0.04)",
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
                              borderBottom:
                                "1px solid rgba(255,255,255,0.04)",
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
                              borderBottom:
                                "1px solid rgba(255,255,255,0.04)",
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
                            {eng.engagementText || (
                              <span
                                style={{
                                  color: "rgba(255,255,255,0.15)",
                                }}
                              >
                                &mdash;
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              borderBottom:
                                "1px solid rgba(255,255,255,0.04)",
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
                                color:
                                  STATUS_COLORS[eng.status] ||
                                  "#71717a",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <span
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: "50%",
                                  backgroundColor:
                                    STATUS_COLORS[eng.status] ||
                                    "#71717a",
                                }}
                              />
                              {eng.status}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              borderBottom:
                                "1px solid rgba(255,255,255,0.04)",
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
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.opacity = "0.7")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.opacity = "1")
                                }
                              >
                                Link
                                <ExternalLink size={11} />
                              </a>
                            ) : (
                              <span
                                style={{
                                  color: "rgba(255,255,255,0.15)",
                                }}
                              >
                                &mdash;
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              borderBottom:
                                "1px solid rgba(255,255,255,0.04)",
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
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {(() => {
                const totalPages = Math.ceil(clientEngagements.length / ROWS_PER_PAGE);
                const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
                if (totalPages <= 1) return null;
                return (
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                    <span style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>
                      Showing {startIndex + 1}&ndash;{Math.min(startIndex + ROWS_PER_PAGE, clientEngagements.length)} of {clientEngagements.length}
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

            {/* ─── Two-Column Bottom Section ─── */}
            <div
              style={{
                ...fadeUp(3),
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 28,
              }}
            >
              {/* Left: Monthly Cadence Progress */}
              <div
                style={{
                  padding: "22px 24px",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500 }}>
                    Monthly Cadence
                  </span>
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: progressColor,
                      ...TABULAR,
                    }}
                  >
                    {liveCount}/{cadenceTarget}
                  </span>
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
                      transition:
                        "width 0.4s ease, background-color 0.3s ease",
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: 24,
                    ...TABULAR,
                  }}
                >
                  {liveCount} live of {cadenceTarget} target engagements
                </div>

                {/* Weekly Chart */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 16,
                    height: 120,
                  }}
                >
                  {weeklyData.map((w, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          gap: 4,
                          height: 90,
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            height: `${(w.count / chartMax) * 100}%`,
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
                      <span
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.35)",
                          ...TABULAR,
                        }}
                      >
                        {w.week}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginTop: 14,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        backgroundColor: "#34d399",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      Engagements
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Status Breakdown */}
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
                <span
                  style={{ fontSize: 14, fontWeight: 500, marginBottom: 20 }}
                >
                  Status Breakdown
                </span>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginBottom: 28,
                  }}
                >
                  {statusBreakdown.map((s) => (
                    <div
                      key={s.status}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.5)",
                          width: 66,
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
                            width:
                              maxStatusCount > 0
                                ? `${(s.count / maxStatusCount) * 100}%`
                                : "0%",
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

                {/* Total Engagements Summary */}
                <div
                  style={{
                    marginTop: "auto",
                    padding: "16px 18px",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: 12,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    Total Engagements
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 24,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 36,
                        fontWeight: 600,
                        minWidth: 48,
                        textAlign: "center",
                        ...TABULAR,
                      }}
                    >
                      {totalEngagements}
                    </span>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.25)",
                      marginTop: 8,
                      ...TABULAR,
                    }}
                  >
                    posts &amp; comments
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ─── Footer ─── */}
      <div
        style={{
          padding: "20px 32px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.02em",
          }}
        >
          Powered by Infrasity
        </span>
      </div>
    </div>
  );
}
