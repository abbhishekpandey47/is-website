'use client';

import { Rocket, Users, Target } from 'lucide-react';

export default function WhoThisIsFor() {
  const cards = [
    {
      icon: <Rocket className="w-6 h-6 text-cyan-400" />,
      title: 'DevTools & Infra Founders',
      description: 'Building developer-focused products in infrastructure, AI/ML, or SaaS.',
    },
    {
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      title: 'Solo & Small Teams',
      description: 'Lacking a large marketing org but hungry for systematic growth.',
    },
    {
      icon: <Target className="w-6 h-6 text-cyan-400" />,
      title: 'Growth-Focused Engineers',
      description: 'Technical founders who want a lean, repeatable go-to-market strategy.',
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Who This Is <span className="text-cyan-400">For</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                card.highlighted
                  ? 'bg-gradient-to-br from-cyan-500/10 to-transparent border-2 border-cyan-500/50'
                  : 'bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="mb-6 inline-block p-3 bg-cyan-500/10 rounded-lg">
                {card.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}