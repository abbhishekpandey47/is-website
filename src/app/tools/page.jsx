"use client";

import { useState } from "react";
import Link from "next/link";

const TOOLS = [
//   {
//     slug: "k8s-cost-estimator",
//     name: "K8s Cost Estimator",
//     category: "Kubernetes",
//     tag: "KUBERNETES",
//     tagColor: "#8a6eff",
//     description: "Predictive analysis of cluster workloads. Calculate your node-by-pod ratio efficiently and identify zombie resources across MKS, GKE, and EKS.",
//     chips: ["K8s", "GKE", "AKS"],
//     icon: "⚙️",
//     featured: true,
//     popular: true,
//   },
//   {
//     slug: "cloud-security-auditor",
//     name: "Cloud Security Auditor",
//     category: "Security",
//     tag: "SECURITY",
//     tagColor: "#f87171",
//     description: "A dedicated IAM policy review for over-privileged accounts. Score against CIS benchmarks in minutes.",
//     chips: ["AWS", "GCP", "CIS"],
//     icon: "🔒",
//     featured: true,
//     popular: false,
//   },
//   {
//     slug: "infra-health-checker",
//     name: "Infrastructure Health Checker",
//     category: "Observability",
//     tag: "OBSERVABILITY",
//     tagColor: "#34d399",
//     description: "Verify connectivity, DNS resolutions and latency across multi-region VPC pairs at a glance.",
//     chips: ["Multi-region", "DNS"],
//     icon: "🩺",
//     featured: false,
//     popular: false,
//   },
//   {
//     slug: "terraform-plan-visualizer",
//     name: "Terraform Plan Visualizer",
//     category: "AWS Cloud",
//     tag: "IaC",
//     tagColor: "#a78bfa",
//     description: "Convert complex JSON plan files into interactive topology diagrams. Diff and view delta-state side-by-side before it happens.",
//     chips: ["Terraform", "AWS"],
//     icon: "🗺️",
//     featured: false,
//     popular: false,
//   },
//   {
//     slug: "db-index-optimizer",
//     name: "DB Index Optimizer",
//     category: "AWS Cloud",
//     tag: "DATABASE",
//     tagColor: "#fbbf24",
//     description: "Analyze query explain logs to suggest high-impact indexes for PostgreSQL and RDS instances.",
//     chips: ["PostgreSQL", "RDS"],
//     icon: "🗄️",
//     featured: false,
//     popular: false,
//   },
//   {
//     slug: "secret-scanner",
//     name: "Secret Scanner",
//     category: "Security",
//     tag: "PRIVACY",
//     tagColor: "#f87171",
//     description: "Scan your Git history for hardcoded secrets, keys and credentials before your first push.",
//     chips: ["Git", "CI/CD"],
//     icon: "🔍",
//     featured: false,
//     popular: false,
//   },
//   {
//     slug: "lighthouse-for-cloud",
//     name: "Lighthouse for Cloud",
//     category: "Observability",
//     tag: "PERFORMANCE",
//     tagColor: "#fbbf24",
//     description: "Benchmark the TTB and cold-start latency of your serverless functions across 12 global regions.",
//     chips: ["Lambda", "Edge"],
//     icon: "💡",
//     featured: false,
//     popular: false,
//   },
  {
    slug: "roi-cal",
    name: "ROI Calculator",
    category: "Content",
    tag: "CONTENT",
    tagColor: "#8a6eff",
    description: "Calculate content marketing ROI for your DevTool or SaaS product with channel-level breakdowns.",
    chips: ["GTM-lead", "Marketing"],
    icon: "📊",
    featured: false,
    popular: false,
  },
  {
    slug: "reddit-comment-generator",
    name: "Reddit Comment Generator",
    category: "Content",
    tag: "CONTENT",
    tagColor: "#8a6eff",
    description: "Generate authentic, community-first Reddit comments that drive trust to your DevTool without sounding promotional.",
    chips: ["Reddit", "YouTube"],
    icon: "💬",
    featured: false,
    popular: false,
  },
  {
    slug: "ai-script-generator",
    name: "Script Generator",
    category: "Content",
    tag: "CONTENT",
    tagColor: "#8a6eff",
    description: "Generate customizable video scripts for product demos, tutorials and developer walkthroughs in minutes.",
    chips: ["Video", "YouTube"],
    icon: "📝",
    featured: false,
    popular: false,
  },
  {
    slug: "geo-audit",
    name: "GEO Audit",
    category: "SEO",
    tag: "SEO / LLM",
    tagColor: "#34d399",
    description: "Audit your Generative Engine Optimization engine — see how AI search tools like Perplexity and ChatGPT surface your brand.",
    chips: ["GEO", "AI Search"],
    icon: "🌐",
    featured: false,
    popular: false,
  },
];

//const CATEGORIES = ["All Systems","Kubernetes","AWS Cloud","Security","Observability","Content","SEO"];
const CATEGORIES = ["All Systems", "Content","SEO"];


function matchCategory(tool, cat) {
  if (cat === "All Systems") return true;
  return tool.category === cat;
}

function Chip({ label }) {
  return (
    <span className="rounded border border-slate-700 bg-slate-800/60 px-2 py-0.5 text-[11px] text-slate-400">
      {label}
    </span>
  );
}

function Tag({ label, color }) {
  return (
    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase" style={{ color, backgroundColor: color + "20" }}>
      {label}
    </span>
  );
}

function ToolCard({ tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/60 hover:-translate-y-0.5">
      <div>
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base" style={{ backgroundColor: tool.tagColor + "22" }}>
            {tool.icon}
          </div>
          <Tag label={tool.tag} color={tool.tagColor} />
        </div>
        <h3 className="mb-1.5 text-sm font-bold text-[#CFCAC7] group-hover:text-white transition-colors">{tool.name}</h3>
        <p className="mb-4 text-xs leading-relaxed text-slate-500">{tool.description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {tool.chips.map((c) => <Chip key={c} label={c} />)}
        </div>
        <span className="text-xs font-semibold text-[#8a6eff] opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap">Try Tool →</span>
      </div>
    </Link>
  );
}

function FeaturedCard({ tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group col-span-1 md:col-span-2 flex flex-col md:flex-row gap-6 rounded-xl border border-[#8a6eff]/25 bg-gradient-to-br from-[#8a6eff]/10 via-slate-900/60 to-slate-900/60 p-6 transition-all duration-200 hover:border-[#8a6eff]/50 hover:-translate-y-0.5">
      <div className="flex-1">
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg" style={{ backgroundColor: tool.tagColor + "25" }}>
            {tool.icon}
          </div>
          <Tag label={tool.tag} color={tool.tagColor} />
          {tool.popular && (
            <span className="rounded-full bg-[#8a6eff] px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase text-white">Popular</span>
          )}
        </div>
        <h3 className="mb-2 text-lg font-bold text-[#CFCAC7] group-hover:text-white transition-colors">{tool.name}</h3>
        <p className="mb-5 max-w-sm text-sm leading-relaxed text-slate-500">{tool.description}</p>
        <div className="flex flex-wrap items-center gap-2">
          {tool.chips.map((c) => <Chip key={c} label={c} />)}
          <span className="ml-auto text-sm font-semibold text-[#8a6eff] opacity-0 transition-opacity group-hover:opacity-100">Try Tool →</span>
        </div>
      </div>
      <div className="hidden md:flex items-end gap-1.5 self-center px-2 h-24 opacity-60 group-hover:opacity-90 transition-opacity">
        {[45, 65, 50, 80, 60, 90, 72].map((h, i) => (
          <div key={i} className="w-5 rounded-t-sm" style={{ height: `${h}%`, background: "linear-gradient(to top, #8a6eff44, #8a6eff)" }} />
        ))}
      </div>
    </Link>
  );
}

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("All Systems");
  const [email, setEmail] = useState("");

  const featuredTools = TOOLS.filter((t) => t.featured && matchCategory(t, activeCategory));
  const gridTools = TOOLS.filter((t) => !t.featured && matchCategory(t, activeCategory));
  const noResults = featuredTools.length === 0 && gridTools.length === 0;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#CFCAC7]">
      <section className="mx-auto max-w-5xl px-6 pb-14 pt-24 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8a6eff]/30 bg-[#8a6eff]/10 px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase text-[#8a6eff]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8a6eff]" />
          Free Tools
        </div>
        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl" style={{ fontFamily: "Syne, sans-serif" }}>
          Free Tools for{" "}
          <span className="bg-gradient-to-r from-[#8a6eff] to-[#b39fff] bg-clip-text text-transparent">Infrastructure</span>
          <br />Experts
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-slate-400">
          Meticulously engineered utilities to audit, estimate, and optimize your cloud-native ecosystems. Built for DevOps by the architects at Infrasity.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#tools-grid" className="inline-flex items-center gap-2 rounded-lg bg-[#8a6eff] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7a5eff]">
            Explore All Tools
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </a>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <span className="text-yellow-400">★★★★★</span>
            Rated 4.8 on Clutch
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <section id="tools-grid" className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150 ${
                activeCategory === cat
                  ? "border-[#8a6eff] bg-[#8a6eff]/15 text-[#b39fff]"
                  : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        {noResults ? (
          <p className="py-20 text-center text-slate-600">No tools in this category yet — stay tuned!</p>
        ) : (
          <>
            {featuredTools.length > 0 && (
              <div className="mb-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">Popular Tools</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {featuredTools.map((t) =>
                    t.slug === "k8s-cost-estimator" ? <FeaturedCard key={t.slug} tool={t} /> : <ToolCard key={t.slug} tool={t} />
                  )}
                </div>
              </div>
            )}
            {gridTools.length > 0 && (
              <div>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">All Tools</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {gridTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-[#8a6eff]/10 via-slate-900/40 to-transparent p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl" style={{ fontFamily: "Syne, sans-serif" }}>
            Stay Ahead of the Cloud Curve
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-slate-400">
            Join 10,000+ infrastructure architects. We ship new tools, code templates, and deep-dive technical editorials every Tuesday.
          </p>
          <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm text-[#CFCAC7] placeholder-slate-600 outline-none focus:border-[#8a6eff]/60 focus:ring-1 focus:ring-[#8a6eff]/30"
            />
            <button type="submit" className="rounded-lg bg-[#8a6eff] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7a5eff] whitespace-nowrap">
              Join the Infrastructure Feed
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}