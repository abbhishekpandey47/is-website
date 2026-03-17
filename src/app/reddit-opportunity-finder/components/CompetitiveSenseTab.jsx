'use client'

import { useState, useMemo } from 'react'
import { auth } from '@/lib/firebaseClient'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Skeleton } from '@/Components/ui/skeleton'
import {
  Loader2, TrendingUp, Users, MessageSquare, AlertCircle,
  BarChart3, ExternalLink, ChevronDown, ChevronUp, Zap,
  Target, Activity, Search, Crosshair, Lightbulb,
  CheckCircle2, RefreshCw, Clock, WifiOff, Eye,
} from 'lucide-react'
import TimeSeriesChart from '@/app/threadflow/subredditsense/components/TimeSeriesChart'
import SubredditHeatmapAPI from '@/app/threadflow/subredditsense/components/SubredditHeatmapAPI'
import TopThreadsTable from '@/app/threadflow/subredditsense/components/TopThreadsTable'
import TopicClusters from '@/app/threadflow/subredditsense/components/TopicClusters'
import EngagementFunnelAPI from '@/app/threadflow/subredditsense/components/EngagementFunnelAPI'
import AllThreadsTable from '@/app/threadflow/subredditsense/components/AllThreadsTable'

// ─── SubredditSense pipeline helpers ─────────────────────────────────────────

function authHeaders(token) {
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }
}

async function linkCompany(companyName, token, source = null) {
  const res = await fetch('/api/threadflow/reddit/link-company', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ companyName, ...(source ? { source } : {}) }),
  })
  if (!res.ok) throw new Error(`link-company failed for "${companyName}": ${res.status}`)
  return res.json()
}

async function ingestMentions(companyId, companyName, token, isCompetitor = false) {
  const res = await fetch('/api/threadflow/reddit/fetch', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ companyId, companyName, fullRefresh: false, maxBatches: 1, isCompetitor }),
    signal: AbortSignal.timeout(65_000), // 60s ingest hard cap + buffer
  })
  if (!res.ok) throw new Error(`fetch failed for "${companyName}": ${res.status}`)
  return res.json()
}

async function fetchDashboard(companyId, token, isCompetitor = false) {
  const extra = isCompetitor ? '&competitorAccess=1' : ''
  const res = await fetch(
    `/api/threadflow/reddit/dashboard?companyId=${encodeURIComponent(companyId)}&range=365&legacy=1${extra}`,
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  )
  if (!res.ok) throw new Error(`dashboard failed for companyId ${companyId}: ${res.status}`)
  return res.json()
}

// Full SS pipeline for one company (link → ingest → dashboard)
// onStep(step) called with: 'linking' | 'ingesting' | 'loading' | 'done' | 'error'
// preResolvedId: skip link-company if caller already has the UUID
async function runSSPipeline(companyName, token, onStep, preResolvedId = null, source = null) {
  onStep('linking')
  let companyId = preResolvedId
  if (!companyId) {
    const linkRes = await linkCompany(companyName, token, source)
    companyId = linkRes.company?.id || linkRes.companyId
  }

  onStep('ingesting')
  try { await ingestMentions(companyId, companyName, token, source === 'competitor') }
  catch (e) { console.warn(`[SS] ingest soft-fail for "${companyName}":`, e.message) }
  // continue even if ingest fails — use whatever is in Supabase already

  onStep('loading')
  const dashboard = await fetchDashboard(companyId, token, source === 'competitor')

  onStep('done')
  return { companyId, dashboard }
}

// ─── Data transformers for SS components ──────────────────────────────────────

function toTopThreadsFormat(threads = []) {
  return threads.map((t, idx) => ({
    id: idx,
    title: t.title || t.post_title || 'Untitled',
    subreddit: t.subreddit || 'unknown',
    author: t.author || '',
    karma: null,
    upvotes: t.upvotes || 0,
    comments: t.comments || t.total_comments || 0,
    age: '',
    matchReason: Array.isArray(t.competitors) ? t.competitors.join(', ') : '',
    sentiment: (t.upvotes || 0) > 0 ? 'positive' : (t.upvotes || 0) < 0 ? 'negative' : 'neutral',
    priority: ((t.upvotes || 0) + (t.comments || 0)) > 10 ? 'high' : 'medium',
    post_url: t.url || t.post_url || '',
  }))
}

function toAllThreadsFormat(threads = []) {
  return threads.map((t, idx) => ({
    id: idx,
    type: t.type || 'post',
    title: t.title || 'Untitled',
    subreddit: t.subreddit || 'unknown',
    author: t.author || '',
    upvotes: t.upvotes || 0,
    comments: t.comments || t.total_comments || 0,
    sentiment: (t.upvotes || 0) > 0 ? 'positive' : (t.upvotes || 0) < 0 ? 'negative' : 'neutral',
    createdAt: t.created_utc || t.fetched_at || null,
    post_url: t.url || t.post_url || '',
  }))
}

// Build a synthetic heatmap from live scan subreddits (fallback if SS data unavailable)
function buildScanHeatmap(scanSubreddits) {
  const weeks = ['W1','W2','W3','W4','W5','W6','W7','W8']
  return Object.entries(scanSubreddits || {})
    .filter(([, s]) => s.competitorMentions > 0)
    .map(([sub, s]) => ({
      subreddit: sub,
      data: weeks.map(w => ({
        week: w,
        value: w === 'W8' ? (s.competitorMentions || 0) : 0,
        engagement: w === 'W8' ? (s.avgEngagement || 0) : 0,
      })),
    }))
}

function buildCompetitorTopicClusters(competitorThreads = []) {
  const counts = {}
  const stop = new Set(['this','that','with','from','your','about','have','will','they','their','there','what','when','where','which','them','into','over','under','after','before','still','just','more','some','been','than','then','many','also','such','because','while','could','should','would','until','these','those','using','used','uses','able'])
  competitorThreads.forEach(t => {
    const words = (t.title || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !stop.has(w))
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i+1]}`
      counts[phrase] = (counts[phrase] || 0) + 1
    }
  })
  return Object.entries(counts)
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([phrase, count]) => ({ cluster_key: phrase, representative_phrase: phrase, mentions_count: count, avg_engagement: 0 }))
}

function normCompetitorName(c) {
  return typeof c === 'string' ? c : (c?.name || c?.companyName || String(c))
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CompetitiveSenseTab({
  companyContext, companyId, userId, onDataLoaded,
  companyName: companyNameProp,
  competitors: competitorsProp = [],
}) {
  const [topic, setTopic]               = useState('')
  const [scanLoading, setScanLoading]   = useState(false)
  const [scanData, setScanData]         = useState(null)
  const [error, setError]               = useState(null)

  // Brand SubredditSense pipeline state
  const [ssStatus, setSsStatus]                 = useState('idle') // 'idle'|'ingesting'|'loading'|'done'|'error'
  const [ssData, setSsData]                     = useState(null)
  const [ssLastIngestedAt, setSsLastIngestedAt] = useState(null)

  // Competitor SS pipeline state — one entry per competitor name
  // { [name]: 'idle'|'linking'|'ingesting'|'loading'|'done'|'error' }
  const [competitorStatus, setCompetitorStatus] = useState({})
  // { [name]: { companyId, dashboard } }
  const [competitorData, setCompetitorData]     = useState({})

  const [expandedKeys, setExpandedKeys] = useState({})

  const companyName = companyNameProp
    || companyContext?.companyName
    || companyContext?.companyContext?.approvedContext?.companyName
    || ''

  const competitors = competitorsProp.map(normCompetitorName).filter(Boolean)

  const handleAnalyze = async () => {
    if (!companyName) { setError('No company name set. Please configure company context first.'); return }

    // Reset all state
    setScanData(null); setSsData(null); setSsStatus('idle')
    setSsLastIngestedAt(null); setError(null); setScanLoading(true)
    const initStatus = Object.fromEntries(competitors.map(c => [c, 'idle']))
    setCompetitorStatus(initStatus); setCompetitorData({})

    const token = await auth.currentUser?.getIdToken?.()

    // ── 0. Resolve brand company ID from name (link-company is idempotent) ─────
    let resolvedCompanyId = companyId // use prop if available
    if (!resolvedCompanyId) {
      try {
        setSsStatus('linking')
        const linkRes = await linkCompany(companyName, token)
        resolvedCompanyId = linkRes.company?.id || linkRes.companyId
      } catch (err) {
        console.warn('[CompetitiveSense] brand link failed, will retry in pipeline:', err.message)
      }
    }

    // ── 1. Brand SS pipeline (always fresh — no staleness check) ──────────────
    const brandProm = runSSPipeline(companyName, token, step => setSsStatus(step === 'done' ? 'done' : step), resolvedCompanyId)
      .then(({ companyId: resolvedId, dashboard }) => {
        if (!resolvedCompanyId) resolvedCompanyId = resolvedId
        setSsData(dashboard)
        setSsLastIngestedAt(dashboard.lastIngestedAt || null)
      })
      .catch(err => {
        console.error('[CompetitiveSense] brand SS failed:', err.message)
        setSsStatus('error')
      })

    // ── 2. Competitive live scan + competitor SS pipelines run in parallel ──────
    // Brand pipeline already awaited above to resolve companyId
    const runScan = async () => {
      if (!resolvedCompanyId) { setScanLoading(false); return }
      try {
        const res = await fetch('/api/threadflow/subreddit-sense-competitive', {
          method: 'POST',
          headers: authHeaders(token),
          body: JSON.stringify({ topic: topic.trim() || null, companyId: resolvedCompanyId, companyName, competitors }),
        })
        if (!res.ok) { const p = await res.json().catch(() => ({})); throw new Error(p?.error || `scan error ${res.status}`) }
        const result = await res.json()
        setScanData(result); onDataLoaded?.(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setScanLoading(false)
      }
    }

    // ── 3. Competitor SS pipelines (link → ingest → dashboard for each) ───────
    const competitorPrms = competitors.map(async compName => {
      const setStep = step =>
        setCompetitorStatus(prev => ({ ...prev, [compName]: step }))
      try {
        const result = await runSSPipeline(compName, token, setStep, null, 'competitor')
        setCompetitorData(prev => ({ ...prev, [compName]: result }))
      } catch (err) {
        console.warn(`[CompetitiveSense] competitor "${compName}" failed:`, err.message)
        setStep('error')
      }
    })

    await Promise.allSettled([brandProm, runScan(), ...competitorPrms])
  }

  const toggle = key => setExpandedKeys(p => ({ ...p, [key]: !p[key] }))

  // Derived
  const ssPending    = ssStatus === 'ingesting' || ssStatus === 'loading' || ssStatus === 'linking'
  const ssReady      = ssData !== null && ssStatus === 'done'
  const anyCompReady = competitors.some(c => competitorStatus[c] === 'done' && competitorData[c])

  // Competitor tabs (only those that loaded successfully)
  const readyCompetitors  = competitors.filter(c => competitorStatus[c] === 'done' && competitorData[c])
  const pendingCompetitors = competitors.filter(c => ['linking','ingesting','loading'].includes(competitorStatus[c]))
  const failedCompetitors  = competitors.filter(c => competitorStatus[c] === 'error')

  // Brand top-thread rows for SS components
  const brandTopThreads = ssReady ? toTopThreadsFormat((ssData.topThreads || []).sort((a,b)=>(b.upvotes+b.comments)-(a.upvotes+a.comments)).slice(0,10)) : []
  const brandAllThreads = ssReady ? toAllThreadsFormat(ssData.allThreads || []) : []

  return (
    <div className="space-y-6">
      {/* ── Scan input ── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-primary" />Reddit Competitive Analysis
          </CardTitle>
          <CardDescription>
            Runs the full SubredditSense pipeline (ingest → dashboard) for your brand
            {competitors.length > 0 && ` and ${competitors.length} competitor${competitors.length !== 1 ? 's' : ''}`},
            then cross-references for gap analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Optional topic (e.g. 'content marketing tools')"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
              disabled={scanLoading}
              className="flex-1"
            />
            <Button onClick={handleAnalyze} disabled={scanLoading} className="shrink-0">
              {scanLoading
                ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Scanning…</>
                : <><Search className="h-4 w-4 mr-2" />{topic.trim() ? 'Analyze Topic' : 'Run Full Scan'}</>}
            </Button>
          </div>

          {/* Pipeline status strip */}
          {(ssPending || pendingCompetitors.length > 0 || ssStatus !== 'idle') && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <PipelineBadge label={companyName || 'Your Brand'} status={ssStatus} />
              {competitors.map(c => (
                <PipelineBadge key={c} label={c} status={competitorStatus[c] || 'idle'} />
              ))}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg border border-destructive/20">
              <AlertCircle className="h-4 w-4 shrink-0" /><span>{error}</span>
            </div>
          )}
          {competitors.length === 0 && (
            <p className="text-xs text-muted-foreground">
              Add competitors in the main SERP Scout panel to enable competitor ingestion and gap analysis.
            </p>
          )}
        </CardContent>
      </Card>

      {/* ── Loading skeleton ── */}
      {scanLoading && !scanData && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1,2,3,4].map(i=>(
              <Card key={i}><CardContent className="pt-4 pb-3 space-y-2">
                <Skeleton className="h-7 w-16"/><Skeleton className="h-3 w-24"/>
              </CardContent></Card>
            ))}
          </div>
          <Card><CardContent className="pt-4 space-y-3">
            <Skeleton className="h-4 w-1/3"/><Skeleton className="h-40 w-full rounded-lg"/>
          </CardContent></Card>
        </div>
      )}

      {/* ── Results ── */}
      {scanData && (
        <div className="space-y-6">
          {/* Summary metrics: brand (SS) + scan totals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Brand Mentions',      value: ssReady ? ssData.metrics?.totalMentions : (ssPending ? '…' : '—'), sub: 'SubredditSense history', icon: TrendingUp, cls: 'text-emerald-600' },
              { label: 'Brand Communities',   value: ssReady ? ssData.metrics?.activeSubreddits : (ssPending ? '…' : '—'), sub: 'active subreddits', icon: BarChart3, cls: 'text-violet-600' },
              { label: 'Competitor Mentions',  value: scanData.metrics?.competitorMentions ?? 0, sub: 'live scan', icon: Users, cls: 'text-rose-600' },
              { label: 'Total SS Competitors', value: readyCompetitors.length + (pendingCompetitors.length > 0 ? ` / ${competitors.length}` : ''), sub: 'ingested successfully', icon: Activity, cls: 'text-foreground' },
            ].map(({ label, value, sub, icon: Icon, cls }) => (
              <Card key={label}>
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground truncate">{label}</p>
                      <p className={`text-2xl font-bold mt-0.5 ${cls}`}>{value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{sub}</p>
                    </div>
                    <Icon className={`h-6 w-6 shrink-0 opacity-15 mt-0.5 ${cls}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <ShareBar brand={scanData.metrics?.brandMentions ?? 0} competitors={scanData.metrics?.competitorMentions ?? 0} />

          {/* ── Main 3-tab analysis ── */}
          <Tabs defaultValue="gap">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="brand" className="text-xs gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" />Your Brand
                {ssPending && <Loader2 className="h-3 w-3 animate-spin opacity-60" />}
                {ssReady  && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
              </TabsTrigger>
              <TabsTrigger value="competitors" className="text-xs gap-1.5">
                <Users className="h-3.5 w-3.5" />Competitors
                {pendingCompetitors.length > 0 && <Loader2 className="h-3 w-3 animate-spin opacity-60" />}
                {pendingCompetitors.length === 0 && readyCompetitors.length > 0 && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
              </TabsTrigger>
              <TabsTrigger value="gap" className="text-xs gap-1.5">
                <Crosshair className="h-3.5 w-3.5" />Gap Analysis
              </TabsTrigger>
            </TabsList>

            {/* ══ YOUR BRAND TAB ══ */}
            <TabsContent value="brand" className="mt-6 space-y-6">
              {ssPending && <PipelineProgressCard name={companyName || 'Your Brand'} status={ssStatus} />}

              {ssStatus === 'error' && (
                <div className="flex flex-col items-center justify-center h-40 border border-dashed border-border rounded-lg text-muted-foreground gap-2">
                  <WifiOff className="h-8 w-8 opacity-20" />
                  <p className="text-sm">Failed to load SubredditSense data for your brand.</p>
                </div>
              )}

              {ssReady && (
                <>
                  {/* SS metric grid */}
                  <SSMetricGrid metrics={ssData.metrics} lastIngestedAt={ssLastIngestedAt} />
                  <TimeSeriesChart data={ssData.timeSeries || []} />
                  <SubredditHeatmapAPI data={ssData.heatmap || []} />
                  <TopicClusters data={ssData.topicClusters || []} />
                  <EngagementFunnelAPI data={ssData.funnel || []} />
                  {brandTopThreads.length > 0 && <TopThreadsTable threads={brandTopThreads} />}
                  {brandAllThreads.length > 0 && <AllThreadsTable threads={brandAllThreads} />}
                </>
              )}
            </TabsContent>

            {/* ══ COMPETITORS TAB ══ */}
            <TabsContent value="competitors" className="mt-6 space-y-6">
              {/* Progress for still-loading competitors */}
              {pendingCompetitors.length > 0 && (
                <div className="space-y-2">
                  {pendingCompetitors.map(c => (
                    <PipelineProgressCard key={c} name={c} status={competitorStatus[c]} />
                  ))}
                </div>
              )}

              {/* Failed competitors */}
              {failedCompetitors.length > 0 && (
                <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
                  {failedCompetitors.map(c => (
                    <Badge key={c} variant="outline" className="text-rose-600 border-rose-200 bg-rose-50">
                      {c} — failed
                    </Badge>
                  ))}
                </div>
              )}

              {/* Live scan fallback if no SS competitor data ready yet */}
              {!anyCompReady && pendingCompetitors.length === 0 && scanData && (
                <div className="space-y-6">
                  <p className="text-xs text-muted-foreground">Showing live scan data. Add competitors and re-scan for full SubredditSense ingestion.</p>
                  <SubredditHeatmapAPI data={buildScanHeatmap(scanData.subreddits)} />
                  <TopicClusters data={buildCompetitorTopicClusters(scanData.threads?.competitor ?? [])} />
                  {toTopThreadsFormat((scanData.threads?.competitor??[]).sort((a,b)=>(b.upvotes+b.comments)-(a.upvotes+a.comments)).slice(0,10)).length > 0 && (
                    <TopThreadsTable threads={toTopThreadsFormat((scanData.threads?.competitor??[]).sort((a,b)=>(b.upvotes+b.comments)-(a.upvotes+a.comments)).slice(0,10))} />
                  )}
                </div>
              )}

              {/* Per-competitor SS dashboards */}
              {readyCompetitors.length > 0 && (
                <Tabs defaultValue="all">
                  <TabsList className="flex flex-wrap gap-1 h-auto">
                    <TabsTrigger value="all" className="text-xs font-medium">All Competitors</TabsTrigger>
                    {readyCompetitors.map(c => (
                      <TabsTrigger key={c} value={c} className="text-xs">{c}</TabsTrigger>
                    ))}
                  </TabsList>

                  {/* ── All Competitors combined view ── */}
                  <TabsContent value="all" className="mt-6 space-y-6">
                    {(() => {
                      const mergedAllThreads = readyCompetitors.flatMap(c => {
                        const threads = competitorData[c]?.dashboard?.allThreads || []
                        return threads.map(t => ({ ...t, _competitor: c }))
                      }).sort((a, b) => (b.upvotes + b.comments) - (a.upvotes + a.comments))

                      const mergedTopThreads = toTopThreadsFormat(
                        mergedAllThreads.slice(0, 10)
                      )
                      const mergedAllFormatted = toAllThreadsFormat(mergedAllThreads)

                      // Merged metrics
                      const totalMentions = readyCompetitors.reduce((sum, c) =>
                        sum + (competitorData[c]?.dashboard?.metrics?.totalMentions || 0), 0)
                      const totalSubreddits = new Set(
                        readyCompetitors.flatMap(c =>
                          (competitorData[c]?.dashboard?.heatmap || []).map(h => h.subreddit)
                        )
                      ).size

                      return (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[
                              { label: 'Total Competitor Mentions', value: totalMentions },
                              { label: 'Subreddits Active', value: totalSubreddits },
                              { label: 'Competitors Tracked', value: readyCompetitors.length },
                            ].map(({ label, value }) => (
                              <div key={label} className="rounded-xl border border-border bg-muted/30 p-4 flex flex-col gap-1">
                                <p className="text-2xl font-bold">{value}</p>
                                <p className="text-xs text-muted-foreground">{label}</p>
                              </div>
                            ))}
                          </div>
                          {mergedTopThreads.length > 0 && <TopThreadsTable threads={mergedTopThreads} />}
                          {mergedAllFormatted.length > 0 && <AllThreadsTable threads={mergedAllFormatted} />}
                          {mergedAllFormatted.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-8">No thread data yet</p>
                          )}
                        </>
                      )
                    })()}
                  </TabsContent>

                  {readyCompetitors.map(c => {
                    const { dashboard } = competitorData[c]
                    const topT = toTopThreadsFormat((dashboard.topThreads||[]).sort((a,b)=>(b.upvotes+b.comments)-(a.upvotes+a.comments)).slice(0,10))
                    const allT = toAllThreadsFormat(dashboard.allThreads||[])
                    return (
                      <TabsContent key={c} value={c} className="mt-6 space-y-6">
                        <SSMetricGrid metrics={dashboard.metrics} lastIngestedAt={dashboard.lastIngestedAt} label={c} />
                        <TimeSeriesChart data={dashboard.timeSeries || []} />
                        <SubredditHeatmapAPI data={dashboard.heatmap || []} />
                        <TopicClusters data={dashboard.topicClusters || []} />
                        <EngagementFunnelAPI data={dashboard.funnel || []} />
                        {topT.length > 0 && <TopThreadsTable threads={topT} />}
                        {allT.length > 0 && <AllThreadsTable threads={allT} />}
                      </TabsContent>
                    )
                  })}
                </Tabs>
              )}
            </TabsContent>

            {/* ══ GAP ANALYSIS TAB ══ */}
            <TabsContent value="gap" className="mt-6">
              <GapAnalysis
                scanData={scanData}
                ssStatus={ssStatus}
                ssData={ssData}
                ssLastIngestedAt={ssLastIngestedAt}
                competitorData={competitorData}
                competitorStatus={competitorStatus}
                competitors={competitors}
                expandedKeys={expandedKeys}
                toggle={toggle}
                companyName={companyName}
              />
            </TabsContent>
          </Tabs>

          {scanData.coverage && (
            <p className="text-xs text-muted-foreground text-center">
              Live scan: {scanData.coverage.analyzedPosts} posts analyzed · {scanData.coverage.matchedPosts} matched
            </p>
          )}
        </div>
      )}

      {!scanData && !scanLoading && !error && (
        <div className="flex flex-col items-center justify-center h-52 border border-dashed border-border rounded-lg text-muted-foreground gap-3">
          <Target className="h-10 w-10 opacity-20" />
          <div className="text-center text-sm">
            <p className="font-medium">No results yet</p>
            <p className="text-xs mt-1 opacity-70">Run a full scan to ingest fresh Reddit data for your brand and competitors.</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Pipeline status badge ─────────────────────────────────────────────────────

function PipelineBadge({ label, status }) {
  const cfg = {
    idle:      { cls: 'text-muted-foreground border-border',          icon: null,       spin: false },
    linking:   { cls: 'text-blue-600 border-blue-200 bg-blue-50',     icon: Loader2,    spin: true  },
    ingesting: { cls: 'text-amber-600 border-amber-200 bg-amber-50',  icon: RefreshCw,  spin: true  },
    loading:   { cls: 'text-blue-600 border-blue-200 bg-blue-50',     icon: Loader2,    spin: true  },
    done:      { cls: 'text-emerald-600 border-emerald-200 bg-emerald-50', icon: CheckCircle2, spin: false },
    error:     { cls: 'text-rose-600 border-rose-200 bg-rose-50',     icon: AlertCircle,spin: false },
  }[status || 'idle']
  if (!cfg) return null
  const Icon = cfg.icon
  const label2 = { idle:'idle', linking:'linking…', ingesting:'ingesting…', loading:'loading…', done:'done', error:'error' }[status || 'idle']
  return (
    <Badge variant="outline" className={`text-[10px] flex items-center gap-1 ${cfg.cls}`}>
      {Icon && <Icon className={`h-2.5 w-2.5 ${cfg.spin ? 'animate-spin' : ''}`} />}
      <span className="font-medium">{label}</span>
      <span className="opacity-60">— {label2}</span>
    </Badge>
  )
}

// ─── Pipeline progress card ────────────────────────────────────────────────────

function PipelineProgressCard({ name, status }) {
  const steps = [
    { key: 'linking',   label: 'Linking company' },
    { key: 'ingesting', label: 'Ingesting mentions' },
    { key: 'loading',   label: 'Loading dashboard' },
    { key: 'done',      label: 'Complete' },
  ]
  const currentIdx = steps.findIndex(s => s.key === status)
  return (
    <Card className="border-dashed">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium">{name}</p>
          <Badge variant="outline" className="text-[10px]">{status}</Badge>
        </div>
        <div className="flex items-center gap-1">
          {steps.map((step, idx) => {
            const done   = currentIdx > idx || status === 'done'
            const active = currentIdx === idx
            return (
              <div key={step.key} className="flex items-center gap-1 flex-1 min-w-0">
                <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${done ? 'bg-emerald-500' : active ? 'bg-primary' : 'bg-muted-foreground/20'}`} />
                <div className={`h-1 flex-1 rounded-full ${done ? 'bg-emerald-500' : active ? 'bg-primary/50' : 'bg-muted-foreground/10'}`} />
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" />
          {steps[currentIdx]?.label ?? 'Processing…'}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── SS metric grid ────────────────────────────────────────────────────────────

function SSMetricGrid({ metrics, lastIngestedAt, label }) {
  if (!metrics) return null
  const cards = [
    { title: 'Total Mentions',    value: metrics.totalMentions,        color: '#60a5fa', icon: MessageSquare },
    { title: 'Active Subreddits', value: metrics.activeSubreddits,     color: '#9382ff', icon: BarChart3 },
    { title: 'Avg Engagement',    value: metrics.avgEngagement,        color: '#34d399', icon: TrendingUp },
    { title: 'Positive Sentiment',value: (metrics.positiveSentimentPct ?? 0) + '%', color: '#fbbf24', icon: Eye },
  ]
  return (
    <div className="space-y-3">
      {label && lastIngestedAt && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          <span>{label} — last ingested {new Date(lastIngestedAt).toLocaleString()}</span>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map(({ title, value, color, icon: Icon }) => (
          <div key={title} className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-4 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}1a` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <p className="text-[11px] uppercase tracking-wide text-[rgba(255,255,255,0.3)]">{title}</p>
            <p className="text-[26px] font-semibold tabular-nums text-[#ededed]">{value ?? '—'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Share Bar ────────────────────────────────────────────────────────────────

function ShareBar({ brand, competitors }) {
  const total = brand + competitors
  if (!total) return null
  const brandPct = Math.round((brand / total) * 100)
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-sm">Live Scan Mention Share — Brand vs Competitors</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex rounded-full overflow-hidden h-4 w-full">
          <div className="bg-emerald-500 transition-all duration-700" style={{ width: `${brandPct}%` }} />
          <div className="bg-rose-500 transition-all duration-700" style={{ width: `${100 - brandPct}%` }} />
        </div>
        <div className="flex justify-between text-xs">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span className="text-muted-foreground">Your brand</span>
            <span className="font-semibold text-emerald-600">{brandPct}% ({brand})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-rose-600">{100-brandPct}% ({competitors})</span>
            <span className="text-muted-foreground">Competitors</span>
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-rose-500" />
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Thread card list ──────────────────────────────────────────────────────────

const RELEVANCE_BADGE = {
  relevant:   { cls: 'text-emerald-700 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-300', label: 'Relevant' },
  uncertain:  { cls: 'text-amber-700 border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-300',   label: 'Maybe'    },
  irrelevant: { cls: 'text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-300',         label: 'Off-topic' },
}

function ThreadCardList({ threads, compact = false, relevanceFilter = 'all' }) {
  const filtered = relevanceFilter === 'all'
    ? threads
    : threads.filter(t => (t.relevanceLabel ?? 'uncertain') === relevanceFilter)

  if (!Array.isArray(filtered) || filtered.length === 0) {
    const emptyMsg = relevanceFilter !== 'all'
      ? `No ${relevanceFilter} mentions in this view`
      : 'No threads found'
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-2 text-muted-foreground">
        <MessageSquare className="h-8 w-8 opacity-20" />
        <p className="text-sm">{emptyMsg}</p>
      </div>
    )
  }
  const rows = compact ? filtered.slice(0,8) : filtered
  return (
    <div className="space-y-2">
      {rows.map((t, idx) => {
        const relBadge = t.relevanceLabel ? RELEVANCE_BADGE[t.relevanceLabel] : null
        return (
          <div key={`${t.url??'t'}-${idx}`} className="rounded-lg border border-border bg-card p-3 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <p className="text-sm font-medium line-clamp-2 leading-snug flex-1">{t.title || 'Untitled thread'}</p>
                  {relBadge && (
                    <span title={t.relevanceMatched?.length ? `Matched: ${t.relevanceMatched.slice(0,5).join(', ')}` : undefined}
                      className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${relBadge.cls}`}>
                      {relBadge.label}{t.relevanceScore !== undefined ? ` ${t.relevanceScore}` : ''}
                    </span>
                  )}
                </div>
                {t.mentionHighlights?.[0]?.snippet && (
                  <p className="text-xs text-muted-foreground line-clamp-2 italic">&ldquo;&hellip;{t.mentionHighlights[0].snippet}&hellip;&rdquo;</p>
                )}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">r/{t.subreddit||'unknown'}</Badge>
                  {t.mentionsBrand && <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-emerald-600 border-emerald-200 bg-emerald-50">Your brand</Badge>}
                  {(t.competitors||[]).slice(0,4).map(c => (
                    <Badge key={c} variant="outline" className="text-[10px] px-1.5 py-0 text-rose-600 border-rose-200 bg-rose-50">{c}</Badge>
                  ))}
                  <span className="text-[10px] text-muted-foreground ml-auto">&uarr; {t.upvotes??0} &middot; &#x1F4AC; {t.comments??0}</span>
                </div>
              </div>
              {t.url && (
                <a href={t.url} target="_blank" rel="noopener noreferrer"
                  className="shrink-0 p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        )
      })}
      {compact && filtered.length > 8 && (
        <p className="text-xs text-muted-foreground text-center pt-1">+{filtered.length-8} more threads</p>
      )}
      {relevanceFilter !== 'all' && threads.length !== filtered.length && (
        <p className="text-xs text-muted-foreground text-center pt-1">{threads.length - filtered.length} thread{threads.length-filtered.length!==1?'s':''} hidden by relevance filter</p>
      )}
    </div>
  )
}
// Build { [subredditLower]: { subreddit, totalMentions } } from SS heatmap
function buildSubMap(heatmap = []) {
  const map = {}
  heatmap.forEach(entry => {
    const sub = (entry.subreddit || '').toLowerCase()
    if (!sub) return
    const total = (entry.data || []).reduce((s, d) => s + (d.value || 0), 0)
    map[sub] = { subreddit: entry.subreddit, totalMentions: total }
  })
  return map
}

// Merge all competitor SS heatmaps into one subreddit map
function buildMergedCompetitorSubMap(competitorData = {}) {
  const map = {}
  Object.entries(competitorData).forEach(([compName, { dashboard }]) => {
    if (!dashboard?.heatmap) return
    dashboard.heatmap.forEach(entry => {
      const sub = (entry.subreddit || '').toLowerCase()
      if (!sub) return
      const total = (entry.data || []).reduce((s, d) => s + (d.value || 0), 0)
      if (!map[sub]) map[sub] = { subreddit: entry.subreddit, totalMentions: 0, byCompetitor: {} }
      map[sub].totalMentions += total
      map[sub].byCompetitor[compName] = (map[sub].byCompetitor[compName] || 0) + total
    })
  })
  return map
}

// Produce rows: gap (comp only) | battleground (both) | stronghold (brand only)
function buildComparisonRows(brandSubMap = {}, compSubMap = {}) {
  const allSubs = new Set([...Object.keys(brandSubMap), ...Object.keys(compSubMap)])
  return Array.from(allSubs).map(sub => {
    const brand = brandSubMap[sub]
    const comp  = compSubMap[sub]
    const brandMentions      = brand?.totalMentions || 0
    const competitorMentions = comp?.totalMentions  || 0
    const byCompetitor       = comp?.byCompetitor   || {}
    const category = brandMentions === 0 && competitorMentions > 0
      ? 'gap'
      : brandMentions > 0 && competitorMentions > 0
        ? 'battleground'
        : 'stronghold'
    return { subreddit: brand?.subreddit || comp?.subreddit || sub, category, brandMentions, competitorMentions, byCompetitor }
  })
}

// Extract bi-gram topic phrases from thread titles
function extractTopics(threads = []) {
  const stop = new Set(['this','that','with','from','your','about','have','will','they','their','there','what','when','where','which','them','into','over','under','after','before','still','just','more','some','been','than','then','many','also','such','because','while','could','should','would','until','these','those','using','used','uses','able'])
  const counts = {}
  threads.forEach(t => {
    const words = (t.title || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !stop.has(w))
    for (let i = 0; i < words.length - 1; i++) {
      const phrase = `${words[i]} ${words[i+1]}`
      counts[phrase] = (counts[phrase] || 0) + 1
    }
  })
  return Object.entries(counts)
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([phrase, count]) => ({ phrase, count }))
}

function GapAnalysis({ scanData, ssStatus, ssData, ssLastIngestedAt, competitorData, competitorStatus, competitors, expandedKeys, toggle, companyName }) {
  const { brandMentions=0, competitorMentions=0 } = scanData.metrics ?? {}

  const ssPending = ['linking','ingesting','loading'].includes(ssStatus)
  const ssReady   = ssData !== null && ssStatus === 'done'
  const anyCompSS = Object.values(competitorData).some(d => d?.dashboard)

  // Build comparison from SS data (most accurate) or fall back to live scan
  const brandSubMap = ssReady ? buildSubMap(ssData.heatmap) : {}
  const compSSSubMap = anyCompSS ? buildMergedCompetitorSubMap(competitorData) : {}

  // Fallback: build competitor submap from live scan subreddits
  const scanCompSubMap = Object.entries(scanData.subreddits ?? {})
    .filter(([,s]) => s.competitorMentions > 0)
    .reduce((acc, [sub, s]) => {
      acc[sub.toLowerCase()] = { subreddit: sub, totalMentions: s.competitorMentions, byCompetitor: {} }
      return acc
    }, {})

  const effectiveCompSubMap = anyCompSS ? compSSSubMap : scanCompSubMap
  const rows = buildComparisonRows(brandSubMap, effectiveCompSubMap)
  const gaps         = rows.filter(r => r.category === 'gap').sort((a,b) => b.competitorMentions - a.competitorMentions)
  const battlegrounds= rows.filter(r => r.category === 'battleground').sort((a,b) => b.competitorMentions - a.competitorMentions)
  const strongholds  = rows.filter(r => r.category === 'stronghold').sort((a,b) => b.brandMentions - a.brandMentions)

  const gapThreads = (scanData.threads?.competitor ?? [])
    .filter(t => !t.mentionsBrand)
    .sort((a,b) => (b.upvotes+b.comments)-(a.upvotes+a.comments))

  const gapThreadsByCompetitor = Object.entries(scanData.threads?.competitorByName ?? {})
    .map(([name,threads]) => ({ name, threads: threads.filter(t => !t.mentionsBrand) }))
    .filter(e => e.threads.length > 0).sort((a,b) => b.threads.length - a.threads.length)

  // Topic gaps: brand SS topic clusters vs competitor thread titles
  const brandTopics = new Set((ssData?.topicClusters||[]).map(t=>(t.cluster_key||t.representative_phrase||'').toLowerCase()))
  // Also include competitor SS topic clusters
  Object.values(competitorData).forEach(({ dashboard }) => {
    ;(dashboard?.topicClusters||[]).forEach(t => {
      // (just used for gap comparison, not adding to brand topics)
    })
  })
  const competitorThreadTopics = extractTopics(scanData.threads?.competitor||[])
  const topicGaps = competitorThreadTopics.filter(
    ({phrase}) => !Array.from(brandTopics).some(bt => bt.includes(phrase)||phrase.includes(bt))
  )

  // Signals
  const signals = []
  if (anyCompSS && ssReady) {
    const brandTotal = ssData.metrics?.totalMentions || 0
    const compTotal  = Object.values(competitorData).reduce((s,d)=>(s+(d.dashboard?.metrics?.totalMentions||0)),0)
    if (compTotal > brandTotal * 1.5) signals.push({ sev:'high', title:'Competitors Dominating Mentions', desc:`Competitors have ${compTotal} total mentions vs your ${brandTotal} in Supabase history.` })
  }
  if (gaps.length > 0) signals.push({ sev:'high',    title:`${gaps.length} Untapped Communit${gaps.length!==1?'ies':'y'}`, desc:`Competitors are active in ${gaps.length} communit${gaps.length!==1?'ies':'y'} where your brand has zero ${anyCompSS?'SS historical':'scan'} presence.` })
  if (topicGaps.length > 0) signals.push({ sev:'medium', title:`${topicGaps.length} Topic Gap${topicGaps.length!==1?'s':''}`, desc:`Topics competitors discuss that you don't appear in: ${topicGaps.slice(0,3).map(t=>t.phrase).join(', ')}…` })
  if (!signals.length) signals.push({ sev:'positive', title:'No major gaps detected', desc:'Your brand presence looks strong relative to competitors.' })

  const dataSource = anyCompSS && ssReady ? 'SubredditSense history (Supabase)' : 'live scan'

  return (
    <div className="space-y-4">
      {/* Signals */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <CardTitle className="text-sm flex items-center gap-2"><AlertCircle className="h-4 w-4 text-amber-600"/>Gap Analysis</CardTitle>
            <Badge variant="outline" className="text-[10px] text-muted-foreground border-border">
              Source: {dataSource}
            </Badge>
          </div>
          <CardDescription className="text-xs mt-1">
            {anyCompSS && ssReady
              ? `Brand SS data (${ssData.metrics?.totalMentions??0} mentions, ${ssData.metrics?.activeSubreddits??0} communities) vs ${Object.keys(competitorData).length} competitor SS datasets`
              : ssPending
                ? 'Waiting for SubredditSense ingestion…'
                : 'Using live scan — run a full scan with competitors added for SS-powered analysis'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {signals.map((g,i)=>(
            <div key={i} className={`rounded-lg border px-3 py-2.5 ${g.sev==='high'?'border-rose-200 bg-rose-50 dark:bg-rose-950/20':g.sev==='medium'?'border-amber-200 bg-amber-50 dark:bg-amber-950/20':'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20'}`}>
              <p className={`text-sm font-semibold ${g.sev==='high'?'text-rose-900 dark:text-rose-300':g.sev==='medium'?'text-amber-900 dark:text-amber-300':'text-emerald-900 dark:text-emerald-300'}`}>{g.title}</p>
              <p className={`text-xs mt-0.5 ${g.sev==='high'?'text-rose-700 dark:text-rose-400':g.sev==='medium'?'text-amber-700 dark:text-amber-400':'text-emerald-700 dark:text-emerald-400'}`}>{g.desc}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Side-by-side SS totals */}
      {ssReady && anyCompSS && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary"/>SS Mention Totals — Brand vs Each Competitor</CardTitle>
            <CardDescription className="text-xs">Full historical mentions stored in Supabase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Brand bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-emerald-600">{companyName || 'Your Brand'}</span>
                <span className="text-xs text-muted-foreground">{ssData.metrics?.totalMentions ?? 0} mentions</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-2 rounded-full bg-emerald-500"
                  style={{ width: '100%' }} />
              </div>
            </div>
            {/* Competitor bars */}
            {Object.entries(competitorData).map(([name, { dashboard }]) => {
              const brandTotal = ssData.metrics?.totalMentions || 1
              const compTotal  = dashboard.metrics?.totalMentions || 0
              return (
                <div key={name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{name}</span>
                    <span className="text-xs text-muted-foreground">{compTotal} mentions</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-2 rounded-full bg-rose-500 transition-all duration-700"
                      style={{ width: `${Math.min(Math.round((compTotal/brandTotal)*100), 100)}%` }} />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* Community Map */}
      {rows.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Crosshair className="h-4 w-4 text-primary"/>Community Map
              <div className="ml-auto flex items-center gap-1.5 flex-wrap">
                {gaps.length>0        && <Badge variant="outline" className="text-[10px] text-rose-600 border-rose-200 bg-rose-50">{gaps.length} gap{gaps.length!==1?'s':''}</Badge>}
                {battlegrounds.length>0 && <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-200 bg-amber-50">{battlegrounds.length} battleground{battlegrounds.length!==1?'s':''}</Badge>}
                {strongholds.length>0  && <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-200 bg-emerald-50">{strongholds.length} stronghold{strongholds.length!==1?'s':''}</Badge>}
              </div>
            </CardTitle>
            <CardDescription className="text-xs">
              Gaps = competitor has {dataSource} mentions, brand has none ·
              Battlegrounds = both present ·
              Strongholds = brand only
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="gaps">
              <div className="px-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="gaps"          className="text-xs text-rose-600">Gaps ({gaps.length})</TabsTrigger>
                  <TabsTrigger value="battlegrounds"  className="text-xs text-amber-600">Battlegrounds ({battlegrounds.length})</TabsTrigger>
                  <TabsTrigger value="strongholds"   className="text-xs text-emerald-600">Strongholds ({strongholds.length})</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="gaps" className="mt-0 px-6 pb-4 pt-3">
                {!gaps.length ? <p className="text-xs text-muted-foreground text-center py-6">No gap communities found.</p> : (
                  <div className="divide-y divide-border">
                    {gaps.slice(0,12).map(row=>{
                      const key=`gap_${row.subreddit}`
                      const subGapThreads=gapThreads.filter(t=>t.subreddit?.toLowerCase()===row.subreddit.toLowerCase())
                      return (
                        <div key={row.subreddit} className="py-3 first:pt-0 last:pb-0">
                          <button onClick={()=>subGapThreads.length&&toggle(key)} className={`w-full flex items-center justify-between gap-2 ${subGapThreads.length?'cursor-pointer':'cursor-default'}`}>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-sm">r/{row.subreddit}</span>
                              <Badge variant="outline" className="text-[10px] text-rose-600 border-rose-200 bg-rose-50">{row.competitorMentions} competitor</Badge>
                              <Badge variant="outline" className="text-[10px] text-muted-foreground border-border">0 brand</Badge>
                              {Object.entries(row.byCompetitor).slice(0,3).map(([c,n])=>(
                                <span key={c} className="text-[10px] text-muted-foreground">{c}: {n}</span>
                              ))}
                            </div>
                            {subGapThreads.length>0&&(
                              <div className="flex items-center gap-1 shrink-0 text-xs text-primary">
                                {subGapThreads.length} thread{subGapThreads.length!==1?'s':''}
                                {expandedKeys[key]?<ChevronUp className="h-3.5 w-3.5"/>:<ChevronDown className="h-3.5 w-3.5"/>}
                              </div>
                            )}
                          </button>
                          {expandedKeys[key]&&subGapThreads.length>0&&<div className="mt-3"><ThreadCardList threads={subGapThreads.slice(0,5)} compact/></div>}
                        </div>
                      )
                    })}
                    {gaps.length>12&&<p className="text-xs text-muted-foreground pt-3">+{gaps.length-12} more</p>}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="battlegrounds" className="mt-0 px-6 pb-4 pt-3">
                {!battlegrounds.length ? <p className="text-xs text-muted-foreground text-center py-6">No shared communities.</p> : (
                  <div className="divide-y divide-border">
                    {battlegrounds.slice(0,12).map(row=>{
                      const maxB=Math.max(...battlegrounds.map(r=>r.brandMentions),1)
                      const maxC=Math.max(...battlegrounds.map(r=>r.competitorMentions),1)
                      return (
                        <div key={row.subreddit} className="py-3 first:pt-0 last:pb-0 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium text-sm">r/{row.subreddit}</span>
                            <div className="flex items-center gap-1.5">
                              <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-200 bg-emerald-50">brand {row.brandMentions}</Badge>
                              <Badge variant="outline" className="text-[10px] text-rose-600 border-rose-200 bg-rose-50">comp {row.competitorMentions}</Badge>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {[['Your brand','emerald',row.brandMentions,maxB],['Competitors','rose',row.competitorMentions,maxC]].map(([lbl,color,val,max])=>(
                              <div key={lbl} className="flex items-center gap-2">
                                <span className={`text-[10px] text-${color}-600 w-16 shrink-0`}>{lbl}</span>
                                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                  <div className={`h-1.5 rounded-full bg-${color}-500`} style={{width:`${Math.round((val/max)*100)}%`}}/>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="strongholds" className="mt-0 px-6 pb-4 pt-3">
                {!strongholds.length ? <p className="text-xs text-muted-foreground text-center py-6">No exclusive brand communities.</p> : (
                  <div className="divide-y divide-border">
                    {strongholds.slice(0,12).map(row=>(
                      <div key={row.subreddit} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-2">
                        <span className="font-medium text-sm">r/{row.subreddit}</span>
                        <div className="flex items-center gap-1.5">
                          <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-200 bg-emerald-50">{row.brandMentions} brand</Badge>
                          {row.recentBrandMentions>0&&<Badge variant="outline" className="text-[10px] text-muted-foreground">{row.recentBrandMentions} recent</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Topic Gaps */}
      {topicGaps.length>0&&(ssData?.topicClusters?.length??0)>0&&(
        <Card className="border-violet-200 dark:border-violet-900">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2"><Lightbulb className="h-4 w-4 text-violet-500"/>Topic Gaps</CardTitle>
            <CardDescription className="text-xs">Competitor topics not in your SubredditSense topic clusters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
          </CardContent>
        </Card>
      )}
    </div>
  )
}
