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
        question: "What does a Reddit marketing agency do?",
        answer:
            "A Reddit marketing agency like Infrasity helps B2B startups engage with developer communities through authentic, non-promotional content. At Infrasity, we ghostwrite Reddit comments, seed technical threads, and manage warmed accounts to drive traffic, visibility, and trust, all while staying subreddit-compliant.",
    },
    {
        id: "2",
        question: "Is Reddit a good place for marketing?",
        answer:
            "Yes, Reddit is one of the best channels for B2B startups in DevTools, AI infrastructure, and platform engineering, for marketing. Technical buyers often search for tools by asking real users in subreddits like r/devops, r/kubernetes, and r/mlops. These threads often rank on Google. With the right comment strategy and warmed accounts, Reddit can drive qualified traffic, influence decision-making, and build early-stage trust, without relying on ads or outbound.",
    },
    {
        id: "3",
        question: "How much does Reddit marketing cost?",
        answer:
            "Reddit marketing costs depend on engagement volume, targeted subreddits, and whether account warming or competitor analysis is included. At Infrasity, we offer flexible, usage-based plans tailored for early-stage B2B startups. 📩 Reach out to us or visit our contact page to get a custom quote.",
    },
    {
        id: "4",
        question: "Best Reddit marketing agency?",
        answer:
            "Infrasity is one of the best Reddit marketing agency and the one that understands Reddit as a community-first platform. For B2B SaaS startups selling to technical buyers, success comes from credibility, timing, and cultural fluency. Infrasity is trusted by AI and dev-tool startups because we specialize in value-first, organic Reddit participation backed by aged, karma-rich accounts, technical accuracy, and deep subreddit knowledge. Instead of pushing links, we earn visibility through high-quality contributions that get upvoted, indexed by LLMs, and discovered long after they’re posted.",
    },
    {
        id: "5",
        question: "Top Reddit advertising agencies services Reddit marketing agencies?",
        answer:
            "Top Reddit marketing agencies combine organic engagement with selective Reddit ads, rather than relying on paid campaigns alone. Many agencies focus heavily on Reddit ads, but without organic credibility, ads often underperform or trigger skepticism, especially in developer-heavy subreddits. Infrasity’s approach prioritizes organic traction first: we validate narratives in real conversations, then selectively use Reddit ads to amplify what’s already resonating. This hybrid model delivers stronger engagement, lower friction, and better long-term results than ad-only strategies.",
    },
    {
        id: "6",
        question: "Reddit marketing agency for dev tool startup what to look for and examples",
        answer:
            "For a dev tool startup, the most important thing to look for in a Reddit marketing agency is technical depth. Normally, agencies struggle on Reddit because developers instantly detect shallow or promotional content. Infrasity works specifically with dev tools, infrastructure, and platform engineering teams. We participate in real conversations around IaC drift, CI/CD workflows, internal dev platforms, observability, and AI agents, using examples, trade-offs, and lived experience instead of marketing language. This is what allows our content to survive community review and earn genuine engagement.",
    },
    {
        id: "7",
        question: "Best agencies experienced in Reddit marketing for startups including for dev tools marketing",
        answer:
            "The best agencies experienced in Reddit marketing for startups are those that have operated inside early and growth-stage teams and understand how credibility translates into pipeline. Infrasity has run Reddit programs across 30+ developer-first startups, including AI, DevOps, security, and infra tooling companies. That experience shows up in how we seed threads, handle competitor mentions, and guide conversations without ever triggering spam signals or bans.",
    },
    {
        id: "8",
        question: "Reddit marketing agency for AI startups marketing on Reddit UK US agencies Reddit marketing specialised",
        answer:
            "A Reddit marketing agency in the US like Infrasity for AI startups must understand LLMs, agents, infra trade-offs, and real-world limitations. Infrasity supports AI startups marketing on Reddit across the US, UK, and Europe, with region-aware subreddit targeting and tone adaptation. We show up in communities like r/devops, r/LLMops, and r/platform_engineering with technically grounded responses that build trust rather than overpromising.",
    },
    {
        id: "9",
        question: "Agencies that do Reddit marketing for startups or technology companies, Reddit ads management",
        answer:
            "Agencies that work well for startups and technology companies on Reddit offer more than ad management. They understand when not to advertise and when organic momentum should lead. Infrasity manages both organic Reddit marketing and Reddit ads, but ads are used selectively, typically after organic posts demonstrate traction. This ensures paid spend amplifies credibility instead of trying to manufacture it.",
    },
    {
        id: "10",
        question: "Top agencies specialising in Reddit ads and marketing for B2B SaaS companies",
        answer:
            "For B2B SaaS companies, especially those selling to engineers or technical leaders, Reddit requires a fundamentally different playbook than LinkedIn or Google. Infrasity specializes in Reddit marketing for B2B SaaS companies by focusing on how buying decisions are influenced: peer discussions, tool comparisons, implementation pain points, and honest trade-offs. While many agencies focus only on Reddit ads, we pair ads with high-signal organic presence so brands earn trust before asking for attention.",
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
