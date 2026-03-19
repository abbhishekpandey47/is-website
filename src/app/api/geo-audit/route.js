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

  const { domain, maxPages = 50, topN = 10 } = body;

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
        } catch {
          // controller already closed
        }
      };

      const close = () => {
        if (!closed) {
          closed = true;
          try { controller.close(); } catch {}
        }
      };

      try {
        // ── Step 1: Crawl ───────────────────────────────────────────────────
        send("progress", { step: 1, total: 5, message: "Crawling sitemap and pages…" });
        const crawledPages = await crawlSite(normDomain, Math.min(maxPages, 150), 400);

        if (crawledPages.length === 0) {
          send("error", { message: "No pages found. Check that the domain is publicly accessible." });
          close();
          return;
        }

        send("progress", { step: 1, total: 5, message: `Found ${crawledPages.length} pages` });

        // ── Step 2: Fetch + Parse ───────────────────────────────────────────
        send("progress", { step: 2, total: 5, message: `Fetching and parsing ${crawledPages.length} pages…` });
        const parsedPages = await fetchPages(crawledPages, 8, 250);
        send("progress", { step: 2, total: 5, message: `Parsed ${parsedPages.length} pages successfully` });

        // ── Step 3: Score ───────────────────────────────────────────────────
        send("progress", { step: 3, total: 5, message: "Scoring pages across 6 GEO signals…" });
        await new Promise(r => setTimeout(r, 600));
        const scoredPages = scorePages(parsedPages);

        // ── Step 4: Rank ────────────────────────────────────────────────────
        send("progress", { step: 4, total: 5, message: `Ranking by opportunity score, selecting top ${topN}…` });
        await new Promise(r => setTimeout(r, 600));
        const rankedResults = rankPages(scoredPages, topN);
        const topPages = rankedResults.topPages;
        const allSorted = rankedResults.allSorted;
        const summary = buildInventorySummary(allSorted);

        // ── Step 5: Rewrite ─────────────────────────────────────────────────
        send("progress", { step: 5, total: 5, message: `Generating rewrite suggestions for ${topPages.length} pages…` });
        const rewrites = await generateRewrites(topPages);

        // ── Step 6: Report ──────────────────────────────────────────────────
        const markdown = buildReport(normDomain, allSorted, topPages, rewrites, summary);

        // ── Done ────────────────────────────────────────────────────────────
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
  if (!domain) {
    return NextResponse.json({ error: "?domain= required" }, { status: 400 });
  }
  return NextResponse.json({ message: "Use POST /api/geo-audit with { domain, maxPages, topN }" });
}

function normaliseDomain(domain) {
  let d = domain.trim();
  if (!d.startsWith("http")) d = "https://" + d;
  d = d.replace(/\/$/, "");
  try {
    const u = new URL(d);
    return u.origin;
  } catch {
    return null;
  }
}

function sanitisePage(page) {
  const { _parsed, ...clean } = page;
  return clean;
}