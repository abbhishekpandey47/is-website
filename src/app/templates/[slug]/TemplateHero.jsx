"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const TemplateHero = ({ template, onDownloadClick }) => {
  return (
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
                onClick={onDownloadClick}
                className="inline-flex items-center justify-center gap-2 bg-[#5F64FF] hover:bg-[#4E53E6] rounded-[5px] px-8 py-3.5 text-white font-semibold quicksand-semibold transition-all duration-300 cursor-pointer"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="relative w-full aspect-video bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-purple-500/30 rounded-xl overflow-hidden shadow-2xl">
              {template.videoEmbedUrl ? (
                <iframe
                  src={template.videoEmbedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title={`${template.title} Tutorial`}
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-purple-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-purple-300 text-xl font-semibold quicksand-semibold mb-2">Coming Soon</p>
                    <p className="text-gray-400 text-sm quicksand-regular">Video tutorial will be available shortly</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TemplateHero;
