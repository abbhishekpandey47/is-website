/**
 * scorer.js
 * Scores each parsed page across 6 GEO signals (total 100 pts).
 * Returns raw score, gap score, opportunity score, and per-signal breakdown.
 *
 * Signals & max points:
 *   citations   — 20
 *   structure   — 20
 *   freshness   — 15
 *   authority   — 20
 *   entities    — 15
 *   directness  — 10
 */

const AUTHORITY_DOMAINS = /\.(gov|edu)$|pubmed|ncbi\.nlm\.nih\.gov|nature\.com|jstor\.org|arxiv\.org|who\.int|un\.org|reuters\.com|apnews\.com|bbc\.co|nytimes\.com|theguardian\.com/i;

export const SIGNAL_MAX = {
  citations: 20,
  structure: 20,
  freshness: 15,
  authority: 20,
  entities: 15,
  directness: 10,
};

const PAGE_WEIGHTS = {
  home: 1.3,
  blog: 1.5,
  guide: 1.5,
  product: 1.2,
  pricing: 1.1,
  page: 1.0,
  about: 0.4,
  contact: 0.3,
};

/**
 * Score a batch of pages.
 * @param {Array<PageData>} pages
 * @returns {Array<ScoredPage>}
 */
export function scorePages(pages) {
  return pages.map(scorePage);
}

/**
 * Score a single page across all 6 signals.
 */
export function scorePage(page) {
  const signals = {
    citations: scoreCitations(page),
    structure: scoreStructure(page),
    freshness: scoreFreshness(page),
    authority: scoreAuthority(page),
    entities: scoreEntities(page),
    directness: scoreDirectness(page),
  };

  const rawScore = Object.values(signals).reduce((a, b) => a + b, 0);
  const gapScore = 100 - rawScore;
  const pageWeight = PAGE_WEIGHTS[page.type] ?? 1.0;
  const opportunityScore = Math.round(gapScore * pageWeight * 10) / 10;

  // Identify top gaps (signals with most room to improve)
  const topGaps = Object.entries(signals)
    .map(([signal, pts]) => ({ signal, gap: SIGNAL_MAX[signal] - pts }))
    .sort((a, b) => b.gap - a.gap)
    .filter((s) => s.gap > 0)
    .slice(0, 3)
    .map((s) => s.signal);

  return {
    url: page.url,
    title: page.title,
    type: page.type,
    rawScore,
    gapScore,
    opportunityScore,
    signals,
    topGaps,
    // Keep parsed data for rewriter
    _parsed: page,
  };
}

// ─── Signal: Citations (max 20) ───────────────────────────────────────────────

function scoreCitations(page) {
  const authoritative = page.outboundLinks.filter((l) =>
    AUTHORITY_DOMAINS.test(new URL(l.href).hostname)
  );

  const n = authoritative.length;
  let base = 0;
  if (n === 0) base = 0;
  else if (n <= 2) base = 8;
  else if (n <= 4) base = 14;
  else base = 20;

  // Bonus: link anchor text appears near a factual claim in surrounding text
  let bonus = 0;
  for (const link of authoritative) {
    if (link.text && link.text.length > 3 && page.bodyText.toLowerCase().includes(link.text.toLowerCase())) {
      bonus = 2;
      break;
    }
  }

  return Math.min(base + bonus, 20);
}

// ─── Signal: Structure (max 20) ──────────────────────────────────────────────

function scoreStructure(page) {
  const hLevels = page.hTags.map((t) => t.split(":")[0]);
  let score = 0;

  if (hLevels.includes("h2")) score += 4;
  if (hLevels.includes("h3")) score += 3;
  if (page.hasList) score += 4;
  if (page.hasTable) score += 4;
  if (page.hasFAQSchema) score += 3;
  if (page.hasBlockquote) score += 2;

  return Math.min(score, 20);
}

// ─── Signal: Freshness (max 15) ──────────────────────────────────────────────

function scoreFreshness(page) {
  if (!page.lastModified) {
    // Try to find a date in body text as last resort
    const dateInBody = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\.?\s+\d{1,2},?\s+202[0-9]\b/i.test(
      page.bodyText
    );
    return dateInBody ? 3 : 0;
  }

  const now = new Date();
  const ageDays = (now - page.lastModified) / (1000 * 60 * 60 * 24);

  if (ageDays < 30) return 15;
  if (ageDays < 90) return 10;
  if (ageDays < 365) return 6;
  if (ageDays < 730) return 3;
  return 1;
}

// ─── Signal: Authority (max 20) ──────────────────────────────────────────────

function scoreAuthority(page) {
  let score = 0;

  if (page.hasAuthorByline) score += 5;
  if (page.hasAuthorBioLink) score += 5;
  if (page.schemaTypes.includes("Person")) score += 4;
  if (page.schemaTypes.includes("Organization")) score += 3;
  if (page.schemaTypes.some((s) => ["Review", "AggregateRating", "Rating"].includes(s))) score += 3;

  return Math.min(score, 20);
}

// ─── Signal: Entities (max 15) ───────────────────────────────────────────────

function scoreEntities(page) {
  // Lightweight NER: unique capitalised multi-word phrases as proxy
  const entityMatches = page.bodyText.match(/\b[A-Z][a-z]{1,}\s+(?:[A-Z][a-z]{1,}\s*){1,3}/g) || [];
  const uniqueEntities = new Set(entityMatches.map((e) => e.trim().toLowerCase()));
  const entityScore = Math.min(uniqueEntities.size * 1.5, 10);

  // Definition signals
  const hasDefinitions = /is\s+defined\s+as|refers\s+to|means\s+that|<(dl|dt|dfn)\b/i.test(page.bodyText);
  const definitionScore = hasDefinitions ? 3 : 0;

  // Internal linking
  const linkScore = page.internalLinkCount >= 3 ? 2 : 0;

  return Math.round(Math.min(entityScore + definitionScore + linkScore, 15));
}

// ─── Signal: Directness (max 10) ─────────────────────────────────────────────

function scoreDirectness(page) {
  let score = 0;

  // Question in an H-tag
  const hText = page.hTags.map((t) => t.split(":").slice(1).join(":")).join(" ");
  if (hText.includes("?")) score += 3;

  // Answer-first: first 100 words contain a direct claim
  const first100 = page.bodyText.split(/\s+/).slice(0, 100).join(" ");
  if (/\b(is|are|means|refers to|the answer is|in short|simply put|defined as)\b/i.test(first100)) score += 4;

  // Word count sweet spot for GEO (300–1500)
  if (page.wordCount >= 300 && page.wordCount <= 1500) score += 3;

  return Math.min(score, 10);
}