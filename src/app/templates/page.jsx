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
import templateMetadata from "../../../templates-data/_templateMetadata";

const TemplateCard = React.memo(({ template }) => (
  <Link href={`/templates/${template.slug}`} className="group block h-full">
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl overflow-hidden hover:border-[#475569] hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Image Section */}
      <div className="relative aspect-video w-full bg-[#0f172a] overflow-hidden flex-shrink-0">
        <Image
          loading="lazy"
          width={400}
          height={225}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          src={template.thumbnailImage || "/blog_home/blog_home.png"}
          alt={template.title}
        />
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="inline-block bg-[#6366f1]/10 text-[#a5b4fc] text-xs px-3 py-1 rounded-full quicksand-semibold">
            {template.category}
          </span>
        </div>
        <h3 className="text-white quicksand-bold text-lg mb-2 line-clamp-2 group-hover:text-[#a5b4fc] transition-colors min-h-[3.5rem]">
          {template.title}
        </h3>
        <p className="text-[#94a3b8] text-sm quicksand-light line-clamp-2 leading-relaxed mb-4 flex-grow">
          {template.shortDescription}
        </p>
        {/* Get Template Link */}
        <span className="text-[#6366f1] hover:text-[#818cf8] font-semibold text-sm quicksand-semibold inline-flex items-center gap-1 transition-colors mt-auto">
          Get Template
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  </Link>
));

const TemplatesPage = () => {
  const context = useContext(AppContext);
  const { setProgress } = context;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState("all");
  const [filteredTemplates, setFilteredTemplates] = useState(templateMetadata);

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  useEffect(() => {
    let filtered = templateMetadata;

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
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#1a0b2e] via-[#16213e] to-[#0f172a] border-b border-[#1e293b] pt-32 pb-16">
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
                className="w-full bg-[#1e293b] border border-[#334155] rounded-lg pl-12 pr-4 py-4 text-white placeholder-[#64748b] focus:outline-none focus:border-[#6366f1] transition-colors quicksand-regular"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                  <h3 className="text-xs text-[#64748b] mb-3 quicksand-semibold uppercase tracking-wider">Categories</h3>
                  <div className="space-y-2">
                    <label className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors quicksand-regular cursor-pointer ${
                      selectedUseCase === "all"
                        ? "bg-[#6366f1]/10 text-[#a5b4fc]"
                        : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
                    }`}>
                      <div className="relative flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={selectedUseCase === "all"}
                          onChange={() => setSelectedUseCase("all")}
                          className="w-5 h-5 appearance-none border-2 border-[#475569] rounded bg-transparent checked:bg-[#6366f1] checked:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 transition-all cursor-pointer"
                        />
                        {selectedUseCase === "all" && (
                          <svg className="absolute left-0 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>All Templates</span>
                    </label>
                    <label className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors quicksand-regular cursor-pointer ${
                      selectedUseCase === "Informational"
                        ? "bg-[#6366f1]/10 text-[#a5b4fc]"
                        : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
                    }`}>
                      <div className="relative flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={selectedUseCase === "Informational"}
                          onChange={() => setSelectedUseCase("Informational")}
                          className="w-5 h-5 appearance-none border-2 border-[#475569] rounded bg-transparent checked:bg-[#6366f1] checked:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 transition-all cursor-pointer"
                        />
                        {selectedUseCase === "Informational" && (
                          <svg className="absolute left-0 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>Informational</span>
                    </label>
                    <label className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors quicksand-regular cursor-pointer ${
                      selectedUseCase === "Developer Marketing"
                        ? "bg-[#6366f1]/10 text-[#a5b4fc]"
                        : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
                    }`}>
                      <div className="relative flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={selectedUseCase === "Developer Marketing"}
                          onChange={() => setSelectedUseCase("Developer Marketing")}
                          className="w-5 h-5 appearance-none border-2 border-[#475569] rounded bg-transparent checked:bg-[#6366f1] checked:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 transition-all cursor-pointer"
                        />
                        {selectedUseCase === "Developer Marketing" && (
                          <svg className="absolute left-0 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>Developer Marketing</span>
                    </label>
                    <label className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors quicksand-regular cursor-pointer ${
                      selectedUseCase === "Product Documentation"
                        ? "bg-[#6366f1]/10 text-[#a5b4fc]"
                        : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
                    }`}>
                      <div className="relative flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={selectedUseCase === "Product Documentation"}
                          onChange={() => setSelectedUseCase("Product Documentation")}
                          className="w-5 h-5 appearance-none border-2 border-[#475569] rounded bg-transparent checked:bg-[#6366f1] checked:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 transition-all cursor-pointer"
                        />
                        {selectedUseCase === "Product Documentation" && (
                          <svg className="absolute left-0 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>Product Documentation</span>
                    </label>
                    <label className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors quicksand-regular cursor-pointer ${
                      selectedUseCase === "Community Engagement (Reddit & GitHub)"
                        ? "bg-[#6366f1]/10 text-[#a5b4fc]"
                        : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
                    }`}>
                      <div className="relative flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={selectedUseCase === "Community Engagement (Reddit & GitHub)"}
                          onChange={() => setSelectedUseCase("Community Engagement (Reddit & GitHub)")}
                          className="w-5 h-5 appearance-none border-2 border-[#475569] rounded bg-transparent checked:bg-[#6366f1] checked:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 transition-all cursor-pointer"
                        />
                        {selectedUseCase === "Community Engagement (Reddit & GitHub)" && (
                          <svg className="absolute left-0 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>Community Engagement (Reddit & GitHub)</span>
                    </label>
                    <label className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors quicksand-regular cursor-pointer ${
                      selectedUseCase === "Developer Content & Guides"
                        ? "bg-[#6366f1]/10 text-[#a5b4fc]"
                        : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
                    }`}>
                      <div className="relative flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={selectedUseCase === "Developer Content & Guides"}
                          onChange={() => setSelectedUseCase("Developer Content & Guides")}
                          className="w-5 h-5 appearance-none border-2 border-[#475569] rounded bg-transparent checked:bg-[#6366f1] checked:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 transition-all cursor-pointer"
                        />
                        {selectedUseCase === "Developer Content & Guides" && (
                          <svg className="absolute left-0 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>Developer Content & Guides</span>
                    </label>
                    <label className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors quicksand-regular cursor-pointer ${
                      selectedUseCase === "DevRel & Content Distribution"
                        ? "bg-[#6366f1]/10 text-[#a5b4fc]"
                        : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
                    }`}>
                      <div className="relative flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={selectedUseCase === "DevRel & Content Distribution"}
                          onChange={() => setSelectedUseCase("DevRel & Content Distribution")}
                          className="w-5 h-5 appearance-none border-2 border-[#475569] rounded bg-transparent checked:bg-[#6366f1] checked:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 transition-all cursor-pointer"
                        />
                        {selectedUseCase === "DevRel & Content Distribution" && (
                          <svg className="absolute left-0 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>DevRel & Content Distribution</span>
                    </label>
                    <label className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors quicksand-regular cursor-pointer ${
                      selectedUseCase === "Content Ops & Performance Reporting"
                        ? "bg-[#6366f1]/10 text-[#a5b4fc]"
                        : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
                    }`}>
                      <div className="relative flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={selectedUseCase === "Content Ops & Performance Reporting"}
                          onChange={() => setSelectedUseCase("Content Ops & Performance Reporting")}
                          className="w-5 h-5 appearance-none border-2 border-[#475569] rounded bg-transparent checked:bg-[#6366f1] checked:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 transition-all cursor-pointer"
                        />
                        {selectedUseCase === "Content Ops & Performance Reporting" && (
                          <svg className="absolute left-0 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>Content Ops & Performance Reporting</span>
                    </label>
                    <label className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors quicksand-regular cursor-pointer ${
                      selectedUseCase === "API Docs & SDK Docs"
                        ? "bg-[#6366f1]/10 text-[#a5b4fc]"
                        : "text-[#94a3b8] hover:text-white hover:bg-[#1e293b]"
                    }`}>
                      <div className="relative flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={selectedUseCase === "API Docs & SDK Docs"}
                          onChange={() => setSelectedUseCase("API Docs & SDK Docs")}
                          className="w-5 h-5 appearance-none border-2 border-[#475569] rounded bg-transparent checked:bg-[#6366f1] checked:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-0 transition-all cursor-pointer"
                        />
                        {selectedUseCase === "API Docs & SDK Docs" && (
                          <svg className="absolute left-0 w-5 h-5 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>API Docs & SDK Docs</span>
                    </label>
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
  );
};

export default function TemplatesPageWithSuspense(props) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]"></div>}>
      <TemplatesPage {...props} />
    </Suspense>
  );
}
