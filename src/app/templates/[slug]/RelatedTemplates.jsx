"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const RelatedTemplates = ({ templateIndex, currentTemplateId }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mt-16"
    >
      <h2 className="text-3xl font-bold mb-8 quicksand-bold">Explore More Templates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templateIndex
          .filter((t) => t.id !== currentTemplateId)
          .slice(0, 3)
          .map((relatedTemplate) => (
            <Link
              key={relatedTemplate.id}
              href={`/templates/${relatedTemplate.slug}`}
              className="group block"
            >
              <div className="relative bg-gradient-to-br from-[#1e1b4b]/60 to-[#312e81]/60 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 p-6">
                <div className="absolute top-4 right-4 w-24 h-24 overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 group-hover:rotate-12 origin-top-right">
                  <Image
                    src={relatedTemplate.thumbnailImage}
                    alt={relatedTemplate.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="pr-24">
                  <div className="inline-flex items-center justify-center bg-purple-600/20 border border-purple-500/30 rounded-full px-3 py-1 text-[10px] quicksand-semibold mb-2">
                    <p className="text-purple-300">{relatedTemplate.category}</p>
                  </div>
                  <h3 className="text-base font-bold quicksand-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                    {relatedTemplate.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </motion.div>
  );
};

export default RelatedTemplates;
