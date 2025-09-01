import Image from 'next/image';
import React from 'react';

const FeatureCards = () => {
  const cards = [
    {
      id: 1,
      title: "Production-ready MCP servers",
      description: "Unlock the capabilities of your AI by providing the tools your users need with self-hosted or remote MCP servers.",
      imageAlt: "MCP servers illustration",
      image: "c1.png"
    },
    {
      id: 2,
      title: "Managed auth for 2,800 apps",
      description: "Pipedream manages the authorization flow, secure token storage and refresh, and OAuth client management.",
      imageAlt: "Auth management illustration",
      image: "c2.png"
    },
    {
      id: 3,
      title: "10,000+ tools",
      description: "Add prebuilt triggers and actions to your app or expose them as tools for your AI agent.",
      imageAlt: "Tools illustration",
      image: "c3.png"
    },
    {
      id: 4,
      title: "Send custom requests",
      description: "Send any request to any API while avoiding the headaches of managed auth with the Connect Proxy.",
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
              className="px-10 g-gray-800 rounded-lg border border-gray-700 p-6 hover:shadow-lg hover:shadow-gray-900/20 transition-shadow duration-200"
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