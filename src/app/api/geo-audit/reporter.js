/**
 * reporter.js
 * Compiles all scored pages + rewrites into a single audit-report.md.
 * Output is a professional client-ready markdown document.
 */

import { SIGNAL_MAX } from "./scorer.js";

/**
 * Build the full markdown audit report.
 * @param {string} domain
 * @param {Array<ScoredPage>} allSorted — all pages, sorted by opportunity
 * @param {Array<ScoredPage>} topPages — top N pages selected for rewrites
 * @param {Array<RewriteResult>} rewrites — Claude-generated rewrites
 * @param {InventorySummary} summary
 * @returns {string} — full markdown content
 */
export function buildReport(domain, allSorted, topPages, rewrites, summary) {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const sections = [
    buildHeader(domain, date),
    buildExecutiveSummary(summary, domain),
    buildSignalOverview(summary),
    buildFullInventory(allSorted),
    buildTop10Section(topPages, rewrites),
    buildMethodology(),
    buildNextSteps(summary),
  ];

  return sections.join("\n\n---\n\n");
}

// ─── Header ──────────────────────────────────────────────────────────────────

function buildHeader(domain, date) {
  return `# GEO Audit Report — ${domain}

**Prepared by:** Infrasity  
**Date:** ${date}  
**Powered by:** Claude (Anthropic)  
**Methodology:** 6-signal GEO rubric (Citations, Structure, Freshness, Authority, Entities, Directness)`;
}

// ─── Executive Summary ────────────────────────────────────────────────────────

function buildExecutiveSummary(summary, domain) {
  const {
    totalPages,
    avgScore,
    pagesBelow30,
    pagesBelow50,
    weakestSignal,
    topOpportunity,
    lowestPage,
  } = summary;

  const urgency =
    avgScore < 30 ? "critical" : avgScore < 50 ? "moderate" : "good baseline";

  return `## Executive Summary

**${totalPages} pages audited** across ${domain}. The site scores an average of **${avgScore}/100** for GEO readiness — a ${urgency} starting point.

**Key findings:**

- ${pagesBelow30} page${pagesBelow30 !== 1 ? "s" : ""} score below 30/100 — immediate priority
- ${pagesBelow50} page${pagesBelow50 !== 1 ? "s" : ""} score below 50/100 — significant opportunity
- Weakest site-wide signal: **${weakestSignal}** — lowest average across all pages
- Top opportunity page: \`${topOpportunity.url}\` (opportunity score: ${topOpportunity.opportunityScore})
- Lowest scoring page: \`${lowestPage.url}\` (${lowestPage.rawScore}/100)

Fixing the top 10 pages identified below would meaningfully improve AI engine citability across the site.`;
}

// ─── Signal Overview ─────────────────────────────────────────────────────────

function buildSignalOverview(summary) {
  const { signalAverages } = summary;

  const rows = Object.entries(signalAverages)
    .map(([signal, avg]) => {
      const max = SIGNAL_MAX[signal];
      const pct = Math.round((avg / max) * 100);
      const bar = "█".repeat(Math.round(pct / 10)) + "░".repeat(10 - Math.round(pct / 10));
      const status = pct >= 70 ? "✓ Good" : pct >= 40 ? "~ Fair" : "✗ Weak";
      return `| ${capitalise(signal)} | ${avg}/${max} | ${bar} | ${pct}% | ${status} |`;
    })
    .join("\n");

  return `## Site-wide Signal Breakdown

| Signal | Avg Score | Distribution | % | Status |
|--------|-----------|-------------|---|--------|
${rows}`;
}

// ─── Full Inventory ───────────────────────────────────────────────────────────

function buildFullInventory(allSorted) {
  const rows = allSorted
    .map((p) => {
      const gaps = p.topGaps.slice(0, 2).join(", ");
      return `| \`${truncate(p.url, 55)}\` | ${p.type} | ${p.rawScore}/100 | ${p.opportunityScore} | ${gaps} |`;
    })
    .join("\n");

  return `## Full Page Inventory

| URL | Type | Score | Opportunity | Weakest signals |
|-----|------|-------|-------------|-----------------|
${rows}`;
}

// ─── Top 10 Opportunities ─────────────────────────────────────────────────────

function buildTop10Section(topPages, rewrites) {
  // Build a lookup map by URL
  const rewriteMap = new Map(rewrites.map((r) => [r.url, r]));

  const sections = topPages.map((page, i) => {
    const rw = rewriteMap.get(page.url);
    return buildPageSection(page, rw, i + 1);
  });

  return `## Top 10 Opportunities

These pages have the highest GEO improvement potential. Each section includes specific, copy-ready fixes.\n\n${sections.join("\n\n")}`;
}

function buildPageSection(page, rewriteResult, rank) {
  const signalBreakdown = Object.entries(page.signals)
    .map(([s, pts]) => `${capitalise(s)}: ${pts}/${SIGNAL_MAX[s]}`)
    .join(" · ");

  let body = `### ${rank}. ${page.title || page.url}

**URL:** \`${page.url}\`  
**GEO Score:** ${page.rawScore}/100  
**Opportunity Score:** ${page.opportunityScore}  
**Top gaps:** ${page.topGaps.join(", ")}  
**Signal breakdown:** ${signalBreakdown}

`;

  if (!rewriteResult || !rewriteResult.rewrites?.length) {
    body += `> *No rewrite suggestions generated for this page.*\n`;
    return body;
  }

  rewriteResult.rewrites.forEach((rw, i) => {
    body += `#### Fix ${i + 1} — ${capitalise(rw.signal)} _(${rw.priority} priority)_\n\n`;

    if (rw.original && rw.original !== "Not present") {
      body += `**Original:**\n> ${rw.original}\n\n`;
    } else {
      body += `**Original:** *(not present — add this)*\n\n`;
    }

    body += `**Suggested rewrite:**\n${rw.rewrite}\n\n`;
    body += `*Why it helps GEO: ${rw.rationale}*\n\n`;
  });

  return body.trimEnd();
}

// ─── Methodology ─────────────────────────────────────────────────────────────

function buildMethodology() {
  return `## Methodology

This audit scores each page across **6 GEO signals** totalling 100 points:

| Signal | Max | What it measures |
|--------|-----|-----------------|
| Citations | 20 | Outbound links to authoritative sources (.gov, .edu, major publishers) |
| Structure | 20 | H-tag hierarchy, lists, tables, FAQ schema, definition blocks |
| Freshness | 15 | Last-modified date, dateModified schema, recency signals in body |
| Authority | 20 | Author byline, author bio link, Person/Organization schema, review schema |
| Entities | 15 | Named entities, definitions of key terms, internal linking |
| Directness | 10 | Answer-first writing, question-format headings, 300–1500 word count |

**Opportunity score** = gap score × page-type weight (blog/guide: 1.5×, product: 1.2×, home: 1.3×, about/contact: 0.3–0.4×). Pages are ranked by opportunity score — a blog post with a score of 25 outranks an About page with a score of 40 because the blog has far more AI citation potential.

Rewrite suggestions are generated by Claude (Anthropic) using the extracted page content and signal scores as context.`;
}

// ─── Next Steps ──────────────────────────────────────────────────────────────

function buildNextSteps(summary) {
  const { weakestSignal, pagesBelow30 } = summary;

  const steps = {
    citations: "Add 3–5 outbound links to authoritative sources (.gov, .edu, reputable publishers) on each blog or guide page. Anchor the link text to a specific factual claim.",
    structure: "Add H2/H3 subheadings, convert prose lists to `<ul>` elements, and add a FAQ section with FAQPage schema to your top content pages.",
    freshness: "Add `datePublished` and `dateModified` schema to all blog posts. Set a quarterly content review — flag any page not updated in 90 days.",
    authority: "Add author bylines and short author bios (linked) to all blog and guide pages. Implement Person schema with name, jobTitle, and url.",
    entities: "Define your key terms explicitly in the first 200 words of each page. Add 3+ internal links to related content on every post.",
    directness: "Restructure your top pages to answer the main question in the first paragraph. Convert at least one H2 per page to a question format.",
  };

  const primary = steps[weakestSignal] || steps.structure;

  return `## Recommended Next Steps

**This week — highest leverage actions:**

1. **Apply the top 10 rewrite suggestions above** — each is copy-paste ready for your CMS
2. **${capitalise(weakestSignal)} (weakest signal site-wide):** ${primary}
3. **Quick win:** ${pagesBelow30 > 0 ? `Focus on the ${pagesBelow30} page${pagesBelow30 > 1 ? "s" : ""} scoring below 30 — they have the most room to improve and will see the fastest GEO gains.` : "All pages score above 30 — focus on pushing the top opportunity pages past 70."}

**This month:**

- Retrofit citation links to all blog/guide pages (batch this — 1 hour of work)
- Add author schema to all content pages with a byline
- Set up a freshness review cadence: any page older than 90 days gets flagged for an update pass

**Ongoing:**

- Re-run this audit monthly to track score improvements
- New content should be written GEO-first: answer in paragraph 1, structure with H2/H3 questions, cite sources inline

---
*Generated by Infrasity GEO Audit Agent · Powered by Claude*`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function truncate(str, max) {
  return str.length > max ? "..." + str.slice(-(max - 3)) : str;
}