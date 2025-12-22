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
    <div className="min-h-screen bg-[#0f1419] text-white">
      {/* Hero Section - Title Left, Video Right */}
      <div className="bg-gradient-to-b from-[#1a0b2e] via-[#16213e] to-[#0f1419] pt-32 pb-16">
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
                <a
                  href={template.downloadLink}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl quicksand-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Template
                </a>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Content Tabs */}
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
                <a
                  href={template.downloadLink}
                  className="inline-flex items-center gap-2 bg-white text-black hover:bg-[#e5e5e5] px-8 py-3 rounded-md font-medium transition-colors quicksand-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Template
                </a>
              </div>
            </div>
          </div>
        </motion.div>

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
        {/* CTA Section */}
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
    </div>
  );
};

export default TemplateDetailPage;
