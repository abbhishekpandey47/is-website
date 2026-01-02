import React, { useState } from "react";

const caseStudies = [
  {
    id: 1,
    tag: "AI / LLM SaaS",
    title: "0→2.7M organic visitors in 13 months.",
    company: "Speedinvest",
    badge: "Si",
    badgeColor: "bg-orange-100 text-orange-700",
    desc: "Backed startup",
    link: "#",
    img: "/case-study-graph-1.svg",
  },
  {
    id: 2,
    tag: "Fintech / SaaS",
    title: "$0→1.2M ARR in 9 months.",
    company: "FintechX",
    badge: "Fx",
    badgeColor: "bg-green-100 text-green-700",
    desc: "Series A funded",
    link: "#",
    img: "/case-study-graph-2.svg",
  },
];

  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrent((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  const study = caseStudies[current];

  return (
    <div className="w-full min-h-screen bg-white py-12 px-4 flex flex-col gap-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight text-center">
        B2B SEO & AI Search marketing agency <span className="inline-block align-middle text-2xl">🌐</span> based in Europe <span className="inline-block align-middle text-2xl">✨</span> Organic growth partners <span className="inline-block align-middle text-2xl">🔗</span> of innovative SaaS & Fintech startups & enterprise companies.
      </h1>
      <div className="flex justify-center">
        <div className="bg-gray-50 rounded-xl shadow p-8 flex flex-col md:flex-row gap-8 items-center w-full max-w-3xl hover:shadow-lg transition relative">
          <button
            aria-label="Previous case study"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition z-10"
          >
            <span className="text-xl">&#8249;</span>
          </button>
          <div className="flex-1 flex flex-col gap-2">
            <span className="bg-gray-200 text-xs px-2 py-1 rounded w-fit mb-2">{study.tag}</span>
            <span className="text-xl font-semibold text-gray-900 mb-1">
              <span className="bg-blue-100 px-1 rounded">{study.title.split(" ")[0]}</span> {study.title.substring(study.title.indexOf(" ")+1)}
            </span>
            <div className="flex items-center gap-2 mb-2">
              <span className={`${study.badgeColor} px-2 py-1 rounded font-bold`}>{study.badge}</span>
              <span className="text-sm text-gray-700 font-medium">{study.company}</span>
              <span className="text-xs text-gray-500">{study.desc}</span>
            </div>
            <a href={study.link} className="text-blue-600 font-medium hover:underline">Case study <span>→</span></a>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={study.img} alt="Growth Graph" className="w-full max-w-xs" />
          </div>
          <button
            aria-label="Next case study"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition z-10"
          >
            <span className="text-xl">&#8250;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
