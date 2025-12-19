"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, {
    Suspense,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import AppContext from "../../context/Infracontext";
import Image from "next/image";
import templateMetadata from "../../../templates-data/_templateMetadata";

let tabs = [
  { id: "allCategories", label: "All Templates" },
  { id: "Informational", label: "Informational" },
  { id: "Developer Marketing", label: "Developer Marketing" },
  { id: "Product Documentation", label: "Product Documentation" },
  { id: "Community Engagement", label: "Community Engagement" },
];

const TabDiv = React.memo(({ activeTab, setActiveTab }) => (
  <div className="flex flex-wrap gap-2 sm:gap-[0.60rem] max-w-7xl mx-auto justify-center px-4">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`relative group px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ease-out
          ${activeTab === tab.id 
            ? 'text-white shadow-lg scale-105' 
            : 'text-gray-300 hover:text-white hover:scale-102'
          }
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
          backdrop-blur-sm border border-white/20 hover:border-white/40
          min-w-max whitespace-nowrap
        `}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {activeTab === tab.id && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl"
            transition={{ 
              type: "spring", 
              bounce: 0.15, 
              duration: 0.5 
            }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1 sm:gap-2">
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
            />
          )}
        </span>
      </button>
    ))}
  </div>
));

const TemplateCard = React.memo(({ template }) => (
  <Link href={`/templates/${template.slug}`} className="w-full">
    <div className="hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer card w-full max-w-md mx-auto h-[500px] sm:h-[520px] shadow-2xl rounded-md border-[#999] border-2 relative">
      <div className="p-3">
        <figure className="pb-5">
          <Image
            loading="lazy"
            width={600}
            height={342}
            className="object-cover relative overflow-hidden transition duration-150 cursor-pointer"
            src={template.thumbnailImage || "/blog_home/blog_home.png"}
            alt={template.title}
            style={{
              borderRadius: "7px",
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </figure>
        <div className="py-0 pb-5">
          <div className="inline-flex items-center justify-center bg-[#f5f4f7] rounded-full px-3 py-1 text-[11px] sm:text-[12px] quicksand-semibold">
            <p className="text-black">{template.category}</p>
          </div>
        </div>
        <div className="text-white flex flex-col gap-3 sm:gap-4">
          <h2 className="card-title quicksand-bold text-base sm:text-lg">{template.title}</h2>
          <p className="quicksand-light mt-2 text-sm sm:text-base">
            {template.shortDescription.length > 90
              ? `${template.shortDescription.slice(0, 80).trim()} . . .`
              : template.shortDescription}
          </p>
          <div className="flex items-center gap-2 absolute bottom-3">
            <Image
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
              src={template.authorImage || "/svgPatterns/profile.svg"}
              alt=""
              width={40}
              height={40}
            />
            <p className="quicksand-semibold text-sm sm:text-base">{template.author}</p>
          </div>
        </div>
      </div>
    </div>
  </Link>
));

const TemplatesPage = () => {
  const context = useContext(AppContext);
  const { setProgress } = context;

  const [activeTab, setActiveTab] = useState("allCategories");
  const [filteredTemplates, setFilteredTemplates] = useState(templateMetadata);

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  useEffect(() => {
    if (activeTab === "allCategories") {
      setFilteredTemplates(templateMetadata);
    } else {
      setFilteredTemplates(
        templateMetadata.filter((template) => template.category === activeTab)
      );
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 quicksand-bold px-2"
          >
            Your Go-To Library for Digital{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Marketing Templates
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto quicksand-light px-2"
          >
            From content briefs to keyword research and PPC planning, get free, ready-to-use
            templates to streamline your marketing workflow and boost efficiency.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/book-a-demo"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl quicksand-semibold text-sm sm:text-base"
            >
              Book a Free Call
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="py-6 sm:py-8 px-4">
        <TabDiv activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
        >
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 sm:py-20">
              <p className="text-gray-400 text-lg sm:text-xl quicksand-light px-4">
                No templates found in this category yet.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border border-blue-500/20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 quicksand-bold px-2">
            Need Custom Content Strategy?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 quicksand-light px-2">
            Our team can help you create tailored content strategies that drive results
            for your B2B SaaS business.
          </p>
          <Link
            href="/book-a-demo"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl quicksand-semibold text-sm sm:text-base"
          >
            Schedule a Consultation
          </Link>
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
