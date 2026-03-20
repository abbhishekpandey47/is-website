# GEO Audit Tool — How It Works

**Infrasity · Powered by OpenAI GPT-4o**  
**Route:** `/tools/geo-audit`  
**API:** `POST /api/geo-audit`

---

## What Is GEO?

GEO (Generative Engine Optimization) is the practice of making web content more likely to be **cited, quoted, and surfaced by AI engines** like ChatGPT, Perplexity, Claude, and Gemini.

Traditional SEO optimizes for Google rankings. GEO optimizes for AI citations.

---

## What The Tool Does

Takes a client domain URL and autonomously:
1. Crawls every page on the site
2. Scores each page across 6 GEO signals
3. Identifies the top 10 pages with the highest improvement potential
4. Generates specific, copy-ready rewrite suggestions per page
5. Produces a full `audit-report.md` the client can act on immediately

**Time:** ~20 minutes for a 50-page site  
**What used to take:** 1 full day of manual work

---

## Step-by-Step Agent Loop

### Step 1 — Crawl
**File:** `src/app/api/geo-audit/crawler.js`

The agent starts by discovering every page on the site.

1. Checks `robots.txt` for a `Sitemap:` directive
2. Tries `/sitemap.xml` and `/sitemap_index.xml`
3. Parses the sitemap XML and extracts all URLs
4. If no sitemap found → falls back to **BFS (breadth-first search)** link walk
   - Fetches the homepage
   - Extracts all `<a href>` links
   - Visits each one, extracts more links, repeats
5. Deduplicates URLs, filters out:
   - Static assets (`.jpg`, `.pdf`, `.css`, `.js`)
   - Admin/login pages
   - Duplicate fragments
6. Classifies each URL by type: `home`, `blog`, `guide`, `product`, `about`, `contact`, `pricing`, `page`
7. Caps at `maxPages` (default: 50)

**Output:** A list of `{ url, type }` objects

---

### Step 2 — Fetch & Parse
**File:** `src/app/api/geo-audit/fetcher.js`

Fetches all discovered URLs in parallel (8 concurrent) and extracts structured data from each page.

For each page, the fetcher extracts:

| Field | What it captures |
|-------|-----------------|
| `title` | `<title>` tag or first `<h1>` |
| `hTags` | All H1–H6 headings with their text |
| `bodyText` | Page body stripped of nav/footer/scripts |
| `wordCount` | Total word count of body |
| `outboundLinks` | All external links with anchor text |
| `internalLinkCount` | Count of links to other pages on same domain |
| `schemaTypes` | JSON-LD schema types found (FAQPage, Person, etc.) |
| `lastModified` | From HTTP header or `dateModified` schema |
| `hasAuthorByline` | Whether an author name appears |
| `hasAuthorBioLink` | Whether a link to an author bio exists |
| `hasTable` | Whether a `<table>` element exists |
| `hasList` | Whether `<ul>` or `<ol>` exists |
| `hasBlockquote` | Whether `<blockquote>`, `<dl>`, `<aside>` exists |
| `hasFAQSchema` | Whether FAQPage schema is present |

**Skips:** Pages that return non-200 status, non-HTML content, or timeout after 10s

**Output:** A `PageData` object per page

---

### Step 3 — Score
**File:** `src/app/api/geo-audit/scorer.js`

Each parsed page is scored across **6 GEO signals** totalling **100 points**.

#### Signal 1 — Citations (max 20 pts)
Measures outbound links to authoritative sources.

| Authoritative links | Score |
|--------------------|-------|
| 0 | 0 |
| 1–2 | 8 |
| 3–4 | 14 |
| 5+ | 20 |
| Bonus: anchor text matches a claim | +2 |

Authoritative domains: `.gov`, `.edu`, `pubmed`, `ncbi`, `nature.com`, `reuters.com`, `BBC`, `NYTimes`, etc.

#### Signal 2 — Structure (max 20 pts)
Measures content organisation.

| Element present | Points |
|----------------|--------|
| H2 headings | +4 |
| H3 headings | +3 |
| Bullet/numbered list | +4 |
| Table | +4 |
| FAQ schema | +3 |
| Blockquote / definition block | +2 |

#### Signal 3 — Freshness (max 15 pts)
Measures how recently the page was updated.

| Age | Score |
|-----|-------|
| < 30 days | 15 |
| 30–90 days | 10 |
| 90–365 days | 6 |
| 1–2 years | 3 |
| > 2 years | 1 |
| No date signal found | 0 |

#### Signal 4 — Authority (max 20 pts)
Measures trust and authorship signals.

| Signal | Points |
|--------|--------|
| Author name in byline | +5 |
| Author bio link | +5 |
| Person schema | +4 |
| Organization schema | +3 |
| Review / AggregateRating schema | +3 |

#### Signal 5 — Entities (max 15 pts)
Measures named entity density, definitions, and internal linking.

| Signal | Points |
|--------|--------|
| Named entities (up to 10) | ×1.5 each, max 10 |
| Definition signals present | +3 |
| 3+ internal links | +2 |

#### Signal 6 — Directness (max 10 pts)
Measures answer-first writing style.

| Signal | Points |
|--------|--------|
| H-tag contains a question | +3 |
| First 100 words contain a direct answer | +4 |
| Word count 300–1500 (GEO sweet spot) | +3 |

---

### Step 4 — Rank
**File:** `src/app/api/geo-audit/ranker.js`

After scoring, pages are ranked by **opportunity score** — not raw score.

```
Gap score        = 100 − raw score
Opportunity score = gap score × page type weight
```

**Page type weights:**

| Type | Weight | Reason |
|------|--------|--------|
| Blog / Guide | 1.5× | Highest AI citation potential |
| Home | 1.3× | High traffic, impactful |
| Product | 1.2× | Commercial value |
| General page | 1.0× | Baseline |
| About / Contact | 0.3–0.4× | Low AI citation value |

**Example:** A blog post scoring 25/100 (gap: 75, weight: 1.5) scores **112.5 opportunity** — higher than an About page scoring 40/100 (gap: 60, weight: 0.4) with only **24 opportunity**.

The top 10 pages by opportunity score are selected for rewriting.

---

### Step 5 — Rewrite
**File:** `src/app/api/geo-audit/rewriter.js`

For each of the top 10 pages, one GPT-4o API call is made.

**What is passed to the AI:**
- Page URL and title
- Overall GEO score
- Signal breakdown (each signal's score vs max, gap highlighted)
- H-tag structure
- First 2,500 characters of body text

**What the AI returns (structured JSON):**
```json
{
  "url": "https://example.com/blog/what-is-geo",
  "rawScore": 28,
  "topGaps": ["citations", "authority", "structure"],
  "rewrites": [
    {
      "signal": "citations",
      "priority": "high",
      "original": "GEO is growing rapidly in the marketing space.",
      "rewrite": "GEO is growing rapidly — a 2024 BrightEdge study found AI-cited content receives 3× more referral traffic than traditionally ranked pages.",
      "rationale": "Adds an authoritative citation, making the claim quotable by AI engines."
    }
  ]
}
```

3–5 rewrites are generated per page, each with:
- The **exact original text** being replaced
- A **drop-in replacement** ready to paste into a CMS
- A **rationale** explaining the GEO benefit

Calls run 3 at a time (concurrent) to stay within API rate limits.

---

### Step 6 — Report
**File:** `src/app/api/geo-audit/reporter.js`

Compiles everything into a single `audit-report.md` with:

```
# GEO Audit Report — example.com

## Executive Summary
- X pages audited
- Average score: Y/100
- Weakest signal site-wide: citations
- Top opportunity page: /blog/what-is-geo (opportunity: 112.5)

## Site-wide Signal Breakdown
| Signal | Avg | Bar | % | Status |
...

## Full Page Inventory
| URL | Type | Score | Opportunity | Weakest signals |
...

## Top 10 Opportunities
### 1. What is GEO? — Score: 28/100
Fix 1 — Citations (high priority)
  Original: "..."
  Rewrite: "..."
  Why it helps: ...

## Methodology
## Recommended Next Steps
```

---

## What Comes Back to the Frontend

The API streams results back using **Server-Sent Events (SSE)** so the UI updates in real time.

| Event | When | Contains |
|-------|------|----------|
| `progress` | After each step | `step`, `message` |
| `error` | If anything fails | `message` |
| `complete` | When done | `summary`, `allPages`, `topPages`, `rewrites`, `markdown` |

The frontend (`src/app/tools/geo-audit/page.jsx`):
1. Shows animated loading steps as each event arrives
2. On `complete` — renders score cards, signal bars, inventory table, top 10 rewrites
3. Offers a **Download audit-report.md** button

---

## Known Limitations

| Limitation | Reason | Fix |
|-----------|--------|-----|
| JS-rendered sites score 0 | Plain HTTP fetch can't execute JavaScript | Add Playwright headless browser |
| Bot-blocked sites return empty | Sites like chatgpt.com block crawlers | No fix — by design |
| Max 150 pages per run | Keeps runtime under 5 minutes | Increase `maxPages` param |
| Vercel timeout 5 min | Serverless function limit | Use Vercel Pro or a dedicated server |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Crawler | Custom BFS + sitemap parser |
| HTML Parser | Native regex + DOM extraction |
| Scoring | Pure JS rule-based functions |
| AI Rewrites | OpenAI GPT-4o |
| Report | Markdown string builder |
| Streaming | ReadableStream + SSE |
| Hosting | Vercel |

---

*Generated by Infrasity · GEO Audit Agent · March 2026*