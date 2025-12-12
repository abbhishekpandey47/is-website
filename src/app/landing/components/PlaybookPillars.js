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
    <div className="min-h-screen w-full bg-[#0a0a0a] overflow-hidden">
      <section className="py-20 px-4 md:px-12 lg:px-16 relative">
        {/* Background gradient effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-white">The 4 Pillars of the </span>
              <span
                className="font-bold"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Playbook
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg font-light max-w-3xl mx-auto leading-relaxed">
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
                      ? "radial-gradient(circle at top left, #4C2A85 0%, transparent 70%)"
                      : "radial-gradient(circle at top left, #2c2c36 0%, transparent 70%)",
                    boxShadow: pillar.featured
                      ? "0 8px 32px 0 rgba(168, 85, 247, 0.3)"
                      : "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                    border: pillar.featured
                      ? "2px solid rgba(168, 85, 247, 0.5)"
                      : "2px solid rgba(60, 63, 84, 0.3)",
                    transitionDelay: `${400 + index * 150}ms`,
                  }}
                >
                  {/* Coming Soon Badge */}
                  {!pillar.available && (
                    <div className="absolute top-6 right-6">
                      <span
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(60, 63, 84, 0.3)",
                          color: "#9ca3af",
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
                        ? "rgba(168, 85, 247, 0.2)"
                        : "#303035",
                      boxShadow: pillar.featured
                        ? "0 4px 12px 0 rgba(168, 85, 247, 0.3)"
                        : "0 4px 12px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <Icon
                      className="w-6 h-6 transition-colors duration-300"
                      style={{
                        color: pillar.featured ? "#a855f7" : "#9ca3af",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-4 tracking-tight leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-light mb-6 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Button */}
                  <button
                    className="w-full py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-between transition-all duration-300 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: pillar.available
                        ? pillar.featured
                          ? "#a855f7"
                          : "#303035"
                        : "rgba(48, 48, 53, 0.5)",
                      color: pillar.available
                        ? "#ffffff"
                        : "#6b7280",
                      boxShadow: pillar.available
                        ? pillar.featured
                          ? "0 4px 12px 0 rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.07)"
                          : "0 4px 12px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.07)"
                        : "none",
                    }}
                    disabled={!pillar.available}
                    onMouseEnter={(e) => {
                      if (pillar.available) {
                        e.currentTarget.style.backgroundColor = pillar.featured ? "#9333ea" : "#3a3a3f";
                        if (pillar.featured) {
                          e.currentTarget.style.boxShadow = "0 6px 16px 0 rgba(168, 85, 247, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.07)";
                        }
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pillar.available) {
                        e.currentTarget.style.backgroundColor = pillar.featured ? "#a855f7" : "#303035";
                        if (pillar.featured) {
                          e.currentTarget.style.boxShadow = "0 4px 12px 0 rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.07)";
                        }
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
                        ? "radial-gradient(circle at top right, rgba(168, 85, 247, 0.1) 0%, transparent 60%)"
                        : "radial-gradient(circle at top right, rgba(168, 85, 247, 0.05) 0%, transparent 60%)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Decorative line */}
          <div
            className={`w-full h-px mt-20 shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 transition-all duration-1000 ${
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