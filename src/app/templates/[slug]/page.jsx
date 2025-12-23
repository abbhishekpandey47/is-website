"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, use } from "react";
import AppContext from "../../../context/Infracontext";
import templateMetadata from "../../../../templates-data/_templateMetadata";
import { notFound } from "next/navigation";

const TemplateDetailPage = ({ params }) => {
  const context = useContext(AppContext);
  const { setProgress } = context;
  
  // Await params as required by Next.js 15
  const resolvedParams = use(params);
  const template = templateMetadata.find((t) => t.slug === resolvedParams.slug);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* For Developer Content & Guides templates - Show clean content with sidebar */}
        {(template.slug === "developer-content-and-guides-outline" || template.slug === "developer-content-and-guides-content") ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Table of Contents */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:w-64 flex-shrink-0"
            >
              <div className="sticky top-24 bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 quicksand-bold text-white">Content</h3>
                <nav className="space-y-2">
                  {template.slug === "developer-content-and-guides-content" ? (
                    // Content template TOC
                    <>
                      <a href="#section-1" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">1. TL;DR</a>
                      <a href="#section-2" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">2. How AI Is Changing Documentation</a>
                      <a href="#section-3" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">3. Fern: API Documentation & SDKs</a>
                      <a href="#section-4" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">4. Apidog: Unified API Workspace</a>
                      <a href="#section-5" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">5. Swimm: Code-Coupled Docs</a>
                      <a href="#section-6" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">6. Guidde: Video Documentation</a>
                      <a href="#section-7" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">7. Eraser: AI Diagrams</a>
                      <a href="#section-8" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">8. Setup & Pricing</a>
                      <a href="#section-9" className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1">9. Conclusion</a>
                    </>
                  ) : (
                    // Outline template TOC
                    <>
                      {template.metricsTable && (
                        <a
                          href="#metrics-table"
                          className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1"
                        >
                          Strategic Overview Table
                        </a>
                      )}
                      {template.templateOutline && template.templateOutline.map((item, index) => (
                        <a
                          key={index}
                          href={`#section-${index + 1}`}
                          className="block text-sm text-[#94a3b8] hover:text-[#a5b4fc] transition-colors quicksand-regular py-1"
                        >
                          {typeof item === 'object' ? item.section : item}
                        </a>
                      ))}
                    </>
                  )}
                </nav>
              </div>
            </motion.aside>

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex-1"
            >
              <div className="max-w-none">
                {/* Content Template - Full article format */}
                {template.slug === "developer-content-and-guides-content" ? (
                  <div className="space-y-8">
                    {/* TL;DR Section */}
                    <div id="section-1">
                      <h2 className="text-3xl font-bold mb-6 text-white quicksand-bold">TL;DR</h2>
                      <p className="text-[#cbd5e1] quicksand-regular leading-relaxed mb-4">Here is the quick summary before we go deeper.</p>
                      <div className="space-y-4">
                        <ul className="space-y-3 text-[#cbd5e1] quicksand-regular">
                          <li className="mb-3">
                            <strong className="quicksand-semibold text-white">Fern – For API first teams that need SDKs and clean docs</strong><br/>
                            <span className="text-sm">Cohere uses Fern to generate SDKs in multiple languages from a single OpenAPI spec. If you expose a public REST API and want Node, Python, Go and Java SDKs generated and kept in sync with your docs, Fern removes most of the manual work.</span>
                          </li>
                          <li className="mb-3">
                            <strong className="quicksand-semibold text-white">Apidog – For teams that want one place for design, mocks, tests, and docs</strong><br/>
                            <span className="text-sm">Nestlé's innovation team used to juggle Postman, Swagger, mock servers and separate documentation. After moving to Apidog, they design the API once and get mocking, testing and docs in the same workspace.</span>
                          </li>
                          <li className="mb-3">
                            <strong className="quicksand-semibold text-white">Swimm – For large or growing codebases where docs keep going out of date</strong><br/>
                            <span className="text-sm">Riskfuel cut onboarding time by more than half after coupling documentation directly to the codebase with Swimm. Recursion has over a thousand repositories and uses Swimm to make sure docs are flagged when code changes.</span>
                          </li>
                          <li className="mb-3">
                            <strong className="quicksand-semibold text-white">Guidde – For teams that explain the same process on calls again and again</strong><br/>
                            <span className="text-sm">SentinelOne uses Guidde to turn internal workflows into reusable video guides instead of writing long how-to documents. It is faster than writing long text guides and helps support teams move much quicker.</span>
                          </li>
                        </ul>
                      </div>
                      <p className="text-[#cbd5e1] quicksand-regular leading-relaxed mb-6">
                        Before talking about trends, it helps to look at what is actually happening inside engineering teams. When Recursion's engineering org scaled past 200 developers, their documentation began falling behind the code. New endpoints shipped, internal logic changed, and dozens of microservices evolved independently.
                      </p>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-bold text-white quicksand-bold mb-2">What Is Docs-as-Code and Why Is Everyone Using It Now?</h3>
                          <p className="text-[#cbd5e1] text-sm quicksand-regular leading-relaxed">Teams no longer keep documentation in scattered wikis. They maintain docs like code: stored in the repository, updated through pull requests, reviewed alongside logic changes, and generated automatically during CI. This prevents documentation drift.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white quicksand-bold mb-2">Why SaaS Teams Now Auto-Generate SDKs</h3>
                          <p className="text-[#cbd5e1] text-sm quicksand-regular leading-relaxed">AI systems read the API schema and generate idiomatic SDKs that stay in sync with the documentation. When the schema changes, SDKs update automatically. This improves the developer journey because customers no longer guess request formats — the SDK always matches the API.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white quicksand-bold mb-2">Why Video SOPs Now Replace Long Text Guides</h3>
                          <p className="text-[#cbd5e1] text-sm quicksand-regular leading-relaxed">AI tools now record your workflow and convert it into a narrated video, step-by-step instructions, searchable captions, and multilingual variants. Support teams prefer this because it's faster to watch, nothing gets lost in long paragraphs, and repetitive explanations disappear.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white quicksand-bold mb-2">Why Engineering Teams Now Prefer Diagrams Over Long Text Blocks</h3>
                          <p className="text-[#cbd5e1] text-sm quicksand-regular leading-relaxed">Architecture diagrams, sequence flows and dependency maps help engineers understand system behaviour instantly. With AI tools, teams describe the flow in natural language or paste a snippet of code, and the tool generates a clean diagram.</p>
                        </div>
                      </div>
                    </div>

                    {/* Tool Deep Dives */}
                    <div id="section-7">
                      <h2 className="text-3xl font-bold mb-6 text-white quicksand-bold">Tool Deep Dives</h2>
                      <div className="space-y-6">
                        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-5">
                          <h3 className="text-lg font-bold text-[#1e3a8a] quicksand-bold mb-2">Fern Analysis</h3>
                          <p className="text-[#1e3a8a] text-sm quicksand-regular leading-relaxed">When Cohere expanded their LLM API, their team hit a bottleneck. Every new endpoint required fresh docs, updated examples, and SDK changes across Python, Node, Go and Java. This is where teams adopt Fern. It automatically generates SDKs and keeps documentation synced with your API specification.</p>
                        </div>
                        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-5">
                          <h3 className="text-lg font-bold text-[#1e3a8a] quicksand-bold mb-2">Apidog Analysis</h3>
                          <p className="text-[#1e3a8a] text-sm quicksand-regular leading-relaxed">When Nestlé's innovation team built internal AI services, their biggest slowdown came from switching tools. They designed APIs in one app, tested them in Postman, mocked them somewhere else. Apidog solves this by keeping the entire API lifecycle inside one workspace.</p>
                        </div>
                        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-5">
                          <h3 className="text-lg font-bold text-[#1e3a8a] quicksand-bold mb-2">Swimm Analysis</h3>
                          <p className="text-[#1e3a8a] text-sm quicksand-regular leading-relaxed">When Riskfuel scaled their AI models, their biggest issue was not the code but the internal documentation that kept falling behind. That is where teams adopt Swimm. It couples documentation directly to the codebase and flags docs when code changes.</p>
                        </div>
                        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-5">
                          <h3 className="text-lg font-bold text-[#1e3a8a] quicksand-bold mb-2">Guidde Analysis</h3>
                          <p className="text-[#1e3a8a] text-sm quicksand-regular leading-relaxed">When SentinelOne expanded its support operations, it noticed a repeated pattern. New agents kept asking the same questions. Teams adopt Guidde to turn workflows into clean video guides that teams can share instantly.</p>
                        </div>
                        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-5">
                          <h3 className="text-lg font-bold text-[#1e3a8a] quicksand-bold mb-2">Eraser Analysis</h3>
                          <p className="text-[#1e3a8a] text-sm quicksand-regular leading-relaxed">Mathspace ran into a familiar problem when scaling its engineering team. Their system diagrams lived in old slides and outdated design boards. Eraser generates architecture diagrams from text and keeps them versioned with the repository.</p>
                        </div>
                      </div>
                    </div>

                    {/* Setup & Pricing */}
                    <div id="section-8">
                      <h2 className="text-3xl font-bold mb-6 text-white quicksand-bold">Setup, Pricing & Final Verdict</h2>
                      <div className="bg-[#1e293b] border border-[#334155] rounded-xl overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-[#334155]">
                            <tr>
                              <th className="text-left py-3 px-4 text-sm font-bold text-white quicksand-bold">Tool</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-white quicksand-bold">Deployment</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-white quicksand-bold">Unique Advantage</th>
                              <th className="text-left py-3 px-4 text-sm font-bold text-white quicksand-bold">Pricing</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { tool: 'Fern', deploy: 'CI/CD Native', advantage: 'Generates SDKs + Docs', price: 'Free Tier / usage-based' },
                              { tool: 'Apidog', deploy: 'Cloud / Desktop', advantage: 'All-in-One (Design + Test)', price: 'Free Tier / Per Seat' },
                              { tool: 'Swimm', deploy: 'IDE Plugin / Web', advantage: 'Code-Coupled (Anti-rot)', price: 'Free Tier / Enterprise' },
                              { tool: 'Guidde', deploy: 'Browser Ext.', advantage: 'Video-First Automation', price: 'Free Tier / $20+ mo' },
                              { tool: 'Eraser', deploy: 'Web / Canvas', advantage: 'Diagram-as-Code', price: 'Free Tier / Team Plan' }
                            ].map((row, idx) => (
                              <tr key={idx} className={idx !== 4 ? "border-b border-[#334155]" : ""}>
                                <td className="py-3 px-4 text-[#a5b4fc] font-semibold quicksand-semibold text-sm">{row.tool}</td>
                                <td className="py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">{row.deploy}</td>
                                <td className="py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">{row.advantage}</td>
                                <td className="py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">{row.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Final Recommendations */}
                    <div id="section-9">
                      <h2 className="text-3xl font-bold mb-6 text-white quicksand-bold">Final Recommendations</h2>
                      <div className="space-y-4">
                        {[
                          { condition: 'If you are API-First', tool: 'Choose Fern', reason: 'The ability to hand customers a pre-built SDK is a massive competitive advantage in 2025.' },
                          { condition: 'If you want "One Tool to Rule Them All"', tool: 'Choose Apidog', reason: 'It consolidates your entire engineering workflow.' },
                          { condition: 'If you need to prevent Code Rot', tool: 'Choose Swimm', reason: 'It ensures your docs technically survive a fast-moving codebase.' },
                          { condition: 'If you need Internal Training', tool: 'Choose Guidde', reason: "It's faster and more engaging than writing long SOPs." },
                          { condition: 'If you need Architecture Diagrams', tool: 'Choose Eraser', reason: 'It is the fastest way to turn technical concepts into professional visuals.' }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-[#1e293b] border border-[#334155] rounded-lg p-5">
                            <p className="text-[#cbd5e1] quicksand-regular leading-relaxed">
                              <strong className="quicksand-bold text-white">{item.condition}:</strong> {item.tool}. {item.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Outline Template - Show structured sections
                  <>
                {/* Metrics Table - Only for outline template */}
                {template.slug === "developer-content-and-guides-outline" && template.metricsTable && (
                  <div id="metrics-table" className="mb-12">
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

                {/* Data Table */}
                <div className="mb-12">
                  <div className="overflow-x-auto bg-[#1e293b] border border-[#334155] rounded-xl">
                    <table className="w-full">
                      <thead className="bg-[#334155] border-b border-[#334155]">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-medium text-white quicksand-medium">Page</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q1 Views</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q2 Views</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q3 Views</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q1 Clicks</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q2 Impressions</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Q3 Change</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-white quicksand-medium">Action Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#334155]">
                          <td className="py-3 px-4 text-[#60a5fa] quicksand-regular text-sm">sample_page_1</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">75,417</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">14,820</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">4,658</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">35.93%</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">102,351</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">13.53%</td>
                          <td className="text-right py-3 px-4"><span className="text-xs px-2 py-1 rounded text-green-400 bg-green-400/10">Improved Clicks</span></td>
                        </tr>
                        <tr className="border-b border-[#334155]">
                          <td className="py-3 px-4 text-[#60a5fa] quicksand-regular text-sm">sample_page_2</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">8,192</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">3,843</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">5,523</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">-38.25%</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">176,935</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">8.08%</td>
                          <td className="text-right py-3 px-4"><span className="text-xs px-2 py-1 rounded text-orange-400 bg-orange-400/10">Lower Clicks</span></td>
                        </tr>
                        <tr className="border-b border-[#334155]">
                          <td className="py-3 px-4 text-[#60a5fa] quicksand-regular text-sm">sample_page_3</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">4,340</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">4,135</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">823</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">-25.32%</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">58,148</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">2.77%</td>
                          <td className="text-right py-3 px-4"><span className="text-xs px-2 py-1 rounded text-orange-400 bg-orange-400/10">Lower Clicks</span></td>
                        </tr>
                        <tr className="border-b border-[#334155]">
                          <td className="py-3 px-4 text-[#60a5fa] quicksand-regular text-sm">sample_page_4</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">1,004</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">937</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">47</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">-75%</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">38,182</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">8.248</td>
                          <td className="text-right py-3 px-4"><span className="text-xs px-2 py-1 rounded text-red-400 bg-red-400/10">-30.81%</span></td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-[#60a5fa] quicksand-regular text-sm">sample_page_5</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">857</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">838</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">203</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">-28.8%</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">27,098</td>
                          <td className="text-right py-3 px-4 text-[#e2e8f0] quicksand-regular text-sm">10.863</td>
                          <td className="text-right py-3 px-4"><span className="text-xs px-2 py-1 rounded text-green-400 bg-green-400/10">2.747%</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Template Outline - Plain text format */}
                {template.templateOutline && template.templateOutline.map((item, index) => (
                  <div key={index} id={`section-${index + 1}`} className="mb-10">
                    <h2 className="text-2xl font-bold mb-3 text-white quicksand-bold">
                      {item.section || item}
                    </h2>
                    {typeof item === 'object' && (
                      <>
                        <p className="text-[#cbd5e1] text-base leading-relaxed mb-3 quicksand-regular">
                          {item.description}
                        </p>
                        {item.example && (
                          <p className="text-[#94a3b8] text-sm leading-relaxed quicksand-light pl-4 border-l-2 border-[#6366f1]">
                            <span className="text-[#a5b4fc] quicksand-semibold">Example:</span> {item.example}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))}
                  </>
                )}
              </div>

              {/* Download CTA */}
              <div className="mt-12 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-3 quicksand-bold text-white">
                  Ready to Use This Template?
                </h3>
                <p className="text-white/90 mb-6 quicksand-light">
                  Download and start creating exceptional developer content
                </p>
                <a
                  href={template.downloadLink}
                  className="inline-flex items-center gap-2 bg-white text-[#1e293b] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors quicksand-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Template
                </a>
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

        {/* Template Outline Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 quicksand-bold">Template Outline</h2>
          <div className="space-y-6">
            {template.templateOutline && template.templateOutline.map((item, index) => (
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
        </div>
          </motion.div>
        )}

        {/* CTA Section - Show for all templates */}
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
