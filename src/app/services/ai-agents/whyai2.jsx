"use client";
import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function WhyAI() {
  const [activeSection, setActiveSection] = useState(1); // Only track one active section
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSection = (sectionId) => {
    // If clicking the currently active section, close it; otherwise, open the clicked section
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const sections = [
    {
      id: 1,
      title: "New Interface Paradigms",
      content:
        "Your AI agent may replace or augment traditional UIs with conversational or autonomous workflows. Explaining this novel interface is hard - users might not immediately grasp how to use it or why it's better.",
      defaultExpanded: true,
    },
    {
      id: 2,
      title: "Hard-to-Explain Infrastructure",
      content:
        "Complex backend systems and infrastructure can be difficult to communicate to stakeholders. Breaking down technical concepts into digestible explanations helps bridge the gap between technical implementation and business value.",
    },
    {
      id: 3,
      title: "Real-Time Feedback Loops",
      content:
        "Modern applications rely on continuous feedback mechanisms to adapt and improve user experience. These systems process user interactions, analyze patterns, and adjust responses in real-time to create more personalized and effective interfaces.",
    },
    {
      id: 4,
      title: "trust and adoption hurdles",
      content:
        "AI agents often operate within a larger ecosystem of tools and services. Explaining how your agent fits into this ecosystem and interacts with other components is crucial for developers to understand its value.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-[#0a0f1b] to-slate-800 py-10">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            Why Al Agent Startups Need a New Content Playbook
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto mb-8">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
            Al agent platforms face unique Go-to-Market challenges. Your product
            introduces a new way of working. To win over developers and
            stakeholders, you must answer their key questions:
            <br />{" "}
            <span className="font-normal text-[19px]">
              "What can I build? How do I integrate? Where do I start?"
            </span>
          </p>
        </div>
      </div>
      {/* Mobile Layout */}
      {isMobile && (
        <div className="flex flex-col lg:hidden">
          {/* Image First on Mobile */}
          <div className="w-full relative overflow-hidden px-6 mb-8">
            <div className="flex justify-center">
              <Image
                src={`/ai-page/why-ai.png`}
                width={400}
                height={400}
                className="max-w-full h-auto rounded-lg"
                alt="AI Architecture"
              />
            </div>
          </div>

          {/* Content Second on Mobile */}
          <div className="w-full px-6">
            <div className="max-w-lg mx-auto space-y-6">
              {sections.map((section) => (
                <div key={section.id} className="border-b border-gray-600 pb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => toggleSection(section.id)}
                  >
                    <h2 className="text-xl font-light text-white group-hover:text-blue-200 transition-colors duration-300">
                      {section.id}. {section.title}
                    </h2>
                    <div className="text-white group-hover:text-blue-200 transition-colors duration-300 flex-shrink-0 ml-4">
                      {activeSection === section.id ? (
                        <Minus size={20} />
                      ) : (
                        <Plus size={20} />
                      )}
                    </div>
                  </div>

                  {/* Expandable Content - Fixed Height Container */}
                  <div className="relative">
                    <div
                      className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                        activeSection === section.id
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-4 pointer-events-none"
                      }`}
                    >
                      <div className="pt-4">
                        <p className="text-gray-300 leading-relaxed text-base">
                          {section.content}
                        </p>
                      </div>
                    </div>
                    {/* Spacer to maintain consistent height */}
                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        activeSection === section.id ? "h-24" : "h-0"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Left Panel - Content */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="max-w-lg space-y-8">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-gray-600 pb-6">
                <div
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => toggleSection(section.id)}
                >
                  <h2 className="text-2xl font-light text-white group-hover:text-blue-200 transition-colors duration-300">
                    {section.id}. {section.title}
                  </h2>
                  <div className="text-white group-hover:text-blue-200 transition-colors duration-300">
                    {activeSection === section.id ? (
                      <Minus size={24} />
                    ) : (
                      <Plus size={24} />
                    )}
                  </div>
                </div>

                {/* Expandable Content - Fixed Height Container */}
                <div className="relative">
                  <div
                    className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
                      activeSection === section.id
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
                  >
                    <div className="pt-6">
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {section.content}
                      </p>
                    </div>
                  </div>
                  {/* Spacer to maintain consistent height */}
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      activeSection === section.id ? "h-32" : "h-0"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Architectural Image */}
        <div className="w-1/2 relative overflow-hidden">
          <div>
            <Image
              src={`/ai-page/why-ai.png`}
              width={800}
              height={800}
              alt="AI Architecture"
              className="max-w-full p-10 h-auto rounded-[10%]"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        .clip-path-cursor {
          clip-path: polygon(0 0, 0 100%, 25% 75%, 50% 100%, 100% 0);
        }
      `}</style>
    </div>
  );
}
