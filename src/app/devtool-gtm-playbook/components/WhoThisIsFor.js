'use client';

import { Rocket, Users, Target } from 'lucide-react';

export default function WhoThisIsFor() {
  const cards = [
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: 'DevTools & Infra Founders',
      description: 'Building developer-focused products in infrastructure, AI/ML, or SaaS.',
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: 'Solo & Small Teams',
      description: 'Lacking a large marketing org but hungry for systematic growth.',
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: 'Growth-Focused Engineers',
      description: 'Technical founders who want a lean, repeatable go-to-market strategy.',
      highlighted: true,
    },
  ];

  return (
    <div className="w-full relative text-white flex items-center justify-center p-8">
      {/* Background with theme */}
      <div className="absolute inset-0 bg-black">
        <div className="whyinfra absolute inset-0"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <h2 className="text-4xl md:text-5xl quicksand-bold text-center mb-16">
          Who This Is <span className="specialtext">For</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                card.highlighted
                  ? 'bg-[#888]/30 backdrop-blur-sm border-2 border-white/30 ring-1 ring-black/5'
                  : 'bg-[#888]/20 backdrop-blur-sm border border-white/10 ring-1 ring-black/5 hover:border-white/20'
              }`}
            >
              <div className="mb-6 inline-block p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                {card.icon}
              </div>
              
              <h3 className="text-xl quicksand-semibold mb-4">{card.title}</h3>
              
              <p className="text-[white] quicksand-light text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}