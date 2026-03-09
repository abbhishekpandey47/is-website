"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

// Success stories data
const caseStudies = [
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
    slug: "case-study-series-a-cloud-developer-marketing",
    imageExt: "webp"
  },
  {
    logo: "/CommLogo/scalekit-logo.svg",
    logoAlt: "Scalekit Logo",
    company: "Scalekit",
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
    slug: "scalekit-case-study",
    imageExt: "png"
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
        className="py-20 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
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

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-8">
                {caseStudies.map((study) => (
                  <div
                    key={study.slug}
                    className="flex-shrink-0 w-full"
                  >
                    {/* Case Study Card - Respond Design */}
                    <div
                      className="flex flex-col md:flex-row gap-8 p-8 md:p-8 rounded-3xl"
                      style={{
                        background: "#0d0a1a",
                        borderRadius: 24,
                        minHeight: 400,
                      }}
                    >
                      {/* Left Section - Company Info and Metrics */}
                      <div className="flex flex-col justify-between md:w-1/2">
                        {/* Logo and Company Name */}
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{
                              background: "#fff",
                              border: "1px solid #d6d6d6",
                              borderRadius: 12,
                              width: 48,
                              height: 48,
                              boxShadow: "20px 20px 40px 0px rgba(0,0,0,0.12),10px 10px 25px 0px rgba(0,0,0,0.08)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: 16,
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            {/* Figma gradient overlay */}
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: 12,
                                background:
                                  "linear-gradient(0deg, rgb(225, 225, 225) 0%, rgba(225, 225, 225, 0.6) 30%, rgba(225, 225, 225, 0.2) 50%, rgba(225, 225, 225, 0) 70%)",
                                zIndex: 1,
                              }}
                            />
                            <div style={{ position: "relative", zIndex: 2 }}>
                              <Image
                                src={study.logo}
                                alt={study.logoAlt}
                                width={27}
                                height={27}
                              />
                            </div>
                          </div>
                          <div style={{ color: "#f2f2f2", fontWeight: 600, fontSize: 30, fontFamily: "Inter, sans-serif" }}>
                            {study.company}
                          </div>
                        </div>

                        {/* Metrics and Outcome */}
                        <div className="flex flex-col justify-start">
                          {/* Large Metric */}
                          <div style={{ color: "#6b5be7", fontWeight: 600, fontSize: 40, fontFamily: "Inter, sans-serif", marginBottom: 8, marginTop: 24 }}>
                            {study.metric}
                          </div>
                          <div style={{ color: "#ebebeb", fontWeight: 500, fontSize: 16.7, fontFamily: "Inter, sans-serif", marginBottom: 24, maxWidth: 400 }}>
                            {study.metricLabel}
                          </div>

                          {/* Outcome Quote */}
                          <div style={{ color: "#ebebeb", fontWeight: 500, fontSize: 16.7, fontFamily: "Inter, sans-serif", marginBottom: 24, maxWidth: 400 }}>
                            "{study.outcome}"
                          </div>

                          {/* Funding/Company Info */}
                          <div>
                            <div style={{ color: "#f2f2f2", fontWeight: 600, fontSize: 14.6, fontFamily: "Inter, sans-serif" }}>
                              {study.company}
                            </div>
                            <div style={{ color: "#999", fontWeight: 400, fontSize: 14.6, fontFamily: "Inter, sans-serif" }}>
                              {study.funding}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Image and Details */}
                      {isAdsVariant ? (
                        <div
                          className="md:w-1/2 flex flex-col gap-4"
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                          }}
                        >
                          {/* Image */}
                          <div
                            style={{
                              borderRadius: "16px 16px 0 0",
                              overflow: "hidden",
                              width: "100%",
                              minHeight: 200,
                              maxHeight: 340,
                              background: "#222",
                            }}
                          >
                            <img
                              src={`/postimages/${study.slug}/0.${study.imageExt}`}
                              alt={`${study.company} case study`}
                              style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                            />
                          </div>

                          {/* Details Box */}
                          <div
                            style={{
                              background: "#0e0b1b",
                              border: "1px solid rgba(119,119,119,0.5)",
                              borderRadius: 22.95,
                              padding: 24,
                              marginTop: -50,
                              minHeight: 150,
                              boxSizing: "border-box",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 16 }}>
                              <div>
                                <div style={{ color: "#f2f2f2", fontWeight: 600, fontSize: 19.5, fontFamily: "Inter, sans-serif", marginBottom: 8 }}>
                                  {study.company} Growth Strategy
                                </div>
                                <div style={{ color: "#ebebeb", fontWeight: 500, fontSize: 14.6, fontFamily: "Inter, sans-serif" }}>
                                  {study.description}
                                </div>
                              </div>
                              {/* Arrow Icon - Hidden for ads */}
                              <div
                                className="w-10 h-10 border border-gray-400 rounded-xl flex items-center justify-center bg-gray-800/30 flex-shrink-0"
                                style={{ opacity: 0.5 }}
                              >
                                <svg
                                  className="w-6 h-6 text-gray-300"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2.5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 17L17 7M17 7H7M17 7V17"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="md:w-1/2 flex flex-col gap-4 group cursor-pointer"
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                          }}
                        >
                          {/* Image */}
                          <div
                            style={{
                              borderRadius: "16px 16px 0 0",
                              overflow: "hidden",
                              width: "100%",
                              minHeight: 200,
                              maxHeight: 340,
                              background: "#222",
                            }}
                          >
                            <img
                              src={`/PostImages/${study.slug}/0.${study.imageExt}`}
                              alt={`${study.company} case study`}
                              style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                            />
                          </div>

                          {/* Details Box */}
                          <div
                            style={{
                              background: "#0e0b1b",
                              border: "1px solid rgba(119,119,119,0.5)",
                              borderRadius: 22.95,
                              padding: 24,
                              marginTop: -50,
                              minHeight: 150,
                              boxSizing: "border-box",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 16 }}>
                              <div>
                                <div style={{ color: "#f2f2f2", fontWeight: 600, fontSize: 19.5, fontFamily: "Inter, sans-serif", marginBottom: 8 }}>
                                  {study.company} Growth Strategy
                                </div>
                                <div style={{ color: "#ebebeb", fontWeight: 500, fontSize: 14.6, fontFamily: "Inter, sans-serif" }}>
                                  {study.description}
                                </div>
                              </div>
                              {/* Arrow Icon */}
                              <div
                                className="w-10 h-10 border border-gray-400 rounded-xl flex items-center justify-center bg-gray-800/30 flex-shrink-0 group-hover:bg-gray-700/50 transition-all"
                              >
                                <svg
                                  className="w-6 h-6 text-gray-300"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2.5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 17L17 7M17 7H7M17 7V17"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>
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
