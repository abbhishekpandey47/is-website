import React from 'react';
import { MessageSquare, Share2, FileText, Layers } from 'lucide-react';

export default function PlaybookPillars() {
  const pillars = [
    {
      id: 1,
      icon: MessageSquare,
      title: "Developer Marketing Playbook",
      description: "Reach and engage developers where they are — authentic, technical, zero fluff.",
      buttonText: "Explore this Playbook",
      available: true,
      featured: false
    },
    {
      id: 2,
      icon: Share2,
      title: "Reddit B2B Marketing Playbook",
      description: "Master community-driven growth on Reddit without getting banned.",
      buttonText: "Explore this Playbook",
      available: true,
      featured: true
    },
    {
      id: 3,
      icon: FileText,
      title: "Product Documentation Playbook",
      description: "Docs, APIs, SDKs, and onboarding flows that convert developers.",
      buttonText: "Notify Me",
      available: false,
      featured: false
    },
    {
      id: 4,
      icon: Layers,
      title: "Content & Distribution Playbook",
      description: "Blog, SEO, forums, newsletters — systematic content distribution.",
      buttonText: "Notify Me",
      available: false,
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The 4 Pillars of the <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Playbook</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Each pillar addresses a critical part of your go-to-market strategy.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`group relative rounded-2xl p-8 transition-all duration-300 ${
                  pillar.featured
                    ? 'bg-gradient-to-br from-purple-900/40 to-pink-800/20 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20'
                    : 'bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10'
                }`}
              >
                {/* Coming Soon Badge */}
                {!pillar.available && (
                  <div className="absolute top-6 right-6">
                    <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 ${
                  pillar.featured ? 'bg-purple-500/20' : 'bg-gray-800 group-hover:bg-purple-500/10'
                }`}>
                  <Icon className={`w-6 h-6 transition-colors duration-300 ${pillar.featured ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-400'}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-between transition-all duration-200 ${
                    pillar.available
                      ? pillar.featured
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!pillar.available}
                >
                  <span>{pillar.buttonText}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}