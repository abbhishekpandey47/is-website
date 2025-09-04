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
        question:
            " What does a Reddit marketing agency do?",
        answer:
            "A Reddit marketing agency helps B2B startups engage with developer communities through authentic, non-promotional content. At Infrasity, we ghostwrite Reddit comments, seed technical threads, and manage warmed accounts to drive traffic, visibility, and trust — all while staying subreddit-compliant.",
    },
    {
        id: "2",
        question: "Why hire a Reddit marketing agency instead of doing it in-house?",
        answer:
            "Reddit has strict rules, sensitive communities, and a steep learning curve. A Reddit marketing agency like Infrasity brings pre-warmed accounts, deep subreddit knowledge, and proven ghostwriting strategies that help B2B startups show up without getting banned or ignored. We do the groundwork daily — so your team doesn’t have to.",
    },
    {
        id: "3",
        question: "Is Reddit a good place for marketing?",
        answer:
            "Yes — Reddit is one of the best channels for B2B startups in DevTools, AI infrastructure, and platform engineering. Technical buyers often search for tools by asking real users in subreddits like r/devops, r/kubernetes, and r/mlops. These threads often rank on Google. With the right comment strategy and warmed accounts, Reddit can drive qualified traffic, influence decision-making, and build early-stage trust — without relying on ads or outbound.",
    },
    {
        id: "4",
        question: "How much does Reddit marketing cost?",
        answer:
            "Reddit marketing costs depend on the volume of engagement, subreddits targeted, and whether account warming or competitor analysis is included. At Infrasity, we offer flexible, usage-based plans tailored for early-stage B2B startups. 📩 Reach out to us or visit our contact page to get a custom quote.",
    },
    {
        id: "5",
        question: "How can I promote my brand on Reddit without getting banned?",
        answer:
            "To promote your B2B product on Reddit without getting banned, you need to follow subreddit rules, use aged/warmed accounts, and avoid sounding promotional. Instead of pitching directly, focus on adding value — join relevant threads, answer technical questions, and mention your product only when it naturally fits the conversation.",
    },
    {
        id: "6",
        question: "Is advertising on Reddit effective for B2B or B2C brands?",
        answer:
            " Reddit ads can work for both B2B and B2C, but they’re often better for B2C where visual, high-volume campaigns matter. For B2B startups — especially in DevTools, infrastructure, and AI — organic participation in relevant subreddits often drives better trust, visibility, and long-term traffic. Most decision-making happens in comment threads, not banner ads.",
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
