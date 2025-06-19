"use client";

import React, { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const YCWork = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const cardSets = [
    // Set 1 - Original cards
    [
      {
        id: "kubiya",
        title: "Kubiya.ai",
        category: "ENTERPRISE AI AGENT PLATFORM",
        link: "https://kubiya.ai",
        description:
          "Translated complex agent features into a clear, responsive landing page delivered in days. Our content guides help engineering users onboard quickly to their unified observability dashboard.",
        achievement: "Delivered in 3 days",
        image: "/ai-page/kubiya.png",
        alt: "Kubiya Dashboard",
      },
      {
        id: "middleware",
        title: "Middleware",
        category: "UNIFIED OBSERVABILITY PLATFORM",
        link: "https://middleware.io",
        description:
          "Made technical UIs approachable with content guides and use-case write-ups that explain dashboards, alerts and logs in plain language for faster engineering onboarding.",
        achievement: "50% faster onboarding",
        image: "/ai-page/middleware.png",
        alt: "Middleware Dashboard",
      },
    ],
  ];

  const nextSet = () => {
    setCurrentSet((prev) => (prev + 1) % cardSets.length);
  };

  const prevSet = () => {
    setCurrentSet((prev) => (prev - 1 + cardSets.length) % cardSets.length);
  };

  const goToSet = (index) => {
    setCurrentSet(index);
  };

  const currentCards = cardSets[currentSet];

  return (
    <div
      style={{
        background: "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-6xl mx-auto text-center relative z-10 py-10 pt-4">
        <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            Our <span className="text-orange-500">YC</span> Work{" "}
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto mb-8">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
            Trusted by Y Combinator-backed startups to deliver technical content
            and conversion-focused websites.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-10">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl w-full mx-auto mb-8">
            {currentCards.map((card) => (
              <div
                key={card.id}
                className="relative group"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                  style={{
                    background: hoveredCard === card.id
                      ? "#2c3077" 
                      : "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
                    border: "2px solid #2f2f37",
                    position: "relative",
                    overflow: "hidden",
                    transition: "background 0.6s ease"
                  }}
                >
                  {/* Glowy gradient overlay animation */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(600px circle at ${hoveredCard === card.id ? '100% 0%' : '120% -20%'}, 
                        rgba(139, 92, 246, ${hoveredCard === card.id ? '0.3' : '0'}) 0%, 
                        rgba(59, 130, 246, ${hoveredCard === card.id ? '0.2' : '0'}) 30%, 
                        rgba(147, 51, 234, ${hoveredCard === card.id ? '0.1' : '0'}) 50%, 
                        transparent 70%)`,
                      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: hoveredCard === card.id ? 'scale(1)' : 'scale(0.8)',
                      opacity: hoveredCard === card.id ? 1 : 0
                    }}
                  />
                  <div
                    className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500 ${hoveredCard === card.id
                        ? "scale-[3] opacity-60"
                        : "scale-100 opacity-30"
                      }`}
                  ></div>

                  <div className="h-80 relative overflow-hidden">
                    <div className="absolute top-4 left-4 right-4 bottom-4">
                      <div
                        className="bg-white/95 rounded-xl p-4 h-full relative overflow-hidden"
                        style={{
                          border: "1px solid #5c5c63",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center text-slate-600 text-lg font-medium">
                          <Image
                            src={card.image}
                            alt="Kubiya Dashboard"
                            layout="fill"
                            objectFit="cover"
                            className="absolute inset-0 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-2xl font-bold text-white tracking-tighter font-sans">
                        {card.title}
                      </h2>

                      <Link href={card.link} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight className="text-slate-400 w-7 h-7 transition-all rounded-sm duration-300 group-hover:text-purple-400 border-[1.5px] border-[#5c5c63]" />
                     </Link>
                     
                    </div>

                    <div className="mb-3">
                      <span className="text-orange-400 text-sm tracking-wide uppercase">
                        {card.category}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 tracking-wider leading-relaxed font-light mb-8">
                      {card.description}
                    </p>

                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-400 font-light">
                        {card.achievement}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-6 max-w-md mx-auto">

            <div className="flex-1 h-2 bg-slate-800/60 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/30">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
                style={{
                  width: `${((currentSet + 1) / cardSets.length) * 100}%`,
                  borderRadius: "9999px",
                }}
              />
            </div>


            <button
              onClick={prevSet}
              className="w-10 h-10 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-full flex items-center justify-center text-white hover:bg-slate-700/80 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
            </button>

            <button
              onClick={nextSet}
              className="w-10 h-10 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-full flex items-center justify-center text-white hover:bg-slate-700/80 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YCWork;