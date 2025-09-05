"use client";
import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

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
            "How to get into Y Combinator?",
        answer:
            "The Y Combinator team seeks founders who move quickly, learn even quicker and have a vision that is scalable on a global level. To apply for Y Combinator, focus on fine-tuning your application, articulating your problem/solution, and demonstrating why your team is best positioned to solve it. Bonus points if you’ve hacked together an MVP or got a few users already.",
    },
    {
        id: "2",
        question: "How does Y Combinator work?",
        answer:
            "How YC works is: money + mentorship + momentum. At its core, Y Combinator is a startup accelerator that invests in early-stage companies, usually twice a year in what’s called a ‘Y Combinator batch’. The selected startups get seed funding, mentorship, and access to a network of founders and investors. For three intense months, founders build, iterate, and prep for the Demo Day, where they pitch top investors.",
    },
    {
        id: "3",
        question: "How to apply for Y Combinator?",
        answer:
            "To apply for Y Combinator, you need to fill out their online application form. It is as straightforward as it sounds. YC asks about your team, your idea, traction, and why you’re the right people to build this. If you stand out, you’ll be invited to an interview. Pro tip: keep it simple, clear, and bold. Y Combinator funding goes to teams who can explain big ideas in plain English.",
    },
    {
        id: "4",
        question: "How to start a startup Y Combinator?",
        answer:
            "If you’re wondering how to start a startup Y Combinator style, you need to embrace speed and focus. Start with a real problem, hack a scrappy solution, and test it with real users. Once you’ve validated that people care, apply for Y Combinator and try it out. YC has helped thousands of founders go from zero to launch, proving that momentum beats polish in the early days.",
    },
    {
        id: "5",
        question: "Where are Y Combinator companies based?",
        answer:
            "While Y Combinator companies are truly global, most start in the U.S. because YC itself is based in Silicon Valley. That said, some of the best companies from Y Combinator now come from Asia, Europe, and Africa. Post-COVID, YC has gone remote-friendly, so founders anywhere in the world can join a Y Combinator batch without relocating.",
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
