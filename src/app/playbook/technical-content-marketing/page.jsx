"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Download, Calendar, Users, TrendingUp, Code, BookOpen, Video, MessageSquare, ArrowRight, Star, Play, Shield, Zap, Target, Award, Globe } from "lucide-react";
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
    // Handle download logic here
    console.log("Download playbook:", formData);
  };

  const handleBookDemo = () => {
    // Handle booking demo logic here
    console.log("Book demo");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg"
            >
              🚀 2025 Edition - Now Available
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-bold leading-tight text-white mb-8"
            >
              The Complete Developer
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-2">
                Marketing Playbook
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Master the art of developer marketing with proven strategies from leading DevTool & AI startups. 
              Learn how to build trust, drive adoption, and scale your developer community.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <button 
                onClick={handleDownload}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Download className="inline-block w-5 h-5 mr-2" />
                Download Free Playbook
              </button>
              <button 
                onClick={handleBookDemo}
                className="group border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
              >
                <Calendar className="inline-block w-5 h-5 mr-2" />
                Book Strategy Call
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">781%</div>
                <div className="text-blue-200 text-sm font-medium">Average Traffic Growth</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">32.6K</div>
                <div className="text-blue-200 text-sm font-medium">Monthly Visitors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">9 Mo</div>
                <div className="text-blue-200 text-sm font-medium">Time to Results</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              The Problem
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8"
            >
              Why Most DevTool Marketing
              <span className="block text-red-600">Fails to Convert</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Developers don't buy hype — they buy trust. If your content, docs, or community don't speak their language, 
              your adoption curve will flatline before you even get started.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Inconsistent Content</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Your blog, docs, and social posts don't speak the same technical language developers expect, 
                creating confusion and breaking trust.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Underfunded DevRel</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Without dedicated developer advocates, your product stays invisible in the communities that matter most 
                for your growth.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Lack of Technical Credibility</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Marketing fluff without code samples, real use cases, and technical depth kills trust instantly 
                in the developer community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              The Solution
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8"
            >
              A Proven Framework for
              <span className="block text-blue-600">Developer Marketing Success</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Learn the exact strategies that helped leading DevTool startups achieve 781%+ traffic growth 
              and build thriving developer communities.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">6 Core Pillars</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Master the framework that drives developer adoption and builds lasting relationships.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Building Trust</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Learn how to create authentic technical content that resonates with developers.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Docs as Growth</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Transform documentation into your most powerful marketing asset.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Measure ROI</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Track what matters with real metrics and proven case studies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              Real Results
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8"
            >
              Proven Success Stories from
              <span className="block text-green-600">Leading DevTools</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              See how leading startups transformed their developer marketing into growth engines using our proven strategies.
            </motion.p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Firefly.ai</h3>
              </div>
              <div className="text-5xl font-bold text-blue-600 mb-2">+781%</div>
              <div className="text-xl text-gray-900 mb-4">Organic Traffic Growth</div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From 3.7K to 32.6K monthly organic visitors through developer-first content strategy and community activation.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-600" />
                  Strategic technical content creation
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-600" />
                  Developer community activation
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-600" />
                  SEO-optimized documentation
                </div>
              </div>
              <div className="mt-6">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Case Study Available</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Scalekit.com</h3>
              </div>
              <div className="text-5xl font-bold text-green-600 mb-2">+828%</div>
              <div className="text-xl text-gray-900 mb-4">Developer Signups</div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Achieved 44% more developer signups in just 9 months with targeted DevRel and community-driven growth.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-600" />
                  Interactive code samples
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-600" />
                  Developer-first messaging
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-green-600" />
                  Community-driven growth
                </div>
              </div>
              <div className="mt-6">
                <span className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Case Study Available</span>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">781%</div>
              <div className="text-gray-600 font-medium">Average Traffic Growth</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">44%</div>
              <div className="text-gray-600 font-medium">More Developer Signups</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">9mo</div>
              <div className="text-gray-600 font-medium">Time to Results</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Infrasity Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              About Infrasity
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8"
            >
              Built by Engineers.
              <span className="block text-blue-600">Designed for Developers.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
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
              className="group text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Content Strategy</h3>
              <p className="text-gray-600 leading-relaxed">
                Technical content that developers actually want to read and share.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Documentation</h3>
              <p className="text-gray-600 leading-relaxed">
                Transform docs into your most powerful growth asset.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Video Explainers</h3>
              <p className="text-gray-600 leading-relaxed">
                Visual storytelling for complex technical concepts.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Activation</h3>
              <p className="text-gray-600 leading-relaxed">
                Build and engage developer communities that scale.
              </p>
            </motion.div>
          </div>
          
          <div className="text-center mb-12">
            <p className="text-gray-500 mb-6 text-sm font-semibold tracking-wider">TRUSTED BY LEADING DEVTOOLS</p>
            <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-lg font-medium">
              <span className="hover:text-blue-600 transition-colors">Firefly</span>
              <span className="hover:text-blue-600 transition-colors">Scalekit</span>
              <span className="hover:text-blue-600 transition-colors">Kubiya</span>
              <span className="hover:text-blue-600 transition-colors">DevZero</span>
              <span className="hover:text-blue-600 transition-colors">StackGente</span>
              <span className="hover:text-blue-600 transition-colors">testimonial.sh</span>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center max-w-4xl mx-auto"
          >
            <blockquote className="text-2xl text-gray-900 mb-6 leading-relaxed">
              "Infrasity helped us 7x our organic traffic through developer-first storytelling and strategic content marketing."
            </blockquote>
            <cite className="text-gray-600 text-lg font-medium">Firefly.ai Team - DevTool Startup</cite>
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              Get Started Today
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8"
            >
              Ready to Build Your
              <span className="block text-green-600">Developer Growth Engine?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Get the complete playbook and discover how to turn developer marketing into your competitive advantage.
            </motion.p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="inline-block bg-white p-6 rounded-2xl shadow-2xl mb-8">
                  <Image
                    src="https://devplaybook-landing.lovable.app/assets/ebook-cover-CqK04Heq.png"
                    alt="Developer Marketing Playbook 2025"
                    width={300}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-bold text-gray-900">Instant Access</div>
                    <div className="text-xs text-gray-600">Download immediately</div>
                  </div>
                  <div>
                    <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-bold text-gray-900">No Fluff</div>
                    <div className="text-xs text-gray-600">Only actionable strategies</div>
                  </div>
                  <div>
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-bold text-gray-900">Free Forever</div>
                    <div className="text-xs text-gray-600">No credit card required</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100"
              >
                <form onSubmit={handleDownload} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="workEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="workEmail"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your work email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your company name"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Download className="inline-block w-5 h-5 mr-2" />
                    Download Free Playbook
                  </button>
                </form>
                
                <div className="text-center mt-6">
                  <button 
                    onClick={handleBookDemo}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    <Calendar className="inline-block w-4 h-4 mr-2" />
                    Book a Free Strategy Call
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-white mb-8"
          >
            Get the 2025 Developer Marketing Playbook
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Join hundreds of DevTool startups who've already transformed their developer marketing with our proven strategies.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <a 
              href="#download"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Download className="inline-block w-5 h-5 mr-2" />
              Download Playbook
            </a>
            <button 
              onClick={handleBookDemo}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
            >
              <Calendar className="inline-block w-5 h-5 mr-2" />
              Book Demo
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}