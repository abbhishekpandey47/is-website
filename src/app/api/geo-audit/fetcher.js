/**
 * fetcher.js
 * Fetches each URL and extracts structured content.
 * Primary: plain HTTP fetch (fast, no dependencies)
 * Fallback: Playwright headless Chromium (for JS-rendered / bot-blocking sites)
 */

const DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

// Minimum word count to consider a fetch successful (not a JS shell)
const MIN_WORDS = 50;

/**
 * Fetch and parse a batch of URLs concurrently.
 * @param {Array<{url: string, type: string}>} pages
 * @param {number} concurrency
 * @param {number} delay — ms between batches
 * @returns {Promise<Array<PageData>>}
 */
export async function fetchPages(pages, concurrency = 8, delay = 300) {
  const results = [];
  const batches = chunk(pages, concurrency);

  // First pass — plain HTTP fetch (fast)
  const needsPlaywright = [];

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`  [fetcher] Batch ${i + 1}/${batches.length} — fetching ${batch.length} pages`);

    const settled = await Promise.allSettled(
      batch.map(({ url, type }) => fetchPlain(url, type))
    );

    for (let j = 0; j < settled.length; j++) {
      const result = settled[j];
      if (result.status === "fulfilled" && result.value) {
        if (result.value.wordCount >= MIN_WORDS) {
          results.push(result.value);
        } else {
          // Page loaded but empty — needs Playwright
          needsPlaywright.push(batch[j]);
        }
      } else {
        // Fetch failed entirely — try Playwright
        needsPlaywright.push(batch[j]);
      }
    }

    if (delay > 0 && i < batches.length - 1) await sleep(delay);
  }

  // Second pass — Playwright for JS-rendered pages
  if (needsPlaywright.length > 0) {
    console.log(`  [fetcher] ${needsPlaywright.length} pages need Playwright (JS-rendered)`);
    const playwrightResults = await fetchWithPlaywright(needsPlaywright);
    results.push(...playwrightResults);
  }

  console.log(`  [fetcher] Successfully parsed ${results.length}/${pages.length} pages`);
  return results;
}

// ─── Plain HTTP fetch ─────────────────────────────────────────────────────────

async function fetchPlain(url, type = "page") {
  try {
    const res = await fetch(url, {
      headers: DEFAULT_HEADERS,
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });

    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return null;

    const lastModifiedHeader = res.headers.get("last-modified");
    const lastModified = lastModifiedHeader ? new Date(lastModifiedHeader) : null;
    const html = await res.text();
    return parseHtml(html, url, type, lastModified);
  } catch {
    return null;
  }
}

// ─── Playwright fallback ──────────────────────────────────────────────────────

async function fetchWithPlaywright(pages) {
  let chromium, playwright;

  // Try to import Playwright — gracefully skip if not installed
  try {
    const pw = await import("playwright");
    playwright = pw;
  } catch {
    console.warn("  [fetcher] Playwright not installed — skipping JS-rendered pages");
    console.warn("  [fetcher] Run: npm install playwright && npx playwright install chromium");
    return [];
  }

  const results = [];
  let browser;

  try {
    browser = await playwright.chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const context = await browser.newContext({
      userAgent: DEFAULT_HEADERS["User-Agent"],
      extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
    });

    // Process pages 3 at a time in Playwright
    const pwBatches = chunk(pages, 3);

    for (const batch of pwBatches) {
      const settled = await Promise.allSettled(
        batch.map(({ url, type }) => fetchPageWithPlaywright(context, url, type))
      );

      for (const result of settled) {
        if (result.status === "fulfilled" && result.value) {
          results.push(result.value);
        }
      }
    }

    await context.close();
  } catch (err) {
    console.error("  [fetcher] Playwright error:", err.message);
  } finally {
    if (browser) await browser.close();
  }

  console.log(`  [fetcher] Playwright fetched ${results.length}/${pages.length} pages`);
  return results;
}

async function fetchPageWithPlaywright(context, url, type) {
  let page;
  try {
    page = await context.newPage();

    // Block images, fonts, media to speed things up
    await page.route("**/*", (route) => {
      const resourceType = route.request().resourceType();
      if (["image", "font", "media", "stylesheet"].includes(resourceType)) {
        route.abort();
      } else {
        route.continue();
      }
    });

    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });

    if (!response || !response.ok()) return null;

    // Wait a bit for JS to render content
    await page.waitForTimeout(1500);

    const lastModified = await page.evaluate(() => {
      const meta = document.querySelector('meta[property="article:modified_time"]') ||
                   document.querySelector('meta[name="last-modified"]');
      return meta?.content || document.lastModified || null;
    });

    const html = await page.content();
    const parsed = parseHtml(html, url, type, lastModified ? new Date(lastModified) : null);

    return parsed;
  } catch {
    return null;
  } finally {
    if (page) await page.close();
  }
}

// ─── HTML Parser ──────────────────────────────────────────────────────────────

function parseHtml(html, url, type, lastModifiedFromHeader) {
  // Title
  const title =
    extract(html, /<title[^>]*>([^<]+)<\/title>/i) ||
    extract(html, /<h1[^>]*>([^<]+)<\/h1>/i) ||
    url;

  // H-tags
  const hTags = [];
  const hRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let hMatch;
  while ((hMatch = hRegex.exec(html)) !== null) {
    const level = hMatch[1].toLowerCase();
    const text = stripTags(hMatch[2]).trim().slice(0, 120);
    if (text) hTags.push(`${level}:${text}`);
  }

  // Body text — strip boilerplate
  let body = html;
  body = body.replace(/<(nav|header|footer|aside|script|style|noscript|iframe)[^>]*>[\s\S]*?<\/\1>/gi, " ");
  body = body.replace(/<[^>]+>/g, " ");
  body = body.replace(/\s+/g, " ").trim();
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const bodySlice = body.slice(0, 8000);

  // Outbound links
  const outboundLinks = [];
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let lMatch;
  const baseDomain = (() => { try { return new URL(url).hostname; } catch { return ""; } })();

  while ((lMatch = linkRegex.exec(html)) !== null) {
    try {
      const href = lMatch[1].trim();
      const text = stripTags(lMatch[2]).trim().slice(0, 80);
      const resolved = new URL(href, url);
      if (resolved.hostname !== baseDomain) {
        outboundLinks.push({ href: resolved.href, text });
      }
    } catch { /* skip */ }
  }

  // Internal links
  let internalLinkCount = 0;
  const intRegex = /<a[^>]+href=["']([^"'#][^"']*)["']/gi;
  let iMatch;
  while ((iMatch = intRegex.exec(html)) !== null) {
    try {
      const resolved = new URL(iMatch[1], url);
      if (resolved.hostname === baseDomain) internalLinkCount++;
    } catch { /* skip */ }
  }

  // Schema types
  const schemaTypes = [];
  const schemaRegex = /"@type"\s*:\s*"([^"]+)"/g;
  let sMatch;
  while ((sMatch = schemaRegex.exec(html)) !== null) {
    schemaTypes.push(sMatch[1]);
  }

  // Date signals
  let lastModified = lastModifiedFromHeader;
  if (!lastModified) {
    const dateModMatch = html.match(/"dateModified"\s*:\s*"([^"]+)"/);
    const datePubMatch = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
    const candidate = dateModMatch?.[1] || datePubMatch?.[1];
    if (candidate) {
      const d = new Date(candidate);
      if (!isNaN(d)) lastModified = d;
    }
  }

  // Author signals
  const hasAuthorByline =
    /class=["'][^"']*author[^"']*["']/i.test(html) ||
    /"author"\s*:/i.test(html) ||
    /by\s+[A-Z][a-z]+\s+[A-Z][a-z]+/m.test(body);

  const hasAuthorBioLink =
    /href=["'][^"']*(author|team|about)[^"']*["']/i.test(html) ||
    /<a[^>]*>[^<]*(author bio|about the author|meet the author)[^<]*<\/a>/i.test(html);

  const hasTable     = /<table/i.test(html);
  const hasList      = /<(ul|ol)\b/i.test(html);
  const hasBlockquote = /<(blockquote|aside|dl|dt)\b/i.test(html);
  const hasFAQSchema  = schemaTypes.includes("FAQPage") || schemaTypes.includes("Question");

  return {
    url,
    type,
    title: stripTags(title).trim().slice(0, 200),
    hTags,
    bodyText: bodySlice,
    wordCount,
    outboundLinks,
    internalLinkCount,
    schemaTypes,
    lastModified,
    hasAuthorByline,
    hasAuthorBioLink,
    hasTable,
    hasList,
    hasBlockquote,
    hasFAQSchema,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extract(html, regex) {
  const m = html.match(regex);
  return m ? stripTags(m[1]) : null;
}

function stripTags(str) {
  return str.replace(/<[^>]+>/g, "").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
}

function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}