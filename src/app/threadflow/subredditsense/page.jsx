"use client";
import { auth } from '@/lib/firebaseClient';
import { onAuthStateChanged } from 'firebase/auth';
import { BarChart3, Link2, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from "../../../Components/ui/button";
import { SidebarTrigger } from "../../../Components/ui/sidebar";
import { UserProfile } from "../../../Components/UserProfile";
import EngagementFunnelAPI from './components/EngagementFunnelAPI';
import SubredditHeatmapAPI from './components/SubredditHeatmapAPI';
import TimeSeriesChart from './components/TimeSeriesChart';
import TopicClusters from './components/TopicClusters';
import TopThreadsTable from './components/TopThreadsTable';

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
  const res = await fetch(`/api/threadflow/reddit/dashboard?companyId=${encodeURIComponent(companyId)}`);
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
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState(null);
  const [customCompany, setCustomCompany] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [ingesting, setIngesting] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [jobId, setJobId] = useState(null); // reserved if we later display status

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
      setDashboard(dash);
      setLastUpdated(dash.lastIngestedAt || new Date().toISOString());
    } catch(e){ setError(e.message);} finally { setRefreshing(false); setIngesting(false);}
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        const defName = deriveDefaultCompany(user.email || '');
        setCompanyName(defName);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!firebaseUser || !companyName) return;
    let cancelled = false;
    (async () => {
      try {
        setError(null);
        setFetching(true);
        const link = await apiLinkCompany(firebaseUser.uid, companyName);
        if (cancelled) return;
  setCompanyId(link.company.id);
  setLastUpdated(link.company.last_ingested_at || null);
  if (link.stale) await triggerFullRefresh(link.company.id);
  const dash = await apiDashboard(link.company.id);
        if (!cancelled) {
          setDashboard(dash);
          setLastUpdated(dash.lastIngestedAt || link.company.last_ingested_at || null);
        }
      } catch (e) { if (!cancelled) setError(e.message); }
      finally { if (!cancelled) setFetching(false); }
    })();
    return () => { cancelled = true; };
  }, [firebaseUser, companyName]);

  async function handleRelink() {
    if (!customCompany.trim()) return;
    setSaving(true);
    try {
      setCompanyName(customCompany.trim());
    } finally {
      setCustomCompany('');
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;
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
            <label className="text-xs text-muted-foreground">Change / Link Brand</label>
            <input
              value={customCompany}
              onChange={e => setCustomCompany(e.target.value)}
              placeholder="Enter new company name"
              className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button disabled={saving || !customCompany.trim()} onClick={handleRelink}>
              <Link2 className="w-4 h-4 mr-1" /> {saving ? 'Linking...' : 'Link'}
            </Button>
            <Button variant="outline" disabled={fetching || refreshing || ingesting} onClick={() => { if(companyId && firebaseUser) triggerFullRefresh(companyId); }}>
              <RefreshCw className={`w-4 h-4 mr-1 ${(refreshing||ingesting)?'animate-spin':''}`} /> {refreshing||ingesting? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>
        {lastUpdated && <p className="text-[11px] text-muted-foreground">Last updated: {new Date(lastUpdated).toLocaleString()}</p>}
        {error && <div className="text-sm text-red-500">{error}</div>}
        {!dashboard && !error && <div className="text-sm text-muted-foreground">Loading dashboard...</div>}
        {dashboard && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Metric title="Total Mentions" value={dashboard.metrics.totalMentions} />
              <Metric title="Active Subreddits" value={dashboard.metrics.activeSubreddits} />
              <Metric title="Avg Engagement" value={dashboard.metrics.avgEngagement} />
              <Metric title="Positive Sentiment %" value={dashboard.metrics.positiveSentimentPct + '%'} />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <TimeSeriesChart data={dashboard.timeSeries} />
              <EngagementFunnelAPI data={dashboard.funnel} />
            </div>
            <SubredditHeatmapAPI data={dashboard.heatmap} />
            <TopThreadsTable data={dashboard.topThreads} />
            <TopicClusters data={dashboard.topicClusters || []} />
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="p-4 rounded-md border border-border bg-card">
      <p className="text-xs text-muted-foreground mb-1">{title}</p>
      <p className="text-lg font-semibold">{value ?? '—'}</p>
    </div>
  );
}

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
