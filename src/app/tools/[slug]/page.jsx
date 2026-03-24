import Link from "next/link";

// All tool metadata — keep in sync with /tools/page.jsx
// Existing live tools use their exact repo slugs
const TOOLS_META = {
  "k8s-cost-estimator": {
    name: "K8s Cost Estimator",
    tag: "KUBERNETES",
    tagColor: "#8a6eff",
    icon: "⚙️",
    description: "Predictive analysis of cluster workloads. Calculate your node-by-pod ratio efficiently and identify zombie resources across MKS, GKE, and EKS.",
    chips: ["K8s", "GKE", "AKS"],
    live: false,
  },
  "cloud-security-auditor": {
    name: "Cloud Security Auditor",
    tag: "SECURITY",
    tagColor: "#f87171",
    icon: "🔒",
    description: "A dedicated IAM policy review for over-privileged accounts. Score against CIS benchmarks in minutes.",
    chips: ["AWS", "GCP", "CIS"],
    live: false,
  },
  "infra-health-checker": {
    name: "Infrastructure Health Checker",
    tag: "OBSERVABILITY",
    tagColor: "#34d399",
    icon: "🩺",
    description: "Verify connectivity, DNS resolutions and latency across multi-region VPC pairs at a glance.",
    chips: ["Multi-region", "DNS"],
    live: false,
  },
  "terraform-plan-visualizer": {
    name: "Terraform Plan Visualizer",
    tag: "IaC",
    tagColor: "#a78bfa",
    icon: "🗺️",
    description: "Convert complex JSON plan files into interactive topology diagrams. Diff and view delta-state side-by-side before it happens.",
    chips: ["Terraform", "AWS"],
    live: false,
  },
  "db-index-optimizer": {
    name: "DB Index Optimizer",
    tag: "DATABASE",
    tagColor: "#fbbf24",
    icon: "🗄️",
    description: "Analyze query explain logs to suggest high-impact indexes for PostgreSQL and RDS instances.",
    chips: ["PostgreSQL", "RDS"],
    live: false,
  },
  "secret-scanner": {
    name: "Secret Scanner",
    tag: "PRIVACY",
    tagColor: "#f87171",
    icon: "🔍",
    description: "Scan your Git history for hardcoded secrets, keys and credentials before your first push.",
    chips: ["Git", "CI/CD"],
    live: false,
  },
  "lighthouse-for-cloud": {
    name: "Lighthouse for Cloud",
    tag: "PERFORMANCE",
    tagColor: "#fbbf24",
    icon: "💡",
    description: "Benchmark the TTB and cold-start latency of your serverless functions across 12 global regions.",
    chips: ["Lambda", "Edge"],
    live: false,
  },
};

export function generateStaticParams() {
  return Object.keys(TOOLS_META).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const tool = TOOLS_META[params.slug];
  if (!tool) return { title: "Tool | Infrasity" };
  return {
    title: `${tool.name} | Free DevOps Tools – Infrasity`,
    description: tool.description,
  };
}

export default function ToolTemplatePage({ params }) {
  const tool = TOOLS_META[params.slug];

  if (!tool) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-6 text-[#CFCAC7]">
        <div className="text-center">
          <p className="mb-4 text-6xl">🔧</p>
          <h1 className="mb-3 text-3xl font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
            Coming Soon
          </h1>
          <p className="mb-8 text-slate-400">This tool is currently under construction.</p>
          <Link
            href="/tools"
            className="rounded-lg bg-[#8a6eff] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7a5eff]"
          >
            ← Back to Tools
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#CFCAC7]">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          All Tools
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-10 pt-6">
        <div className="flex items-start gap-5">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl"
            style={{ backgroundColor: tool.tagColor + "22" }}
          >
            {tool.icon}
          </div>
          <div>
            <span
              className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: tool.tagColor, backgroundColor: tool.tagColor + "20" }}
            >
              {tool.tag}
            </span>
            <h1 className="mb-2 text-3xl font-extrabold text-white md:text-4xl" style={{ fontFamily: "Syne, sans-serif" }}>
              {tool.name}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400">{tool.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tool.chips.map((c) => (
                <span key={c} className="rounded border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-[11px] text-slate-400">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tool placeholder panel */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="flex min-h-80 flex-col items-center justify-center gap-5 rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
            style={{ backgroundColor: tool.tagColor + "22" }}
          >
            {tool.icon}
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
              {tool.name}
            </h2>
            <p className="max-w-sm text-sm text-slate-500">
              Tool interface coming soon. Drop your component into{" "}
              <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-[#8a6eff]">
                src/app/tools/{params.slug}/page.jsx
              </code>
            </p>
          </div>
          <Link
            href="/tools"
            className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm text-slate-400 transition-all hover:border-slate-600 hover:text-slate-200"
          >
            Explore Other Tools
          </Link>
        </div>
      </section>
    </main>
  );
}
