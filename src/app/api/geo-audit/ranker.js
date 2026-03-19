/**
 * ranker.js
 * Sorts scored pages by opportunity score (gap × page weight)
 * and returns the top N pages for rewriting.
 * Also filters out low-value pages (about, contact, privacy).
 */

const LOW_VALUE_TYPES = new Set(["about", "contact"]);
const LOW_VALUE_PATHS = /\/(privacy|terms|cookie|legal|sitemap|404|error)/i;

/**
 * Rank pages by improvement potential and return top N.
 * @param {Array<ScoredPage>} scoredPages
 * @param {number} topN
 * @returns {{ topPages: Array<ScoredPage>, allSorted: Array<ScoredPage> }}
 */
export function rankPages(scoredPages, topN = 10) {
  // Separate high-value from low-value pages
  const highValue = scoredPages.filter(
    (p) => !LOW_VALUE_TYPES.has(p.type) && !LOW_VALUE_PATHS.test(p.url)
  );
  const lowValue = scoredPages.filter(
    (p) => LOW_VALUE_TYPES.has(p.type) || LOW_VALUE_PATHS.test(p.url)
  );

  // Sort high-value by opportunity score descending
  const sortedHighValue = [...highValue].sort(
    (a, b) => b.opportunityScore - a.opportunityScore
  );

  // Append low-value at the end (still included in full inventory)
  const allSorted = [
    ...sortedHighValue,
    ...lowValue.sort((a, b) => b.opportunityScore - a.opportunityScore),
  ];

  const topPages = sortedHighValue.slice(0, topN);

  console.log(`  [ranker] Top ${topPages.length} pages selected for rewrites`);
  topPages.forEach((p, i) => {
    console.log(`    ${i + 1}. ${p.url} — score ${p.rawScore}/100 — opp ${p.opportunityScore}`);
  });

  return { topPages, allSorted };
}

/**
 * Build a quick summary of the full inventory for the report header.
 */
export function buildInventorySummary(allSorted) {
  if (!allSorted || allSorted.length === 0) {
    return {
      totalPages: 0, avgScore: 0, pagesBelow30: 0, pagesBelow50: 0,
      signalAverages: {}, weakestSignal: "N/A",
      lowestPage: {}, highestPage: {}, topOpportunity: {},
    };
  }
  const scores = allSorted.map((p) => p.rawScore);
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const lowest = allSorted.reduce((a, b) => (a.rawScore < b.rawScore ? a : b));
  const highest = allSorted.reduce((a, b) => (a.rawScore > b.rawScore ? a : b));
  const topOpportunity = allSorted.reduce((a, b) =>
    a.opportunityScore > b.opportunityScore ? a : b
  );

  // Signal-level averages across all pages
  const signalNames = ["citations", "structure", "freshness", "authority", "entities", "directness"];
  const signalAverages = {};
  for (const s of signalNames) {
    const avg = Math.round(
      allSorted.reduce((a, p) => a + (p.signals[s] ?? 0), 0) / allSorted.length
    );
    signalAverages[s] = avg;
  }

  // Weakest site-wide signal
  const weakestSignal = Object.entries(signalAverages).sort((a, b) => a[1] - b[1])[0][0];

  return {
    totalPages: allSorted.length,
    avgScore: avg,
    lowestPage: lowest,
    highestPage: highest,
    topOpportunity,
    signalAverages,
    weakestSignal,
    pagesBelow30: allSorted.filter((p) => p.rawScore < 30).length,
    pagesBelow50: allSorted.filter((p) => p.rawScore < 50).length,
  };
}