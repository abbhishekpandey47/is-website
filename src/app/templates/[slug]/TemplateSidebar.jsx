"use client";
import { motion } from "framer-motion";

const TemplateSidebar = ({ 
  educationalContent, 
  template, 
  activeSection,
  isOutlineTemplate,
  isWritingTemplate 
}) => {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="lg:w-56 sticky top-24 self-start"
    >
      <div className="bg-[#1a1f35] backdrop-blur-sm border border-[#2a2f45] rounded-xl p-5 shadow-lg max-h-[calc(100vh-140px)] overflow-y-auto">
        <h3 className="text-lg font-[quicksand] font-bold tracking-tight mb-3 text-white">Template Navigation</h3>
        <nav className="space-y-1.5">
          {/* Common educational sections */}
          {educationalContent?.whatIs && (
            <a 
              href="#what-is" 
              className={`block text-sm transition-colors font-[quicksand] font-normal py-1 ${
                activeSection === 'what-is' 
                  ? 'text-blue-400 font-[quicksand] font-semibold border-l-2 border-blue-400 pl-2 -ml-2' 
                  : 'text-gray-300 hover:text-blue-300'
              }`}
            >
              {educationalContent.whatIs.title}
            </a>
          )}
          {educationalContent?.whyUse && (
            <a 
              href="#why-use" 
              className={`block text-sm transition-colors font-[quicksand] font-normal py-1 ${
                activeSection === 'why-use' 
                  ? 'text-blue-400 font-[quicksand] font-semibold border-l-2 border-blue-400 pl-2 -ml-2' 
                  : 'text-gray-300 hover:text-blue-300'
              }`}
            >
              {educationalContent.whyUse.title}
            </a>
          )}
          {educationalContent?.templateOverview && (
            <a 
              href="#what-is-template" 
              className={`block text-sm transition-colors font-[quicksand] font-normal py-1 ${
                activeSection === 'what-is-template' 
                  ? 'text-blue-400 font-[quicksand] font-semibold border-l-2 border-blue-400 pl-2 -ml-2' 
                  : 'text-gray-300 hover:text-blue-300'
              }`}
            >
              {educationalContent.templateOverview.title}
            </a>
          )}
          
          <div className="border-t border-[#2a2f45] my-3 pt-3 space-y-1.5">
          {(isOutlineTemplate || isWritingTemplate) && (
            <>
              {template.metricsTable && (
                <a
                  href="#metrics-table"
                  className={`block text-sm transition-colors font-[quicksand] font-normal py-1 ${
                    activeSection === 'metrics-table' 
                      ? 'text-blue-400 font-[quicksand] font-semibold border-l-2 border-blue-400 pl-2 -ml-2' 
                      : 'text-gray-300 hover:text-blue-300'
                  }`}
                >
                  Strategic Overview Table
                </a>
              )}
              {template.templateOutline && template.templateOutline.map((item, index) => (
                item.section && item.showInNav !== false ? (
                  <a
                    key={index}
                    href={`#section-${index + 1}`}
                    className={`block text-sm transition-colors font-[quicksand] font-normal py-1 ${
                      activeSection === `section-${index + 1}` 
                        ? 'text-blue-400 font-[quicksand] font-semibold border-l-2 border-blue-400 pl-2 -ml-2' 
                        : 'text-gray-300 hover:text-blue-300'
                    }`}
                  >
                    {item.section}
                  </a>
                ) : null
              ))}
            </>
          )}
          {(isOutlineTemplate || isWritingTemplate) && (
            <a 
              href="#next-steps" 
              className={`block text-sm transition-colors font-[quicksand] font-normal py-1 ${
                activeSection === 'next-steps' 
                  ? 'text-blue-400 font-[quicksand] font-semibold border-l-2 border-blue-400 pl-2 -ml-2' 
                  : 'text-gray-300 hover:text-blue-300'
              }`}
            >
              Next Steps: Writing the Content
            </a>
          )}
          </div>
        </nav>
      </div>
    </motion.aside>
  );
};

export default TemplateSidebar;








