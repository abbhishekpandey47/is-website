"use client";
import { auth } from '@/lib/firebaseClient';
import { onAuthStateChanged } from 'firebase/auth';
import { BarChart3, RefreshCw, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SidebarTrigger } from "../../../Components/ui/sidebar";
import { UserProfile } from "../../../Components/UserProfile";
import Pagination from '@/app/threadflow/components/pagination';
import AllThreadsTable from '@/app/threadflow/subredditsense/components/AllThreadsTable';
import TopicClusters from '@/app/threadflow/subredditsense/components/TopicClusters';
import TimeSeriesChart from '@/app/threadflow/subredditsense/components/TimeSeriesChart';
import SubredditHeatmapAPI from '@/app/threadflow/subredditsense/components/SubredditHeatmapAPI';
import EngagementFunnelAPI from '@/app/threadflow/subredditsense/components/EngagementFunnelAPI';
import TopThreadsTable from '@/app/threadflow/subredditsense/components/TopThreadsTable';
import { getCache, setCache } from '@/lib/cacheClient';
import { Eye, MessageSquare, TrendingUp, Users } from 'lucide-react';

// Lightweight per-session in-memory cache (persists while tab remains open)
// Avoids re-fetching when user navigates away & back within TTL.
// Structure: Map<cacheKey, { data, companyId, lastUpdated, fetchedAt, expires }>
const memDashCache = typeof window !== 'undefined'
  ? (window.__TF_DASH_CACHE__ ||= new Map())
  : new Map();

async function apiLinkCompany(firebaseUserId, companyName) {
  const token = await auth.currentUser?.getIdToken?.();
  const res = await fetch('/api/threadflow/reddit/link-company', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ companyName }) });
  if (!res.ok) throw new Error('Link company failed');
  return res.json();
}
async function apiFetchFull(firebaseUserId, companyId, companyName) {
  const token = await auth.currentUser?.getIdToken?.();
  const res = await fetch('/api/threadflow/reddit/fetch', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ companyId, companyName, fullRefresh: false, maxBatches: 1 }) });
  if (!res.ok) {
    let msg = 'Refresh failed';
    try { msg = (await res.text()) || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}
async function apiJob(jobId){
  const token = await auth.currentUser?.getIdToken?.();
  const res = await fetch(`/api/threadflow/reddit/job?id=${encodeURIComponent(jobId)}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  if(!res.ok) throw new Error('Job poll failed');
  return res.json();
}
async function apiDashboard(companyId, page = 1, pageSize = 25) {
  const token = await auth.currentUser?.getIdToken?.();
  const res = await fetch(`/api/threadflow/reddit/dashboard?companyId=${encodeURIComponent(companyId)}&legacy=1&range=365&page=${page}&pageSize=${pageSize}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  if (!res.ok) throw new Error('Dashboard fetch failed');
  return res.json();
}

function deriveDefaultCompany(email) {
  if (!email) return '';
  const domain = email.split('@')[1] || '';
  const free = ['gmail.com','yahoo.com','outlook.com','hotmail.com','proton.me'];
  if (!domain || free.includes(domain)) return '';
  const base = domain.split('.')[0];
  return base.charAt(0).toUpperCase() + base.slice(1);
}

/* ---------- Inline MetricCard (design-system aligned) ---------- */
function MetricCardInline({ title, value, icon: Icon, subtitle, accentColor = '#60a5fa' }) {
  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 flex flex-col gap-3 hover:border-[rgba(255,255,255,0.12)] transition-colors">
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}1a` }}
        >
          <Icon className="w-[18px] h-[18px]" style={{ color: accentColor }} />
        </div>
      </div>
      <div>
        <p className="text-[12px] uppercase tracking-[0.04em] text-[rgba(255,255,255,0.25)] mb-1">{title}</p>
        <p className="text-[28px] font-semibold tracking-[-0.02em] tabular-nums text-[#ededed]">
          {value !== '' && value !== undefined ? (value.toLocaleString ? value.toLocaleString() : value) : <span className="text-[rgba(255,255,255,0.25)]">&mdash;</span>}
        </p>
        {subtitle && (
          <p className="text-[12px] text-[rgba(255,255,255,0.4)] mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

/* ---------- Inline MentionsChart (design-system aligned) ---------- */
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function aggregateMentions(posts = [], comments = []) {
  const map = {};
  posts.forEach(p => {
    const d = new Date(Date.now() - (p.post_age_hours || 0) * 3600 * 1000);
    const date = d.toISOString().slice(0, 10);
    if (!map[date]) map[date] = { date, mentions: 0, comments: 0, posts: 0 };
    map[date].posts += 1;
    map[date].mentions += 1;
  });
  comments.forEach(c => {
    const d = new Date(Date.now() - (c.post_age_hours || 0) * 3600 * 1000);
    const date = d.toISOString().slice(0, 10);
    if (!map[date]) map[date] = { date, mentions: 0, comments: 0, posts: 0 };
    map[date].comments += 1;
    map[date].mentions += 1;
  });
  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
}

function MentionsChartInline({ data }) {
  let chartData = [];
  if (data && data.posts && data.comments) {
    chartData = aggregateMentions(data.posts, data.comments);
  }
  if (!chartData.length) {
    return (
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5">
        <p className="text-[13px] text-[rgba(255,255,255,0.4)]">No mentions data yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[16px] font-semibold text-[#ededed] mb-0.5">Mentions Over Time</h2>
          <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Daily mentions with trend</p>
        </div>
        <div className="flex items-center gap-4 text-[12px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#60a5fa' }} />
            <span className="text-[rgba(255,255,255,0.4)]">Total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#9382ff' }} />
            <span className="text-[rgba(255,255,255,0.4)]">Posts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#34d399' }} />
            <span className="text-[rgba(255,255,255,0.4)]">Comments</span>
          </div>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="gradMentionsDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gradPostsDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9382ff" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#9382ff" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gradCommentsDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.25)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} fontSize={11} />
            <YAxis stroke="rgba(255,255,255,0.25)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} fontSize={11} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#141414',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '7px',
                color: '#ededed',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                fontSize: '12px',
              }}
            />
            <Area type="monotone" dataKey="mentions" stroke="#60a5fa" fill="url(#gradMentionsDark)" strokeWidth={2} />
            <Area type="monotone" dataKey="posts" stroke="#9382ff" fill="url(#gradPostsDark)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="comments" stroke="#34d399" fill="url(#gradCommentsDark)" strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------- Inline SubredditHeatmap (design-system aligned) ---------- */
import { useMemo } from 'react';

function buildBuckets(maxAgeDays) {
  if (maxAgeDays <= 14) {
    const days = Math.min(14, Math.floor(maxAgeDays) + 1);
    return Array.from({ length: days }, (_, i) => ({ key: `d_${i}`, from: i, to: i, label: i === 0 ? 'Today' : `${i}d ago` }));
  }
  if (maxAgeDays <= 60) {
    const bands = [[0, 7, 'Last 7d'], [8, 14, '8-14d'], [15, 30, '15-30d'], [31, 60, '31-60d']];
    return bands.filter(b => b[0] <= maxAgeDays).map(([from, to, label]) => ({ key: `${from}_${to}`, from, to, label }));
  }
  if (maxAgeDays <= 180) {
    const bands = [[0, 7, 'Last 7d'], [8, 30, '8-30d'], [31, 60, '31-60d'], [61, 90, '61-90d'], [91, 180, '91-180d']];
    return bands.filter(b => b[0] <= maxAgeDays).map(([from, to, label]) => ({ key: `${from}_${to}`, from, to, label }));
  }
  const bands = [[0, 7, 'Last 7d'], [8, 30, '8-30d'], [31, 90, '31-90d'], [91, 180, '91-180d'], [181, 365, '181-365d'], [366, 9999, '>365d']];
  return bands.filter(b => b[0] <= maxAgeDays).map(([from, to, label]) => ({ key: `${from}_${to}`, from, to, label }));
}

function normalizeHeatmapData(posts = [], comments = []) {
  const all = [...posts, ...comments].filter(i => i && i.subreddit);
  if (!all.length) return { buckets: [], rows: [], maxValue: 0 };
  all.forEach(i => { i.__ageDays = i.post_age_hours != null ? Math.floor(i.post_age_hours / 24) : 0; });
  const maxAge = Math.max(...all.map(i => i.__ageDays));
  let buckets = buildBuckets(maxAge);
  const subs = Array.from(new Set(all.map(i => i.subreddit)));
  const rows = subs.map(sub => {
    const items = all.filter(i => i.subreddit === sub);
    const bucketMap = new Map();
    buckets.forEach(b => bucketMap.set(b.key, { value: 0, engagement: 0 }));
    buckets.forEach(b => {
      const bItems = items.filter(it => it.__ageDays >= b.from && it.__ageDays <= b.to);
      if (bItems.length) {
        const totalEng = bItems.reduce((acc, it) => acc + (it.upvotes || 0) + (it.total_comments || 0), 0);
        bucketMap.set(b.key, { value: bItems.length, engagement: Math.round(totalEng / bItems.length) });
      }
    });
    const totalMentions = items.length;
    return { subreddit: sub, totalMentions, buckets: bucketMap };
  });
  rows.sort((a, b) => b.totalMentions - a.totalMentions);
  const colTotals = buckets.map(b => rows.reduce((sum, r) => sum + (r.buckets.get(b.key)?.value || 0), 0));
  const pruned = buckets.filter((b, idx) => idx === 0 || colTotals[idx] > 0);
  buckets = pruned;
  const maxValue = Math.max(1, ...rows.flatMap(r => buckets.map(b => r.buckets.get(b.key)?.value || 0)));
  return { buckets, rows, maxValue };
}

const heatPalette = ['rgba(96,165,250,0.15)', 'rgba(96,165,250,0.3)', 'rgba(96,165,250,0.5)', 'rgba(96,165,250,0.7)', 'rgba(96,165,250,0.9)'];
function heatColorFor(value, maxValue) {
  if (value <= 0) return 'transparent';
  const ratio = Math.sqrt(value / maxValue);
  const idx = Math.min(heatPalette.length - 1, Math.floor(ratio * (heatPalette.length - 1 + 1e-6)));
  return heatPalette[idx];
}

function SubredditHeatmapInline({ data }) {
  const posts = (data && Array.isArray(data.posts)) ? data.posts : [];
  const comments = (data && Array.isArray(data.comments)) ? data.comments : [];
  const { buckets, rows, maxValue } = useMemo(() => normalizeHeatmapData(posts, comments), [posts, comments]);
  const [showAll, setShowAll] = useState(false);
  const visibleRows = showAll ? rows : rows.slice(0, 12);

  if (!rows.length) {
    return (
      <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 animate-fade-up">
        <h2 className="text-[16px] font-semibold text-[#ededed] mb-1">Subreddit Activity Heatmap</h2>
        <p className="text-[13px] text-[rgba(255,255,255,0.4)] mb-4">No activity yet to visualize.</p>
        <p className="text-[12px] text-[rgba(255,255,255,0.25)]">Once mentions are ingested you will see intensity by recency bands here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[16px] font-semibold text-[#ededed] mb-0.5">Subreddit Activity Heatmap</h2>
          <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Mention volume across top communities (newest left)</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[rgba(255,255,255,0.4)]">
          <span>Low</span>
          <div className="flex gap-0.5">
            {heatPalette.map(c => (
              <div key={c} className="w-3 h-3 rounded-sm border border-[rgba(255,255,255,0.06)]" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span>High</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="flex mb-2">
            <div className="w-40" />
            {buckets.map(b => (
              <div key={b.key} className="flex-1 text-center text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.4)] font-medium px-1">
                {b.label}
              </div>
            ))}
          </div>
          {visibleRows.map(r => (
            <div key={r.subreddit} className="flex items-center mb-1">
              <div className="w-40 text-[13px] text-[rgba(255,255,255,0.6)] font-medium truncate pr-3" title={r.subreddit}>{r.subreddit}</div>
              <div className="flex flex-1 gap-1">
                {buckets.map(b => {
                  const cell = r.buckets.get(b.key) || { value: 0, engagement: 0 };
                  const bg = heatColorFor(cell.value, maxValue);
                  return (
                    <div
                      key={b.key}
                      aria-label={`${r.subreddit} ${b.label}: ${cell.value} mentions, avg engagement ${cell.engagement}`}
                      title={`${r.subreddit} - ${b.label}: ${cell.value} mentions, avg engagement ${cell.engagement}`}
                      className={`flex-1 h-7 rounded-[5px] border border-[rgba(255,255,255,0.04)] relative flex items-center justify-center text-[10px] font-semibold transition-all duration-150 ${cell.value ? 'cursor-pointer hover:scale-105' : ''}`}
                      style={{ backgroundColor: bg, color: cell.value > 0 ? '#ededed' : 'transparent' }}
                    >
                      {cell.value > 0 ? cell.value : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {rows.length > 12 && (
        <button
          onClick={() => setShowAll(s => !s)}
          className="mt-4 text-[12px] text-[#60a5fa] hover:underline"
        >
          {showAll ? 'Show Top 12' : `Show All (${rows.length})`}
        </button>
      )}
    </div>
  );
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
        const memKey = `dash_${initialUser.uid}_${initialCompanyName}`;
        const memEntry = memDashCache.get(memKey);
        if (memEntry && memEntry.expires > Date.now()) {
          initialDashboard = memEntry.data;
          initialLastUpdated = memEntry.lastUpdated || null;
        } else {
          const cached = getCache(memKey, 'local');
            if (cached?.data) {
              initialDashboard = cached.data;
              initialLastUpdated = cached.lastUpdated || null;
            }
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
  const [jobId, setJobId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState(new Set());
  const [hadInitialData, setHadInitialData] = useState(!!dashboard);
  const initResolvedRef = useRef(false);
  const userOverrideRef = useRef(false);
  const bgIngestingRef = useRef(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const friendlyError = error ? (() => {
    if (dashboard && dashboard.metrics && dashboard.metrics.totalMentions === 0) return null;
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
  const dash = await apiDashboard(cid, page, pageSize);
  applyDashboardUpdate(dash);
      setLastUpdated(dash.lastIngestedAt || new Date().toISOString());
      if (firebaseUser) {
        const key = `dash_${firebaseUser.uid}_${companyName}`;
        setCache(key, { data: dash, lastUpdated: dash.lastIngestedAt }, 5*60*1000, 'local');
        memDashCache.set(key, { data: dash, companyId: cid, lastUpdated: dash.lastIngestedAt, fetchedAt: Date.now(), expires: Date.now() + 5*60*1000 });
      }
    } catch(e){
      if (dashboard) setError(e.message);
    } finally { setRefreshing(false); setIngesting(false);}
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user && !initResolvedRef.current && !userOverrideRef.current) {
        (async () => {
          try {
            const stored = typeof window !== 'undefined' ? localStorage.getItem(`lastSelectedBrand_${user.uid}`) : null;
            if (stored && stored.trim()) {
              setCompanyName(stored.trim());
              initResolvedRef.current = true;
              return;
            }
            const t = await user.getIdToken();
            const res = await fetch('/api/threadflow/reddit/my-companies', { headers: { Authorization: `Bearer ${t}` } });
            if (res.ok) {
              const j = await res.json();
              const first = j.companies?.[0];
              if (first?.name) {
                setCompanyName(first.name);
                try { localStorage.setItem(`lastSelectedBrand_${user.uid}`, first.name); } catch {}
                initResolvedRef.current = true;
                return;
              }
            }
            const derived = deriveDefaultCompany(user.email || '');
            if (derived) {
              setCompanyName(derived);
              initResolvedRef.current = true;
              return;
            }
          } catch {}
          initResolvedRef.current = true;
        })();
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!firebaseUser || !companyName) return;
    let cancelled = false;
    const cacheKey = `dash_${firebaseUser.uid}_${companyName}`;
    const hasPrefilled = !!dashboard;
    if (!hasPrefilled) {
      const memEntry = memDashCache.get(cacheKey);
      if (memEntry && memEntry.expires > Date.now()) {
        setCompanyId(memEntry.companyId || null);
        setDashboard(memEntry.data);
        setLastUpdated(memEntry.lastUpdated || null);
        if (Date.now() - memEntry.fetchedAt > 2.5 * 60 * 1000) {
          (async () => {
            try {
              const link = await apiLinkCompany(firebaseUser.uid, companyName);
              if (cancelled) return;
              const dashFresh = await apiDashboard(link.company.id, page, pageSize);
              if (cancelled) return;
              applyDashboardUpdate(dashFresh);
              setLastUpdated(dashFresh.lastIngestedAt || link.company.last_ingested_at || null);
              setCache(cacheKey, { data: dashFresh, lastUpdated: dashFresh.lastIngestedAt }, 5*60*1000, 'local');
              memDashCache.set(cacheKey, { data: dashFresh, companyId: link.company.id, lastUpdated: dashFresh.lastIngestedAt, fetchedAt: Date.now(), expires: Date.now() + 5*60*1000 });
            } catch {}
          })();
        }
        return () => { cancelled = true; };
      }
    }
    (async () => {
      try {
        setError(null);
        if (!hasPrefilled) setFetching(true);
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
  const dash = await apiDashboard(link.company.id, page, pageSize);
        if (!cancelled) {
          applyDashboardUpdate(dash);
          setLastUpdated(dash.lastIngestedAt || link.company.last_ingested_at || null);
          setCache(cacheKey, { data: dash, lastUpdated: dash.lastIngestedAt }, 5*60*1000, 'local');
          memDashCache.set(cacheKey, { data: dash, companyId: link.company.id, lastUpdated: dash.lastIngestedAt, fetchedAt: Date.now(), expires: Date.now() + 5*60*1000 });
        }
        const isEmpty = !dash?.metrics || (dash.metrics.totalMentions || 0) === 0;
        if ((link.stale || isEmpty) && !bgIngestingRef.current && !cancelled) {
          bgIngestingRef.current = true;
          setIngesting(true);
          try {
            for (let i = 0; i < 3; i++) {
              if (cancelled) break;
              const resp = await apiFetchFull(firebaseUser.uid, link.company.id, companyName || '');
              const added = (resp?.added?.posts || 0) + (resp?.added?.comments || 0);
              const dashFresh = await apiDashboard(link.company.id, page, pageSize);
              if (cancelled) break;
              applyDashboardUpdate(dashFresh);
              setLastUpdated(dashFresh.lastIngestedAt || link.company.last_ingested_at || null);
              setCache(cacheKey, { data: dashFresh, lastUpdated: dashFresh.lastIngestedAt }, 5*60*1000, 'local');
              memDashCache.set(cacheKey, { data: dashFresh, companyId: link.company.id, lastUpdated: dashFresh.lastIngestedAt, fetchedAt: Date.now(), expires: Date.now() + 5*60*1000 });
              if (!added) break;
              await new Promise(r => setTimeout(r, 800));
            }
          } catch (e) {
            if (!dashboard) setError(e.message || 'Background update failed');
          } finally {
            bgIngestingRef.current = false;
            setIngesting(false);
          }
        }
      } catch (e) { if (!cancelled) setError(e.message); }
      finally { if (!cancelled) setFetching(false); }
    })();
    return () => { cancelled = true; };
  }, [firebaseUser, companyName]);

  useEffect(() => {
    if (!firebaseUser || !companyId) return;
    let cancelled = false;
    (async () => {
      try {
        const dash = await apiDashboard(companyId, page, pageSize);
        if (!cancelled) applyDashboardUpdate(dash);
      } catch (e) { if (!cancelled) setError(e.message); }
    })();
    return () => { cancelled = true; };
  }, [page, pageSize, companyId, firebaseUser]);

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
      userOverrideRef.current = true;
      try { if (firebaseUser) localStorage.setItem(`lastSelectedBrand_${firebaseUser.uid}`, newName); } catch {}
    } finally {
      setCustomCompany('');
      setSaving(false);
    }
  }

  if (loading && !dashboard) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><p className="text-[13px] text-[rgba(255,255,255,0.4)] font-geist">Loading...</p></div>;
  if (!firebaseUser) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><p className="text-[13px] text-[rgba(255,255,255,0.4)] font-geist">Please sign in.</p></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-geist flex flex-col">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-7 w-7 text-[rgba(255,255,255,0.4)] hover:text-[#ededed]" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(96,165,250,0.1)' }}>
                <BarChart3 className="h-[18px] w-[18px] text-[#60a5fa]" />
              </div>
              <div>
                <h1 className="text-[16px] font-semibold text-[#ededed]">SubredditSense</h1>
                <p className="text-[12px] text-[rgba(255,255,255,0.4)]">Reddit intelligence for your brand</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserProfile />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Brand Controls */}
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.25)] mb-1">Active Brand</p>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-semibold text-[#ededed]">{companyName || 'Not Set'}</span>
              {fetching && <span className="text-[11px] text-[rgba(255,255,255,0.4)]">(loading)</span>}
              {ingesting && <span className="text-[11px] text-[#60a5fa]">(ingesting)</span>}
            </div>
          </div>
          <div className="flex-1 max-w-sm">
            <label className="text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.25)]">Brand to Track</label>
            <input
              value={customCompany}
              onChange={e => setCustomCompany(e.target.value)}
              placeholder="Enter brand name (e.g. Infrasity)"
              className="mt-1 w-full h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-[7px] px-3 text-[#ededed] placeholder:text-[rgba(255,255,255,0.25)] outline-none focus:border-[rgba(255,255,255,0.12)] transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              disabled={saving || !customCompany.trim()}
              onClick={handleRelink}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] bg-[#ededed] text-[#0a0a0a] text-[13px] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition-colors"
            >
              <Search className="w-3.5 h-3.5" /> {saving ? 'Searching...' : 'Search Mentions'}
            </button>
            <button
              disabled={fetching || refreshing || ingesting}
              onClick={async () => {
                if (!companyId || !firebaseUser) return;
                setError(null);
                setRefreshing(true);
                try {
                  for (let i = 0; i < 3; i++) {
                    const resp = await apiFetchFull(firebaseUser.uid, companyId, companyName || '');
                    const added = (resp?.added?.posts || 0) + (resp?.added?.comments || 0);
                    const dashFresh = await apiDashboard(companyId, page, pageSize);
                    applyDashboardUpdate(dashFresh);
                    setLastUpdated(dashFresh.lastIngestedAt || null);
                    const key = `dash_${firebaseUser.uid}_${companyName}`;
                    setCache(key, { data: dashFresh, lastUpdated: dashFresh.lastIngestedAt }, 5*60*1000, 'local');
                    memDashCache.set(key, { data: dashFresh, companyId, lastUpdated: dashFresh.lastIngestedAt, fetchedAt: Date.now(), expires: Date.now() + 5*60*1000 });
                    if (!added) break;
                    await new Promise(r => setTimeout(r, 800));
                  }
                } catch (e) {
                  setError(e.message || 'Refresh failed');
                } finally {
                  setRefreshing(false);
                }
              }}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[#ededed] text-[13px] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-[rgba(255,255,255,0.12)] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${(refreshing||ingesting)?'animate-spin':''}`} /> {refreshing||ingesting? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Status line */}
        <div className="flex items-center gap-3 flex-wrap text-[11px] text-[rgba(255,255,255,0.4)]">
          {lastUpdated && <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>}
          {dashboard && (refreshing || (fetching && !refreshing)) && (
            <span className="flex items-center gap-1.5 text-[11px] text-[#60a5fa]">
              <span className="inline-block w-3 h-3 border-2 border-[#60a5fa] border-t-transparent rounded-full animate-spin" />
              {refreshing ? 'Refreshing data...' : 'Updating...'}
            </span>
          )}
        </div>

        {/* Error */}
        {friendlyError && <div className="text-[13px] text-[#f87171]">{friendlyError}</div>}

        {/* Skeleton loading */}
        {!dashboard && !friendlyError && (
          <div className="space-y-8" aria-label="dashboard-skeleton">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({length:4}).map((_,i)=>(
                <div key={i} className="h-[120px] rounded-xl bg-[rgba(255,255,255,0.04)] animate-pulse border border-[rgba(255,255,255,0.04)]" />
              ))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="h-64 rounded-xl bg-[rgba(255,255,255,0.04)] animate-pulse border border-[rgba(255,255,255,0.04)]" />
                <div className="h-64 rounded-xl bg-[rgba(255,255,255,0.04)] animate-pulse border border-[rgba(255,255,255,0.04)]" />
              </div>
              <div className="h-[540px] rounded-xl bg-[rgba(255,255,255,0.04)] animate-pulse border border-[rgba(255,255,255,0.04)]" />
            </div>
            <div className="h-72 rounded-xl bg-[rgba(255,255,255,0.04)] animate-pulse border border-[rgba(255,255,255,0.04)]" />
          </div>
        )}

        {/* Empty state */}
        {dashboard && dashboard.metrics && dashboard.metrics.totalMentions === 0 && !refreshing && !fetching && (
          <div className="max-w-3xl mx-auto text-center py-20 flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-[rgba(255,255,255,0.25)]" />
            </div>
            <h2 className="text-[20px] font-semibold text-[#ededed]">No Reddit presence detected yet</h2>
            <p className="text-[13px] text-[rgba(255,255,255,0.4)] max-w-md">We couldn't find recent mentions or threads for <span className="font-medium text-[#ededed]">{companyName}</span>. You can refresh, adjust the brand name, or check back later.</p>
            <div className="flex gap-3">
              <button
                disabled={refreshing || ingesting}
                onClick={() => companyId && triggerFullRefresh(companyId)}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[#ededed] text-[13px] font-medium disabled:opacity-40 hover:border-[rgba(255,255,255,0.12)] transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing? 'animate-spin':''}`} /> {refreshing ? 'Refreshing...' : 'Force Refresh'}
              </button>
              <button
                disabled={saving || !customCompany.trim()}
                onClick={handleRelink}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[7px] bg-[#ededed] text-[#0a0a0a] text-[13px] font-medium disabled:opacity-40 hover:bg-white transition-colors"
              >
                <Search className="w-3.5 h-3.5" /> Track Different Brand
              </button>
            </div>
            <ul className="text-[12px] text-[rgba(255,255,255,0.4)] space-y-1.5 mt-4 text-left list-disc list-inside max-w-sm">
              <li>Use the common brand name (avoid legal suffixes).</li>
              <li>Give new mentions a few minutes to ingest.</li>
              <li>Try a manual refresh after updating the name.</li>
            </ul>
          </div>
        )}

        {/* Dashboard content */}
        {dashboard && dashboard.metrics && dashboard.metrics.totalMentions > 0 && (
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className={`transition-all ${updatedFields.has('totalMentions') ? 'ring-1 ring-[#60a5fa]/30' : ''}`}>
                <MetricCardInline title="Total Mentions" value={dashboard.metrics.totalMentions} icon={MessageSquare} accentColor="#60a5fa" subtitle={dashboard.meta ? `All Time (${dashboard.meta.spanDays} days)` : 'All Time'} />
              </div>
              <div className={updatedFields.has('activeSubreddits') ? 'ring-1 ring-[#9382ff]/30 rounded-xl' : ''}>
                <MetricCardInline title="Active Subreddits" value={dashboard.metrics.activeSubreddits} icon={Users} accentColor="#9382ff" subtitle="Communities" />
              </div>
              <div className={updatedFields.has('avgEngagement') ? 'ring-1 ring-[#34d399]/30 rounded-xl' : ''}>
                <MetricCardInline title="Avg Engagement" value={dashboard.metrics.avgEngagement} icon={TrendingUp} accentColor="#34d399" subtitle="Upvotes + Comments" />
              </div>
              <div className={updatedFields.has('positiveSentimentPct') ? 'ring-1 ring-[#fbbf24]/30 rounded-xl' : ''}>
                <MetricCardInline title="Positive Sentiment" value={dashboard.metrics.positiveSentimentPct + '%'} icon={Eye} accentColor="#fbbf24" subtitle={dashboard.metrics.estUpVotes !== undefined ? `${dashboard.metrics.estUpVotes} est upvotes` : 'Score Ratio'} />
              </div>
            </div>

            {/* Charts + Topic Clusters */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
              <div className="flex flex-col gap-6">
                <MentionsChartInline data={{ posts: dashboard.posts || [], comments: dashboard.comments || [] }} />
                <TopicClusters data={dashboard.topicClusters || []} />
              </div>
              <SubredditHeatmapInline data={{ posts: dashboard.posts || [], comments: dashboard.comments || [] }} />
            </div>

            {/* Top Threads */}
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
                sentiment: t.upvotes > 0 ? 'positive' : (t.upvotes < 0 ? 'negative' : 'neutral'),
                priority: (t.upvotes + t.comments) > 10 ? 'high' : 'medium',
                post_url: t.url
              }))} />

            {/* All Threads */}
            <AllThreadsTable threads={(dashboard.allThreads || []).map((t,i)=>(
              { id: i,
                title: t.title,
                type: t.type,
                subreddit: t.subreddit,
                author: t.author || '',
                upvotes: t.upvotes,
                comments: t.comments || 0,
                sentiment: t.upvotes > 0 ? 'positive' : (t.upvotes < 0 ? 'negative' : 'neutral'),
                createdAt: t.created_utc || t.fetched_at || null,
                post_url: t.url
              }))} />

            {typeof dashboard?.allThreadsTotal === 'number' && dashboard.allThreadsTotal > 0 && (
              <Pagination
                currentPage={dashboard.allThreadsPage || page}
                totalPages={Math.max(1, Math.ceil((dashboard.allThreadsTotal || 0) / (dashboard.allThreadsPageSize || pageSize)))}
                onPageChange={(p) => setPage(p)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}


async function pollJobUntilDone(jobId, onStatus, timeoutMs=60000, intervalMs=1500){
  const started = Date.now();
  while (Date.now() - started < timeoutMs){
    try {
  const token = await auth.currentUser?.getIdToken?.();
  const res = await fetch(`/api/threadflow/reddit/job?id=${encodeURIComponent(jobId)}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
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
