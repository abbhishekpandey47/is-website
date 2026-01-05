"use client";
import React, { useState } from "react";

const defaultCaseStudies = [
  {
    id: 1,
    tag: "AI Messaging Platform",
    title: "0→40% of OPs ranking Top 5",
    company: "Respond.io",
    badge: "Ri",
    badgeColor: "bg-orange-100 text-orange-700",
    desc: "Series A ($7M)",
    link: "/case-studies/respond-io-community-led-growth-case-study",
    style:"object-cover",
    companyImg: "/trustedby/white/respond.png",
    graphImg: "https://cdn.prod.website-files.com/644e8b4e20ba395ec31a0017/65df7c6d1d6e96eb38db9165_0-27M.svg",
  },
  {
    id: 2,
    tag: "DevTools / Infra (IaC)",
    title: "0→13.8% Organic traffic in 90 days.",
    company: "Terrateam",
    badge: "Tt",
    badgeColor: "bg-green-100 text-green-700",
    desc: "Bootstrapped",
    link: "/case-studies/terrateam-case-study",
    companyImg: "/trustedby/white/terrateam.png",
    style: "object-contain",
    graphImg: "https://cdn.prod.website-files.com/644e8b4e20ba395ec31a0017/65df7c6d2fb5977482cb626f_Group%201000007033.svg",
  },
];

export default function CaseStudies({
  studies = defaultCaseStudies,
  heading = "How B2B teams like yours are winning AI visibility",
  subheading = "Examples of recent work with fast-growing developer tools and B2B SaaS teams showing how they improved visibility, rankings, and adoption by being consistently cited in tools like ChatGPT, Perplexity, and Google AI.",
  className = "",
}) {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? studies.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrent((prev) => (prev === studies.length - 1 ? 0 : prev + 1));
  };

  const study = studies[current % studies.length];

  return (
    <div className={`w-full py-16 px-4 flex flex-col gap-14 ${className}`}>
            <div className="flex flex-col items-center text-center mb-10">
					 <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
          <p className="text-violet-100 text-base font-medium">Trusted</p>
        </div>
          <h2 className="text-white font-manrope text-[2.25rem] md:text-[2.75rem] font-medium leading-[1.1] tracking-tight">
            {heading}
          </h2>
          <p className="text-white/75 font-manrope text-lg font-medium max-w-2xl mt-4">
            {subheading}
          </p>
				</div>
      <div className="flex justify-center">
        <div className="rounded-2xl shadow-lg p-12 flex flex-col md:flex-row gap-10 items-stretch w-full max-w-6xl border border-[#fff]/30 relative transition-all duration-200 min-h-[420px]">
          {/* Left column: text */}
          <div className="flex-1 flex flex-col gap-3 min-w-[220px] justify-center">
            {/* Category Badge */}
            <div className="mb-2">
              <span className="text-xs py-1 rounded font-manrope text-white/80 font-medium tracking-wide inline-block">{study.tag}</span>
            </div>
            {/* Title with blue highlight */}
            <div className="header-case-study text-2xl font-bold text-white mb-2 font-manrope leading-tight">
              <span className="blue-highlight bg-[#2e2e38] text-[#695AE1] px-2 rounded font-bold">{study.title.split(" ")[0]}</span>
              {" "}{study.title.substring(study.title.indexOf(" ")+1)}
            </div>
            {/* Company info and badge */}
            <div className="case-study-wrapper flex flex-col mb-2">
              <img src={study.companyImg} alt={study.badge} className={`case-study-image rounded h-[2rem] w-[5rem] ${study.style}`} />
              <div className="case-study-category text-xs text-white/60">{study.desc}</div>
            </div>
            {/* Case study link with arrow */}
            <a href={study.link} className="blue-link-wrapper flex items-center gap-2 text-[#695AE1] font-medium hover:underline transition">
              <span className="blue-link">Case study</span>
              <span className="arrow-wrapper-new ml-0"> 
                <span className="w-6 h-[2px] bg-[#695AE1] inline-block align-middle mr-[-0.5rem]"></span>
                <span className="arrow-right  inline-block align-middle -rotate-45 border-[#695AE1] border-r-2 border-b-2 w-2 h-2"></span>
              </span>
            </a>
          </div>
          {/* Middle column: graph */}
          <div className="flex items-center justify-center">
            <div className="hero-slider-image-wrapper rounded-xl p-6 flex items-center justify-center w-full border border-[#232323] relative bg-[white] min-h-[320px]">
              <img src={study.graphImg} alt="Graphic representation of growth" className="image-8 graph-line h-[270px] object-contain" />
            </div>
          </div>
          {/* Right column: arrows at bottom */}
          <div className="flex flex-col justify-end items-end flex-1 h-full">
            <div className="flex gap-3 z-20 mb-2">
              <button
                aria-label="Previous case study"
                onClick={handlePrev}
                className="bg-[#232323] border border-[#333] text-white rounded-lg p-2 hover:bg-[#333] transition shadow h-10 w-10 flex items-center justify-center"
              >
                <span className="text-2xl">&#8249;</span>
              </button>
              <button
                aria-label="Next case study"
                onClick={handleNext}
                className="bg-[#232323] border border-[#333] text-white rounded-lg p-2 hover:bg-[#333] transition shadow h-10 w-10 flex items-center justify-center"
              >
                <span className="text-2xl">&#8250;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
