'use client'

import { useState } from 'react'
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
  Target, Activity, Search
} from 'lucide-react'

export default function CompetitiveSenseTab({ companyContext, companyId, userId, onDataLoaded }) {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [expandedKeys, setExpandedKeys] = useState({})

  const handleAnalyze = async () => {
    if (!companyId) {
      setError('Please save company context first before running competitor analysis.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const token = await auth.currentUser?.getIdToken?.()
      const res = await fetch('/api/threadflow/subreddit-sense-competitive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ topic: topic.trim() || null, companyId }),
      })
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}))
        throw new Error(payload?.error || `API error: ${res.status}`)
      }
      const result = await res.json()
      setData(result)
      onDataLoaded?.(result)
    } catch (err) {
      setError(err.message)
      console.error('[CompetitiveSense]', err)
    } finally {
      setLoading(false)
    }
  }

  const toggle = (key) => setExpandedKeys((p) => ({ ...p, [key]: !p[key] }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-primary" />
            Reddit Competitive Analysis
          </CardTitle>
          <CardDescription>
            Compare your brand vs competitors across Reddit. Leave blank to auto-scan using your saved context.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Optional topic (e.g. 'content marketing tools')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              disabled={loading}
              className="flex-1"
            />
            <Button onClick={handleAnalyze} disabled={loading} className="shrink-0">
              {loading
                ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Scanning…</>
                : <><Search className="h-4 w-4 mr-2" />{topic.trim() ? 'Analyze Topic' : 'Run Full Scan'}</>
              }
            </Button>
          </div>
          {!data && !loading && (
            <p className="text-xs text-muted-foreground">
              General scan uses your company name, competitors, and capabilities from your saved SERP Scout context.
            </p>
          )}
          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg border border-destructive/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {loading && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1,2,3,4].map(i => (
              <Card key={i}><CardContent className="pt-4 pb-3 space-y-2">
                <Skeleton className="h-7 w-16" /><Skeleton className="h-3 w-24" />
              </CardContent></Card>
            ))}
          </div>
          <Card><CardContent className="pt-4 space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </CardContent></Card>
        </div>
      )}

      {data && !loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Mentions', value: data.metrics?.totalMentions ?? 0, sub: 'brand + competitors', icon: MessageSquare, cls: 'text-foreground' },
              { label: 'Your Brand', value: data.metrics?.brandMentions ?? 0, sub: pct(data.metrics?.brandMentions, data.metrics?.totalMentions) + '% share', icon: TrendingUp, cls: 'text-emerald-600' },
              { label: 'Competitors', value: data.metrics?.competitorMentions ?? 0, sub: pct(data.metrics?.competitorMentions, data.metrics?.totalMentions) + '% share', icon: Users, cls: 'text-rose-600' },
              { label: 'Communities', value: data.metrics?.activeSubreddits ?? Object.keys(data.subreddits || {}).length, sub: 'active subreddits', icon: BarChart3, cls: 'text-violet-600' },
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

          <ShareBar brand={data.metrics?.brandMentions ?? 0} competitors={data.metrics?.competitorMentions ?? 0} />

          {Object.keys(data.competitorBreakdown || {}).length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-rose-500" />Competitor Mentions
                </CardTitle>
                <CardDescription className="text-xs">How often each competitor appears in analyzed threads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(data.competitorBreakdown).sort((a,b) => b[1]-a[1]).map(([name, count]) => {
                  const max = Math.max(...Object.values(data.competitorBreakdown))
                  return (
                    <div key={name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{name}</span>
                        <span className="text-xs text-muted-foreground">{count} mention{count!==1?'s':''}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-2 rounded-full bg-rose-500 transition-all duration-500" style={{ width: `${max ? Math.round((count/max)*100) : 0}%` }} />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )}

          <CommunityComparison data={data} />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />Reddit Threads
              </CardTitle>
              <CardDescription className="text-xs">All matched threads with direct links and mention context</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all">
                <div className="px-6 pb-0">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="all" className="text-xs">All ({data.threads?.all?.length ?? 0})</TabsTrigger>
                    <TabsTrigger value="brand" className="text-xs">Your Brand ({data.threads?.brand?.length ?? 0})</TabsTrigger>
                    <TabsTrigger value="comp" className="text-xs">Competitors ({data.threads?.competitor?.length ?? 0})</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="all" className="mt-0 px-6 pb-4 pt-3"><ThreadCardList threads={data.threads?.all ?? []} /></TabsContent>
                <TabsContent value="brand" className="mt-0 px-6 pb-4 pt-3"><ThreadCardList threads={data.threads?.brand ?? []} /></TabsContent>
                <TabsContent value="comp" className="mt-0 px-6 pb-4 pt-3"><ThreadCardList threads={data.threads?.competitor ?? []} /></TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {Object.keys(data.threads?.competitorByName || {}).length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-rose-500" />Threads by Competitor
                </CardTitle>
                <CardDescription className="text-xs">Every thread where each competitor is mentioned</CardDescription>
              </CardHeader>
              <CardContent className="divide-y divide-border">
                {Object.entries(data.threads.competitorByName).sort((a,b)=>b[1].length-a[1].length).map(([name,threads]) => (
                  <div key={name} className="py-4 first:pt-0 last:pb-0">
                    <button onClick={() => toggle(name)} className="w-full flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{name}</span>
                        <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50 text-xs">{threads.length} thread{threads.length!==1?'s':''}</Badge>
                      </div>
                      {expandedKeys[name] ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </button>
                    {expandedKeys[name] && <div className="mt-3"><ThreadCardList threads={threads.slice(0,10)} compact /></div>}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {Object.keys(data.subreddits || {}).length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-violet-500" />Community Breakdown
                </CardTitle>
                <CardDescription className="text-xs">Click a community to expand brand vs competitor stats</CardDescription>
              </CardHeader>
              <CardContent className="divide-y divide-border">
                {Object.entries(data.subreddits)
                  .sort((a,b)=>(b[1].brandMentions+b[1].competitorMentions)-(a[1].brandMentions+a[1].competitorMentions))
                  .map(([sub, s]) => (
                  <div key={sub} className="py-3 first:pt-0 last:pb-0">
                    <button onClick={() => toggle(`sub_${sub}`)} className="w-full flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-wrap">
                        <span className="font-medium text-sm shrink-0">r/{sub}</span>
                        {s.brandMentions > 0 && <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200 bg-emerald-50">brand: {s.brandMentions}</Badge>}
                        {s.competitorMentions > 0 && <Badge variant="outline" className="text-xs text-rose-600 border-rose-200 bg-rose-50">competitors: {s.competitorMentions}</Badge>}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{s.totalPosts} posts</span>
                    </button>
                    {expandedKeys[`sub_${sub}`] && (
                      <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { label: 'Total Posts', val: s.totalPosts, cls: 'text-foreground' },
                          { label: 'Your Brand', val: s.brandMentions, cls: 'text-emerald-600' },
                          { label: 'Competitors', val: s.competitorMentions, cls: 'text-rose-600' },
                          { label: 'Avg Engagement', val: s.avgEngagement ?? '—', cls: 'text-violet-600' },
                        ].map(({ label, val, cls }) => (
                          <div key={label} className="rounded-lg bg-muted/40 border border-border p-2.5">
                            <p className="text-xs text-muted-foreground">{label}</p>
                            <p className={`text-xl font-bold mt-0.5 ${cls}`}>{val}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <GapAnalysis data={data} />

          {data.coverage && (
            <p className="text-xs text-muted-foreground text-center">
              Analyzed {data.coverage.analyzedPosts} posts · {data.coverage.matchedPosts} matched
            </p>
          )}
        </div>
      )}

      {!data && !loading && !error && (
        <div className="flex flex-col items-center justify-center h-52 border border-dashed border-border rounded-lg text-muted-foreground gap-3">
          <Target className="h-10 w-10 opacity-20" />
          <div className="text-center text-sm">
            <p className="font-medium">No results yet</p>
            <p className="text-xs mt-1 opacity-70">Run a scan to compare your brand vs competitors on Reddit.</p>
          </div>
        </div>
      )}
    </div>
  )
}

function pct(num, total) {
  if (!total || !num) return 0
  return Math.round((num / total) * 100)
}

function ShareBar({ brand, competitors }) {
  const total = brand + competitors
  if (!total) return null
  const brandPct = Math.round((brand / total) * 100)
  const compPct = 100 - brandPct
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Mention Share — Your Brand vs. Competitors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex rounded-full overflow-hidden h-4 w-full">
          <div className="bg-emerald-500 transition-all duration-700" style={{ width: `${brandPct}%` }} />
          <div className="bg-rose-500 transition-all duration-700" style={{ width: `${compPct}%` }} />
        </div>
        <div className="flex justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span className="text-muted-foreground">Your brand</span>
            <span className="font-semibold text-emerald-600">{brandPct}% ({brand})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-rose-600">{compPct}% ({competitors})</span>
            <span className="text-muted-foreground">Competitors</span>
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-rose-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CommunityComparison({ data }) {
  const entries = Object.entries(data.subreddits || {})
  const brandOnly = entries.filter(([,s]) => s.brandMentions>0 && s.competitorMentions===0).map(([n])=>n)
  const shared    = entries.filter(([,s]) => s.brandMentions>0 && s.competitorMentions>0).map(([n])=>n)
  const compOnly  = entries.filter(([,s]) => s.competitorMentions>0 && s.brandMentions===0).map(([n])=>n)
  const topComp   = Object.entries(data.competitorBreakdown || {}).sort((a,b)=>b[1]-a[1])[0]
  const delta = (data.metrics?.competitorMentions ?? 0) - (data.metrics?.brandMentions ?? 0)
  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />Community Comparison
        </CardTitle>
        <CardDescription className="text-xs">Where your brand and competitors appear — side by side</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-3">
            <p className="text-xs font-medium text-emerald-700">Brand-only</p>
            <p className="text-2xl font-bold text-emerald-800 mt-1">{brandOnly.length}</p>
            <p className="text-xs text-emerald-700 mt-1 line-clamp-2">{brandOnly.slice(0,4).join(', ') || 'None'}</p>
          </div>
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-xs font-medium text-primary">Shared</p>
            <p className="text-2xl font-bold text-primary mt-1">{shared.length}</p>
            <p className="text-xs text-primary/80 mt-1 line-clamp-2">{shared.slice(0,4).join(', ') || 'None'}</p>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50/50 dark:bg-rose-950/20 p-3">
            <p className="text-xs font-medium text-rose-700">Competitors-only</p>
            <p className="text-2xl font-bold text-rose-800 mt-1">{compOnly.length}</p>
            <p className="text-xs text-rose-700 mt-1 line-clamp-2">{compOnly.slice(0,4).join(', ') || 'None'}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs text-muted-foreground font-medium">Mention Lead</p>
            <p className={`text-xl font-bold mt-1 ${delta>0?'text-rose-600':delta<0?'text-emerald-600':'text-foreground'}`}>
              {delta>0 ? `Competitors +${delta}` : delta<0 ? `Your brand +${Math.abs(delta)}` : 'Tied'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{data.metrics?.brandMentions??0} brand · {data.metrics?.competitorMentions??0} competitors</p>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs text-muted-foreground font-medium">Top Competitor</p>
            <p className="text-xl font-bold text-foreground mt-1 truncate">{topComp?.[0] ?? 'N/A'}</p>
            <p className="text-xs text-muted-foreground mt-1">{topComp ? `${topComp[1]} thread mention${topComp[1]!==1?'s':''}` : 'No competitor mentions found'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ThreadCardList({ threads, compact = false }) {
  if (!Array.isArray(threads) || threads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-2 text-muted-foreground">
        <MessageSquare className="h-8 w-8 opacity-20" />
        <p className="text-sm">No threads found</p>
      </div>
    )
  }
  const rows = compact ? threads.slice(0,8) : threads
  return (
    <div className="space-y-2">
      {rows.map((t, idx) => (
        <div key={`${t.url??'t'}-${idx}`} className="rounded-lg border border-border bg-card p-3 hover:bg-muted/30 transition-colors">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1 space-y-1.5">
              <p className="text-sm font-medium line-clamp-2 leading-snug">{t.title || 'Untitled thread'}</p>
              {t.mentionHighlights?.[0]?.snippet && (
                <p className="text-xs text-muted-foreground line-clamp-2 italic">“…{t.mentionHighlights[0].snippet}…”</p>
              )}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">r/{t.subreddit||'unknown'}</Badge>
                {t.mentionsBrand && <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-emerald-600 border-emerald-200 bg-emerald-50">Your brand</Badge>}
                {(t.competitors||[]).slice(0,4).map(c => (
                  <Badge key={c} variant="outline" className="text-[10px] px-1.5 py-0 text-rose-600 border-rose-200 bg-rose-50">{c}</Badge>
                ))}
                <span className="text-[10px] text-muted-foreground ml-auto">👍 {t.upvotes??0} · 💬 {t.comments??0}</span>
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
      ))}
      {compact && threads.length > 8 && (
        <p className="text-xs text-muted-foreground text-center pt-1">+{threads.length-8} more threads</p>
      )}
    </div>
  )
}

function GapAnalysis({ data }) {
  const gaps = []
  const { brandMentions=0, competitorMentions=0 } = data.metrics ?? {}
  const subE = Object.entries(data.subreddits ?? {})
  const brandSubs = subE.filter(([,s])=>s.brandMentions>0).length
  const compSubs  = subE.filter(([,s])=>s.competitorMentions>0).length

  if (competitorMentions>0 && brandMentions>0) {
    const r = competitorMentions/brandMentions
    if (r>=2) gaps.push({ sev:'high', title:'Significant Visibility Gap', desc:`Competitors are mentioned ${r.toFixed(1)}× more often. Create Reddit-native content targeting these communities.` })
    else if (r>=1.3) gaps.push({ sev:'medium', title:'Moderate Visibility Gap', desc:`Competitors appear ${r.toFixed(1)}× more often. Engaging in shared subreddits can improve brand presence.` })
  }
  if (compSubs > brandSubs+1) gaps.push({ sev:'medium', title:'Community Coverage Gap', desc:`Competitors active in ${compSubs} communities vs your brand in ${brandSubs}. ${compSubs-brandSubs} community gap.` })
  if (brandMentions>=competitorMentions && brandSubs>=compSubs && (brandMentions>0||compSubs>0))
    gaps.push({ sev:'positive', title:'Strong Brand Presence', desc:'Your brand is well-represented. Keep engaging to maintain the lead.' })
  if (!gaps.length) gaps.push({ sev:'positive', title:'No significant gaps detected', desc:'Mention volumes and community presence look balanced.' })

  return (
    <Card className="border-amber-200 dark:border-amber-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600" />Gap Analysis
        </CardTitle>
        <CardDescription className="text-xs">Competitive opportunities identified from the scan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {gaps.map((g,i) => (
          <div key={i} className={`rounded-lg border px-3 py-2.5 ${g.sev==='high'?'border-rose-200 bg-rose-50 dark:bg-rose-950/20':g.sev==='medium'?'border-amber-200 bg-amber-50 dark:bg-amber-950/20':'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20'}`}>
            <p className={`text-sm font-semibold ${g.sev==='high'?'text-rose-900 dark:text-rose-300':g.sev==='medium'?'text-amber-900 dark:text-amber-300':'text-emerald-900 dark:text-emerald-300'}`}>{g.title}</p>
            <p className={`text-xs mt-0.5 ${g.sev==='high'?'text-rose-700 dark:text-rose-400':g.sev==='medium'?'text-amber-700 dark:text-amber-400':'text-emerald-700 dark:text-emerald-400'}`}>{g.desc}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
