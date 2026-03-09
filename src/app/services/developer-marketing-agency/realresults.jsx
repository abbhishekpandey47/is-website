import Link from 'next/link';
import { FileText, Layout, Video, Search, BookOpen, MessageCircle, ArrowRight } from 'lucide-react/dist/cjs/lucide-react';
import CalendarBooking from "../../calendarButton";
import ContactPopupButton from "../../lp/reddit-marketing-agency/ContactPopupButton";
import { useState } from 'react';

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
    description: 'We turn a single product walkthrough into YouTube explainers, doc embeds, shorts, and landing page assets giving your product visibility across every channel where engineers learn and evaluate.',
    icon: <Video className="w-6 h-6 text-blue-400" />,
    ctaText: "View our work",
  },
  {
    id: 'technical-writing',
    href: '/services/technical-writing-services',
    title: 'Technical Writing Services',
    description: 'From hands-on tutorials to comparison pages and SDK examples we create the technical content that ranks on Google, gets cited by AI models, and answers the questions developers actually search for. Each piece ships with code snippets, diagrams, and FAQ blocks.',
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
    description: 'We seed 40+ genuine technical contributions monthly across the subreddits where your buyers evaluate tools. Thread research, context-matched responses, aged accounts, and monthly visibility tracking no spam, just credibility that compounds.',
    icon: <MessageCircle className="w-6 h-6 text-orange-400" />,
    ctaText: "See our strategy",
  },
  {
    id: 'product-docs',
    href: '/services/technical-writing-services',
    title: 'Product Documentation',
    description: 'API references, SDK guides, integration walkthroughs, quickstart tutorials, and architecture explainers structured code-first so developers go from discovery to first API call in minutes. Built for humans and LLM crawlers alike.',
    icon: <BookOpen className="w-6 h-6 text-yellow-400" />,
    ctaText: "See our docs",
  },
];


function CaseStudyCard({ study, usesExplore, isAdsVariant }) {
  const [showLink, setShowLink] = useState(false);
  const isDisabled = isAdsVariant;

  const cardContent = (
    <div
      className={`block border border-gray-700/50 rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black relative group transition-all duration-500 ${
        !isDisabled
          ? 'cursor-pointer hover:border-[#5F64FF]/50 hover:shadow-2xl hover:shadow-[#5F64FF]/20 hover:scale-105 hover:-translate-y-1'
          : 'hover:border-gray-600/80'
      }`}
      onMouseEnter={() => !isDisabled && setShowLink(true)}
      onMouseLeave={() => setShowLink(false)}
    >
      <div className="p-6 flex flex-col">
        <div className="h-4 mb-4 flex items-center">
          <div className={`w-6 h-6 transition-transform duration-300 ${
            showLink && !isDisabled ? 'scale-110' : ''
          }`}>{study.icon}</div>
        </div>

        <h3 className={`text-xl font-medium text-white mb-2 transition-colors duration-300 ${
          showLink && !isDisabled ? 'text-[#5F64FF]' : ''
        }`}>
          {study.title}
        </h3>

        <p className="text-gray-400 text-sm">
          {study.description}
        </p>
      </div>

      {/* Hover Link - Only shows on hover and not for ads variant */}
      {showLink && !isDisabled && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex items-center justify-between animate-in fade-in duration-200">
          <button className="text-[#5F64FF] text-sm font-medium flex items-center gap-2 transition-all duration-200 hover:text-[#4d51e0]">
            Explore
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  if (isDisabled) {
    return cardContent;
  }

  return (
    <Link href={study.href}>
      {cardContent}
    </Link>
  );
}

// Main Component
export default function RealResult({ isAdsVariant = false }) {
  return (
    <>
      <section
        className="py-16 px-4 md:px-8 lg:px-16 font-medium"
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
            <CaseStudyCard key={study.id} study={study} isAdsVariant={isAdsVariant} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          {isAdsVariant ? (
            <ContactPopupButton 
              buttonText="Book a Strategy Call" 
              width="w-52" 
              height="h-11" 
              textSize="text-sm" 
              textWeight="quicksand-semibold" 
              thankYouPath="/services/developer-marketing-agency/thankyou" 
            />
          ) : (
            <CalendarBooking buttonText="Book a Demo" />
          )}
        </div>
      </section>
    </>
  );
}
