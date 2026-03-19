'use client';

import { useState, useEffect } from 'react';
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/Components/ui/tabs';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Badge } from '@/Components/ui/badge';
import { Skeleton } from '@/Components/ui/skeleton';
import {
  Sparkles, AlertCircle, Search, Zap,
  ExternalLink, Loader2, TrendingUp, Clock,
} from 'lucide-react';
import PostCard from './PostCard';

function Spinner({ className = 'h-4 w-4' }) {
  return <Loader2 className={`${className} animate-spin`} />;
}

const MODEL_STYLES = {
  perplexity: { label: 'Perplexity', bg: 'bg-purple-500/15', text: 'text-purple-700', border: 'border-purple-500/30' },
  openai:     { label: 'GPT',        bg: 'bg-green-500/15',  text: 'text-green-700',  border: 'border-green-500/30' },
  anthropic:  { label: 'Claude',     bg: 'bg-orange-500/15', text: 'text-orange-700', border: 'border-orange-500/30' },
};

function getModelStyle(modelId = '') {
  const id = modelId.toLowerCase();
  if (id.includes('perplexity')) return MODEL_STYLES.perplexity;
  if (id.includes('openai') || id.includes('gpt')) return MODEL_STYLES.openai;
  if (id.includes('anthropic') || id.includes('claude')) return MODEL_STYLES.anthropic;
  const label = modelId.split('/').pop()?.split(':')[0] ?? modelId;
  return { label, bg: 'bg-gray-500/15', text: 'text-gray-700', border: 'border-gray-500/30' };
}

const PLATFORM_STYLES = {
  'ChatGPT':    { bg: 'bg-green-500/10',  text: 'text-green-700',  border: 'border-green-400/30' },
  'Perplexity': { bg: 'bg-purple-500/10', text: 'text-purple-700', border: 'border-purple-400/30' },
  'Gemini':     { bg: 'bg-blue-500/10',   text: 'text-blue-700',   border: 'border-blue-400/30' },
  'Google AI':  { bg: 'bg-amber-500/10',  text: 'text-amber-700',  border: 'border-amber-400/30' },
};

function PlatformBadge({ name }) {
  const s = PLATFORM_STYLES[name] || { bg: 'bg-gray-500/10', text: 'text-gray-700', border: 'border-gray-400/30' };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${s.bg} ${s.text} ${s.border}`}>
      {name}
    </span>
  );
}

/**
 * Flatten records (prompt → platform → urls) into url-centric rows:
 * url → { title, subreddit, platforms: Set, prompts: Set }
 * Sorted by platform count desc, then prompt count desc.
 */
function buildUrlRows(records) {
  const urlMap = new Map();
  records.forEach(rec => {
    Object.entries(rec.models || {}).forEach(([platform, posts]) => {
      if (!Array.isArray(posts)) return;
      posts.forEach(post => {
        const url = post.url || '';
        if (!url) return;
        if (!urlMap.has(url)) {
          const subreddit = post.subreddit || url.match(/\/r\/([^/]+)/)?.[1] || '';
          const title = post.title && post.title !== url ? post.title : subreddit ? `r/${subreddit} discussion` : url;
          urlMap.set(url, { url, title, subreddit, platforms: new Set(), prompts: new Set() });
        }
        urlMap.get(url).platforms.add(platform);
        urlMap.get(url).prompts.add(rec.prompt);
      });
    });
  });
  return Array.from(urlMap.values())
    .sort((a, b) => b.platforms.size - a.platforms.size || b.prompts.size - a.prompts.size)
    .map(r => ({ ...r, platforms: Array.from(r.platforms), prompts: Array.from(r.prompts) }));
}

/** Table: rows = unique Reddit URLs, cols = Thread | Subreddit | Cited By | Found Via */
function CitationByPrompt({ records }) {
  if (!records.length) return null;
  const rows = buildUrlRows(records);
  if (!rows.length) return (
    <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
      <AlertCircle className="h-8 w-8 opacity-20" />
      <p className="text-xs">No Reddit links cited yet — still loading or no results found</p>
    </div>
  );

  const thCls = 'py-2.5 px-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap';

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            <th className={thCls + ' w-7'}>#</th>
            <th className={thCls}>Reddit Thread</th>
            <th className={thCls + ' w-32'}>Community</th>
            <th className={thCls + ' w-52'}>Cited By</th>
            <th className={thCls + ' w-64'}>Found Via Prompt</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={row.url} className="hover:bg-muted/20 transition-colors align-top">

              {/* # */}
              <td className="py-3 px-3 text-xs text-muted-foreground">{i + 1}</td>

              {/* Thread title + link */}
              <td className="py-3 px-3 min-w-[200px] max-w-xs">
                <div className="flex items-start gap-1.5">
                  <p className="text-sm font-medium leading-snug line-clamp-2 flex-1">{row.title}</p>
                  <a
                    href={row.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 mt-0.5 p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Open on Reddit"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </td>

              {/* Subreddit */}
              <td className="py-3 px-3">
                {row.subreddit
                  ? <span className="text-xs font-semibold text-blue-600">r/{row.subreddit}</span>
                  : <span className="text-xs text-muted-foreground">—</span>}
              </td>

              {/* Cited by platforms */}
              <td className="py-3 px-3">
                <div className="flex flex-wrap gap-1">
                  {row.platforms.length > 1 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-700 border border-violet-400/30 font-semibold">
                      {row.platforms.length}/4
                    </span>
                  )}
                  {row.platforms.map(p => {
                    const s = PLATFORM_STYLES[p] || { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300' };
                    return (
                      <span key={p} className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${s.bg} ${s.text} ${s.border}`}>
                        {p}
                      </span>
                    );
                  })}
                </div>
              </td>

              {/* Prompts that surfaced this link */}
              <td className="py-3 px-3 max-w-[240px]">
                <div className="flex flex-col gap-1">
                  {row.prompts.map((prompt, j) => (
                    <span key={j} className="text-[11px] text-muted-foreground leading-snug line-clamp-2 bg-muted/40 rounded px-1.5 py-0.5">
                      {prompt}
                    </span>
                  ))}
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AnalysisPanel({
  companyName,
  competitors,
  keywords,
  selectedKwIds,
  selectedKwIdx,
  setSelectedKwIdx,
  serpResults,
  kwSerpData,
  serpThreadsLoading,
  redditPostsLoading,
  redditPostsError,
  citationLoading,
  citationResults,
  citationPlatformStatus,
  handleRunAnalysis,
  analysisLoading,
  scannedPostDetails,
  redditWarm = true,
}) {
  const selectedKw = selectedKwIdx !== null ? keywords[selectedKwIdx] : null;
  const isLoading = analysisLoading || citationLoading;

  // ── Citation elapsed timer ─────────────────────────────────────────────────
  const [citationElapsed, setCitationElapsed] = useState(0);
  useEffect(() => {
    if (!citationLoading) { setCitationElapsed(0); return; }
    const start = Date.now();
    const tid = setInterval(() => setCitationElapsed(Math.round((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(tid);
  }, [citationLoading]);

  // ── Rotating dynamic loading messages ─────────────────────────────────────
  const SERP_MESSAGES = [
    'Scanning Google for Reddit threads…',
    'Running site:reddit.com dork queries…',
    'Extracting SERP thread positions…',
    'Matching threads to your keyword…',
    'Identifying high-ranking discussions…',
    'Pulling Reddit URLs from Google index…',
    'Checking search result page one…',
    'Looking for threads with SEO traction…',
  ];
  const REDDIT_MESSAGES = [
    'Fetching top Reddit posts…',
    'Sorting by highest engagement…',
    'Pulling newest community threads…',
    'Checking upvote counts…',
    'Finding active discussions…',
    'Scanning subreddit activity…',
    'Ranking posts by comment velocity…',
    'Grabbing fresh Reddit content…',
  ];
  const CITATION_MESSAGES = [
    'Asking ChatGPT which Reddit threads it cites…',
    'Querying Perplexity for Reddit recommendations…',
    "Checking Gemini's Reddit citations…",
    'Scanning Google AI for referenced threads…',
    'Collecting AI platform responses…',
    'Parsing Reddit URLs from AI answers…',
    'Matching citations back to your prompts…',
    'Aggregating results across platforms…',
    'Filtering Reddit-specific references…',
    'Building citation map by prompt…',
    'Cross-checking sources across models…',
    'Almost there — finalising citations…',
  ];
  const ANALYSIS_MESSAGES = [
    'Generating keywords for your domain…',
    'Analysing company context…',
    'Building LLM citation prompts…',
    'Mapping keyword intent…',
    'Identifying high-value search terms…',
    'Scoring keyword opportunity gaps…',
    'Crafting ranking prompts…',
    'Packaging results for analysis…',
  ];

  const [serpMsgIdx, setSerpMsgIdx] = useState(0);
  const [redditMsgIdx, setRedditMsgIdx] = useState(0);
  const [citationMsgIdx, setCitationMsgIdx] = useState(0);
  const [analysisMsgIdx, setAnalysisMsgIdx] = useState(0);

  useEffect(() => {
    if (!serpThreadsLoading) { setSerpMsgIdx(0); return; }
    const tid = setInterval(() => setSerpMsgIdx(i => Math.min(i + 1, SERP_MESSAGES.length - 1)), 2200);
    return () => clearInterval(tid);
  }, [serpThreadsLoading]);

  useEffect(() => {
    if (!redditPostsLoading) { setRedditMsgIdx(0); return; }
    const tid = setInterval(() => setRedditMsgIdx(i => Math.min(i + 1, REDDIT_MESSAGES.length - 1)), 2200);
    return () => clearInterval(tid);
  }, [redditPostsLoading]);

  useEffect(() => {
    if (!citationLoading) { setCitationMsgIdx(0); return; }
    const tid = setInterval(() => setCitationMsgIdx(i => Math.min(i + 1, CITATION_MESSAGES.length - 1)), 2000);
    return () => clearInterval(tid);
  }, [citationLoading]);

  useEffect(() => {
    if (!analysisLoading) { setAnalysisMsgIdx(0); return; }
    const tid = setInterval(() => setAnalysisMsgIdx(i => Math.min(i + 1, ANALYSIS_MESSAGES.length - 1)), 1800);
    return () => clearInterval(tid);
  }, [analysisLoading]);

  // ── Data sources ──────────────────────────────────────────────────────────
  const serpThreads  = kwSerpData?.redditThreads   || [];
  const dorkThreads  = kwSerpData?.dorkRedditLinks  || [];
  const rawTopThreads = kwSerpData?.topRedditPosts  || [];
  const rawNewThreads = kwSerpData?.newRedditPosts  || [];

  // Augment Top/New with dork posts when Render returns few results.
  // Dork posts are Google-indexed Reddit threads for the keyword — highly relevant.
  // Dedup by URL so no post appears twice across Top, New, or Dork.
  const MIN_TOP_POSTS = 5;
  const allTopNewUrls = new Set([
    ...rawTopThreads.map(p => (p.post_url || p.url || '').toLowerCase().replace(/\/$/, '')),
    ...rawNewThreads.map(p => (p.post_url || p.url || '').toLowerCase().replace(/\/$/, '')),
  ]);
  const dorkFill = dorkThreads.filter(p => {
    const u = (p.post_url || p.url || '').toLowerCase().replace(/\/$/, '');
    return u && !allTopNewUrls.has(u);
  });
  // Fill Top first, then New — split dork fill evenly between the two tabs
  const topNeed = Math.max(0, MIN_TOP_POSTS - rawTopThreads.length);
  const newNeed = Math.max(0, MIN_TOP_POSTS - rawNewThreads.length);
  const topThreads = [...rawTopThreads, ...dorkFill.slice(0, topNeed).map(p => ({ ...p, _fromDork: true }))];
  const newThreads = [...rawNewThreads, ...dorkFill.slice(topNeed, topNeed + newNeed).map(p => ({ ...p, _fromDork: true }))];

  // ── Cross-source metrics map ───────────────────────────────────────────────
  // Top/New posts from Reddit API carry real upvotes — share them with all other tabs
  // by URL match so SERP threads and Cited threads also show engagement numbers.
  const metricsMap = (() => {
    const map = new Map();
    const norm = u => (u || '').toLowerCase().replace(/\/$/, '');
    // Top/New have the most reliable upvote data — add them first
    [...topThreads, ...newThreads, ...serpThreads, ...dorkThreads].forEach(p => {
      const key = norm(p.post_url || p.url);
      if (!key) return;
      const votes = p.upvotes || 0;
      const comms = p.total_comments || p.comments || 0;
      const cur = map.get(key);
      // Keep whichever entry has the highest upvotes
      if (!cur || votes > (cur.upvotes || 0)) map.set(key, { upvotes: votes, total_comments: comms });
    });
    return map;
  })();

  const enrichPost = post => {
    const key = (post.url || post.post_url || '').toLowerCase().replace(/\/$/, '');
    const m = metricsMap.get(key);
    return (m && (m.upvotes || m.total_comments)) ? { ...post, upvotes: m.upvotes, total_comments: m.total_comments } : post;
  };

  // Cited threads: flatten all BrightData platform results, dedupe by URL, enrich metrics
  const citedThreads = (() => {
    const byUrl = new Map();
    (citationResults?.records || []).forEach(rec => {
      Object.entries(rec.models || {}).forEach(([platform, posts]) => {
        if (!Array.isArray(posts)) return;
        posts.forEach(post => {
          const url = post.url || post.post_url || '';
          if (!url) return;
          if (byUrl.has(url)) {
            byUrl.get(url).citedByModels.push(platform);
          } else {
            byUrl.set(url, { ...post, citedByModels: [platform] });
          }
        });
      });
    });
    return Array.from(byUrl.values()).map(enrichPost);
  })();

  // ── Best: ranked by total weighted score across all sources ───────────────
  // Priority: Cited (AI platforms) > SERP/Top > New/Dork
  // Score weights: each AI platform = 4pts, SERP = 3pts, Top = 3pts, Dork = 1pt, New = 1pt
  const SOURCE_WEIGHTS = { SERP: 3, Top: 3, Dork: 1, New: 1 };
  const bestThreads = (() => {
    const urlMap = new Map();
    const normalizeUrl = u => (u || '').toLowerCase().replace(/\/$/, '');

    const addSource = (posts, sourceName) => {
      posts.forEach(post => {
        const url = normalizeUrl(post.url || post.post_url);
        if (!url) return;
        if (!urlMap.has(url)) urlMap.set(url, { post, aiPlatforms: new Set(), otherSources: new Set() });
        urlMap.get(url).otherSources.add(sourceName);
      });
    };
    addSource(citedThreads.map(p => ({ ...p, url: p.url || p.post_url })), 'Cited');
    addSource(serpThreads, 'SERP');
    addSource(topThreads,  'Top');
    addSource(dorkThreads, 'Dork');
    addSource(newThreads,  'New');

    citedThreads.forEach(post => {
      const url = normalizeUrl(post.url || post.post_url);
      if (!url) return;
      if (!urlMap.has(url)) urlMap.set(url, { post, aiPlatforms: new Set(), otherSources: new Set() });
      (post.citedByModels || []).forEach(p => urlMap.get(url).aiPlatforms.add(p));
    });

    const score = e =>
      e.aiPlatforms.size * 4 +
      Array.from(e.otherSources).reduce((s, src) => s + (SOURCE_WEIGHTS[src] || 1), 0);

    return Array.from(urlMap.values())
      .filter(e => e.aiPlatforms.size >= 1 || e.otherSources.size >= 2)
      .sort((a, b) => {
        const sDiff = score(b) - score(a);
        if (sDiff !== 0) return sDiff;
        const aUp = enrichPost(a.post).upvotes || 0;
        const bUp = enrichPost(b.post).upvotes || 0;
        return bUp - aUp;
      })
      .map(e => ({
        ...enrichPost(e.post),
        _sources: [...Array.from(e.aiPlatforms), ...Array.from(e.otherSources).filter(s => s !== 'Cited')],
        _aiPlatformCount: e.aiPlatforms.size,
        _score: score(e),
      }));
  })();

  // ── Helpers ───────────────────────────────────────────────────────────────
  // loading prop controls the skeleton — each section passes its own flag
  function PostList({ posts, emptyMsg, loading = false }) {
    if (loading && !posts.length) return (
      <div className="space-y-2 pt-2">
        {[1,2,3].map(i => (
          <div key={i} className="rounded-lg p-3 space-y-2 animate-pulse" style={{ border: '0.5px solid rgba(95,100,255,0.10)', background: 'rgba(95,100,255,0.02)' }}>
            <div className="flex items-start gap-2">
              <Skeleton className="h-3.5 w-3.5 rounded mt-0.5 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3 w-2/3 rounded" />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <Skeleton className="h-3 w-10 rounded" />
              <Skeleton className="h-3 w-14 rounded" />
              <Skeleton className="h-3 w-8 rounded ml-auto" />
            </div>
          </div>
        ))}
      </div>
    );
    if (!posts.length) {
      if (!emptyMsg) return null;
      return (
        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
          <AlertCircle className="h-8 w-8 opacity-20" />
          <p className="text-xs text-center">{emptyMsg}</p>
        </div>
      );
    }
    return (
      <div className="space-y-2">
        {posts.map((post, i) => (
          <PostCard
            key={i}
            post={post}
            brandLabel={companyName}
            allCompetitors={competitors}
            scannedData={scannedPostDetails[post.url || post.post_url]}
          />
        ))}
      </div>
    );
  }

  const hasAnyData = kwSerpData || citedThreads.length > 0;

  return (
    <div className="space-y-4">
      {/* ── Analysis progress banner — shown while any source is loading ── */}
      {(serpThreadsLoading || redditPostsLoading || citationLoading) && (
        <div className="rounded-xl border px-4 py-3 space-y-2.5" style={{ background: 'rgba(95,100,255,0.04)', borderColor: 'rgba(95,100,255,0.18)' }}>
          <p className="text-xs font-medium" style={{ color: '#8b8fff' }}>
            Finding opportunities — results appear in each tab as they arrive
          </p>
          <div className="flex flex-col gap-1.5">
            {/* SERP row */}
            <div className="flex items-center gap-2 text-[11px]">
              {serpThreadsLoading
                ? <Loader2 className="h-3 w-3 animate-spin shrink-0" style={{ color: '#5f64ff' }} />
                : <span className="h-3 w-3 shrink-0 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 text-[8px] font-bold">✓</span>
              }
              <span className={serpThreadsLoading ? 'text-muted-foreground transition-all duration-500' : 'text-emerald-600 dark:text-emerald-400'}>
                {serpThreadsLoading ? SERP_MESSAGES[serpMsgIdx] : `SERP threads ready (${(serpThreads.length + dorkThreads.length)} found)`}
              </span>
              {serpThreadsLoading && <span className="ml-auto text-muted-foreground opacity-50 shrink-0">~5s</span>}
            </div>
            {/* Reddit row */}
            <div className="flex items-center gap-2 text-[11px]">
              {redditPostsLoading
                ? <Loader2 className="h-3 w-3 animate-spin shrink-0" style={{ color: '#5f64ff' }} />
                : <span className="h-3 w-3 shrink-0 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 text-[8px] font-bold">✓</span>
              }
              <span className={redditPostsLoading ? 'text-muted-foreground transition-all duration-500' : 'text-emerald-600 dark:text-emerald-400'}>
                {redditPostsLoading ? REDDIT_MESSAGES[redditMsgIdx] : `Reddit posts ready (${topThreads.length + newThreads.length} found)`}
              </span>
              {redditPostsLoading && <span className="ml-auto text-muted-foreground opacity-50 shrink-0">~15s</span>}
            </div>
            {/* Citations row */}
            <div className="flex items-center gap-2 text-[11px]">
              {citationLoading
                ? <Loader2 className="h-3 w-3 animate-spin shrink-0" style={{ color: '#5f64ff' }} />
                : <span className="h-3 w-3 shrink-0 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 text-[8px] font-bold">✓</span>
              }
              <span className={citationLoading ? 'text-muted-foreground transition-all duration-500' : 'text-emerald-600 dark:text-emerald-400'}>
                {citationLoading ? CITATION_MESSAGES[citationMsgIdx] : `AI citations ready (${citedThreads.length} links found)`}
              </span>
              {citationLoading && (
                <span className="ml-auto text-muted-foreground opacity-50 shrink-0 tabular-nums">
                  {citationElapsed > 0 ? `${citationElapsed}s` : '~1–2 min'}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      {/* ── Keyword selector + single Run Analysis button ── */}
      <Card style={{ border: '0.5px solid rgba(95,100,255,0.22)' }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center h-6 w-6 rounded-md"
              style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.22)' }}
            >
              <Search className="h-3.5 w-3.5" style={{ color: '#5f64ff' }} />
            </span>
            Analysis
          </CardTitle>
          <CardDescription className="text-xs">
            Select a keyword and run analysis — fetches SERP threads, dork links, Reddit posts &amp; AI citations in one go
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedKwIds).map(globalIdx => {
              const kw = keywords[globalIdx];
              if (!kw) return null;
              const isSelected = selectedKwIdx === globalIdx;
              const hasData = !!serpResults[kw.term];
              return (
                <button
                  key={globalIdx}
                  onClick={() => setSelectedKwIdx(globalIdx)}
                  className="px-3 py-1.5 rounded-md text-sm transition-colors"
                  style={isSelected
                    ? { background: 'rgba(95,100,255,0.08)', border: '0.5px solid #5f64ff', color: '#f0f0f0', boxShadow: '0 0 0 1px rgba(95,100,255,0.15)' }
                    : { background: '#1a1a1a', border: '0.5px solid #2a2a2a', color: '#bbb' }
                  }
                >
                  <span className="font-medium">
                    {kw.term}
                  </span>
                  {hasData && (
                    <span className={`ml-1.5 text-[10px] ${isSelected ? 'opacity-90' : 'opacity-50'}`}>✓</span>
                  )}
                </button>
              );
            })}
            {selectedKwIds.size === 0 && (
              <p className="text-xs text-muted-foreground italic">No keywords selected — go to the Save tab first.</p>
            )}
          </div>
          {selectedKwIdx !== null && (
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRunAnalysis}
                disabled={isLoading || !redditWarm}
                size="sm"
                className="text-white border-none"
                style={{ background: '#5f64ff', boxShadow: '0 0 14px rgba(95,100,255,0.3)' }}
              >
                {isLoading
                  ? <><Spinner className="h-3.5 w-3.5 mr-1.5" /><span className="transition-all duration-300">{analysisLoading ? ANALYSIS_MESSAGES[analysisMsgIdx] : CITATION_MESSAGES[citationMsgIdx]}</span></>
                  : <><Zap className="h-3.5 w-3.5 mr-1.5" />Run Analysis</>
                }
              </Button>
              {!redditWarm && !isLoading && (
                <span className="flex items-center gap-1 text-[11px] text-amber-600">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Warming up Reddit backend…
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Empty state ── */}
      {!hasAnyData && !isLoading && !serpThreadsLoading && !redditPostsLoading && (
        <div className="flex flex-col items-center justify-center h-48 border border-dashed border-border rounded-lg text-muted-foreground gap-3">
          <Zap className="h-10 w-10 opacity-20" />
          <div className="text-center text-sm">
            <p className="font-medium">Select a keyword and click Run Analysis</p>
            <p className="text-xs mt-1 opacity-70">Runs SERP · Dork · Reddit · AI citations together</p>
          </div>
        </div>
      )}

      {/* ── Result tabs ── */}
      {(hasAnyData || isLoading || serpThreadsLoading || redditPostsLoading) && (
        <Tabs defaultValue="serp" className="w-full">
          <TabsList className="grid grid-cols-5 w-full bg-transparent p-0 h-auto rounded-none border-b border-border">
            <TabsTrigger value="serp" className="text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-[#5f64ff] data-[state=active]:bg-[#161616] data-[state=active]:shadow-none py-2.5">
              SERP
              {serpThreadsLoading
                ? <Spinner className="ml-1 h-3 w-3 opacity-60" />
                : (serpThreads.length + dorkThreads.length) > 0 && <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.22)', color: '#5f64ff' }}>{serpThreads.length + dorkThreads.length}</span>
              }
            </TabsTrigger>
            <TabsTrigger value="top" className="text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-[#5f64ff] data-[state=active]:bg-[#161616] data-[state=active]:shadow-none py-2.5">
              Top
              {redditPostsLoading
                ? <Spinner className="ml-1 h-3 w-3 opacity-60" />
                : topThreads.length > 0 && <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.22)', color: '#5f64ff' }}>{topThreads.length}</span>
              }
            </TabsTrigger>
            <TabsTrigger value="new" className="text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-[#5f64ff] data-[state=active]:bg-[#161616] data-[state=active]:shadow-none py-2.5">
              New
              {redditPostsLoading
                ? <Spinner className="ml-1 h-3 w-3 opacity-60" />
                : newThreads.length > 0 && <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.22)', color: '#5f64ff' }}>{newThreads.length}</span>
              }
            </TabsTrigger>
            <TabsTrigger value="cited" className="text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-[#5f64ff] data-[state=active]:bg-[#161616] data-[state=active]:shadow-none py-2.5">
              Cited
              {citationLoading
                ? <Spinner className="ml-1 h-3 w-3 opacity-60" />
                : citedThreads.length > 0 && <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.22)', color: '#5f64ff' }}>{citedThreads.length} links</span>
              }
            </TabsTrigger>
            <TabsTrigger value="best" className="text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-[#5f64ff] data-[state=active]:bg-[#161616] data-[state=active]:shadow-none py-2.5">
              <Sparkles className="h-3 w-3 mr-1" style={{ color: '#5f64ff' }} />Best
              {bestThreads.length > 0 && <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.22)', color: '#5f64ff' }}>{bestThreads.length}</span>}
            </TabsTrigger>
          </TabsList>

          {/* SERP Threads */}
          <TabsContent value="serp" className="mt-4">
            <Card style={{ border: '0.5px solid rgba(95,100,255,0.22)' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-md" style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.22)' }}>
                    <Search className="h-3.5 w-3.5" style={{ color: '#5f64ff' }} />
                  </span>
                  SERP Threads
                  {serpThreadsLoading
                    ? <span className="ml-auto flex items-center gap-1 text-[11px] font-normal text-muted-foreground"><Spinner className="h-3 w-3" />Loading…</span>
                    : <span className="ml-auto text-[11px] font-normal text-muted-foreground">{serpThreads.length + dorkThreads.length} results</span>
                  }
                </CardTitle>
                <CardDescription className="text-xs">Google SERP threads · site:reddit.com dork</CardDescription>
              </CardHeader>
              <CardContent>
                <PostList posts={[...serpThreads, ...dorkThreads].map(enrichPost)} emptyMsg="No SERP threads found — run Analysis" loading={serpThreadsLoading} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Top Threads */}
          <TabsContent value="top" className="mt-4 space-y-3">
            {redditPostsLoading && (
              <div className="flex items-center gap-2.5 text-xs px-3 py-2.5 rounded-lg border" style={{ background: 'rgba(95,100,255,0.05)', borderColor: 'rgba(95,100,255,0.2)', color: '#8b8fff' }}>
                <Spinner className="h-3.5 w-3.5 shrink-0" />
                <span className="transition-all duration-500">{REDDIT_MESSAGES[redditMsgIdx]}</span>
              </div>
            )}
            {redditPostsError && !redditPostsLoading && (
              <div className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-lg border border-red-500/20 bg-red-500/5 text-red-600">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>Reddit API error — {redditPostsError}</span>
              </div>
            )}
            <Card style={{ border: '0.5px solid rgba(95,100,255,0.22)' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-md" style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.22)' }}>
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: '#5f64ff' }} />
                  </span>
                  Top Threads
                  <span className="ml-auto text-[11px] font-normal text-muted-foreground">
                    {redditPostsLoading && !topThreads.length ? 'loading…' : `${topThreads.length} results`}
                  </span>
                </CardTitle>
                <CardDescription className="text-xs">Highest engagement posts from Reddit API</CardDescription>
              </CardHeader>
              <CardContent>
                <PostList
                  posts={topThreads.map(enrichPost)}
                  emptyMsg={redditPostsError ? "Failed to load — see error above" : "No top posts found — the Reddit backend may have been cold. Try clicking Run Analysis again."}
                  loading={redditPostsLoading}
                />
              </CardContent>
            </Card>

            {redditPostsLoading && serpThreads.length > 0 && (
              <Card className="border-dashed opacity-80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                    <Search className="h-3.5 w-3.5" />SERP Preview
                    <span className="ml-auto text-[11px] font-normal">{serpThreads.length} threads</span>
                  </CardTitle>
                  <CardDescription className="text-xs">Showing SERP threads while Reddit loads</CardDescription>
                </CardHeader>
                <CardContent>
                  <PostList posts={serpThreads.map(enrichPost)} emptyMsg="" />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* New Threads */}
          <TabsContent value="new" className="mt-4 space-y-3">
            {redditPostsLoading && (
              <div className="flex items-center gap-2.5 text-xs px-3 py-2.5 rounded-lg border" style={{ background: 'rgba(95,100,255,0.05)', borderColor: 'rgba(95,100,255,0.2)', color: '#8b8fff' }}>
                <Spinner className="h-3.5 w-3.5 shrink-0" />
                <span className="transition-all duration-500">{REDDIT_MESSAGES[redditMsgIdx]}</span>
              </div>
            )}
            {redditPostsError && !redditPostsLoading && (
              <div className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-lg border border-red-500/20 bg-red-500/5 text-red-600">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>Reddit API error — {redditPostsError}</span>
              </div>
            )}
            <Card style={{ border: '0.5px solid rgba(95,100,255,0.22)' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-md" style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.22)' }}>
                    <Clock className="h-3.5 w-3.5" style={{ color: '#5f64ff' }} />
                  </span>
                  New Threads
                  <span className="ml-auto text-[11px] font-normal text-muted-foreground">
                    {redditPostsLoading && !newThreads.length ? 'loading…' : `${newThreads.length} results`}
                  </span>
                </CardTitle>
                <CardDescription className="text-xs">Recently posted threads from Reddit API</CardDescription>
              </CardHeader>
              <CardContent>
                <PostList
                  posts={newThreads.map(enrichPost)}
                  emptyMsg={redditPostsError ? "Failed to load — see error above" : "No new posts found — the Reddit backend may have been cold. Try clicking Run Analysis again."}
                  loading={redditPostsLoading}
                />
              </CardContent>
            </Card>

            {redditPostsLoading && dorkThreads.length > 0 && (
              <Card className="border-dashed opacity-80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                    <Search className="h-3.5 w-3.5" />Dork Preview
                    <span className="ml-auto text-[11px] font-normal">{dorkThreads.length} threads</span>
                  </CardTitle>
                  <CardDescription className="text-xs">Showing dork results while Reddit loads</CardDescription>
                </CardHeader>
                <CardContent>
                  <PostList posts={dorkThreads.map(enrichPost)} emptyMsg="" />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Cited Threads — grouped by prompt, per AI platform */}
          <TabsContent value="cited" className="mt-4">
            <Card style={{ border: '0.5px solid rgba(95,100,255,0.22)' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-md" style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.22)' }}>
                    <Sparkles className="h-3.5 w-3.5" style={{ color: '#5f64ff' }} />
                  </span>
                  AI Citations by Prompt
                  <span className="ml-auto text-[11px] font-normal text-muted-foreground">
                    {(citationResults?.records || []).length} prompt{(citationResults?.records || []).length !== 1 ? 's' : ''}
                  </span>
                  {citationResults?.partial && citationLoading && (
                    <span className="text-[10px] text-amber-600 font-normal flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />more platforms loading…
                    </span>
                  )}
                </CardTitle>
                <CardDescription className="text-xs">Reddit links each AI platform cited when answering your prompts</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Platform status pills — shown while loading (summary bar replaces after done) */}
                {citationLoading && citationPlatformStatus && (
                  <div className="flex flex-wrap gap-1.5 pb-3">
                    {Object.entries(citationPlatformStatus).map(([platform, status]) => {
                      const s = PLATFORM_STYLES[platform] || { bg: 'bg-gray-500/10', text: 'text-gray-700', border: 'border-gray-400/30' };
                      const isReady = status === 'ready';
                      const isError = status === 'error';
                      return (
                        <span key={platform} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border font-medium ${
                          isReady ? 'bg-emerald-500/10 text-emerald-700 border-emerald-400/30' :
                          isError ? 'bg-red-500/10 text-red-600 border-red-400/30' :
                          `${s.bg} ${s.text} ${s.border} opacity-60`
                        }`}>
                          {isReady ? <span className="text-[9px] font-bold">done</span> : isError ? <span className="text-[9px] font-bold">err</span> : <Loader2 className="h-2.5 w-2.5 animate-spin" />}
                          {platform}
                        </span>
                      );
                    })}
                  </div>
                )}
                {citationLoading && !(citationResults?.records?.length) ? (
                  <div className="py-6 flex flex-col items-center gap-5 text-center">
                    {/* Spinner + heading + elapsed */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative h-10 w-10">
                        <Loader2 className="h-10 w-10 animate-spin opacity-10 absolute inset-0" style={{ color: '#5f64ff' }} />
                        <Loader2 className="h-6 w-6 animate-spin absolute inset-0 m-auto" style={{ color: '#5f64ff' }} />
                      </div>
                      <p className="text-sm font-medium transition-all duration-500">{CITATION_MESSAGES[citationMsgIdx]}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>First results in ~20–40s · full scan up to 2 min</span>
                        {citationElapsed > 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-muted/60 font-mono text-[11px] tabular-nums" style={{ color: '#8b8fff' }}>
                            {citationElapsed}s
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Per-platform status list */}
                    <div className="w-full max-w-xs rounded-lg border border-border/50 divide-y divide-border/50 overflow-hidden text-xs">
                      {['ChatGPT', 'Perplexity', 'Gemini', 'Google AI'].map(p => {
                        const status = citationPlatformStatus?.[p];
                        const s = PLATFORM_STYLES[p] || {};
                        return (
                          <div key={p} className={`flex items-center gap-2.5 px-3 py-2 transition-colors ${status === 'ready' ? 'bg-emerald-500/5' : status === 'error' ? 'bg-red-500/5' : 'bg-muted/20'}`}>
                            {status === 'ready'
                              ? <span className="h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-500 text-[9px] font-bold flex items-center justify-center shrink-0">✓</span>
                              : status === 'error'
                              ? <span className="h-4 w-4 rounded-full bg-red-500/20 text-red-500 text-[9px] font-bold flex items-center justify-center shrink-0">✗</span>
                              : <Loader2 className="h-4 w-4 animate-spin shrink-0 opacity-50" style={{ color: '#5f64ff' }} />
                            }
                            <span className={`font-medium ${status === 'ready' ? 'text-emerald-600 dark:text-emerald-400' : status === 'error' ? 'text-red-500' : 'text-muted-foreground'}`}>{p}</span>
                            <span className="ml-auto text-[11px] opacity-60">
                              {!status && 'queued'}
                              {status === 'pending' && 'scanning…'}
                              {status === 'ready' && 'complete'}
                              {status === 'error' && 'failed'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : !(citationResults?.records?.length) ? (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
                    <AlertCircle className="h-8 w-8 opacity-20" />
                    <p className="text-xs text-center">No AI citations found — run Analysis to fetch</p>
                  </div>
                ) : (
                  <>
                    {/* Platform result summary — always visible once results are in */}
                    {(() => {
                      const platformCounts = {};
                      (citationResults?.records || []).forEach(rec => {
                        Object.entries(rec.models || {}).forEach(([platform, posts]) => {
                          platformCounts[platform] = (platformCounts[platform] || 0) + (posts?.length || 0);
                        });
                      });
                      const allPlatforms = ['ChatGPT', 'Perplexity', 'Gemini', 'Google AI'];
                      return (
                        <div className="flex flex-wrap gap-1.5 pb-3 border-b border-border/50 mb-3">
                          {allPlatforms.map(p => {
                            const count = platformCounts[p] || 0;
                            const status = citationPlatformStatus?.[p];
                            const s = PLATFORM_STYLES[p] || { bg: 'bg-gray-500/10', text: 'text-gray-700', border: 'border-gray-400/30' };
                            const isError = status === 'error';
                            return (
                              <span key={p} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border font-medium ${isError ? 'bg-red-500/10 text-red-600 border-red-400/30 opacity-60' : count > 0 ? `${s.bg} ${s.text} ${s.border}` : 'bg-muted/30 text-muted-foreground border-border/40 opacity-50'}`}>
                                {isError
                                  ? <span className="text-[9px] font-bold">✗</span>
                                  : count > 0
                                  ? <span className="text-[9px] font-bold">✓</span>
                                  : <span className="text-[9px]">–</span>
                                }
                                {p}
                                {!isError && (
                                  <span className={`text-[10px] font-semibold ${count > 0 ? '' : 'opacity-50'}`}>
                                    {count} link{count !== 1 ? 's' : ''}
                                  </span>
                                )}
                              </span>
                            );
                          })}
                          {citationLoading && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground ml-auto">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              {citationElapsed > 0 ? `${citationElapsed}s` : 'loading more…'}
                            </span>
                          )}
                        </div>
                      );
                    })()}
                    <CitationByPrompt records={citationResults.records} />
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Best — threads appearing across the most sources */}
          <TabsContent value="best" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />Best Threads
                  <span className="ml-auto text-[11px] font-normal text-muted-foreground">{bestThreads.length} results</span>
                </CardTitle>
                <CardDescription className="text-xs">Ranked by AI citation count (4 platforms → 3 → 2 → 1), then upvotes</CardDescription>
              </CardHeader>
              <CardContent>
                {bestThreads.length === 0 && isLoading ? (
                  <div className="space-y-3 pt-1">
                    <p className="text-[11px] text-muted-foreground">Best threads are ranked once all sources finish loading…</p>
                    {[1,2,3].map(i => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
                  </div>
                ) : bestThreads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
                    <Sparkles className="h-8 w-8 opacity-20" />
                    <p className="text-xs text-center">Run Analysis to find best threads across all sources</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {bestThreads.map((post, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex gap-1 flex-wrap items-center px-1">
                          {post._aiPlatformCount > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-700 border border-violet-400/30 font-semibold">
                              {post._aiPlatformCount}/4 AI platforms
                            </span>
                          )}
                          {post._sources.map(src => {
                            const isAI = ['ChatGPT','Perplexity','Gemini','Google AI'].includes(src);
                            const s = isAI ? (PLATFORM_STYLES[src] || {}) : {};
                            return (
                              <span key={src} className={`text-[10px] px-1.5 py-0.5 rounded ${isAI ? `${s.bg} ${s.text} ${s.border} border font-medium` : 'bg-primary/10 text-primary border border-primary/20'}`}>
                                {src}
                              </span>
                            );
                          })}
                        </div>
                        <PostCard
                          post={post}
                          brandLabel={companyName}
                          allCompetitors={competitors}
                          scannedData={scannedPostDetails[post.url || post.post_url]}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
