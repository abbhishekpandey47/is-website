
"use client";
import React, { useState, useEffect } from 'react';

const PlaybooksSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
          {/* Main Heading */}
          <h1
            className={`text-center text-5xl md:text-6xl lg:text-7xl mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="text-white font-bold tracking-tight">
              Why These{" "}
            </span>
            <span
              className="font-bold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Playbooks
            </span>
            <span className="text-white font-bold tracking-tight"> Exist</span>
          </h1>

          {/* Subtitle */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <p className="text-gray-400 text-lg mb-4 font-light tracking-tight leading-relaxed">
              Early-stage software teams don't fail because of product issues.
            </p>
            <p className="text-gray-400 text-base font-light tracking-tight leading-relaxed max-w-3xl mx-auto">
              They fail because they can't communicate value to developers, show up where developers hang out, or build repeatable distribution engines.
            </p>
          </div>

          {/* Content Box */}
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="border-l-4 border-purple-600 bg-gradient-to-r from-[#1a1a2e]/80 to-transparent backdrop-blur-sm rounded-r-lg p-8 md:p-10">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-6 tracking-tight">
                Developer marketing today is distribution-first.
              </h3>
              
              <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed mb-6">
                Reddit, Dev.to, Daily.dev, Hacker News, and LLM-driven search are shaping developer discovery.
              </p>
              
              <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed">
                Infrasity's playbooks exist to give early-stage teams a{" "}
                <span className="text-purple-400 font-bold">repeatable</span>,{" "}
                <span className="text-purple-400 font-bold">technical</span>,{" "}
                <span className="text-purple-400 font-bold">credibility-first system</span>{" "}
                for showing up across these surfaces.
              </p>
            </div>
          </div>

          {/* Decorative line */}
          <div
            className={`w-full h-px mt-16 shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 transition-all duration-1000 ${
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