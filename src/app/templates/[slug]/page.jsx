"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, use, useState } from "react";
import AppContext from "../../../context/Infracontext";
import { notFound } from "next/navigation";
import CTA from "../../../Components/CTA/CTA";
import templateIndex from "../../../../templates-data/_templateIndex";
import TemplateHero from "./TemplateHero";
import TemplateSidebar from "./TemplateSidebar";
import RelatedTemplates from "./RelatedTemplates";
import TemplateCarousel from "./TemplateCarousel";
import EmailModal from "./EmailModal";

// Dynamic template loading helper
const loadTemplateData = async (slug) => {
  try {
    const module = await import(`../../../../templates-data/${slug}.js`);
    return module.default;
  } catch (error) {
    // Template loading failed - return null to show 404
    return null;
  }
};

const TemplateDetailPage = ({ params }) => {
  const context = useContext(AppContext);
  const { setProgress } = context;
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  
  // Await params as required by Next.js 15
  const resolvedParams = use(params);

  useEffect(() => {
    // Load template data dynamically
    const fetchTemplate = async () => {
      const data = await loadTemplateData(resolvedParams.slug);
      if (data) {
        setTemplate(data);
      }
      setLoading(false);
      setProgress(100);
    };
    
    fetchTemplate();
  }, [resolvedParams.slug, setProgress]);

  // Scroll tracking for active section highlighting
  useEffect(() => {
    if (!template) return;

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Only observe specific navigation sections (not all elements with IDs)
    const sectionIds = [
      'what-is',
      'why-use',
      'what-is-template',
      'next-steps',
      'metrics-table',
      ...Array.from({ length: 20 }, (_, i) => `section-${i + 1}`)
    ];
    
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);
    
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [template]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl quicksand-regular">Loading template...</div>
      </div>
    );
  }

  if (!template) {
    notFound();
  }

  const layoutType = template.layoutType || "standard";
  const isDeveloperLayout = layoutType === "developer-outline";
  const isOutlineTemplate = template.slug === "developer-content-and-guides-outline";
  const isWritingTemplate = template.slug === "developer-content-and-guides-content";
  const educationalContent = template.educationalContent;
  const hasCustomEducationalContent = Boolean(educationalContent);

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowEmailModal(true);
    setEmail("");
    setEmailError("");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save email via API
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: email.split('@')[0],
          email: email,
          message: `Template download request: ${template.title}`
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save email');
      }
      
      // Trigger download
      const link = document.createElement('a');
      link.href = template.downloadLink;
      link.download = `${template.slug}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Close modal
      setShowEmailModal(false);
      setEmail("");
    } catch (error) {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderBulletList = (items) => (
    <ul className="space-y-2 text-[#cbd5e1] text-sm quicksand-regular mt-4">
      {items.map((bullet, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span className="text-[#6366f1] mt-1">•</span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );

  const renderDefinitionCards = (items) => (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs uppercase tracking-wide text-[#a5b4fc] quicksand-semibold">{item.label}</p>
          {item.description && (
            <p className="text-[#cbd5e1] text-sm quicksand-regular mt-2">{item.description}</p>
          )}
          {item.example && (
            <p className="text-[#a5b4fc] text-sm quicksand-regular mt-3">
              <span className="quicksand-semibold">Example:</span> {item.example}
            </p>
          )}
          {item.exampleList && (
            <ul className="mt-3 space-y-1 text-[#94a3b8] text-sm quicksand-regular">
              {item.exampleList.map((example, exIdx) => (
                <li key={exIdx} className="flex items-start gap-2">
                  <span className="text-[#6366f1] mt-1">•</span>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  const renderLabeledItems = (items) => (
    <ul className="space-y-3 text-[#cbd5e1] text-sm quicksand-regular mt-4">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span className="text-[#6366f1] mt-1">•</span>
          <span>
            <span className="font-semibold text-white quicksand-semibold">{item.label}</span>
            {item.description && <span className="text-[#94a3b8] ml-1">{item.description}</span>}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <TemplateHero template={template} onDownloadClick={handleDownloadClick} />

      {/* Template Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 text-white quicksand-bold text-center">
          {template.sampleContentImages?.length ? "Take a Look at Sample Content" : "Take a Look at Sample Outline"}
        </h2>
        <TemplateCarousel
          slides={template.sampleContentImages}
        />
      </div>

      {/* Section Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-12"></div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#0f0728]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* For Developer Content & Guides templates - Show clean content with sidebar */}
        {isDeveloperLayout ? (
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 items-start">
            {/* Sidebar */}
            <TemplateSidebar 
              educationalContent={educationalContent}
              template={template}
              activeSection={activeSection}
              isOutlineTemplate={isOutlineTemplate}
              isWritingTemplate={isWritingTemplate}
            />

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex-1"
            >
              <div className="max-w-none">
                {/* Educational Sections - Common for both templates */}
                {hasCustomEducationalContent ? (
                  <div className="space-y-12 mb-12">
                    {educationalContent?.whatIs && (
                      <div id="what-is" className="mb-10 scroll-mt-32 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-purple-500/10 p-6">
                        <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                          {educationalContent.whatIs.title}
                        </h2>
                        {educationalContent.whatIs.paragraphs?.map((paragraph, idx) => (
                          <p key={idx} className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular mb-4">
                            {paragraph}
                          </p>
                        ))}
                        {educationalContent.whatIs.highlight && (
                          <p className="text-[#a5b4fc] text-sm quicksand-semibold mb-3">
                            {educationalContent.whatIs.highlight}
                          </p>
                        )}
                        {educationalContent.whatIs.subtext && (
                          <p className="text-[#94a3b8] text-sm quicksand-regular mb-3">
                            {educationalContent.whatIs.subtext}
                          </p>
                        )}
                        {educationalContent.whatIs.bullets && (
                          <ul className="space-y-2 text-[#cbd5e1] text-sm quicksand-regular mb-4">
                            {educationalContent.whatIs.bullets.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-[#6366f1] mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {educationalContent.whatIs.audience && (
                          <>
                            <h3 className="text-white font-semibold quicksand-semibold text-base mb-2">
                              {educationalContent.whatIs.audienceLabel || "Who this is for"}
                            </h3>
                            <ul className="grid md:grid-cols-2 gap-2 text-[#94a3b8] text-sm quicksand-regular">
                              {educationalContent.whatIs.audience.map((audience, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#6366f1] mt-1">•</span>
                                  <span>{audience}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}

                    {educationalContent?.whyUse && (
                      <div id="why-use" className="mb-10 scroll-mt-32 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-purple-500/10 p-6">
                        <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                          {educationalContent.whyUse.title}
                        </h2>
                        {educationalContent.whyUse.intro && (
                          <p className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular mb-6">
                            {educationalContent.whyUse.intro}
                          </p>
                        )}
                        {educationalContent.whyUse.cards ? (
                          <div className="grid md:grid-cols-2 gap-6">
                            {educationalContent.whyUse.cards.map((card, idx) => (
                              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur">
                                <h3 className="text-white text-lg font-semibold quicksand-semibold mb-2">
                                  {card.title}
                                </h3>
                                <p className="text-[#94a3b8] text-sm leading-relaxed quicksand-regular">
                                  {card.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className="space-y-4 text-[#cbd5e1] quicksand-regular">
                            {educationalContent.whyUse.bullets?.map((reason, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-[#6366f1] mt-1">•</span>
                                <span className="text-base leading-relaxed">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {educationalContent.whyUse.audience && (
                          <div className="mt-6">
                            <h3 className="text-white font-semibold quicksand-semibold text-base mb-2">
                              {educationalContent.whyUse.audienceLabel || "Who benefits most"}
                            </h3>
                            <ul className="grid md:grid-cols-2 gap-2 text-[#94a3b8] text-sm quicksand-regular">
                              {educationalContent.whyUse.audience.map((audience, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#6366f1] mt-1">•</span>
                                  <span>{audience}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {educationalContent?.templateOverview && (
                      <div id="what-is-template" className="mb-10 scroll-mt-32 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-purple-500/10 p-6">
                        <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                          {educationalContent.templateOverview.title}
                        </h2>
                        {educationalContent.templateOverview.description && (
                          <p className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular mb-4">
                            {educationalContent.templateOverview.description}
                          </p>
                        )}
                        {educationalContent.templateOverview.sections && (
                          <div className="space-y-4 text-[#cbd5e1] text-sm quicksand-regular mb-6">
                            {educationalContent.templateOverview.sections.map((section, idx) => (
                              <div key={idx} className="border border-white/10 rounded-lg p-4 bg-white/5">
                                <h3 className="text-white font-semibold quicksand-semibold text-base mb-1">{section.title}</h3>
                                <p className="text-[#94a3b8] leading-relaxed">{section.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {educationalContent.templateOverview.audience && (
                          <>
                            <h3 className="text-white font-semibold quicksand-semibold text-base mb-2">
                              {educationalContent.templateOverview.audienceLabel || "Who this is designed for"}
                            </h3>
                            <ul className="grid md:grid-cols-2 gap-2 text-[#94a3b8] text-sm quicksand-regular">
                              {educationalContent.templateOverview.audience.map((audience, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#6366f1] mt-1">•</span>
                                  <span>{audience}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}

                    {template.sampleContentImages?.length > 0 && (
                      <div id="sample-content" className="mb-12 scroll-mt-32">
                        <h2 className="text-3xl font-bold mb-3 text-white quicksand-bold">Sample Content</h2>
                        <p className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular mb-6">
                          See real examples of how this template looks when published. Use these as visual cues for structure, color balance, and scannability.
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {template.sampleContentImages.map((img, idx) => (
                            <div key={idx} className="group relative bg-gradient-to-br from-[#1e1b4b]/70 to-[#312e81]/70 border border-purple-500/30 rounded-xl overflow-hidden shadow-lg hover:border-purple-400/60 hover:shadow-purple-500/30 transition-all duration-300">
                              <div className="relative w-full aspect-[4/3]">
                                <Image
                                  src={img.src}
                                  alt={img.alt || "Sample content preview"}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                  priority={idx === 0}
                                />
                              </div>
                              {img.alt && (
                                <div className="px-4 py-3 bg-black/40 backdrop-blur-sm border-t border-purple-500/20">
                                  <p className="text-sm text-[#cbd5e1] quicksand-regular line-clamp-2">{img.alt}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-12 mb-12">
                    {/* What is Section */}
                    <div id="what-is" className="mb-10 scroll-mt-32">
                      <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                        What is a Developer Guide & Content?
                      </h2>
                      <p className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular mb-4">
                        {template.whatIsContent || "A developer guide is a technical document that teaches a developer how to do something concrete: integrate a library, design an API, debug a problem, or choose between approaches. Good guides are task-oriented, opinionated when needed, and grounded in working code. They clarify assumptions, show trade-offs, and include copy-paste-ready examples."}
                      </p>
                      {template.whatIsContentDetailed && (
                        <ul className="space-y-2 text-[#94a3b8] text-sm quicksand-regular">
                          {template.whatIsContentDetailed.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-[#6366f1] mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* What is Template Section */}
                    <div id="what-is-template" className="mb-10 scroll-mt-32">
                      <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                        What is a Developer Guide & Content Template?
                      </h2>
                      <p className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular mb-4">
                        {template.whatIsTemplate || "It's a structured framework for planning and writing developer guides consistently. It provides section patterns, content prompts, and quality checks so the final output is clear, actionable, and technically sound."}
                      </p>
                      {template.whatIsTemplateCovers && (
                        <>
                          <p className="text-[#94a3b8] text-sm leading-relaxed quicksand-regular mb-3">What the template standardizes:</p>
                          <ul className="space-y-2 text-[#cbd5e1] quicksand-regular">
                            {template.whatIsTemplateCovers.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-[#6366f1] mt-1">•</span>
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    {/* Why Use Section */}
                    <div id="why-use" className="mb-10 scroll-mt-32">
                      <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                        Why Use a Developer Guide & Content Template?
                      </h2>
                      {template.whyUseTemplate && (
                        <ul className="space-y-4 text-[#cbd5e1] quicksand-regular">
                          {template.whyUseTemplate.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-[#6366f1] mt-1">•</span>
                              <span className="text-base leading-relaxed">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* How to Use Section */}
                    <div id="how-to-use" className="mb-10 scroll-mt-32">
                      <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                        How to Use This Developer Guide & Content Template
                      </h2>
                      <div className="space-y-5">
                        {template.howToUse && template.howToUse.map((step, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center">
                              <span className="text-white font-bold quicksand-bold text-sm">{idx + 1}</span>
                            </div>
                            <div>
                              <h4 className="text-base font-bold text-white quicksand-bold mb-1">{step.step}</h4>
                              <p className="text-[#94a3b8] text-sm quicksand-regular leading-relaxed">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Template Content - Outline & Writing templates */}
                {(isOutlineTemplate || isWritingTemplate) ? (
                  <>
                    {/* Metrics Table - Only for outline template */}
                    {isOutlineTemplate && template.metricsTable && (
                      <div id="metrics-table" className="mb-12 scroll-mt-32">
                        <h2 className="text-2xl font-bold mb-6 text-[#a5b4fc] quicksand-bold">Suggested Outline</h2>
                        <div className="overflow-x-auto bg-[#1e293b] border border-[#334155] rounded-xl">
                          <table className="w-full">
                            <tbody>
                              {template.metricsTable.map((row, index) => (
                            <tr key={index} className={index !== template.metricsTable.length - 1 ? "border-b border-[#334155]" : ""}>
                              <td className="py-3 px-4 text-[#94a3b8] font-medium quicksand-medium text-sm whitespace-nowrap">
                                {row.label}
                              </td>
                              <td className="py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">
                                {row.value}
                              </td>
                            </tr>
                          ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                {/* Template Outline - Structured format */}
                {template.templateOutline && template.templateOutline.map((item, index) => {
                  const isObject = typeof item === "object";
                  return (
                    <div
                      key={index}
                      id={`section-${index + 1}`}
                      className="mb-10 scroll-mt-32 rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-sm shadow-xl shadow-purple-500/10 p-6"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white flex items-center justify-center quicksand-bold text-sm border border-white/20">
                          {index + 1}
                        </div>
                        <h2 className="text-2xl font-bold text-white quicksand-bold leading-snug">
                          {item.section || item}
                        </h2>
                      </div>
                      {isObject && (
                        <div className="space-y-4">
                          {item.description && (
                            <p className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular">
                              {item.description}
                            </p>
                          )}
                          {item.paragraphs && item.paragraphs.map((paragraph, paraIdx) => (
                            <p key={paraIdx} className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular">
                              {paragraph}
                            </p>
                          ))}
                          {item.definitionItems && renderDefinitionCards(item.definitionItems)}
                          {item.labeledItems && renderLabeledItems(item.labeledItems)}
                          {item.bulletItems && renderBulletList(item.bulletItems)}
                          {item.note && (
                            <p className="text-[#94a3b8] text-sm quicksand-regular">{item.note}</p>
                          )}
                          {item.example && (
                            <p className="text-[#94a3b8] text-sm leading-relaxed quicksand-light pl-4 border-l-2 border-[#6366f1]">
                              <span className="text-[#a5b4fc] quicksand-semibold">Example:</span> {item.example}
                            </p>
                          )}
                          {item.subsections && item.subsections.map((subsection, subIndex) => (
                            <div key={subIndex} className="mt-6 p-5 rounded-lg border border-purple-500/20 bg-[#0f1729]/30 space-y-4">
                              {subsection.title && (
                                <h3 className="text-xl font-semibold text-white quicksand-semibold mb-1">
                                  {subsection.title}
                                </h3>
                              )}
                              {subsection.description && (
                                <p className="text-[#cbd5e1] text-base quicksand-regular">
                                  {subsection.description}
                                </p>
                              )}
                              {subsection.intro && (
                                <p className="text-[#cbd5e1] text-sm quicksand-regular">
                                  {subsection.intro}
                                </p>
                              )}
                              {subsection.paragraphs && subsection.paragraphs.map((paragraph, subParaIdx) => (
                                <p key={subParaIdx} className="text-[#cbd5e1] text-sm quicksand-regular">
                                  {paragraph}
                                </p>
                              ))}
                              {subsection.definitionItems && renderDefinitionCards(subsection.definitionItems)}
                              {subsection.labeledItems && renderLabeledItems(subsection.labeledItems)}
                              {subsection.bulletItems && renderBulletList(subsection.bulletItems)}
                              {subsection.note && (
                                <p className="text-[#94a3b8] text-sm quicksand-regular">{subsection.note}</p>
                              )}
                              {subsection.closingNote && (
                                <p className="text-[#a5b4fc] text-sm quicksand-semibold">{subsection.closingNote}</p>
                              )}
                              {/* Nested subsections */}
                              {subsection.subsections && subsection.subsections.map((nestedSub, nestedIdx) => (
                                <div key={nestedIdx} className="mt-5 pl-5 border-l-2 border-purple-500/40 space-y-3">
                                  {nestedSub.title && (
                                    <h4 className="text-lg font-semibold text-white quicksand-semibold">
                                      {nestedSub.title}
                                    </h4>
                                  )}
                                  {nestedSub.paragraphs && nestedSub.paragraphs.map((para, pIdx) => (
                                    <p key={pIdx} className="text-[#cbd5e1] text-sm quicksand-regular">
                                      {para}
                                    </p>
                                  ))}
                                  {nestedSub.bulletItems && renderBulletList(nestedSub.bulletItems)}
                                  {nestedSub.note && (
                                    <p className="text-[#94a3b8] text-xs quicksand-regular italic">{nestedSub.note}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Next Steps Section - placed after key takeaway (outline only) */}
                {isOutlineTemplate && (
                  <div id="next-steps" className="scroll-mt-32">
                    <h2 className="text-3xl font-bold mb-4 text-white quicksand-bold">
                      Next Steps: Writing the Content
                    </h2>
                    <p className="text-[#cbd5e1] text-base leading-relaxed quicksand-regular mb-6">
                      Once your outline is ready, it's time to bring it to life with well-crafted content. Use our comprehensive writing template to transform your outline into engaging, technically accurate developer content.
                    </p>
                    <Link
                      href="/templates/developer-content-and-guides-content"
                      className="group block"
                    >
                      <div className="relative bg-gradient-to-br from-[#1e1b4b]/80 to-[#312e81]/80 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 hover:border-purple-400/60 transition-all duration-300 p-6">
                        <div className="flex items-center gap-6">
                          <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg shadow-lg border border-purple-500/20">
                            <Image
                              src="/template-thumbnails/developer-content.png"
                              alt="Developer Content Writing Template"
                              width={96}
                              height={96}
                              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="inline-flex items-center justify-center bg-purple-600/20 border border-purple-500/30 rounded-full px-3 py-1 text-[10px] quicksand-semibold mb-2">
                              <p className="text-purple-300">Developer Content & Guides</p>
                            </div>
                            <h3 className="text-xl font-bold quicksand-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                              Developer Content Writing Template
                            </h3>
                            <p className="text-[#94a3b8] text-sm quicksand-regular leading-relaxed">
                              Complete writing guidelines, examples, and best practices for creating developer guides that engage and convert.
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
                              <svg className="w-5 h-5 text-purple-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </motion.div>
      </div>
    ) : (
          // Original template layout for other templates
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
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

            {/* CTA Section */}
            <div className="pt-8 border-t border-purple-500/20">
              <CTA 
                title={<>Ready to create {" "}<span className="bg-clip-text text-transparent" style={{backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"}}>exceptional content</span>{" "}with expert guidance?</>}
                description="Let's discuss how Infrasity can help you implement this template and scale your content strategy."
                buttonText="Book a Consultation"
              />
            </div>
          </div>

        {/* Template Outline Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 quicksand-bold">Template Outline</h2>
          <div className="space-y-6">
            {template.templateOutline && template.templateOutline.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1e1b4b]/60 to-[#312e81]/60 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 shadow-lg scroll-mt-32"
              >
                <h3 className="text-xl font-bold mb-3 text-blue-400 quicksand-bold">
                  {index + 1}. {item.section}
                </h3>
                <p className="text-gray-300 mb-3 quicksand-light">{item.description}</p>
                {item.example && (
                  <div className="bg-gradient-to-r from-[#312e81]/40 to-[#1e1b4b]/40 rounded-lg p-4 border-l-4 border-purple-400">
                    <p className="text-gray-400 text-sm italic quicksand-light">
                      {item.example}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <section className="max-w-6xl mx-auto px-4 md:px-0">
            <div className="mx-0 sm:mx-6 md:mx-16 bg-gradient-to-r from-blue-800 to-purple-800 relative flex flex-col items-center rounded-xl p-8 sm:p-12 md:p-16 text-center overflow-hidden bg-cover bg-no-repeat">
              {/* Title */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white max-w-xl z-10 quicksand-bold">
                Need help <span className="text-white">implementing this template?</span>
              </h2>
              
              {/* Description */}
              <p className="text-base text-gray-100 max-w-2xl mt-4 z-10 quicksand-regular">
                Our content marketing experts can help you customize and implement this template for your specific needs.
              </p>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="mt-6 md:mt-8 inline-flex items-center text-base md:text-lg rounded-full bg-black px-8 sm:px-10 md:px-14 py-3 sm:py-4 md:py-5 text-white font-medium hover:bg-gray-900 transition z-10 quicksand-semibold"
              >
                Book a Consultation
              </Link>

              {/* Background Decorative Image 1 */}
              <div className="absolute -bottom-5 sm:-bottom-8 md:-bottom-10 left-0 sm:left-1">
                <Image
                  src="https://cdn.prod.website-files.com/65030bfd09557ada51fe30e2/6509ed92ac966ebcf5de4dea_Mask%20group%20(13).webp"
                  alt="decor"
                  width={180}
                  height={180}
                  className="w-20 sm:w-32 md:w-40 h-auto opacity-50 sm:opacity-75 md:opacity-100"
                />
              </div>

              {/* Background Decorative Image 2 */}
              <div className="absolute -top-5 sm:-top-8 md:-top-10 right-0">
                <Image
                  src="https://cdn.prod.website-files.com/65030bfd09557ada51fe30e2/6509ed92c684d5f4210dbe47_Mask%20group%20(14).webp"
                  alt="decor"
                  width={180}
                  height={180}
                  className="w-20 sm:w-32 md:w-40 h-auto opacity-50 sm:opacity-75 md:opacity-100"
                />
              </div>
            </div>
          </section>
        </motion.div>

        {/* Related Templates */}
        <RelatedTemplates templateIndex={templateIndex} currentTemplateId={template.id} />
      </div>
      </div>

      {/* Email Verification Modal */}
      <EmailModal 
        show={showEmailModal}
        email={email}
        emailError={emailError}
        isSubmitting={isSubmitting}
        onClose={() => {
          setShowEmailModal(false);
          setEmail("");
          setEmailError("");
        }}
        onEmailChange={(e) => {
          setEmail(e.target.value);
          setEmailError("");
        }}
        onSubmit={handleEmailSubmit}
      />
    </div>
  );
};

export default TemplateDetailPage;
