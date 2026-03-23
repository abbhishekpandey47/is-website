/**
 * src/app/api/geo-audit/route.js
 */

import { NextResponse } from "next/server";
import { crawlSite } from "./crawler.js";
import { fetchPages } from "./fetcher.js";
import { scorePages } from "./scorer.js";
import { rankPages, buildInventorySummary } from "./ranker.js";
import { generateRewrites } from "./rewriter.js";
import { buildReport } from "./reporter.js";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { domain, pages: formPages = [], maxPages = 50, topN = 10 } = body;

  if (!domain || typeof domain !== "string") {
    return NextResponse.json({ error: "domain is required." }, { status: 400 });
  }

  const normDomain = normaliseDomain(domain);
  if (!normDomain) {
    return NextResponse.json({ error: "Invalid domain URL." }, { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;

      const send = (event, data) => {
        if (closed) return;
        try {
          const line = `data: ${JSON.stringify({ event, ...data })}\n\n`;
          controller.enqueue(new TextEncoder().encode(line));
        } catch {}
      };

      const close = () => {
        if (!closed) {
          closed = true;
          try { controller.close(); } catch {}
        }
      };

      try {
        // ── Step 1 & 2: Crawl OR use provided pages ──
const providedPages = (body.pages || []).filter(p => p.url || p.content);
let parsedPages;

if (providedPages.length > 0) {
  // User provided specific pages — skip crawl, use directly
  send("progress", { step: 1, total: 5, message: `Using ${providedPages.length} provided page${providedPages.length > 1 ? "s" : ""}…` });
  send("progress", { step: 2, total: 5, message: "Parsing provided page content…" });

  parsedPages = providedPages.map((p, i) => ({
    url: p.url || `${normDomain}/page-${i + 1}`,
    domain: normDomain,
    bodyText: p.content || "",
    headings: extractHeadings(p.content || ""),
    links: extractLinks(p.content || "", normDomain),
    rawHtml: p.content || "",
    title: extractTitle(p.content || "") || p.url || normDomain,
    type: detectPageType(p.url || ""),
  }));

  send("progress", { step: 2, total: 5, message: `Parsed ${parsedPages.length} pages successfully` });
} else {
  // No pages provided — crawl the domain
  send("progress", { step: 1, total: 5, message: "Crawling sitemap and pages…" });
  const crawledPages = await crawlSite(normDomain, Math.min(maxPages, 150), 400);

  if (crawledPages.length === 0) {
    send("error", { message: "No pages found. Check that the domain is publicly accessible." });
    close();
    return;
  }

  send("progress", { step: 1, total: 5, message: `Found ${crawledPages.length} pages` });
  send("progress", { step: 2, total: 5, message: `Fetching and parsing ${crawledPages.length} pages…` });
  parsedPages = await fetchPages(crawledPages, 8, 250);
  send("progress", { step: 2, total: 5, message: `Parsed ${parsedPages.length} pages successfully` });
}

        // ── Step 3: Score ───────────────────────────────────────────────────
        send("progress", { step: 3, total: 5, message: "Scoring pages across 6 GEO signals…", urls: [] });
        await new Promise(r => setTimeout(r, 600));
        const scoredPages = scorePages(parsedPages);

        // ── Step 4: Rank ────────────────────────────────────────────────────
        send("progress", { step: 4, total: 5, message: `Ranking by opportunity score, selecting top ${topN}…`, urls: [] });
        await new Promise(r => setTimeout(r, 600));
        const rankedResults = rankPages(scoredPages, topN);
        const topPages = rankedResults.topPages;
        const allSorted = rankedResults.allSorted;
        const summary = buildInventorySummary(allSorted);

        send("progress", {
          step: 4, total: 5,
          message: `Top ${topPages.length} pages identified`,
          urls: topPages.map(p => p.url),
        });

        // ── Step 5: Rewrite ─────────────────────────────────────────────────
        send("progress", {
          step: 5, total: 5,
          message: `Generating rewrite suggestions for ${topPages.length} pages…`,
          urls: topPages.map(p => p.url),
        });
        const rewrites = await generateRewrites(topPages);

        // ── Report ──────────────────────────────────────────────────────────
        const markdown = buildReport(normDomain, allSorted, topPages, rewrites, summary);

        send("complete", {
          domain: normDomain,
          summary,
          allPages: allSorted.map(sanitisePage),
          topPages: topPages.map(sanitisePage),
          rewrites,
          markdown,
        });

      } catch (err) {
        console.error("[geo-audit] Agent error:", err);
        send("error", { message: err.message || "Audit failed. Please try again." });
      } finally {
        close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "?domain= required" }, { status: 400 });
  return NextResponse.json({ message: "Use POST /api/geo-audit with { domain, maxPages, topN }" });
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function extractHeadings(text) {
  const headings = [];
  const mdH = text.matchAll(/^(#{1,4})\s+(.+)$/gm);
  for (const m of mdH) headings.push({ level: m[1].length, text: m[2].trim() });
  const htmlH = text.matchAll(/<h([1-4])[^>]*>(.*?)<\/h\1>/gi);
  for (const m of htmlH) headings.push({ level: parseInt(m[1]), text: m[2].replace(/<[^>]+>/g,"").trim() });
  return headings;
}

function extractLinks(text, domain) {
  const links = [];
  const mdLinks = text.matchAll(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g);
  for (const m of mdLinks) links.push(m[2]);
  const htmlLinks = text.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi);
  for (const m of htmlLinks) links.push(m[1]);
  return links;
}

function extractTitle(text) {
  const md = text.match(/^#\s+(.+)$/m);
  if (md) return md[1].trim();
  const html = text.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (html) return html[1].replace(/<[^>]+>/g,"").trim();
  return "";
}

function detectPageType(url) {
  if (/\/blog\/|\/post\/|\/article\//i.test(url)) return "blog";
  if (/\/guide\/|\/tutorial\/|\/how-to\//i.test(url)) return "guide";
  if (/\/product\/|\/service\/|\/pricing\//i.test(url)) return "product";
  if (/\/$|\/home\/?$/i.test(url)) return "home";
  if (/\/about\//i.test(url)) return "about";
  return "page";
}

function normaliseDomain(domain) {
  let d = domain.trim();
  if (!d.startsWith("http")) d = "https://" + d;
  d = d.replace(/\/$/, "");
  try { const u = new URL(d); return u.origin; } catch { return null; }
}

function sanitisePage(page) {
  const { _parsed, ...clean } = page;
  return clean;
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

// Fetch a batch of pages (reuses fetcher logic but per-batch for streaming)
async function fetchPagesBatch(batch) {
  const { fetchPages } = await import("./fetcher.js");
  return fetchPages(batch, batch.length, 0);
}