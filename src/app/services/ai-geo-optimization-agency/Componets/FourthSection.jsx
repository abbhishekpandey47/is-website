"use client";
import { useEffect, useState } from "react";

const geoSteps = [
  {
    number: '01',
    title: 'See What AI Says About You',
    description:
      'We analyze how ChatGPT, Perplexity, Gemini, and Copilot talk about your product - where you appear, where competitors dominate, and what signals AI is using to decide.',
  },
  {
    number: '02',
    title: 'Map the Questions That Drive Shortlists',
    description:
      'We identify the real buyer prompts - comparisons, alternatives, and "best tool" queries - and map where your product must show up to influence decisions.',
  },
  {
    number: '03',
    title: 'Make Your Product an AI-Recognized Entity',
    description:
      'We structure your website, docs, and content so AI clearly understands your product, category, use cases, and when to recommend you.',
  },
  {
    number: '04',
    title: 'Turn Your Content Into AI-Citable Answers',
    description:
      'We rebuild key pages into answer-first formats - comparisons, FAQs, use cases, and technical explainers - designed for AI extraction and citation.',
  },
  {
    number: '05',
    title: 'Test Visibility Across AI Platforms',
    description:
      "We run real buyer prompts across major AI tools to see if you appear, how you're positioned, and what's blocking inclusion.",
  },
  {
    number: '06',
    title: 'Stay Recommended as AI Changes',
    description:
      'AI answers evolve constantly. We monitor visibility shifts, refine signals, and update content so your product keeps showing up — and stays recommended.',
  },
];

export default function FourthSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative overflow-hidden py-10 w-full text-white">
      <div className="pointer-events-none absolute -right-24 top-0 h-[460px] w-[460px] rounded-full blur-[220px]" />
      <div className="pointer-events-none absolute -left-20 top-[-60px] h-[360px] w-[360px] rounded-full blur-[200px]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4">
            Infrasity End-to-End GEO Framework
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg md:text-xl text-white/60 whitespace-nowrap">
            We identify what AI sees today and build what&apos;s needed to get you cited and recommended.
          </p>
        </div>

        <div className="mt-12 relative">
          {geoSteps.map((step, index) => {
            const overlapStyle = {
              marginTop: index === 0 ? 0 : isMobile ? 24 : -190,
            };
            const zIndexClass = isMobile ? "" : `z-[${20 + index}]`;
            const articleBase = "group bg-[#0D0A1A] border border-l-0 border-r-0 relative overflow-hidden p-6 transition duration-500 min-h-[260px] md:min-h-[320px] md:py-8";
            const desktopExtras = "hover:border-b-[#777777] hover:bg-gradient-to-r hover:from-[#090617]/80 hover:via-[#111028] hover:to-black/80";
            const mobileExtras = "border-b border-white/10 rounded-3xl shadow-lg mobile-card";
            const mergedStyle = {
              ...overlapStyle,
              ...(isMobile ? { animationDelay: `${index * 0.08}s` } : {}),
            };
            return (
              <article
                key={step.number}
                className={`${articleBase} ${isMobile ? mobileExtras : desktopExtras} ${index === 0 ? "border-t-0" : "border-t-[#777777]"} ${isMobile ? "" : "hover:z-50"} ${zIndexClass}`}
                style={mergedStyle}
              >
                <div className={`relative flex ${isMobile ? "flex-col gap-4" : "items-center gap-8"}`}>
                  <div
                    style={{ fontSize: isMobile ? '15rem' : '25rem' }}
                    className="text-[clamp(2.5rem,6vw,4.5rem)] md:text-[clamp(3rem,8vw,8rem)] font-light leading-none text-white/20 transition duration-500 group-hover:text-white"
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-4xl font-semibold uppercase text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className={`mt-4 text-lg md:text-xl leading-relaxed text-white transition duration-500 ${isMobile ? "max-h-full opacity-100" : "max-h-0 overflow-hidden group-hover:max-h-[260px] group-hover:opacity-100 group-hover:mt-6"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .mobile-card {
          opacity: 0;
          transform: translateY(30px);
          animation: mobileStack 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        @keyframes mobileStack {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
