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
                className={`overflow-hidden bg-gray-100 rounded-[10px] transition-all duration-300 ${isOpen ? "max-h-[450px] opacity-100 p-6" : "max-h-0 opacity-0"
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
            "What is an AI Video Script Generator?",
        answer:
            "Script generator is a tool that generates original scripts for your videos after you have added all the necessary details about your video. Our script generator can interpret extensive datasets and deliver compelling video scripts that will retain your audience and bring your vision to life. Instead of starting from a blank page, you simply provide details, such as the type of video, desired length, tone, and key prompts. The generator produces a tailored script in seconds and adapts to your needs with ease. This technology is designed for professionals across industries, marketers, educators, creators, and businesses who want to save time while producing high-quality, engaging content.",
    },
    {
        id: "2",
        question: "How to generate a script for free?",
        answer:
            "You can generate a script for free using Infrasity’s Video Script Generator, built specifically for B2B SaaS businesses. All you need to do is select your video type (e.g., feature demo, tool comparison), choose the tool or platform you want to showcase, pick your target audience (DevOps professional, Founders, SaaS marketers, etc.), set the video length, and optionally insert links. To make it even more personalized, add a short custom prompt at the end. For example: “Create a SaaS demo video script highlighting Gemini’s AI integration features for startup founders.” With just these simple steps, you’ll instantly get a professional, tailored script that will save you time scripting and focus more on crafting impactful SaaS video campaigns.",
    },
    {
        id: "3",
        question: "Are there any limitations to using the script generator?",
        answer:
            "No, using Infrasity’s free video script generator has no limitations, no sign-up required, and the outcome is infinite. You can use our script generator as youtube script generator or just a normal trial. It all depends on how you use it.",
    },
    {
        id: "4",
        question: "What is the best AI script generator?",
        answer:
            "As one of the best ai script generator free, Infrasity ensures to save your time and resources without the risk in quality. Several have used our video script generator for various purposes and we have heard only positive feedback.",
    }
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
