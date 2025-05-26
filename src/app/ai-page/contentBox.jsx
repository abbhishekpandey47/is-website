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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-8">
      <div className="flex gap-6 max-w-7xl w-full justify-center items-start">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-br from-[#0a0f1b] to-blue-900/40 backdrop-blur-sm rounded-2xl border cursor-pointer flex-shrink-0 h-64 transition-all duration-700 ease-in-out transform ${
              activeCard === index
                ? "w-96 border-pink-500/80 shadow-2xl shadow-pink-500/20"
                : "w-64 border-slate-700/60"
            }`}
            onMouseEnter={() => setActiveCard(index)}
            onMouseLeave={() => setActiveCard(0)}
            style={{
              backgroundColor: "#0a0f1b",
              backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              border: "2px solid rgba(60, 63, 84, 0.3)",
            }}
          >
            {/* Icon Row */}
            <div className="p-6 pb-0">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 transition-all duration-700 ease-in-out">
                {card.icon}
              </div>
            </div>

            {/* Title Row */}
            <div className="px-6 py-4">
              <h3 className="text-white text-xl font-semibold leading-tight">
                {card.title}
              </h3>
            </div>

            {/* Description Row - Only visible when hovered or first card */}
            <div
              className={`px-6 pb-6 transition-all duration-700 ease-in-out ${
                activeCard === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <p className="text-slate-300 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent rounded-2xl pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoverCards;
