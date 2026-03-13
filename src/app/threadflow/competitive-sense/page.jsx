"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseClient";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Globe, CheckCircle, Loader2, Crosshair } from "lucide-react";
import CompetitiveSenseTab from "@/app/threadflow/serp-scout/components/CompetitiveSenseTab";

function Spinner({ className = "h-4 w-4" }) {
  return <Loader2 className={`${className} animate-spin`} />;
}

async function callApi(path, body) {
  let token = null;
  try { token = await auth.currentUser?.getIdToken(); } catch {}
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

export default function CompetitiveSensePage() {
  const { toast } = useToast();
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [rawResult, setRawResult] = useState(null);
  const [hasAutoLoadedOnMount, setHasAutoLoadedOnMount] = useState(false);

  const companyName = rawResult?.companyName ?? domain.trim();
  const companyId = rawResult?.companyId ?? null;
  const ctx = rawResult?.companyContext?.approvedContext ?? rawResult?.companyContext?.llmContext ?? null;
  const competitors = Array.isArray(ctx?.competitors) ? ctx.competitors : [];

  // Load domain from localStorage on mount
  useEffect(() => {
    if (hasAutoLoadedOnMount) return;
    setHasAutoLoadedOnMount(true);
    try {
      const saved = localStorage.getItem("serp-scout-domain");
      if (saved) setDomain(saved);
    } catch {}
  }, []);

  // Auto-analyze when domain loads from localStorage
  useEffect(() => {
    if (!domain || rawResult || !hasAutoLoadedOnMount || loading) return;
    try {
      const saved = localStorage.getItem("serp-scout-domain");
      if (saved === domain.trim()) handleAnalyze();
    } catch {}
  }, [domain, hasAutoLoadedOnMount]);

  async function handleAnalyze() {
    if (!domain.trim()) return;
    setLoading(true);
    try {
      const result = await callApi("/api/threadflow/serp-scout", {
        action: "analyze_domain",
        domain: domain.trim(),
      });
      setRawResult(result);
      try { localStorage.setItem("serp-scout-domain", domain.trim()); } catch {}
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
          <Crosshair className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Competitive Sense</h1>
          <p className="text-sm text-muted-foreground">Analyze your brand and competitors on Reddit</p>
        </div>
      </div>

      {/* Domain input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-primary" /> Your Website
          </CardTitle>
          <CardDescription className="text-xs">
            Enter your domain to load company context and start competitive analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2 max-w-lg">
            <Input
              value={domain}
              onChange={e => setDomain(e.target.value)}
              placeholder="https://yourwebsite.com"
              onKeyDown={e => e.key === "Enter" && handleAnalyze()}
              disabled={loading}
            />
            <Button onClick={handleAnalyze} disabled={loading || !domain.trim()}>
              {loading
                ? <><Spinner className="h-4 w-4 mr-2" />Loading…</>
                : <><Globe className="h-4 w-4 mr-2" />Load</>
              }
            </Button>
          </div>
          {rawResult && !loading && (
            <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900 max-w-lg">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>Context loaded for <strong>{companyName}</strong></span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Competitive analysis tab */}
      {rawResult && (
        <CompetitiveSenseTab
          companyContext={rawResult}
          companyId={companyId}
          userId={auth.currentUser?.uid}
          companyName={companyName}
          competitors={competitors}
          onDataLoaded={(data) => {
            console.log("[Competitive Sense] Data loaded:", data);
          }}
        />
      )}

      {!rawResult && !loading && (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-border rounded-lg text-muted-foreground gap-3">
          <Crosshair className="h-12 w-12 opacity-20" />
          <div className="text-center text-sm">
            <p className="font-medium">Enter your domain to get started</p>
            <p className="text-xs mt-1 opacity-70">Load your company context to enable competitive analysis</p>
          </div>
        </div>
      )}
    </div>
  );
}
