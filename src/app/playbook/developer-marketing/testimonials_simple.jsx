"use client";

import React from "react";

export default function Testimonials() {
  return (
    <section className="mx-auto px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Success Stories from </span>
            <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">B2B SAAS Startups</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how leading startups transformed their developer marketing into growth engines.
          </p>
        </div>

        {/* Simple testimonial cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div className="ml-4">
                <h3 className="text-white font-semibold">Firefly.ai - $23 M Series A Startup</h3>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              "Achieved 781% traffic growth with developer-focused content strategy."
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="ml-4">
                <h3 className="text-white font-semibold">ScaleKit - $5.5 M Seed Startup</h3>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              "32.6K monthly visitors through targeted developer content marketing."
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div className="ml-4">
                <h3 className="text-white font-semibold">Kubiya</h3>
                <p className="text-gray-400 text-sm">DevOps AI</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              "Reached product leadership in 9 months with strategic content approach."
            </p>
          </div>
        </div>

        {/* Trust section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-6">
            <span className="text-white">Why </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 bg-clip-text text-transparent">
              Y Combinator Companies - Boldstart, and Eclipse
            </span>
            <span className="text-white"> trust Infrasity</span>
          </h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Here's how we help them ship content fast — and with depth.
          </p>
        </div>
      </div>
    </section>
  );
}
