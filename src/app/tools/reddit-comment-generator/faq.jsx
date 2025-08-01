"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set());
  const [loading, setLoading] = useState(false); // Add loading state

  const faqs = [
    {
      id: 1,
      question: "What is a Reddit Comment Generator?",
      answer: "A Reddit Comment Generator is a free online tool that helps you quickly create human-like Reddit comments and post templates. It’s designed for marketers, brands, and community members who want to engage on Reddit authentically without spending hours writing from scratch."
    },
    {
      id: 2,
      question: "Will the generated Reddit comments get me downvoted or reported?",
      answer: "Our tool focuses on creating authentic, human-like comments that blend naturally into Reddit conversations. While no tool can guarantee zero downvotes, using relevant, non-spammy comments will help you avoid the downvote and report radar."
    },
    {
      id: 3,
      question: "Can I use this tool for brand promotion on Reddit?",
      answer: "Yes, but we strongly recommend promoting your brand strategically. Reddit users value genuine contributions, so use the generated comments to add value and avoid hard-selling to prevent bans or negative feedback."
    },
    {
      id: 4,
      question: "Are the comments unique every time?",
      answer: "Yes. Each time you generate a comment, the tool creates unique variations using different tones and structures, so your comments don’t look repetitive."
    },
    {
      id: 5,
      question: "Can I customize the comments?",
      answer: "Yes, you can edit and tweak the generated comments to match your brand voice or the context of the conversation before posting on Reddit."
    }
  ];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="bg-black text-white p-6 relative">
      <div className="max-w-4xl mx-auto relative">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-100">
          Frequently Asked Questions
        </h1>
        <div className="p-[6px] border border-white/20 rounded-xl relative">
          {/* Loader overlay */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-20 rounded-xl">
              <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-b-8 border-[#3c4199] shadow-2xl drop-shadow-lg"></div>
              <span className="mt-6 text-lg font-semibold text-[#3c4199] drop-shadow-lg">Loading...</span>
            </div>
          )}
          <div className="rounded-xl">
  {faqs.map((faq, index) => {
    const isFirst = index === 0;
    const isLast = index === faqs.length - 1;

    return (
      <div
        key={faq.id}
        className={`bg-white/10 border border-gray-700/20 overflow-hidden transition-all duration-200 ${
          isFirst ? "rounded-t-xl" : ""
        } ${isLast ? "rounded-b-xl" : ""}`}
      >
        <button
          onClick={() => toggleItem(faq.id)}
          className="w-full px-6 py-3 text-left flex items-center justify-between"
        >
          <span className="text-lg font-medium text-gray-100 pr-4">
            {faq.question}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 flex-shrink-0 ${
              openItems.has(faq.id) ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            openItems.has(faq.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gray-700/40 px-6 pb-5 pt-1">
            <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      </div>
    );
  })}
</div>
</div>

      </div>
    </div>
  );
}
