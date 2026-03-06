import { FileText, Layout, Video, Search, BookOpen, MessageCircle } from 'lucide-react/dist/cjs/lucide-react';

// Case study data
const caseStudies = [
  {
    id: 'aeo-geo',
    href: '/services/developer-marketing-agency',
    title: 'AEO/GEO Services',
    description: 'Get your product cited when developers ask ChatGPT, Claude, or Perplexity. We audit your AI search visibility, optimize content structure with FAQ schema, and build prompt-aligned pages that LLMs actually reference.',
    icon: <Search className="w-6 h-6 text-cyan-400" />,
    ctaText: "Learn more",
  },
  {
    id: 'video-production',
    href: '/services/tech-video-production',
    title: 'Video Production',
    description: 'We turn a single product walkthrough into YouTube explainers, doc embeds, shorts, and landing page assets — giving your product visibility across every channel where engineers learn and evaluate.',
    icon: <Video className="w-6 h-6 text-blue-400" />,
    ctaText: "View our work",
  },
  {
    id: 'technical-writing',
    href: '/services/technical-writing-services',
    title: 'Technical Writing Services',
    description: 'From hands-on tutorials to comparison pages and SDK examples — we create the technical content that ranks on Google, gets cited by AI models, and answers the questions developers actually search for. Each piece ships with code snippets, diagrams, and FAQ blocks.',
    icon: <FileText className="w-6 h-6 text-emerald-400" />,
    ctaText: "See our writing",
  },
  {
    id: 'ui-ux-landing',
    href: '/services/webflow-agency',
    title: 'UI/UX & Landing Pages',
    description: 'Conversion-ready landing pages, feature announcement pages, and comparison layouts designed for developer-first products. Built to turn organic traffic and campaign clicks into signups and first API calls.',
    icon: <Layout className="w-6 h-6 text-purple-400" />,
    ctaText: "View our sites",
  },
  {
    id: 'reddit-marketing',
    href: '/services/reddit-marketing-agency',
    title: 'Reddit Marketing Services',
    description: 'We seed 40+ genuine technical contributions monthly across the subreddits where your buyers evaluate tools. Thread research, context-matched responses, aged accounts, and monthly visibility tracking — no spam, just credibility that compounds.',
    icon: <MessageCircle className="w-6 h-6 text-orange-400" />,
    ctaText: "See our strategy",
  },
  {
    id: 'product-docs',
    href: '/services/technical-writing-services',
    title: 'Product Documentation',
    description: 'API references, SDK guides, integration walkthroughs, quickstart tutorials, and architecture explainers — structured code-first so developers go from discovery to first API call in minutes. Built for humans and LLM crawlers alike.',
    icon: <BookOpen className="w-6 h-6 text-yellow-400" />,
    ctaText: "See our docs",
  },
];


function CaseStudyCard({ study }) {
  return (
    <div
      className="block border border-gray-700/50 rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black relative"
    >
      <div className="p-6 flex flex-col">
        <div className="h-4 mb-4 flex items-center">
          <div className="w-6 h-6 text-white">{study.icon}</div>
        </div>

        <h3 className="text-xl font-medium text-white mb-2">
          {study.title}
        </h3>

        <p className="text-gray-400 text-sm">
          {study.description}
        </p>
      </div>
    </div>
  );
}

// Main Component
export default function RealResult() {
  return (
    <section
      className="border border-gray-700/30 py-16 px-4 md:px-8 lg:px-16 font-medium"
      id="case-study-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-medium leading-tight tracking-tight text-left bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          The developer marketing services behind 30+ SaaS startups
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-lg md:text-xl font-medium leading-relaxed tracking-tight text-gray-400 text-left">
          How top infra, AI, and SaaS startups scaled credibility without hiring full DevRel teams.
        </p>
      </div>

      <div className="mt-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}
