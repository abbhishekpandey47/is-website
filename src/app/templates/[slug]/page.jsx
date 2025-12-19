"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import AppContext from "../../../context/Infracontext";
import templateMetadata from "../../../../templates-data/_templateMetadata";
import { notFound } from "next/navigation";

const TemplateDetailPage = ({ params }) => {
  const context = useContext(AppContext);
  const { setProgress } = context;

  const template = templateMetadata.find((t) => t.slug === params.slug);

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Banner Section */}
      <div className="relative w-full h-[400px] max-sm:h-[300px] overflow-hidden">
        <Image
          src={template.bannerImage}
          alt={template.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-sm:p-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center bg-[#f5f4f7] rounded-full px-4 py-2 text-[14px] quicksand-semibold mb-4"
            >
              <p className="text-black">{template.category}</p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold quicksand-bold"
            >
              {template.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4 quicksand-bold">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed quicksand-light">
                {template.overview}
              </p>
            </motion.div>

            {/* Use Case */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20"
            >
              <h3 className="text-xl font-bold mb-2 quicksand-bold">Perfect For</h3>
              <p className="text-gray-300 quicksand-light">{template.useCase}</p>
            </motion.div>

            {/* Target Audience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-6 border border-purple-500/20"
            >
              <h3 className="text-xl font-bold mb-2 quicksand-bold">Who Should Use This</h3>
              <p className="text-gray-300 quicksand-light">{template.targetAudience}</p>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 quicksand-bold">Key Features</h2>
              <ul className="space-y-3">
                {template.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-300 quicksand-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Video & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Video Embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-4"
            >
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-2xl">
                <div className="relative w-full aspect-video mb-4 bg-slate-800 rounded-lg overflow-hidden">
                  <iframe
                    src={template.videoEmbedUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={`${template.title} Tutorial`}
                  ></iframe>
                </div>

                {/* Download Button */}
                <a
                  href={template.downloadLink}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl quicksand-semibold"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Template
                </a>

                {/* Quick Info */}
                <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="text-gray-400 text-sm quicksand-light">
                      {template.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-400 text-sm quicksand-light">
                      {new Date(template.publishedOn).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={template.authorImage}
                      alt={template.author}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="text-gray-400 text-sm quicksand-light">
                      {template.author}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Template Outline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 quicksand-bold">Template Outline</h2>
          <div className="space-y-6">
            {template.templateOutline.map((item, index) => (
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
        </motion.div>

        {/* How to Use Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 quicksand-bold">How to Use This Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {template.howToUse.map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center font-bold quicksand-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 quicksand-bold">{step.step}</h3>
                    <p className="text-gray-300 quicksand-light">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-12 border border-blue-500/20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 quicksand-bold">
              Need Help Implementing This Template?
            </h2>
            <p className="text-lg text-gray-300 mb-8 quicksand-light max-w-2xl mx-auto">
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
          transition={{ duration: 0.6, delay: 0.9 }}
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
                  className="group"
                >
                  <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedTemplate.thumbnailImage}
                        alt={relatedTemplate.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="inline-flex items-center justify-center bg-[#f5f4f7] rounded-full px-3 py-1 text-[10px] quicksand-semibold mb-2">
                        <p className="text-black">{relatedTemplate.category}</p>
                      </div>
                      <h3 className="text-lg font-bold quicksand-bold group-hover:text-blue-400 transition-colors">
                        {relatedTemplate.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TemplateDetailPage;
