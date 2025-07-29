"use client";
import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

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
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden bg-gray-100 rounded-[10px] transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 p-6" : "max-h-0 opacity-0"
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
      " What types of videos are most effective for B2B SaaS companies?",
    answer:
      "Effective video types include product demos, explainer videos, customer testimonials, and onboarding tutorials. These formats help in clearly communicating complex technical concepts and showcasing the value of your solutions.",
  },
  {
    id: "2",
    question: "Do you provide scriptwriting and storyboarding services?",
    answer:
      "Yes, comprehensive services include scriptwriting and storyboarding to ensure the video's message is clear and effectively communicated.",
  },
  {
    id: "3",
    question: "How is Infrasity different from a content agency or freelancer?",
    answer:
      "We live and breathe infra, DevOps, and SaaS. You don’t need to explain what an SDK, CLI, or deployment pipeline is. We already get it.",
  },
  {
    id: "4",
    question: "Where can SaaS companies use explainer videos?",
    answer:
      "Explainer videos can be used on landing pages, social media platforms, email campaigns, product demos, customer onboarding processes, and sales presentations.",
  },
  {
    id: "5",
    question: "How long should an explainer video be?",
    answer:
      "Ideally, the length should be short—around 60-90 seconds—to maintain viewer engagement while delivering the key message effectively.",
  },
  {
    id: "6",
    question:
      "How can I incorporate testimonials and success stories into my explainer video?",
    answer:
      "Feature authentic customer testimonials and detailed case studies, Use storytelling to highlight real-world applications of your SaaS.",
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
            {/* 
            <a
              href="https://calendly.com/meet-shan"
              className="inline-flex items-center text-[#5F64FF] text-lg  transition-colors"
            >
              Speak to Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </a> */}
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
