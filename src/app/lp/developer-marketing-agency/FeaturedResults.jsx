"use client";

import Link from "next/link";
import Image from "next/image";
import { featuredCaseStudies } from "./featuredCaseStudies";

export default function FeaturedResults() {
  const baseUrl = "https://www.infrasity.com";

  // JSON-LD Schema for Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Developer Marketing Agency",
    provider: {
      "@type": "Organization",
      name: "Infrasity",
      url: baseUrl,
    },
    description: "Developer marketing services including technical content, developer relations, and B2B video production for SaaS, DevTool, and infrastructure companies.",
  };

  // JSON-LD Schema for ItemList (case studies)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Developer Marketing Case Studies",
    description: "Case studies showcasing successful developer marketing outcomes",
    itemListElement: featuredCaseStudies.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${baseUrl}/case-studies/${study.slug}`,
        name: `${study.company} case study`,
        about: `developer marketing case study, ${study.tags.join(", ")} growth`,
        description: `${study.company} achieved ${study.outcome}`,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section
        aria-labelledby="featured-results-heading"
        data-test="featured-results"
        className="py-20 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              id="featured-results-heading"
              className="text-4xl lg:text-5xl font-black mb-8"
              style={{
                fontFamily: 'Quicksand',
                fontWeight: 800,
                letterSpacing: '-0.01em',
                color: '#EDEAF2',
                textShadow: '0 0 12px rgba(162, 89, 255, 0.15)'
              }}
            >
              Success Stories from <span className="text-[#A259FF]" style={{ textShadow: '0 0 8px rgba(162, 89, 255, 0.4)' }}>B2B SAAS Startups</span>
            </h2>
            <p
              className="text-xl max-w-4xl mx-auto leading-relaxed"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                color: '#C9C4D6'
              }}
            >
              See how leading startups transformed their developer marketing into growth engines.
            </p>
          </div>

          {/* Grid of Case Study Cards */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-12 mb-16">
            {featuredCaseStudies.map((study) => (
              <div
                key={study.slug}
                data-test="featured-card"
                className="bg-white/3 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
              >
                {/* Logo + Company Name */}
                <div className="flex items-center space-x-4 mb-6">
                  {study.logo ? (
                    <Image
                      src={study.logo}
                      alt={`${study.company} logo`}
                      width={60}
                      height={60}
                      className="rounded-md mt-[-1.25rem]"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-[60px] h-[60px] rounded-md mt-[-1.25rem] bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {study.company.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-[1.25rem] font-bold text-white font-['Inter',sans-serif]">
                      {study.company}{study.funding ? ` - ${study.funding}` : ''}
                    </h3>
                    {study.description && (
                      <p className="text-gray-400 mb-6 text-sm font-['Inter',sans-serif] italic text-[0.80rem]">
                        {study.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Large Metric */}
                <div className="text-6xl font-black text-[#A259FF] mb-3">
                  {study.metric}
                </div>
                <div className="text-xl text-white mb-4 font-medium">
                  {study.metricLabel}
                </div>

                {/* Outcome Description */}
                <p className="text-gray-300 mb-6 leading-relaxed font-['Inter',sans-serif]">
                  {study.outcome}
                </p>

                {/* Tags as Bullet Points */}
                <div className="space-y-3 mb-6">
                  {study.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                      <span className="font-['Inter',sans-serif]">{tag}</span>
                    </div>
                  ))}
                </div>

                {/* Case Study Link */}
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10 hover:text-white hover:border-white/30 text-gray-300 cursor-pointer"
                  aria-label={`${study.company} case study: ${study.metric} ${study.metricLabel}`}
                  data-test="featured-card-link"
                >
                  <span className="font-medium font-['Inter',sans-serif]">
                    Case Study
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center">
            <Link
              href="/case-studies"
              data-test="featured-view-all"
              className="inline-flex items-center text-base font-medium text-white hover:text-[#A259FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:ring-offset-2 focus:ring-offset-[#0B0B14] rounded-md px-4 py-2"
            >
              View all case studies
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
