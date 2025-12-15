"use client";
import React, { useState, useEffect } from 'react';
import { MessageSquare, Share2, FileText, Layers } from 'lucide-react';
import Link from 'next/link';

const PlaybookPillars = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);

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
      link: "/services/developer-marketing-agency"
    },
    {
      id: 2,
      icon: Share2,
      title: "Reddit B2B Marketing Playbook",
      description: "Master community-driven growth on Reddit without getting banned.",
      buttonText: "Explore this Playbook",
      available: true,
      link: "/services/reddit-marketing-agency"
    },
    {
      id: 3,
      icon: FileText,
      title: "Product Documentation Playbook",
      description: "Docs, APIs, SDKs, and onboarding flows that convert developers.",
      buttonText: "Notify Me",
      available: false,
      link: null
    },
    {
      id: 4,
      icon: Layers,
      title: "Content & Distribution Playbook",
      description: "Blog, SEO, forums, newsletters — systematic content distribution.",
      buttonText: "Notify Me",
      available: false,
      link: null
    }
  ];

  const handleCardClick = (id) => {
    setClickedCard(id);
    setTimeout(() => setClickedCard(null), 1000);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background with theme */}
      <div className="absolute inset-0 bg-black">
        <div className="whyinfra absolute inset-0"></div>
      </div>

      <section className="py-20 px-4 md:px-12 lg:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header with Grid Background */}
          <div className="relative mb-16">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)'
            }}></div>

            <div
              className={`text-center transition-all duration-1000 relative z-10 ${
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
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isClicked = clickedCard === pillar.id;
              
              return (
                <div
                  key={pillar.id}
                  onClick={() => handleCardClick(pillar.id)}
                  className={`group relative rounded-2xl p-8 transition-all duration-700 hover:scale-[1.02] overflow-hidden cursor-pointer ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    background: 'rgba(136, 136, 136, 0.2)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: isClicked 
                      ? '2px solid rgba(255, 255, 255, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isClicked
                      ? '0 8px 32px 0 rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2)'
                      : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                    transitionDelay: `${400 + index * 150}ms`,
                  }}
                >
                  {/* Subtle gradient overlay */}
                  <div 
                    className={`absolute inset-0 opacity-50 pointer-events-none transition-opacity duration-300 ${
                      isClicked ? 'opacity-100' : 'opacity-50'
                    }`}
                    style={{
                      background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
                    }}
                  />

                  {/* Shine effect on click */}
                  {isClicked && (
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                        animation: 'pulse 1s ease-out'
                      }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Coming Soon Badge */}
                    {!pillar.available && (
                      <div className="absolute top-0 right-0">
                        <span
                          className="text-xs quicksand-semibold px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: "rgba(136, 136, 136, 0.3)",
                            backdropFilter: "blur(10px)",
                            color: "#f5deb3",
                            border: "1px solid rgba(255, 255, 255, 0.1)"
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
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: isClicked
                          ? '0 4px 12px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          : '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <Icon
                        className="w-6 h-6 transition-colors duration-300"
                        style={{
                          color: "#f5deb3",
                        }}
                      />
                    </div>

                    {/* Text Content */}
                    <h3 className="text-white text-xl md:text-2xl quicksand-bold mb-4 tracking-tight leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-[wheat] text-sm md:text-base quicksand-light mb-6 leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Button */}
                    {pillar.link ? (
                      <Link href={pillar.link} className="block">
                        <button
                          className="w-full py-3 px-4 rounded-lg quicksand-semibold text-sm flex items-center justify-between transition-all duration-300"
                          style={{
                            backgroundColor: "rgba(136, 136, 136, 0.3)",
                            color: "#ffffff",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(136, 136, 136, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(136, 136, 136, 0.3)";
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
                      </Link>
                    ) : (
                      <button
                        className="w-full py-3 px-4 rounded-lg quicksand-semibold text-sm flex items-center justify-between transition-all duration-300 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: "rgba(136, 136, 136, 0.15)",
                          color: "#9ca3af",
                          backdropFilter: "blur(10px)",
                        }}
                        disabled={!pillar.available}
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
                    )}
                  </div>

                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at top right, rgba(136, 136, 136, 0.1) 0%, transparent 60%)",
                    }}
                  />

                  {/* Bottom highlight line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
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