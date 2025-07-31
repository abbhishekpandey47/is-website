"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set());
  const [loading, setLoading] = useState(false); // Add loading state

  const faqs = [
    {
      id: 1,
      question: "How to create Reddit story frames?",
      answer: "To create Reddit story frames, you can use various tools and templates that mimic Reddit's post format. These frames typically include the Reddit header, upvote/downvote buttons, username, timestamp, and content area. You can customize the text, colors, and styling to match your needs."
    },
    {
      id: 2,
      question: "Do I need a Reddit account to use the Reddit Post Template?",
      answer: "No, you don't need a Reddit account to use Reddit post templates. These are design tools that create the visual appearance of Reddit posts for creative projects, presentations, or educational purposes. They're completely separate from the actual Reddit platform."
    },
    {
      id: 3,
      question: "Is it legal to use custom Reddit posts?",
      answer: "Yes, creating custom Reddit post designs for educational, creative, or presentation purposes is generally legal. However, you should avoid using them to deceive people or spread misinformation. Always be transparent about the content being fictional or for demonstration purposes when sharing."
    },
    {
      id: 4,
      question: "Is this template free to use?",
      answer: "Most Reddit post templates are free to use for personal and educational purposes. However, licensing terms may vary depending on the specific template or tool you're using. Always check the terms of service or licensing agreement before using any template commercially."
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
