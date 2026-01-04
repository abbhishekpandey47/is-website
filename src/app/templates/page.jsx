"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, {
    Suspense,
    useContext,
    useEffect,
    useState,
} from "react";

import AppContext from "../../context/Infracontext";
import Image from "next/image";
import templateIndex from "../../../templates-data/_templateIndex";

const TemplateCard = React.memo(({ template }) => {
  const CardContent = () => (
    <div className={`bg-gradient-to-br from-[#1e1b4b]/40 to-[#312e81]/40 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden ${!template.comingSoon ? 'hover:border-purple-400/40 hover:shadow-xl hover:shadow-purple-500/10' : 'opacity-60 cursor-not-allowed'} transition-all duration-300 h-full flex flex-col`}>
      {/* Image Section */}
      <div className="relative aspect-video w-full bg-gradient-to-br from-[#1e1b4b] to-[#312e81] overflow-hidden flex-shrink-0">
        <Image
          loading="lazy"
          width={400}
          height={225}
          className={`object-cover w-full h-full ${!template.comingSoon ? 'group-hover:scale-105' : ''} transition-transform duration-300`}
          src={template.thumbnailImage || "/blog_home/blog_home.png"}
          alt={template.title}
        />
        {template.comingSoon && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm quicksand-bold">
              Coming Soon
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="inline-block bg-purple-500/20 text-purple-200 text-xs px-3 py-1 rounded-full quicksand-semibold">
            {template.category}
          </span>
        </div>
        <h3 className={`text-white quicksand-bold text-lg mb-2 line-clamp-2 ${!template.comingSoon ? 'group-hover:text-purple-300' : ''} transition-colors min-h-[3.5rem]`}>
          {template.title}
        </h3>
        <p className="text-[#94a3b8] text-sm quicksand-light line-clamp-2 leading-relaxed mb-4 flex-grow">
          {template.shortDescription}
        </p>
        {/* Get Template Link */}
        {!template.comingSoon ? (
          <span className="text-purple-400 hover:text-purple-300 font-semibold text-sm quicksand-semibold inline-flex items-center gap-1 transition-colors mt-auto">
            Get Template
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        ) : (
          <span className="text-gray-500 font-semibold text-sm quicksand-semibold inline-flex items-center gap-1 mt-auto">
            In Development
          </span>
        )}
      </div>
    </div>
  );

  if (template.comingSoon) {
    return (
      <div className="block h-full">
        <CardContent />
      </div>
    );
  }

  return (
    <Link href={`/templates/${template.slug}`} className="group block h-full">
      <CardContent />
    </Link>
  );
});

TemplateCard.displayName = 'TemplateCard';

const TemplatesPage = () => {
  const context = useContext(AppContext);
  const { setProgress } = context;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState("all");
  const [filteredTemplates, setFilteredTemplates] = useState(templateIndex);

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  useEffect(() => {
    let filtered = templateIndex;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((template) =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by use case (category)
    if (selectedUseCase !== "all") {
      filtered = filtered.filter((template) => 
        template.category === selectedUseCase
      );
    }

    setFilteredTemplates(filtered);
  }, [searchQuery, selectedUseCase]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 quicksand-bold"
          >
            Templates We Use to Run Developer Content at Scale
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#a3a3a3] mb-8 max-w-2xl mx-auto quicksand-light"
          >
            Jumpstart your app development process with pre-built solutions from Infrasity and our community.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#737373]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e1b4b]/40 backdrop-blur-sm border border-purple-500/30 rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all quicksand-regular"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#0f0728]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="sticky top-20">
              <h2 className="text-xl font-semibold mb-6 quicksand-semibold text-white">Filter Templates</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xs text-gray-400 mb-3 quicksand-semibold uppercase tracking-wider">Categories</h3>
                  <div className="space-y-2">
                    <label className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors quicksand-regular cursor-pointer ${
                      selectedUseCase === "all"
                        ? "bg-purple-500/20 text-purple-200"
                        : "text-gray-300 hover:text-white hover:bg-purple-500/10"
                    }`}>
                      <div className="relative flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={selectedUseCase === "all"}
                          onChange={() => setSelectedUseCase("all")}
                          className="w-5 h-5 appearance-none border-2 border-purple-500/30 rounded bg-transparent checked:bg-purple-500 checked:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all cursor-pointer"
                        />
                        {selectedUseCase === "all" && (
                          <svg className="absolute left-0 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>All Templates</span>
                    </label>
                    <div className="w-full flex items-center px-3 py-2.5 rounded-md text-sm quicksand-regular cursor-not-allowed opacity-50 text-gray-500">
                      <div className="relative flex items-center mr-3">
                        <div className="w-5 h-5 border-2 border-gray-600/30 rounded bg-transparent" />
                      </div>
                      <span>Informational <span className="text-gray-500 text-xs">(coming soon)</span></span>
                    </div>
                    <div className="w-full flex items-center px-3 py-2.5 rounded-md text-sm quicksand-regular cursor-not-allowed opacity-50 text-gray-500">
                      <div className="relative flex items-center mr-3">
                        <div className="w-5 h-5 border-2 border-gray-600/30 rounded bg-transparent" />
                      </div>
                      <span>Developer Marketing <span className="text-gray-500 text-xs">(coming soon)</span></span>
                    </div>
                    <div className="w-full flex items-center px-3 py-2.5 rounded-md text-sm quicksand-regular cursor-not-allowed opacity-50 text-gray-500">
                      <div className="relative flex items-center mr-3">
                        <div className="w-5 h-5 border-2 border-gray-600/30 rounded bg-transparent" />
                      </div>
                      <span>Product Documentation <span className="text-gray-500 text-xs">(coming soon)</span></span>
                    </div>
                    <div className="w-full flex items-center px-3 py-2.5 rounded-md text-sm quicksand-regular cursor-not-allowed opacity-50 text-gray-500">
                      <div className="relative flex items-center mr-3">
                        <div className="w-5 h-5 border-2 border-gray-600/30 rounded bg-transparent" />
                      </div>
                      <span>Community Engagement (Reddit & GitHub) <span className="text-gray-500 text-xs">(coming soon)</span></span>
                    </div>
                    <label className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors quicksand-regular cursor-pointer ${
                      selectedUseCase === "Developer Content & Guides"
                        ? "bg-purple-500/20 text-purple-200"
                        : "text-gray-300 hover:text-white hover:bg-purple-500/10"
                    }`}>
                      <div className="relative flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={selectedUseCase === "Developer Content & Guides"}
                          onChange={() => setSelectedUseCase("Developer Content & Guides")}
                          className="w-5 h-5 appearance-none border-2 border-purple-500/30 rounded bg-transparent checked:bg-purple-500 checked:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all cursor-pointer"
                        />
                        {selectedUseCase === "Developer Content & Guides" && (
                          <svg className="absolute left-0 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>Developer Content & Guides</span>
                    </label>
                    <div className="w-full flex items-center px-3 py-2.5 rounded-md text-sm quicksand-regular cursor-not-allowed opacity-50 text-gray-500">
                      <div className="relative flex items-center mr-3">
                        <div className="w-5 h-5 border-2 border-gray-600/30 rounded bg-transparent" />
                      </div>
                      <span>DevRel & Content Distribution <span className="text-gray-500 text-xs">(coming soon)</span></span>
                    </div>
                    <div className="w-full flex items-center px-3 py-2.5 rounded-md text-sm quicksand-regular cursor-not-allowed opacity-50 text-gray-500">
                      <div className="relative flex items-center mr-3">
                        <div className="w-5 h-5 border-2 border-gray-600/30 rounded bg-transparent" />
                      </div>
                      <span>Content Ops & Performance Reporting <span className="text-gray-500 text-xs">(coming soon)</span></span>
                    </div>
                    <div className="w-full flex items-center px-3 py-2.5 rounded-md text-sm quicksand-regular cursor-not-allowed opacity-50 text-gray-500">
                      <div className="relative flex items-center mr-3">
                        <div className="w-5 h-5 border-2 border-gray-600/30 rounded bg-transparent" />
                      </div>
                      <span>API Docs & SDK Docs <span className="text-gray-500 text-xs">(coming soon)</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Templates Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1"
          >
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#737373] text-lg quicksand-light">
                  No templates found matching your criteria.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default function TemplatesPageWithSuspense(props) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]"></div>}>
      <TemplatesPage {...props} />
    </Suspense>
  );
}

