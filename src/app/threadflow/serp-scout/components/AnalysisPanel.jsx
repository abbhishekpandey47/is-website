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
  Sparkles, AlertCircle, Search, MessageSquare, Zap, Plus, 
  ExternalLink, Loader2, BarChart2, TrendingUp, Clock,
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

function CitationTable({ records, scannedPostDetails }) {
  if (!records.length) return null;

  const thCls = 'py-2.5 px-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap';
  const tdCls = 'py-2.5 px-3 align-top';

  function fmt(n) {
    if (!n) return '0';
    return n >= 1000 ? (n / 1000).toFixed(1) + 'K' : String(n);
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className={thCls + ' w-8'}>#</th>
            <th className={thCls}>Thread</th>
            <th className={thCls + ' w-32'}>Community</th>
            <th className={thCls + ' w-44'}>Cited By</th>
            <th className={thCls + ' w-48'}>Mentions</th>
            <th className={thCls + ' w-28 text-right'}>Engagement</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {records.map((post, i) => {
            const url = post.url || post.post_url || '';
            const title = post.title || post.post_title || '';
            const subreddit = post.subreddit || '';
            const scanned = scannedPostDetails?.[url];
            const mentionsBrand = scanned?.mentionsBrand !== undefined
              ? scanned.mentionsBrand
              : post.mentionsBrand || false;
            const competitorsMentioned = scanned?.mentionsCompetitors || post.mentionsCompetitors || [];
            const upvotes = post.upvotes || post.score || 0;
            const comments = post.comments || 0;
            const models = post.citedByModels || [];

            return (
              <tr key={`${url || i}`} className="hover:bg-muted/20 transition-colors">
                {/* # */}
                <td className={tdCls + ' text-muted-foreground text-xs pt-3'}>{i + 1}</td>

                {/* Thread title + link */}
                <td className={tdCls}>
                  <div className="flex items-start gap-2 min-w-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm line-clamp-2 leading-snug">{title || url || '—'}</p>
                    </div>
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 mt-0.5 p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Open on Reddit"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </td>

                {/* Community */}
                <td className={tdCls}>
                  {subreddit
                    ? <span className="text-xs font-medium text-blue-600">r/{subreddit}</span>
                    : <span className="text-xs text-muted-foreground">—</span>}
                </td>

                {/* Cited by models */}
                <td className={tdCls}>
                  {models.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {models.map(modelId => {
                        const s = getModelStyle(modelId);
                        return (
                          <span
                            key={modelId}
                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${s.bg} ${s.text} ${s.border}`}
                          >
                            {s.label}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>

                {/* Brand / competitor mentions */}
                <td className={tdCls}>
                  <div className="flex flex-wrap gap-1">
                    {mentionsBrand && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-emerald-600 border-emerald-200 bg-emerald-50">
                        your brand
                      </Badge>
                    )}
                    {competitorsMentioned.slice(0, 3).map(c => (
                      <Badge key={c} variant="outline" className="text-[10px] px-1.5 py-0 text-rose-600 border-rose-200 bg-rose-50">
                        {c}
                      </Badge>
                    ))}
                    {competitorsMentioned.length > 3 && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        +{competitorsMentioned.length - 3}
                      </Badge>
                    )}
                    {!mentionsBrand && competitorsMentioned.length === 0 && (
                      <span className="text-xs text-muted-foreground">none</span>
                    )}
                  </div>
                </td>

                {/* Engagement */}
                <td className={tdCls + ' text-right'}>
                  <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground whitespace-nowrap">
                    <span>👍 {fmt(upvotes)}</span>
                    <span>💬 {fmt(comments)}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function AnalysisPanel({
  companyName,
  competitors,
  citationSummary,
  keywords,
  selectedKwIds,
  selectedKwIdx,
  setSelectedKwIdx,
  serpResults,
  kwSerpData,
  serpLoading,
  citationLoading,
  citationResults,
  citationPrompts,
  manualCitationInput,
  setManualCitationInput,
  manualCitationPrompts,
  setManualCitationPrompts,
  handleSerpAnalysis,
  handleCitationSearch,
  scannedPostDetails,
}) {
  const selectedKw = selectedKwIdx !== null ? keywords[selectedKwIdx] : null;

  // Prepare data for each tab
  const serpTopPosts = kwSerpData?.topRedditPosts || [];
  const serpNewPosts = kwSerpData?.newRedditPosts || [];
  const allSerpPosts = [...serpTopPosts, ...serpNewPosts];

  // Citation table data - deduplicated by URL, each entry carries which models cited it
  const citationTableData = (() => {
    const byUrl = new Map();
    if (citationResults?.records) {
      citationResults.records.forEach(rec => {
        Object.entries(rec.models).forEach(([modelId, value]) => {
          if (!Array.isArray(value)) return;
          value.forEach(post => {
            const url = post.url || post.post_url || '';
            const key = url || JSON.stringify(post);
            if (byUrl.has(key)) {
              byUrl.get(key).citedByModels.add(modelId);
            } else {
              byUrl.set(key, { ...post, citedByModels: new Set([modelId]) });
            }
          });
        });
      });
    }
    return Array.from(byUrl.values()).map(e => ({
      ...e,
      citedByModels: Array.from(e.citedByModels),
    }));
  })();

  return (
    <div className="space-y-6">
      {/* Metrics */}
      {citationSummary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-center">
          {[
            { label: 'Prompts Searched', value: citationSummary.totalPrompts, icon: MessageSquare },
            { label: 'Models Used', value: citationSummary.totalModels, icon: Sparkles },
            { label: 'Reddit Posts Found', value: citationSummary.totalPosts, icon: BarChart2 },
          ].map(({ label, value, icon: Icon }) => (
            <Card key={label} className="w-full max-w-xs">
              <CardContent className="pt-4 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </div>
                  <Icon className="w-4 h-4 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Analysis Sub-tabs */}
      <Tabs defaultValue="serp" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="serp" className="text-xs">Search Results</TabsTrigger>
          <TabsTrigger value="top" className="text-xs">Top Posts</TabsTrigger>
          <TabsTrigger value="new" className="text-xs">New Posts</TabsTrigger>
          <TabsTrigger value="citations" className="text-xs">Cited URLs</TabsTrigger>
        </TabsList>

        {/* Search Results / SERP */}
        <TabsContent value="serp" className="mt-6 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Search className="h-4 w-4 text-primary" />Keywords
                  </CardTitle>
                  <CardDescription className="text-xs">Select a keyword to search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Array.from(selectedKwIds).map(globalIdx => {
                    const kw = keywords[globalIdx];
                    if (!kw) return null;
                    const isSelected = selectedKwIdx === globalIdx;
                    const serpData = serpResults[kw.term];
                    return (
                      <button
                        key={globalIdx}
                        onClick={() => setSelectedKwIdx(globalIdx)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm border transition-colors ${
                          isSelected
                            ? 'bg-primary border-primary font-medium'
                            : 'bg-muted/30 border-border hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className={`truncate font-medium ${isSelected ? 'text-black' : 'text-white'}`}>{kw.term}</span>
                          {serpData && (
                            <span className={`text-[10px] shrink-0 ${isSelected ? 'opacity-100' : 'opacity-70'}`}>
                              {serpData.topRedditPosts.length + serpData.newRedditPosts.length} posts
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                  {selectedKwIds.size === 0 && (
                    <p className="text-xs text-muted-foreground italic">No keywords. Go to Save tab.</p>
                  )}
                  {selectedKwIdx !== null && (
                    <Button onClick={handleSerpAnalysis} disabled={serpLoading} className="w-full" size="sm">
                      {serpLoading
                        ? <><Spinner className="h-3.5 w-3.5 mr-1.5" />Searching…</>
                        : <><Zap className="h-3.5 w-3.5 mr-1.5" />Run SERP</>
                      }
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-4">
              {serpLoading && (
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                  </CardContent>
                </Card>
              )}
              {kwSerpData && !serpLoading && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">SERP Results — {selectedKw?.term}</CardTitle>
                    <CardDescription className="text-xs">Google SERP Reddit posts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!allSerpPosts.length ? (
                      <p className="text-sm text-muted-foreground py-8 text-center">No posts found</p>
                    ) : (
                      <div className="space-y-2">
                        {allSerpPosts.map((post, i) => (
                          <PostCard
                            key={i}
                            post={post}
                            brandLabel={companyName}
                            allCompetitors={competitors}
                            scannedData={scannedPostDetails[post.url || post.post_url]}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              {!kwSerpData && !serpLoading && (
                <div className="flex flex-col items-center justify-center h-48 border border-dashed border-border rounded-lg text-muted-foreground gap-3">
                  <Zap className="h-10 w-10 opacity-20" />
                  <div className="text-center text-sm">
                    <p className="font-medium">Run SERP search</p>
                    <p className="text-xs mt-1 opacity-70">Select keyword and click Run SERP</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Threads - Site locator */}


        {/* Top Posts */}
        <TabsContent value="top" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />Top Posts
              </CardTitle>
              <CardDescription className="text-xs">Highest engagement Reddit posts</CardDescription>
            </CardHeader>
            <CardContent>
              {serpTopPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-3">
                  <BarChart2 className="h-10 w-10 opacity-20" />
                  <p className="text-sm text-center">Run SERP search to see top posts</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {serpTopPosts.map((post, i) => (
                    <PostCard
                      key={i}
                      post={post}
                      brandLabel={companyName}
                      allCompetitors={competitors}
                      rank={i + 1}
                      scannedData={scannedPostDetails[post.url || post.post_url]}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Posts */}
        <TabsContent value="new" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />New Posts
              </CardTitle>
              <CardDescription className="text-xs">Recently posted Reddit threads</CardDescription>
            </CardHeader>
            <CardContent>
              {serpNewPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-3">
                  <Clock className="h-10 w-10 opacity-20" />
                  <p className="text-sm text-center">Run SERP search to see new posts</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {serpNewPosts.map((post, i) => (
                    <PostCard
                      key={i}
                      post={post}
                      brandLabel={companyName}
                      allCompetitors={competitors}
                      scannedData={scannedPostDetails[post.url || post.post_url]}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Citations - Table view */}
        <TabsContent value="citations" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />Citation Test
              </CardTitle>
              <CardDescription className="text-xs">All posts found via AI citation search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {citationLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-64 w-full rounded-lg" />
                </div>
              ) : citationTableData.length > 0 ? (
                <>
                  <p className="text-xs text-muted-foreground">
                    {citationTableData.length} unique link{citationTableData.length !== 1 ? 's' : ''} across all models
                  </p>
                  <CitationTable
                    records={citationTableData}
                    scannedPostDetails={scannedPostDetails}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-3">
                  <AlertCircle className="h-10 w-10 opacity-20" />
                  <div className="text-center text-sm">
                    <p className="font-medium">No citations yet</p>
                    <p className="text-xs mt-1">Add prompts below and run Citation Search</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Citation controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />Citation Search
              </CardTitle>
              <CardDescription className="text-xs">Run AI to find posts matching your prompts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {citationPrompts.length > 0 && (
                <div className="text-xs text-muted-foreground space-y-1 max-h-24 overflow-y-auto">
                  <p className="font-medium">Current prompts:</p>
                  {citationPrompts.map((p, i) => (
                    <p key={i} className="flex items-start gap-1 pl-2">
                      <span className="text-primary">•</span>{p}
                    </p>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  value={manualCitationInput}
                  onChange={e => setManualCitationInput(e.target.value)}
                  placeholder="Add custom prompt"
                  className="h-9 text-xs"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && manualCitationInput.trim()) {
                      setManualCitationPrompts(ps => [...ps, manualCitationInput.trim()]);
                      setManualCitationInput('');
                    }
                  }}
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 px-2 shrink-0"
                  onClick={() => {
                    if (manualCitationInput.trim()) {
                      setManualCitationPrompts(ps => [...ps, manualCitationInput.trim()]);
                      setManualCitationInput('');
                    }
                  }}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                onClick={handleCitationSearch}
                disabled={citationLoading || citationPrompts.length === 0}
                className="w-full"
                size="sm"
              >
                {citationLoading
                  ? <><Spinner className="h-3.5 w-3.5 mr-1.5" />Searching…</>
                  : <><Sparkles className="h-3.5 w-3.5 mr-1.5" />Run Citation Search</>
                }
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
