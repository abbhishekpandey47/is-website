"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { auth } from "@/lib/firebaseClient";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/Components/ui/tabs";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { Textarea } from "@/Components/ui/textarea";
import { Skeleton } from "@/Components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles, AlertCircle, CheckCircle, Search, MessageSquare,
  ExternalLink, Globe, FileText, Tag, Bookmark, BarChart2, Plus, X,
  ChevronRight, Edit2, Save, Loader2, Users,
} from "lucide-react";
import CompetitiveSenseTab from "./components/CompetitiveSenseTab";
import AnalysisPanel from "./components/AnalysisPanel";

// ── Model badge styles ────────────────────────────────────────────────────────

const MODEL_STYLES = {
  perplexity: { label: "Perplexity", bg: "bg-purple-500/15", text: "text-purple-700", border: "border-purple-500/30" },
  openai:     { label: "GPT",        bg: "bg-green-500/15",  text: "text-green-700",  border: "border-green-500/30" },
  anthropic:  { label: "Claude",     bg: "bg-orange-500/15", text: "text-orange-700", border: "border-orange-500/30" },
};

// ── Shared sub-components ─────────────────────────────────────────────────────

function Spinner({ className = "h-4 w-4" }) {
  return <Loader2 className={`${className} animate-spin`} />;
}

// ── Auth-aware fetch helper ───────────────────────────────────────────────────

async function apiPost(path, body) {
  const token = await auth.currentUser?.getIdToken?.();
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    // Suppress authorization errors from being shown to user (endpoints work without auth)
    if (text?.includes("Authorization")) {
      throw new Error(`Request failed: ${res.status}`);
    }
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function SerpScout() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("domain");

  // Authentication
  // Domain
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Domain analysis rotating messages ────────────────────────────────────
  const DOMAIN_MESSAGES = [
    'Analyzing domain…',
    'Fetching company context…',
    'Generating keywords…',
    'Building citation prompts…',
    'Mapping keyword intent…',
    'Scoring opportunity gaps…',
    'Ranking search terms…',
    'Finalizing results…',
  ];
  const [domainMsgIdx, setDomainMsgIdx] = useState(0);
  useEffect(() => {
    if (!loading) { setDomainMsgIdx(0); return; }
    const tid = setInterval(() => setDomainMsgIdx(i => Math.min(i + 1, DOMAIN_MESSAGES.length - 1)), 1800);
    return () => clearInterval(tid);
  }, [loading]);

  // Raw result from domain POST
  const [rawResult, setRawResult] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [selectedKwIds, setSelectedKwIds] = useState(new Set());

  // Company context editing
  const [editingCtx, setEditingCtx] = useState(false);
  const [ctxForm, setCtxForm] = useState({
    companySummary: "", coreCapabilities: [], problemSpaces: [], constraints: [],
  });

  // Per-keyword prompts UX
  const [suggestingIdx, setSuggestingIdx] = useState(null);
  const [manualPromptInputs, setManualPromptInputs] = useState({});
  const [expandedKw, setExpandedKw] = useState(null);

  // Add custom keyword form
  const [newKwForm, setNewKwForm] = useState({ term: "", intent: "informational", why: "", prompts: "" });

  // Save tab
  const [competitors, setCompetitors] = useState([]);
  const [competitorInput, setCompetitorInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Analyze — SERP
  const [serpResults, setSerpResults] = useState({});
  const [serpLoading, setSerpLoading] = useState(false);
  const [serpThreadsLoading, setSerpThreadsLoading] = useState(false);
  const [redditPostsLoading, setRedditPostsLoading] = useState(false);
  const [redditPostsError, setRedditPostsError] = useState(null);
  const [selectedKwIdx, setSelectedKwIdx] = useState(null);

  // Analyze — Citations
  const [citationResults, setCitationResults] = useState(null);
  const [citationLoading, setCitationLoading] = useState(false);
  const [citationPlatformStatus, setCitationPlatformStatus] = useState(null);
  const [manualCitationPrompts, setManualCitationPrompts] = useState([]);

  // Post details scanning for competitors
  const [scannedPostDetails, setScannedPostDetails] = useState({});

  // Generate posts
  const [postStyle, setPostStyle] = useState("with-company"); // 'with-company' or 'without-company'
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [generateError, setGenerateError] = useState(null);

  // Recent domains (UI only)
  const [recentDomains, setRecentDomains] = useState([]);

  // ── Derived ──────────────────────────────────────────────────────────────

  const hasResult = !!rawResult;
  // Merge llmContext (base) with approvedContext (override) so overview fields from llmContext
  // fill in when approvedContext only has keywords/competitors/serpAnalysis (returning user case)
  const _approved = rawResult?.companyContext?.approvedContext;
  const _llm = rawResult?.companyContext?.llmContext;
  const activeCtx = (_approved || _llm)
    ? { ...(_llm || {}), ...(_approved || {}) }
    : (ctxForm?.companySummary ? ctxForm : null);
  const companyName = rawResult?.companyName ?? domain.trim();
  const companyId = rawResult?.companyId ?? null;

  // Debug log for company context
  if (activeCtx && process.env.NODE_ENV === 'development') {
    console.log('[SERP Scout] activeCtx state:', {
      hasSummary: !!activeCtx.companySummary,
      capabilitiesCount: activeCtx.coreCapabilities?.length,
      problemsCount: activeCtx.problemSpaces?.length,
      source: rawResult?.companyContext ? 'database' : 'form'
    });
  }

  const selectedKw = selectedKwIdx !== null ? keywords[selectedKwIdx] : null;
  const kwSerpData = selectedKw ? serpResults[selectedKw.term] : null;

  const citationPrompts = useMemo(() => {
    // Use the selected keyword's saved prompts only — citations run per-keyword
    const base = selectedKw?.prompts ?? [];
    const extras = manualCitationPrompts.filter(p => !base.includes(p));
    return [...base, ...extras];
  }, [selectedKw, manualCitationPrompts]);

  // ── Effects ──────────────────────────────────────────────────────────────

  // Warmup the Render Reddit API on mount — the warmup route waits up to 45s for cold start.
  // We store the promise in a ref so redditTopNew can await it without blocking the button.
  const [redditWarm, setRedditWarm] = useState(false);
  const warmupPromiseRef = useRef(null);
  useEffect(() => {
    const p = fetch("/api/threadflow/warmup")
      .then(() => setRedditWarm(true))
      .catch(() => setRedditWarm(true)); // unblock even on error so UI never hangs
    warmupPromiseRef.current = p;
  }, []);

  // Update recent domains list when a new domain is analyzed
  useEffect(() => {
    if (!rawResult || !domain.trim()) return;
    try {
      const trimmed = domain.trim();
      const prev = JSON.parse(localStorage.getItem("reddit-opportunity-finder-recent-domains") || "[]");
      const updated = [trimmed, ...prev.filter(d => d !== trimmed)].slice(0, 3);
      localStorage.setItem("reddit-opportunity-finder-recent-domains", JSON.stringify(updated));
      setRecentDomains(updated);
    } catch {}
  }, [rawResult]);


  // Sync ctxForm with rawResult company context data
  useEffect(() => {
    if (!rawResult?.companyContext) return;

    const _a = rawResult.companyContext.approvedContext;
    const _l = rawResult.companyContext.llmContext;
    const ctx = (_a || _l) ? { ...(_l || {}), ...(_a || {}) } : null;
    if (ctx && typeof ctx === 'object') {
      const contextData = {
        companySummary: String(ctx.companySummary ?? "").trim(),
        coreCapabilities: Array.isArray(ctx.coreCapabilities) ? ctx.coreCapabilities.filter(Boolean) : [],
        problemSpaces: Array.isArray(ctx.problemSpaces) ? ctx.problemSpaces.filter(Boolean) : [],
        constraints: Array.isArray(ctx.constraints) ? ctx.constraints.filter(Boolean) : [],
      };
      setCtxForm(contextData);
      console.log('[SERP Scout] useEffect synced context:', contextData);
    }
  }, [rawResult?.companyContext?.approvedContext, rawResult?.companyContext?.llmContext]);

  // Auto-expand prompts: after keywords load with only 3 initial prompts, silently generate
  // the remaining prompts per keyword in the background so citation search has more to work with.
  useEffect(() => {
    if (!keywords.length) return;
    const needsPrompts = keywords
      .map((kw, i) => ({ kw, i }))
      .filter(({ kw }) => (kw.prompts?.length ?? 0) < 5);
    if (!needsPrompts.length) return;

    needsPrompts.forEach(({ kw, i }) => {
      apiPost("/api/threadflow/serp-scout", {
        action: "suggestPrompts",
        keyword: kw.term,
        intent: kw.intent,
        companyName,
        domain: domain.trim(),
      }).then(res => {
        const newPrompts = res.prompts ?? [];
        if (!newPrompts.length) return;
        setKeywords(prev => {
          const updated = [...prev];
          const existing = updated[i]?.prompts ?? [];
          const merged = [...new Set([...existing, ...newPrompts])].slice(0, 5);
          updated[i] = { ...updated[i], prompts: merged };
          return updated;
        });
      }).catch(() => {});
    });
  }, [keywords.length > 0 ? keywords[0]?.term : null]); // only re-run when keyword set changes

  // Auto-scan all posts for full content mentions when SERP results load (manual citation search)
  useEffect(() => {
    if (!serpResults || Object.keys(serpResults).length === 0) return;
    if (!companyName) return; // scan brand even when no competitors are configured

    const autoScanPosts = async () => {
      const postsToScan = [];

      // Collect all unique post URLs from SERP results only
      Object.values(serpResults).forEach(kwData => {
        if (kwData?.topRedditPosts?.length > 0) {
          kwData.topRedditPosts.forEach(post => {
            const url = post.url || post.post_url;
            if (url && !scannedPostDetails[url]) {
              postsToScan.push(url);
            }
          });
        }
        if (kwData?.newRedditPosts?.length > 0) {
          kwData.newRedditPosts.forEach(post => {
            const url = post.url || post.post_url;
            if (url && !scannedPostDetails[url]) {
              postsToScan.push(url);
            }
          });
        }
      });

      // Scan in parallel with concurrency limit (3 at a time)
      if (postsToScan.length === 0) return;

      const uniqueUrls = [...new Set(postsToScan)];
      const concurrency = 3;
      for (let i = 0; i < uniqueUrls.length; i += concurrency) {
        const batch = uniqueUrls.slice(i, i + concurrency);
        await Promise.all(batch.map(performPostScan));
      }
    };

    autoScanPosts();
  }, [serpResults]); // Only triggers on SERP results, not citations

  // Perform a single post scan
  async function performPostScan(postUrl) {
    if (!postUrl || scannedPostDetails[postUrl]) return;

    try {
      const details = await apiPost("/api/threadflow/serp-scout", {
        action: "fetchPostDetails",
        url: postUrl,
      });

      const postContent = details?.post_content || details?.content || '';
      const postTitle = details?.post_title || details?.title || '';

      if (postContent || postTitle) {
        const fullContent = postContent + ' ' + postTitle;
        const contentLower = fullContent.toLowerCase();

        const brandMentioned = companyName && contentLower.includes(companyName.toLowerCase());
        const foundCompetitors = competitors.filter(comp =>
          contentLower.includes(comp.toLowerCase())
        );

        setScannedPostDetails(prev => ({
          ...prev,
          [postUrl]: {
            mentionsCompetitors: foundCompetitors,
            mentionsBrand: brandMentioned,
            content: postContent,
            title: postTitle,
            scannedAt: new Date().toISOString(),
          }
        }));
      }
    } catch (e) {
      console.warn("[SERP Scout] Failed to auto-scan post:", postUrl, e.message);
    }
  }

  // ── Handlers ─────────────────────────────────────────────────────────────

  async function handleAnalyzeDomain() {
    const trimmed = domain.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiPost("/api/threadflow/serp-scout", { domain: trimmed });
      setRawResult(res);
      const kws = res.keywords ?? [];
      setKeywords(kws);
      setSelectedKwIds(new Set(kws.map((_, i) => i)));

      // Extract and set company context from API response — merge llm+approved so overview
      // fields from llmContext fill in when approvedContext only has keywords (returning user)
      const _a = res.companyContext?.approvedContext;
      const _l = res.companyContext?.llmContext;
      const ctx = (_a || _l) ? { ...(_l || {}), ...(_a || {}) } : null;
      if (ctx && typeof ctx === 'object') {
        // Ensure all fields are properly structured
        const contextData = {
          companySummary: String(ctx.companySummary ?? "").trim(),
          coreCapabilities: Array.isArray(ctx.coreCapabilities) ? ctx.coreCapabilities.filter(Boolean) : [],
          problemSpaces: Array.isArray(ctx.problemSpaces) ? ctx.problemSpaces.filter(Boolean) : [],
          constraints: Array.isArray(ctx.constraints) ? ctx.constraints.filter(Boolean) : [],
        };
        setCtxForm(contextData);
        console.log('[SERP Scout] Loaded company context:', contextData);
      } else if (res.companyContext) {
        console.log('[SERP Scout] Full companyContext object:', res.companyContext);
      }

      // Always reset competitors for the new domain — prevents bleed from a previous company
      const savedCompetitors = ctx?.competitors;
      setCompetitors(Array.isArray(savedCompetitors) ? savedCompetitors : []);


      if (res.fromExisting) {
        setSaved(true);
        toast({ title: "Welcome back!", description: `${kws.length} saved keywords loaded. Review or edit, then head to Analyze.` });
        setActiveTab("overview");
      } else {
        setActiveTab("overview");
        toast({ title: "Domain analyzed", description: `${kws.length} keywords generated.` });
      }
    } catch (e) {
      setError(e.message ?? "Failed to analyze domain");
    } finally {
      setLoading(false);
    }
  }

  async function handleSuggestPrompts(idx) {
    const kw = keywords[idx];
    if (!kw?.term) return;
    setSuggestingIdx(idx);
    try {
      const res = await apiPost("/api/threadflow/serp-scout", {
        action: "suggestPrompts",
        keyword: kw.term,
        intent: kw.intent,
        companyName,
        domain: domain.trim(),
      });
      const updated = [...keywords];
      updated[idx] = { ...updated[idx], prompts: res.prompts ?? [] };
      setKeywords(updated);
      toast({ title: "Prompts generated", description: `${res.prompts?.length ?? 0} prompts for "${kw.term}"` });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed", description: e.message });
    } finally {
      setSuggestingIdx(null);
    }
  }

  async function handleSaveKeywords() {
    setSaving(true);
    try {
      const selectedKws = Array.from(selectedKwIds).map(i => keywords[i]).filter(Boolean);

      // First save the company context if we have a valid company ID
      if (companyId && (ctxForm.companySummary || ctxForm.coreCapabilities?.length > 0 || ctxForm.problemSpaces?.length > 0)) {
        try {
          await apiPost("/api/threadflow/company-context", {
            companyId,
            domain: domain.trim(),
            context: { ...ctxForm, competitors }
          });
          console.log('[SERP Scout] Company context saved with keywords');
        } catch (e) {
          console.warn('[SERP Scout] Failed to save context with keywords:', e.message);
          // Continue anyway - this is secondary
        }
      }

      // Then save keywords — also pass context so backend can persist it for first-time
      // users whose companyId was null during analysis (generateCompanyContext never saved to DB)
      const res = await apiPost("/api/threadflow/serp-scout", {
        action: "saveKeywords",
        companyId,
        domain: domain.trim(),
        keywords: selectedKws,
        companyName,
        competitors,
        llmContext: rawResult?.companyContext?.llmContext ?? null,
        approvedContext: ctxForm?.companySummary ? { ...ctxForm, competitors } : null,
      });
      if (res.companyId) setRawResult(prev => ({ ...prev, companyId: res.companyId }));
      setSaved(true);
      toast({ title: "Saved!", description: "Keywords saved. Ready to analyze." });
      setActiveTab("analyze");
    } catch (e) {
      toast({ variant: "destructive", title: "Save failed", description: e.message });
    } finally {
      setSaving(false);
    }
  }

  async function handleGeneratePostContent() {
    if (!selectedKw) {
      toast({
        variant: "destructive",
        title: "No keyword selected",
        description: "Please select a keyword first."
      });
      return;
    }

    setGenerateLoading(true);
    setGenerateError(null);
    setGeneratedPosts([]);

    try {
      // Build reddit context from current SERP results
      const currSerpData = serpResults[selectedKw.term];
      const redditContext = {
        topPosts: currSerpData?.topRedditPosts || [],
        newPosts: currSerpData?.newRedditPosts || []
      };

      const res = await apiPost("/api/threadflow/serp-scout", {
        action: "generatePostContent",
        keyword: selectedKw.term,
        domain: domain.trim(),
        companyId,
        redditContext,
        postStyle // Pass the style so backend can adjust prompt
      });

      if (res.posts && res.posts.length > 0) {
        setGeneratedPosts(res.posts);
        toast({
          title: "Posts generated!",
          description: `Created ${res.posts.length} sample Reddit posts for "${selectedKw.term}"`
        });
      } else {
        console.error("Generate posts response:", res);
        const errorMsg = res.error || "No posts generated. Try again.";
        setGenerateError(errorMsg);
      }
    } catch (e) {
      console.error("Generate posts error:", e);
      const errorMsg = e.message ?? "Failed to generate posts";
      setGenerateError(errorMsg);
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: errorMsg
      });
    } finally {
      setGenerateLoading(false);
    }
  }

  async function handleCitationSearch() {
    if (!domain.trim()) {
      toast({
        variant: "destructive",
        title: "Missing domain",
        description: "Please enter a domain first."
      });
      return;
    }

    // Fall back to all selected keyword terms if no LLM-generated prompts saved yet
    const effectivePrompts = citationPrompts.length > 0
      ? citationPrompts
      : Array.from(selectedKwIds).map(idx => keywords[idx]?.term).filter(Boolean);

    if (!effectivePrompts.length) {
      toast({
        variant: "destructive",
        title: "No prompts",
        description: "Select a keyword first to run citation search."
      });
      return;
    }

    setCitationLoading(true);
    setError(null);

    try {
      // Step 0: Check citation cache — skip BrightData entirely if we have fresh results
      if (companyId && selectedKw?.term) {
        try {
          const cached = await apiPost("/api/threadflow/serp-scout", {
            action: "getCitationCache",
            companyId,
            keyword: selectedKw.term,
          });
          if (cached?.found && !cached?.stale && cached?.records?.length) {
            setCitationResults({ records: cached.records, summary: cached.summary, partial: false, fromCache: true });
            toast({ title: "Citations loaded", description: "Showing cached results from a recent scan." });
            setCitationLoading(false);
            return;
          }
        } catch (_) { /* cache miss — proceed to BrightData */ }
      }

      const companyLabel = companyName || domain.trim();

      // ── PARALLEL PER-PROMPT TRIGGERS ──────────────────────────────────────
      // Fire one BrightData request per prompt (max 4) simultaneously.
      // Each request sends 1 prompt to all 4 AI platforms — BrightData processes 1 prompt
      // faster than batching N prompts together. UI updates as each prompt's results arrive.
      const promptsToUse = effectivePrompts.slice(0, 4);

      // Shared accumulation across all per-prompt triggers
      const mergedPlatforms = {};
      const allTriggeredPrompts = [];
      const allSnapshots = [];       // ChatGPT snapshot_ids across all triggers
      const completedPlatforms = new Set();
      const completedSnapshotIds = new Set();
      const wrappedToOriginal = {};
      let firstResultShown = false;
      let anyTriggerSucceeded = false;

      // Initialize all 4 platform statuses as pending
      setCitationPlatformStatus({ ChatGPT: 'pending', Perplexity: 'pending', Gemini: 'pending', 'Google AI': 'pending' });

      toast({
        title: "Citation search started",
        description: `Querying 4 AI platforms across ${promptsToUse.length} prompt${promptsToUse.length > 1 ? 's' : ''}…`,
      });

      // Merge one platform's new data into mergedPlatforms, accumulating results
      const mergePlatformData = (platform, data) => {
        const existing = mergedPlatforms[platform];
        if (existing?.status === 'ready' && data?.status === 'ready') {
          mergedPlatforms[platform] = {
            ...data,
            results: [...(existing.results || []), ...(data.results || [])],
            redditUrls: [...new Set([...(existing.redditUrls || []), ...(data.redditUrls || [])])],
            mentionCount: (existing.mentionCount || 0) + (data.mentionCount || 0),
          };
        } else {
          mergedPlatforms[platform] = data;
        }
      };

      const refreshCitationUI = (isPartial) => {
        const urls = [...new Set(Object.values(mergedPlatforms).filter(p => p.status === 'ready').flatMap(p => p.redditUrls || []))];
        setCitationResults(prev => ({
          ...prev,
          records: buildCitationRecords(mergedPlatforms, allTriggeredPrompts),
          summary: { totalRedditUrlsFound: urls.length },
          partial: isPartial,
        }));
        setCitationPlatformStatus(prev => {
          const next = { ...(prev || {}) };
          Object.entries(mergedPlatforms).forEach(([p, d]) => {
            next[p] = d.status === 'ready' ? 'ready' : d.status === 'error' ? 'error' : 'pending';
          });
          return next;
        });
      };

      // Fire all per-prompt triggers simultaneously — each resolves independently
      await Promise.all(promptsToUse.map(prompt =>
        apiPost("/api/threadflow/brightdata-citations", {
          action: "trigger",
          prompts: [prompt],
          companyName: companyLabel,
          maxPromptsPerPlatform: 1,
        }).then(res => {
          if (!res) return;
          anyTriggerSucceeded = true;

          // Accumulate metadata
          (res.prompts || []).forEach(p => { if (!allTriggeredPrompts.includes(p)) allTriggeredPrompts.push(p); });
          Object.assign(wrappedToOriginal, res.wrappedToOriginal || {});
          // Collect ChatGPT snapshots (deduped)
          (res.snapshots || []).forEach(s => {
            if (!allSnapshots.some(x => x.snapshot_id === s.snapshot_id)) allSnapshots.push(s);
          });

          // Merge sync (immediate) platform results and update UI
          Object.entries(res.immediateResults || {}).forEach(([platform, data]) => {
            mergePlatformData(platform, data);
            completedPlatforms.add(platform);
          });

          refreshCitationUI(true);

          // Release loading state on the first sync result that arrives
          if (!firstResultShown && Object.keys(res.immediateResults || {}).length > 0) {
            firstResultShown = true;
            setCitationLoading(false);
          }
        }).catch(e => {
          console.error('[citations] trigger failed for prompt:', prompt, e.message);
        })
      ));

      if (!anyTriggerSucceeded) throw new Error("All platform triggers failed");

      // If no sync results arrived at all, release loading now
      if (!firstResultShown) setCitationLoading(false);

      // ── Poll ChatGPT snapshots ─────────────────────────────────────────────
      // All ChatGPT snapshot_ids (one per prompt) are polled together.
      // Backend merges multiple snapshots for the same platform automatically.
      const INITIAL_DELAY     = 5_000;
      const POLL_INTERVAL     = 5_000;
      const POLL_MAX_ATTEMPTS = 20;
      let pendingSnapshots = [...allSnapshots];

      if (pendingSnapshots.length > 0) {
        await new Promise(r => setTimeout(r, INITIAL_DELAY));
      }

      for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS && pendingSnapshots.length > 0; attempt++) {
        if (attempt > 0) await new Promise(r => setTimeout(r, POLL_INTERVAL));

        const pollRes = await apiPost("/api/threadflow/brightdata-citations", {
          action: "poll",
          snapshots: pendingSnapshots,
          prompts: allTriggeredPrompts,
          companyName: companyLabel,
          wrappedToOriginal,
        });

        if (!pollRes?.platforms) continue;

        // Merge completed platform data; skip 'running' so existing data isn't overwritten
        Object.entries(pollRes.platforms).forEach(([platform, data]) => {
          if (data.status === 'ready') {
            mergePlatformData(platform, data);
            completedPlatforms.add(platform);
          } else if (data.status === 'error') {
            mergedPlatforms[platform] = data;
            completedPlatforms.add(platform);
          }
        });

        // Track per-snapshot_id completion (backend returns snapshotStatuses map)
        const snapshotStatuses = pollRes.snapshotStatuses || {};
        Object.entries(snapshotStatuses).forEach(([sid, status]) => {
          if (status === 'ready' || status === 'error') completedSnapshotIds.add(sid);
        });
        pendingSnapshots = allSnapshots.filter(s => !completedSnapshotIds.has(s.snapshot_id));

        const allRedditUrls = [...new Set(Object.values(mergedPlatforms).filter(p => p.status === 'ready').flatMap(p => p.redditUrls || []))];
        setCitationResults({
          records: buildCitationRecords(mergedPlatforms, allTriggeredPrompts),
          summary: { ...pollRes.summary, totalRedditUrlsFound: allRedditUrls.length },
          partial: pendingSnapshots.length > 0,
        });
        setCitationPlatformStatus(prev => {
          const next = { ...(prev || {}) };
          Object.entries(mergedPlatforms).forEach(([p, d]) => {
            next[p] = d.status === 'ready' ? 'ready' : d.status === 'error' ? 'error' : 'pending';
          });
          return next;
        });

        if (pendingSnapshots.length === 0) break;
      }

      // Final save + toast
      if (Object.keys(mergedPlatforms).length > 0) {
        const records = buildCitationRecords(mergedPlatforms, allTriggeredPrompts);
        const allRedditUrls = [...new Set(Object.values(mergedPlatforms)
          .filter(p => p.status === 'ready').flatMap(p => p.redditUrls || []))];
        const summary = { totalRedditUrlsFound: allRedditUrls.length, uniqueRedditUrls: allRedditUrls, platformsComplete: completedPlatforms.size, platformsTotal: 4 };
        setCitationResults({ records, summary, partial: false });

        if (companyId && selectedKw?.term && records.length > 0) {
          apiPost("/api/threadflow/serp-scout", {
            action: "saveCitationCache",
            companyId,
            keyword: selectedKw.term,
            records,
            summary,
          }).catch(() => {});
        }

        const totalPosts = allRedditUrls.length;
        toast({ title: "Citations complete", description: totalPosts > 0
          ? `Found ${totalPosts} Reddit links across ${completedPlatforms.size} AI platforms`
          : "AI platforms did not surface Reddit threads for these prompts."
        });
      } else {
        toast({ variant: "destructive", title: "Citation search timed out", description: "Try again or use fewer prompts." });
      }
    } catch (e) {
      const errorMsg = e.message ?? "Citation search failed";
      setError(errorMsg);
      toast({ variant: "destructive", title: "Citation search failed", description: errorMsg });
    } finally {
      setCitationLoading(false);
    }
  }

  /** Convert per-platform poll response into CitationTable records format */
  function buildCitationRecords(platformsData, triggeredPrompts) {
    // Group by prompt across all ready platforms
    const byPrompt = {};
    Object.entries(platformsData).forEach(([platformName, data]) => {
      if (data.status !== 'ready' || !Array.isArray(data.results)) return;
      data.results.forEach(result => {
        const p = result.prompt;
        if (!p) return;
        if (!byPrompt[p]) byPrompt[p] = { prompt: p, models: {} };
        if (result.redditUrls?.length > 0) {
          byPrompt[p].models[platformName] = result.redditUrls.map(url => ({
            url,
            title: url.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || url,
            subreddit: url.match(/\/r\/([^/]+)/)?.[1] || '',
            upvotes: 0,
            comments: 0,
          }));
        }
      });
    });
    // Ensure all triggered prompts appear even if no results yet
    (triggeredPrompts || []).forEach(p => {
      if (!byPrompt[p]) byPrompt[p] = { prompt: p, models: {} };
    });
    return Object.values(byPrompt);
  }

  // Run Analysis — fires 3 sources simultaneously so each tab fills in as it arrives
  // serpAndDork (~3s) → SERP Threads tab
  // redditTopNew (~5-15s) → Top + New tabs
  // citations (independent) → Cited tab
  // After both data calls finish → background enrichment for mention detection
  async function handleRunAnalysis() {
    if (!selectedKw) return;
    const kwTerm = selectedKw.term;
    const kwDomain = domain.trim();

    setSerpThreadsLoading(true);
    setRedditPostsLoading(true);
    setRedditPostsError(null);
    setError(null);
    // Keep stale results visible while loading — user sees old data instead of blank skeletons

    const merge = (newData) =>
      setSerpResults(prev => ({
        ...prev,
        [kwTerm]: { ...(prev[kwTerm] || {}), ...newData, success: true },
      }));

    // Background: silently refresh a stale cached call without blocking UI
    const backgroundRefresh = (action) => {
      apiPost("/api/threadflow/serp-scout", { action, keyword: kwTerm, domain: kwDomain, companyId, force: true })
        .then(data => { if (!data.fromCache) merge(data); })
        .catch(() => {});
    };

    // Background: fetch post details for posts with 0 upvotes and update metrics in-place
    const enrichMetrics = (posts, listKey) => {
      posts
        .filter(p => !(p.upvotes || p.score) && (p.post_url || p.url))
        .slice(0, 4) // cap at 4 concurrent requests to avoid overwhelming Render
        .forEach(post => {
          const url = post.post_url || post.url;
          apiPost("/api/threadflow/serp-scout", { action: "fetchPostDetails", url })
            .then(details => {
              if (!details) return;
              const toInt = v => { const n = parseInt(v, 10); return isNaN(n) ? 0 : n; };
              const upvotes = toInt(details.score ?? details.upvotes ?? details.ups ?? 0);
              const total_comments = toInt(details.num_comments ?? details.total_comments ?? details.comments ?? 0);
              if (!upvotes && !total_comments) return;
              setSerpResults(prev => {
                const cur = prev[kwTerm];
                if (!cur?.[listKey]) return prev;
                return {
                  ...prev,
                  [kwTerm]: {
                    ...cur,
                    [listKey]: cur[listKey].map(p =>
                      (p.post_url || p.url) === url ? { ...p, upvotes, total_comments } : p
                    ),
                  },
                };
              });
            })
            .catch(() => {});
        });
    };

    // 1. SERP + dork — populates SERP tab immediately (~3s)
    const serpDorkPromise = apiPost("/api/threadflow/serp-scout", {
      action: "serpAndDork",
      keyword: kwTerm,
      domain: kwDomain,
      companyId,
    }).then(data => {
      merge(data);
      if (data.stale) {
        backgroundRefresh("serpAndDork");
      } else if (!data.fromCache) {
        enrichMetrics(data.redditThreads || [], "redditThreads");
        enrichMetrics(data.dorkRedditLinks || [], "dorkRedditLinks");
      }
    })
      .catch(e => console.error("[Reddit Finder] serpAndDork failed:", e.message))
      .finally(() => setSerpThreadsLoading(false));

    // 2. Reddit top/new — Render API only (curated results). Await warmup so Render is ready.
    //    serpAndDork + citations already fired above and don't wait for this.
    const redditPromise = (async () => {
      if (warmupPromiseRef.current) await warmupPromiseRef.current;
      return apiPost("/api/threadflow/serp-scout", {
        action: "redditTopNew",
        keyword: kwTerm,
        domain: kwDomain,
        companyId,
      });
    })().then(data => {
      merge(data);
      if (data.stale) {
        backgroundRefresh("redditTopNew");
      } else if (!data.fromCache) {
        enrichMetrics(data.topRedditPosts || [], "topRedditPosts");
        enrichMetrics(data.newRedditPosts || [], "newRedditPosts");
      }
    })
      .catch(e => {
        console.error("[Reddit Finder] redditTopNew failed:", e.message);
        setRedditPostsError(e.message || "Failed to load Reddit posts");
      })
      .finally(() => setRedditPostsLoading(false));

    // 3. Citations run independently
    handleCitationSearch();

    // 4. After both finish: client-side merge Reddit API upvotes into SERP thread posts
    // SERP threads come from Google search (no engagement data) — enrich from Reddit API results
    Promise.allSettled([serpDorkPromise, redditPromise]).then(() => {
      setSerpResults(prev => {
        const cur = prev[kwTerm];
        if (!cur) return prev;
        const metricsMap = new Map();
        [...(cur.topRedditPosts || []), ...(cur.newRedditPosts || [])].forEach(p => {
          const key = (p.post_url || p.url || "").toLowerCase().replace(/\/$/, "");
          if (key && (p.upvotes || p.total_comments))
            metricsMap.set(key, { upvotes: p.upvotes || 0, total_comments: p.total_comments || 0 });
        });
        const enrich = posts => posts.map(p => {
          const key = (p.post_url || p.url || "").toLowerCase().replace(/\/$/, "");
          const m = metricsMap.get(key);
          return m ? { ...p, ...m } : p;
        });
        return {
          ...prev,
          [kwTerm]: {
            ...cur,
            redditThreads: enrich(cur.redditThreads || []),
            dorkRedditLinks: enrich(cur.dorkRedditLinks || []),
          },
        };
      });
    });
  }

  function toggleKw(idx) {
    setSelectedKwIds(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }

  function addManualPromptToKeyword(idx) {
    const val = (manualPromptInputs[idx] ?? "").trim();
    if (!val) return;
    const updated = [...keywords];
    updated[idx] = { ...updated[idx], prompts: [...(updated[idx].prompts ?? []), val].slice(0, 10) };
    setKeywords(updated);
    setManualPromptInputs(prev => ({ ...prev, [idx]: "" }));
  }

  function addCustomKeyword() {
    if (!newKwForm.term.trim()) return;
    const kw = {
      term: newKwForm.term.trim(),
      intent: newKwForm.intent,
      why: newKwForm.why,
      prompts: newKwForm.prompts.split(/\n|,/).map(p => p.trim()).filter(Boolean),
    };
    setKeywords(prev => {
      const next = [...prev, kw];
      setSelectedKwIds(ids => new Set([...ids, next.length - 1]));
      return next;
    });
    setNewKwForm({ term: "", intent: "informational", why: "", prompts: "" });
    toast({ title: "Keyword added" });
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6 w-full">
      {/* Subheader bar — always visible */}
      <div
        className="flex items-center justify-between"
        style={{ minHeight: 44, borderBottom: '0.5px solid #2a2a2a', paddingBottom: 12 }}
      >
        <p style={{ fontSize: 12, color: '#777', margin: 0 }}>
          Discover Reddit threads ranking on Google and find LLM citation opportunities for your brand.
        </p>
        {hasResult && (
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="flex items-center gap-2"
              style={{
                background: 'rgba(95,100,255,0.08)',
                border: '0.5px solid rgba(95,100,255,0.22)',
                borderRadius: 8,
                padding: '5px 12px',
                fontSize: 12,
                color: '#f0f0f0',
              }}
            >
              <Globe className="h-3.5 w-3.5 shrink-0" style={{ color: '#5f64ff' }} />
              <span className="font-medium truncate max-w-48">{companyName}</span>
              <CheckCircle className="h-3.5 w-3.5 shrink-0" style={{ color: '#5f64ff' }} />
            </div>
            <button
              onClick={() => setActiveTab("save")}
              className="flex items-center justify-center h-8 w-8 rounded-lg border border-border hover:border-[#5f64ff]/40 bg-muted/60 hover:bg-[rgba(95,100,255,0.1)] transition-colors"
              title="Save keywords & competitors"
            >
              <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>

      {/* Tab navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b border-border">
          <TabsList className="h-auto min-h-[48px] p-0 bg-transparent rounded-none gap-0">
            <TabsTrigger value="domain" className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#5f64ff] data-[state=active]:bg-transparent px-4 py-3">
              <Globe className="h-4 w-4" />
              <span className="text-sm">Domain</span>
            </TabsTrigger>
            <TabsTrigger value="overview" disabled={!hasResult} className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#5f64ff] data-[state=active]:bg-transparent px-4 py-3">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="keywords" disabled={!hasResult} className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#5f64ff] data-[state=active]:bg-transparent px-4 py-3">
              <Tag className="h-4 w-4" />
              <span className="text-sm">Keywords</span>
              {hasResult && keywords.length > 0 && (
                <span className="text-[10px] bg-[rgba(95,100,255,0.15)] text-[#5f64ff] px-1.5 py-0.5 rounded-full font-medium leading-none">
                  {keywords.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="save" disabled={!hasResult} className="hidden">
              <Bookmark className="h-4 w-4" />
              <span className="text-sm">Save</span>
              {saved && <CheckCircle className="h-3 w-3 text-emerald-500" />}
            </TabsTrigger>
            <TabsTrigger value="analyze" disabled={!saved} className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#5f64ff] data-[state=active]:bg-transparent px-4 py-3">
              <BarChart2 className="h-4 w-4" />
              <span className="text-sm">Analyze</span>
            </TabsTrigger>
            {/* Hidden tabs - logic preserved */}
            <TabsTrigger value="generate" disabled={!saved} className="hidden">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Generate</span>
            </TabsTrigger>
            <TabsTrigger value="compete" disabled={!saved} className="hidden">
              <Users className="h-4 w-4" />
              <span className="text-sm">Compete</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ── Tab 1: Domain ─────────────────────────────────────────────────── */}
        <TabsContent value="domain" className="mt-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
            <div className="space-y-3">
              <div
                className="inline-flex items-center justify-center h-14 w-14 rounded-2xl mb-2"
                style={{ background: 'rgba(95,100,255,0.1)', border: '0.5px solid rgba(95,100,255,0.3)' }}
              >
                <Search className="h-7 w-7" style={{ color: '#5f64ff' }} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Analyze your domain</h2>
              <p className="text-muted-foreground text-base max-w-md mx-auto">
                Paste your website URL and we&apos;ll analyze your company, generate targeted keywords, and find Reddit threads ranking on Google.
              </p>
            </div>

            <div className="flex gap-2 w-full max-w-xl">
              <Input
                value={domain}
                onChange={e => setDomain(e.target.value)}
                placeholder="https://yourwebsite.com"
                onKeyDown={e => e.key === "Enter" && handleAnalyzeDomain()}
                disabled={loading}
                className="h-12 text-base px-4"
              />
              <Button
                onClick={handleAnalyzeDomain}
                disabled={loading || !domain.trim()}
                className="h-12 px-6 text-white border-none"
                style={{ background: '#5f64ff', boxShadow: '0 0 14px rgba(95,100,255,0.3)' }}
              >
                {loading
                  ? <><Spinner className="h-4 w-4 mr-2" /><span className="transition-all duration-300">{DOMAIN_MESSAGES[domainMsgIdx]}</span></>
                  : <><Sparkles className="h-4 w-4 mr-2" />Analyze</>
                }
              </Button>
            </div>

            {/* Recent domains */}
            {recentDomains.length > 0 && !loading && !hasResult && (
              <div className="flex items-center gap-2 w-full max-w-xl flex-wrap">
                <span className="text-[11px]" style={{ color: '#666' }}>Recent:</span>
                {recentDomains.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDomain(d)}
                    className="text-[11px] transition-colors hover:border-[#444]"
                    style={{
                      background: '#161616',
                      border: '0.5px solid #222',
                      borderRadius: '100px',
                      padding: '3px 10px',
                      color: '#666',
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="space-y-2 w-full max-w-xl pt-1">
                <Skeleton className="h-3 w-3/4 mx-auto" />
                <Skeleton className="h-3 w-1/2 mx-auto" />
                <Skeleton className="h-3 w-2/3 mx-auto" />
              </div>
            )}

            {hasResult && !loading && (
              <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3 rounded-lg border border-emerald-200 dark:border-emerald-900 w-full max-w-xl">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">
                  {rawResult?.fromExisting
                    ? `Welcome back! ${keywords.length} keywords loaded — review and edit below, then run your analysis.`
                    : `${keywords.length} keywords generated. Review your company overview next.`}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs shrink-0"
                  onClick={() => setActiveTab("overview")}
                >
                  {rawResult?.fromExisting ? "View Overview" : "Continue"} <ChevronRight className="h-3 w-3 ml-0.5" />
                </Button>
              </div>
            )}

            {!hasResult && !loading && (
              <div className="relative w-full max-w-xl pt-4">
                {/* Gradient connecting line */}
                <div
                  className="hidden sm:block absolute top-[calc(1rem+28px)] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-[0.5px]"
                  style={{ background: 'linear-gradient(90deg, #c084fc, #a78bfa, #60a5fa)' }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { num: '01', icon: <Globe className="h-5 w-5" style={{ color: '#c084fc' }} />, label: 'Scrapes & understands your company' },
                    { num: '02', icon: <Tag className="h-5 w-5" style={{ color: '#a78bfa' }} />, label: 'Generates targeted keywords & prompts' },
                    { num: '03', icon: <BarChart2 className="h-5 w-5" style={{ color: '#60a5fa' }} />, label: 'Finds Reddit threads & AI citations' },
                  ].map((step) => (
                    <div key={step.num} className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border" style={{ background: '#141414' }}>
                      <span
                        className="text-lg font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #c084fc, #60a5fa)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {step.num}
                      </span>
                      <div
                        className="flex items-center justify-center h-10 w-10 rounded-lg"
                        style={{ background: '#141414', border: '0.5px solid rgba(95,100,255,0.3)' }}
                      >
                        {step.icon}
                      </div>
                      <p className="text-xs text-muted-foreground text-center">{step.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ── Tab 2: Overview ───────────────────────────────────────────────── */}
        <TabsContent value="overview" className="mt-8">
          {activeCtx ? (
            <div className="space-y-4">
              <Card style={{ border: '0.5px solid rgba(95,100,255,0.2)' }}>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" style={{ color: '#5f64ff' }} /> Company Overview
                    </CardTitle>
                    <CardDescription>
                      AI-generated from your website. Edit if anything looks off, then continue to Keywords.
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
                    if (!editingCtx) {
                      setCtxForm({
                        companySummary: activeCtx?.companySummary ?? "",
                        coreCapabilities: Array.isArray(activeCtx?.coreCapabilities) ? activeCtx.coreCapabilities : [],
                        problemSpaces: Array.isArray(activeCtx?.problemSpaces) ? activeCtx.problemSpaces : [],
                        constraints: Array.isArray(activeCtx?.constraints) ? activeCtx.constraints : [],
                      });
                    }
                    setEditingCtx(e => !e);
                  }}
                    className="shrink-0 border-none"
                    style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.2)', color: '#5f64ff' }}
                  >
                    {editingCtx
                      ? <><X className="h-3.5 w-3.5 mr-1" style={{ color: '#5f64ff' }} />Cancel</>
                      : <><Edit2 className="h-3.5 w-3.5 mr-1" style={{ color: '#5f64ff' }} />Edit</>
                    }
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingCtx ? (
                    <>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Company Summary</label>
                        <Textarea
                          value={ctxForm.companySummary}
                          onChange={e => setCtxForm(f => ({ ...f, companySummary: e.target.value }))}
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                            Core Capabilities (one per line)
                          </label>
                          <Textarea
                            value={(Array.isArray(ctxForm.coreCapabilities) ? ctxForm.coreCapabilities : []).join("\n")}
                            onChange={e => setCtxForm(f => ({ ...f, coreCapabilities: e.target.value.split("\n").filter(Boolean) }))}
                            rows={4}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                            Problem Spaces (one per line)
                          </label>
                          <Textarea
                            value={(Array.isArray(ctxForm.problemSpaces) ? ctxForm.problemSpaces : []).join("\n")}
                            onChange={e => setCtxForm(f => ({ ...f, problemSpaces: e.target.value.split("\n").filter(Boolean) }))}
                            rows={4}
                          />
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={async () => {
                          // Save to database if we have a company ID
                          if (companyId) {
                            try {
                              const res = await apiPost("/api/threadflow/company-context", {
                                companyId,
                                domain: domain.trim(),
                                context: { ...ctxForm, competitors }
                              });
                              console.log('[SERP Scout] Company context saved to DB:', res);
                              toast({ title: "Overview saved to database" });
                            } catch (e) {
                              console.error('[SERP Scout] Failed to save context:', e.message);
                              toast({ title: "Error", description: e.message, variant: "destructive" });
                              return;
                            }
                          }

                          // Update local state
                          setEditingCtx(false);
                          setRawResult(prev => ({
                            ...prev,
                            companyContext: {
                              ...prev?.companyContext,
                              approvedContext: {
                                ...prev?.companyContext?.approvedContext,
                                ...ctxForm,
                              },
                            },
                          }));
                        }}
                      >
                        <Save className="h-3.5 w-3.5 mr-1.5" />Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      {activeCtx.companySummary ? (
                        <p className="text-sm leading-relaxed text-foreground/90">{activeCtx.companySummary}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No company summary available.</p>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeCtx.coreCapabilities?.length > 0 && (
                          <div>
                            <p
                              className="text-xs font-semibold uppercase tracking-wide mb-2"
                              style={{
                                background: 'linear-gradient(90deg, #c084fc, #60a5fa)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >Core Capabilities</p>
                            <div className="flex flex-wrap gap-1.5">
                              {activeCtx.coreCapabilities.map((c, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs border-none"
                                  style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.2)' }}
                                >{c}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {activeCtx.problemSpaces?.length > 0 && (
                          <div>
                            <p
                              className="text-xs font-semibold uppercase tracking-wide mb-2"
                              style={{
                                background: 'linear-gradient(90deg, #c084fc, #60a5fa)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >Problem Spaces</p>
                            <div className="flex flex-wrap gap-1.5">
                              {activeCtx.problemSpaces.map((p, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="text-xs border-none"
                                  style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.2)' }}
                                >{p}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              <div className="flex justify-end">
                <Button
                  onClick={() => setActiveTab("keywords")}
                  className="text-white border-none"
                  style={{ background: '#5f64ff', boxShadow: '0 0 14px rgba(95,100,255,0.3)' }}
                >
                  Review Keywords <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 border border-dashed rounded-lg text-muted-foreground text-sm">
              Analyze a domain first to see your company overview.
            </div>
          )}
        </TabsContent>

        {/* ── Tab 3: Keywords ───────────────────────────────────────────────── */}
        <TabsContent value="keywords" className="mt-8">
          <div className="space-y-4">
            {rawResult?.fromExisting && (
              <div
                className="flex items-start gap-3 rounded-lg px-4 py-3 text-sm"
                style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.2)' }}
              >
                <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: '#5f64ff' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">Your saved keywords are ready</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Review, add, or remove keywords below — then head to Analyze when you&apos;re good to go.</p>
                </div>
                <Button
                  size="sm"
                  className="h-7 text-xs shrink-0 text-white border-none"
                  style={{ background: '#5f64ff' }}
                  onClick={() => setActiveTab("analyze")}
                >
                  Go to Analyze <ChevronRight className="h-3 w-3 ml-0.5" />
                </Button>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <Tag className="h-4 w-4" style={{ color: '#5f64ff' }} />
              <span className="font-medium">{selectedKwIds.size} of {keywords.length} selected</span>
              <button
                className="text-xs underline"
                style={{ color: '#5f64ff' }}
                onClick={() => setSelectedKwIds(new Set(keywords.map((_, i) => i)))}
              >
                Select all
              </button>
              <button
                className="text-xs underline"
                style={{ color: '#5f64ff' }}
                onClick={() => setSelectedKwIds(new Set())}
              >
                Clear
              </button>
            </div>

            <div className="space-y-2">
              {keywords.map((kw, idx) => (
                <Card
                  key={idx}
                  className="transition-all"
                  style={selectedKwIds.has(idx)
                    ? { border: '0.5px solid rgba(95,100,255,0.4)', background: 'rgba(95,100,255,0.05)' }
                    : { border: '0.5px solid rgba(95,100,255,0.1)' }
                  }
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleKw(idx)}
                        className="mt-0.5 h-4 w-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors"
                        style={selectedKwIds.has(idx)
                          ? { background: '#5f64ff', borderColor: '#5f64ff' }
                          : { borderColor: 'rgba(255,255,255,0.25)' }
                        }
                      >
                        {selectedKwIds.has(idx) && (
                          <span className="text-white text-[10px] font-bold leading-none">✓</span>
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm">{kw.term}</span>
                          <Badge
                            variant="outline"
                            className="text-[10px] capitalize border-none"
                            style={kw.intent === 'informational'
                              ? { background: 'rgba(96,165,250,0.1)', border: '0.5px solid rgba(96,165,250,0.3)', color: '#93c5fd' }
                              : { background: 'rgba(95,100,255,0.12)', border: '0.5px solid rgba(95,100,255,0.3)', color: '#a5b4fc' }
                            }
                          >{kw.intent}</Badge>
                          <button
                            className="text-xs underline"
                            style={{ color: '#5f64ff' }}
                            onClick={() => setExpandedKw(expandedKw === idx ? null : idx)}
                          >
                            {expandedKw === idx ? "collapse" : `${kw.prompts.length} prompt${kw.prompts.length !== 1 ? "s" : ""}`}
                          </button>
                        </div>

                        {kw.why && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{kw.why}</p>
                        )}

                        {expandedKw === idx && (
                          <div className="mt-3 space-y-2 border-t border-border/50 pt-3">
                            {kw.prompts.length > 0 ? (
                              kw.prompts.map((p, pi) => (
                                <div key={pi} className="flex items-start gap-1.5 text-xs text-foreground/80">
                                  <MessageSquare className="h-3 w-3 mt-0.5 shrink-0" style={{ color: '#5f64ff' }} />
                                  <span>{p}</span>
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-muted-foreground italic">No prompts yet — click AI to generate.</p>
                            )}

                            <div className="flex gap-1.5 pt-1">
                              <Input
                                value={manualPromptInputs[idx] ?? ""}
                                onChange={e => setManualPromptInputs(prev => ({ ...prev, [idx]: e.target.value }))}
                                placeholder="Add a prompt…"
                                className="h-7 text-xs"
                                onKeyDown={e => {
                                  if (e.key === "Enter") addManualPromptToKeyword(idx);
                                }}
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 shrink-0 border-none"
                                style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.2)' }}
                                onClick={() => addManualPromptToKeyword(idx)}
                                title="Add prompt"
                              >
                                <Plus className="h-3 w-3" style={{ color: '#5f64ff' }} />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 shrink-0 border-none"
                                style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.2)' }}
                                onClick={() => handleSuggestPrompts(idx)}
                                disabled={suggestingIdx === idx}
                                title="AI suggest prompts"
                              >
                                {suggestingIdx === idx ? <Spinner className="h-3 w-3" /> : <Sparkles className="h-3 w-3" style={{ color: '#5f64ff' }} />}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {keywords.length === 0 && (
                <div className="flex items-center justify-center h-32 border border-dashed rounded-lg text-muted-foreground text-sm">
                  No keywords — analyze a domain first.
                </div>
              )}
            </div>

            {/* Add custom keyword */}
            <Card style={{ border: '0.5px solid rgba(95,100,255,0.2)' }}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-1.5">
                  <Plus className="h-4 w-4" style={{ color: '#5f64ff' }} />Add Custom Keyword
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <Input
                      value={newKwForm.term}
                      onChange={e => setNewKwForm(f => ({ ...f, term: e.target.value }))}
                      placeholder="Keyword term"
                      onKeyDown={e => e.key === "Enter" && addCustomKeyword()}
                    />
                  </div>
                  <select
                    value={newKwForm.intent}
                    onChange={e => setNewKwForm(f => ({ ...f, intent: e.target.value }))}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {["informational", "commercial", "transactional", "navigational"].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <Textarea
                  value={newKwForm.prompts}
                  onChange={e => setNewKwForm(f => ({ ...f, prompts: e.target.value }))}
                  placeholder="Search prompts (one per line or comma-separated, optional)"
                  rows={2}
                  className="text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="border-none"
                  style={{ background: 'rgba(95,100,255,0.08)', border: '0.5px solid rgba(95,100,255,0.2)', color: '#5f64ff' }}
                  onClick={addCustomKeyword}
                  disabled={!newKwForm.term.trim()}
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" style={{ color: '#5f64ff' }} />Add Keyword
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={() => setActiveTab("save")}
                disabled={selectedKwIds.size === 0}
                className="text-white border-none"
                style={{ background: '#5f64ff', boxShadow: '0 0 16px rgba(95,100,255,0.3)' }}
              >
                Add Competitors & Save <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ── Tab 4: Save ───────────────────────────────────────────────────── */}
        <TabsContent value="save" className="mt-8">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-primary" /> Save & Configure
                </CardTitle>
                <CardDescription>
                  Optionally add competitors to track brand vs. competitor mentions, then save your {selectedKwIds.size} selected keyword{selectedKwIds.size !== 1 ? "s" : ""}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Selected Keywords</p>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(selectedKwIds).map(i => keywords[i]).filter(Boolean).map((kw, j) => (
                      <Badge key={j} variant="secondary" className="text-xs">{kw.term}</Badge>
                    ))}
                    {selectedKwIds.size === 0 && (
                      <span className="text-xs text-muted-foreground italic">No keywords selected — go back to Keywords tab.</span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Competitors to Track</p>
                  <div className="flex flex-wrap gap-2 mb-2 min-h-7">
                    {competitors.map((c, i) => (
                      <Badge key={i} variant="secondary" className="gap-1 pr-1.5 text-xs">
                        {c}
                        <button onClick={() => setCompetitors(cs => cs.filter((_, j) => j !== i))}>
                          <X className="h-3 w-3 hover:text-destructive" />
                        </button>
                      </Badge>
                    ))}
                    {competitors.length === 0 && (
                      <span className="text-xs text-muted-foreground italic">No competitors added (optional)</span>
                    )}
                  </div>
                  <div className="flex gap-2 max-w-sm">
                    <Input
                      value={competitorInput}
                      onChange={e => setCompetitorInput(e.target.value)}
                      placeholder="e.g. CompetitorName"
                      className="h-8 text-sm"
                      onKeyDown={e => {
                        if (e.key === "Enter" && competitorInput.trim()) {
                          setCompetitors(cs => [...cs, competitorInput.trim()]);
                          setCompetitorInput("");
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-2"
                      onClick={() => {
                        if (competitorInput.trim()) {
                          setCompetitors(cs => [...cs, competitorInput.trim()]);
                          setCompetitorInput("");
                        }
                      }}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {saved && (
                  <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    Keywords saved! Head to the Analyze tab to run SERP and Citation searches.
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setActiveTab("keywords")}>
                Back to Keywords
              </Button>
              <Button onClick={handleSaveKeywords} disabled={saving || selectedKwIds.size === 0}>
                {saving
                  ? <><Spinner className="h-4 w-4 mr-2" />Saving…</>
                  : <><Bookmark className="h-4 w-4 mr-2" />Save & Go to Analyze</>
                }
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ── Tab 5: Analyze ────────────────────────────────────────────────── */}
        <TabsContent value="analyze" className="mt-8">
          <AnalysisPanel
            companyName={companyName}
            competitors={competitors}
            keywords={keywords}
            selectedKwIds={selectedKwIds}
            selectedKwIdx={selectedKwIdx}
            setSelectedKwIdx={setSelectedKwIdx}
            serpResults={serpResults}
            kwSerpData={kwSerpData}
            serpThreadsLoading={serpThreadsLoading}
            redditPostsLoading={redditPostsLoading}
            redditPostsError={redditPostsError}
            citationLoading={citationLoading}
            citationResults={citationResults}
            citationPlatformStatus={citationPlatformStatus}
            handleRunAnalysis={handleRunAnalysis}
            analysisLoading={serpThreadsLoading || redditPostsLoading || citationLoading}
            scannedPostDetails={scannedPostDetails}
            redditWarm={redditWarm}
          />
        </TabsContent>

        {/* ── Tab 6: Generate Posts (HIDDEN - logic preserved) ─────────────────────────*/}
        <TabsContent value="generate" className="mt-8 hidden">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> Generate Sample Reddit Posts
                </CardTitle>
                <CardDescription>
                  Create authentic sample Reddit posts that mention your product naturally. Choose your post style to control how prominently your company name appears.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Keyword selection */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Select Keyword</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Array.from(selectedKwIds).map(globalIdx => {
                      const kw = keywords[globalIdx];
                      if (!kw) return null;
                      const isSelected = selectedKwIdx === globalIdx;
                      return (
                        <button
                          key={globalIdx}
                          onClick={() => setSelectedKwIdx(globalIdx)}
                          className={`px-3 py-2 rounded-md text-sm border transition-colors text-left ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary font-medium"
                              : "bg-muted/30 border-border hover:bg-muted"
                          }`}
                        >
                          <span className="truncate">{kw.term}</span>
                        </button>
                      );
                    })}
                    {selectedKwIds.size === 0 && (
                      <p className="text-xs text-muted-foreground italic col-span-2">No keywords saved. Go to Save tab first.</p>
                    )}
                  </div>
                </div>

                {/* Post style selection */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Post Style</p>
                  <div className="space-y-2">
                    {[
                      {
                        id: "with-company",
                        label: "With Company Name (Marketing-Oriented)",
                        description: "Posts naturally mention your company name in the solution/context. Good for brand awareness.",
                        icon: "🎯"
                      },
                      {
                        id: "without-company",
                        label: "Without Company Name (Community-Oriented)",
                        description: "Posts focus on the industry/problem without mentioning your company directly. Better for engagement.",
                        icon: "👥"
                      }
                    ].map(style => (
                      <button
                        key={style.id}
                        onClick={() => setPostStyle(style.id)}
                        className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                          postStyle === style.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30 bg-muted/30"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <input
                            type="radio"
                            checked={postStyle === style.id}
                            onChange={() => setPostStyle(style.id)}
                            className="mt-1 shrink-0"
                          />
                          <div>
                            <p className="font-medium text-sm">{style.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{style.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {generateError && (
                  <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg border border-destructive/20">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{generateError}</span>
                  </div>
                )}

                {selectedKw && !kwSerpData && (
                  <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 dark:bg-amber-950/20 px-3 py-2 rounded-lg border border-amber-200 dark:border-amber-900">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Run SERP analysis first for better context on Reddit discussions</span>
                  </div>
                )}

                <Button
                  onClick={handleGeneratePostContent}
                  disabled={generateLoading || selectedKwIdx === null}
                  className="w-full"
                  size="lg"
                >
                  {generateLoading
                    ? <><Spinner className="h-4 w-4 mr-2" />Generating posts…</>
                    : <><Sparkles className="h-4 w-4 mr-2" />Generate 3 Sample Posts</>
                  }
                </Button>
              </CardContent>
            </Card>

            {/* Generated posts display */}
            {generatedPosts.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  Generated Posts for "{selectedKw?.term}"
                </h3>
                {generatedPosts.map((post, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-4 pb-3 space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Title</p>
                        <p className="text-sm font-medium line-clamp-2">{post.title}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Subreddit</p>
                        <Badge variant="outline" className="text-xs">r/{post.subreddit}</Badge>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Post Content</p>
                        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Rationale</p>
                        <p className="text-xs text-muted-foreground italic">{post.rationale}</p>
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-border/50">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            navigator.clipboard.writeText(post.content);
                            toast({ title: "Copied!", description: "Post content copied to clipboard." });
                          }}
                        >
                          Copy Content
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            window.open(`https://reddit.com/r/${post.subreddit}`, "_blank");
                          }}
                        >
                          Visit r/{post.subreddit} <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!generateLoading && generatedPosts.length === 0 && selectedKwIdx !== null && (
              <Card className="border-dashed">
                <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center text-center text-muted-foreground gap-2">
                  <Sparkles className="h-8 w-8 opacity-20" />
                  <p className="text-sm">Click "Generate Posts" above to create sample Reddit posts.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* ── Tab 7: Competitive Sense (HIDDEN - logic preserved) ─────────────────────────── */}
        <TabsContent value="compete" className="mt-8 hidden">
          <CompetitiveSenseTab
            companyContext={rawResult}
            companyId={companyId}
            userId={auth.currentUser?.uid}
            serpResults={serpResults}
            scannedPostDetails={scannedPostDetails}
            companyName={companyName}
            competitors={competitors}
            keywords={keywords}
            selectedKwIds={selectedKwIds}
            onDataLoaded={(data) => {
              console.log('[SERP Scout] Competitive Sense data loaded:', data)
            }}
          />
        </TabsContent>
      </Tabs>

      {/* ── CTA Banner ──────────────────────────────────────────────────────── */}
      <div className="mt-16 mb-8">
        <div className="rounded-2xl border border-border bg-muted/30 px-6 py-12 text-center space-y-5">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Want Infrasity to run this for you?
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Our team manages Reddit visibility, SERP monitoring, and AI citation strategy end-to-end so you can focus on building.
          </p>
          <div className="flex flex-col items-center gap-3 pt-2">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full text-white font-semibold px-8 py-3 text-sm transition-colors"
              style={{ background: '#5f64ff', borderRadius: '100px', boxShadow: '0 0 20px rgba(95,100,255,0.3)' }}
            >
              Book a free consultation
              <ChevronRight className="h-4 w-4" />
            </a>
            <p className="text-xs text-muted-foreground">Free strategy call. No commitment required.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
