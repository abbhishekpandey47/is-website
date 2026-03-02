"use client";

import { useEffect, useMemo, useState } from "react";
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
  Sparkles, AlertCircle, CheckCircle, Search, MessageSquare, Zap,
  ExternalLink, Globe, FileText, Tag, Bookmark, BarChart2, Plus, X,
  ChevronRight, Edit2, Save, Loader2,
} from "lucide-react";

// ── Model badge styles ────────────────────────────────────────────────────────

const MODEL_STYLES = {
  perplexity: { label: "Perplexity", bg: "bg-purple-500/15", text: "text-purple-700", border: "border-purple-500/30" },
  openai:     { label: "GPT",        bg: "bg-green-500/15",  text: "text-green-700",  border: "border-green-500/30" },
  anthropic:  { label: "Claude",     bg: "bg-orange-500/15", text: "text-orange-700", border: "border-orange-500/30" },
};

function getModelStyle(modelId = "") {
  const id = modelId.toLowerCase();
  if (id.includes("perplexity")) return MODEL_STYLES.perplexity;
  if (id.includes("openai") || id.includes("gpt")) return MODEL_STYLES.openai;
  if (id.includes("anthropic") || id.includes("claude")) return MODEL_STYLES.anthropic;
  const label = modelId.split("/").pop()?.split(":")[0] ?? modelId;
  return { label, bg: "bg-gray-500/15", text: "text-gray-700", border: "border-gray-500/30" };
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function Spinner({ className = "h-4 w-4" }) {
  return <Loader2 className={`${className} animate-spin`} />;
}

function PostCard({ post, brandLabel, allCompetitors = [], rank = null, scannedData = null }) {
  // Handle both camelCase (from HTTP results) and snake_case (from API) property names
  const url = post.url || post.post_url || '';
  const title = post.title || post.post_title || '';
  const subreddit = post.subreddit || '';
  const reason = post.reason || '';
  const upvotes = post.upvotes || post.score || 0;
  const downvotes = post.downvotes || 0;
  const postAge = post.post_age_hours || post.age_hours || 0;

  // Use scanned data if available, otherwise use API mention data
  const mentionedCompetitors = scannedData?.mentionsCompetitors || post.mentionsCompetitors || [];
  const mentionsBrand = scannedData?.mentionsBrand !== undefined ? scannedData.mentionsBrand : post.mentionsBrand || false;

  // Format upvotes and downvotes with K/M suffix
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Format age
  const formatAge = (hours) => {
    if (hours < 1) return 'now';
    if (hours < 24) return `${Math.floor(hours)}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w`;
    const months = Math.floor(days / 30);
    return `${months}mo`;
  };

  return (
    <div className="rounded-lg border border-border bg-card p-3 space-y-2 hover:border-primary/30 transition-colors">
      <div className="space-y-1.5">
        <div className="flex items-start gap-2">
          {rank && (
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">#{rank}</span>
            </div>
          )}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-sm text-primary hover:underline line-clamp-2 flex items-start gap-1.5 flex-1"
          >
            <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            {title}
          </a>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Badge variant="outline" className="text-[10px]">{subreddit}</Badge>
          {reason && <span className="truncate max-w-xs">{reason}</span>}
        </div>
      </div>

      {/* Post stats row */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 border-t border-border/50">
        <div className="flex items-center gap-1">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">↑ {formatNumber(upvotes)}</span>
        </div>
        {downvotes > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-red-600 dark:text-red-400 font-semibold">↓ {formatNumber(downvotes)}</span>
          </div>
        )}
        {postAge > 0 && (
          <div className="flex items-center gap-1 ml-auto">
            <span>{formatAge(postAge)}</span>
          </div>
        )}
      </div>

      {/* Mentions badges and scan button */}
      {(brandLabel || allCompetitors.length > 0) && (
        <>
          <div className="flex flex-wrap gap-1 pt-1">
            {brandLabel && (
              mentionsBrand ? (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-emerald-500/15 text-emerald-700 border-emerald-500/30">
                  ✓ {brandLabel}
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] border bg-muted/40 text-muted-foreground/60 border-border/40">
                  ✗ {brandLabel}
                </span>
              )
            )}
            {allCompetitors.map(comp =>
              mentionedCompetitors.includes(comp) ? (
                <span key={`${url}-${comp}`} className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-orange-500/15 text-orange-700 border-orange-500/30">
                  ⚠ {comp}
                </span>
              ) : (
                <span key={`${url}-${comp}`} className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] border bg-muted/30 text-muted-foreground/40 border-border/30">
                  ○ {comp}
                </span>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
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
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function SerpScout() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("domain");

  // Domain
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  const [selectedKwIdx, setSelectedKwIdx] = useState(null);
  const [serpAccordionOpen, setSerpAccordionOpen] = useState(true);

  // Analyze — Citations
  const [citationResults, setCitationResults] = useState(null);
  const [citationLoading, setCitationLoading] = useState(false);
  const [manualCitationInput, setManualCitationInput] = useState("");
  const [manualCitationPrompts, setManualCitationPrompts] = useState([]);

  // Post details scanning for competitors
  const [scannedPostDetails, setScannedPostDetails] = useState({});

  // Auto-load from localStorage
  const [hasAutoLoadedOnMount, setHasAutoLoadedOnMount] = useState(false);

  // ── Derived ──────────────────────────────────────────────────────────────

  const hasResult = !!rawResult;
  const activeCtx = rawResult?.companyContext?.approvedContext ?? rawResult?.companyContext?.llmContext ?? null;
  const companyName = rawResult?.companyName ?? domain.trim();
  const companyId = rawResult?.companyId ?? null;

  const selectedKw = selectedKwIdx !== null ? keywords[selectedKwIdx] : null;
  const kwSerpData = selectedKw ? serpResults[selectedKw.term] : null;

  const citationPrompts = useMemo(() => {
    const base = selectedKw?.prompts ?? [];
    const extras = manualCitationPrompts.filter(p => !base.includes(p));
    return [...base, ...extras];
  }, [selectedKw, manualCitationPrompts]);

  const citationSummary = useMemo(() => {
    const records = citationResults?.records ?? [];
    if (!records.length) return null;
    let totalPosts = 0, totalModels = 0, selfMentions = 0;
    records.forEach(rec => {
      Object.values(rec.models).forEach(val => {
        totalModels++;
        if (Array.isArray(val)) {
          totalPosts += val.length;
          val.forEach(p => { if (p.mentionsBrand) selfMentions++; });
        }
      });
    });
    return { totalPrompts: records.length, totalModels, totalPosts, selfMentions };
  }, [citationResults]);

  // ── Effects ──────────────────────────────────────────────────────────────

  // Auto-load domain from localStorage on mount
  useEffect(() => {
    if (hasAutoLoadedOnMount) return; // Prevent re-running
    setHasAutoLoadedOnMount(true);

    if (typeof window === "undefined") return; // SSR safety

    try {
      const savedDomain = localStorage.getItem("serp-scout-domain");
      if (savedDomain && !domain) {
        setDomain(savedDomain);
      }
    } catch (e) {
      console.warn("[SERP Scout] Failed to read localStorage:", e.message);
    }
  }, []);

  // Auto-trigger analysis when domain is loaded from localStorage
  useEffect(() => {
    if (!domain || rawResult || !hasAutoLoadedOnMount || loading) return;
    
    const savedDomain = localStorage.getItem("serp-scout-domain");
    if (savedDomain === domain.trim()) {
      // Domain was loaded from localStorage, trigger analysis
      handleAnalyzeDomain();
    }
  }, [domain, hasAutoLoadedOnMount]);

  // Auto-scan all posts for full content mentions when results load
  useEffect(() => {
    if (!serpResults || Object.keys(serpResults).length === 0) return;
    if (!companyName || competitors.length === 0) return;

    const autoScanPosts = async () => {
      const postsToScan = [];
      
      // Collect all unique post URLs from all result categories
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

      // Also collect from citation results
      if (citationResults?.records?.length > 0) {
        citationResults.records.forEach(rec => {
          Object.values(rec.models || {}).forEach(posts => {
            if (Array.isArray(posts)) {
              posts.forEach(post => {
                const url = post.url || post.post_url;
                if (url && !scannedPostDetails[url]) {
                  postsToScan.push(url);
                }
              });
            }
          });
        });
      }

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
  }, [serpResults, citationResults]);

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
      const ctx = res.companyContext?.approvedContext ?? res.companyContext?.llmContext;
      if (ctx) setCtxForm(ctx);
      const savedCompetitors = ctx?.competitors;
      if (Array.isArray(savedCompetitors) && savedCompetitors.length > 0) setCompetitors(savedCompetitors);

      // Save domain to localStorage for future auto-load
      try {
        localStorage.setItem("serp-scout-domain", trimmed);
      } catch (e) {
        console.warn("[SERP Scout] Failed to save domain to localStorage:", e.message);
      }

      if (res.fromExisting) {
        setSaved(true);
        toast({ title: "Loaded!", description: "Existing data loaded — jumping to Analyze." });
        
        // Auto-load SERP cache for all keywords when returning to existing setup
        if (res.companyId && kws.length > 0) {
          loadSerpCacheForKeywords(kws, trimmed, res.companyId);
        }

        setActiveTab("analyze");
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

  // Load SERP cache for all keywords from existing company setup
  async function loadSerpCacheForKeywords(kws, domain, companyId) {
    if (!kws.length || !companyId) return;
    
    try {
      // Fetch SERP cache for each keyword in parallel
      const serpDataPromises = kws.map(kw =>
        apiPost("/api/threadflow/serp-scout", {
          action: "keywordSerp",
          keyword: kw.term,
          domain,
          companyId,
        }).catch(e => {
          console.warn(`[SERP Scout] Failed to load SERP cache for "${kw.term}":`, e.message);
          return null; // Don't throw, continue with other keywords
        })
      );

      const serpDataResults = await Promise.all(serpDataPromises);
      
      // Populate serpResults with cached data
      const newSerpResults = {};
      serpDataResults.forEach((data, idx) => {
        if (data && data.success !== false) {
          const kwTerm = kws[idx].term;
          newSerpResults[kwTerm] = data;
        }
      });

      if (Object.keys(newSerpResults).length > 0) {
        setSerpResults(newSerpResults);
        console.log("[SERP Scout] Loaded SERP cache for", Object.keys(newSerpResults).length, "keywords");
      }
    } catch (e) {
      console.warn("[SERP Scout] Error loading SERP cache:", e.message);
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
      const res = await apiPost("/api/threadflow/serp-scout", {
        action: "saveKeywords",
        companyId,
        domain: domain.trim(),
        keywords: selectedKws,
        companyName,
        competitors,
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

  async function handleSerpAnalysis() {
    if (!selectedKw) return;
    setSerpLoading(true);
    setError(null);
    try {
      const res = await apiPost("/api/threadflow/serp-scout", {
        action: "keywordSerp",
        keyword: selectedKw.term,
        domain: domain.trim(),
        companyId,
        competitors,
      });
      setSerpResults(prev => ({ ...prev, [selectedKw.term]: res }));
    } catch (e) {
      setError(e.message ?? "SERP analysis failed");
    } finally {
      setSerpLoading(false);
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
    
    if (!citationPrompts.length) {
      toast({
        variant: "destructive",
        title: "No prompts",
        description: "Add at least one prompt to run citation search."
      });
      return;
    }
    
    setCitationLoading(true);
    setError(null);
    
    try {
      const res = await apiPost("/api/threadflow/serp-scout", {
        action: "testCitations",
        prompts: citationPrompts,
        domain: domain.trim(),
        competitors,
      });
      
      setCitationResults(res);
      
      // Show summary of results
      if (res?.records?.length > 0) {
        let totalPosts = 0;
        res.records.forEach(rec => {
          Object.values(rec.models).forEach(val => {
            if (Array.isArray(val)) totalPosts += val.length;
          });
        });
        toast({
          title: "Citation search complete",
          description: `Found ${totalPosts} posts across ${res.records.length} prompt${res.records.length !== 1 ? 's' : ''}`
        });
      } else {
        toast({
          title: "No results found",
          description: "Try different prompts or keywords."
        });
      }
    } catch (e) {
      const errorMsg = e.message ?? "Citation search failed";
      setError(errorMsg);
      
      // Provide specific error guidance
      let description = errorMsg;
      if (errorMsg.includes("timeout")) {
        description = "The search took too long. Try with fewer prompts or simpler keywords.";
      } else if (errorMsg.includes("401") || errorMsg.includes("unauthorized")) {
        description = "Your session expired. Please sign in again.";
      } else if (errorMsg.includes("429")) {
        description = "Rate limited. Please wait a moment and try again.";
      }
      
      toast({
        variant: "destructive",
        title: "Citation search failed",
        description
      });
    } finally {
      setCitationLoading(false);
    }
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
    <div className="space-y-6 max-w-6xl m-4">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">SERP Scout</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Discover Reddit threads ranking on Google and find LLM citation opportunities for your brand.
          </p>
        </div>
        {hasResult && (
          <div className="flex items-center gap-2 text-sm bg-muted/60 px-3 py-1.5 rounded-lg border border-border">
            <Globe className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="font-medium truncate max-w-48">{companyName}</span>
            {saved && <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg border border-destructive/20">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <button className="text-xs underline opacity-70 hover:opacity-100" onClick={() => setError(null)}>
            dismiss
          </button>
        </div>
      )}

      {/* Tab navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full sm:w-auto sm:flex">
          <TabsTrigger value="domain" className="gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Domain</span>
          </TabsTrigger>
          <TabsTrigger value="overview" disabled={!hasResult} className="gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="keywords" disabled={!hasResult} className="gap-1.5">
            <Tag className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Keywords</span>
            {hasResult && keywords.length > 0 && (
              <span className="hidden sm:inline text-[10px] bg-primary/15 text-primary px-1.5 py-0.5 rounded-full font-medium leading-none">
                {keywords.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="save" disabled={!hasResult} className="gap-1.5">
            <Bookmark className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Save</span>
            {saved && <CheckCircle className="h-3 w-3 text-emerald-500" />}
          </TabsTrigger>
          <TabsTrigger value="analyze" disabled={!saved} className="gap-1.5">
            <BarChart2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Analyze</span>
          </TabsTrigger>
        </TabsList>

        {/* ── Tab 1: Domain ─────────────────────────────────────────────────── */}
        <TabsContent value="domain" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" /> Enter Your Website
              </CardTitle>
              <CardDescription>
                Paste your domain and we&apos;ll scrape your site to understand your company, then generate targeted keywords and prompts automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 max-w-lg">
                <Input
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  onKeyDown={e => e.key === "Enter" && handleAnalyzeDomain()}
                  disabled={loading}
                />
                <Button onClick={handleAnalyzeDomain} disabled={loading || !domain.trim()}>
                  {loading
                    ? <><Spinner className="h-4 w-4 mr-2" />Analyzing…</>
                    : <><Sparkles className="h-4 w-4 mr-2" />Analyze</>
                  }
                </Button>
              </div>

              {loading && (
                <div className="space-y-2 max-w-lg pt-1">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              )}

              {hasResult && !loading && (
                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span className="flex-1">
                    {rawResult?.fromExisting
                      ? "Existing setup loaded — jump straight to Analyze."
                      : `${keywords.length} keywords generated. Review your company overview next.`}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs shrink-0"
                    onClick={() => setActiveTab(rawResult?.fromExisting ? "analyze" : "overview")}
                  >
                    Continue <ChevronRight className="h-3 w-3 ml-0.5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 2: Overview ───────────────────────────────────────────────── */}
        <TabsContent value="overview" className="mt-6">
          {activeCtx ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" /> Company Overview
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
                  }} className="shrink-0">
                    {editingCtx
                      ? <><X className="h-3.5 w-3.5 mr-1" />Cancel</>
                      : <><Edit2 className="h-3.5 w-3.5 mr-1" />Edit</>
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
                            value={ctxForm.coreCapabilities.join("\n")}
                            onChange={e => setCtxForm(f => ({ ...f, coreCapabilities: e.target.value.split("\n").filter(Boolean) }))}
                            rows={4}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                            Problem Spaces (one per line)
                          </label>
                          <Textarea
                            value={ctxForm.problemSpaces.join("\n")}
                            onChange={e => setCtxForm(f => ({ ...f, problemSpaces: e.target.value.split("\n").filter(Boolean) }))}
                            rows={4}
                          />
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
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
                          toast({ title: "Overview updated" });
                        }}
                      >
                        <Save className="h-3.5 w-3.5 mr-1.5" />Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm leading-relaxed text-foreground/90">{activeCtx.companySummary}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeCtx.coreCapabilities?.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Core Capabilities</p>
                            <div className="flex flex-wrap gap-1.5">
                              {activeCtx.coreCapabilities.map((c, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">{c}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {activeCtx.problemSpaces?.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Problem Spaces</p>
                            <div className="flex flex-wrap gap-1.5">
                              {activeCtx.problemSpaces.map((p, i) => (
                                <Badge key={i} variant="outline" className="text-xs">{p}</Badge>
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
                <Button onClick={() => setActiveTab("keywords")}>
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
        <TabsContent value="keywords" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Tag className="h-4 w-4 text-primary" />
              <span className="font-medium">{selectedKwIds.size} of {keywords.length} selected</span>
              <button
                className="text-xs text-muted-foreground underline"
                onClick={() => setSelectedKwIds(new Set(keywords.map((_, i) => i)))}
              >
                Select all
              </button>
              <button
                className="text-xs text-muted-foreground underline"
                onClick={() => setSelectedKwIds(new Set())}
              >
                Clear
              </button>
            </div>

            <div className="space-y-2">
              {keywords.map((kw, idx) => (
                <Card
                  key={idx}
                  className={`transition-all ${selectedKwIds.has(idx) ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/20"}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleKw(idx)}
                        className={`mt-0.5 h-4 w-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${
                          selectedKwIds.has(idx) ? "bg-primary border-primary" : "border-muted-foreground/40"
                        }`}
                      >
                        {selectedKwIds.has(idx) && (
                          <span className="text-primary-foreground text-[10px] font-bold leading-none">✓</span>
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm">{kw.term}</span>
                          <Badge variant="outline" className="text-[10px] capitalize">{kw.intent}</Badge>
                          <button
                            className="text-xs text-primary underline"
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
                                  <MessageSquare className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
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
                                className="h-7 px-2 shrink-0"
                                onClick={() => addManualPromptToKeyword(idx)}
                                title="Add prompt"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 shrink-0"
                                onClick={() => handleSuggestPrompts(idx)}
                                disabled={suggestingIdx === idx}
                                title="AI suggest prompts"
                              >
                                {suggestingIdx === idx ? <Spinner className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
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
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-1.5">
                  <Plus className="h-4 w-4" />Add Custom Keyword
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
                <Button size="sm" variant="outline" onClick={addCustomKeyword} disabled={!newKwForm.term.trim()}>
                  <Plus className="h-3.5 w-3.5 mr-1.5" />Add Keyword
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setActiveTab("save")} disabled={selectedKwIds.size === 0}>
                Add Competitors & Save <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ── Tab 4: Save ───────────────────────────────────────────────────── */}
        <TabsContent value="save" className="mt-6">
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
        <TabsContent value="analyze" className="mt-6">
          {citationSummary && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Prompts Searched", value: citationSummary.totalPrompts },
                { label: "Models Used", value: citationSummary.totalModels },
                { label: "Reddit Posts Found", value: citationSummary.totalPosts },
                { label: "Brand Mentions", value: citationSummary.selfMentions },
              ].map(({ label, value }) => (
                <Card key={label}>
                  <CardContent className="pt-4 pb-3">
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left controls */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Search className="h-4 w-4 text-primary" />SERP Analysis
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Find Reddit posts currently ranking on Google for your keyword.
                  </CardDescription>
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
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted/30 border-border hover:bg-muted text-black"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate">{kw.term}</span>
                          {serpData && (
                            <span className="text-[10px] shrink-0 opacity-70">
                              {serpData.topRedditPosts.length + serpData.newRedditPosts.length} posts
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}

                  {selectedKwIds.size === 0 && (
                    <p className="text-xs text-muted-foreground italic">No keywords saved. Go back to Save tab.</p>
                  )}

                  {selectedKwIdx !== null && (
                    <Button onClick={handleSerpAnalysis} disabled={serpLoading} className="w-full" size="sm">
                      {serpLoading
                        ? <><Spinner className="h-3.5 w-3.5 mr-1.5" />Searching…</>
                        : <><Zap className="h-3.5 w-3.5 mr-1.5" />Run SERP Search</>
                      }
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />Citation Search
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Ask AI models to find Reddit posts matching your prompts. (Takes 30-60s)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {citationPrompts.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">
                      Select a keyword to use its prompts, or add custom ones below.
                    </p>
                  ) : (
                    <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                      {citationPrompts.map((p, i) => (
                        <p key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="shrink-0 text-primary">•</span>{p}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-1.5 pt-1">
                    <Input
                      value={manualCitationInput}
                      onChange={e => setManualCitationInput(e.target.value)}
                      placeholder="Add custom prompt"
                      className="h-7 text-xs"
                      onKeyDown={e => {
                        if (e.key === "Enter" && manualCitationInput.trim()) {
                          setManualCitationPrompts(ps => [...ps, manualCitationInput.trim()]);
                          setManualCitationInput("");
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 shrink-0"
                      onClick={() => {
                        if (manualCitationInput.trim()) {
                          setManualCitationPrompts(ps => [...ps, manualCitationInput.trim()]);
                          setManualCitationInput("");
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
            </div>

            {/* Right results panel */}
            <div className="lg:col-span-2 space-y-4">
              {serpLoading && (
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                  </CardContent>
                </Card>
              )}

              {kwSerpData && !serpLoading && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-1">
                        <Zap className="h-4 w-4 text-primary" />
                        <CardTitle className="text-sm">SERP — {selectedKw?.term}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 shrink-0"
                        onClick={() => setSerpAccordionOpen(!serpAccordionOpen)}
                      >
                        <ChevronRight className={`h-4 w-4 transition-transform ${serpAccordionOpen ? 'rotate-90' : ''}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  {serpAccordionOpen && (
                    <CardContent className="space-y-5">
                    {kwSerpData.topRedditPosts?.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Top Ranking Posts</p>
                        <div className="space-y-2">
                          {kwSerpData.topRedditPosts.map((post, i) => (
                            <PostCard
                              key={i}
                              post={post}
                              brandLabel={companyName}
                              allCompetitors={competitors}
                              rank={(post.serp_rank || 999) <= 50 ? post.serp_rank : null}
                              scannedData={scannedPostDetails[post.url || post.post_url]}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {kwSerpData.newRedditPosts?.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">New / Rising Posts</p>
                        <div className="space-y-2">
                          {kwSerpData.newRedditPosts.map((post, i) => (
                            <PostCard
                              key={i}
                              post={post}
                              brandLabel={companyName}
                              allCompetitors={competitors}
                              rank={(post.serp_rank || 999) <= 50 ? post.serp_rank : null}
                              scannedData={scannedPostDetails[post.url || post.post_url]}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {kwSerpData.suggestedPosts?.length > 0 && (
                      <div>
                        {/* LLM Suggested Engagement Posts - commented out for now
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">🎯 LLM Suggested Engagement Posts</p>
                        <div className="space-y-2">
                          {kwSerpData.suggestedPosts.map((post, i) => (
                            <div key={i} className="rounded-lg border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20 p-3 space-y-2">
                              <PostCard
                                post={post}
                                brandLabel={companyName}
                                allCompetitors={competitors}
                                scannedData={scannedPostDetails[post.url || post.post_url]}
                              />
                              {post.engagementScore && (
                                <div className="pt-2 border-t border-amber-500/20">
                                  <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold mb-1">Engagement Strategy:</p>
                                  <p className="text-xs text-muted-foreground">{post.engagementStrategy}</p>
                                  {post.engagementScore && (
                                    <p className="text-[10px] text-amber-600 dark:text-amber-500 mt-1.5 font-semibold">Score: {post.engagementScore}/10</p>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        */}
                      </div>
                    )}
                    {!kwSerpData.topRedditPosts?.length && !kwSerpData.newRedditPosts?.length && (
                      <p className="text-sm text-muted-foreground text-center py-4">No Reddit posts found for this keyword.</p>
                    )}
                    </CardContent>
                  )}
                </Card>
              )}

              {citationLoading && (
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                  </CardContent>
                </Card>
              )}

              {!citationLoading && citationResults?.records?.length > 0 && citationResults.records.map((rec, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-sm leading-snug line-clamp-2">{rec.prompt}</CardTitle>
                    <CardDescription className="text-xs">{new Date(rec.timestamp).toLocaleString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(rec.models).map(([modelId, value]) => {
                      const style = getModelStyle(modelId);
                      const posts = Array.isArray(value) ? value : [];
                      const isError = !Array.isArray(value) && value && "error" in value;
                      return (
                        <div key={modelId}>
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border mb-2 ${style.bg} ${style.text} ${style.border}`}>
                            {style.label}
                          </div>
                          {isError ? (
                            <p className="text-xs text-destructive">{value.error}</p>
                          ) : posts.length === 0 ? (
                            <p className="text-xs text-muted-foreground italic">No results found for this model.</p>
                          ) : (
                            <div className="space-y-2">
                              {posts.map((post, j) => (
                                <PostCard
                                  key={j}
                                  post={post}
                                  brandLabel={companyName}
                                  allCompetitors={competitors}
                                  scannedData={scannedPostDetails[post.url || post.post_url]}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}

              {!citationLoading && citationResults && citationResults.records?.length === 0 && (
                <Card>
                  <CardContent className="pt-6 flex flex-col items-center text-center gap-3 h-48">
                    <div className="opacity-50">
                      <AlertCircle className="h-10 w-10 mx-auto" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">No posts found</p>
                      <p className="text-xs text-muted-foreground mt-1">Try different prompts or keywords to find more results.</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!kwSerpData && !citationResults && !serpLoading && !citationLoading && (
                <div className="flex flex-col items-center justify-center h-64 border border-dashed border-border rounded-lg text-muted-foreground gap-3">
                  <BarChart2 className="h-10 w-10 opacity-20" />
                  <div className="text-center text-sm">
                    <p className="font-medium">No results yet</p>
                    <p className="text-xs mt-1 opacity-70">
                      Select a keyword and run SERP, or add prompts and run Citation Search.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
