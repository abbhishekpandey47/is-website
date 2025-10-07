"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Download, Calendar, Users, TrendingUp, Code, BookOpen, Video, MessageSquare, ArrowRight, Star, Play, Shield, Zap, Target, Award, Globe, ChevronRight, X } from "lucide-react";
import Image from "next/image";

export default function Page() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = (e) => {
    e.preventDefault();
    console.log("Download playbook:", formData);
  };

  const handleBookDemo = () => {
    console.log("Book demo");
  };

  return (
    <>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
      <div className="min-h-screen bg-black">
      {/* Hero Section - First Fold */}
      <section 
        className="relative overflow-hidden min-h-screen flex items-center"
        style={{ 
          background: 'radial-gradient(1200px 600px at 20% 10%, rgba(162,89,255,.25), transparent 60%), linear-gradient(180deg,#2B0A4E 0%, #1B0630 55%, #0B0811 100%)',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 80%, rgba(0,0,0,0))'
        }}
      >
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.04%22%3E%3Cpath%20d%3D%22M0%200h60v1H0zM0%200v60h1V0z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div 
          className="relative max-w-7xl mx-auto px-6 py-20 pt-32 pb-32"
        >
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left Content - Cols 1-6 */}
            <div className="col-span-12 lg:col-span-6 space-y-6">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center bg-white/5 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-[#A259FF]/30"
              >
                <span className="w-2 h-2 bg-[#A259FF] rounded-full mr-2 animate-pulse"></span>
                2025 Edition
              </motion.div>
              
              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white font-black leading-[1.05]"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(42px, 5.2vw, 64px)',
                  letterSpacing: '-0.02em'
                }}
              >
                The 2025 Developer Marketing <span className="text-[#A259FF]">Playbook</span> for DevTool & AI Startups
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-300 leading-relaxed"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  maxWidth: '42ch',
                  opacity: 0.85
                }}
              >
                Learn how leading DevTool & AI startups like <span className="text-[#A259FF] font-semibold">Firefly</span>, <span className="text-[#A259FF] font-semibold">Scalekit</span>, and <span className="text-[#A259FF] font-semibold">Kubiya</span> built scalable developer growth engines.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={handleDownload}
                  className="text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(90deg,#A259FF,#5B36FF)',
                    boxShadow: '0 0 20px rgba(162,89,255,0.3)'
                  }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Playbook
                </button>
                <button 
                  onClick={handleBookDemo}
                  className="border-2 border-[#A259FF] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#A259FF]/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.3)] flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Free Demo
                </button>
              </motion.div>
              
              {/* Metrics Row */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center gap-10 mt-8"
              >
                <div className="text-center">
                  <div className="text-[28px] font-black text-white mb-1">781%</div>
                  <div className="text-gray-300 text-sm" style={{ opacity: 0.7 }}>Traffic Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-[28px] font-black text-white mb-1">32.6K</div>
                  <div className="text-gray-300 text-sm" style={{ opacity: 0.7 }}>Monthly Visitors</div>
                </div>
                <div className="text-center">
                  <div className="text-[28px] font-black text-white mb-1">9 Mo</div>
                  <div className="text-gray-300 text-sm" style={{ opacity: 0.7 }}>To Leadership</div>
                </div>
              </motion.div>
            </div>

            {/* Right Form - Cols 7-12 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="col-span-12 lg:col-span-6"
              style={{
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(162,89,255,.25)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 8px 28px rgba(0,0,0,.35)'
              }}
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 bg-white/5 border border-[#3B3B3B] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#A259FF] focus:border-[#A259FF] focus:shadow-[0_0_10px_rgba(162,89,255,0.3)] transition-all duration-200"
                    style={{ height: '48px' }}
                    placeholder="Full Name:"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Work Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 bg-white/5 border border-[#3B3B3B] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#A259FF] focus:border-[#A259FF] focus:shadow-[0_0_10px_rgba(162,89,255,0.3)] transition-all duration-200"
                    style={{ height: '48px' }}
                    placeholder="Work Email:"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Company Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 bg-white/5 border border-[#3B3B3B] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#A259FF] focus:border-[#A259FF] focus:shadow-[0_0_10px_rgba(162,89,255,0.3)] transition-all duration-200"
                    style={{ height: '48px' }}
                    placeholder="Company Name:"
                  />
                </div>
                <button 
                  onClick={handleDownload}
                  className="w-full text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(90deg,#A259FF,#5B36FF)',
                    boxShadow: '0 0 20px rgba(162,89,255,0.3)'
                  }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Playbook
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section - Second Fold */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-extrabold text-white mb-8 font-['Inter',sans-serif]"
            >
              Why Developer Marketing is the <span className="text-[#A259FF]">Engine</span> Behind Every Successful DevTool
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Inter',sans-serif]"
            >
              Developers don't buy hype — they buy <span className="text-[#A259FF] font-semibold">trust</span>. If your content, docs, or community don't speak their language, your adoption curve will flatline.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-[#A259FF]/30 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#A259FF] to-[#5B36FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-['Inter',sans-serif]">Inconsistent Content</h3>
              <p className="text-gray-300 text-center leading-relaxed font-['Inter',sans-serif]">
                Your blog, docs, and social posts don't speak the same technical language developers expect.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#A259FF] to-[#5B36FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-['Inter',sans-serif]">Underfunded DevRel</h3>
              <p className="text-gray-300 text-center leading-relaxed font-['Inter',sans-serif]">
                Without dedicated developer advocates, your product stays invisible in the communities that matter.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#A259FF] to-[#5B36FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-['Inter',sans-serif]">Lack of Technical Credibility</h3>
              <p className="text-gray-300 text-center leading-relaxed font-['Inter',sans-serif]">
                Marketing fluff without code samples, real use cases, and technical depth kills trust instantly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section - Third Fold */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-black text-white mb-8 font-['Inter',sans-serif]"
            >
              What You'll <span className="text-[#A259FF]">Learn</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Inter',sans-serif]"
            >
              A comprehensive guide to building developer-first marketing strategies that actually work.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-[#A259FF]/30 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(162,89,255,0.05)'
              }}
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-['Inter',sans-serif]">6 Core Pillars of Developer Marketing</h3>
              <p className="text-gray-300 text-center leading-relaxed font-['Inter',sans-serif]">
                Master the framework that drives developer adoption
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-[#A259FF]/30 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(162,89,255,0.05)'
              }}
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-['Inter',sans-serif]">Building Developer Trust</h3>
              <p className="text-gray-300 text-center leading-relaxed font-['Inter',sans-serif]">
                Learn how to create authentic technical content that resonates
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-[#A259FF]/30 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(162,89,255,0.05)'
              }}
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-['Inter',sans-serif]">Docs & SDKs as Growth Engines</h3>
              <p className="text-gray-300 text-center leading-relaxed font-['Inter',sans-serif]">
                Transform documentation into your most powerful marketing asset
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-[#A259FF]/30 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(162,89,255,0.05)'
              }}
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-['Inter',sans-serif]">Measuring Developer Marketing ROI</h3>
              <p className="text-gray-300 text-center leading-relaxed font-['Inter',sans-serif]">
                Track what matters with real metrics and case studies
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section - Fourth Fold */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-black text-white mb-8 font-['Inter',sans-serif]"
            >
              Real Results from <span className="text-[#A259FF]">Real DevTools</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Inter',sans-serif]"
            >
              See how leading startups transformed their developer marketing into growth engines.
            </motion.p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/3 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-['Inter',sans-serif]">Firefly.ai</h3>
              <div className="text-6xl font-black text-[#A259FF] mb-3">+781%</div>
              <div className="text-xl text-white mb-4 font-medium">Organic Traffic Growth</div>
              <p className="text-gray-300 mb-6 leading-relaxed font-['Inter',sans-serif]">
                From 3.7K to 32.6K monthly organic visitors through developer-first content strategy.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">Strategic technical content</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">Developer community activation</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">SEO-optimized documentation</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white hover:text-[#A259FF] transition-colors cursor-pointer">
                <TrendingUp className="w-4 h-4 text-[#A259FF]" />
                <span className="font-medium font-['Inter',sans-serif]">Case Study</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/3 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-['Inter',sans-serif]">Scalekit.com</h3>
              <div className="text-6xl font-black text-[#A259FF] mb-3">+828%</div>
              <div className="text-xl text-white mb-4 font-medium">Developer Signups</div>
              <p className="text-gray-300 mb-6 leading-relaxed font-['Inter',sans-serif]">
                Achieved 44% more developer signups in just 9 months with targeted DevRel.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">Interactive code samples</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">Developer-first messaging</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">Community-driven growth</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white hover:text-[#A259FF] transition-colors cursor-pointer">
                <TrendingUp className="w-4 h-4 text-[#A259FF]" />
                <span className="font-medium font-['Inter',sans-serif]">Case Study</span>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="text-5xl font-black text-[#A259FF] mb-3">781%</div>
              <div className="text-white font-medium font-['Inter',sans-serif]">Average Traffic Growth</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="text-5xl font-black text-[#A259FF] mb-3">44%</div>
              <div className="text-white font-medium font-['Inter',sans-serif]">More Developer Signups</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="text-5xl font-black text-[#A259FF] mb-3">9mo</div>
              <div className="text-white font-medium font-['Inter',sans-serif]">Time to Results</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Infrasity Section - Fifth Fold */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-black text-white mb-8 font-['Inter',sans-serif]"
            >
              Built by <span className="text-[#A259FF]">Engineers.</span> Designed for <span className="text-[#A259FF]">Developers.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white max-w-4xl mx-auto leading-relaxed font-['Inter',sans-serif]"
            >
              Infrasity specializes in developer-centric GTM — from content strategy and video explainers 
              to documentation and community activation.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group text-center bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-['Inter',sans-serif]">Content Strategy</h3>
              <p className="text-gray-300 leading-relaxed font-['Inter',sans-serif]">
                Technical content that developers actually want to read.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group text-center bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-['Inter',sans-serif]">Documentation</h3>
              <p className="text-gray-300 leading-relaxed font-['Inter',sans-serif]">
                Transform docs into your most powerful growth asset.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group text-center bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-['Inter',sans-serif]">Video Explainers</h3>
              <p className="text-gray-300 leading-relaxed font-['Inter',sans-serif]">
                Visual storytelling for complex technical concepts.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group text-center bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-['Inter',sans-serif]">Community Activation</h3>
              <p className="text-gray-300 leading-relaxed font-['Inter',sans-serif]">
                Build and engage developer communities that scale.
              </p>
            </motion.div>
          </div>
          
          <div className="text-center mb-12">
            <p className="text-gray-400 mb-8 text-sm font-semibold tracking-wider font-['Inter',sans-serif]">TRUSTED BY LEADING DEVTOOLS</p>
            
            {/* Customer Logos - Exact copy from developer marketing agency */}
            <div className="pb-2">
              <div className="max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
                <div
                  className="relative w-full mx-auto max-w-4xl opacity-90 dark:opacity-70 overflow-hidden px-5 lg:px-12"
                  aria-hidden={false}
                >
                  <div className="flex gap-10 items-center mx-4 animate-scroll">
                    <div className="mix-blend-color-burn p-3">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/aviator.png"
                        alt="Aviator"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-8">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/mocha.png"
                        alt="Mocha"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-5">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/cedana.png"
                        alt="Cedana"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-2">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/dhiwise.png"
                        alt="DhiWise"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-5 filter brightness-0 invert">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/amnic.png"
                        alt="Amnic"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-12">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/oso.png"
                        alt="Oso"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-8">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/ox-sec.svg"
                        alt="Ox Security"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/mvp-grow.png"
                        alt="MVP Grow"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/cerbos.png"
                        alt="Cerbos"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-8">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/qodo-logo.png"
                        alt="Qodo"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/Codegiant.png"
                        alt="CodeGiant"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/Scalekit-logo.png"
                        alt="Scalekit"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-7">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/cycloid.png"
                        alt="Cycloid"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/scalr.png"
                        alt="Scalr"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-5">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/daytona.png"
                        alt="Daytona"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/stackOne.png"
                        alt="StackOne"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/DevZero.png"
                        alt="DevZero"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/terrateam.png"
                        alt="TerraTeam"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-6">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/env0-infra-1.png"
                        alt="Env0"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/tracetest.png"
                        alt="Tracetest"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-5">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/firefly.png"
                        alt="Firefly"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-5">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/TravisCI-Full-Color.png"
                        alt="TravisCI"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-5">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/firstock-logo.png"
                        alt="Firstock"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-10">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/vapi-logo.png"
                        alt="Vapi"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/kapstan.png"
                        alt="Kapstan"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/Zenml.png"
                        alt="ZenML"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-5">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/Kubiya.png"
                        alt="Kubiya"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/lovable-logo.png"
                        alt="Lovable"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-4">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/Meteor-ops.png"
                        alt="Meteor"
                      />
                    </div>
                    <div className="mix-blend-color-burn p-3">
                      <Image
                        loading="lazy"
                        width={100}
                        height={80}
                        className="object-contain opacity-90"
                        src="/trustedby-bw/bw/middleware-logo.png"
                        alt="Middleware"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center max-w-4xl mx-auto hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="flex gap-2 mr-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-white text-sm font-medium font-['Inter',sans-serif]">testimonial.sh</span>
            </div>
            <blockquote className="text-2xl text-white mb-6 leading-relaxed font-['Inter',sans-serif] font-bold">
              "Infrasity helped us 7x our organic traffic through developer-first storytelling."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-[#A259FF] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-lg font-['Inter',sans-serif]">Firefly.ai Team</div>
                <div className="text-gray-400 text-sm font-['Inter',sans-serif]">DevTool Startup</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section - Last Fold */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%200h60v1H0zM0%200v60h1V0z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-black text-white mb-8 font-['Inter',sans-serif]"
            >
              Ready to Build Your <span className="text-[#A259FF]">Developer</span> <span className="text-[#A259FF]">Growth Engine?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-['Inter',sans-serif]"
            >
              Get the complete playbook and discover how to turn developer marketing into your competitive advantage.
            </motion.p>
          </div>
          
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <button
                onClick={handleDownload}
                className="text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(90deg,#A259FF,#5B36FF)',
                  boxShadow: '0 0 20px rgba(162,89,255,0.3)'
                }}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Download Free Playbook
              </button>
              <button 
                onClick={handleBookDemo}
                className="border-2 border-[#A259FF] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#A259FF]/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.3)] flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book a Free Demo
              </button>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/3 backdrop-blur-sm p-6 rounded-xl border border-[#A259FF]/30 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(162,89,255,0.05)'
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-[#A259FF]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center font-['Inter',sans-serif]">Instant Access</h3>
              <p className="text-gray-300 text-sm text-center font-['Inter',sans-serif]">Download immediately</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white/3 backdrop-blur-sm p-6 rounded-xl border border-[#A259FF]/30 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(162,89,255,0.05)'
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-[#A259FF]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center font-['Inter',sans-serif]">No Fluff</h3>
              <p className="text-gray-300 text-sm text-center font-['Inter',sans-serif]">Only actionable strategies</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white/3 backdrop-blur-sm p-6 rounded-xl border border-[#A259FF]/30 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(162,89,255,0.05)'
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-[#A259FF]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 text-center font-['Inter',sans-serif]">Free Forever</h3>
              <p className="text-gray-300 text-sm text-center font-['Inter',sans-serif]">No credit card required</p>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}