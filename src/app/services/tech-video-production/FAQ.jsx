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
      " What is a B2B video production?",
    answer:
      "Think of B2B video production as storytelling for businesses, but with a sharper suit and a tech-savvy brain. Instead of chasing viral dance trends, we focus on tech video production that speaks directly to your target audience. Whether it’s SaaS video production, explainer videos, or tech product videos, our job is to translate your complex solution into a clear, engaging visual journey that makes decision-makers say, “Yep, I need that.",
  },
  {
    id: "2",
    question: "How to make a SaaS product video?",
    answer:
      "Making a SaaS product video is like onboarding your users… but without the awkward silences and boring PDFs. First, we map out your product’s “aha” moments. Then we craft a script that explains your features, benefits, and workflows in human language, not just dev-speak. Using our tech video production agency magic, we blend motion graphics, voiceover, and storytelling so your audience not only understands your product but wants to try it right away.",
  },
  {
    id: "3",
    question: "Do I need a script before I approach a video production company?",
    answer:
      "Not necessarily, but having a script can save you from going back and forth. Our script generator tool is built exactly for this, to turn your brain dump, technical docs into a full-blown, camera-ready script. That’s the beauty of working with a B2B video production team that speaks “tech”.",
  },
  {
    id: "4",
    question: "Can I be involved in the creative process?",
    answer:
      "Absolutely. In fact, we insist on it. You know your product better than anyone, and we know how to make video tech productions that hit the right notes. From storyboard to final cut, we keep you in the loop with collaborative tools (think Frame.io, Figma boards, and live feedback sessions).",
  },
  {
    id: "5",
    question: "What makes B2B video content effective?",
    answer:
      "Effective B2B video content is like a great API it’s clean, fast, and does exactly what it’s supposed to do. The magic happens when you combine crystal-clear messaging, high-quality visuals, and a delivery style that resonates with your target audience. Our best video production company approach blends technical accuracy with storytelling flair, so your tech product videos don’t just inform, they convert.",
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
