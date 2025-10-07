"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const sectionRef = useRef(null);
  const [scrollYProgress, setScrollYProgress] = useState(null);
  const controls = useAnimation();
  const graphRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [hoveredNode, setHoveredNode] = useState(null);

  const topics = [
    "6 core pillars that turn developers into advocates: communities, content, videos, distribution, docs & landing pages",
    "The Why → Try → Buy → Fly framework: modern developer journey optimization that actually converts",
    "Real case studies: How we drove 781% organic traffic growth for Firefly.ai and 828% for ScaleKit", 
    "Developer personas decoded: pain points, decision-making processes, and influence patterns that matter",
    "ROI metrics that drive business growth: adoption, engagement, advocacy over vanity metrics"
  ];

  const standardEasing = [0.25, 0.1, 0.25, 1];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: standardEasing,
      },
    },
  };

  const outerNodePulseVariants = {
    animate: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 1.5,
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl lg:text-6xl font-bold mb-6">
          <span className="text-white">Why Developer Marketing is the</span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Engine
          </span>
          <span className="text-white"> Behind Every Successful DevTool</span>
        </h2>
        
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Developers don't buy hype — they buy <span className="text-cyan-400 font-semibold">trust</span>. 
          If your content, docs, or community don't speak their language, your adoption curve will flatline.
        </p>
      </div>

      {/* Problem Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Inconsistent Content</h3>
            <p className="text-gray-300 leading-relaxed">
              Your blog, docs, and social posts don't speak the same technical language developers expect.
            </p>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Underfunded DevRel</h3>
            <p className="text-gray-300 leading-relaxed">
              Without dedicated developer advocates, your product stays invisible in the communities that matter.
            </p>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Lack of Technical Credibility</h3>
            <p className="text-gray-300 leading-relaxed">
              Marketing fluff without code samples, real use cases, and technical depth kills trust instantly.
            </p>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="text-white">What You'll </span>
          <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Learn</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A comprehensive guide to building developer-first marketing strategies that actually work.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          {topics.map((topic, index) => {
            const colors = [
              "from-cyan-400 to-blue-500",
              "from-violet-400 to-purple-500", 
              "from-emerald-400 to-teal-500",
              "from-orange-400 to-red-500",
              "from-pink-400 to-rose-500"
            ];
            
            return (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${colors[index]} flex items-center justify-center flex-shrink-0 mt-1`}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                  {topic}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="relative">
          {/* Playbook Visual */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-emerald-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 border border-white/10 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-2xl flex items-center justify-center mx-auto">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Developer Marketing</h3>
                <h4 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">Playbook</h4>
                <p className="text-gray-400 text-sm">Proven Strategies for DevTool Success Management</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
