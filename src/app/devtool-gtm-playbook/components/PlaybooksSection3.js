"use client";
import React, { useState, useEffect } from 'react';
import { Users, FileText, Rocket } from 'lucide-react';

const PlaybooksSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const pillars = [
    {
      id: 1,
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Pillar 1 — Reddit & Community Growth",
      description: "Reddit now dominates developer search queries and LLM-sourcing data. We ensure your product conversations appear in high-ranking discussions like:",
      bullets: [
        '"Best developer productivity tools"',
        '"AI tools for engineering teams"',
        '"How to measure developer performance"'
      ],
      framework: "Our framework delivers:",
      deliverables: [
        "30 community engagements/month",
        "10 credibility-positive comments",
        "LLM visibility via strategically positioned discussions",
        "Real-time keyword monitoring + early-comment placement"
      ],
      highlight: "This creates evergreen SERP presence + LLM presence for your startup."
    },
    {
      id: 2,
      icon: <FileText className="w-6 h-6 text-white" />,
      title: "Pillar 2 — Dev.to & Daily.dev Technical Storytelling",
      description: "Great startups aren't SEO-stuffers. It's insight-driven, narrative, and technically grounded.",
      approach: "Our approach:",
      approachPoints: [
        "Identifying themes & high-potential content clusters",
        "Rewrite into technical, developer-friendly articles",
        "Distribute on Dev.to + Daily.dev for maximum reach",
        "Measure impressions, reads, upvotes, referral traffic"
      ],
      example: "Example: We replicated this for Auter.ai — generating 300-400 users from a single Daily.dev post."
    },
    {
      id: 3,
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "Pillar 3 — Hacker News Launch & Amplification",
      description: "HN remains the highest influential place for founders, senior engineers, and early adopters. Our HN strategy includes:",
      features: [
        "HN-optimized titles and content angles",
        '"Show HN" or "Ask HN" submissions',
        "Early activation + sentiment management",
        "Technical replies to maintain credibility"
      ],
      highlight: "This creates spikes of high-intent founder traffic and long-tail visibility."
    }
  ];

  return (
    <div className="w-full relative overflow-hidden">
      {/* Background with theme */}
      <div className="absolute inset-0 bg-black">
        <div className="whyinfra absolute inset-0"></div>
      </div>

      <section className="py-20 px-4 md:px-12 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">

      <div
  className={`text-center mb-12 transition-all duration-1000 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
>
  <h1 className="text-4xl md:text-5xl lg:text-6xl quicksand-bold mb-6 tracking-tight">
    <span className="text-white">
      We focus on{" "}
    </span>
    <span className="specialtext">
      three pillars
    </span>
  </h1>
</div>

          {/* Three Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.id}
                className={`bg-[#888]/20 backdrop-blur-sm border border-white/10 ring-1 ring-black/5 rounded-xl p-6 transition-all duration-1000 hover:border-white/30 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                  {pillar.icon}
                </div>

                {/* Title */}
                <h3 className="text-white text-xl quicksand-bold mb-4 tracking-tight leading-snug">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-[white] text-sm quicksand-light mb-4 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Bullets */}
                {pillar.bullets && (
                  <div className="mb-4 space-y-2">
                    {pillar.bullets.map((bullet, idx) => (
                      <p key={idx} className="text-white text-sm quicksand-semibold">
                        {bullet}
                      </p>
                    ))}
                  </div>
                )}

                {/* Approach */}
                {pillar.approach && (
                  <div className="mb-3">
                    <p className="text-white text-sm quicksand-bold mb-2">{pillar.approach}</p>
                    <div className="space-y-2">
                      {pillar.approachPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-white text-xs mt-1">⚙️</span>
                          <p className="text-[white] text-xs quicksand-semibold leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Framework */}
                {pillar.framework && (
                  <div className="mb-3">
                    <p className="text-white text-sm quicksand-bold mb-2">{pillar.framework}</p>
                    <div className="space-y-2">
                      {pillar.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-white text-xs mt-1">↗</span>
                          <p className="text-[white] text-xs quicksand-semibold leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {pillar.features && (
                  <div className="mb-3 space-y-2">
                    {pillar.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-white text-xs mt-1">☑</span>
                        <p className="text-[white] text-xs quicksand-semibold leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Example */}
                {pillar.example && (
                  <p className="text-[white] text-xs quicksand-light italic mt-3 leading-relaxed">
                    {pillar.example}
                  </p>
                )}

                {/* Highlight */}
                {pillar.highlight && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-white text-xs quicksand-semibold leading-relaxed">
                      {pillar.highlight}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Statement */}
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "650ms" }}
          >
            <div className="border border-white/10 bg-[#888]/20 backdrop-blur-sm ring-1 ring-black/5 rounded-lg p-8 text-center">
              <p className="text-[white] text-base md:text-lg quicksand-semibold leading-relaxed">
                These playbooks combine these systems into structured, battle-tested frameworks that early-stage teams can adopt instantly —{" "}
                <span className="text-white quicksand-bold">without guessing</span>,{" "}
                <span className="text-white quicksand-bold">without random posting</span>, and{" "}
                <span className="text-white quicksand-bold">without wasting months</span>.
              </p>
            </div>
          </div>

          {/* Decorative line */}
          <div
            className={`w-full h-px mt-16 bg-gradient-to-r from-white/5 via-white/50 to-white/5 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          />
        </div>
      </section>
    </div>
  );
};

export default PlaybooksSection;