'use client';

import { useState } from 'react';
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
  serpLoading,
  citationLoading,
  citationResults,
  handleRunAnalysis,
  analysisLoading,
  scannedPostDetails,
}) {
  const selectedKw = selectedKwIdx !== null ? keywords[selectedKwIdx] : null;
  const isLoading = analysisLoading || serpLoading || citationLoading;

  // ── Data sources ──────────────────────────────────────────────────────────
  const serpThreads  = kwSerpData?.redditThreads   || [];
  const dorkThreads  = kwSerpData?.dorkRedditLinks  || [];
  const topThreads   = kwSerpData?.topRedditPosts   || [];
  const newThreads   = kwSerpData?.newRedditPosts   || [];

  // Cited threads: flatten all BrightData platform results, dedupe by URL
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
    return Array.from(byUrl.values());
  })();

  // ── Best: ranked by AI platform citation count, then upvotes ─────────────
  const bestThreads = (() => {
    // Step 1: build url → { post, aiPlatforms: Set, otherSources: Set }
    const urlMap = new Map();

    const addOther = (posts, sourceName) => {
      posts.forEach(post => {
        const url = post.url || post.post_url || '';
        if (!url) return;
        if (!urlMap.has(url)) urlMap.set(url, { post, aiPlatforms: new Set(), otherSources: new Set() });
        urlMap.get(url).otherSources.add(sourceName);
      });
    };
    addOther(serpThreads, 'SERP');
    addOther(dorkThreads, 'Dork');
    addOther(topThreads,  'Top');
    addOther(newThreads,  'New');

    // citedThreads already has citedByModels — use that for AI platform count
    citedThreads.forEach(post => {
      const url = post.url || post.post_url || '';
      if (!url) return;
      if (!urlMap.has(url)) urlMap.set(url, { post, aiPlatforms: new Set(), otherSources: new Set() });
      const entry = urlMap.get(url);
      (post.citedByModels || []).forEach(p => entry.aiPlatforms.add(p));
    });

    return Array.from(urlMap.values())
      .filter(e => e.aiPlatforms.size >= 1 || e.otherSources.size >= 2)
      .sort((a, b) => {
        // Primary: AI platforms citing count (4 > 3 > 2 > 1 > 0)
        const aiDiff = b.aiPlatforms.size - a.aiPlatforms.size;
        if (aiDiff !== 0) return aiDiff;
        // Secondary: other source overlap count
        const srcDiff = b.otherSources.size - a.otherSources.size;
        if (srcDiff !== 0) return srcDiff;
        // Tiebreaker: upvotes
        return (b.post.upvotes || 0) - (a.post.upvotes || 0);
      })
      .map(e => ({
        ...e.post,
        _sources: [...Array.from(e.aiPlatforms), ...Array.from(e.otherSources)],
        _aiPlatformCount: e.aiPlatforms.size,
      }));
  })();

  // ── Helpers ───────────────────────────────────────────────────────────────
  function PostList({ posts, emptyMsg }) {
    if (isLoading) return (
      <div className="space-y-3 pt-2">
        {[1,2,3].map(i => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
      </div>
    );
    if (!posts.length) return (
      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
        <AlertCircle className="h-8 w-8 opacity-20" />
        <p className="text-xs text-center">{emptyMsg}</p>
      </div>
    );
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
      {/* ── Keyword selector + single Run Analysis button ── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />Analysis
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
                  className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                    isSelected ? 'bg-primary border-primary font-medium' : 'bg-muted/30 border-border hover:bg-muted'
                  }`}
                >
                  <span className={`font-medium ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>
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
            <Button onClick={handleRunAnalysis} disabled={isLoading} size="sm">
              {isLoading
                ? <><Spinner className="h-3.5 w-3.5 mr-1.5" />Running Analysis…</>
                : <><Zap className="h-3.5 w-3.5 mr-1.5" />Run Analysis</>
              }
            </Button>
          )}
        </CardContent>
      </Card>

      {/* ── Empty state ── */}
      {!hasAnyData && !isLoading && (
        <div className="flex flex-col items-center justify-center h-48 border border-dashed border-border rounded-lg text-muted-foreground gap-3">
          <Zap className="h-10 w-10 opacity-20" />
          <div className="text-center text-sm">
            <p className="font-medium">Select a keyword and click Run Analysis</p>
            <p className="text-xs mt-1 opacity-70">Runs SERP · Dork · Reddit · AI citations together</p>
          </div>
        </div>
      )}

      {/* ── Result tabs ── */}
      {(hasAnyData || isLoading) && (
        <Tabs defaultValue="serp" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="serp" className="text-xs">
              SERP Threads
              {(serpThreads.length + dorkThreads.length) > 0 && <span className="ml-1 opacity-60 text-[10px]">{Math.min(serpThreads.length + dorkThreads.length, 10)}</span>}
            </TabsTrigger>
            <TabsTrigger value="top" className="text-xs">
              Top
              {topThreads.length > 0 && <span className="ml-1 opacity-60 text-[10px]">{topThreads.length}</span>}
            </TabsTrigger>
            <TabsTrigger value="new" className="text-xs">
              New
              {newThreads.length > 0 && <span className="ml-1 opacity-60 text-[10px]">{newThreads.length}</span>}
            </TabsTrigger>
            <TabsTrigger value="cited" className="text-xs">
              Cited
              {citedThreads.length > 0 && <span className="ml-1 opacity-60 text-[10px]">{citedThreads.length} links</span>}
            </TabsTrigger>
          </TabsList>

          {/* SERP Threads — Google ranked + dork combined, deduplicated top 10 */}
          <TabsContent value="serp" className="mt-4">
            {(() => {
              const seen = new Set();
              const combined = [...serpThreads, ...dorkThreads].filter(p => {
                const url = p.url || p.post_url || '';
                if (!url || seen.has(url)) return false;
                seen.add(url);
                return true;
              }).slice(0, 10);
              return (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />SERP Threads
                      <span className="ml-auto text-[11px] font-normal text-muted-foreground">{combined.length} results</span>
                    </CardTitle>
                    <CardDescription className="text-xs">Google SERP ranked + site:reddit.com dork — top 10 combined</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PostList posts={combined} emptyMsg="No SERP threads found — run Analysis" />
                  </CardContent>
                </Card>
              );
            })()}
          </TabsContent>

          {/* Top Threads */}
          <TabsContent value="top" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />Top Threads
                  <span className="ml-auto text-[11px] font-normal text-muted-foreground">{topThreads.length} results</span>
                </CardTitle>
                <CardDescription className="text-xs">Highest engagement posts from Reddit API</CardDescription>
              </CardHeader>
              <CardContent>
                <PostList posts={topThreads} emptyMsg="No top posts found" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Threads */}
          <TabsContent value="new" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />New Threads
                  <span className="ml-auto text-[11px] font-normal text-muted-foreground">{newThreads.length} results</span>
                </CardTitle>
                <CardDescription className="text-xs">Recently posted threads from Reddit API</CardDescription>
              </CardHeader>
              <CardContent>
                <PostList posts={newThreads} emptyMsg="No new posts found" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cited Threads — grouped by prompt, per AI platform */}
          <TabsContent value="cited" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />AI Citations by Prompt
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
                {citationLoading && !(citationResults?.records?.length) ? (
                  <div className="space-y-3 pt-2">
                    {[1,2,3].map(i => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
                  </div>
                ) : !(citationResults?.records?.length) ? (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
                    <AlertCircle className="h-8 w-8 opacity-20" />
                    <p className="text-xs text-center">No AI citations found — run Analysis to fetch</p>
                  </div>
                ) : (
                  <CitationByPrompt records={citationResults.records} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Best — hidden for now */}
          <TabsContent value="best" className="mt-4 hidden">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />Best Threads
                  <span className="ml-auto text-[11px] font-normal text-muted-foreground">{bestThreads.length} results</span>
                </CardTitle>
                <CardDescription className="text-xs">Ranked by AI citation count (4 platforms → 3 → 2 → 1), then upvotes</CardDescription>
              </CardHeader>
              <CardContent>
                {bestThreads.length === 0 ? (
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
