import Image from 'next/image';
import React from 'react';

const FeatureCards = () => {
  const cards = [
    {
      id: 1,
      title: "Ship product knowledge, not just features",
      description: "Developer adoption depends on crisp docs, release notes, and GitHub examples. We build these so your product is discoverable and usable from day one.",
      imageAlt: "MCP servers illustration",
      image: "c1.png",
      design: < MCPToolsInterface />
    },
    {
      id: 2,
      title: "Show up where developers are",
      description: "From Reddit to GitHub Discussions, we seed conversations that spark trust. No spam, just consistent engagement where your users already live.",
      imageAlt: "Auth management illustration",
      image: "c2.png"
    },
    {
      id: 3,
      title: "One story, many surfaces",
      description: "A single product video can become a YouTube demo, doc embed, and short-form clip. We repurpose content across channels so nothing goes stale.",
      imageAlt: "Tools illustration",
      image: "c3.png"
    },
    {
      id: 4,
      title: "From code to community",
      description: "We connect the dots: blog posts, docs, GitHub repos, and social proof. Everything funnels back to your core goal — faster developer adoption.",
      imageAlt: "Custom requests illustration",
      image: "c4.png"
    }
  ];

  return (
   <div className="p-6">
  <div className="max-w-5xl mx-auto relative">
    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-pink-500/5 via-pink-300 to-pink-500/5 shadow-pink-400/50"></div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-20">
      {cards.map((card) => (
        <div
          key={card.id}
          className="g-gray-800 rounded-lg border border-gray-700 py-6 shadow-sm shadow-white/30 transition-shadow duration-200"
        >
          <div className="mb-6">
            {card.design ? (
              <div>{card.design}</div>
            ) : (
              <img
                src={`/landingfolio/${card.image}`}
                alt={card.imageAlt}
                className="w-full h-full rounded"
              />
            )}
          </div>

          {/* Title */}
          <div className="px-5">
            <h3 className="text-lg font-semibold text-white mb-3">
              {card.title}
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {card.description}
            </p>

            <button className="px-5 py-2 text-sm font-medium text-gray-200 bg-gray-700/20 border border-gray-600 rounded-md hover:bg-gray-600/30 hover:border-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800">
              Learn more
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default FeatureCards;



const MCPToolsInterface = () => {
  const toolSets = [
    {
      logo: "https://framerusercontent.com/images/deP5Emns5JYXary7hz0Icm245NY.svg",
      tools: ["Docs", "Release Notes", "Sample Apps"],
      extraCount: 6,
      name: "Surfaces"
    },
    {
      logo: "https://framerusercontent.com/images/wNeivcUdPcU22wpDo7aZDHm5jsw.svg",
      tools: ["API References", "Guides", "Changelog",],
      extraCount: 12,
      name: "Outputs"
    }
  ];

  const DashedLine = ({ className, vertical = false }) => (
    <div className={`${className} ${vertical ? 'w-px h-full' : 'h-px w-full'}`}>
      <svg
        className="w-full h-full"
        viewBox={vertical ? "0 0 1 100" : "0 0 100 1"}
        preserveAspectRatio="none"
      >
        <path
          d={vertical ? "M 0.5 0 L 0.5 100" : "M 0 0.5 L 100 0.5"}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

  const ConnectionCross = ({ className }) => (
    <div className={`absolute ${className} w-3 h-3 flex items-center justify-center`}>
      {/* Horizontal line */}
      <div className="absolute w-3 h-px bg-white/15"></div>
      {/* Vertical line */}
      <div className="absolute w-px h-3 bg-white/15"></div>
    </div>
  );

  return (
    <div className="relative w-full max-w-lg mx-auto p-4 text-white">
      {/* Main container with grid structure */}
      <div className="relative">

        {/* Horizontal dashed lines */}
        <DashedLine className="absolute top-8 left-0 right-0" />
        <DashedLine className="absolute top-24 left-0 right-0" />
        <DashedLine className="absolute bottom-8 left-0 right-0" />

        {/* Vertical dashed lines */}
        <DashedLine className="absolute left-8 top-0 bottom-0" vertical />
        <DashedLine className="absolute right-8 top-0 bottom-0" vertical />

        {/* Connection crosses */}
        <ConnectionCross className="top-8 left-8 -translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="top-8 right-8 translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="top-24 left-8 -translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="top-24 right-8 translate-x-1.5 -translate-y-1.5" />
        <ConnectionCross className="bottom-8 left-8 -translate-x-1.5 translate-y-1.5" />
        <ConnectionCross className="bottom-8 right-8 translate-x-1.5 translate-y-1.5" />

        {/* Tool sections */}
        <div className="space-y-8 py-8">
          {toolSets.map((toolSet, index) => (
            <div key={index} className="px-12">

              {/* Header with logo, "Tools:" text and toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-sm overflow-hidden bg-gray-800 border border-gray-700 flex items-center justify-center">
                    <img
                      src={toolSet.logo}
                      alt="Service logo"
                      className="w-4 h-4 object-contain filter brightness-0 invert"
                    />
                  </div>
                  <span className="text-sm text-gray-400 font-medium">{toolSet.name}</span>
                </div>

                {/* Toggle switch - enabled state */}
                <div className="relative">
                  <div className="w-11 h-6 bg-emerald-500 rounded-full shadow-sm flex items-center justify-end px-0.5 transition-colors duration-200">
                    <div className="w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200"></div>
                  </div>
                </div>
              </div>

              {/* Tools row */}
              <div className="flex items-center space-x-2 flex-wrap">
                {toolSet.tools.map((tool, toolIndex) => (
                  <div
                    key={toolIndex}
                    className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-white text-sm font-mono whitespace-nowrap"
                  >
                    {tool}
                  </div>
                ))}

                {/* Extra tools count */}
                <div className="text-gray-400 text-sm font-medium ml-1">
                  +{toolSet.extraCount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};