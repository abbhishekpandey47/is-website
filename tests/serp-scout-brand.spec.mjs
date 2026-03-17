/**
 * SERP Scout UI Brand Visual Test Suite
 *
 * Tests CSS/styling changes across all SERP Scout tabs.
 * Reads source JSX files and validates style attributes/classes.
 *
 * Usage:  node tests/serp-scout-brand.spec.mjs
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Brand constants ──────────────────────────────────────────────────────────
const BRAND        = '#5f64ff';
const BRAND_DIM    = 'rgba(95,100,255,0.08)';
const BRAND_BORDER = 'rgba(95,100,255,0.22)';
const BRAND_GLOW   = 'rgba(95,100,255,0.3)';
const GRAD_START   = '#c084fc';
const GRAD_END     = '#60a5fa';
const ORANGE       = '#f97316';

// ── Helpers ──────────────────────────────────────────────────────────────────
function readSrc(relPath) {
  return readFileSync(join(ROOT, relPath), 'utf-8');
}

let passed = 0;
let failed = 0;
const failures = [];

function assert(id, name, condition, detail = '') {
  if (condition) {
    passed++;
    console.log(`  ✅ #${id} ${name}`);
  } else {
    failed++;
    const msg = `  ❌ #${id} ${name}${detail ? ' — ' + detail : ''}`;
    console.log(msg);
    failures.push(msg);
  }
}

/** Extract N lines around a needle from source */
function context(src, needle, before = 5, after = 5) {
  const idx = src.indexOf(needle);
  if (idx === -1) return '';
  const start = src.lastIndexOf('\n', Math.max(0, idx - 300));
  const end = src.indexOf('\n', idx + needle.length + 300);
  return src.slice(Math.max(0, start), end === -1 ? undefined : end);
}

/** Get a block of source between two needles */
function between(src, startNeedle, endNeedle) {
  const s = src.indexOf(startNeedle);
  if (s === -1) return '';
  const e = src.indexOf(endNeedle, s + startNeedle.length);
  if (e === -1) return src.slice(s);
  return src.slice(s, e + endNeedle.length);
}

// ── Load source files ────────────────────────────────────────────────────────
const page     = readSrc('src/app/serp-scout/page.jsx');
const analysis = readSrc('src/app/serp-scout/components/AnalysisPanel.jsx');
const postCard = readSrc('src/app/serp-scout/components/PostCard.jsx');
const layout   = readSrc('src/app/serp-scout/layout.jsx');
const wrapper  = readSrc('src/app/ClientLayoutWrapper.js');

// ═══════════════════════════════════════════════════════════════════════════════
// DOMAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n📄 DOMAIN PAGE\n');

// #1 Active "Domain" tab
(() => {
  const ctx = context(page, 'value="domain"');
  assert(1, 'Active "Domain" tab → border-bottom BRAND',
    ctx.includes(`border-[${BRAND}]`));
  assert('1b', 'Active "Domain" tab → no white/orange border',
    !ctx.includes('border-white') && !ctx.includes('border-orange'));
})();

// #2 Hero icon container
(() => {
  const ctx = context(page, 'h-14 w-14 rounded-2xl');
  assert(2, 'Hero icon bg → brand rgba',
    ctx.includes('rgba(95,100,255,0.1)'));
  assert('2b', 'Hero icon border → brand rgba',
    ctx.includes('rgba(95,100,255,0.3)'));
  assert('2c', 'Hero icon SVG stroke → BRAND',
    ctx.includes(BRAND));
})();

// #3 Analyze button
(() => {
  const ctx = context(page, 'onClick={handleAnalyzeDomain}', 0, 10);
  assert(3, 'Analyze button bg → BRAND',
    ctx.includes(`background: '${BRAND}'`));
  assert('3b', 'Analyze button text → white',
    ctx.includes('text-white'));
  assert('3c', 'Analyze button → no orange bg',
    !ctx.includes(ORANGE));
  assert('3d', 'Analyze button → has brand glow shadow',
    ctx.includes('rgba(95,100,255,0.3)'));
})();

// #4 Feature cards / step section
(() => {
  const ctx = between(page, "num: '01'", "step.label}");
  assert(4, 'Step numbers → gradient text (c084fc)',
    ctx.includes(GRAD_START));
  assert('4b', 'Step icon SVGs → not plain white',
    ctx.includes(GRAD_START) && ctx.includes('#a78bfa') && ctx.includes(GRAD_END));
  // Save tab hidden
  const saveTab = context(page, 'value="save"');
  assert('4c', '"Save" tab is hidden from nav',
    saveTab.includes('className="hidden"'));
})();

// #5 CTA button
(() => {
  const ctx = context(page, 'Book a free consultation', 10, 5);
  assert(5, 'CTA button bg → BRAND',
    ctx.includes(BRAND));
  assert('5b', 'CTA button → no orange bg',
    !ctx.includes(ORANGE) && !ctx.includes('bg-orange'));
  assert('5c', 'CTA button → brand glow shadow',
    ctx.includes('rgba(95,100,255,0.3)'));
})();


// ═══════════════════════════════════════════════════════════════════════════════
// OVERVIEW PAGE
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n📄 OVERVIEW PAGE\n');

// #6 Active "Overview" tab
(() => {
  const ctx = context(page, 'value="overview"');
  assert(6, 'Active "Overview" tab → border BRAND',
    ctx.includes(`border-[${BRAND}]`));
})();

// #7 Domain pill
(() => {
  const ctx = context(page, 'truncate max-w-48');
  assert(7, 'Domain pill bg → brand dim',
    ctx.includes('rgba(95,100,255,0.08)'));
  assert('7b', 'Domain pill border → brand',
    ctx.includes('rgba(95,100,255,0.2)'));
})();

// #8 Company Overview card
(() => {
  const ctx = context(page, 'Company Overview', 5, 0);
  assert(8, 'Company Overview card → brand border',
    ctx.includes("border: '0.5px solid rgba(95,100,255,0.2)'"));
})();

// #9 Edit button
(() => {
  const ctx = context(page, '<Edit2 className="h-3.5 w-3.5 mr-1"', 15, 3);
  assert(9, 'Edit button color → BRAND',
    ctx.includes(`color: '${BRAND}'`));
  assert('9b', 'Edit button bg → brand dim',
    ctx.includes('rgba(95,100,255,0.08)'));
  assert('9c', 'Edit button border → brand',
    ctx.includes('rgba(95,100,255,0.2)'));
})();

// #10 Section labels
(() => {
  const ctx = context(page, '>Core Capabilities</p>', 10, 0);
  assert(10, 'CORE CAPABILITIES → gradient text (c084fc)',
    ctx.includes(GRAD_START));
  assert('10b', 'CORE CAPABILITIES → transparent fill',
    ctx.includes('WebkitTextFillColor') && ctx.includes('transparent'));
  const ctx2 = context(page, '>Problem Spaces</p>', 10, 0);
  assert('10c', 'PROBLEM SPACES → gradient text',
    ctx2.includes(GRAD_START) && ctx2.includes(GRAD_END));
})();

// #11 Capability and problem space tags
(() => {
  const ctx = between(page, 'activeCtx.coreCapabilities.map', '</Badge>');
  assert(11, 'Capability tags bg → brand dim',
    ctx.includes('rgba(95,100,255,0.08)'));
  assert('11b', 'Capability tags border → brand',
    ctx.includes('rgba(95,100,255,0.2)'));
  assert('11c', 'Capability tags → no orange',
    !ctx.includes(ORANGE));
  const ctx2 = between(page, 'activeCtx.problemSpaces.map', '</Badge>');
  assert('11d', 'Problem tags bg → brand dim',
    ctx2.includes('rgba(95,100,255,0.08)'));
})();

// #12 Review Keywords button
(() => {
  const ctx = context(page, 'Review Keywords', 8, 3);
  assert(12, 'Review Keywords bg → BRAND',
    ctx.includes(`background: '${BRAND}'`));
  assert('12b', 'Review Keywords text → white',
    ctx.includes('text-white'));
  assert('12c', 'Review Keywords → brand glow',
    ctx.includes('rgba(95,100,255,0.3)'));
  assert('12d', 'Review Keywords → no outline style',
    ctx.includes('border-none'));
})();


// ═══════════════════════════════════════════════════════════════════════════════
// KEYWORDS PAGE
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n📄 KEYWORDS PAGE\n');

// #13 Active "Keywords" tab
(() => {
  const ctx = context(page, 'value="keywords"');
  assert(13, 'Active "Keywords" tab → border BRAND',
    ctx.includes(`border-[${BRAND}]`));
})();

// #14 Keywords count badge
(() => {
  const ctx = between(page, '{keywords.length}', '</span>');
  assert(14, 'Keywords count badge bg → brand',
    ctx.includes('rgba(95,100,255,0.15)') || page.includes('bg-[rgba(95,100,255,0.15)]'));
  assert('14b', 'Keywords count badge color → BRAND',
    page.includes(`text-[${BRAND}]`));
})();

// #15 "Your saved keywords are ready" banner
(() => {
  const ctx = context(page, 'Your saved keywords are ready', 15, 15);
  assert(15, 'Saved keywords banner bg → brand dim',
    ctx.includes('rgba(95,100,255,0.08)'));
  assert('15b', 'Saved keywords banner border → brand',
    ctx.includes('rgba(95,100,255,0.2)'));
})();

// #16 "Go to Analyze" button
(() => {
  const ctx = context(page, 'Go to Analyze', 8, 3);
  assert(16, '"Go to Analyze" bg → BRAND',
    ctx.includes(`background: '${BRAND}'`));
  assert('16b', '"Go to Analyze" text → white',
    ctx.includes('text-white'));
})();

// #17 Keyword rows border
(() => {
  const ctx = context(page, 'selectedKwIds.has(idx)\n', 0, 15) ||
              context(page, "selectedKwIds.has(idx)", 0, 20);
  // Find the Card style for keyword rows
  const cardCtx = between(page, '<Card\n                  key={idx}', '</CardContent>');
  assert(17, 'Keyword rows → brand border (selected)',
    cardCtx.includes('rgba(95,100,255,0.4)') || cardCtx.includes('rgba(95,100,255,0.05)'));
  assert('17b', 'Keyword rows → brand border (unselected)',
    cardCtx.includes('rgba(95,100,255,0.1)'));
})();

// #18 Checked checkboxes
(() => {
  const ctx = context(page, "background: '#5f64ff', borderColor: '#5f64ff'");
  assert(18, 'Checked checkbox bg → BRAND',
    ctx.includes(`background: '${BRAND}'`));
})();

// #19 "Commercial" intent tags
(() => {
  const ctx = context(page, "kw.intent === 'informational'", 0, 10);
  assert(19, 'Commercial tags bg → brand rgba',
    ctx.includes('rgba(95,100,255,0.12)'));
  assert('19b', 'Commercial tags color → #a5b4fc',
    ctx.includes('#a5b4fc'));
})();

// #20 "Informational" intent tags
(() => {
  const ctx = context(page, "kw.intent === 'informational'", 0, 10);
  assert(20, 'Informational tags bg → blue rgba',
    ctx.includes('rgba(96,165,250,0.1)'));
  assert('20b', 'Informational tags color → #93c5fd',
    ctx.includes('#93c5fd'));
})();

// #21 "5 prompts" links
(() => {
  const ctx = context(page, 'expandedKw === idx', 10, 5);
  assert(21, '"prompts" links → BRAND color',
    ctx.includes(`color: '${BRAND}'`) || ctx.includes(`style={{ color: '${BRAND}' }}`));
})();

// #22 "Add Keyword" button
(() => {
  const ctx = context(page, '>Add Keyword', 10, 1);
  assert(22, '"Add Keyword" button color → BRAND',
    ctx.includes(`color: '${BRAND}'`));
  assert('22b', '"Add Keyword" button bg → brand dim',
    ctx.includes('rgba(95,100,255,0.08)'));
})();

// #23 "Add Competitors & Save" button
(() => {
  const ctx = context(page, 'Add Competitors & Save', 8, 3);
  assert(23, '"Add Competitors & Save" bg → BRAND',
    ctx.includes(`background: '${BRAND}'`));
  assert('23b', '"Add Competitors & Save" text → white',
    ctx.includes('text-white'));
  assert('23c', '"Add Competitors & Save" → brand glow',
    ctx.includes('rgba(95,100,255,0.3)'));
})();

// #24 "Select all" link
(() => {
  const ctx = context(page, '>Select all<', 5, 0) || context(page, 'Select all', 5, 1);
  assert(24, '"Select all" → BRAND color',
    ctx.includes(BRAND));
})();


// ═══════════════════════════════════════════════════════════════════════════════
// ANALYZE PAGE (AnalysisPanel.jsx)
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n📄 ANALYZE PAGE\n');

// #25 Active "Analyze" tab
(() => {
  // Main page Analyze tab
  const ctx = context(page, 'value="analyze" disabled={!saved}');
  assert(25, 'Active "Analyze" tab → border BRAND',
    ctx.includes(`border-[${BRAND}]`));
})();

// #26 Keyword tags — unselected state
(() => {
  assert(26, 'Unselected keyword tags → dark bg (#1a1a1a)',
    analysis.includes("background: '#1a1a1a'"));
  assert('26b', 'Unselected keyword tags → dark border',
    analysis.includes("border: '0.5px solid #2a2a2a'"));
})();

// #27 Keyword tags — selected state
(() => {
  assert(27, 'Selected keyword tags → brand bg',
    analysis.includes("background: 'rgba(95,100,255,0.08)'"));
  assert('27b', 'Selected keyword tags → brand border',
    analysis.includes(`border: '0.5px solid ${BRAND}'`));
})();

// #28 "Run Analysis" button
(() => {
  const ctx = context(analysis, 'onClick={handleRunAnalysis}', 0, 15);
  assert(28, '"Run Analysis" bg → BRAND',
    ctx.includes(`background: '${BRAND}'`));
  assert('28b', '"Run Analysis" text → white',
    ctx.includes('text-white'));
  assert('28c', '"Run Analysis" → brand glow',
    ctx.includes('0 0 14px rgba(95,100,255,0.3)'));
})();

// #29 Analysis card border
(() => {
  assert(29, 'Analysis card → brand border',
    analysis.includes("border: '0.5px solid rgba(95,100,255,0.22)'"));
})();

// #30 Card icon container
(() => {
  assert(30, 'Card icon container → brand bg',
    analysis.includes("background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.22)'"));
})();


// ═══════════════════════════════════════════════════════════════════════════════
// ANALYZE RESULTS STATE
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n📄 ANALYZE RESULTS STATE\n');

// #31 "Running..." button
(() => {
  const ctx = context(analysis, 'onClick={handleRunAnalysis}', 0, 20);
  assert(31, '"Running..." button → brand styling',
    ctx.includes(`background: '${BRAND}'`));
  assert('31b', 'Spinner element exists in running state',
    ctx.includes('Running') && ctx.includes('Spinner'));
})();

// #32 Active result tab
(() => {
  const ctx = context(analysis, 'value="serp"');
  assert(32, 'Result tab "SERP Threads" → border BRAND',
    ctx.includes(`border-[${BRAND}]`));
  const ctx2 = context(analysis, 'value="top"');
  assert('32b', 'Result tab "Top" → border BRAND',
    ctx2.includes(`border-[${BRAND}]`));
})();

// #33 Result count badges
(() => {
  const ctx = context(analysis, 'serpThreads.length + dorkThreads.length}', 0, 5);
  assert(33, 'Result count badge → brand bg',
    ctx.includes('rgba(95,100,255,0.08)'));
  assert('33b', 'Result count badge → BRAND color',
    ctx.includes(BRAND));
})();

// #34 Results section card borders
(() => {
  const matches = analysis.match(/border: '0\.5px solid rgba\(95,100,255,0\.22\)'/g) || [];
  assert(34, 'All result section cards → brand border',
    matches.length >= 4,
    `Expected ≥4, found ${matches.length}`);
})();

// #35 Thread external link icons (PostCard)
(() => {
  const ctx = context(postCard, '<ExternalLink className="h-3.5', 5, 3);
  assert(35, 'PostCard link icon → BRAND stroke',
    ctx.includes(BRAND));
})();

// #36 Upvote indicators stay green
(() => {
  assert(36, 'Upvotes → green color (not brand blue)',
    postCard.includes('text-emerald-600') || postCard.includes('text-emerald-400'));
  const upCtx = context(postCard, '↑', 0, 3);
  assert('36b', 'Upvotes → NOT brand blue',
    !upCtx.includes(BRAND));
})();


// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL LAYOUT CHECKS
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n📄 GLOBAL LAYOUT CHECKS\n');

// #37 Global site header not on /serp-scout
(() => {
  assert(37, 'Global navbar hidden on /serp-scout',
    wrapper.includes('"/serp-scout"') &&
    wrapper.includes('hideNavbar') &&
    wrapper.includes('shouldShowNavbar'));
})();

// #38 Global announcement bar not on /serp-scout
(() => {
  assert(38, 'Announcement bar hidden on /serp-scout',
    wrapper.includes('shouldShowAwardBanner') &&
    wrapper.includes('!hideNavBarAndFooter'));
})();

// #39 Global footer not on /serp-scout
(() => {
  assert(39, 'Global footer hidden on /serp-scout',
    wrapper.includes('!hideNavBarAndFooter') &&
    wrapper.includes('<Footer'));
})();

// #40 Promo link bar removed
(() => {
  assert(40, 'Promo link bar NOT in page',
    !page.includes('reddit marketing services') &&
    !page.includes('Read client case studies') &&
    !page.includes('View pricing plans'));
})();


// ═══════════════════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n' + '═'.repeat(60));
console.log(`\n  Total: ${passed + failed}  |  ✅ Passed: ${passed}  |  ❌ Failed: ${failed}\n`);
if (failures.length > 0) {
  console.log('  Failures:');
  failures.forEach(f => console.log(f));
  console.log('');
}
console.log('═'.repeat(60) + '\n');

process.exit(failed > 0 ? 1 : 0);
