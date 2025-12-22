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
  <Link href={`/templates/${template.slug}`} className="group block">
    <div className="bg-[#1a1f35] border border-[#2a2f45] rounded-xl overflow-hidden hover:border-[#4a4f6a] hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-video w-full bg-[#0f1419] overflow-hidden">
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
      <div className="p-5">
        <div className="mb-3">
          <span className="inline-block bg-blue-600/20 text-blue-300 text-xs px-3 py-1 rounded-full quicksand-semibold">
            {template.category}
          </span>
        </div>
        <h3 className="text-white quicksand-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {template.title}
        </h3>
        <p className="text-[#a0a5ba] text-sm quicksand-light line-clamp-2 leading-relaxed">
          {template.shortDescription}
        </p>
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
    <div className="min-h-screen bg-[#0f1419] text-white">
      {/* Hero Section */}
      <div className="border-b border-[#1a1f35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 quicksand-bold"
          >
            Find your Template
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
                className="w-full bg-[#1a1f35] border border-[#2a2f45] rounded-lg pl-12 pr-4 py-4 text-white placeholder-[#6b7280] focus:outline-none focus:border-[#4a4f6a] transition-colors quicksand-regular"
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
                  <h3 className="text-xs text-[#6b7280] mb-3 quicksand-semibold uppercase tracking-wider">Categories</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedUseCase("all")}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors quicksand-regular ${
                        selectedUseCase === "all"
                          ? "bg-[#2a2f45] text-white"
                          : "text-[#a0a5ba] hover:text-white hover:bg-[#1a1f35]"
                      }`}
                    >
                      All Templates
                    </button>
                    <button
                      onClick={() => setSelectedUseCase("Informational")}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors quicksand-regular ${
                        selectedUseCase === "Informational"
                          ? "bg-[#2a2f45] text-white"
                          : "text-[#a0a5ba] hover:text-white hover:bg-[#1a1f35]"
                      }`}
                    >
                      Informational
                    </button>
                    <button
                      onClick={() => setSelectedUseCase("Developer Marketing")}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors quicksand-regular ${
                        selectedUseCase === "Developer Marketing"
                          ? "bg-[#2a2f45] text-white"
                          : "text-[#a0a5ba] hover:text-white hover:bg-[#1a1f35]"
                      }`}
                    >
                      Developer Marketing
                    </button>
                    <button
                      onClick={() => setSelectedUseCase("Product Documentation")}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors quicksand-regular ${
                        selectedUseCase === "Product Documentation"
                          ? "bg-[#2a2f45] text-white"
                          : "text-[#a0a5ba] hover:text-white hover:bg-[#1a1f35]"
                      }`}
                    >
                      Product Documentation
                    </button>
                    <button
                      onClick={() => setSelectedUseCase("Community Engagement")}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors quicksand-regular ${
                        selectedUseCase === "Community Engagement"
                          ? "bg-[#2a2f45] text-white"
                          : "text-[#a0a5ba] hover:text-white hover:bg-[#1a1f35]"
                      }`}
                    >
                      Community Engagement
                    </button>
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
