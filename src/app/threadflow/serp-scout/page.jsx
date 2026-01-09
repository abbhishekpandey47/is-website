"use client";

import { useState } from "react";
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
  const [isSaving, setIsSaving] = useState(false);

  const trimmedDomain = domain.trim();
  const selectedKeyword = selectedKeywordIdx !== null ? keywords[selectedKeywordIdx] : null;

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

      const normalizedKeywords = (data.keywords || []).map((keyword) => ({
        ...keyword,
        prompts: Array.isArray(keyword.prompts) ? keyword.prompts : [],
      }));
      setKeywords(normalizedKeywords);

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
    setSuccess("✓ Overview approved! Reviewing keywords...");
    setTimeout(() => {
      setSuccess("");
      setCurrentStep(3);
    }, 1500);
  };

  // STEP 3: Approve keywords (locked, read-only)
  const handleApproveKeywords = () => {
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
          keywords,
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

  const handleTestCitations = async () => {
    if (!selectedKeyword?.prompts?.length) {
      setError("No prompts available for this keyword");
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
          prompts: selectedKeyword.prompts.slice(0, 10),
          domain: trimmedDomain,
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
              { step: 3, label: "Keywords", icon: "⚡" },
              { step: 4, label: "Save", icon: "💾" },
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

          {/* STEP 3: KEYWORDS (EDITABLE) */}
          {!isExistingData && currentStep >= 3 && (
            <Card className={currentStep === 3 ? "border-emerald-500/50 shadow-lg" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>⚡</span> Step 3: Review Keywords
                    </CardTitle>
                    <CardDescription>
                      {keywords.length} keywords - edit and suggest new prompts if needed
                    </CardDescription>
                  </div>
                  {currentStep > 3 && <Check className="h-5 w-5 text-emerald-600" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {keywords.map((keyword, idx) => (
                  <div key={idx} className="rounded-lg border border-border bg-card/50 p-4 space-y-3">
                    {/* Editable keyword fields */}
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={keyword.term}
                        onChange={(e) => handleUpdateKeyword(idx, "term", e.target.value)}
                        className="w-full bg-background border border-border rounded px-2 py-1 text-sm font-semibold"
                      />
                      <select
                        value={keyword.intent}
                        onChange={(e) => handleUpdateKeyword(idx, "intent", e.target.value)}
                        className="w-full bg-background border border-border rounded px-2 py-1 text-xs"
                      >
                        <option value="commercial">Commercial</option>
                        <option value="informational">Informational</option>
                      </select>
                      <textarea
                        value={keyword.why}
                        onChange={(e) => handleUpdateKeyword(idx, "why", e.target.value)}
                        placeholder="Why this keyword matters..."
                        className="w-full bg-background border border-border rounded px-2 py-1 text-xs min-h-[50px]"
                      />
                    </div>

                    {/* Prompts with suggest button */}
                    <div className="pt-2 space-y-2 border-t border-border/30">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground">
                          Prompts ({keyword.prompts.length})
                        </p>
                        {currentStep === 3 && (
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => handleSuggestPrompts(idx)}
                            disabled={suggestingPromptsLoading}
                            className="text-xs h-7"
                          >
                            {suggestingPromptsLoading && suggestingPromptsIdx === idx
                              ? "Suggesting..."
                              : "✨ Suggest Prompts"}
                          </Button>
                        )}
                      </div>

                      <div className="space-y-1">
                        {keyword.prompts.map((prompt, pIdx) => (
                          <div key={pIdx} className="text-xs text-foreground/70 pl-2">
                            {pIdx + 1}. {prompt}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {currentStep === 3 && (
                  <Button onClick={handleApproveKeywords} className="w-full">
                    <Check className="h-4 w-4 mr-2" /> Approve Keywords & Continue
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* STEP 4: SAVE */}
          {!isExistingData && currentStep >= 4 && (
            <Card className={currentStep === 4 ? "border-emerald-500/50 shadow-lg" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>💾</span> Step 4: Save Keywords
                    </CardTitle>
                    <CardDescription>
                      Save keywords permanently to database
                    </CardDescription>
                  </div>
                  {currentStep > 4 && <Check className="h-5 w-5 text-emerald-600" />}
                </div>
              </CardHeader>
              <CardContent>
                {currentStep === 4 && (
                  <Button
                    onClick={handleSaveKeywords}
                    disabled={isSaving}
                    className="w-full"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Keywords Permanently"}
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
                    {keywords.map((keyword, idx) => (
                      <Button
                        key={idx}
                        variant={selectedKeywordIdx === idx ? "default" : "outline"}
                        className="text-left justify-start h-auto py-3 px-4"
                        onClick={() => {
                          setSelectedKeywordIdx(idx);
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
                    <div className="flex gap-2 mb-6 border-b border-border pb-4">
                      <Button
                        variant={analysisTab === "serp" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setAnalysisTab("serp")}
                        className="flex items-center gap-2"
                      >
                        <Search className="h-4 w-4" />
                        SERP Threads
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
                          <div className="space-y-4">
                            <div className="rounded-lg bg-muted/40 border border-border p-4">
                              <p className="text-sm font-semibold mb-2">
                                Position: {keywordSerpData.position || "Not ranked"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Examined {keywordSerpData.examined} results
                                {keywordSerpData.fromCache && " (cached)"}
                              </p>
                            </div>

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
                          </div>
                        )}
                      </div>
                    )}

                    {/* Citations Tab */}
                    {analysisTab === "citations" && (
                      <div className="space-y-4">
                        <Button
                          onClick={handleTestCitations}
                          disabled={citationLoading}
                          className="w-full"
                        >
                          {citationLoading ? "Testing..." : "Test LLM Citations"}
                        </Button>

                        {citationResults && (
                          <div className="space-y-6">
                            {/* Group by prompt */}
                            {selectedKeyword?.prompts?.map((prompt, pIdx) => {
                              const promptResults = citationResults.records?.map(record => {
                                const result = record.results?.find(r => r.prompt === prompt)
                                return {
                                  model: record.model,
                                  timestamp: record.timestamp,
                                  result
                                }
                              }) || []

                              return (
                                <div key={pIdx} className="space-y-3 border-b border-border pb-4 last:border-b-0">
                                  <div className="sticky top-0 bg-card/80 backdrop-blur-sm py-2">
                                    <p className="text-sm font-semibold text-foreground">
                                      {pIdx + 1}. {prompt}
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    {promptResults.map((item, idx) => {
                                      const match = item.result?.matches?.[0]
                                      const rank = match?.ranks?.[0]
                                      const hasMatch = match && rank

                                      return (
                                        <div
                                          key={idx}
                                          className={`rounded-lg border p-3 ${
                                            hasMatch
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
                                            {hasMatch ? (
                                              <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-green-600">
                                                  #{rank}
                                                </span>
                                                <span className="text-xs text-green-600 font-medium">
                                                  ✓ RANKED
                                                </span>
                                              </div>
                                            ) : (
                                              <div className="flex items-center gap-2">
                                                <span className="text-xs text-amber-600 font-medium">
                                                  ✗ NOT FOUND
                                                </span>
                                              </div>
                                            )}
                                          </div>

                                          {/* Show domain details if matched */}
                                          {hasMatch && match?.domain && (
                                            <div className="mt-2 pt-2 border-t border-green-500/20">
                                              <p className="text-xs text-green-700">
                                                📍 Domain: <span className="font-mono font-semibold">{match.domain}</span>
                                              </p>
                                              {match?.cited_urls?.length > 0 && (
                                                <p className="text-xs text-green-700 mt-1">
                                                  🔗 Cited from: {match.cited_urls.join(", ")}
                                                </p>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      )
                                    })}
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
