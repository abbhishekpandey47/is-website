"use client";
import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import CalendarBooking from "@/app/calendarButton";

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
      " How can early-stage startups outsource developer documentation and DevTool content without hiring a full DevRel team?",
    answer:
      "Hiring takes months. With Infrasity, you get product-ready documentation from day one — without the overhead of salaries, onboarding, or dev time spent writing.",
  },
  {
    id: "2",
    question: "Can Infrasity help us launch product docs faster",
    answer:
      "Absolutely. We’ve helped dozens of DevTool startups launch docs in under two weeks — from API references to full onboarding guides, ready for users and demos",
  },
  {
    id: "3",
    question: "How is Infrasity different from a content agency or freelancer?",
    answer:
      "We live and breathe infra, DevOps, and SaaS. You don’t need to explain what an SDK, CLI, or deployment pipeline is. We already get it.",
  },
  {
    id: "4",
    question: "Will this actually move the GTM needle",
    answer:
      "Yes. Clear docs = faster onboarding = shorter time-to-value = more product adoption. It’s your silent GTM engine.",
  },
  {
    id: "5",
    question: "What type of content should we start with",
    answer:
      "Launch with what converts: onboarding guides, API references, how-to tutorials, and real use-case walkthroughs.",
  },
  {
    id: "6",
    question: "What technical content should a DevTool startup prioritize?",
    answer:
      "Start with developer docs, onboarding guides, and real-world tutorials. These are the assets that reduce friction, explain your product clearly, and help users integrate fast.",
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
              <CalendarBooking Design="faq" buttonText="Speak to Us" />
              <ArrowRight className="ml-2 mt-2 h-4 w-4" />
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
