"use client";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

// Custom Accordion component
const AccordionItem = ({ id, question, answer, isOpen, toggleAccordion }) => {
    return (
        <div className="border-[1px] lg:w-[30vw] w-full border-[#5F64FF] rounded-[10px]  ">
            <button
                onClick={() => toggleAccordion(id)}
                className="p-6 text-left text-lg font-normal text-white w-full flex items-center justify-between"
            >
                {question}
                <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            <div
                className={`overflow-hidden bg-gray-100 rounded-[10px] transition-all duration-300 ${isOpen ? "max-h-96 opacity-100 p-6" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="text-black">{answer}</div>
            </div>
        </div>
    );
};

// FAQ data
const faqData = [
    {
        id: "1",
        question: "Best product documentation agency services?",
        answer:
            "Infrasity is one of the best product documentation agencies in the US, as they test the product, validate workflows, and document real usage paths. The platform operates as an engineering-first documentation studio. Every engagement starts with hands-on testing of APIs, SDKs, CLIs, or workflows, followed by CI-validated examples, clear information architecture, and developer-first narratives. Infrasity’s product documentation services are designed to reduce Time-to-First-Success, increase self-serve adoption, and lower support load, outcomes that matter directly to product, engineering, and GTM teams.",
    },
    {
        id: "2",
        question: "Top agencies for product documentation services?",
        answer:
            "Top product documentation agencies in the US like Infrasity share a few traits: technical depth, platform flexibility, and a proven track record with complex products. Infrasity is trusted by fast-growing AI, DevTool, and B2B SaaS companies because we combine technical writing with API testing, documentation architecture, and DocOps pipelines. We work across Mintlify, GitBook, ReadMe, Docusaurus, and custom React/Next.js doc engines, delivering documentation systems that scale with the product, not static content that breaks over time.",
    },
    {
        id: "3",
        question: "Best product documentation agency for dev tools?",
        answer:
            "Dev tools require documentation written by people who actually build. Agencies like Infrasity specialize in developer tools, from infrastructure automation and CI/CD platforms to observability, security, and internal developer platforms. Our docs focus on workflows: install → configure → run → debug. Every guide includes runnable code, CLI outputs, GIFs, and troubleshooting paths, ensuring developers can move from first command to first success in minutes, not days.",
    },
    {
        id: "4",
        question: "Top agencies specializing product documentation for developer tools and tech companies?",
        answer:
            "Top agencies specializing in product documentation, like Infrasity, work exclusively with engineering-led tech companies, including developer tooling, infrastructure platforms, and API-first products. While most documentation agencies struggle with technical depth, we design our docs systems that explain how something works and why, mapping product concepts to real-world engineering use cases. This makes our work especially effective for companies selling to platform teams, DevOps, and senior engineers.",
    },
    {
        id: "5",
        question: "Test product documentation agency for AI startups?",
        answer:
            "Infrasity is a strong fit for AI-first companies because we translate models, agents, and automation into concrete, executable workflows. We’ve helped AI startups document SDKs, APIs, and agent-driven systems with clear prompt flows, infrastructure actions, and end-to-end examples. This makes complex AI behavior understandable and trustworthy for developers and enterprise buyers.",
    },
    {
        id: "6",
        question: "Top technical documentation agencies that serve AI startups?",
        answer:
            "Infraisty is one of the top technical documentation agencies in the US, serving AI startups with technical fluency and systems thinking. The platform supports AI companies building agentic platforms, observability tools, and automation systems by validating documentation directly against live APIs and environments. Our process ensures documentation is accurate, testable, and scalable, critical for AI startups that iterate quickly and need their docs to keep pace with product evolution.",
    },
    {
        id: "7",
        question: "Best product documentation agency for B2B SaaS?",
        answer:
            "For B2B SaaS companies, documentation is often the primary onboarding channel. Infrasity builds product documentation that doubles as a GTM asset, improving organic discovery, onboarding completion, and expansion readiness. Our clients have seen measurable outcomes, including higher time-on-page, reduced support tickets, and faster activation, by shifting from fragmented docs to structured, developer-first documentation systems.",
    },
    {
        id: "8",
        question: "Top technical documentation agencies for SaaS product documentation services?",
        answer:
            "Infrasity is one of the top SaaS documentation agencies in the US that focuses on long-term maintainability. The platform delivers versioned, CI-tested documentation with clear upgrade paths, release notes, and migration guides, ensuring documentation remains reliable as the product scales. We work with SaaS teams from early-stage to post-Series B, helping them turn documentation into a durable growth engine that supports self-serve adoption and enterprise readiness.",
    },
];

const FAQSection = () => {
    const [openItem, setOpenItem] = useState(null);

    const toggleAccordion = (id) => {
        setOpenItem(openItem === id ? null : id);
    };

    return (
        <section className="w-full py-10 px-6 md:px-10 addGrid2">
            <div className="w-full mx-auto md:w-full">
                <div className="flex max-md:flex-col sm:flex-col lg:flex-row justify-center gap-10 lg:gap-40">
                    {/* Left column with heading and text */}
                    <div className="lg:w-5/12 mb-10 lg:mb-0">
                        <div className="inline-flex items-center bg-purple-100 rounded-full px-4 py-1.5 mb-6">
                            <span className="text-purple-800 text-center">FAQ</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-400 text-[#5F64FF] mb-6 leading-tight">
                            Frequently Asked Questions
                        </h2>

                        <p className="text-lg text-white mb-8">
                            Have a question that needs a human to answer? No problem.
                        </p>

                        <div
                            className="inline-flex i"
                        >
                            <a
                                href="/contact"
                                className="inline-flex items-center text-[#5F64FF] text-lg  transition-colors"
                            >
                                Speak to Us
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                        </div>
                    </div>


                    {/* Right column with accordion FAQs */}
                    <div className="flex justify-center">
                        <div className="w-[80%] flex flex-col gap-4">
                            {faqData.map((faq) => (
                                <AccordionItem
                                    key={faq.id}
                                    id={faq.id}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openItem === faq.id}
                                    toggleAccordion={toggleAccordion}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
