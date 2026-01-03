"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/Infracontext";
import CTA from "../../../Components/CTA/CTA";
import TemplateCarousel from "./TemplateCarousel";
import EmailModal from "./EmailModal";

export default function TemplatePageClient({ template }) {
  const context = useContext(AppContext);
  const { setProgress } = context;
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  const layoutType = template.layoutType || "standard";
  const isDeveloperLayout = layoutType === "developer-outline";
  const isOutlineTemplate = template.slug === "developer-content-and-guides-outline";
  const isWritingTemplate = template.slug === "developer-content-and-guides-content";
  const educationalContent = template.educationalContent;
  const hasCustomEducationalContent = Boolean(educationalContent);

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowEmailModal(true);
  };

  const renderBulletList = (items) => (
    <ul className="space-y-2 text-[#cbd5e1] text-sm quicksand-regular mt-4">
      {items.map((bullet, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span className="text-[#6366f1] mt-1">•</span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );

  const renderDefinitionCards = (items) => (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs uppercase tracking-wide text-[#a5b4fc] quicksand-semibold">{item.label}</p>
          {item.description && (
            <p className="text-[#cbd5e1] text-sm quicksand-regular mt-2">{item.description}</p>
          )}
          {item.example && (
            <p className="text-[#a5b4fc] text-sm quicksand-regular mt-3">
              <span className="quicksand-semibold">Example:</span> {item.example}
            </p>
          )}
          {item.exampleList && (
            <ul className="mt-3 space-y-1 text-[#94a3b8] text-sm quicksand-regular">
              {item.exampleList.map((example, exIdx) => (
                <li key={exIdx} className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1">•</span>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  const renderLabeledItems = (items) => (
    <ul className="space-y-3 text-[#cbd5e1] text-sm quicksand-regular mt-4">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span className="text-[#6366f1] mt-1">•</span>
          <span>
            <span className="font-semibold text-white quicksand-semibold">{item.label}</span>
            {item.description && <span className="text-[#94a3b8] ml-1">{item.description}</span>}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Email Modal */}
      <EmailModal 
        show={showEmailModal} 
        onClose={() => setShowEmailModal(false)} 
        template={template}
      />

      {/* Hero Section - Title Left, Video Right */}
      <div className="relative isolate pt-32 pb-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_50%_-20%,rgba(108,91,233,0.5),rgba(255,255,255,0))]" />
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern id="grid" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid)" />
        </svg>
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
              <div className="relative w-full aspect-video bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-purple-500/30 rounded-xl overflow-hidden shadow-2xl">
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

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl space-y-12">
            
            {/* Render template content based on layout type */}
            {/* This is where the rest of the template-specific content will go */}
            {/* I'll continue in the next file part */}
            
            <div>
              <p className="text-gray-400">Template content will render here based on template type</p>
              {/* Add your existing rendering logic from the original page.jsx here */}
            </div>

          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <CTA />
    </div>
  );
}
