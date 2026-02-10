"use client";

import { useMemo, useState } from "react";
import { auth } from "@/lib/firebaseClient";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { SidebarTrigger } from "@/Components/ui/sidebar";
import {
  ChevronRight,
  Check,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Search,
  MessageSquare,
  Zap,
} from "lucide-react";

const buildCitationPrompts = (keywordPrompts = [], manualPrompts = []) => {
  const basePrompts = Array.isArray(keywordPrompts) ? keywordPrompts.filter(Boolean) : [];
  const extraPrompts = (Array.isArray(manualPrompts) ? manualPrompts : [])
    .filter(Boolean)
    .filter((prompt) => !basePrompts.includes(prompt));
  return [...basePrompts, ...extraPrompts];
};

const formatDateTime = (value) => {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(value);
  } catch (error) {
    return value.toString();
  }
};

export default function SerpScoutPage() {
  // Flow: 1=domain, 2=overview, 3=keywords (locked), 4=save, 5=analysis
  const [currentStep, setCurrentStep] = useState(1);
  const [analysisTab, setAnalysisTab] = useState(null); // 'citations', 'serp', 'reddit'

  // Form data
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // Keywords and context (read-only after generation)
  const [rawResult, setRawResult] = useState(null);
  const [companyContext, setCompanyContext] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [isKeywordsSaved, setIsKeywordsSaved] = useState(false);
  const [isExistingData, setIsExistingData] = useState(false); // true if loaded from DB

  // Keyword editing (before save)
  const [suggestingPromptsIdx, setSuggestingPromptsIdx] = useState(null);
  const [suggestingPromptsLoading, setSuggestingPromptsLoading] = useState(false);
  const [manualKeywordForm, setManualKeywordForm] = useState({
    term: "",
    intent: "informational",
    why: "",
    prompts: "",
  });
  const [manualPromptInput, setManualPromptInput] = useState({});

  // Company context form
  const [editingContext, setEditingContext] = useState(false);
  const [contextForm, setContextForm] = useState({
    companySummary: "",
    coreCapabilities: [],
    problemSpaces: [],
    constraints: [],
  });

  // Analysis state
  const [selectedKeywordIdx, setSelectedKeywordIdx] = useState(null);
  const [serpResults, setSerpResults] = useState({}); // { [keyword]: { position, redditThreads, ... } }
  const [serpLoading, setSerpLoading] = useState(false);
  const [citationResults, setCitationResults] = useState(null);
  const [citationLoading, setCitationLoading] = useState(false);
  const [manualCitationPrompts, setManualCitationPrompts] = useState([]);
  const [manualCitationInput, setManualCitationInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedKeywordIds, setSelectedKeywordIds] = useState([]);

  const trimmedDomain = domain.trim();
  const maxSelectable = 20;
  const minSelectable = 1;
  const selectedKeyword = selectedKeywordIdx !== null ? keywords[selectedKeywordIdx] : null;
  const getCitationPrompts = () =>
    buildCitationPrompts(selectedKeyword?.prompts, manualCitationPrompts);

  const selectedKeywordEntries = useMemo(
    () =>
      selectedKeywordIds
        .map((id) => (keywords[id] ? { ...keywords[id], _originalIndex: id } : null))
        .filter(Boolean),
    [keywords, selectedKeywordIds]
  );

  const analysisKeywordEntries = useMemo(() => {
    const sourceIds = selectedKeywordIds.length ? selectedKeywordIds : keywords.map((_, idx) => idx);
    return sourceIds
      .map((id) => (keywords[id] ? { ...keywords[id], _originalIndex: id } : null))
      .filter(Boolean);
  }, [keywords, selectedKeywordIds]);

  const toggleKeywordSelection = (idx) => {
    setError("");
    setSelectedKeywordIds((prev) => {
      if (prev.includes(idx)) {
        return prev.filter((id) => id !== idx);
      }
      if (prev.length >= maxSelectable) {
        setError(`You can select up to ${maxSelectable} keywords.`);
        return prev;
      }
      return [...prev, idx];
    });
  };

  // STEP 1: Fetch domain and generate keywords
  const handleFetchDomain = async (e) => {
    e.preventDefault();
    if (!trimmedDomain) return;

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = await auth.currentUser?.getIdToken?.();
      const res = await fetch("/api/threadflow/serp-scout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ domain: trimmedDomain }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error(data.message || "API rate limit exceeded. Please try again later.");
        }
        throw new Error(data.error || "Failed to scout domain");
      }

      setRawResult(data);
      setCompanyContext(data.companyContext);

      const normalizedKeywords = (data.keywords || [])
        .slice(0, 20)
        .map((keyword) => ({
          ...keyword,
          prompts: Array.isArray(keyword.prompts) ? keyword.prompts : [],
        }));
      setKeywords(normalizedKeywords);
      setSelectedKeywordIds(
        normalizedKeywords.slice(0, Math.min(3, normalizedKeywords.length)).map((_, idx) => idx)
      );

      if (data.companyContext?.approvedContext) {
        setContextForm({
          companySummary: data.companyContext.approvedContext.companySummary || "",
          coreCapabilities: data.companyContext.approvedContext.coreCapabilities || [],
          problemSpaces: data.companyContext.approvedContext.problemSpaces || [],
          constraints: data.companyContext.approvedContext.constraints || [],
        });
      }

      // Check if this is existing data from DB
      if (data.fromExisting) {
        setIsExistingData(true);
        setIsKeywordsSaved(true);
        setSuccess("✓ Keywords loaded from database. Ready for analysis.");
        setCurrentStep(5); // Jump to analysis
      } else {
        setIsExistingData(false);
        setSuccess("✓ Keywords generated! Review and save to continue.");
        setCurrentStep(2);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Approve context
  const handleApproveContext = () => {
    setSuccess("✓ Overview approved! Select 1-5 keywords to keep...");
    setTimeout(() => {
      setSuccess("");
      setCurrentStep(3);
    }, 1500);
  };

  // STEP 3: Approve keywords (locked, read-only)
  const handleApproveKeywords = () => {
    if (selectedKeywordIds.length < 1 || selectedKeywordIds.length > 20) {
      setError("Select at least 1 and up to 20 keywords to continue.");
      return;
    }
    setError("");
    setSuccess("✓ Keywords approved! Ready to save...");
    setTimeout(() => {
      setSuccess("");
      setCurrentStep(4);
    }, 1500);
  };

  // STEP 4: Save keywords permanently
  const handleSaveKeywords = async () => {
    setIsSaving(true);
    setError("");
    try {
      const token = await auth.currentUser?.getIdToken?.();
      const res = await fetch("/api/threadflow/serp-scout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action: "saveKeywords",
          companyId: rawResult?.companyId || null,
          domain: trimmedDomain,
          keywords: selectedKeywordIds.map((id) => keywords[id]).filter(Boolean),
          companyName: rawResult?.companyName || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      if (data.companyId && !rawResult?.companyId) {
        setRawResult((prev) => ({ ...prev, companyId: data.companyId }));
      }

      setIsKeywordsSaved(true);
      setSuccess("✓ Keywords saved permanently! Moving to analysis...");
      setTimeout(() => {
        setSuccess("");
        setCurrentStep(5);
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // STEP 5: Analysis - SERP/Reddit/Citations
  const handleAnalyzeSerpForKeyword = async () => {
    if (!selectedKeyword?.term) return;

    setSerpLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken?.();
      const res = await fetch("/api/threadflow/serp-scout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action: "keywordSerp",
          keyword: selectedKeyword.term,
          domain: trimmedDomain,
          companyId: rawResult?.companyId || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch SERP");

      setSerpResults((prev) => ({
        ...prev,
        [selectedKeyword.term]: data,
      }));

      setSuccess(
        data.fromCache
          ? "✓ Loaded cached SERP (updates in 24hrs)"
          : "✓ Fresh SERP analysis complete!"
      );
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSerpLoading(false);
    }
  };

  const handleGeneratePostContent = async () => {
    if (!selectedKeyword?.term) return;

    setGeneratingPosts(true);
    setError("");
    try {
      const token = await auth.currentUser?.getIdToken?.();
      
      // Gather Reddit context from current SERP data
      const redditContext = {
        topPosts: topRedditPosts.slice(0, 5),
        newPosts: newRedditPosts.slice(0, 5)
      };

      const res = await fetch("/api/threadflow/serp-scout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action: "generatePostContent",
          keyword: selectedKeyword.term,
          domain: trimmedDomain,
          companyId: rawResult?.companyId || null,
          redditContext,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate posts");

      setGeneratedPosts(data.posts || []);
      setSuccess("✓ Post content generated with Reddit context!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setGeneratingPosts(false);
    }
  };

  const handleTestCitations = async () => {
    const effectiveDomain =
      trimmedDomain || rawResult?.domain || companyContext?.domain || rawResult?.companyContext?.domain || "";
    const promptsToTest = getCitationPrompts();
    if (!promptsToTest.length) {
      setError("Add at least one prompt before running citation tests.");
      return;
    }
    if (!effectiveDomain) {
      setError("Domain is required to test citations.");
      return;
    }

    setCitationLoading(true);
    try {
      const token = await auth.currentUser?.getIdToken?.();
      const res = await fetch("/api/threadflow/serp-scout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action: "testCitations",
          prompts: promptsToTest.slice(0, 10),
          domain: effectiveDomain,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to test citations");

      setCitationResults(data.citations);
      setSuccess("✓ Citation analysis complete!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setCitationLoading(false);
    }
  };

  // Keyword editing handlers (before save)
  const handleUpdateKeyword = (idx, field, value) => {
    const updated = [...keywords];
    updated[idx] = { ...updated[idx], [field]: value };
    setKeywords(updated);
  };

  const handleAddManualKeyword = () => {
    setError("");
    if (!manualKeywordForm.term.trim()) {
      setError("Keyword term is required.");
      return;
    }
    const prompts = manualKeywordForm.prompts
      .split(/\n|,/)
      .map((entry) => entry.trim())
      .filter(Boolean)
      .slice(0, 10);
    const newKeyword = {
      term: manualKeywordForm.term.trim(),
      intent: manualKeywordForm.intent.trim() || "informational",
      why: manualKeywordForm.why.trim() || "",
      prompts,
    };
    setKeywords((prev) => [...prev, newKeyword]);
    setManualKeywordForm({ term: "", intent: "informational", why: "", prompts: "" });
    setSuccess("✓ Custom keyword added.");
    setTimeout(() => setSuccess(""), 2000);
  };

  const handleAddManualPrompt = (keywordIdx) => {
    const value = manualPromptInput[keywordIdx]?.trim();
    if (!value) return;
    const updated = [...keywords];
    const existing = Array.isArray(updated[keywordIdx].prompts)
      ? updated[keywordIdx].prompts
      : [];
    updated[keywordIdx].prompts = [...existing, value].slice(0, 10);
    setKeywords(updated);
    setManualPromptInput((prev) => ({ ...prev, [keywordIdx]: "" }));
  };

  const handleSuggestPrompts = async (keywordIdx) => {
    const keyword = keywords[keywordIdx];
    if (!keyword.term) {
      setError("Keyword term is required before suggesting prompts");
      return;
    }

    setSuggestingPromptsIdx(keywordIdx);
    setSuggestingPromptsLoading(true);
    setError("");
    try {
      const token = await auth.currentUser?.getIdToken?.();
      const res = await fetch("/api/threadflow/serp-scout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action: "suggestPrompts",
          keyword: keyword.term,
          intent: keyword.intent,
          companyName: rawResult?.companyName || domain,
          domain: trimmedDomain,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to suggest prompts");

      const updated = [...keywords];
      updated[keywordIdx].prompts = data.prompts || [];
      setKeywords(updated);

      setSuccess("✓ New prompts suggested!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSuggestingPromptsLoading(false);
      setSuggestingPromptsIdx(null);
    }
  };

  const keywordSerpData = selectedKeyword ? serpResults[selectedKeyword.term] : null;
  const topRedditPosts = useMemo(
    () => keywordSerpData?.topRedditPosts || [],
    [keywordSerpData]
  );
  const newRedditPosts = useMemo(
    () => keywordSerpData?.newRedditPosts || [],
    [keywordSerpData]
  );
  const suggestedPosts = useMemo(
    () => keywordSerpData?.suggestedPosts || [],
    [keywordSerpData]
  );
  const citationPrompts = getCitationPrompts();
  const citationDomain = useMemo(() => {
    if (citationResults?.domain) return citationResults.domain;
    if (trimmedDomain) return trimmedDomain.replace(/^https?:\/\//i, '').replace(/\/$/, '');
    return '';
  }, [citationResults, trimmedDomain]);

  const citationSummary = useMemo(() => {
    if (!citationResults?.records?.length) return null;
    const records = citationResults.records;
    const summary = {
      total: records.length,
      citedByTarget: 0,
      citedByReddit: 0,
      providers: []
    };
    records.forEach((record) => {
      const targetCited = record.results?.some((result) =>
        result.matches?.some((match) => match.domain === citationDomain)
      );
      const redditCited = record.results?.some((result) =>
        result.matches?.some((match) => match.domain?.includes('reddit.com'))
      );
      summary.providers.push({
        model: record.model,
        targetCited: Boolean(targetCited),
        redditCited: Boolean(redditCited)
      });
      if (targetCited) summary.citedByTarget += 1;
      if (redditCited) summary.citedByReddit += 1;
    });
    return summary;
  }, [citationResults, citationDomain]);
  
  // Post content generation state
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [generatingPosts, setGeneratingPosts] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-semibold">SERP Scout</h1>
              <p className="text-sm text-muted-foreground">
                Generate keywords → Save → Analyze SERP, Citations & Reddit
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {isExistingData ? "🔒 Saved Data - Analysis Only" : `Step ${currentStep} of 5`}
          </Badge>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* STEP INDICATOR */}
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 p-4 overflow-x-auto">
            {[
              { step: 1, label: "Domain", icon: "🌐" },
              { step: 2, label: "Overview", icon: "📋" },
              { step: 3, label: "Select Keywords", icon: "⚡" },
              { step: 4, label: "Prompts & Save", icon: "💾" },
              { step: 5, label: "Analyze", icon: "🔍" },
            ].map((item, idx) => (
              <div key={item.step} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition ${
                    currentStep >= item.step
                      ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/50"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {currentStep > item.step ? <Check className="h-5 w-5" /> : item.step}
                </div>
                <p className="text-xs font-medium hidden sm:block whitespace-nowrap">
                  {item.label}
                </p>
                {idx < 4 && (
                  <ChevronRight
                    className={`h-4 w-4 flex-shrink-0 ${
                      currentStep > item.step ? "text-emerald-500" : "text-muted-foreground"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ERROR & SUCCESS */}
          {error && (
            <div className="rounded-lg border border-red-400/50 bg-red-500/10 p-4 flex gap-3 items-start">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-700">Error</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-green-400/50 bg-green-500/10 p-4 flex gap-3 items-start">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* STEP 1: DOMAIN */}
          {currentStep >= 1 && (
            <Card className={currentStep === 1 ? "border-emerald-500/50 shadow-lg" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🌐</span> Step 1: Enter Domain
                </CardTitle>
                <CardDescription>
                  Analyze your domain to generate strategic keywords and market positioning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleFetchDomain} className="flex flex-col gap-3">
                  <Input
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    disabled={loading || currentStep > 1 || isExistingData}
                    className="text-base"
                  />
                  {currentStep === 1 && !isExistingData && (
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? "Analyzing..." : "Fetch Domain & Generate Keywords"}
                    </Button>
                  )}
                </form>
                {currentStep > 1 && (
                  <div className={`rounded-lg border p-3 flex items-center gap-2 ${
                    isExistingData 
                      ? "bg-blue-500/10 border-blue-500/30" 
                      : "bg-emerald-500/10 border-emerald-500/30"
                  }`}>
                    {isExistingData ? (
                      <>
                        <span className="text-lg">🔒</span>
                        <p className="text-sm font-medium text-blue-700">
                          Domain loaded from database: {trimmedDomain}
                        </p>
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        <p className="text-sm text-emerald-700 font-medium">
                          Domain analyzed: {trimmedDomain}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* STEP 2: OVERVIEW */}
          {!isExistingData && currentStep >= 2 && companyContext && (
            <Card className={currentStep === 2 ? "border-emerald-500/50 shadow-lg" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>📋</span> Step 2: Company Overview
                    </CardTitle>
                    <CardDescription>
                      Review AI-generated company analysis
                    </CardDescription>
                  </div>
                  {currentStep > 2 && <Check className="h-5 w-5 text-emerald-600" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!editingContext ? (
                  <>
                    <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-2">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                        Summary
                      </p>
                      <p className="text-sm leading-relaxed">
                        {contextForm.companySummary || "No summary"}
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground">
                          Capabilities ({contextForm.coreCapabilities.length})
                        </p>
                        <ul className="space-y-1">
                          {contextForm.coreCapabilities.map((cap, idx) => (
                            <li key={idx} className="text-sm">• {cap}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground">
                          Problems ({contextForm.problemSpaces.length})
                        </p>
                        <ul className="space-y-1">
                          {contextForm.problemSpaces.map((prob, idx) => (
                            <li key={idx} className="text-sm">• {prob}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {currentStep === 2 && (
                      <Button onClick={handleApproveContext} className="w-full">
                        <Check className="h-4 w-4 mr-2" /> Approve & Continue
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold">Summary</label>
                      <Textarea
                        value={contextForm.companySummary}
                        onChange={(e) =>
                          setContextForm((prev) => ({
                            ...prev,
                            companySummary: e.target.value,
                          }))
                        }
                        className="min-h-[80px]"
                      />
                    </div>
                    <Button onClick={handleApproveContext} className="w-full">
                      Save & Continue
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* STEP 3: KEYWORDS (SELECT 1-5) */}
          {!isExistingData && currentStep >= 3 && (
            <Card className={currentStep === 3 ? "border-emerald-500/50 shadow-lg" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>⚡</span> Step 3: Select Keywords
                    </CardTitle>
                    <CardDescription>
                      Choose at least 1 and up to 20 keywords from the list below.
                    </CardDescription>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Selected {selectedKeywordIds.length}/{maxSelectable}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {keywords.map((keyword, idx) => {
                    const isChecked = selectedKeywordIds.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleKeywordSelection(idx)}
                        className={`cursor-pointer rounded-lg border transition-all ${
                          isChecked
                            ? "border-emerald-500 bg-emerald-500/10 shadow-md"
                            : "border-border bg-card/50 hover:border-emerald-400/50 hover:bg-card"
                        } p-3 space-y-2`}
                      >
                        <div className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleKeywordSelection(idx)}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-0.5 h-4 w-4 accent-emerald-600 cursor-pointer flex-shrink-0"
                            aria-label={`Select ${keyword.term}`}
                          />
                          <div className="flex-1 min-w-0 space-y-1">
                            <p className="text-sm font-semibold text-foreground" title={keyword.term}>
                              {keyword.term}
                            </p>
                            <p className="text-[10px] text-muted-foreground line-clamp-2" title={keyword.why}>
                              {keyword.why}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {currentStep === 3 && (
                  <Button onClick={handleApproveKeywords} className="w-full">
                    <Check className="h-4 w-4 mr-2" /> Continue to Prompts
                  </Button>
                )}

                <div className="rounded-lg border border-border bg-card/40 p-4 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Zap className="h-4 w-4 text-emerald-500" /> Add a custom keyword
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Input
                      placeholder="Keyword term"
                      value={manualKeywordForm.term}
                      onChange={(e) =>
                        setManualKeywordForm((prev) => ({ ...prev, term: e.target.value }))
                      }
                    />
                    <Input
                      placeholder="Intent (informational/commercial/navigational)"
                      value={manualKeywordForm.intent}
                      onChange={(e) =>
                        setManualKeywordForm((prev) => ({ ...prev, intent: e.target.value }))
                      }
                    />
                  </div>
                  <Textarea
                    placeholder="Why this keyword matters (optional)"
                    value={manualKeywordForm.why}
                    onChange={(e) =>
                      setManualKeywordForm((prev) => ({ ...prev, why: e.target.value }))
                    }
                    className="min-h-[70px]"
                  />
                  <Textarea
                    placeholder="Add prompts (one per line or comma-separated)"
                    value={manualKeywordForm.prompts}
                    onChange={(e) =>
                      setManualKeywordForm((prev) => ({ ...prev, prompts: e.target.value }))
                    }
                    className="min-h-[90px]"
                  />
                  <Button variant="outline" onClick={handleAddManualKeyword}>
                    Add Keyword
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 4: PROMPTS & SAVE */}
          {!isExistingData && currentStep >= 4 && (
            <Card className={currentStep === 4 ? "border-emerald-500/50 shadow-lg" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>💾</span> Step 4: Prompts & Save
                    </CardTitle>
                    <CardDescription>
                      Suggest prompts for your selected keywords, then save.
                    </CardDescription>
                  </div>
                  {currentStep > 4 && <Check className="h-5 w-5 text-emerald-600" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedKeywordEntries.length === 0 && (
                  <div className="text-sm text-amber-600 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    Select 1-20 keywords first to request prompts.
                  </div>
                )}

                {selectedKeywordEntries.map((keyword) => (
                  <div key={keyword._originalIndex} className="rounded-lg border border-border bg-card/40 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{keyword.term}</p>
                        <p className="text-[11px] text-muted-foreground">{keyword.intent}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleSuggestPrompts(keyword._originalIndex)}
                        disabled={suggestingPromptsLoading}
                        className="text-xs h-7"
                      >
                        {suggestingPromptsLoading && suggestingPromptsIdx === keyword._originalIndex
                          ? "Suggesting..."
                          : "✨ Suggest Prompts"}
                      </Button>
                    </div>

                    <div className="space-y-1">
                      {keyword.prompts?.length ? (
                        keyword.prompts.map((prompt, pIdx) => (
                          <div key={pIdx} className="text-xs text-foreground/80 pl-2">
                            {pIdx + 1}. {prompt}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground">No prompts yet. Click suggest.</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center">
                      <Input
                        placeholder="Add a custom prompt"
                        value={manualPromptInput[keyword._originalIndex] || ""}
                        onChange={(e) =>
                          setManualPromptInput((prev) => ({
                            ...prev,
                            [keyword._originalIndex]: e.target.value,
                          }))
                        }
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddManualPrompt(keyword._originalIndex)}
                      >
                        Add Prompt
                      </Button>
                    </div>
                  </div>
                ))}

                {currentStep === 4 && (
                  <Button
                    onClick={handleSaveKeywords}
                    disabled={isSaving || selectedKeywordEntries.length === 0}
                    className="w-full"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Selected Keywords"}
                  </Button>
                )}
                {isKeywordsSaved && (
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4 text-center">
                    <p className="text-sm font-semibold text-emerald-700">
                      ✓ Keywords saved! Ready for analysis.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* STEP 5: ANALYSIS */}
          {currentStep >= 5 && (
            <div className="space-y-6">
              {/* Keyword Selector */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🔍</span> Step 5: Analyze Keywords
                  </CardTitle>
                  <CardDescription>
                    Select a keyword to search SERP, citations, and Reddit mentions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {analysisKeywordEntries.map((keyword) => (
                      <Button
                        key={keyword._originalIndex}
                        variant={selectedKeywordIdx === keyword._originalIndex ? "default" : "outline"}
                        className="text-left justify-start h-auto py-3 px-4"
                        onClick={() => {
                          setSelectedKeywordIdx(keyword._originalIndex);
                          setAnalysisTab(null);
                        }}
                      >
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-sm">{keyword.term}</p>
                          <p className="text-xs text-muted-foreground">{keyword.intent}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Tabs */}
              {selectedKeyword && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Analysis for: <span className="text-emerald-600">{selectedKeyword.term}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Tab Buttons */}
                    <div className="flex gap-2 mb-6 border-b border-border pb-4 overflow-x-auto">
                      <Button
                        variant={analysisTab === "serp" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setAnalysisTab("serp")}
                        className="flex items-center gap-2"
                      >
                        <Search className="h-4 w-4" />
                        SERP & Reddit
                      </Button>
                      <Button
                        variant={analysisTab === "postContent" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setAnalysisTab("postContent")}
                        className="flex items-center gap-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Post Content
                      </Button>
                      <Button
                        variant={analysisTab === "citations" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setAnalysisTab("citations")}
                        className="flex items-center gap-2"
                      >
                        <Sparkles className="h-4 w-4" />
                        Citations
                      </Button>
                    </div>

                    {/* SERP Tab */}
                    {analysisTab === "serp" && (
                      <div className="space-y-4">
                        <Button
                          onClick={handleAnalyzeSerpForKeyword}
                          disabled={serpLoading}
                          className="w-full"
                        >
                          {serpLoading ? "Analyzing..." : "Search SERP & Reddit"}
                        </Button>

                        {keywordSerpData && (
                          <div className="space-y-6">
                            <div className="rounded-lg bg-muted/40 border border-border p-4">
                              <p className="text-sm font-semibold mb-2">
                                Position: {keywordSerpData.position || "Not ranked"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Examined {keywordSerpData.examined} results
                                {keywordSerpData.fromCache && " (cached)"}
                              </p>
                            </div>

                            {/* SERP Reddit Threads */}
                            {keywordSerpData.redditThreads?.length > 0 && (
                              <div className="space-y-3">
                                <p className="text-sm font-semibold flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4" />
                                  {keywordSerpData.redditThreads.length} Reddit Threads Found
                                </p>
                                {keywordSerpData.redditThreads.slice(0, 5).map((thread, idx) => (
                                  <div key={idx} className="rounded-lg border border-border/50 bg-card/30 p-3 space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                      <p className="font-semibold text-sm text-foreground">
                                        #{thread.position} {thread.title}
                                      </p>
                                    </div>
                                    <p className="text-xs text-foreground/70 line-clamp-2">
                                      {thread.snippet}
                                    </p>
                                    <a
                                      href={thread.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs text-emerald-600 hover:underline"
                                    >
                                      View thread →
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}

                            {keywordSerpData.redditThreads?.length === 0 && (
                              <p className="text-sm text-muted-foreground italic">
                                No Reddit threads found in top Google results for this keyword
                              </p>
                            )}

                            {/* Top Reddit Posts */}
                            {topRedditPosts.length > 0 && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">🔥</span>
                                  <p className="text-sm font-semibold">Top Reddit Posts ({topRedditPosts.length})</p>
                                </div>
                                {topRedditPosts.map((post, idx) => (
                                  <div key={idx} className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4 space-y-2">
                                    <p className="text-sm font-semibold text-foreground">
                                      {post.post_title || `Post #${idx + 1}`}
                                    </p>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                      {(post.post_content || '').slice(0, 150)}...
                                    </p>
                                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                                      <span>r/{post.subreddit}</span>
                                      <span>•</span>
                                      <span>↑ {post.upvotes || 0}</span>
                                      <span>•</span>
                                      <span>💬 {post.total_comments || 0}</span>
                                    </div>
                                    <a
                                      href={post.post_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs text-orange-600 hover:underline inline-flex items-center gap-1"
                                    >
                                      View on Reddit →
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* New Reddit Posts */}
                            {newRedditPosts.length > 0 && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">🆕</span>
                                  <p className="text-sm font-semibold">New Reddit Posts ({newRedditPosts.length})</p>
                                </div>
                                {newRedditPosts.map((post, idx) => (
                                  <div key={idx} className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 space-y-2">
                                    <p className="text-sm font-semibold text-foreground">
                                      {post.post_title || `Post #${idx + 1}`}
                                    </p>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                      {(post.post_content || '').slice(0, 150)}...
                                    </p>
                                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                                      <span>r/{post.subreddit}</span>
                                      <span>•</span>
                                      <span>↑ {post.upvotes || 0}</span>
                                      <span>•</span>
                                      <span>💬 {post.total_comments || 0}</span>
                                      <span>•</span>
                                      <span>{post.post_age_hours}h ago</span>
                                    </div>
                                    <a
                                      href={post.post_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
                                    >
                                      View on Reddit →
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* AI-Suggested Posts */}
                            {suggestedPosts.length > 0 && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">✨</span>
                                  <p className="text-sm font-semibold">AI-Suggested Posts to Engage ({suggestedPosts.length})</p>
                                </div>
                                <p className="text-xs text-muted-foreground italic">
                                  These posts were selected by AI based on your company context and engagement potential
                                </p>
                                {suggestedPosts.map((post, idx) => (
                                  <div key={idx} className="rounded-lg border-2 border-emerald-500/40 bg-emerald-500/10 p-4 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                      <p className="text-sm font-semibold text-foreground flex-1">
                                        {post.post_title || `Post #${idx + 1}`}
                                      </p>
                                      {post.engagementScore && (
                                        <span className="px-2 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                                          {post.engagementScore}/10
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-foreground/80 line-clamp-2">
                                      {(post.post_content || '').slice(0, 150)}...
                                    </p>
                                    {post.engagementReason && (
                                      <div className="rounded bg-emerald-950/20 p-2 space-y-1">
                                        <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Why Engage</p>
                                        <p className="text-xs text-emerald-900">{post.engagementReason}</p>
                                      </div>
                                    )}
                                    {post.engagementStrategy && (
                                      <div className="rounded bg-amber-950/20 p-2 space-y-1">
                                        <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider">Strategy</p>
                                        <p className="text-xs text-amber-900">{post.engagementStrategy}</p>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-2 border-t border-emerald-500/20">
                                      <span>r/{post.subreddit}</span>
                                      <span>•</span>
                                      <span>↑ {post.upvotes || 0}</span>
                                      <span>•</span>
                                      <span>💬 {post.total_comments || 0}</span>
                                    </div>
                                    <a
                                      href={post.post_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-600 inline-flex items-center gap-1"
                                    >
                                      Engage on Reddit →
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Post Content Tab */}
                    {analysisTab === "postContent" && (
                      <div className="space-y-4">
                        <Button
                          onClick={handleGeneratePostContent}
                          disabled={generatingPosts}
                          className="w-full"
                        >
                          {generatingPosts ? "Generating..." : "Generate Post Ideas"}
                        </Button>

                        {generatedPosts.length > 0 && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-lg">📝</span>
                              <p className="text-sm font-semibold">AI-Generated Post Content ({generatedPosts.length})</p>
                            </div>
                            <p className="text-xs text-muted-foreground italic mb-4">
                              Ready-to-post content ideas tailored to your keyword and company context
                            </p>
                            {generatedPosts.map((post, idx) => (
                              <div key={idx} className="rounded-lg border-2 border-blue-500/40 bg-blue-500/5 p-4 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-sm font-semibold text-foreground flex-1">
                                    {post.title}
                                  </p>
                                  {post.subreddit && (
                                    <span className="px-2 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                                      r/{post.subreddit}
                                    </span>
                                  )}
                                </div>
                                <div className="bg-background rounded p-3 space-y-2">
                                  <p className="text-xs text-foreground/90 whitespace-pre-wrap">
                                    {post.content}
                                  </p>
                                </div>
                                {post.rationale && (
                                  <div className="rounded bg-blue-950/20 p-2 space-y-1">
                                    <p className="text-[10px] font-semibold text-blue-700 uppercase tracking-wider">Why This Works</p>
                                    <p className="text-xs text-blue-900">{post.rationale}</p>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 pt-2 border-t border-blue-500/20">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      navigator.clipboard.writeText(post.content);
                                      setSuccess("✓ Copied to clipboard!");
                                      setTimeout(() => setSuccess(""), 2000);
                                    }}
                                    className="text-xs"
                                  >
                                    Copy Post
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Citations Tab */}
                    {analysisTab === "citations" && (
                      <div className="space-y-4">
                          <p className="text-[11px] text-muted-foreground">
                            Step 4 prompts are used by default.
                          </p>
                          {citationPrompts.length ? (
                            <div className="flex flex-wrap gap-2">
                              {citationPrompts.map((prompt, idx) => (
                                <span
                                  key={`${prompt}-${idx}`}
                                  className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-700"
                                >
                                  {prompt}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              Prompts from Step 4 are listed here automatically; add one above only if you need a custom test.
                            </p>
                          )}
                          <Button
                            onClick={handleTestCitations}
                            disabled={citationLoading}
                            className="w-full"
                          >
                          {citationLoading ? "Testing..." : "Test Reddit Citations"}
                        </Button>

                        {citationResults && (
                          <div className="space-y-6">
                            {citationSummary && (
                              <div className="rounded-lg border border-border bg-card/40 p-4 space-y-3">
                                <div className="flex flex-wrap items-center gap-3">
                                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                                    Citation Summary
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {citationSummary.total} model runs
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                  <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-700">
                                    {citationDomain || 'Target domain'} cited in {citationSummary.citedByTarget}/{citationSummary.total}
                                  </div>
                                  <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-700">
                                    Reddit cited in {citationSummary.citedByReddit}/{citationSummary.total}
                                  </div>
                                </div>
                              </div>
                            )}
                            {/* Group by prompt */}
                            {citationPrompts.map((prompt, pIdx) => {
                              const promptResults =
                                citationResults.records
                                  ?.map((record) => {
                                    const result = record.results?.find((r) => r.prompt === prompt);
                                    if (!result) return null;
                                    const targetMatch = result.matches?.find((m) => m.domain === citationDomain);
                                    const redditMatch = result.matches?.find((m) =>
                                      m.domain?.toLowerCase().includes("reddit.com")
                                    );
                                    if (!targetMatch && !redditMatch) return null;
                                    return {
                                      model: record.model,
                                      timestamp: record.timestamp,
                                      result,
                                      targetMatch,
                                      redditMatch
                                    };
                                  })
                                  .filter(Boolean) || [];

                              return (
                                <div key={pIdx} className="space-y-3 border-b border-border pb-4 last:border-b-0">
                                  <div className="sticky top-0 bg-card/80 backdrop-blur-sm py-2">
                                    <p className="text-sm font-semibold text-foreground">
                                      {pIdx + 1}. {prompt}
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    {promptResults.map((item, idx) => {
                                      const targetRank = item.targetMatch?.ranks?.[0];
                                      const redditRank = item.redditMatch?.ranks?.[0];
                                      const hasTarget = Boolean(item.targetMatch);
                                      const hasReddit = Boolean(item.redditMatch);

                                      return (
                                        <div
                                          key={idx}
                                          className={`rounded-lg border p-3 ${
                                            hasTarget || hasReddit
                                              ? "border-green-500/30 bg-green-500/5"
                                              : "border-amber-500/30 bg-amber-500/5"
                                          }`}
                                        >
                                          <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                                {item.model}
                                              </p>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2">
                                              {hasTarget ? (
                                                <span className="rounded-full bg-emerald-600/10 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                                                  {citationDomain || 'Target'} #{targetRank || '—'}
                                                </span>
                                              ) : (
                                                <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-semibold text-amber-700">
                                                  Target not cited
                                                </span>
                                              )}
                                              {hasReddit ? (
                                                <span className="rounded-full bg-orange-500/10 px-2 py-1 text-[10px] font-semibold text-orange-700">
                                                  Reddit #{redditRank || '—'}
                                                </span>
                                              ) : (
                                                <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground">
                                                  Reddit not cited
                                                </span>
                                              )}
                                            </div>
                                          </div>

                                          {(hasTarget || hasReddit) && (
                                            <div className="mt-3 grid gap-2 md:grid-cols-2">
                                              {hasTarget && (
                                                <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs text-emerald-800">
                                                  <p className="font-semibold">Target cited</p>
                                                  <p className="font-mono text-[11px]">{item.targetMatch.domain}</p>
                                                  {item.targetMatch.cited_urls?.length > 0 && (
                                                    <p className="mt-1 break-words">
                                                      {item.targetMatch.cited_urls.join(", ")}
                                                    </p>
                                                  )}
                                                </div>
                                              )}
                                              {hasReddit && (
                                                <div className="rounded-md border border-orange-500/30 bg-orange-500/10 p-2 text-xs text-orange-800">
                                                  <p className="font-semibold">Reddit cited</p>
                                                  <p className="font-mono text-[11px]">{item.redditMatch.domain}</p>
                                                  {item.redditMatch.cited_urls?.length > 0 && (
                                                    <p className="mt-1 break-words">
                                                      {item.redditMatch.cited_urls.join(", ")}
                                                    </p>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      )
                                    })}

                                    {!promptResults.length && (
                                      <p className="text-xs text-muted-foreground italic">
                                        No Reddit citations found for this prompt.
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {!citationResults && !citationLoading && (
                          <p className="text-sm text-muted-foreground italic text-center py-6">
                            Click "Test LLM Citations" to analyze ranking potential
                          </p>
                        )}
                      </div>
                    )}

                    {!analysisTab && (
                      <p className="text-sm text-muted-foreground text-center py-6">
                        Select a tab above to start analysis
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
