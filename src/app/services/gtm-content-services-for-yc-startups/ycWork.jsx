"use client";

import React, { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RightIcon from "./svg/correct";

const YCWork = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const allCards = [
    {
      id: "aviator",
      title: "Aviator",
      category: "ENTERPRISE AI AGENT PLATFORM",
      link: "https://www.aviator.co/",
      description:
        "Supporting Aviator with technical blogs and SEO-driven content to articulate their AI agent-based approach to DevOps automation. Our work helps translate complex workflows into content that builds trust with engineering leaders.",
      achievement: "Pivot-aligned technical content delivered in days",
      image: "/ai-page/aviator.png",
      alt: "Kubiya Dashboard",
    },
    {
      id: "middleware",
      title: "Middleware",
      category: "UNIFIED OBSERVABILITY PLATFORM",
      link: "https://middleware.io",
      description:
        "We help Middleware publish technical blogs on topics like OpenTelemetry, log pipelines, cloud-native observability, and monitoring at scale. Each piece is SEO-optimized to drive organic growth while staying deeply technical for platform engineers.",
      achievement: "Technical blogs across observability and DevOps",
      image: "/ai-page/middleware.png",
      alt: "Middleware Dashboard",
    },
    {
      id: "getmocha",
      title: "Getmocha",
      category: "MONITORING & ANALYTICS",
      link: "https://getmocha.com/",
      description:
        "We produce technical blogs and SEO content for GetMocha covering frontend observability, performance bottlenecks, and developer experience. Our work helps position Mocha as a go-to solution for engineering teams focused on web performance and user impact.",
      achievement: "Consistent, technical content shipped on schedule",
      image: "/ai-page/getmocha.png",
      alt: "DataDog Dashboard",
    },
    {
      id: "qodo",
      title: "Qodo",
      category: "AI AGENT TESTING",
      link: "https://www.qodo.ai",
      description:
        "Supporting Qodo’s early GTM with Reddit engagement, explainer videos, and comparison-style blogs that differentiate them from tools like Copilot, Cursor, and Replit. All content is geared toward driving top-of-funnel visibility and developer onboarding.",
      achievement: "Comparison guides, Reddit traction & explainer video",
      image: "/ai-page/qodo.png",
      alt: "AI Agent Testing Dashboard",
    },


  ];

  const createCardSets = () => {
    const sets = [];
    const cardsPerSet = window.innerWidth < 1024 ? 1 : 2;

    for (let i = 0; i < allCards.length; i += cardsPerSet) {
      sets.push(allCards.slice(i, i + cardsPerSet));
    }

    return sets;
  };

  const [cardSets, setCardSets] = useState(() => {
    const sets = [];
    for (let i = 0; i < allCards.length; i += 2) {
      sets.push(allCards.slice(i, i + 2));
    }
    return sets;
  });

  React.useEffect(() => {
    const handleResize = () => {
      const newSets = createCardSets();
      setCardSets(newSets);
      setCurrentSet(0);
    };

    if (typeof window !== 'undefined') {
      const newSets = createCardSets();
      setCardSets(newSets);

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const nextSet = () => {
    setCurrentSet((prev) => (prev + 1) % cardSets.length);
  };

  const prevSet = () => {
    setCurrentSet((prev) => (prev - 1 + cardSets.length) % cardSets.length);
  };

  const currentCards = cardSets[currentSet] || [];

  return (
    <div
      style={{
        background: "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="max-w-6xl mx-auto text-center relative z-10 pt-4">
        <div className="quicksand-bold text-[37px] max-sm:text-[25px] tracking-tighter leading-[40px] text-white text-center flex justify-center mb-2">
          <h2 className=" md:leading-[50px] text-center max-lg:mx-auto tracking-wide">
            Trusted by <span className="text-orange-500"> YC backed </span> Founders {" "}
          </h2>
        </div>

        <div className="flex justify-center my-6 mb-8">
          <div className="w-[148px] h-1 rounded-full"
            style={{
              backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
            }}
          ></div>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto mb-8">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
            From your first landing page to your product docs — we help you go to market faster with content that speaks to devs, wins trust, and drives adoption.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-5 lg:p-10">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl w-full mx-auto mb-8">
            {currentCards.map((card, index) => (
              <div
                key={`${card.id}-${currentSet}-${index}`}
                className="relative group"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="h-[600px] relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
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
                            alt={card.alt}
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

                    <p className="h-20 text-sm text-gray-400 tracking-wider leading-relaxed font-light mb-8">
                      {card.description}
                    </p>

                    <div className="flex items-center space-x-3">
                      <RightIcon />
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
              disabled={cardSets.length <= 1}
              className="w-10 h-10 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-full flex items-center justify-center text-white hover:bg-slate-700/80 hover:border-purple-500/30 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
            </button>

            <button
              onClick={nextSet}
              disabled={cardSets.length <= 1}
              className="w-10 h-10 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-full flex items-center justify-center text-white hover:bg-slate-700/80 hover:border-purple-500/30 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {cardSets.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSet(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSet
                  ? 'bg-purple-500 w-6'
                  : 'bg-slate-600 hover:bg-slate-500'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YCWork;