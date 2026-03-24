/**
 * crawler.js
 * Fetches sitemap.xml (with fallback BFS link walk) and returns a deduped
 * list of URLs belonging to the target domain.
 */

import { parseStringPromise } from "xml2js";

const DEFAULT_HEADERS = {
  "User-Agent": "InfrasityGEOBot/1.0 (+https://infrasity.com/bot)",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

const SKIP_EXTENSIONS = /\.(pdf|jpg|jpeg|png|gif|svg|webp|ico|mp4|mp3|zip|gz|tar|woff|woff2|ttf|eot|css|js|json|xml)(\?.*)?$/i;
const SKIP_PATHS = /\/(wp-admin|admin|login|logout|cart|checkout|feed|rss|sitemap|tag\/|author\/)/i;

/**
 * Main entry point — tries sitemap first, falls back to BFS crawl.
 * @param {string} domain  — e.g. "https://example.com"
 * @param {number} maxPages
 * @param {number} crawlDelay — ms between requests
 * @returns {Promise<Array<{url: string, type: string}>>}
 */
export async function crawlSite(domain, maxPages, timeout, onUrl = ()=>{}) {  
  const base = normaliseBase(domain);
  let urls = [];

  // 1 — Try sitemap
  try {
    urls = await fetchSitemap(base);
  } catch {
    console.log(`  [crawler] No sitemap — falling back to BFS crawl`);
  }

  // 2 — BFS fallback if sitemap empty or failed
  if (urls.length === 0) {
    urls = await bfsCrawl(base, maxPages, crawlDelay);
  }

  // 3 — Deduplicate, filter, cap, classify
  const seen = new Set();
  const result = [];

  for (const url of urls) {
    const clean = stripFragment(url);
    if (!clean || seen.has(clean)) continue;
    if (!clean.startsWith(base)) continue;
    if (SKIP_EXTENSIONS.test(clean)) continue;
    if (SKIP_PATHS.test(clean)) continue;
    seen.add(clean);
    result.push({ url: clean, type: classifyUrl(clean) });
    if (result.length >= maxPages) break;
  }
  return result;
}

// ─── Sitemap ─────────────────────────────────────────────────────────────────

async function fetchSitemap(base) {
  const candidates = [
    `${base}/sitemap.xml`,
    `${base}/sitemap_index.xml`,
    `${base}/sitemap/sitemap.xml`,
  ];

  for (const url of candidates) {
    try {
      const res = await fetch(url, { headers: DEFAULT_HEADERS, signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const xml = await res.text();
      const parsed = await parseStringPromise(xml);
      const urls = extractSitemapUrls(parsed);
      if (urls.length > 0) return urls;
    } catch {
      // try next candidate
    }
  }

  // Check robots.txt for Sitemap: directive
  try {
    const robots = await fetch(`${base}/robots.txt`, { headers: DEFAULT_HEADERS, signal: AbortSignal.timeout(5000) });
    const text = await robots.text();
    const match = text.match(/^Sitemap:\s*(.+)$/im);
    if (match) {
      const sitemapUrl = match[1].trim();
      const res = await fetch(sitemapUrl, { headers: DEFAULT_HEADERS, signal: AbortSignal.timeout(8000) });
      if (res.ok) {
        const xml = await res.text();
        const parsed = await parseStringPromise(xml);
        return extractSitemapUrls(parsed);
      }
    }
  } catch {
    // ignore
  }

  return [];
}

function extractSitemapUrls(parsed) {
  const urls = [];

  // Standard sitemap
  if (parsed.urlset?.url) {
    for (const entry of parsed.urlset.url) {
      if (entry.loc?.[0]) urls.push(entry.loc[0].trim());
    }
  }

  // Sitemap index — flatten (only first 200 to avoid blowup)
  if (parsed.sitemapindex?.sitemap) {
    // We don't recurse in this pass — just return what we have
    // A production version could fetch sub-sitemaps here
    for (const s of parsed.sitemapindex.sitemap.slice(0, 5)) {
      if (s.loc?.[0]) urls.push(s.loc[0].trim());
    }
  }

  return urls;
}

// ─── BFS Crawl ───────────────────────────────────────────────────────────────

async function bfsCrawl(base, maxPages, crawlDelay) {
  const queue = [base];
  const visited = new Set([base]);
  const found = [base];

  while (queue.length > 0 && found.length < maxPages) {
    const url = queue.shift();

    try {
      const res = await fetch(url, {
        headers: DEFAULT_HEADERS,
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;

      const html = await res.text();
      const links = extractLinks(html, base, url);

      for (const link of links) {
        if (!visited.has(link)) {
          visited.add(link);
          found.push(link);
          queue.push(link);
          if (found.length >= maxPages) break;
        }
      }
    } catch {
      // skip unreachable pages
    }

    if (crawlDelay > 0) await sleep(crawlDelay);
  }

  return found;
}

function extractLinks(html, base, currentUrl) {
  const links = [];
  const hrefRegex = /href=["']([^"']+)["']/gi;
  let match;

  while ((match = hrefRegex.exec(html)) !== null) {
    try {
      const href = match[1].trim();
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      const absolute = new URL(href, currentUrl).href;
      if (absolute.startsWith(base)) links.push(stripFragment(absolute));
    } catch {
      // invalid URL
    }
  }

  return links;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normaliseBase(domain) {
  let base = domain.trim();
  if (!base.startsWith("http")) base = "https://" + base;
  return base.replace(/\/$/, "");
}

function stripFragment(url) {
  try {
    const u = new URL(url);
    u.hash = "";
    return u.href.replace(/\/$/, "");
  } catch {
    return null;
  }
}

function classifyUrl(url) {
  const path = new URL(url).pathname.toLowerCase();
  if (path === "/" || path === "") return "home";
  if (/\/(blog|news|articles?|posts?|insights?|resources?)/.test(path)) return "blog";
  if (/\/(guides?|tutorials?|how-to|learn)/.test(path)) return "guide";
  if (/\/(product|service|solution|platform|feature)/.test(path)) return "product";
  if (/\/(about|team|company|story|mission)/.test(path)) return "about";
  if (/\/(contact|get-in-touch|reach-us)/.test(path)) return "contact";
  if (/\/(pricing|plans?|packages?)/.test(path)) return "pricing";
  return "page";
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}