/**
 * GET /api/sheet-proxy?url=<encoded-google-sheet-export-url>
 *
 * Server-side proxy that fetches a public Google Sheet as CSV.
 * Required because browser CORS blocks direct fetches to docs.google.com.
 * Only public sheets work — if the sheet is private the fetch will fail
 * and we return a helpful error message.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "url query param is required" });
  }

  if (!url.includes("docs.google.com/spreadsheets")) {
    return res.status(400).json({ error: "Only Google Sheets URLs are supported" });
  }

  try {
    const resp = await fetch(decodeURIComponent(url), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Infrasity-SheetProxy/1.0)" },
    });

    if (!resp.ok) {
      if (resp.status === 401 || resp.status === 403) {
        return res.status(403).json({
          error: 'Could not access sheet — ensure it is shared as "Anyone with link can view" in Google Sheets',
        });
      }
      return res.status(resp.status).json({ error: `Failed to fetch sheet (HTTP ${resp.status})` });
    }

    const csv = await resp.text();
    if (!csv.trim()) {
      return res.status(422).json({ error: "Sheet returned empty content" });
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(csv);
  } catch (err) {
    console.error("sheet-proxy error:", err);
    res.status(500).json({ error: "Failed to fetch sheet: " + err.message });
  }
}
