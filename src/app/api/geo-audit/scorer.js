/**
 * src/app/api/geo-audit/scorer.js
 *
 * 15-signal GEO scorer with strict calibration.
 * Scores MUST be different across signals and pages — no clustering at 43–46.
 *
 * Signals (0–100 each):
 *  1. entities      — AI-Quotable Definitions
 *  2. directness    — Answer-First Structure
 *  3. structure     — FAQ Block Presence
 *  4. authority     — Schema Markup
 *  5. freshness     — Heading Hierarchy  (repurposed key, same slot)
 *  6. citations     — Citation Authority
 *  7. freshDate     — Freshness Signals
 *  8. authorCred    — Author & Source Credibility
 *  9. promptMatch   — Prompt-Matching Language
 * 10. topicalDepth  — Topical Depth & Coverage
 * 11. entityMention — Entity & Brand Mentions
 * 12. comparison    — Comparison & Contrast Content
 * 13. codeExamples  — Code & Technical Examples
 * 14. uniqueness    — Content Uniqueness
 * 15. internalLinks — Internal Link Density
 *
 * rawScore = weighted average of the 15 signals (100 pts total).
 */

/* ── Signal weights (sum = 100) ───────────────────────────────── */
const WEIGHTS = {
  entities:      10,   // AI-Quotable Definitions
  directness:    10,   // Answer-First Structure
  structure:     10,   // FAQ Block Presence
  authority:     10,   // Schema Markup
  freshness:      5,   // Heading Hierarchy
  citations:     10,   // Citation Authority
  freshDate:      7,   // Freshness Signals
  authorCred:     8,   // Author & Source Credibility
  promptMatch:    7,   // Prompt-Matching Language
  topicalDepth:   8,   // Topical Depth & Coverage
  entityMention:  5,   // Entity & Brand Mentions
  comparison:     4,   // Comparison & Contrast Content
  codeExamples:   2,   // Code & Technical Examples (0 if non-technical)
  uniqueness:     2,   // Content Uniqueness
  internalLinks:  2,   // Internal Link Density
};

const TOTAL_WEIGHT = Object.values(WEIGHTS).reduce((a,b)=>a+b,0); // should be 100

export const SIGNAL_MAX = {
  entities:      10,
  directness:    10,
  structure:     10,
  authority:     10,
  freshness:      5,
  citations:     10,
  freshDate:      7,
  authorCred:     8,
  promptMatch:    7,
  topicalDepth:   8,
  entityMention:  5,
  comparison:     4,
  codeExamples:   2,
  uniqueness:     2,
  internalLinks:  2,
};
/* ── Calibration bands (enforce variance) ────────────────────── */
// Generic marketing page with no data → below 30 overall
// Page with nothing: returns 0 for that signal
// Score 60+ only if the strict criteria met

/* ── Signal 1: AI-Quotable Definitions ───────────────────────── */
function scoreEntities(p) {
  const text = p.bodyText || "";
  const h = p.headings || [];

  // Look for patterns: "X is Y", "X means Y", boxed definitions
  const defPatterns = [
    /\b\w[\w\s]{2,30}\s+is\s+(a|an|the)\s+[\w\s]{5,80}[.,]/gi,
    /\b\w[\w\s]{2,30}\s+(refers?\s+to|means?|defined?\s+as)\s+[\w\s]{5,60}[.,]/gi,
    /\*\*[\w\s]{3,40}\*\*\s*[:\-]\s*[\w\s]{5,80}/gi,
  ];

  let defCount = 0;
  for (const pat of defPatterns) {
    const m = text.match(pat);
    if (m) defCount += m.length;
  }

  // check for boxed/callout definition markers in HTML
  const hasBoxedDef = (p.rawHtml || "").match(/class=["'][^"']*def(?:inition)?[^"']*["']/i);

  if (defCount === 0 && !hasBoxedDef) return 0;
  if (defCount === 1) return 25;
  if (defCount === 2) return 50;
  if (defCount >= 3 && !hasBoxedDef) return 65;
  if (defCount >= 3 && hasBoxedDef) return 85;
  return 40;
}

/* ── Signal 2: Answer-First Structure ────────────────────────── */
function scoreDirectness(p) {
  const text = p.bodyText || "";
  const h2s = (p.headings || []).filter(h => h.level === 2);
  const h3s = (p.headings || []).filter(h => h.level === 3);
  const allH = [...h2s, ...h3s];

  // Generic heading red flags
  const vagueTerms = /^(our\s+(approach|solution|service|team|story)|introduction|overview|about\s+us|solutions?|services?|features?|benefits?|get\s+started|contact\s+us|pricing|welcome)$/i;
  const vagueHeadings = allH.filter(h => vagueTerms.test(h.text.trim()));

  // Good headings: question format or declarative specific statements
  const goodPatterns = /^(how|why|what|when|where|which|who|does|is|are|can|should|will)\b/i;
  const specificH = allH.filter(h => goodPatterns.test(h.text.trim()));

  // Check if first paragraph opens with direct answer
  const firstPara = text.slice(0, 300);
  const openingsWithFluff = /^(in this (article|post|guide)|welcome to|today we|we are|this page|at \w+|our company|we help|we provide)/i;
  const directOpen = !openingsWithFluff.test(firstPara.trim());

  if (allH.length === 0) return 10;

  const vagueRatio = allH.length > 0 ? vagueHeadings.length / allH.length : 1;
  const goodRatio  = allH.length > 0 ? specificH.length / allH.length : 0;

  if (vagueRatio > 0.6) return 10;
  if (vagueRatio > 0.4) return 20;

  let score = 0;
  score += goodRatio >= 0.7 ? 40 : goodRatio >= 0.4 ? 25 : 10;
  score += directOpen ? 25 : 0;
  score += specificH.length >= 4 ? 15 : specificH.length >= 2 ? 10 : 0;

  return Math.min(score, 100);
}

/* ── Signal 3: FAQ Block Presence ────────────────────────────── */
function scoreStructure(p) {
  const html  = p.rawHtml  || "";
  const text  = p.bodyText || "";

  // FAQPage schema is the gold standard
  const hasFaqSchema = /"@type"\s*:\s*"FAQPage"/i.test(html);

  // Explicit FAQ section in headings or text
  const hasFaqHeading = (p.headings || []).some(h => /faq|frequently asked/i.test(h.text));

  // Count Q&A patterns: lines starting with Q: or ending with ?
  const qMatches = text.match(/\n[\s]*Q[:.)]\s+.{10,}/gi) || [];
  const questionLines = text.match(/\?\s*\n/g) || [];
  const qCount = qMatches.length + Math.floor(questionLines.length / 2);

  if (!hasFaqHeading && !hasFaqSchema && qCount < 2) return 0;

  if (hasFaqSchema && qCount >= 5) return 95;
  if (hasFaqSchema) return 80;
  if (hasFaqHeading && qCount >= 5) return 72;
  if (hasFaqHeading && qCount >= 2) return 52;
  if (hasFaqHeading) return 38;
  if (qCount >= 2) return 30;

  return 0;
}

/* ── Signal 4: Schema Markup ─────────────────────────────────── */
function scoreAuthority(p) {
  const html = p.rawHtml || "";
  const text = p.bodyText || "";

  // JSON-LD schema types
  const schemaTypes = ["Article","BlogPosting","FAQPage","HowTo","Product","Organization","Person","BreadcrumbList","WebPage"];
  let schemaCount = 0;
  for (const t of schemaTypes) {
    if (new RegExp(`"@type"\\s*:\\s*"${t}"`, "i").test(html)) schemaCount++;
  }

  // Author bylines
  const hasAuthorByline = /by\s+[A-Z][a-z]+\s+[A-Z][a-z]+|author[:–\-]\s*[A-Z]/i.test(text);

  // Publication dates
  const hasDate = /<(time|meta)[^>]+(datetime|datePublished|dateModified)[^>]*>/i.test(html)
    || /published|updated|last\s+modified/i.test(text.slice(0, 500));

  // Numbered step lists (HowTo signal)
  const hasStepList = /(step\s+\d|^\d+\.\s+.{10,})/im.test(text);

  let score = 0;
  if (schemaCount === 0 && !hasAuthorByline) return 5;
  if (schemaCount === 1) score += 50;
  if (schemaCount === 2) score += 65;
  if (schemaCount >= 3) score += 75;
  if (hasAuthorByline) score += 10;
  if (hasDate) score += 8;
  if (hasStepList) score += 7;

  return Math.min(score, 100);
}

/* ── Signal 5: Heading Hierarchy ─────────────────────────────── */
function scoreFreshness(p) {
  const headings = p.headings || [];
  if (headings.length === 0) return 10;

  const h1s = headings.filter(h => h.level === 1);
  const h2s = headings.filter(h => h.level === 2);
  const h3s = headings.filter(h => h.level === 3);

  // Exactly one H1
  if (h1s.length !== 1) return 15;

  // No H2s is bad
  if (h2s.length === 0) return 20;

  // Vague headings test
  const vague = /^(overview|introduction|about|solutions?|services?|features?|benefits?|section\s+\d)$/i;
  const vagueCount = headings.filter(h => vague.test(h.text.trim())).length;
  const vagueRatio = vagueCount / headings.length;

  // Skipped levels (H4 without H3, H3 without H2)
  const levels = headings.map(h => h.level);
  let skipped = 0;
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i-1] > 1) skipped++;
  }

  let score = 40; // base: has H1 + H2
  if (h2s.length >= 3) score += 10;
  if (h3s.length >= 2) score += 10;
  if (vagueRatio < 0.2) score += 20;
  if (vagueRatio < 0.1) score += 10;
  if (skipped === 0) score += 10;

  return Math.min(score, 100);
}

/* ── Signal 6: Citation Authority ───────────────────────────── */
function scoreCitations(p) {
  const text = p.bodyText || "";
  const links = p.links || [];

  // Authoritative outbound domains
  const authDomains = [
    /\.gov\b/, /\.edu\b/,
    /\b(gartner|forrester|mckinsey|hbr|harvard|mit|stanford|arxiv|ieee|acm|nature|science|pubmed)\b/i,
    /\b(techcrunch|wsj|nytimes|bloomberg|reuters|ft\.com|economist|guardian)\b/i,
    /\b(statista|searchengineland|semrush|moz|ahrefs|hubspot|salesforce)\b/i,
  ];

  const outLinks = links.filter(l => {
    try {
      const domain = new URL(l).hostname;
      return authDomains.some(r => r.test(domain));
    } catch { return false; }
  });

  // Statistics patterns: "73% of", "3.2x more", "$4.5 billion"
  const statPatterns = text.match(/\b\d+(\.\d+)?[\s]*(%|x\s+more|billion|million|thousand)\b/gi) || [];

  // Named frameworks/methodologies
  const frameworkPattern = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\s+(framework|methodology|model|study|report|index|survey)\b/i;
  const hasNamedFramework = frameworkPattern.test(text);

  // Customer results with metrics
  const caseStudyPattern = /\b(increased?|decreased?|grew|reduced?|improved?|achieved?)\s+[\w\s]+\s+by\s+\d+/i;
  const hasMetrics = caseStudyPattern.test(text);

  if (outLinks.length === 0 && statPatterns.length === 0 && !hasNamedFramework) return 0;

  let score = 0;
  score += Math.min(outLinks.length * 15, 45);
  score += Math.min(statPatterns.length * 8, 32);
  if (hasNamedFramework) score += 12;
  if (hasMetrics) score += 11;

  return Math.min(score, 100);
}

/* ── Signal 7: Freshness Signals ─────────────────────────────── */
function scoreFreshDate(p) {
  const html = p.rawHtml || "";
  const text = p.bodyText || "";

  const currentYear = new Date().getFullYear();
  const recentYears = [currentYear, currentYear - 1];

  const hasJsonLdDate = /"datePublished"|"dateModified"/i.test(html);
  const hasMetaDate  = /<meta[^>]+(datePublished|dateModified|article:published_time)[^>]*>/i.test(html);
  const hasTimeTag   = /<time[^>]+datetime/i.test(html);
  const hasVisibleDate = /published\s*:?|updated\s*:?|last\s+modified/i.test(text.slice(0, 600));
  const hasRecentYear  = recentYears.some(y => new RegExp(`\\b${y}\\b`).test(text));

  if (!hasJsonLdDate && !hasMetaDate && !hasTimeTag && !hasVisibleDate) return 0;

  let score = 0;
  if (hasVisibleDate) score += 40;
  if (hasTimeTag || hasMetaDate) score += 20;
  if (hasJsonLdDate) score += 15;
  if (hasRecentYear) score += 25;

  return Math.min(score, 100);
}

/* ── Signal 8: Author & Source Credibility ───────────────────── */
function scoreAuthorCred(p) {
  const html = p.rawHtml  || "";
  const text = p.bodyText || "";

  const hasPersonSchema = /"@type"\s*:\s*"Person"/i.test(html);
  const hasAuthorByline = /by\s+[A-Z][a-z]+\s+[A-Z][a-z]+/i.test(text.slice(0, 800));
  const hasAuthorBio    = /(about\s+the\s+author|author\s+bio|written\s+by)/i.test(text);
  const hasTitle        = /(ceo|cto|vp|director|founder|head\s+of|senior\s+|principal\s+|staff\s+)/i.test(text.slice(0, 600));
  const hasCredentials  = /(ph\.?d|m\.?s|m\.?b\.?a|certified|expert|specialist)/i.test(text.slice(0, 600));

  if (!hasAuthorByline && !hasPersonSchema) return 0;

  let score = 0;
  if (hasAuthorByline) score += 40;
  if (hasPersonSchema) score += 20;
  if (hasAuthorBio) score += 15;
  if (hasTitle || hasCredentials) score += 15;
  if (hasAuthorBio && (hasTitle || hasCredentials)) score += 10;

  return Math.min(score, 100);
}

/* ── Signal 9: Prompt-Matching Language ─────────────────────── */
function scorePromptMatch(p) {
  const text = p.bodyText || "";
  const h    = (p.headings || []).map(h => h.text).join(" ");
  const full = text + " " + h;

  // Question patterns in body or headings
  const howToPattern = full.match(/\bhow\s+(to|do|does|can|should)\b/gi) || [];
  const bestXForY    = full.match(/\bbest\s+\w+\s+(for|to)\b/gi) || [];
  const vsPatterns   = full.match(/\bvs\.?\s+|\bversus\b/gi) || [];

  // Natural developer/buyer language signals
  const naturalLang = full.match(/\b(step-by-step|beginner|advanced|example|tutorial|guide|walkthrough|checklist|comparison|review|alternative|vs)\b/gi) || [];

  // Question sentences in body
  const questionSentences = text.match(/[^.!?]*\?\s/g) || [];

  const totalSignals = howToPattern.length + bestXForY.length + vsPatterns.length
    + Math.floor(naturalLang.length / 2) + Math.min(questionSentences.length, 5);

  if (totalSignals === 0) return 10;
  if (totalSignals <= 2)  return 25;
  if (totalSignals <= 5)  return 45;
  if (totalSignals <= 9)  return 65;
  return 80;
}

/* ── Signal 10: Topical Depth & Coverage ────────────────────── */
function scoreTopicalDepth(p) {
  const text  = p.bodyText || "";
  const wc    = text.split(/\s+/).filter(Boolean).length;
  const h2s   = (p.headings || []).filter(h => h.level === 2);
  const h3s   = (p.headings || []).filter(h => h.level === 3);

  // Very short page
  if (wc < 300) return 10;

  // Check if page covers multiple angles
  const angleIndicators = text.match(/\b(however|on the other hand|alternatively|in contrast|another (approach|way|option)|some (argue|say|believe)|pros\s+and\s+cons|trade.?off|limitation|caveat|downside|upside)\b/gi) || [];

  // Objection handling
  const objectionHandling = text.match(/\b(you might (wonder|ask|think)|common (question|concern|misconception)|frequently asked|what about|but wait|not (all|every|always))\b/gi) || [];

  let score = 0;
  if (wc >= 800)  score += 20;
  if (wc >= 1500) score += 15;
  if (wc >= 2500) score += 10;
  score += Math.min(h2s.length * 5, 20);
  score += Math.min(h3s.length * 3, 12);
  score += Math.min(angleIndicators.length * 5, 15);
  score += Math.min(objectionHandling.length * 4, 8);

  return Math.min(score, 100);
}

/* ── Signal 11: Entity & Brand Mentions ─────────────────────── */
function scoreEntityMention(p) {
  const text = p.bodyText || "";

  // Well-known tech entities
  const techEntities = [
    /\b(google|microsoft|amazon|aws|azure|gcp|github|gitlab|slack|notion|figma|vercel)\b/i,
    /\b(kubernetes|docker|terraform|ansible|jenkins|github\s+actions|circleci)\b/i,
    /\b(react|nextjs|vue|angular|svelte|node\.?js|python|typescript|rust|golang)\b/i,
    /\b(openai|anthropic|claude|chatgpt|perplexity|gemini|llama|mistral|langchain)\b/i,
    /\b(stripe|twilio|sendgrid|auth0|datadog|sentry|grafana|prometheus)\b/i,
  ];

  let entityCount = 0;
  for (const pattern of techEntities) {
    const matches = text.match(new RegExp(pattern.source, "gi")) || [];
    entityCount += new Set(matches.map(m => m.toLowerCase())).size;
  }

  // Generic proper nouns (capitalized multi-word names)
  const properNouns = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/g) || [];
  const uniqueProper = new Set(properNouns).size;

  if (entityCount === 0 && uniqueProper < 3) return 10;

  let score = 0;
  score += Math.min(entityCount * 8, 40);
  score += Math.min(uniqueProper * 2, 30);
  if (entityCount >= 5) score += 10;

  return Math.min(score, 100);
}

/* ── Signal 12: Comparison & Contrast Content ───────────────── */
function scoreComparison(p) {
  const html = p.rawHtml  || "";
  const text = p.bodyText || "";

  // Comparison table in HTML
  const hasTable = /<table/i.test(html);

  // VS / versus patterns
  const vsCount = (text.match(/\bvs\.?\b|\bversus\b/gi) || []).length;

  // Explicit comparison section heading
  const comparisonHeading = (p.headings || []).some(h =>
    /vs\.?|versus|compared?|comparison|alternative|difference|pro[s]?\s+and\s+con[s]?|trade.?off/i.test(h.text)
  );

  // Pros/cons list
  const hasProsConsSection = /pros?\s*[:\n]|cons?\s*[:\n]|advantages?\s*[:\n]|disadvantages?\s*[:\n]/i.test(text);

  if (!hasTable && vsCount === 0 && !comparisonHeading && !hasProsConsSection) return 0;

  let score = 0;
  if (vsCount >= 1) score += 20;
  if (vsCount >= 3) score += 15;
  if (comparisonHeading) score += 20;
  if (hasProsConsSection) score += 20;
  if (hasTable) score += 25;

  return Math.min(score, 100);
}

/* ── Signal 13: Code & Technical Examples ───────────────────── */
function scoreCodeExamples(p) {
  const html = p.rawHtml  || "";
  const text = p.bodyText || "";

  // Non-technical page — give neutral 50
  const isTechnical = /\b(code|api|sdk|cli|command|terminal|bash|python|javascript|typescript|install|npm|pip|docker|kubectl|git|curl|json|yaml|config)\b/i.test(text);
  if (!isTechnical) return 50; // N/A pages score neutral

  const codeBlocks   = (html.match(/<(code|pre)[^>]*>/gi) || []).length;
  const backticks    = (text.match(/```[\s\S]*?```/g) || []).length;
  const inlineCode   = (text.match(/`[^`\n]{2,40}`/g) || []).length;
  const shellCommands = text.match(/\$\s+\w+|npm\s+(install|run)|pip\s+install|docker\s+(run|build|pull)|kubectl\s+\w+/gi) || [];

  if (codeBlocks === 0 && backticks === 0 && shellCommands.length === 0) return 10;

  let score = 0;
  score += Math.min(codeBlocks * 15, 45);
  score += Math.min(backticks * 15, 30);
  score += Math.min(inlineCode * 3, 15);
  score += Math.min(shellCommands.length * 5, 10);

  return Math.min(score, 100);
}

/* ── Signal 14: Content Uniqueness ──────────────────────────── */
function scoreUniqueness(p) {
  const text = p.bodyText || "";

  // Proprietary data signals
  const proprietaryData = text.match(/\b(we (found|discovered|analyzed|tracked|measured|surveyed)|our (study|research|data|analysis|clients?|customers?)|in\s+\d{4}\s+we|proprietary|internal\s+data)\b/gi) || [];

  // Original frameworks/methodologies (Title Case multi-word names)
  const ownedConcepts = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}\s+(Framework|Model|Method|Approach|System|Protocol|Score|Index)\b/g) || [];

  // Generic phrases that signal recycled content
  const genericPhrases = text.match(/\b(in today's digital world|in the ever.evolving|leverage|synergy|holistic approach|end-to-end solution|cutting.edge|state.of.the.art|best.in.class|world.class)\b/gi) || [];

  // Case study specificity
  const caseStudyDetail = text.match(/\b\d+\s*(clients?|customers?|companies|users|pages?|months?|weeks?)\b/gi) || [];

  if (genericPhrases.length > 5 && proprietaryData.length === 0) return 10;

  let score = 30; // baseline
  score += Math.min(proprietaryData.length * 10, 30);
  score += Math.min(ownedConcepts.length * 10, 20);
  score += Math.min(caseStudyDetail.length * 5, 15);
  score -= Math.min(genericPhrases.length * 3, 20);

  return Math.max(10, Math.min(score, 100));
}

/* ── Signal 15: Internal Link Density ───────────────────────── */
function scoreInternalLinks(p) {
  const links    = p.links    || [];
  const domain   = p.domain   || "";
  const bodyText = p.bodyText || "";
  const wc       = bodyText.split(/\s+/).filter(Boolean).length;

  // Count internal links (same domain or relative)
  const internalLinks = links.filter(l => {
    if (!l.startsWith("http")) return true; // relative
    try {
      return new URL(l).hostname === new URL(domain).hostname;
    } catch { return false; }
  });

  const count = internalLinks.length;

  if (count === 0) return 0;
  if (count === 1) return 25;
  if (count === 2) return 38;
  if (count <= 4)  return 52;
  if (count <= 7)  return 70;
  return 85;
}

/* ── Calibration: force variance ────────────────────────────── */
/**
 * A completely generic marketing page (no definitions, no FAQ, no stats,
 * no author, no schema) MUST score below 30 overall.
 *
 * We enforce this by checking if ALL of the "hard" signals are near 0.
 */
function applyCalibration(signals) {
  const hard = ["entities","citations","structure","authority","authorCred"];
  const allNearZero = hard.every(s => signals[s] < 20);
  if (allNearZero) {
    // Cap the softer signals too — generic page cannot score well
    const softCap = { directness:25, freshness:40, freshDate:30, promptMatch:30,
                      topicalDepth:30, entityMention:30, comparison:20,
                      codeExamples:50, uniqueness:20, internalLinks:40 };
    for (const [k,cap] of Object.entries(softCap)) {
      if (signals[k] > cap) signals[k] = cap;
    }
  }
  return signals;
}

/* ── Compute rawScore (weighted average 0–100) ───────────────── */
function computeRawScore(signals) {
  let weighted = 0;
  for (const [sig, weight] of Object.entries(WEIGHTS)) {
    weighted += (signals[sig] ?? 0) * weight;
  }
  return Math.round(weighted / TOTAL_WEIGHT);
}

/* ── Top gaps ────────────────────────────────────────────────── */
function computeTopGaps(signals, n = 4) {
  // Sort by signal score ascending — lowest = biggest gap
  return Object.entries(signals)
    .filter(([,v]) => v < 60)
    .sort(([,a],[,b]) => a - b)
    .slice(0, n)
    .map(([k]) => k);
}

/* ── Gap score & opportunity score ──────────────────────────── */
function computeOpportunityScore(rawScore, pageType) {
  const gapScore = 100 - rawScore;
  const pageWeights = { blog:1.5, guide:1.5, product:1.2, home:1.3, about:0.4, default:1.0 };
  const pw = pageWeights[pageType] ?? pageWeights.default;
  return Math.round(gapScore * pw);
}

/* ── Main exported scorer ────────────────────────────────────── */
export function scorePage(page) {
  const signals = {
    entities:      scoreEntities(page),
    directness:    scoreDirectness(page),
    structure:     scoreStructure(page),
    authority:     scoreAuthority(page),
    freshness:     scoreFreshness(page),
    citations:     scoreCitations(page),
    freshDate:     scoreFreshDate(page),
    authorCred:    scoreAuthorCred(page),
    promptMatch:   scorePromptMatch(page),
    topicalDepth:  scoreTopicalDepth(page),
    entityMention: scoreEntityMention(page),
    comparison:    scoreComparison(page),
    codeExamples:  scoreCodeExamples(page),
    uniqueness:    scoreUniqueness(page),
    internalLinks: scoreInternalLinks(page),
  };

  applyCalibration(signals);

  const rawScore        = computeRawScore(signals);
  const topGaps         = computeTopGaps(signals);
  const gapScore        = 100 - rawScore;
  const opportunityScore = computeOpportunityScore(rawScore, page.type || "default");

  return { ...page, signals, rawScore, gapScore, opportunityScore, topGaps };
}

export function scorePages(pages) {
  return pages.map(scorePage);
}