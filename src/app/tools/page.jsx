"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "../../Components/ui/pagination";

// ─── Tool Data ────────────────────────────────────────────────────────────────
// Drop your images in public/tools/ and set the image field below.
// If image is null, a bar chart placeholder renders automatically.
const ALL_TOOLS = [
  {
    slug:        "k8s-cost-estimator",
    image:       null, //"/tools/k8s-cost-estimator.png",
    name:        "K8s Cost Estimator",
    category:    "Kubernetes",
    tag:         "KUBERNETES",  
    tagColor:    "#8a6eff",
    description: "Precision analysis of cluster overhead. Calculate your node-to-pod ratio efficiency and identify zombie resources across GKE, EKS, and AKS.",
    chips:       ["K8s", "GKE", "AKS"],
    icon:        "⚙️",
    cta:      "Try Now →", 
    featured:    true,
    popular:     true,
  },
  {
    slug:        "cloud-security-auditor",
    image:       "/tools/cloud-security-auditor.png",
    name:        "Cloud Security Auditor",
    category:    "Security",
    tag:         "SECURITY",
    tagColor:    "#f87171",
    description: "Automated IAM policy review for over-privileged accounts. Score against CIS benchmarks in minutes.",
    chips:       ["AWS", "GCP", "CIS"],
    icon:        "🔒",
    cta:      "Try Now →", 
    featured:    true,
    popular:     false,
  },
  {
    slug:        "infra-health-checker",
    image:       null,
    name:        "Infrastructure Health Checker",
    category:    "Observability",
    tag:         "OBSERVABILITY",
    tagColor:    "#34d399",
    description: "Verify connectivity, DNS resolution, and latency across multi-region VPC pairings.",
    chips:       ["Multi-region", "DNS"],
    icon:        "🩺",
    cta:      "Try Now →", 
    featured:    false,
    popular:     false,
  },
  {
    slug:        "terraform-plan-visualizer",
    image:       null,
    name:        "Terraform Plan Visualizer",
    category:    "AWS Cloud",
    tag:         "IaC",
    tagColor:    "#a78bfa",
    description: "Convert complex JSON plans into human-readable topological diagrams. Understand what will be destroyed before it happens.",
    chips:       ["Terraform", "AWS"],
    icon:        "🗺️",
    cta:      "Launch →", 
    featured:    false,
    popular:     false,
  },
  {
    slug:        "db-index-optimizer",
    image:       null,
    name:        "DB Index Optimizer",
    category:    "AWS Cloud",
    tag:         "DATABASE",
    tagColor:    "#fbbf24",
    description: "Analyze query explain logs to suggest high-impact indexes for PostgreSQL and RDS instances.",
    chips:       ["PostgreSQL", "RDS"],
    icon:        "🗄️",
    cta:  "Get Tool →",
    featured:    false,
    popular:     false,
  },
  {
    slug:        "secret-scanner",
    image:       null,
    name:        "Secret Scanner",
    category:    "Security",
    tag:         "PRIVACY",
    tagColor:    "#f87171",
    description: "Scan your Git history for hardcoded secrets, keys and credentials before your first push.",
    chips:       ["Git", "CI/CD"],
    icon:        "🔍",
    cta:      "Try Now →", 
    featured:    false,
    popular:     false,
  },
  {
    slug:        "lighthouse-for-cloud",
    image:       null,
    name:        "Lighthouse for Cloud",
    category:    "Observability",
    tag:         "PERFORMANCE",
    tagColor:    "#fbbf24",
    description: "Benchmark the TTB and cold-start latency of your serverless functions across 12 global regions.",
    chips:       ["Lambda", "Edge"],
    icon:        "💡",
    cta:      "Get Tool →", 
    featured:    false,
    popular:     false,
  },
  {
    slug:        "roi-cal",
    image:       null,
    name:        "ROI Calculator",
    category:    "Content",
    tag:         "CONTENT",
    tagColor:    "#8a6eff",
    description: "Calculate content marketing ROI for your DevTool or SaaS product with channel-level breakdowns.",
    chips:       ["GTM-lead", "Marketing"],
    icon:        "📊",
    cta:      "Try Now →", 
    featured:    false,
    popular:     false,
  },
  {
    slug:        "reddit-comment-generator",
    image:       null,
    name:        "Reddit Comment Generator",
    category:    "Content",
    tag:         "CONTENT",
    tagColor:    "#8a6eff",
    description: "Generate authentic, community-first Reddit comments that drive trust to your DevTool without sounding promotional.",
    chips:       ["Reddit", "YouTube"],
    icon:        "💬",
    cta:      "Try Now →", 
    featured:    false,
    popular:     false,
  },
  {
    slug:        "ai-script-generator",
    image:       null,
    name:        "Script Generator",
    category:    "Content",
    tag:         "CONTENT",
    tagColor:    "#8a6eff",
    description: "Generate customizable video scripts for product demos, tutorials and developer walkthroughs in minutes.",
    chips:       ["Video", "YouTube"],
    icon:        "📝",
    cta:         "Try Now →", 
    featured:    false,
    popular:     false,
  },
  {
    slug:        "geo-audit",
    image:       "/tools/geo-audit.png",
    name:        "GEO Audit",
    category:    "SEO",
    tag:         "SEO / LLM",
    tagColor:    "#34d399",
    description: "Audit your Generative Engine Optimization — see how AI tools like Perplexity and ChatGPT surface your brand.",
    chips:       ["GEO", "AI Search"],
    icon:        "🌐",
    cta:         "Try Now →", 
    featured:    false,
    popular:     false,
  },
];

const TABS = [
  { id: "All Systems",   label: "All Systems"   },
  { id: "Kubernetes",    label: "Kubernetes"    },
  { id: "AWS Cloud",     label: "AWS Cloud"     },
  { id: "Security",      label: "Security"      },
  { id: "Observability", label: "Observability" },
  { id: "Content",       label: "Content"       },
  { id: "SEO",           label: "SEO"           },
];

const ITEMS_PER_PAGE = 6;

// ─── Bar chart placeholder (shown when tool.image is null) ────────────────────
const BarChart = () => (
  <div className="flex items-end gap-1 h-20 opacity-70 px-2">
    {[35, 55, 42, 70, 52, 85, 65, 90, 72].map((h, i) => (
      <div key={i} className="w-3 rounded-t-sm"
        style={{ height: `${h}%`, background: "linear-gradient(to top, #8a6eff55, #8a6eff)" }} />
    ))}
  </div>
);

// ─── Tab bar — identical to blog page ─────────────────────────────────────────
const TabBar = React.memo(({ activeTab, setActiveTab }) => (
  <div className="flex flex-wrap gap-[0.60rem] max-w-7xl mx-auto justify-center">
    {TABS.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`relative px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 ease-out ${
          activeTab === tab.id ? "text-white shadow-lg scale-105" : "text-gray-300 hover:text-white"
        } backdrop-blur-sm border border-white/20 hover:border-white/40 min-w-max whitespace-nowrap`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {activeTab === tab.id && (
          <motion.div
            layoutId="activeToolTab"
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl"
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {tab.label}
          {activeTab === tab.id && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-2 h-2 bg-white rounded-full" />
          )}
        </span>
      </button>
    ))}
  </div>
));
TabBar.displayName = "TabBar";

// ─── Chip ─────────────────────────────────────────────────────────────────────
const Chip = ({ label }) => (
  <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] quicksand-light text-gray-400">
    {label}
  </span>
);

// ─── Regular tool card ────────────────────────────────────────────────────────
function ToolCard({ tool }) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 cursor-pointer rounded-xl border border-white/10 bg-[#0d0d14] flex flex-col justify-between h-52 overflow-hidden">

        {/* Image banner — shown only if tool.image is set */}
        {tool.image ? (
          <div className="w-full h-24 overflow-hidden shrink-0">
            <Image
              src={tool.image}
              alt={tool.name}
              width={800}
              height={440}
              className="object-cover w-full h-full"
            />
          </div>
        ) : null}

        {/* Content */}
        <div className={`flex flex-col justify-between flex-1 p-5 ${tool.image ? 'pt-3' : ''}`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              {!tool.image && (
                <div className="flex h-7 w-7 items-center justify-center rounded-md text-sm"
                  style={{ backgroundColor: tool.tagColor + "22" }}>
                  {tool.icon}
                </div>
              )}
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                style={{ color: tool.tagColor, backgroundColor: tool.tagColor + "20" }}>
                {tool.tag}
              </span>
            </div>
            <h3 className="quicksand-bold text-white text-[15px] mb-1 leading-snug">{tool.name}</h3>
            <p className="quicksand-light text-gray-400 text-[12px] leading-relaxed line-clamp-2">
              {tool.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-wrap gap-1.5">
              {tool.chips.map((c) => <Chip key={c} label={c} />)}
            </div>
            <span className="text-[12px] quicksand-semibold text-[#8a6eff] whitespace-nowrap ml-2">
              {tool.cta}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
ToolCard.displayName = "ToolCard";

// ─── Featured card — own image or bar chart fallback ─────────────────────────
const FeaturedCard = React.memo(({ tool }) => (
  <Link href={`/tools/${tool.slug}`} className="flex-1 min-w-[260px]">
    <div className="hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 cursor-pointer rounded-xl border border-[#8a6eff]/30 bg-[#0d0d14] p-6 flex flex-row justify-between gap-4 h-52">

      {/* Left: text content */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md text-sm shrink-0"
              style={{ backgroundColor: tool.tagColor + "22" }}>
              {tool.icon}
            </div>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase"
              style={{ color: tool.tagColor, backgroundColor: tool.tagColor + "20" }}>
              {tool.tag}
            </span>
            {tool.popular && (
              <span className="rounded-full bg-[#8a6eff] px-2 py-0.5 text-[10px] font-bold uppercase text-white shrink-0">
                Popular
              </span>
            )}
          </div>
          <h3 className="quicksand-bold text-white text-lg mb-1 leading-snug">{tool.name}</h3>
          <p className="quicksand-light text-gray-400 text-[12px] leading-relaxed line-clamp-2">
            {tool.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-1.5">
            {tool.chips.map((c) => <Chip key={c} label={c} />)}
          </div>
          <span className="text-[12px] quicksand-semibold text-[#8a6eff] whitespace-nowrap ml-2">
            {tool.cta}
          </span>
        </div>
      </div>

      {/* Right: custom image OR bar chart fallback */}
      <div className="hidden sm:flex items-center justify-center shrink-0 w-32 h-full rounded-lg overflow-hidden bg-white/5">
        {tool.image ? (
          <Image
            src={tool.image}
            alt={tool.name}
            width={800}
            height={440}
            className="object-cover w-full h-full"
          />
        ) : (
          <BarChart />
        )}
      </div>

    </div>
  </Link>
));
FeaturedCard.displayName = "FeaturedCard";

// ─── Inner page (needs useSearchParams) ──────────────────────────────────────
function ToolsPageInner() {
  const searchParams = useSearchParams();
  const pageNum      = Number(searchParams.get("page")      || 1);
  const totalItem    = Number(searchParams.get("totalItem") || ITEMS_PER_PAGE);
  const prevTab      = searchParams.get("prevTab")          || TABS[0].id;

  const [activeTab,    setActiveTab]    = useState(prevTab);
  const [searchOn,     setSearchOn]     = useState(true);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [email,        setEmail]        = useState("");
  const [paginArr,     setPaginArr]     = useState([]);
  const [visibleTools, setVisibleTools] = useState([]);

  // Filter
  const filtered = ALL_TOOLS.filter((t) => {
    const matchCat    = activeTab === "All Systems" || t.category === activeTab;
    const matchSearch = !searchOn || t.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchCat && matchSearch;
  });
  const featuredTools = filtered.filter((t) =>  t.featured);
  const allGridTools  = filtered.filter((t) => !t.featured);

  // Pagination — same algo as blog
  const paginationAlgo = useCallback((data) => {
    let myrtr =
      pageNum === 1 ? [1, 2, 3] :
      pageNum === 2 ? [2, 3, 4] :
                     [pageNum, pageNum + 1, pageNum + 2];
    const maxPage = Math.ceil(data.length / totalItem);
    while (myrtr.length && myrtr[myrtr.length - 1] > maxPage) myrtr.pop();
    setVisibleTools(data.slice((pageNum - 1) * totalItem, (pageNum - 1) * totalItem + totalItem));
    setPaginArr(myrtr);
  }, [pageNum, totalItem]);

  useEffect(() => { paginationAlgo(allGridTools); }, [activeTab, searchQuery, pageNum, totalItem]);

  const scrollToGrid = useCallback(() => {
    document.getElementById("toolsGrid")?.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => { if (pageNum > 1) scrollToGrid(); }, [pageNum]);

  return (
    <div className="relative">
      <div className="whyinfra2"></div>

      {/* ── Hero ── */}
      <div className="h-[50vh] pt-56 flex flex-col justify-center gap-7">
        <h1 className="text-center text-white text-7xl quicksand-bold max-sm:text-[3.5rem]">
          Free Tools for{" "}
          <span className='relative bg-gradient-to-br from-[#3c00e2] to-[#6530fb] bg-clip-text text-transparent after:content-[""] after:w-8 after:h-8 after:absolute after:top-2 after:right-[-20px] after:bg-[url("/svgPatterns/text-highlight.svg")] after:bg-no-repeat after:bg-contain'>
            DevOps
          </span>
        </h1>
        <div className="flex justify-center">
          <p className="text-center text-white quicksand-light w-1/2 max-md:w-3/4 max-sm:w-4/5">
            Meticulously engineered utilities to audit, estimate, and optimize your
            cloud-native ecosystems. Built for DevOps by the architects at Infrasity.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <a href="#toolsSection"
            className="inline-flex items-center gap-2 rounded-lg bg-[#8a6eff] px-5 py-2.5 text-sm quicksand-semibold text-white hover:bg-[#7a5eff] transition-all">
            Explore All Tools
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </a>
          <div className="flex items-center gap-1.5 text-sm quicksand-light text-gray-400">
            <span className="text-yellow-400">★★★★★</span> Rated 4.8 on Clutch
          </div>
        </div>
      </div>

      {/* ── Search — identical to blog, with Enable/Disable toggle ── */}
      <div className="w-full flex flex-col items-center pt-20 max-md:pt-28 text-white gap-3">
        <div className="flex items-center gap-4 text-sm quicksand-semibold text-gray-400">
          <span>Search tools:</span>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="radio" name="searchToggle" checked={searchOn}
              onChange={() => setSearchOn(true)} className="accent-[#8a6eff]" />
            <span className={searchOn ? "text-white" : ""}>Enable</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="radio" name="searchToggle" checked={!searchOn}
              onChange={() => { setSearchOn(false); setSearchQuery(""); }}
              className="accent-[#8a6eff]" />
            <span className={!searchOn ? "text-white" : ""}>Disable</span>
          </label>
        </div>

        {searchOn && (
          <label className="input h-[3.5rem] input-bordered flex items-center gap-2 w-1/3 bg-transparent max-sm:w-[80%] border-white border-2 blogLabelSearchClass">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6 opacity-70">
              <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd"/>
            </svg>
            <input type="text" className="grow" placeholder="search tools..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </label>
        )}
      </div>

      {/* ── Tab filter — same container as blog ── */}
      <div id="toolsSection" className="w-full flex justify-center pt-10 pb-10">
        <div className="p-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl max-w-7xl w-full mx-4">
          <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="flex justify-center" id="toolsGrid">
        <div className="divider-line divider-blog-left max-sm:hidden" style={{ height: "80%" }}></div>
        <div className="divider-line divider-blog-right max-sm:hidden" style={{ height: "80%" }}></div>

        <div className="px-12 pb-8 flex flex-col gap-8 w-full max-w-[1200px]">

          {/* Featured row */}
          {featuredTools.length > 0 && (
            <div>
              <p className="quicksand-semibold text-[11px] uppercase tracking-widest text-gray-500 mb-4">
                Popular Tools
              </p>
              <div className="flex gap-5 flex-wrap">
                {featuredTools.map((t) => <FeaturedCard key={t.slug} tool={t} />)}
              </div>
            </div>
          )}

          {/* Paginated 4-col grid */}
          {allGridTools.length > 0 && (
            <div>
              <p className="quicksand-semibold text-[11px] uppercase tracking-widest text-gray-500 mb-4">
                All Tools
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {visibleTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <p className="py-20 text-center quicksand-light text-gray-500">
              No tools found — try a different search or category.
            </p>
          )}
        </div>
      </div>

      {/* ── Pagination — identical to blog ── */}
      <div className="pb-16">
        <Pagination>
          <PaginationContent>
            {pageNum - 1 > 0 && (
              <PaginationItem>
                <PaginationPrevious href={`?page=${pageNum - 1}&totalItem=${totalItem}&prevTab=${activeTab}`} />
              </PaginationItem>
            )}
            {paginArr.map((item) => (
              <PaginationItem key={item}>
                <PaginationLink isActive={pageNum === item}
                  href={`?page=${item}&totalItem=${totalItem}&prevTab=${activeTab}`}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            ))}
            {pageNum + 1 <= paginArr[paginArr.length - 1] && (
              <>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem>
                  <PaginationNext href={`?page=${pageNum + 1}&totalItem=${totalItem}&prevTab=${activeTab}`} />
                </PaginationItem>
              </>
            )}
          </PaginationContent>
        </Pagination>
      </div>

      {/* ── Newsletter CTA ── */}
      <div className="flex justify-center pb-24 px-6">
        <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-10 text-center">
          <h2 className="quicksand-bold text-white text-3xl mb-3">Stay Ahead of the Cloud Curve</h2>
          <p className="quicksand-light text-gray-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            Join 10,000+ infrastructure architects. We ship new tools, code templates,
            and deep-dive technical editorials every Tuesday.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}>
            <label className="input h-[3.5rem] input-bordered flex items-center gap-2 flex-1 bg-transparent border-white border-2 blogLabelSearchClass">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
              </svg>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="grow bg-transparent text-white placeholder-gray-500 outline-none text-sm" />
            </label>
            <button type="submit"
              className="rounded-lg bg-[#8a6eff] px-5 py-2.5 text-sm quicksand-semibold text-white hover:bg-[#7a5eff] whitespace-nowrap">
              Join the Infrastructure Feed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Suspense required for useSearchParams in Next.js App Router
export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ToolsPageInner />
    </Suspense>
  );
}