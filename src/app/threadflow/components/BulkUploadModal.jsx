"use client";
import { AlertCircle, Check, Loader2, Upload, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const FONT_FAMILY = "'GeistSans', 'Geist Sans', system-ui, -apple-system, sans-serif";

// ── Column alias → internal field key (mirrors client-dashboard) ──────────────
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

// ── CSV parser (handles quoted fields) ───────────────────────────────────────
function parseCSVText(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return null;

  const parseLine = (line) => {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = !inQuotes;
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
    // Skip separator rows (e.g. "JAN 2026 SPRINT ───────")
    const first = (cols[0] || "").trim();
    if (!first || /^[-─=]+$/.test(first) || /sprint/i.test(first)) continue;
    if (cols.some((c) => c)) rows.push(cols);
  }
  return { headers, rows };
}

function autoMapHeaders(headers) {
  const map = {};
  headers.forEach((h, idx) => {
    const key = COLUMN_ALIASES[h.toLowerCase().trim()];
    if (key) map[idx] = key;
  });
  return map;
}

// ── extract sheet ID + gid from a Google Sheet URL ───────────────────────────
function parseSheetUrl(url) {
  const idMatch = url.match(/\/d\/([^/]+)/);
  const gidMatch = url.match(/[?&#]gid=(\d+)/);
  if (!idMatch) return null;
  return { sheetId: idMatch[1], gid: gidMatch ? gidMatch[1] : "0" };
}

// ─────────────────────────────────────────────────────────────────────────────

export default function BulkUploadModal({ isOpen, onClose, type, firebaseUser, onSuccess }) {
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [uploadData, setUploadData] = useState(null);
  const [columnMap, setColumnMap] = useState({});
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetLoading, setSheetLoading] = useState(false);
  const fileRef = useRef();

  const typeLabel = type === "post" ? "Original Posts (OP)" : "Comments";

  // fetch companies when modal opens
  useEffect(() => {
    if (!isOpen || !firebaseUser) return;
    firebaseUser.getIdToken().then((token) => {
      fetch("/api/companies", { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d) => setCompanies(d.data || []))
        .catch(() => {});
    });
  }, [isOpen, firebaseUser]);

  // reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setUploadData(null);
      setColumnMap({});
      setError("");
      setSuccess("");
      setSheetUrl("");
      setCompanyId("");
    }
  }, [isOpen]);

  // CSV/XLSX file selection
  const handleFileSelect = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setSuccess("");
    setUploadData(null);

    if (file.name.endsWith(".csv") || file.name.endsWith(".tsv") || file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const parsed = parseCSVText(evt.target.result);
        if (!parsed || parsed.rows.length === 0) { setError("Could not parse file or file is empty"); return; }
        setUploadData(parsed);
        setColumnMap(autoMapHeaders(parsed.headers));
      };
      reader.readAsText(file);
    } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const ExcelJS = (await import("exceljs")).default;
          const wb = new ExcelJS.Workbook();
          await wb.xlsx.load(evt.target.result);
          const ws = wb.worksheets[0];
          if (!ws || ws.rowCount < 2) { setError("Spreadsheet is empty or has no data rows"); return; }
          const headers = [];
          const rows = [];
          ws.eachRow((row, rowNum) => {
            const vals = [];
            row.eachCell({ includeEmpty: true }, (cell) => vals.push(cell.text || ""));
            if (rowNum === 1) headers.push(...vals);
            else if (vals.some((v) => v)) rows.push(vals);
          });
          if (rows.length === 0) { setError("No data rows found"); return; }
          setUploadData({ headers, rows });
          setColumnMap(autoMapHeaders(headers));
        } catch (err) {
          console.error("Excel parse error:", err);
          setError("Failed to parse Excel file");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setError("Unsupported format — use .csv or .xlsx");
    }
    e.target.value = "";
  }, []);

  // Google Sheet URL fetch
  const handleSheetUrl = useCallback(async () => {
    if (!sheetUrl.trim()) return;
    const parsed = parseSheetUrl(sheetUrl.trim());
    if (!parsed) { setError("Could not parse Google Sheet URL — copy the URL from your browser address bar"); return; }
    setSheetLoading(true);
    setError("");
    try {
      const exportUrl = `https://docs.google.com/spreadsheets/d/${parsed.sheetId}/export?format=csv&gid=${parsed.gid}`;
      const res = await fetch(`/api/sheet-proxy?url=${encodeURIComponent(exportUrl)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not fetch sheet — ensure it is shared as 'Anyone with link can view'");
      }
      const csv = await res.text();
      const data = parseCSVText(csv);
      if (!data || data.rows.length === 0) { setError("Sheet appears empty or could not be parsed"); return; }
      setUploadData(data);
      setColumnMap(autoMapHeaders(data.headers));
    } catch (err) {
      setError(err.message);
    } finally {
      setSheetLoading(false);
    }
  }, [sheetUrl]);

  // import handler
  const handleImport = useCallback(async () => {
    if (!uploadData || !companyId) return;
    setImporting(true);
    setError("");
    try {
      const mappedRows = uploadData.rows.map((row) => {
        const obj = {};
        Object.entries(columnMap).forEach(([colIdx, fieldKey]) => {
          if (fieldKey && fieldKey !== "_skip") obj[fieldKey] = row[Number(colIdx)] || "";
        });
        return obj;
      });

      const validRows = mappedRows.filter(
        (r) => (r.title && r.title.trim()) || (r.engagementText && r.engagementText.trim())
      );

      if (validRows.length === 0) {
        setError("No valid rows to import — need at least a Title or Engagement Text column mapped");
        setImporting(false);
        return;
      }

      const token = await firebaseUser.getIdToken(true);
      const res = await fetch("/api/engagement/import", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, type, rows: validRows }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || `Import failed (${res.status})`);

      const companyName = companies.find((c) => c.id === companyId)?.name || "";
      setSuccess(`Successfully imported ${result.imported} ${typeLabel} for ${companyName}`);

      setTimeout(() => { onSuccess?.({ imported: result.imported, type }); }, 1800);
    } catch (err) {
      console.error("Import error:", err);
      setError(err.message);
    } finally {
      setImporting(false);
    }
  }, [uploadData, columnMap, companyId, type, firebaseUser, companies, typeLabel, onSuccess]);

  if (!isOpen) return null;

  const mappedCount = Object.values(columnMap).filter((v) => v && v !== "_skip").length;
  const canImport = companyId && mappedCount > 0 && !importing && !success;

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        backgroundColor: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(4px)",
        zIndex: 10000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, fontFamily: FONT_FAMILY,
      }}
      onClick={(e) => { if (e.target === e.currentTarget && !importing) onClose(); }}
    >
      <div style={{
        width: "100%", maxWidth: 860, maxHeight: "90vh",
        backgroundColor: "#141414",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Upload size={16} style={{ color: "#fbbf24" }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: "#ededed" }}>Bulk Upload {typeLabel}</span>
            {uploadData && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>· {uploadData.rows.length} rows detected</span>}
          </div>
          <button onClick={() => { if (!importing) onClose(); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: importing ? "not-allowed" : "pointer", padding: 4 }}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px", overflow: "auto", flex: 1, color: "#ededed" }}>

          {/* Step 1: Company */}
          <div style={{ marginBottom: 20, padding: "16px 18px", borderRadius: 10, border: companyId ? "1px solid rgba(52,211,153,0.2)" : "1px solid rgba(251,191,36,0.35)", backgroundColor: companyId ? "rgba(52,211,153,0.04)" : "rgba(251,191,36,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: companyId ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)", border: `1px solid ${companyId ? "#34d399" : "#fbbf24"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: companyId ? "#34d399" : "#fbbf24", flexShrink: 0 }}>
                {companyId ? "✓" : "1"}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: companyId ? "#34d399" : "#fbbf24" }}>Select Company</span>
              {!companyId && <span style={{ fontSize: 11, color: "rgba(251,191,36,0.7)", marginLeft: 4 }}>— required before you can import</span>}
            </div>
            <select value={companyId} onChange={(e) => setCompanyId(e.target.value)} style={{ width: "100%", fontSize: 13, padding: "8px 12px", backgroundColor: "#1a1a1a", border: `1px solid ${companyId ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.1)"}`, borderRadius: 7, color: companyId ? "#ededed" : "rgba(255,255,255,0.4)", fontFamily: FONT_FAMILY, cursor: "pointer", outline: "none" }}>
              <option value="">— Select a company —</option>
              {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Step 2: File upload */}
          <div style={{ marginBottom: 20, opacity: companyId ? 1 : 0.4, pointerEvents: companyId ? "auto" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>2</span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Upload File</span>
            </div>
            <div
              onClick={() => fileRef.current?.click()}
              style={{ border: "1.5px dashed rgba(255,255,255,0.12)", borderRadius: 8, padding: "20px 24px", textAlign: "center", cursor: "pointer", backgroundColor: "rgba(255,255,255,0.02)", marginBottom: 12 }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(251,191,36,0.35)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
            >
              <Upload size={20} style={{ color: "rgba(255,255,255,0.25)", marginBottom: 8 }} />
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Drop CSV / XLSX here or <span style={{ color: "#fbbf24" }}>click to browse</span></div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>Supports: .csv, .xlsx, .xls</div>
            </div>
            <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" onChange={handleFileSelect} style={{ display: "none" }} />

            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 6, textAlign: "center" }}>— or paste a Google Sheet URL —</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text" value={sheetUrl} onChange={(e) => setSheetUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSheetUrl()}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                style={{ flex: 1, fontSize: 12, padding: "8px 12px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, color: "#ededed", fontFamily: FONT_FAMILY, outline: "none" }}
              />
              <button onClick={handleSheetUrl} disabled={sheetLoading || !sheetUrl.trim()} style={{ padding: "8px 14px", fontSize: 12, fontWeight: 500, fontFamily: FONT_FAMILY, backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, color: "rgba(255,255,255,0.6)", cursor: sheetLoading || !sheetUrl.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                {sheetLoading && <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} />}
                Load Sheet
              </button>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 5 }}>Sheet must be shared as "Anyone with link can view"</div>
          </div>

          {/* Step 3: Column mapping */}
          {uploadData && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>3</span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Column Mapping</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>(auto-detected · adjust if needed)</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 24px 1fr", gap: "8px 0", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Spreadsheet Column</span>
                <span />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Maps To</span>
                {uploadData.headers.map((header, idx) => (
                  <div key={idx} style={{ display: "contents" }}>
                    <div style={{ fontSize: 13, color: "#ededed", padding: "6px 10px", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 5, border: "1px solid rgba(255,255,255,0.06)" }}>
                      {header || `(Column ${idx + 1})`}
                    </div>
                    <span style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: 12 }}>→</span>
                    <select
                      value={columnMap[idx] || "_skip"}
                      onChange={(e) => setColumnMap((prev) => ({ ...prev, [idx]: e.target.value }))}
                      style={{ fontSize: 12, padding: "6px 10px", backgroundColor: "#1a1a1a", border: `1px solid ${columnMap[idx] && columnMap[idx] !== "_skip" ? "rgba(251,191,36,0.25)" : "rgba(255,255,255,0.08)"}`, borderRadius: 5, color: columnMap[idx] && columnMap[idx] !== "_skip" ? "#fbbf24" : "rgba(255,255,255,0.4)", fontFamily: FONT_FAMILY, cursor: "pointer", outline: "none" }}
                    >
                      <option value="_skip">-- Skip --</option>
                      {TARGET_FIELDS.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              {/* Preview table */}
              <div style={{ marginTop: 18 }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>
                  Preview (first {Math.min(5, uploadData.rows.length)} of {uploadData.rows.length} rows)
                </div>
                <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                    <thead>
                      <tr style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                        {uploadData.headers.map((h, i) => (
                          <th key={i} style={{ padding: "6px 10px", textAlign: "left", color: columnMap[i] && columnMap[i] !== "_skip" ? "#fbbf24" : "rgba(255,255,255,0.3)", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.06)", whiteSpace: "nowrap" }}>
                            {h || `Col ${i + 1}`}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {uploadData.rows.slice(0, 5).map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          {uploadData.headers.map((_, ci) => (
                            <td key={ci} style={{ padding: "5px 10px", color: "rgba(255,255,255,0.55)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {row[ci] || ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {uploadData.rows.length > 5 && (
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 6, textAlign: "right" }}>
                    … and {uploadData.rows.length - 5} more rows
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error / Success */}
          {error && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 14px", backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 7, marginBottom: 12 }}>
              <AlertCircle size={14} style={{ color: "#f87171", flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12, color: "#f87171" }}>{error}</span>
            </div>
          )}
          {success && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", backgroundColor: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 7, marginBottom: 12 }}>
              <Check size={14} style={{ color: "#34d399", flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#34d399" }}>{success}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            {uploadData ? `${mappedCount} of ${uploadData.headers.length} columns mapped` : "No file loaded"}
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => { if (!importing) onClose(); }} disabled={importing} style={{ padding: "8px 18px", fontSize: 12, fontWeight: 500, fontFamily: FONT_FAMILY, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 7, color: "rgba(255,255,255,0.6)", cursor: importing ? "not-allowed" : "pointer" }}>
              Cancel
            </button>
            <button onClick={handleImport} disabled={!canImport} style={{ padding: "8px 22px", fontSize: 12, fontWeight: 600, fontFamily: FONT_FAMILY, backgroundColor: canImport ? "rgba(251,191,36,0.15)" : "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 7, color: canImport ? "#fbbf24" : "rgba(251,191,36,0.35)", cursor: canImport ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s ease" }}>
              {importing ? (
                <><Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />Importing…</>
              ) : (
                <><Upload size={13} />Import {uploadData ? uploadData.rows.length : 0} {typeLabel}</>
              )}
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
