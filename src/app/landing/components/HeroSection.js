"use client";

import React, { useState, useEffect } from 'react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Pink gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Edition Badge */}
          <div className="inline-flex items-center space-x-2 mb-8 text-sm text-gray-400">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>2025 Edition</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Early-Stage Software
            <br />
            Venture <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Playbook</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
            Your blueprint to move from 0 → repeatable growth: documentation,
            content, marketing & distribution for developer products.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button className="bg-indigo-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-400 transition-all transform hover:scale-105 flex items-center space-x-2">
              <span>Get the Playbook</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <button className="border border-gray-700 text-white px-8 py-4 rounded-lg font-semibold hover:border-purple-500/50 hover:bg-gray-900 transition-all flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Explore Existing Playbooks</span>
            </button>
          </div>

          {/* Journey Visualization */}
          <div className="relative max-w-4xl mx-auto">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>

            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-purple-400/30 z-10"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-purple-400/30 z-10"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-purple-400/30 z-10"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-purple-400/30 z-10"></div>

            {/* Journey Path */}
            <div className="py-20 px-4 relative z-10">
              <div className="flex items-center justify-center space-x-8 md:space-x-16">
                {/* Stage 1 */}
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-4">Stage 1</div>
                  <div className="relative flex items-center">
                    {/* Left circle with 0 */}
                    <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center mr-4">
                      <span className="text-gray-400 text-sm font-semibold">0</span>
                    </div>
                    
                    <div className="w-20 h-20 rounded-full border-2 border-purple-400 bg-purple-400/10 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <span className="text-white font-bold text-lg">Build</span>
                    </div>
                  </div>
                </div>

                {/* Arrow 1 */}
                <div className="hidden sm:flex items-center">
                  <div className="w-12 md:w-20 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500"></div>
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-pink-500"></div>
                </div>

                {/* Stage 2 */}
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-4">Onboarding</div>
                  <div className="w-20 h-20 rounded-full border-2 border-purple-400 bg-purple-400/10 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <span className="text-white font-bold text-lg">Docs</span>
                  </div>
                </div>

                {/* Arrow 2 */}
                <div className="hidden sm:flex items-center">
                  <div className="w-12 md:w-20 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500"></div>
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-pink-500"></div>
                </div>

                {/* Stage 3 */}
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-4">Distribution</div>
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-2 border-purple-400 bg-purple-400/10 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <span className="text-white font-bold text-lg">GROW</span>
                    </div>
                    <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">∞</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    
   
    </div>
  );
}