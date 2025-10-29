"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const successStories = [
  {
    logo: "/playbook/fireflylogo.png",
    logoAlt: "Firefly Logo",
    company: "Firefly",
    funding: "$23 M Series A Startup",
    description: "Shifted from fragmented documentation to a developer-first content engine.",
    metric: "+110%",
    metricLabel: "Organic Traffic Growth",
    outcome: "From 3.7K to 32.6K monthly organic visitors through developer-first content strategy.",
    tags: [
      "Strategic technical content",
      "Developer community activation",
      "SEO-optimized documentation"
    ],
    slug: "/case-studies/case-study-series-a-cloud-developer-marketing"
  },
  {
    logo: "/playbook/scalekit.svg",
    logoAlt: "Scalekit Logo",
    company: "scalekit",
    funding: "$5.5M Seed Startup",
    description: "Launched from stealth to developer adoption in under 9 months.",
    metric: "3X",
    metricLabel: "Developer Signups",
    outcome: "Achieved 3X more developer signups in just 9 months with targeted DevRel.",
    tags: [
      "Interactive code samples",
      "Developer-first messaging",
      "Community-driven growth"
    ],
    slug: "/case-studies/scalekit-case-study"
  }
];

export default function SuccessStories() {
  const router = useRouter();
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
    itemListElement: successStories.map((story, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${baseUrl}${story.slug}`,
        name: `${story.company} case study`,
        about: `developer marketing case study, ${story.tags.join(", ")} growth`,
        description: `${story.company} achieved ${story.metric} ${story.metricLabel}`,
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
      className="py-20 relative"
      aria-labelledby="success-stories-heading"
      data-test="featured-results"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            id="success-stories-heading"
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
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-4xl mx-auto leading-relaxed"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              color: '#C9C4D6'
            }}
          >
            See how leading startups transformed their developer marketing into growth engines.
          </motion.p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {successStories.map((story, index) => (
            <motion.div 
              key={story.slug}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/3 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
              data-test="featured-card"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={story.logo}
                  alt={story.logoAlt}
                  width={60}
                  height={60}
                  className="rounded-md mt-[-1.25rem]"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div>
                  <h3 className="text-[1.25rem] font-bold text-white font-['Inter',sans-serif]">
                    {story.company} - {story.funding}
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm font-['Inter',sans-serif] italic text-[0.80rem]">
                    {story.description}
                  </p>
                </div>
              </div>
              
              <div className="text-6xl font-black text-[#A259FF] mb-3">{story.metric}</div>
              <div className="text-xl text-white mb-4 font-medium">{story.metricLabel}</div>
              <p className="text-gray-300 mb-6 leading-relaxed font-['Inter',sans-serif]">
                {story.outcome}
              </p>
              <div className="space-y-3 mb-6">
                {story.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                    <span className="font-['Inter',sans-serif]">{tag}</span>
                  </div>
                ))}
              </div>
              <div 
                className="inline-flex items-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10 hover:text-white cursor-pointer"
                onClick={() => router.push(story.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    router.push(story.slug);
                  }
                }}
                aria-label={`${story.company} case study`}
                data-test="featured-card-link"
              >
                <span className="font-medium font-['Inter',sans-serif]">Case Study</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all case studies link */}
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => router.push('/case-studies')}
              className="inline-flex items-center text-base font-medium text-white hover:text-[#A259FF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:ring-offset-2 focus:ring-offset-[#0B0B14] rounded-md px-4 py-2"
              data-test="featured-view-all"
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
            </button>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}

