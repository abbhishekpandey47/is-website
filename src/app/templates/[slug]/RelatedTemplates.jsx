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
      <h2 className="text-4xl font-[quicksand] font-bold tracking-tight mb-8">Explore More Templates</h2>
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
              <div className="relative bg-[#1a1f35] border border-[#2a2f45] rounded-xl overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 p-6">
                <div className="absolute top-4 right-4 w-24 h-24 overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 group-hover:rotate-12 origin-top-right">
                  <Image
                    src={relatedTemplate.thumbnailImage}
                    alt={relatedTemplate.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="pr-24">
                  <div className="inline-flex items-center justify-center bg-blue-600/20 border border-[#2a2f45] rounded-full px-3 py-1 text-xs font-[quicksand] font-semibold mb-2">
                    <p className="text-blue-300">{relatedTemplate.category}</p>
                  </div>
                  <h3 className="text-lg font-[quicksand] font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors line-clamp-2">
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
