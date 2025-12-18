"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
      buttonText: "Read Playbook",
      link: "/playbook/developer-marketing"
    },
    {
      id: 2,
      badge: "Playbook",
      title: "Reddit B2B Marketing Playbook (2025 Edition)",
      description: "A tactical system for building developer visibility on Reddit — including account warming, karma strategy, thread mapping, safe engagement, comment frameworks, and Infrasity's 3-phase execution process.",
      buttonText: "Read Playbook",
      link: '/playbook/reddit-b2b-marketing'
    }
  ];

  return (
    <div className=" w-full relative overflow-hidden">
      {/* Background with theme */}
      <div className="absolute inset-0 bg-black">
        <div className="whyinfra absolute inset-0"></div>
      </div>

      <section  id="playbook-pillars"  className="py-20 px-4 md:px-12 lg:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight quicksand-bold">
              <span className="text-white">Our Playbooks for </span>
              <span className="specialtext">
                Early-Stage Developer Startups
              </span>
            </h1>
            <p className="text-[white] text-base md:text-lg quicksand-semibold max-w-3xl mx-auto leading-relaxed">
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
                  backgroundImage: "radial-gradient(circle at top left, rgba(136, 136, 136, 0.2) 0%, transparent 70%)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                  transitionDelay: `${400 + index * 150}ms`,
                }}
              >
                {/* Badge */}
                <div className="mb-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs quicksand-semibold"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    {playbook.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white text-2xl md:text-3xl quicksand-bold mb-4 tracking-tight leading-snug">
                  {playbook.title}
                </h3>

                {/* Description */}
                <p className="text-[white] text-sm md:text-base quicksand-light mb-6 leading-relaxed">
                  {playbook.description}
                </p>

                {/* Button */}
                <Link href={playbook.link}>
                  <button
                    className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg quicksand-semibold text-sm transition-all duration-300 hover:gap-3 bg-btnprimary hover:bg-btnprimaryhov text-white"
                    style={{
                      boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.3)",
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
                </Link>

                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at top right, rgba(255, 255, 255, 0.05) 0%, transparent 60%)",
                  }}
                />
              </div>
            ))}
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

export default PlaybooksCardsSection;