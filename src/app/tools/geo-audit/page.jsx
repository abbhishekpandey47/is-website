"use client";

import { useState, useRef } from "react";

const SIGNALS = [
  "AI-quotable definitions",
  "Answer-first structure",
  "FAQ block presence",
  "Schema markup signals",
  "Heading hierarchy",
  "Citation authority",
];

const SIGNAL_MAX = {
  citations: 20,
  structure: 20,
  freshness: 15,
  authority: 20,
  entities: 15,
  directness: 10,
};

const STEPS = [
  "Crawling sitemap and pages…",
  "Fetching and parsing pages…",
  "Scoring 6 GEO signals per page…",
  "Ranking by opportunity score, selecting top 10…",
  "Generating rewrite suggestions…",
];

export default function GeoAuditPage() {
  const [domain, setDomain]       = useState("");
  const [pages, setPages]         = useState([{ url: "", content: "" }]);
  const [loading, setLoading]     = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [stepMsg, setStepMsg]     = useState("");
  const [error, setError]         = useState("");
  const [results, setResults]     = useState(null);
  const [markdown, setMarkdown]   = useState("");
  const resultsRef                = useRef(null);

  // ── Pages CRUD ──────────────────────────────────────────────────
  function addPage() {
    if (pages.length >= 5) return;
    setPages([...pages, { url: "", content: "" }]);
  }
  function removePage(i) {
    setPages(pages.filter((_, idx) => idx !== i));
  }
  function updatePage(i, field, value) {
    const next = [...pages];
    next[i] = { ...next[i], [field]: value };
    setPages(next);
  }

  // ── Run audit ────────────────────────────────────────────────────
  async function runAudit() {
    setError("");
    if (!domain.trim()) { setError("Please enter a domain."); return; }

    setLoading(true);
    setResults(null);
    setMarkdown("");
    setStepIndex(0);
    setStepMsg("");

    try {
      const res = await fetch("/api/geo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: domain.trim(),
          pages: pages.filter(p => p.url || p.content),
          maxPages: 50,
          topN: 10,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Request failed.");
      }

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer    = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop();

        for (const chunk of chunks) {
          if (!chunk.startsWith("data: ")) continue;
          const data = JSON.parse(chunk.slice(6));

          if (data.event === "progress") {
            setStepIndex(data.step - 1);
            setStepMsg(data.message);
          }
          if (data.event === "error") throw new Error(data.message);
          if (data.event === "complete") {
            setMarkdown(data.markdown || "");
            setResults(data);
            setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
          }
        }
      }
    } catch (err) {
      setError(err.message || "Audit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Download ─────────────────────────────────────────────────────
  function downloadReport() {
    if (!markdown) return;
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `geo-audit-${domain.replace(/https?:\/\//, "").replace(/\//g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Score colour ─────────────────────────────────────────────────
  function scoreColor(score, max = 100) {
    const pct = score / max;
    if (pct >= 0.7) return "#16a34a";
    if (pct >= 0.4) return "#d97706";
    return "#dc2626";
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "100px 32px 100px", fontFamily: "sans-serif" }}>

      {/* ── HEADER ───────────────────────────────────────────── */}
      <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", marginBottom: 14 }}>
        — Generative Engine Optimization
      </p>
      <h1 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 14 }}>
        Is your content <em style={{ fontStyle: "italic", color: "#d97706" }}>visible</em> to AI engines?
      </h1>
      <p style={{ fontSize: 15, color: "#555", maxWidth: 520, lineHeight: 1.65, marginBottom: 32 }}>
        Paste your page content below. We score each page across 6 GEO signals, identify exactly what&apos;s missing, and give you a prioritized fix list.
      </p>

      {/* ── SIGNAL PILLS ─────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 40 }}>
        {SIGNALS.map(s => (
          <div key={s} style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: "10px 14px", fontSize: 12, color: "#555" }}>
            • {s}
          </div>
        ))}
      </div>

      {/* ── FORM ─────────────────────────────────────────────── */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 24, marginBottom: 12 }}>

        {/* Domain */}
        <div style={{ marginBottom: 24 }}>
          <label htmlFor="geo-domain" style={{ display: "block", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 8 }}>
            Domain / Company name
          </label>
          <input
            id="geo-domain"
            type="text"
            placeholder="e.g. futuresearch.ai or InventDB"
            value={domain}
            onChange={e => setDomain(e.target.value)}
            disabled={loading}
            style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "11px 14px", fontSize: 13, boxSizing: "border-box", outline: "none" }}
          />
        </div>

        {/* Pages */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <label style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>
              Pages to audit
            </label>
            <button
              onClick={addPage}
              disabled={pages.length >= 5 || loading}
              style={{ border: "1px solid #d1d5db", borderRadius: 5, padding: "5px 12px", fontSize: 11, background: "none", cursor: "pointer", color: "#555" }}
            >
              + Add page
            </button>
          </div>

          {pages.map((page, i) => (
            <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 7, padding: 14, marginBottom: 8, background: "#f9fafb" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: "#aaa" }}>Page {i + 1}</span>
                {pages.length > 1 && (
                  <button onClick={() => removePage(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: 18, lineHeight: 1 }}>×</button>
                )}
              </div>
              <input
                type="text"
                placeholder="Page URL or path (optional)"
                value={page.url}
                onChange={e => updatePage(i, "url", e.target.value)}
                disabled={loading}
                style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 5, padding: "10px 13px", fontSize: 12, marginBottom: 8, boxSizing: "border-box", background: "#fff" }}
              />
              <textarea
                placeholder="Paste full page content here — title, headings, body text, any FAQs..."
                value={page.content}
                onChange={e => updatePage(i, "content", e.target.value)}
                disabled={loading}
                rows={5}
                style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 5, padding: "10px 13px", fontSize: 12, resize: "vertical", boxSizing: "border-box", background: "#fff" }}
              />
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 11, color: "#bbb", marginBottom: 24 }}>
        Paste full page text — title, headings, body. Up to 5 pages for a site-wide audit.
      </p>

      {/* ── RUN BUTTON ───────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <button
          onClick={runAudit}
          disabled={loading}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#d97706", color: "#fff", border: "none", borderRadius: 7, padding: "12px 24px", fontSize: 13, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
        >
          → {loading ? "Running audit..." : "Run GEO Audit"}
        </button>
        <span style={{ fontSize: 11, color: "#bbb" }}>Powered by Claude · ~20 sec</span>
      </div>

      {error && (
        <div style={{ marginTop: 12, padding: "12px 16px", border: "1px solid #fca5a5", borderRadius: 6, background: "#fff5f5", color: "#dc2626", fontSize: 13 }}>
          {error}
        </div>
      )}

      {/* ── LOADING STEPS ────────────────────────────────────── */}
      {loading && (
        <div style={{ marginTop: 36, border: "1px solid #e5e7eb", borderRadius: 8, padding: 28 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 16, margin: "0 0 16px" }}>
            Running audit
          </p>
          <div>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", fontSize: 13, color: i < stepIndex ? "#bbb" : i === stepIndex ? "#111" : "#ddd", fontWeight: i === stepIndex ? 600 : 400 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: i < stepIndex ? "#bbb" : i === stepIndex ? "#d97706" : "#e5e7eb", display: "inline-block", flexShrink: 0 }} />
                {step}
              </div>
            ))}
          </div>
          {stepMsg && <p style={{ fontSize: 11, color: "#888", marginTop: 12, marginBottom: 0 }}>{stepMsg}</p>}
        </div>
      )}

      {/* ── RESULTS ──────────────────────────────────────────── */}
      {results && (
        <div ref={resultsRef} style={{ marginTop: 56 }}>
          <hr style={{ marginBottom: 40, borderColor: "#e5e7eb" }} />

          {/* Title + download */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>GEO Audit — {domain}</h2>
              <p style={{ fontSize: 12, color: "#888", margin: 0 }}>
                {results.summary?.totalPages} pages audited &nbsp;·&nbsp; avg score {results.summary?.avgScore}/100 &nbsp;·&nbsp; {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <button
              onClick={downloadReport}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid #d1d5db", borderRadius: 6, padding: "10px 18px", background: "#d97706", color: "#fff", border: "none", borderRadius: 7, padding: "12px 24px", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}
            >
              ↓ Download audit-report.md
            </button>
          </div>

          {/* ── Summary cards ─────────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 10, marginBottom: 36 }}>
            {[
              { label: "Avg score",      value: `${results.summary?.avgScore}/100` },
              { label: "Pages audited",  value: results.summary?.totalPages },
              { label: "Below 30",       value: results.summary?.pagesBelow30 },
              { label: "Below 50",       value: results.summary?.pagesBelow50 },
              { label: "Weakest signal", value: results.summary?.weakestSignal },
            ].map(c => (
              <div key={c.label} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "16px 18px", background: "#f9fafb" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>{c.value}</div>
              </div>
            ))}
          </div>

          {/* ── Signal bars ───────────────────────────────── */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 14 }}>Signal breakdown (site average)</p>
            {Object.entries(results.summary?.signalAverages || {}).map(([sig, avg]) => {
              const max = SIGNAL_MAX[sig];
              const pct = Math.round(avg / max * 100);
              return (
                <div key={sig} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", color: "#888", width: 82, flexShrink: 0 }}>{sig}</span>
                  <div style={{ flex: 1, height: 4, background: "#e5e7eb", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: scoreColor(pct, 100), borderRadius: 2, transition: "width 0.8s ease" }} />
                  </div>
                  <span style={{ fontSize: 11, color: "#888", width: 44, textAlign: "right", flexShrink: 0 }}>{avg}/{max}</span>
                </div>
              );
            })}
          </div>

          {/* ── Full inventory table ───────────────────────── */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 14 }}>Full page inventory</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "#f3f4f6" }}>
                    {["URL", "Type", "Score", "Opportunity", "Top gaps"].map(h => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#666", borderBottom: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(results.allPages || []).map((p, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "9px 12px", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#374151" }}>{p.url}</td>
                      <td style={{ padding: "9px 12px", color: "#6b7280" }}>{p.type}</td>
                      <td style={{ padding: "9px 12px", fontWeight: 600, color: scoreColor(p.rawScore) }}>{p.rawScore}/100</td>
                      <td style={{ padding: "9px 12px", color: "#6b7280" }}>{p.opportunityScore}</td>
                      <td style={{ padding: "9px 12px", color: "#6b7280" }}>{(p.topGaps || []).slice(0, 2).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Top 10 rewrites ───────────────────────────── */}
          <div>
            <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 14 }}>Top 10 opportunities &amp; rewrites</p>

            {(() => {
              const rewriteMap = new Map((results.rewrites || []).map(r => [r.url, r]));
              return (results.topPages || []).map((page, i) => {
                const rw = rewriteMap.get(page.url);
                return (
                  <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 14, overflow: "hidden" }}>
                    {/* Card head */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", gap: 12 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 10, color: "#bbb", marginBottom: 2 }}>#{i + 1}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{page.title || page.url}</div>
                        <div style={{ fontSize: 11, color: "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{page.url}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        {(page.topGaps || []).slice(0, 2).map(g => (
                          <span key={g} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, border: "1px solid #fbbf24", color: "#d97706" }}>{g}</span>
                        ))}
                        <span style={{ fontSize: 13, fontWeight: 700, padding: "4px 12px", borderRadius: 4, border: "1px solid #e5e7eb", color: scoreColor(page.rawScore) }}>
                          {page.rawScore}/100
                        </span>
                      </div>
                    </div>

                    {/* Fixes */}
                    <div style={{ padding: 20 }}>
                      {rw?.rewrites?.length ? rw.rewrites.map((fix, j) => (
                        <div key={j} style={{ borderLeft: "2px solid #fbbf24", paddingLeft: 14, marginBottom: 16 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#d97706" }}>
                              Fix {j + 1} — {fix.signal}
                            </span>
                            <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, border: `1px solid ${fix.priority === "high" ? "#fca5a5" : "#e5e7eb"}`, color: fix.priority === "high" ? "#dc2626" : "#888" }}>
                              {fix.priority}
                            </span>
                          </div>
                          {fix.original && fix.original !== "Not present" && (
                            <div style={{ marginBottom: 10 }}>
                              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: "#bbb", marginBottom: 4 }}>Original</div>
                              <div style={{ fontSize: 13, color: "#888", fontStyle: "italic", lineHeight: 1.55, paddingLeft: 10, borderLeft: "1px solid #e5e7eb" }}>&ldquo;{fix.original}&rdquo;</div>
                            </div>
                          )}
                          <div style={{ marginBottom: 8 }}>
                            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: "#bbb", marginBottom: 4 }}>Suggested rewrite</div>
                            <div style={{ fontSize: 14, color: "#111", lineHeight: 1.65 }}>{fix.rewrite}</div>
                          </div>
                          <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>Why it helps: {fix.rationale}</div>
                        </div>
                      )) : (
                        <p style={{ fontSize: 13, color: "#bbb" }}>No rewrite suggestions generated for this page.</p>
                      )}
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {/* ── Download again at bottom ───────────────────── */}
          <div style={{ marginTop: 48, padding: "24px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, color: "#111" }}>Audit complete</div>
              <div style={{ fontSize: 13, color: "#666" }}>Download the full report to share with your client.</div>
            </div>
            <button
              onClick={downloadReport}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid #d1d5db", borderRadius: 6, padding: "10px 18px", background: "#d97706", color: "#fff", border: "none", borderRadius: 7, padding: "12px 24px", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}
            >
              ↓ Download audit-report.md
            </button>
          </div>

        </div>
      )}
    </div>
  );
}