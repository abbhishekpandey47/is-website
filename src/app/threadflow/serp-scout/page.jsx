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
  const [selectedKwIdx, setSelectedKwIdx] = useState(null);
  const [serpAccordionOpen, setSerpAccordionOpen] = useState(true);

  // Analyze — Citations
  const [citationResults, setCitationResults] = useState(null);
  const [citationLoading, setCitationLoading] = useState(false);
  const [citationPlatformStatus, setCitationPlatformStatus] = useState(null);
  const [manualCitationInput, setManualCitationInput] = useState("");
  const [manualCitationPrompts, setManualCitationPrompts] = useState([]);

  // Post details scanning for competitors
  const [scannedPostDetails, setScannedPostDetails] = useState({});

  // Generate posts
  const [postStyle, setPostStyle] = useState("with-company"); // 'with-company' or 'without-company'
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [generateError, setGenerateError] = useState(null);

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

  // Warmup the Render Reddit API on mount so it's ready by the time the user runs analysis
  useEffect(() => {
    fetch("/api/threadflow/warmup").catch(() => {});
  }, []);

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

  // Auto-scan all posts for full content mentions when SERP results load (manual citation search)
  useEffect(() => {
    if (!serpResults || Object.keys(serpResults).length === 0) return;
    if (!companyName || competitors.length === 0) return;

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
      const res = await apiPost("/api/threadflow/serp-scout", {
        domain: trimmed,
        // Pass known companyId so API skips the domain+user DB lookup on returning visits
        ...(companyId ? { companyId } : {}),
      });
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

  async function handleSerpAnalysis() {
    if (!selectedKw) return;
    setSerpLoading(true);
    setError(null);
    const kwTerm = selectedKw.term;
    try {
      // Phase 1: fast — get SERP position + post list without full content enrichment
      const fastRes = await apiPost("/api/threadflow/serp-scout", {
        action: "keywordSerp",
        keyword: kwTerm,
        domain: domain.trim(),
        companyId,
        competitors,
        quickMode: true,
      });
      setSerpResults(prev => ({ ...prev, [kwTerm]: fastRes }));
      setSerpLoading(false);

      // Phase 2: background — full enrichment (brand/competitor mention detection)
      // Skip if results came from cache (already fully enriched)
      if (!fastRes.fromCache) {
        apiPost("/api/threadflow/serp-scout", {
          action: "keywordSerp",
          keyword: kwTerm,
          domain: domain.trim(),
          companyId,
          competitors,
        }).then(fullRes => {
          setSerpResults(prev => ({ ...prev, [kwTerm]: fullRes }));
        }).catch(e => {
          console.warn("[SERP Scout] background enrichment failed:", e.message);
        });
      }
    } catch (e) {
      setError(e.message ?? "SERP analysis failed");
      setSerpLoading(false);
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

  // silent=true: background refresh — suppress toasts and loading state, just update results + re-save cache
  async function handleCitationSearch({ silent = false } = {}) {
    if (!domain.trim()) {
      if (!silent) toast({ variant: "destructive", title: "Missing domain", description: "Please enter a domain first." });
      return;
    }

    const effectivePrompts = citationPrompts.length > 0
      ? citationPrompts
      : Array.from(selectedKwIds).map(idx => keywords[idx]?.term).filter(Boolean);

    if (!effectivePrompts.length) {
      if (!silent) toast({ variant: "destructive", title: "No prompts", description: "Select a keyword first to run citation search." });
      return;
    }

    if (!silent) { setCitationLoading(true); setError(null); }

    try {
      const triggerRes = await apiPost("/api/threadflow/brightdata-citations", {
        action: "trigger",
        prompts: effectivePrompts,
        companyName: companyName || domain.trim(),
        maxPromptsPerPlatform: effectivePrompts.length,
      });

      if (!triggerRes?.snapshots?.length) {
        throw new Error(triggerRes?.error || "No platform snapshots were triggered");
      }

      const { snapshots, prompts: triggeredPrompts, wrappedToOriginal } = triggerRes;
      if (!silent) toast({
        title: "Citation search started",
        description: `Querying ${snapshots.length} AI platforms. Results appear as each completes…`,
      });

      // Initialize all platforms as pending so UI shows status immediately
      if (!silent) setCitationPlatformStatus(Object.fromEntries(snapshots.map(s => [s.platform, 'pending'])));

      // Smart poll schedule: 10s initial wait, 10s intervals, skip completed platforms
      const INITIAL_DELAY     = 10_000;
      const POLL_INTERVAL     = 10_000;
      const POLL_MAX_ATTEMPTS = 14;  // 10s + 14×10s = max ~2.5 min
      const completedPlatforms = new Set();
      let pendingSnapshots = [...snapshots];
      const mergedPlatforms = {};

      await new Promise(r => setTimeout(r, INITIAL_DELAY));

      for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt++) {
        if (attempt > 0) await new Promise(r => setTimeout(r, POLL_INTERVAL));

        const pollRes = await apiPost("/api/threadflow/brightdata-citations", {
          action: "poll",
          snapshots: pendingSnapshots,
          prompts: triggeredPrompts,
          companyName: companyName || domain.trim(),
          wrappedToOriginal,
        });

        if (!pollRes?.platforms) continue;

        Object.entries(pollRes.platforms).forEach(([platform, data]) => {
          if (data.status === 'ready' || data.status === 'error') completedPlatforms.add(platform);
          mergedPlatforms[platform] = data;
        });

        // Update platform status for live UI
        if (!silent) setCitationPlatformStatus(prev => {
          const next = { ...(prev || {}) };
          Object.entries(mergedPlatforms).forEach(([p, d]) => {
            next[p] = d.status === 'ready' ? 'ready' : d.status === 'error' ? 'error' : 'pending';
          });
          return next;
        });

        pendingSnapshots = snapshots.filter(s => !completedPlatforms.has(s.platform));

        const hasReadyPlatform = Object.values(mergedPlatforms).some(p => p.status === 'ready');
        if (hasReadyPlatform) {
          const partialRecords = buildCitationRecords(mergedPlatforms, triggeredPrompts);
          const allRedditUrls = [...new Set(Object.values(mergedPlatforms)
            .filter(p => p.status === 'ready')
            .flatMap(p => p.redditUrls || []))];
          setCitationResults({
            records: partialRecords,
            summary: { ...pollRes.summary, totalRedditUrlsFound: allRedditUrls.length },
            partial: pendingSnapshots.length > 0,
          });
        }

        if (pendingSnapshots.length === 0) break;
      }

      // Final update
      if (Object.keys(mergedPlatforms).length > 0) {
        const records = buildCitationRecords(mergedPlatforms, triggeredPrompts);
        const allRedditUrls = [...new Set(Object.values(mergedPlatforms)
          .filter(p => p.status === 'ready')
          .flatMap(p => p.redditUrls || []))];
        const summary = { totalRedditUrlsFound: allRedditUrls.length, uniqueRedditUrls: allRedditUrls, platformsComplete: completedPlatforms.size, platformsTotal: snapshots.length };
        setCitationResults({ records, summary, partial: false });

        // Save to 24hr cache
        if (companyId && selectedKw?.term && records.length > 0) {
          apiPost("/api/threadflow/serp-scout", {
            action: "saveCitationCache",
            companyId,
            keyword: selectedKw.term,
            records,
            summary,
          }).catch(() => {});
        }

        if (!silent) {
          const totalPosts = allRedditUrls.length;
          if (totalPosts > 0) {
            toast({ title: "Citation search complete", description: `Found ${totalPosts} Reddit links across ${completedPlatforms.size} AI platforms` });
          } else {
            toast({ title: "Citation search complete", description: "AI platforms did not surface Reddit threads for these prompts." });
          }
        }
      } else if (!silent) {
        toast({ variant: "destructive", title: "Citation search timed out", description: "Partial results shown. Try again or use fewer prompts." });
      }
    } catch (e) {
      if (!silent) {
        const errorMsg = e.message ?? "Citation search failed";
        setError(errorMsg);
        toast({ variant: "destructive", title: "Citation search failed", description: errorMsg });
      }
    } finally {
      if (!silent) setCitationLoading(false);
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

  // Run Analysis — fires all 4 sources simultaneously so each tab fills in as it arrives:
  // 1. serpAndDork (~3s)   → SERP Threads tab
  // 2. redditTopNew (~5s)  → Top + New tabs
  // 3. citations           → Cited tab
  // 4. background metrics  → updates upvotes/comments as fetchPostDetails calls return
  // After 1 & 2 finish: client-side merge Reddit API upvotes into SERP thread posts
  async function handleRunAnalysis() {
    if (!selectedKw) return;
    const kwTerm = selectedKw.term;
    const kwDomain = domain.trim();

    setSerpThreadsLoading(true);
    setRedditPostsLoading(true);
    setError(null);
    setSerpResults(prev => ({ ...prev, [kwTerm]: undefined }));

    const merge = (newData) =>
      setSerpResults(prev => ({
        ...prev,
        [kwTerm]: { ...(prev[kwTerm] || {}), ...newData, success: true },
      }));

    // Background: fetch post details for posts with 0 upvotes/comments and update metrics
    const enrichMetrics = (posts, listKey) => {
      posts
        .filter(p => !(p.upvotes || p.score) && (p.post_url || p.url))
        .forEach(post => {
          const url = post.post_url || post.url;
          apiPost("/api/threadflow/serp-scout", { action: "fetchPostDetails", url })
            .then(details => {
              if (!details) return;
              const upvotes = details.score || details.upvotes || details.ups || 0;
              const total_comments = details.num_comments || details.total_comments || details.comments || 0;
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

    // Helper: silently refresh a stale cached call in the background
    const backgroundRefresh = (action) => {
      apiPost("/api/threadflow/serp-scout", { action, keyword: kwTerm, domain: kwDomain, companyId, force: true })
        .then(data => { if (!data.fromCache) merge(data); })
        .catch(() => {});
    };

    // 1. SERP + dork
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
      .catch(e => console.error("[SERP Scout] serpAndDork failed:", e.message))
      .finally(() => setSerpThreadsLoading(false));

    // 2. Reddit top/new
    const redditPromise = apiPost("/api/threadflow/serp-scout", {
      action: "redditTopNew",
      keyword: kwTerm,
      domain: kwDomain,
      companyId,
    }).then(data => {
      merge(data);
      if (data.stale) {
        backgroundRefresh("redditTopNew");
      } else if (!data.fromCache) {
        enrichMetrics(data.topRedditPosts || [], "topRedditPosts");
        enrichMetrics(data.newRedditPosts || [], "newRedditPosts");
      }
    })
      .catch(e => console.error("[SERP Scout] redditTopNew failed:", e.message))
      .finally(() => setRedditPostsLoading(false));

    // 3. Citations — check 12hr cache first, serve instantly, refresh in background if stale
    if (companyId) {
      apiPost("/api/threadflow/serp-scout", { action: "getCitationCache", companyId, keyword: kwTerm })
        .then(cached => {
          if (cached?.found) {
            setCitationResults({ records: cached.records, summary: cached.summary, partial: false });
            if (cached.stale) handleCitationSearch({ silent: true }); // refresh quietly
          } else {
            handleCitationSearch();
          }
        })
        .catch(() => handleCitationSearch());
    } else {
      handleCitationSearch();
    }

    // 4. After both finish: client-side merge Reddit API upvotes into SERP thread posts
    // (SERP threads come from DataForSEO and have no engagement data — enrich from Reddit API)
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

      {/* Tab navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-7 w-full sm:w-auto sm:flex overflow-x-auto">
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
          {/* Hidden - Generate tab (logic preserved) */}
          <TabsTrigger value="generate" disabled={!saved} className="gap-1.5 hidden">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Generate</span>
          </TabsTrigger>
          {/* Hidden - Compete tab (logic preserved) */}
          <TabsTrigger value="compete" disabled={!saved} className="gap-1.5 hidden">
            <Users className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-xs">Compete</span>
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
                      ? `Welcome back! ${keywords.length} keywords loaded — review and edit below, then run your analysis.`
                      : `${keywords.length} keywords generated. Review your company overview next.`}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs shrink-0"
                    onClick={() => setActiveTab(rawResult?.fromExisting ? "overview" : "overview")}
                  >
                    {rawResult?.fromExisting ? "View Overview" : "Continue"} <ChevronRight className="h-3 w-3 ml-0.5" />
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
            {rawResult?.fromExisting && (
              <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 text-sm">
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">Your saved keywords are ready</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Review, add, or remove keywords below — then head to Analyze when you&apos;re good to go.</p>
                </div>
                <Button size="sm" className="h-7 text-xs shrink-0" onClick={() => setActiveTab("analyze")}>
                  Go to Analyze <ChevronRight className="h-3 w-3 ml-0.5" />
                </Button>
              </div>
            )}
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
          <AnalysisPanel
            companyName={companyName}
            competitors={competitors}
            keywords={keywords}
            selectedKwIds={selectedKwIds}
            selectedKwIdx={selectedKwIdx}
            setSelectedKwIdx={setSelectedKwIdx}
            serpResults={serpResults}
            kwSerpData={kwSerpData}
            serpLoading={serpLoading}
            serpThreadsLoading={serpThreadsLoading}
            redditPostsLoading={redditPostsLoading}
            citationLoading={citationLoading}
            citationResults={citationResults}
            citationPlatformStatus={citationPlatformStatus}
            handleRunAnalysis={handleRunAnalysis}
            analysisLoading={serpThreadsLoading || redditPostsLoading || citationLoading}
            scannedPostDetails={scannedPostDetails}
          />
        </TabsContent>

        {/* ── Tab 6: Generate Posts (HIDDEN - logic preserved) ─────────────────────────*/}
        <TabsContent value="generate" className="mt-6 hidden">
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
        <TabsContent value="compete" className="mt-6 hidden">
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
    </div>
  );
}
