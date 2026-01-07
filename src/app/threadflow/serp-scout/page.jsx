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
  Target,
  Edit2,
  Save,
  AlertCircle,
  CheckCircle,
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
  // Step tracking: 1=domain, 2=overview, 3=keywords, 4=save/test
  const [currentStep, setCurrentStep] = useState(1);

  // Form data
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // Step 1 results
  const [rawResult, setRawResult] = useState(null);
  const [companyContext, setCompanyContext] = useState(null);

  // Step 2: Company context editing
  const [editingContext, setEditingContext] = useState(false);
  const [contextForm, setContextForm] = useState({
    companySummary: "",
    coreCapabilities: [],
    problemSpaces: [],
    constraints: [],
  });

  // Step 3: Keywords
  const [keywords, setKeywords] = useState([]);
  const [editingKeywordIdx, setEditingKeywordIdx] = useState(null);
  const [suggestingPrompts, setSuggestingPrompts] = useState(false);

  // Step 4: Save/Test
  const [isSaving, setIsSaving] = useState(false);
  const [testingCitations, setTestingCitations] = useState(false);
  const [citationResults, setCitationResults] = useState(null);

  const trimmedDomain = domain.trim();

  // STEP 1: Fetch domain
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
        // Handle rate limit errors with user-friendly message
        if (res.status === 429) {
          throw new Error(
            data.message || "API rate limit exceeded. Please try again later.",
          );
        }
        throw new Error(data.error || "Failed to scout domain");
      }

      setRawResult(data);
      console.log("[frontend] After domain fetch, rawResult contains:", {
        companyName: data.companyName,
        companyId: data.companyId,
        domain: data.domain,
      });
      setCompanyContext(data.companyContext);
      setKeywords(data.keywords || []);

      // Explicitly ensure companyName is available for later use
      if (data.companyName) {
        console.log("[frontend] ✓ Company name captured:", data.companyName);
      } else {
        console.warn("[frontend] ⚠️  No company name in response");
      }

      // Initialize context form for editing
      if (data.companyContext?.approvedContext) {
        setContextForm({
          companySummary:
            data.companyContext.approvedContext.companySummary || "",
          coreCapabilities:
            data.companyContext.approvedContext.coreCapabilities || [],
          problemSpaces:
            data.companyContext.approvedContext.problemSpaces || [],
          constraints: data.companyContext.approvedContext.constraints || [],
        });
      }

      setSuccess("✓ Domain fetched successfully");
      setCurrentStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Approve or edit company context
  const handleApproveContext = async () => {
    setSuccess("✓ Company overview approved! Moving to keywords...");
    setTimeout(() => {
      setSuccess("");
      setCurrentStep(3);
    }, 1500);
  };

  const handleEditContextField = (field, value) => {
    setContextForm((prev) => ({ ...prev, [field]: value }));
  };

  // STEP 3: Review/edit keywords
  const handleApproveKeywords = () => {
    setSuccess("✓ Keywords approved! Ready to save...");
    setTimeout(() => {
      setSuccess("");
      setCurrentStep(4);
    }, 1500);
  };

  const handleEditKeyword = (idx) => {
    setEditingKeywordIdx(idx);
  };

  const handleUpdateKeyword = (idx, field, value) => {
    const updated = [...keywords];
    updated[idx] = { ...updated[idx], [field]: value };
    setKeywords(updated);
  };

  const handleUpdatePrompt = (keywordIdx, promptIdx, value) => {
    const updated = [...keywords];
    updated[keywordIdx].prompts[promptIdx] = value;
    setKeywords(updated);
  };

  const handleSuggestNewPrompts = async (keywordIdx) => {
    const keyword = keywords[keywordIdx];
    if (!keyword.term) {
      setError("Please enter a keyword term first");
      return;
    }

    setSuggestingPrompts(true);
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
          companyName: rawResult?.companyName || trimmedDomain,
          domain: trimmedDomain,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error(
            data.message || "API rate limit exceeded. Please try again later.",
          );
        }
        throw new Error(data.error || "Failed to suggest prompts");
      }

      // Update the keyword with new prompts
      const updated = [...keywords];
      updated[keywordIdx].prompts = data.prompts || [];
      setKeywords(updated);
      setSuccess("✓ New prompts suggested!");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSuggestingPrompts(false);
    }
  };

  // STEP 4: Save keywords and test citations
  const handleSaveKeywords = async () => {
    console.log('[frontend] Saving keywords with:', { 
      companyId: rawResult?.companyId, 
      companyName: rawResult?.companyName,
      domain: trimmedDomain,
      keywordCount: keywords.length 
    })
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

      // Update rawResult with new companyId if created
      if (data.companyId && !rawResult?.companyId) {
        setRawResult((prev) => ({ ...prev, companyId: data.companyId }));
      }

      setSuccess(data.message || "✓ Keywords saved successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestCitations = async () => {
    const allPrompts = keywords.flatMap((kw) => kw.prompts || []);
    if (!allPrompts.length) {
      setError("No prompts to test");
      return;
    }

    setTestingCitations(true);
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
          prompts: allPrompts.slice(0, 10),
          domain: trimmedDomain,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to test");

      setCitationResults(data.citations);
      setSuccess("✓ Citation test completed!");
    } catch (err) {
      setError(err.message);
    } finally {
      setTestingCitations(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-semibold">Serp Scout</h1>
              <p className="text-sm text-muted-foreground">
                Sequential domain analysis: fetch → review → approve → save
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Step {currentStep} of 4
          </Badge>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* STEP INDICATOR */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-4">
            {[
              { step: 1, label: "Domain", icon: "🌐" },
              { step: 2, label: "Overview", icon: "📋" },
              { step: 3, label: "Keywords", icon: "⚡" },
              { step: 4, label: "Save", icon: "💾" },
            ].map((item, idx) => (
              <div key={item.step} className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition ${
                    currentStep >= item.step
                      ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/50"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {currentStep > item.step ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    item.step
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium">{item.label}</p>
                </div>
                {idx < 3 && (
                  <ChevronRight
                    className={`h-4 w-4 ${currentStep > item.step ? "text-emerald-500" : "text-muted-foreground"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ERROR ALERT */}
          {error && (
            <div className="rounded-lg border border-red-400/50 bg-red-500/10 p-4 flex gap-3 items-start">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-700">Error</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* SUCCESS ALERT */}
          {success && (
            <div className="rounded-lg border border-green-400/50 bg-green-500/10 p-4 flex gap-3 items-start">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* STEP 1: DOMAIN INPUT */}
          {currentStep >= 1 && (
            <Card
              className={
                currentStep === 1 ? "border-emerald-500/50 shadow-lg" : ""
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🌐</span> Step 1: Enter Domain
                </CardTitle>
                <CardDescription>
                  Paste a landing page URL to analyze company positioning and
                  generate strategic keywords
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form
                  onSubmit={handleFetchDomain}
                  className="flex flex-col gap-3"
                >
                  <Input
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    disabled={loading || currentStep > 1}
                    className="text-base"
                  />
                  {currentStep === 1 && (
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? "Analyzing..." : "Fetch Domain & Analyze"}
                    </Button>
                  )}
                </form>
                {currentStep > 1 && (
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <p className="text-sm text-emerald-700 font-medium">
                      Domain analyzed: {trimmedDomain}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* STEP 2: COMPANY CONTEXT REVIEW */}
          {currentStep >= 2 && companyContext && (
            <Card
              className={
                currentStep === 2 ? "border-emerald-500/50 shadow-lg" : ""
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>📋</span> Step 2: Review Company Overview
                    </CardTitle>
                    <CardDescription>
                      AI-generated analysis from landing page. Approve or edit
                      before proceeding.
                    </CardDescription>
                  </div>
                  {currentStep > 2 && (
                    <Check className="h-5 w-5 text-emerald-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!editingContext ? (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-2">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                        Company Summary
                      </p>
                      <p className="text-sm leading-relaxed">
                        {contextForm.companySummary || "No summary available"}
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-2">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                          Core Capabilities (
                          {contextForm.coreCapabilities.length})
                        </p>
                        <ul className="space-y-1">
                          {contextForm.coreCapabilities.map((cap, idx) => (
                            <li key={idx} className="text-sm text-foreground">
                              • {cap}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-2">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                          Problem Spaces ({contextForm.problemSpaces.length})
                        </p>
                        <ul className="space-y-1">
                          {contextForm.problemSpaces.map((prob, idx) => (
                            <li key={idx} className="text-sm text-foreground">
                              • {prob}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {currentStep === 2 && (
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => setEditingContext(true)}
                          variant="outline"
                          className="flex-1"
                        >
                          <Edit2 className="h-4 w-4 mr-2" /> Edit
                        </Button>
                        <Button
                          onClick={handleApproveContext}
                          className="flex-1"
                        >
                          <Check className="h-4 w-4 mr-2" /> Looks Good,
                          Continue
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                        Company Summary
                      </label>
                      <Textarea
                        value={contextForm.companySummary}
                        onChange={(e) =>
                          handleEditContextField(
                            "companySummary",
                            e.target.value,
                          )
                        }
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => setEditingContext(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Done Editing
                      </Button>
                      <Button onClick={handleApproveContext} className="flex-1">
                        <Check className="h-4 w-4 mr-2" /> Save & Continue
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* STEP 3: KEYWORDS REVIEW */}
          {currentStep >= 3 && keywords.length > 0 && (
            <Card
              className={
                currentStep === 3 ? "border-emerald-500/50 shadow-lg" : ""
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>⚡</span> Step 3: Review Keywords & Prompts
                    </CardTitle>
                    <CardDescription>
                      {keywords.length} keywords with 5 prompts each. Edit or
                      approve to save.
                    </CardDescription>
                  </div>
                  {currentStep > 3 && (
                    <Check className="h-5 w-5 text-emerald-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {keywords.map((keyword, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-border bg-card/50 p-4 space-y-3"
                  >
                    {editingKeywordIdx === idx ? (
                      <div className="space-y-3">
                        <Input
                          value={keyword.term}
                          onChange={(e) =>
                            handleUpdateKeyword(idx, "term", e.target.value)
                          }
                          placeholder="Keyword"
                          className="font-semibold"
                        />
                        <Input
                          value={keyword.intent}
                          onChange={(e) =>
                            handleUpdateKeyword(idx, "intent", e.target.value)
                          }
                          placeholder="Intent"
                        />
                        <Textarea
                          value={keyword.why}
                          onChange={(e) =>
                            handleUpdateKeyword(idx, "why", e.target.value)
                          }
                          placeholder="Why this keyword?"
                          className="min-h-[60px] text-sm"
                        />
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-muted-foreground">
                              Prompts:
                            </p>
                            <Button
                              onClick={() => handleSuggestNewPrompts(idx)}
                              disabled={suggestingPrompts}
                              variant="ghost"
                              size="sm"
                            >
                              <Sparkles className="h-3 w-3 mr-1" />
                              {suggestingPrompts
                                ? "Suggesting..."
                                : "Suggest New Prompts"}
                            </Button>
                          </div>
                          {keyword.prompts.map((prompt, pIdx) => (
                            <Textarea
                              key={pIdx}
                              value={prompt}
                              onChange={(e) =>
                                handleUpdatePrompt(idx, pIdx, e.target.value)
                              }
                              placeholder={`Prompt ${pIdx + 1}`}
                              className="text-sm min-h-[50px]"
                            />
                          ))}
                        </div>
                        <Button
                          onClick={() => setEditingKeywordIdx(null)}
                          variant="outline"
                          size="sm"
                        >
                          Done Editing
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-base">
                              {keyword.term}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {keyword.intent}
                            </p>
                            <p className="text-sm text-foreground mt-1">
                              {keyword.why}
                            </p>
                          </div>
                          {currentStep === 3 && (
                            <Button
                              onClick={() => handleEditKeyword(idx)}
                              size="sm"
                              variant="outline"
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>

                        <div className="pl-4 space-y-2 border-l-2 border-border">
                          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                            LLM Prompts (5)
                          </p>
                          {keyword.prompts.map((prompt, pIdx) => (
                            <div key={pIdx} className="text-sm text-foreground">
                              <Badge
                                variant="secondary"
                                className="mr-2 text-xs"
                              >
                                {pIdx + 1}
                              </Badge>
                              {prompt}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {currentStep === 3 && (
                  <Button onClick={handleApproveKeywords} className="w-full">
                    <Check className="h-4 w-4 mr-2" /> Keywords Look Good,
                    Continue
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* STEP 4: SAVE & TEST */}
          {currentStep >= 4 && (
            <Card
              className={
                currentStep === 4 ? "border-emerald-500/50 shadow-lg" : ""
              }
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>💾</span> Step 4: Save Keywords & Test Citations
                </CardTitle>
                <CardDescription>
                  Save your keywords to the database and test against citation
                  API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    onClick={handleSaveKeywords}
                    disabled={isSaving}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving
                      ? "Saving..."
                      : rawResult?.companyId
                        ? "Save to Database"
                        : "Export Keywords"}
                  </Button>
                  <Button
                    onClick={handleTestCitations}
                    disabled={testingCitations}
                    variant="outline"
                    className="flex-1"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {testingCitations ? "Testing..." : "Test Citations"}
                  </Button>
                </div>

                {citationResults && (
                  <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      Citation Test Results
                    </p>
                    <div className="space-y-2 text-sm">
                      {citationResults.records?.map((record, idx) => (
                        <div
                          key={idx}
                          className="rounded bg-card/50 p-2 text-xs"
                        >
                          <p className="font-medium">{record.model}</p>
                          {record.results?.map((res, rIdx) => (
                            <div
                              key={rIdx}
                              className="text-muted-foreground mt-1"
                            >
                              {res.matches?.length > 0 ? (
                                <p className="text-green-600">
                                  ✓ {res.prompt}: Found at rank(s){" "}
                                  {res.matches[0].ranks.join(",")}
                                </p>
                              ) : (
                                <p className="text-amber-600">
                                  ✗ {res.prompt}: Not found
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
