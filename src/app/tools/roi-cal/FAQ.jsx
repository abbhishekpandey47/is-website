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
    question: " Is this ROI calculator only for SaaS companies?",
    answer:
      "Not at all. This calculator is built for any company investing in content marketing, whether you're in SaaS, AI, edtech, or fintech. ",
  },
  {
    id: "2",
    question: "Why do you ask about domain expertise in the calculator?",
    answer:
      "Domain expertise is required because technical content isn’t one-size-fits-all. If your product involves infrastructure, APIs, machine learning, or developer workflows, it requires writers with real subject-matter knowledge. Without that expertise, content takes longer to produce, demands more revisions, and often misses the mark. Including this input helps the calculator give a more realistic view of the time, cost, and ROI impact based on your content’s complexity.",
  },
  {
    id: "3",
    question: "What’s the ideal number of blogs per month to increase ROI?",
    answer:
      "For early-stage B2B SaaS and AI startups, publishing at least 4 high-quality blogs per month is recommended. This keeps your site active, builds SEO momentum, and gives sales and product teams fresh assets to share. More important than quantity is consistency and relevance, blogs that answer real user questions, showcase use cases, or support onboarding tend to drive the strongest ROI.",
  },
  {
    id: "4",
    question: "How should I decide on my target traffic growth?",
    answer:
      "It depends on your stage and goals. For early-stage SaaS startups, a realistic growth target is 20-50% over 3-6 months, especially if you’re starting from a low content baseline. If you already have traffic momentum, even 10-15% monthly growth can be impactful. The key is to align traffic goals with what content can influence, like top-of-funnel visibility, branded search, and long-tail discovery. Set a target that’s ambitious but grounded in your current content volume and domain authority.",
  },
  {
    id: "5",
    question: "What’s the ideal timeline for calculating content ROI?",
    answer:
      "For most B2B SaaS and AI startups, a 3 - 6 month window is ideal. It gives your content enough time to rank, drive traffic, and support onboarding or sales workflows. Shorter timelines (1 - 2 months) work best for launch support or quick GTM validation, while longer ones (6 - 12 months) help model compounding SEO or PLG effects. Choose a timeframe that matches your current growth goals and runway.",
  },
  {
    id: "6",
    question:
      "What makes Infrasity different from traditional content agencies?",
    answer:
      "Infrasity specializes in technical content for SaaS, AI, DevOps, observability, and developer-first products. Unlike generalist agencies, we combine domain expertise with GTM alignment, so every piece we ship is not just well-written, but also technically accurate and adoption-focused. We collaborate like a product team, think in sprints, and tailor content to your roadmap, not a static brief.",
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

            <a
              href="https://calendly.com/meet-shan"
              className="inline-flex items-center text-[#5F64FF] text-lg  transition-colors"
              rel="noopener noreferrer"
            >
              Speak to Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
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
