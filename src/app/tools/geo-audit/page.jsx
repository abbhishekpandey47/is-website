"use client";
import { useState } from "react";

const GEO_SIGNALS = [
  { label: "AI-quotable definitions", color: "violet" },
  { label: "Answer-first structure", color: "emerald" },
  { label: "FAQ block presence", color: "violet" },
  { label: "Schema markup signals", color: "orange" },
  { label: "Heading hierarchy", color: "violet" },
  { label: "Citation authority", color: "emerald" },
];

const colorMap = {
  violet: {
    pill: "border-violet-500/40 text-violet-300 bg-violet-500/10 hover:bg-violet-500/20",
    dot: "bg-violet-400",
  },
  emerald: {
    pill: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20",
    dot: "bg-emerald-400",
  },
  orange: {
    pill: "border-orange-500/40 text-orange-300 bg-orange-500/10 hover:bg-orange-500/20",
    dot: "bg-orange-400",
  },
};

export default function GeoAuditPage() {
  const [domain, setDomain] = useState("");
  const [pages, setPages] = useState([{ url: "", content: "" }]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addPage = () => {
    setPages([...pages, { url: "", content: "" }]);
  };

  const updatePage = (index, field, value) => {
    const updated = [...pages];
    updated[index][field] = value;
    setPages(updated);
  };

  const removePage = (index) => {
    if (pages.length > 1) {
      setPages(pages.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Existing audit logic here
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 px-6 text-center overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
          <div className="w-[700px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] -translate-y-1/3" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Generative Engine Optimization
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-5 max-w-3xl mx-auto">
          Is your content{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
            visible
          </span>{" "}
          <br className="hidden sm:block" />
          to AI engines?
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Paste your page content below. We score each page across 6 GEO signals,
          identify exactly what&rsquo;s missing, and give you a prioritized fix list.
        </p>
      </section>

      {/* ── GEO Signals ───────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pb-14">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 mb-5 text-center">
          6 GEO Signals Scored
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {GEO_SIGNALS.map((signal) => {
            const c = colorMap[signal.color];
            return (
              <div
                key={signal.label}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-colors cursor-default select-none ${c.pill}`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
                {signal.label}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Audit Form ────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/25">
            <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Analyze your domain</h2>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 space-y-6">

          {/* Domain input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Domain / Company name
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. futuresearchai.com or infrasity.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.07] transition-all"
            />
          </div>

          {/* Pages */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-300">
                Pages to audit
              </label>
              <button
                type="button"
                onClick={addPage}
                className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add page
              </button>
            </div>

            <div className="space-y-4">
              {pages.map((page, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/8 bg-white/[0.02] p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">
                      Page {index + 1}
                    </span>
                    {pages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePage(index)}
                        className="text-gray-600 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={page.url}
                    onChange={(e) => updatePage(index, "url", e.target.value)}
                    placeholder="Page URL or path (optional)"
                    className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 transition-all"
                  />

                  <textarea
                    value={page.content}
                    onChange={(e) => updatePage(index, "content", e.target.value)}
                    placeholder="Paste full page content — title, headings, body text, any FAQs…"
                    rows={4}
                    className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 resize-y focus:outline-none focus:border-violet-500/50 transition-all leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Prompt row */}
          <div className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what to look for, e.g. 'Check our blog pages for AI citation gaps'"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/60 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-violet-600/30 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Auditing…
                </>
              ) : (
                <>
                  Run GEO Audit
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-600 mt-3">
              Powered by OpenAI GPT-4o &middot; ~20 sec &middot; Up to 50 pages
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}