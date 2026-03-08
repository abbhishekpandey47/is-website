"use client";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import ContactPopupButton from "./ContactPopupButton";

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
                <div className="text-black whitespace-pre-line">{answer}</div>
            </div>
        </div>
    );
};

// FAQ data
const faqData = [
    {
        id: "1",
        question: "What does your Reddit marketing service include?",
        answer:
            "Infrasity's Reddit marketing service includes subreddit research, narrative design, comment and thread seeding, and live Reddit engagement using karma-rich accounts. Everything is customised to your ICP and optimized for credibility, upvotes, and long-term discoverability.",
    },
    {
        id: "2",
        question: "How long does it take to see results?",
        answer:
            "Typically, results can be seen in 2-3 weeks. You’ll see early signals like upvotes, replies, and sentiment lift. Organic traffic, product mentions, and lead quality usually compound over 30–60 days.",
    },
    {
        id: "3",
        question: "Do you manage both organic Reddit and Reddit Ads?",
        answer:
            "Yes, Infrasity's focus is organic first, but we selectively use Reddit Ads to amplify threads that are already performing well organically.",
    },
    {
        id: "4",
        question: "Will you post from our brand account or your accounts?",
        answer:
            "We primarily engage through aged, karma-rich accounts that fit naturally into each subreddit. Brand accounts can be used later once trust and visibility are established.",
    },
    {
        id: "5",
        question: "Is Reddit marketing safe? Can accounts get banned?",
        answer:
            "When done correctly, yes. We follow subreddit-specific rules, avoid promotional footprints, and prioritize value-first participation, hence minimizing the risk and avoiding the patterns that trigger bans.",
    },
    {
        id: "6",
        question: "What do you need from us to get started?",
        answer:
            "A clear understanding of your product, ICP, competitors, and success goals. We’ll also align on positioning guardrails, use cases, and what not to say.",
    },
    {
        id: "7",
        question: "What results do you track weekly?",
        answer:
            "At Infraisty, we track upvotes, comment rankings, thread visibility, referral traffic, product mentions, sentiment, and downstream conversions, mapped back to specific subreddits and discussions.",
    },
    {
        id: "8",
        question: "How much revenue can Reddit generate?",
        answer:
            "Reddit works best as a credibility and demand-shaping channel that influences conversions across your funnel. For B2B devtool startups, it often becomes a top source of high-intent, highly qualified leads over time.",
    },
    {
        id: "9",
        question: "What is the minimum result we can expect?",
        answer:
            "Within the first month, most of our customers see consistent upvoted mentions, increased subreddit visibility, and early referral traffic. Results compound as threads begin ranking and resurfacing in LLM searches.",
    },
    {
        id: "10",
        question: "How much does Reddit marketing cost?",
        answer:
            "Pricing depends on scope, number of subreddits, and engagement intensity. Most B2B SaaS and devtool startups invest at a level comparable to that of a senior content hire or a fractional DevRel. Check out the pricing for result-driven reddit marketing services - https://www.infrasity.com/contact",
    },
];

const FAQSection = ({faqData: customFaqData, faqsData, heading = "Frequently Asked Questions", description = "Have a question that needs a human to answer? No problem."}) => {
    // Support both faqData and faqsData prop names for backwards compatibility
    const faqDataToUse = customFaqData || faqsData || faqData;
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
                        <h2 className="text-2xl md:text-4xl lg:text-5xl mb-6 font-semibold">
                            {heading}
                        </h2>

                        <p className="text-lg text-white mb-8">
                            {description}
                        </p>

                        <div className="flex flex-col items-start mt-4">
                            <div className="inline-flex items-center gap-2">
                                <ContactPopupButton
                                    buttonText="Speak to Us"
                                    width="w-52"
                                    height="h-11"
                                    textSize="text-sm"
                                    textWeight="quicksand-semibold"
                                    bgGradient="bg-[#5F64FF]"
                                    thankYouPath="/lp/reddit-marketing-agency/thankyou"
                                />
                                
                            </div>
                            
                        </div>
                    </div>


                    {/* Right column with accordion FAQs */}
                    <div className="flex justify-center">
                        <div className="w-[80%] flex flex-col gap-4">
                            {faqDataToUse.map((faq) => (
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
