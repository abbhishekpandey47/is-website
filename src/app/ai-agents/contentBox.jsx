import { useState } from "react";

const HoverCards = () => {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      icon: (
        <svg
          className="w-6 h-6 text-blue-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      ),
      title: "Technical Blogs & SEO Articles",
      description:
        "Long-form and micro blogs on capabilities, use cases, and best practices. SEO-optimized to capture search traffic and establish authority (e.g., 'How [YourAgent] Automates Cloud Ops').",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-blue-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.49" />
        </svg>
      ),
      title: "Use Case Libraries & Implementation Guides",
      description:
        "How-to guides, tutorials, and sample projects. Pragmatic guides with code snippets and diagrams to shorten the learning curve for new users.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-blue-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
      title: "Onboarding Videos & Feature Walkthroughs",
      description:
        "Interactive video content and guided tours to help users understand and utilize platform features effectively.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6 text-blue-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5l-4.24 4.24M7.76 16.24l-4.24 4.24m12.73 0l-4.24-4.24M7.76 7.76L3.52 3.52" />
        </svg>
      ),
      title: "GTM Support & Agentic Workflow Positioning",
      description:
        "Go-to-market strategies and positioning frameworks for agentic workflows and automated solutions.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-900/40 via-[#0a0f1c] to-slate-900 pt-20">
      <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
        <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            Content that Turns Al Skeptics into Power Users
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
            Infrasity provides a tailored suite of content and GTM services for
            Al agent startups. Our developer-focused approach creates assets
            that educate, excite, and convert your audience.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="flex gap-4 max-w-7xl w-full justify-center items-start">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br from-[#0a0f1b] to-blue-900/40 backdrop-blur-sm rounded-2xl border-2 cursor-pointer flex-shrink-0 h-64 transition-all duration-700 ease-out transform hover:scale-[1.02] border-[#323640] ${
                activeCard === index
                  ? "w-[450px] border-pink-500/80 shadow-2xl shadow-pink"
                  : "w-56 border-slate-700/60 hover:border-slate-600/80"
              }`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(0)}
            >
              <div className="p-6 flex flex-col h-full">
                {/* Icon Row */}
                <div className="flex-shrink-0 mb-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 transition-all duration-500 ease-out">
                    {card.icon}
                  </div>
                </div>

                {/* Title Row */}
                <div
                  className={`flex-shrink-0 mb-4 ${
                    activeCard === index ? "mr-0" : "mr-12"
                  }`}
                >
                  <h3 className="text-white text-[20px] font-semibold leading-tight">
                    {card.title}
                  </h3>
                </div>

                {/* Description Row - Smooth fade in with delay */}
                <div className="flex-1 overflow-hidden">
                  <div
                    className={`transition-all duration-500 ease-out ${
                      activeCard === index
                        ? "opacity-100 translate-y-0 delay-200"
                        : "opacity-0 translate-y-2 delay-0"
                    }`}
                  >
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent rounded-2xl pointer-events-none" />

              {/* Subtle glow effect on hover with smooth transition */}
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-600 ease-out ${
                  activeCard === index
                    ? "bg-gradient-to-r from-pink-500/5 to-blue-500/5 opacity-100"
                    : "bg-gradient-to-r from-pink-500/5 to-blue-500/5 opacity-0"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoverCards;
