"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import CaseStudyCard from "./CaseStudyCard";

// Success stories data
const caseStudies = [
  {
    logo: "/playbook/fireflylogo.png",
    logoAlt: "Firefly Logo",
    company: "Firefly",
    funding: "$23 M Series A Startup",
    description: "Shifted from fragmented documentation to a developer-first content engine.",
    tags: [
      "Strategic technical content",
      "Developer community activation",
      "SEO-optimized documentation"
    ],
    slug: "case-study-series-a-cloud-developer-marketing",
    imageExt: "webp",
    testimonial: "Infrasity was quick to onboard and understand how to best show off the capabilities of Firefly's cloud asset management. Team has been super responsive and collaborative.",
    testimonialAuthor: "Cindy Blake",
    testimonialRole: "VP Marketing, Firefly",
    testimonialImage: "/Testimon/cindyFirefly.jpg",
    caseStudyTitle: "From Fragmentation to Developer Community Trust: How Firefly Built Content Authority",
    caseStudyDesc: "Read the full case study to see how we helped Firefly create a developer-first content engine that increased organic traffic by 110% and established them as an industry authority."
  },
  {
    logo: "/CommLogo/scalekit-logo.svg",
    logoAlt: "Scalekit Logo",
    company: "Scalekit",
    funding: "$5.5M Seed Startup",
    description: "Launched from stealth to developer adoption in under 9 months.",
    tags: [
      "Interactive code samples",
      "Developer-first messaging",
      "Community-driven growth"
    ],
    slug: "scalekit-case-study",
    imageExt: "png",
    testimonial: "Infrasity has helped the client achieve increased organic traffic, higher engagement rates on content, and measurable improvements in search rankings. The team's work has contributed to the client's strengthened market position and visibility among key audiences in identification technology.",
    testimonialAuthor: "Saif Ali Shaik",
    testimonialRole: "Developer Advocate, Scalekit",
    testimonialImage: "/Testimon/SaifScalekit.png",
    caseStudyTitle: "Stealth to Scale: How Scalekit Achieved 3X Developer Signups in 9 Months",
    caseStudyDesc: "Read the full case study to see how we helped Scalekit launch with impact, identifying early adopter communities and building a viral growth loop with targeted developer engagement."
  }
];

export default function FeaturedResults({ isAdsVariant = false }) {
  const baseUrl = "https://www.infrasity.com";
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

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
    itemListElement: caseStudies.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${baseUrl}/case-studies/${study.slug}`,
        name: `${study.company} case study`,
        about: `developer marketing case study, ${study.tags.join(", ")} growth`,
        description: `${study.company} achieved ${study.metric} ${study.metricLabel}`,
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
        className="py-20 relative overflow-hidden"
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-10" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full filter blur-3xl opacity-10" />
        </div>

        <div 
          className="max-w-6xl mx-auto px-6 relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              id="featured-results-heading"
              className="text-4xl lg:text-5xl font-black mb-8"
              style={{
                fontFamily: 'Quicksand',
                fontWeight: 800,
                letterSpacing: '-0.01em',
              }}
            >
              Success Stories from <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>B2B SAAS Startups</span>
            </h2>
            <div className="flex justify-center mb-8">
              <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
            </div>
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

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-8">
                {caseStudies.map((study) => (
                  <div
                    key={study.slug}
                    className="flex-shrink-0 w-full"
                  >
                    <CaseStudyCard study={study} isAdsVariant={isAdsVariant} />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="p-2 rounded-lg border border-gray-600 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Previous case study"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="p-2 rounded-lg border border-gray-600 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Next case study"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* View All Link */}
          {!isAdsVariant && (
            <div className="text-center mt-16">
              <Link
                href="/case-studies"
                data-test="featured-view-all"
                className="inline-flex items-center text-base font-medium text-white hover:text-[#6b5be7] transition-colors"
              >
                View all case studies
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
          )}
        </div>
      </section>
    </>
  );
}
