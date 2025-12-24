"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, use, useState } from "react";
import AppContext from "../../../context/Infracontext";
import templateMetadata from "../../../../templates-data/_templateMetadata";
import { notFound } from "next/navigation";

const TemplateDetailPage = ({ params }) => {
  const context = useContext(AppContext);
  const { setProgress } = context;
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  
  // Await params as required by Next.js 15
  const resolvedParams = use(params);
  const template = templateMetadata.find((t) => t.slug === resolvedParams.slug);

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  if (!template) {
    notFound();
  }

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowEmailModal(true);
    setEmail("");
    setEmailError("");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you can add API call to save email
      // await fetch('/api/save-email', { method: 'POST', body: JSON.stringify({ email }) });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Trigger download
      const link = document.createElement('a');
      link.href = template.downloadLink;
      link.download = 'best-ai-tools-for-documentation.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Close modal
      setShowEmailModal(false);
      setEmail("");
    } catch (error) {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section - Title Left, Video Right */}
      <div className="bg-gradient-to-b from-[#1a0b2e] via-[#16213e] to-[#0a0a0a] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Title and Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Link 
                href="/templates" 
                className="inline-flex items-center text-[#888] hover:text-white transition-colors text-sm quicksand-regular"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Templates
              </Link>
              
              <div>
                <div className="inline-flex items-center justify-center bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-[13px] quicksand-semibold mb-4">
                  <p className="text-blue-300">{template.category}</p>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold quicksand-bold text-white mb-4 leading-tight">
                  {template.title}
                </h1>
                <p className="text-lg text-[#aaa] quicksand-light leading-relaxed">
                  {template.description}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleDownloadClick}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl quicksand-semibold cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Template
                </button>
              </div>
            </motion.div>

            {/* Right Column - Video */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-video bg-[#1a1f35] border border-[#2a2f45] rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={template.videoEmbedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={`${template.title} Tutorial`}
                ></iframe>
              </div>
              
              {/* Video Metadata */}
              <div className="flex items-center justify-between mt-4 text-sm text-[#666]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="quicksand-regular">5 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="quicksand-regular">21 views</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* For Developer Content & Guides templates - Show clean content with sidebar */}
        {(template.slug === "developer-content-and-guides-outline" || template.slug === "developer-content-and-guides-content") ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Table of Contents */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:w-64 flex-shrink-0"
            >
              <div className="sticky top-24 bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 quicksand-bold text-white">Content</h3>
                <nav className="space-y-2">
                  {/* Common educational sections for both templates */}
                  <a href="#what-is" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">
                    {template.slug === "developer-content-and-guides-outline" ? "What is a Developer Content Outline?" : "What is Developer Content Writing?"}
                  </a>
                  <a href="#what-is-template" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">
                    {template.slug === "developer-content-and-guides-outline" ? "What is the Template?" : "What is the Template?"}
                  </a>
                  <a href="#why-use" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">Why Use This Template?</a>
                  <a href="#how-to-use" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">How to Use This Template</a>
                  
                  <div className="border-t border-[#334155] my-3 pt-3">
                  {template.slug === "developer-content-and-guides-outline" && (
                    <>
                      {template.metricsTable && (
                        <a
                          href="#metrics-table"
                          className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1"
                        >
                          Strategic Overview Table
                        </a>
                      )}
                      {template.templateOutline && template.templateOutline.map((item, index) => (
                        <a
                          key={index}
                          href={`#section-${index + 1}`}
                          className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1"
                        >
                          {typeof item === 'object' ? item.section : item}
                        </a>
                      ))}
                    </>
                  )}
                  </div>
                </nav>
              </div>
            </motion.aside>

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex-1"
            >
              <div className="max-w-none">
                {/* Educational Sections - Common for both templates */}
                <div className="space-y-12 mb-12">
                  {/* What is Section */}
                  <div id="what-is" className="mb-10">
                    <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                      {template.slug === "developer-content-and-guides-outline" ? "What is a Developer Content Outline?" : "What is Developer Content Writing?"}
                    </h2>
                    <p className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular mb-4">
                      {template.slug === "developer-content-and-guides-outline" ? 
                        "A developer content outline is a strategic framework that helps you plan and structure technical content for developer audiences. It acts as a blueprint for creating comprehensive guides, tool comparisons, and technical tutorials that resonate with engineering teams." :
                        "Developer content writing is the practice of creating technical content specifically designed for developers, engineers, and technical decision-makers. It combines technical accuracy with clear communication to educate, engage, and help technical audiences solve real problems."
                      }
                    </p>
                    <p className="text-[#94a3b8] text-sm leading-relaxed quicksand-regular">
                      {template.slug === "developer-content-and-guides-outline" ?
                        "Unlike traditional content outlines, developer content requires technical depth, real code examples, and practical implementation details. This template helps you structure content that developers actually want to read." :
                        "This type of content goes beyond surface-level explanations. It includes working code examples, architecture insights, performance considerations, and real-world use cases that help developers make informed technical decisions."
                      }
                    </p>
                  </div>

                  {/* What is Template Section */}
                  <div id="what-is-template" className="mb-10">
                    <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                      {template.slug === "developer-content-and-guides-outline" ? "What is a Developer Content Outline Template?" : "What is a Developer Content Writing Template?"}
                    </h2>
                    <p className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular mb-6">
                      {template.slug === "developer-content-and-guides-outline" ?
                        "A developer content outline template is a pre-structured framework that guides you through planning technical content. It includes sections for technical depth, code examples, tool comparisons, and practical implementations—ensuring nothing important gets missed." :
                        "A developer content writing template provides complete, ready-to-adapt content examples with proper technical depth, structure, and developer-focused messaging. It shows exactly how to explain technical concepts, compare tools, and provide actionable insights."
                      }
                    </p>
                    <ul className="space-y-3 text-[#cbd5e1] quicksand-regular">
                      <li className="flex items-start gap-3">
                        <span className="text-[#6366f1] mt-1">•</span>
                        <span className="text-sm">
                          {template.slug === "developer-content-and-guides-outline" ?
                            "Structured sections covering technical concepts, real-world examples, and implementation details" :
                            "Complete examples showing how to write technical comparisons, tool evaluations, and developer guides"
                          }
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#6366f1] mt-1">•</span>
                        <span className="text-sm">
                          {template.slug === "developer-content-and-guides-outline" ?
                            "SEO-optimized keyword suggestions with search volumes and target intent mapping" :
                            "Real company examples showing practical implementations and use cases"
                          }
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#6366f1] mt-1">•</span>
                        <span className="text-sm">
                          {template.slug === "developer-content-and-guides-outline" ?
                            "Target audience definition, word count guidance, and content type recommendations" :
                            "Proper paragraph length, technical tone, and word choice that resonates with developers"
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Why Use Section */}
                  <div id="why-use" className="mb-10">
                    <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                      {template.slug === "developer-content-and-guides-outline" ? "Why Use a Developer Content Outline Template?" : "Why Use a Developer Content Writing Template?"}
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-white quicksand-bold mb-2">Saves Time and Ensures Consistency</h3>
                        <p className="text-[#94a3b8] text-sm quicksand-regular leading-relaxed">
                          {template.slug === "developer-content-and-guides-outline" ?
                            "Instead of starting from scratch, you get a proven structure that covers all essential sections. This template ensures you don't miss critical technical details or implementation examples." :
                            "Skip the research phase and start with battle-tested content examples. See exactly how to explain complex technical concepts in ways that developers understand and appreciate."
                          }
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white quicksand-bold mb-2">SEO-Optimized from the Start</h3>
                        <p className="text-[#94a3b8] text-sm quicksand-regular leading-relaxed">
                          {template.slug === "developer-content-and-guides-outline" ?
                            "Get keyword suggestions with search volumes, secondary keywords, and long-tail variations. The template includes target intent mapping so your content ranks for the right searches." :
                            "Content is structured with proper H2/H3 tags, keyword placement, and meta descriptions that search engines love. Learn from examples that balance technical depth with SEO best practices."
                          }
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white quicksand-bold mb-2">Developer-Focused Approach</h3>
                        <p className="text-[#94a3b8] text-sm quicksand-regular leading-relaxed">
                          {template.slug === "developer-content-and-guides-outline" ?
                            "Designed specifically for technical audiences who want code examples, architecture details, and practical implementation guidance—not marketing fluff." :
                            "See how to write with the right technical depth, tone, and examples. Understand what level of detail to provide and how to structure comparisons that help developers make decisions."
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* How to Use Section */}
                  <div id="how-to-use" className="mb-10">
                    <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                      {template.slug === "developer-content-and-guides-outline" ? "How to Use This Developer Content Outline Template" : "How to Use This Developer Content Writing Template"}
                    </h2>
                    <p className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular mb-6">
                      {template.slug === "developer-content-and-guides-outline" ?
                        "Using this outline template is straightforward. Follow these steps to plan your developer content:" :
                        "This template provides complete content examples you can adapt. Here's how to make the most of it:"
                      }
                    </p>
                    <div className="space-y-5">
                      {template.howToUse && template.howToUse.map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center">
                            <span className="text-white font-bold quicksand-bold text-sm">{idx + 1}</span>
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-white quicksand-bold mb-1">{step.step}</h4>
                            <p className="text-[#94a3b8] text-sm quicksand-regular leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Template Content - Only for outline template */}
                {template.slug === "developer-content-and-guides-outline" ? (
                  <>
                    {/* Metrics Table - Only for outline template */}
                    {template.metricsTable && (
                      <div id="metrics-table" className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-[#a5b4fc] quicksand-bold">Suggested Outline</h2>
                        <div className="overflow-x-auto bg-[#1e293b] border border-[#334155] rounded-xl">
                          <table className="w-full">
                            <tbody>
                              {template.metricsTable.map((row, index) => (
                            <tr key={index} className={index !== template.metricsTable.length - 1 ? "border-b border-[#334155]" : ""}>
                              <td className="py-3 px-4 text-[#94a3b8] font-medium quicksand-medium text-sm whitespace-nowrap">
                                {row.label}
                              </td>
                              <td className="py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Data Table */}
                    <div className="mb-12">
                  <div className="overflow-x-auto bg-[#1e293b] border border-[#334155] rounded-xl">
                    <table className="w-full">
                      <thead className="bg-[#334155] border-b border-[#334155]">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-medium text-white quicksand-medium">Page</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q1 Views</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q2 Views</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q3 Views</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q1 Clicks</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q2 Impressions</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q3 Change</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Action Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#334155]">
                          <td className="py-3 px-4 text-[#60a5fa] quicksand-regular text-sm">sample_page_1</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">75,417</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">14,820</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">4,658</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">35.93%</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">102,351</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">13.53%</td>
                          <td className="text-right py-3 px-4"><span className="text-xs px-2 py-1 rounded text-green-400 bg-green-400/10">Improved Clicks</span></td>
                        </tr>
                        <tr className="border-b border-[#334155]">
                          <td className="py-3 px-4 text-[#60a5fa] quicksand-regular text-sm">sample_page_2</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">8,192</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">3,843</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">5,523</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">-38.25%</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">176,935</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">8.08%</td>
                          <td className="text-right py-3 px-4"><span className="text-xs px-2 py-1 rounded text-orange-400 bg-orange-400/10">Lower Clicks</span></td>
                        </tr>
                        <tr className="border-b border-[#334155]">
                          <td className="py-3 px-4 text-[#60a5fa] quicksand-regular text-sm">sample_page_3</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">4,340</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">4,135</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">823</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">-25.32%</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">58,148</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">2.77%</td>
                          <td className="text-right py-3 px-4"><span className="text-xs px-2 py-1 rounded text-orange-400 bg-orange-400/10">Lower Clicks</span></td>
                        </tr>
                        <tr className="border-b border-[#334155]">
                          <td className="py-3 px-4 text-[#60a5fa] quicksand-regular text-sm">sample_page_4</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">1,004</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">937</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">47</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">-75%</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">38,182</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">8.248</td>
                          <td className="text-right py-3 px-4"><span className="text-xs px-2 py-1 rounded text-red-400 bg-red-400/10">-30.81%</span></td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-[#60a5fa] quicksand-regular text-sm">sample_page_5</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">857</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">838</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">203</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">-28.8%</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">27,098</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">10.863</td>
                          <td className="text-right py-3 px-4"><span className="text-xs px-2 py-1 rounded text-green-400 bg-green-400/10">2.747%</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Template Outline - Plain text format */}
                {template.templateOutline && template.templateOutline.map((item, index) => (
                  <div key={index} id={`section-${index + 1}`} className="mb-10">
                    <h2 className="text-2xl font-bold mb-3 text-white quicksand-bold">
                      {item.section || item}
                    </h2>
                    {typeof item === 'object' && (
                      <>
                        <p className="text-[#cbd5e1] text-base leading-relaxed mb-3 quicksand-regular">
                          {item.description}
                        </p>
                        {item.example && (
                          <p className="text-[#94a3b8] text-sm leading-relaxed quicksand-light pl-4 border-l-2 border-[#6366f1]">
                            <span className="text-[#a5b4fc] quicksand-semibold">Example:</span> {item.example}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}
                  </>
                ) : null}
              </div>
              {/* Download CTA */}
              <div className="mt-12 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-3 quicksand-bold text-white">
                  Ready to Use This Template?
                </h3>
                <p className="text-white/90 mb-6 quicksand-light">
                  Download and start creating exceptional developer content
                </p>
                <a
                  href={template.downloadLink}
                  className="inline-flex items-center gap-2 bg-white text-[#1e293b] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors quicksand-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Template
                </a>
              </div>
            </motion.div>
          </div>
        ) : (
          // Original template layout for other templates
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
          <div className="border-b border-[#1a1f35] mb-12">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-white text-white quicksand-semibold text-sm">
                Content
              </button>
            </div>
          </div>

          {/* Page Content Table */}
          <div className="mb-16">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#1a1f35]">
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#6b7280] quicksand-medium">Page</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#6b7280] quicksand-medium">Q1 Views</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#6b7280] quicksand-medium">Q2 Views</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#6b7280] quicksand-medium">Q3 Views</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#6b7280] quicksand-medium">Q1 Clicks</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#6b7280] quicksand-medium">Q2 Impressions</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#6b7280] quicksand-medium">Q3 Change</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-[#6b7280] quicksand-medium">Action Required</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, index) => (
                    <tr key={index} className="border-b border-[#1a1f35] hover:bg-[#1a1f35] transition-colors">
                      <td className="py-3 px-4">
                        <Link href="#" className="text-blue-400 hover:underline quicksand-regular text-sm">
                          sample_page_{index + 1}
                        </Link>
                      </td>
                      <td className="text-right py-3 px-4 text-white quicksand-regular text-sm">
                        {(Math.random() * 10000).toFixed(0)}
                      </td>
                      <td className="text-right py-3 px-4 text-white quicksand-regular text-sm">
                        {(Math.random() * 10000).toFixed(0)}
                      </td>
                      <td className="text-right py-3 px-4 text-white quicksand-regular text-sm">
                        {Math.floor(Math.random() * 1000)}
                      </td>
                      <td className="text-right py-3 px-4 text-white quicksand-regular text-sm">
                        {(Math.random() * 100).toFixed(2)}%
                      </td>
                      <td className="text-right py-3 px-4 text-white quicksand-regular text-sm">
                        {Math.floor(Math.random() * 100000)}
                      </td>
                      <td className="text-right py-3 px-4 quicksand-regular text-sm">
                        <span className={Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'}>
                          {Math.random() > 0.5 ? '+' : ''}{(Math.random() * 50 - 25).toFixed(1)}%
                        </span>
                      </td>
                      <td className="text-right py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${Math.random() > 0.5 ? 'text-green-400 bg-green-400/10' : 'text-orange-400 bg-orange-400/10'}`}>
                          {Math.random() > 0.5 ? 'Improved Clicks' : 'Lower Clicks'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Template Outline Section - Clean structured design */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 quicksand-bold">What is {template.title}?</h2>
              <p className="text-[#aaa] text-lg quicksand-light leading-relaxed">
                {template.overview}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 quicksand-bold">Why Use {template.title}?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {template.keyFeatures && template.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 bg-[#1a1f35] border border-[#2a2f45] rounded-lg p-5 hover:border-[#4a4f6a] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0"></div>
                    <p className="text-[#ccc] quicksand-light leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 quicksand-bold">What's Included</h2>
              <div className="space-y-6">
                {template.howToUse && template.howToUse.map((step, index) => (
                  <div key={index} className="bg-[#1a1f35] border border-[#2a2f45] rounded-lg p-6 hover:border-[#4a4f6a] transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold quicksand-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white quicksand-semibold text-lg mb-2">{step.step}</h3>
                        <p className="text-[#888] text-sm quicksand-light leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download CTA */}
            <div className="pt-8 border-t border-[#1a1f35]">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-10 text-center">
                <h3 className="text-2xl font-bold mb-3 quicksand-bold">
                  Download and start building your marketing strategy
                </h3>
                <p className="text-white/80 mb-6 quicksand-light">
                  Get instant access to this template and streamline your workflow
                </p>
                <button
                  onClick={handleDownloadClick}
                  className="inline-flex items-center gap-2 bg-white text-black hover:bg-[#e5e5e5] px-8 py-3 rounded-md font-medium transition-colors quicksand-semibold cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Template
                </button>
              </div>
            </div>
          </div>

        {/* Template Outline Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 quicksand-bold">Template Outline</h2>
          <div className="space-y-6">
            {template.templateOutline && template.templateOutline.map((item, index) => (
              <div
                key={index}
                className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-blue-400 quicksand-bold">
                  {index + 1}. {item.section}
                </h3>
                <p className="text-gray-300 mb-3 quicksand-light">{item.description}</p>
                {item.example && (
                  <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-purple-500">
                    <p className="text-gray-400 text-sm italic quicksand-light">
                      {item.example}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
          </motion.div>
        )}

        {/* CTA Section - Show for all templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-[#1a1f35] border border-[#2a2f45] rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 quicksand-bold">
              Need Help Implementing This Template?
            </h2>
            <p className="text-lg text-[#888] mb-8 quicksand-light max-w-2xl mx-auto">
              Our content marketing experts can help you customize and implement this template
              for your specific needs.
            </p>
            <Link
              href="/book-a-demo"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl quicksand-semibold"
            >
              Book a Free Consultation
            </Link>
          </div>
        </motion.div>

        {/* Related Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 quicksand-bold">Explore More Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templateMetadata
              .filter((t) => t.id !== template.id)
              .slice(0, 3)
              .map((relatedTemplate) => (
                <Link
                  key={relatedTemplate.id}
                  href={`/templates/${relatedTemplate.slug}`}
                  className="group block"
                >
                  <div className="relative bg-[#1a1f35] border border-[#2a2f45] rounded-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 p-6">
                    <div className="absolute top-4 right-4 w-24 h-24 overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 group-hover:rotate-12 origin-top-right">
                      <Image
                        src={relatedTemplate.thumbnailImage}
                        alt={relatedTemplate.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="pr-24">
                      <div className="inline-flex items-center justify-center bg-blue-600/10 border border-blue-500/20 rounded-full px-3 py-1 text-[10px] quicksand-semibold mb-2">
                        <p className="text-blue-400">{relatedTemplate.category}</p>
                      </div>
                      <h3 className="text-base font-bold quicksand-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {relatedTemplate.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Email Verification Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md mx-4 bg-black/20 backdrop-blur-md rounded-xl p-8 lg:p-10 shadow-2xl border border-white/20 hover:border-white/30"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowEmailModal(false);
                setEmail("");
                setEmailError("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-white mb-2 quicksand-bold">Download Template</h3>
                <p className="text-gray-300 quicksand-regular">Enter your email to access the template</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="text-white quicksand-medium mb-2 block">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-3 bg-black backdrop-blur-sm rounded-lg text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-purple-700 border border-white/20 transition-all quicksand-regular"
                    disabled={isSubmitting}
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-400 quicksand-light">{emailError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed quicksand-semibold shadow-lg"
                >
                  {isSubmitting ? "Downloading..." : "Download Template"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TemplateDetailPage;
