"use client";
import React, { useState, useEffect } from 'react';

const PlaybooksCardsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const playbooks = [
    {
      id: 1,
      badge: "Playbook",
      title: "Developer Marketing Playbook",
      description: "A complete framework for developer-first GTM — covering developer psychology, technical content, documentation & SDK matness, community engagement, landing pages, and the Why →Try →Buy →Fly adoption model.",
      buttonText: "Read Playbook"
    },
    {
      id: 2,
      badge: "Playbook",
      title: "Reddit B2B Marketing Playbook (2025 Edition)",
      description: "A tactical system for building developer visibility on Reddit — including account warming, karma strategy, thread mapping, safe engagement, comment frameworks, and Infrasity's 3-phase execution process.",
      buttonText: "Read Playbook"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
              <span className="text-white font-bold">Our Playbooks for </span>
              <span
                className="font-bold"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Early-Stage Developer Startups
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg font-light max-w-3xl mx-auto leading-relaxed">
              These playbooks give early-stage teams a practical, repeatable system for developer-led growth.
            </p>
          </div>

          {/* Playbook Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {playbooks.map((playbook, index) => (
              <div
                key={playbook.id}
                className={`group relative rounded-2xl p-6 transition-all duration-700 hover:scale-[1.02] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  backgroundColor: "#000000",
                  backgroundImage: "radial-gradient(circle at top left, #2c2c36 0%, transparent 70%)",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                  border: "2px solid rgba(60, 63, 84, 0.3)",
                  transitionDelay: `${400 + index * 150}ms`,
                }}
              >
                {/* Badge */}
                <div className="mb-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: "rgba(168, 85, 247, 0.15)",
                      color: "#a855f7",
                      border: "1px solid rgba(168, 85, 247, 0.3)",
                    }}
                  >
                    {playbook.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-snug">
                  {playbook.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm md:text-base font-light mb-6 leading-relaxed">
                  {playbook.description}
                </p>

                {/* Button */}
                <button
                  className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 hover:gap-3"
                  style={{
                    backgroundColor: "#a855f7",
                    color: "#ffffff",
                    boxShadow: "0 4px 12px 0 rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.07)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#9333ea";
                    e.currentTarget.style.boxShadow = "0 6px 16px 0 rgba(168, 85, 247, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#a855f7";
                    e.currentTarget.style.boxShadow = "0 4px 12px 0 rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.07)";
                  }}
                >
                  <span>{playbook.buttonText}</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>

                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at top right, rgba(168, 85, 247, 0.05) 0%, transparent 60%)",
                  }}
                />
              </div>
            ))}
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

export default PlaybooksCardsSection;