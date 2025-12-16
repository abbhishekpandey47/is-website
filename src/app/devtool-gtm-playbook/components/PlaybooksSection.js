"use client";
import React, { useState, useEffect } from 'react';

const PlaybooksSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full  w-full relative overflow-hidden">
      {/* Background with theme */}
      <div className="absolute inset-0 bg-black">
        <div className="whyinfra absolute inset-0"></div>
      </div>

      <section className="py-20 px-4 md:px-12 lg:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Heading */}
          <h1
            className={`text-center text-5xl md:text-6xl lg:text-7xl mb-8 quicksand-bold transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="text-white tracking-tight">
              Why These{" "}
            </span>
            <span className="specialtext tracking-tight">
              Playbooks
            </span>
            <span className="text-white tracking-tight"> Exist</span>
          </h1>

          {/* Subtitle */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <p className="text-[wheat] text-lg mb-4 quicksand-semibold tracking-tight leading-relaxed">
              Early-stage software teams don't fail because of product issues.
            </p>
            <p className="text-[wheat] text-base quicksand-light tracking-tight leading-relaxed max-w-3xl mx-auto">
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
            <div className="border-l-4 border-white bg-[#888]/20 backdrop-blur-sm rounded-r-lg p-8 md:p-10 ring-1 ring-black/5">
              <h3 className="text-white text-xl md:text-2xl quicksand-bold mb-6 tracking-tight">
                Developer marketing today is distribution-first.
              </h3>
              
              <p className="text-[wheat] text-base md:text-lg quicksand-semibold leading-relaxed mb-6">
                Reddit, Dev.to, Daily.dev, Hacker News, and LLM-driven search are shaping developer discovery.
              </p>
              
              <p className="text-[wheat] text-base md:text-lg quicksand-semibold leading-relaxed">
                Infrasity's playbooks exist to give early-stage teams a{" "}
                <span className="text-white quicksand-bold">repeatable</span>,{" "}
                <span className="text-white quicksand-bold">technical</span>,{" "}
                <span className="text-white quicksand-bold">credibility-first system</span>{" "}
                for showing up across these surfaces.
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