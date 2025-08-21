// Local storage cache for Reddit tools (current mentions & keyword searches)
// Keeps data lightweight with TTL and entry limits.

const STORAGE_KEY = 'redditToolCache_v1';
const TTL_MS = 30 * 60 * 1000; // 30 minutes
const MAX_BRAND_ENTRIES = 5;
const MAX_KEYWORD_ENTRIES = 8;
const MAX_ITEMS_PER_TYPE = 500; // cap posts/comments per brand

function now() { return Date.now(); }
function safeJSONParse(v) { try { return JSON.parse(v); } catch { return null; } }
function readRoot() { if (typeof window === 'undefined') return {}; return safeJSONParse(localStorage.getItem(STORAGE_KEY)) || {}; }
function writeRoot(root) { if (typeof window === 'undefined') return; try { localStorage.setItem(STORAGE_KEY, JSON.stringify(root)); } catch { /* quota ignored */ } }

// Brand (current mentions) caching
export function loadCurrentMentions(brand) {
  const root = readRoot();
  const cm = root.currentMentions; if (!cm) return null;
  const entry = cm.entries?.[brand]; if (!entry) return null;
  if (now() - (entry.ts || 0) > TTL_MS) return null;
  return { ...entry, brand };
}

export function loadLastBrandEntry() {
  const root = readRoot();
  const cm = root.currentMentions; if (!cm || !cm.lastBrand) return null;
  return loadCurrentMentions(cm.lastBrand);
}

export function saveCurrentMentions(brand, data) {
  if (!brand) return;
  const root = readRoot();
  if (!root.currentMentions) root.currentMentions = { lastBrand: brand, entries: {} };
  root.currentMentions.lastBrand = brand;
  const entries = root.currentMentions.entries;
  // prune expired
  for (const b of Object.keys(entries)) {
    if (now() - (entries[b].ts || 0) > TTL_MS) delete entries[b];
  }
  const keys = Object.keys(entries);
  if (keys.length >= MAX_BRAND_ENTRIES && !entries[brand]) {
    let oldest = null; let oldestTs = Infinity;
    for (const k of keys) { const t = entries[k].ts || 0; if (t < oldestTs) { oldest = k; oldestTs = t; } }
    if (oldest) delete entries[oldest];
  }
  entries[brand] = {
    ts: now(),
    posts: (data.posts || []).slice(0, MAX_ITEMS_PER_TYPE),
    comments: (data.comments || []).slice(0, MAX_ITEMS_PER_TYPE),
    postsAfter: data.postsAfter || null,
    commentsAfter: data.commentsAfter || null,
    done: !!data.done
  };
  writeRoot(root);
}

// Keyword search caching
function hashKeywords(keywords) { return keywords.map(k => k.toLowerCase().trim()).sort().join('|'); }

export function loadKeywordResults(keywords) {
  const root = readRoot(); const fp = root.findPosts; if (!fp) return null;
  const entry = fp.entries?.[hashKeywords(keywords)];
  if (!entry) return null;
  if (now() - (entry.ts || 0) > TTL_MS) return null;
  return entry.results;
}

export function saveKeywordResults(keywords, results) {
  const root = readRoot(); if (!root.findPosts) root.findPosts = { entries: {} };
  const entries = root.findPosts.entries;
  for (const k of Object.keys(entries)) { if (now() - (entries[k].ts || 0) > TTL_MS) delete entries[k]; }
  const keys = Object.keys(entries);
  if (keys.length >= MAX_KEYWORD_ENTRIES) {
    let oldest = null; let oldestTs = Infinity;
    for (const k of keys) { const t = entries[k].ts || 0; if (t < oldestTs) { oldest = k; oldestTs = t; } }
    if (oldest) delete entries[oldest];
  }
  entries[hashKeywords(keywords)] = { ts: now(), keywords: [...keywords], results };
  writeRoot(root);
}

export function clearRedditToolCache() { if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY); }
