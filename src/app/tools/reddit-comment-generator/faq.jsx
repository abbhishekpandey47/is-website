"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ({darkMode}) {
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
    <div className={`p-6 relative ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-4xl mx-auto relative">
        <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Frequently Asked Questions
        </h2>
        <div className={`p-[6px] border rounded-xl relative ${darkMode ? 'border-white/20' : 'border-black/20'}`}>
          {/* Loader overlay */}
          {loading && (
            <div className={`absolute inset-0 flex flex-col items-center justify-center z-20 rounded-xl ${darkMode ? 'bg-black/70' : 'bg-white/70'
              }`}>
              <div
                className={`animate-spin rounded-full h-16 w-16 shadow-2xl drop-shadow-lg ${darkMode
                    ? 'border-t-8 border-b-8 border-[#3c4199]'
                    : 'border-t-8 border-b-8 border-[#9ca3af]'
                  }`}
              />
              <span
                className={`mt-6 text-lg font-semibold drop-shadow-lg ${darkMode ? 'text-[#3c4199]' : 'text-gray-700'
                  }`}
              >
                Loading...
              </span>
            </div>
          )}
          <div className="rounded-xl">
            {faqs.map((faq, index) => {
              const isFirst = index === 0;
              const isLast = index === faqs.length - 1;

              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden transition-all duration-200 
  ${isFirst ? "rounded-t-xl" : ""} 
  ${isLast ? "rounded-b-xl" : ""} 
  ${darkMode ? "bg-white/5 border border-white/20" : "bg-black/5 border border-black/10"}`}

                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-3 text-left flex items-center justify-between"
                  >
                    <span
                      className={`text-lg font-medium pr-4 ${darkMode ? "text-gray-100" : "text-gray-800"
                        }`}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transform transition-transform duration-200 flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-600"
                        } ${openItems.has(faq.id) ? "rotate-180" : ""}`}
                    />

                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems.has(faq.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className={`px-6 pb-5 pt-1 ${darkMode ? "bg-gray-700/40" : "bg-gray-100"}`}>
                      <p className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {faq.answer}
                      </p>
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
