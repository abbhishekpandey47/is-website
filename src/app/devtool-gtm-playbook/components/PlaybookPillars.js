"use client";
import React, { useState, useEffect } from 'react';
import { MessageSquare, Share2, FileText, Layers } from 'lucide-react';

const PlaybookPillars = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const pillars = [
    {
      id: 1,
      icon: MessageSquare,
      title: "Developer Marketing Playbook",
      description: "Reach and engage developers where they are — authentic, technical, zero fluff.",
      buttonText: "Explore this Playbook",
      available: true,
      featured: false
    },
    {
      id: 2,
      icon: Share2,
      title: "Reddit B2B Marketing Playbook",
      description: "Master community-driven growth on Reddit without getting banned.",
      buttonText: "Explore this Playbook",
      available: true,
      featured: true
    },
    {
      id: 3,
      icon: FileText,
      title: "Product Documentation Playbook",
      description: "Docs, APIs, SDKs, and onboarding flows that convert developers.",
      buttonText: "Notify Me",
      available: false,
      featured: false
    },
    {
      id: 4,
      icon: Layers,
      title: "Content & Distribution Playbook",
      description: "Blog, SEO, forums, newsletters — systematic content distribution.",
      buttonText: "Notify Me",
      available: false,
      featured: false
    }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background with theme */}
      <div className="absolute inset-0 bg-black">
        <div className="whyinfra absolute inset-0"></div>
      </div>

      <section className="py-20 px-4 md:px-12 lg:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h1 className="text-4xl md:text-5xl quicksand-bold mb-6 tracking-tight">
              <span className="text-white">The 4 Pillars of the </span>
              <span className="specialtext">Playbook</span>
            </h1>
            <p className="text-[wheat] text-base md:text-lg quicksand-semibold max-w-3xl mx-auto leading-relaxed">
              Each pillar addresses a critical part of your go-to-market strategy.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className={`group relative rounded-2xl p-8 transition-all duration-700 hover:scale-[1.02] ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    backgroundColor: "#000000",
                    backgroundImage: pillar.featured 
                      ? "radial-gradient(circle at top left, rgba(136, 136, 136, 0.3) 0%, transparent 70%)"
                      : "radial-gradient(circle at top left, rgba(136, 136, 136, 0.15) 0%, transparent 70%)",
                    backdropFilter: "blur(8px)",
                    boxShadow: pillar.featured
                      ? "0 8px 32px 0 rgba(255, 255, 255, 0.1)"
                      : "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                    border: pillar.featured
                      ? "2px solid rgba(255, 255, 255, 0.3)"
                      : "2px solid rgba(255, 255, 255, 0.1)",
                    transitionDelay: `${400 + index * 150}ms`,
                  }}
                >
                  {/* Coming Soon Badge */}
                  {!pillar.available && (
                    <div className="absolute top-6 right-6">
                      <span
                        className="text-xs quicksand-semibold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(136, 136, 136, 0.2)",
                          color: "#f5deb3",
                        }}
                      >
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300"
                    style={{
                      backgroundColor: pillar.featured
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(136, 136, 136, 0.2)",
                      backdropFilter: "blur(8px)",
                      boxShadow: pillar.featured
                        ? "0 4px 12px 0 rgba(255, 255, 255, 0.2)"
                        : "0 4px 12px 0 rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <Icon
                      className="w-6 h-6 transition-colors duration-300"
                      style={{
                        color: pillar.featured ? "#ffffff" : "#f5deb3",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-white text-xl md:text-2xl quicksand-bold mb-4 tracking-tight leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-[wheat] text-sm md:text-base quicksand-light mb-6 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Button */}
                  <button
                    className="w-full py-3 px-4 rounded-lg quicksand-semibold text-sm flex items-center justify-between transition-all duration-300 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: pillar.available
                        ? pillar.featured
                          ? "var(--btnprimary, #ffffff)"
                          : "rgba(136, 136, 136, 0.3)"
                        : "rgba(136, 136, 136, 0.15)",
                      color: pillar.available
                        ? pillar.featured ? "#000000" : "#ffffff"
                        : "#9ca3af",
                      backdropFilter: "blur(8px)",
                      boxShadow: pillar.available
                        ? "0 4px 12px 0 rgba(0, 0, 0, 0.3)"
                        : "none",
                    }}
                    disabled={!pillar.available}
                    onMouseEnter={(e) => {
                      if (pillar.available) {
                        e.currentTarget.style.backgroundColor = pillar.featured 
                          ? "var(--btnprimaryhov, #e5e5e5)" 
                          : "rgba(136, 136, 136, 0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pillar.available) {
                        e.currentTarget.style.backgroundColor = pillar.featured 
                          ? "var(--btnprimary, #ffffff)" 
                          : "rgba(136, 136, 136, 0.3)";
                      }
                    }}
                  >
                    <span>{pillar.buttonText}</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: pillar.featured
                        ? "radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 60%)"
                        : "radial-gradient(circle at top right, rgba(136, 136, 136, 0.1) 0%, transparent 60%)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Decorative line */}
          <div
            className={`w-full h-px mt-20 bg-gradient-to-r from-white/5 via-white/50 to-white/5 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          />
        </div>
      </section>
    </div>
  );
};

export default PlaybookPillars;