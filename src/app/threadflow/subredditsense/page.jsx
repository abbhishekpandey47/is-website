"use client";
import { auth } from '@/lib/firebaseClient';
import { onAuthStateChanged } from 'firebase/auth';
import { BarChart3, RefreshCw, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from "../../../Components/ui/button";
import { SidebarTrigger } from "../../../Components/ui/sidebar";
import { UserProfile } from "../../../Components/UserProfile";
// Use original SubredditSense components for consistent UI
import TopicClusters from '@/app/threadflow/subredditsense/components/TopicClusters';
import MentionsChart from '@/app/tools/reddit-tools/components/subredditsense/MentionsChart';
import MetricCard from '@/app/tools/reddit-tools/components/subredditsense/MetricCard';
import SubredditHeatmap from '@/app/tools/reddit-tools/components/subredditsense/SubredditHeatmap';
import TopThreadsTable from '@/app/tools/reddit-tools/components/subredditsense/TopThreadsTable';
import { getCache, setCache } from '@/lib/cacheClient';
import { Eye, MessageSquare, TrendingUp, Users } from 'lucide-react';

async function apiLinkCompany(firebaseUserId, companyName) {
  const res = await fetch('/api/threadflow/reddit/link-company', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ firebaseUserId, companyName }) });
  if (!res.ok) throw new Error('Link company failed');
  return res.json();
}
async function apiFetchFull(firebaseUserId, companyId, companyName) {
  const res = await fetch('/api/threadflow/reddit/fetch', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ firebaseUserId, companyId, companyName, fullRefresh: true, maxBatches: 5 }) });
  if (!res.ok) throw new Error('Refresh failed');
  return res.json();
}
async function apiJob(jobId){
  const res = await fetch(`/api/threadflow/reddit/job?id=${encodeURIComponent(jobId)}`);
  if(!res.ok) throw new Error('Job poll failed');
  return res.json();
}
async function apiDashboard(companyId) {
  const res = await fetch(`/api/threadflow/reddit/dashboard?companyId=${encodeURIComponent(companyId)}&legacy=1&range=all`);
  if (!res.ok) throw new Error('Dashboard fetch failed');
  return res.json();
}

function deriveDefaultCompany(email) {
  if (!email) return '';
  const domain = email.split('@')[1] || '';
  // ignore common free domains
  const free = ['gmail.com','yahoo.com','outlook.com','hotmail.com','proton.me'];
  if (!domain || free.includes(domain)) return '';
  const base = domain.split('.')[0];
  return base.charAt(0).toUpperCase() + base.slice(1);
}

export default function ThreadflowSubredditSensePage() {
  // Synchronous pre-hydration (client only) to eliminate initial flicker
  const initialUser = typeof window !== 'undefined' ? auth.currentUser : null;
  let initialCompanyName = '';
  let initialDashboard = null;
  let initialLastUpdated = null;
  if (typeof window !== 'undefined' && initialUser) {
    try {
      const stored = localStorage.getItem(`lastSelectedBrand_${initialUser.uid}`);
      if (stored && stored.trim()) {
        initialCompanyName = stored.trim();
      } else if (initialUser.email) {
        initialCompanyName = deriveDefaultCompany(initialUser.email);
      }
      if (initialCompanyName) {
        const cached = getCache(`dash_${initialUser.uid}_${initialCompanyName}`, 'local');
        if (cached?.data) {
          initialDashboard = cached.data;
          initialLastUpdated = cached.lastUpdated || null;
        }
      }
    } catch {}
  }
  const [firebaseUser, setFirebaseUser] = useState(initialUser);
  const [companyName, setCompanyName] = useState(initialCompanyName);
  const [companyId, setCompanyId] = useState(null);
  const [customCompany, setCustomCompany] = useState('');
  const [loading, setLoading] = useState(!initialUser);
  const [saving, setSaving] = useState(false);
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [fetching, setFetching] = useState(false);
  const [ingesting, setIngesting] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(initialLastUpdated);
  const [refreshing, setRefreshing] = useState(false);
  const [jobId, setJobId] = useState(null); // reserved if we later display status
  const [updatedFields, setUpdatedFields] = useState(new Set());
  const [hadInitialData, setHadInitialData] = useState(!!dashboard);
  const friendlyError = error ? (() => {
    if (/fetch failed|failed/i.test(error) && !dashboard) return 'Service temporarily unreachable. Please retry shortly.';
    if (/not.?found|404/i.test(error)) return 'No data found for this brand yet.';
    if (/link company failed/i.test(error)) return 'Could not link this brand. Try a simpler brand name.';
    return error;
  })() : null;

  const triggerFullRefresh = async (cid) => {
    if(!firebaseUser || !cid) return;
    setError(null);
    setRefreshing(true);
    try {
      const resp = await apiFetchFull(firebaseUser.uid, cid, companyName || '');
      if(resp.jobId){
        setJobId(resp.jobId);
        await pollJobUntilDone(resp.jobId, (status)=>{
          if(status==='success') setIngesting(false); else if(status==='running') setIngesting(true);
        });
      }
      const dash = await apiDashboard(cid);
  applyDashboardUpdate(dash);
      setLastUpdated(dash.lastIngestedAt || new Date().toISOString());
      if (firebaseUser) setCache(`dash_${firebaseUser.uid}_${companyName}`, { data: dash, lastUpdated: dash.lastIngestedAt }, 5*60*1000, 'local');
    } catch(e){ setError(e.message);} finally { setRefreshing(false); setIngesting(false);}
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        // Only adjust company if we don't already have one
        if (!companyName) {
          try {
            const stored = typeof window !== 'undefined' ? localStorage.getItem(`lastSelectedBrand_${user.uid}`) : null;
            if (stored && stored.trim()) {
              setCompanyName(stored.trim());
            } else {
              const defName = deriveDefaultCompany(user.email || '');
              setCompanyName(defName);
            }
          } catch {
            const defName = deriveDefaultCompany(user.email || '');
            setCompanyName(defName);
          }
        }
      }
      setLoading(false);
    });
    return () => unsub();
  }, [companyName]);

  useEffect(() => {
    if (!firebaseUser || !companyName) return;
    let cancelled = false;
    const cacheKey = `dash_${firebaseUser.uid}_${companyName}`;
    const hasPrefilled = !!dashboard; // from initial cache hydration
    (async () => {
      try {
        setError(null);
        if (!hasPrefilled) setFetching(true);
        // Only re-read cache if not prefilled
        if (!hasPrefilled) {
          const cached = getCache(cacheKey, 'local');
          if (cached?.data) {
            setDashboard(cached.data);
            setLastUpdated(cached.lastUpdated || null);
          }
        }
        const link = await apiLinkCompany(firebaseUser.uid, companyName);
        if (cancelled) return;
        setCompanyId(link.company.id);
        setLastUpdated(link.company.last_ingested_at || null);
        if (link.stale) await triggerFullRefresh(link.company.id);
        const dash = await apiDashboard(link.company.id);
        if (!cancelled) {
          applyDashboardUpdate(dash);
          setLastUpdated(dash.lastIngestedAt || link.company.last_ingested_at || null);
          setCache(cacheKey, { data: dash, lastUpdated: dash.lastIngestedAt }, 5*60*1000, 'local');
        }
      } catch (e) { if (!cancelled) setError(e.message); }
      finally { if (!cancelled) setFetching(false); }
    })();
    return () => { cancelled = true; };
  }, [firebaseUser, companyName]);

  function applyDashboardUpdate(nextDash){
    setHadInitialData(true);
    setDashboard(prev => {
      if (!prev) return nextDash;
      try {
        const changed = new Set();
        const prevMetrics = prev.metrics || {};
        const nextMetrics = nextDash.metrics || {};
        Object.keys(nextMetrics).forEach(k => {
          if (prevMetrics[k] !== nextMetrics[k]) changed.add(k);
        });
        if (changed.size) {
          setUpdatedFields(changed);
          // Clear highlights after short delay
          setTimeout(() => {
            setUpdatedFields(current => {
              const clone = new Set(current);
              changed.forEach(c => clone.delete(c));
              return clone;
            });
          }, 1500);
        }
      } catch {}
      return nextDash;
    });
  }

  async function handleRelink() {
    if (!customCompany.trim()) return;
    setSaving(true);
    try {
      const newName = customCompany.trim();
      setCompanyName(newName);
      // Persist user preference locally (session-level persistence)
      try { if (firebaseUser) localStorage.setItem(`lastSelectedBrand_${firebaseUser.uid}`, newName); } catch {}
    } finally {
      setCustomCompany('');
      setSaving(false);
    }
  }

  if (loading && !dashboard) return <div className="p-6">Loading...</div>;
  if (!firebaseUser) return <div className="p-6">Please sign in.</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-8 w-8" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SubredditSense</h1>
                <p className="text-sm text-muted-foreground">Reddit intelligence for your brand</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserProfile />
          </div>
        </div>
      </header>
      <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Active Brand</p>
            <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">{companyName || 'Not Set'}</span>
        {fetching && <span className="text-xs text-muted-foreground">(loading)</span>}
        {ingesting && <span className="text-xs text-primary">(ingesting)</span>}
            </div>
          </div>
          <div className="flex-1 max-w-sm">
            <label className="text-xs text-muted-foreground">Brand to Track</label>
            <input
              value={customCompany}
              onChange={e => setCustomCompany(e.target.value)}
              placeholder="Enter brand name (e.g. Infrasity)"
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button disabled={saving || !customCompany.trim()} onClick={handleRelink}>
              <Search className="w-4 h-4 mr-1" /> {saving ? 'Searching...' : 'Search Mentions'}
            </Button>
            <Button variant="outline" disabled={fetching || refreshing || ingesting} onClick={() => { if(companyId && firebaseUser) triggerFullRefresh(companyId); }}>
              <RefreshCw className={`w-4 h-4 mr-1 ${(refreshing||ingesting)?'animate-spin':''}`} /> {refreshing||ingesting? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap text-[11px] text-muted-foreground">
          {lastUpdated && <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>}
          {dashboard && (refreshing || (fetching && !refreshing)) && (
            <span className="flex items-center gap-1 text-xs text-primary">
              <span className="inline-block w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              {refreshing ? 'Refreshing data…' : 'Updating…'}
            </span>
          )}
        </div>
  {friendlyError && <div className="text-sm text-red-500">{friendlyError}</div>}
  {!dashboard && !friendlyError && (
          <div className="space-y-8" aria-label="dashboard-skeleton">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({length:4}).map((_,i)=>(<div key={i} className="h-24 rounded-md bg-muted/40 animate-pulse" />))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="h-64 rounded-md bg-muted/40 animate-pulse" />
                <div className="h-64 rounded-md bg-muted/40 animate-pulse" />
              </div>
              <div className="h-[540px] rounded-md bg-muted/40 animate-pulse" />
            </div>
            <div className="h-72 rounded-md bg-muted/40 animate-pulse" />
          </div>
        )}
        {dashboard && dashboard.metrics && dashboard.metrics.totalMentions === 0 && !refreshing && !fetching && (
          <div className="max-w-3xl mx-auto text-center py-20 flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold">No Reddit presence detected yet</h2>
            <p className="text-sm text-muted-foreground max-w-md">We couldn't find recent mentions or threads for <span className="font-medium">{companyName}</span>. You can refresh, adjust the brand name, or check back later.</p>
            <div className="flex gap-3">
              <Button variant="outline" disabled={refreshing || ingesting} onClick={() => companyId && triggerFullRefresh(companyId)}>
                <RefreshCw className={`w-4 h-4 mr-1 ${refreshing? 'animate-spin':''}`} /> {refreshing ? 'Refreshing...' : 'Force Refresh'}
              </Button>
              <Button disabled={saving || !customCompany.trim()} onClick={handleRelink}>
                <Search className="w-4 h-4 mr-1" /> Track Different Brand
              </Button>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 mt-4 text-left list-disc list-inside max-w-sm">
              <li>Use the common brand name (avoid legal suffixes).</li>
              <li>Give new mentions a few minutes to ingest.</li>
              <li>Try a manual refresh after updating the name.</li>
            </ul>
          </div>
        )}
        {dashboard && dashboard.metrics && dashboard.metrics.totalMentions > 0 && (
          <div className="max-w-7xl mx-auto space-y-10">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className={`transition-colors ${updatedFields.has('totalMentions') ? 'flash-update' : ''}`}>
                <MetricCard title="Total Mentions" value={dashboard.metrics.totalMentions} icon={MessageSquare} subtitle={dashboard.meta ? `All Time (${dashboard.meta.spanDays} days)` : 'All Time'} />
              </div>
              <div className={updatedFields.has('activeSubreddits') ? 'flash-update' : ''}>
                <MetricCard title="Active Subreddits" value={dashboard.metrics.activeSubreddits} icon={Users} subtitle="Communities" />
              </div>
              <div className={updatedFields.has('avgEngagement') ? 'flash-update' : ''}>
                <MetricCard title="Avg Engagement" value={dashboard.metrics.avgEngagement} icon={TrendingUp} subtitle="Upvotes + Comments" />
              </div>
              <div className={updatedFields.has('positiveSentimentPct') ? 'flash-update' : ''}>
                <MetricCard title="Positive Sentiment" value={dashboard.metrics.positiveSentimentPct + '%'} icon={Eye} subtitle={dashboard.metrics.estUpVotes !== undefined ? `${dashboard.metrics.estUpVotes}↑ / ${dashboard.metrics.estDownVotes}↓ (est)` : 'Score Ratio'} />
              </div>
            </div>
            {/* Charts + Topic Clusters inline layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-8">
                <MentionsChart data={{ posts: dashboard.posts || [], comments: dashboard.comments || [] }} />
                <TopicClusters data={dashboard.topicClusters || []} />
              </div>
              <SubredditHeatmap data={{ posts: dashboard.posts || [], comments: dashboard.comments || [] }} />
            </div>
            {/* Top Threads Leaderboard (use API-provided ranking) */}
            <TopThreadsTable threads={(dashboard.topThreads || []).map((t,i)=>(
              { id: i,
                title: t.title,
                subreddit: t.subreddit,
                author: t.author || '',
                karma: null,
                upvotes: t.upvotes,
                comments: t.comments,
                age: '',
                matchReason: '',
                sentiment: (t.upvotes > (t.downvotes||0)) ? 'positive' : (t.upvotes < (t.downvotes||0) ? 'negative' : 'neutral'),
                priority: (t.upvotes + t.comments) > 10 ? 'high' : 'medium',
                post_url: t.url
              }))} />
          </div>
        )}
      </div>
    </div>
  );
}

// Retained legacy MetricCard styling; inline simple component removed in favor of imported MetricCard.

async function pollJobUntilDone(jobId, onStatus, timeoutMs=60000, intervalMs=1500){
  const started = Date.now();
  while (Date.now() - started < timeoutMs){
    try {
      const res = await fetch(`/api/threadflow/reddit/job?id=${encodeURIComponent(jobId)}`);
      if(!res.ok) break;
      const json = await res.json();
      const status = json.job?.status;
      onStatus?.(status);
      if(status==='success' || status==='error') return status;
    } catch {}
    await new Promise(r=>setTimeout(r, intervalMs));
  }
  return 'timeout';
}

// Hook-scope helper must be below component definition in same file – define above usage via hoist.
async function triggerFullRefresh(companyId){
  // This relies on closure state inside component; we'll attach via window temp if needed replaced in component.
}
