import Image from 'next/image';
import React from 'react';

const FeatureCards = () => {
  const cards = [
    {
      id: 1,
      title: "Ship product knowledge, not just features",
      description: "Developer adoption depends on crisp docs, release notes, and GitHub examples. We build these so your product is discoverable and usable from day one.",
      imageAlt: "MCP servers illustration",
      image: "c1.png"
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
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="px-5 g-gray-800 rounded-lg border border-gray-700 p-6 shadow-sm shadow-white/30 transition-shadow duration-200"
            >
              <div className="mb-6">
                <img
                  src={`/landingfolio/${card.image}`}
                  alt={card.imageAlt}
                  
                  className="w-full h-full rounded"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-3">
                {card.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {card.description}
              </p>
              
              {/* Learn more button */}
              <button className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700/20 border border-gray-600 rounded-md hover:bg-gray-600/30 hover:border-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800">
                Learn more
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;