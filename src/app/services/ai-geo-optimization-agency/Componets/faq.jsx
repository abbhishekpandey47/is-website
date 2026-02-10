"use client";

import React from "react";
import FAQSection from "../../../lp/reddit-marketing-agency/FAQ";

const faqs = [
    {
        id: "1",
        question: "What does Infrasity’s AI GEO Optimization service include?",
        answer:
            "Infrasity’s AI GEO Optimization service is an end-to-end program designed to make B2B SaaS startups, AI agent companies, and developer tools discoverable, quotable, and recommended by AI systems like ChatGPT, Google AI Overviews, Gemini, Perplexity, and Copilot.\nIt includes AI query research, LLM-friendly content restructuring, entity optimization, FAQ and answer-first content creation, citation readiness, and continuous AI visibility tracking, not one-off SEO updates.",
    },
    {
        id: "2",
        question: "How is Infrasity different from other GEO or AI SEO agencies?",
        answer:
            "Unlike generic SEO agencies, Infrasity is built for developer-first and SaaS-led products.\n We understand how AI systems interpret:\n\n • Technical blogs and product documentation\n • APIs, SDKs, and developer workflows\n • B2B SaaS positioning and comparisons\n\nOur GEO strategies are designed by practitioners who actively work with dev tools, AI platforms, and technical startups, so your content is optimized to be trusted and cited by AI engines.",
    },
    {
        id: "3",
        question: "Will Infrasity help my B2B SaaS or AI startup appear inside ChatGPT, Gemini, or Perplexity answers?",
        answer:
            "Yes, that is the primary goal of our GEO service.\nInfrasity optimizes your content so AI models can clearly understand what your product does, recognize when your tool is relevant to a query, and confidently reference your startup in AI-generated answers. While no agency can guarantee citations, our structured content, entity alignment, and AI-ready formats significantly improve the likelihood of your product appearing in AI responses.",
    },
    {
        id: "4",
        question: "What types of companies benefit most from Infrasity’s AI GEO Optimization?",
        answer:
            "Our service is best suited for:\n\n• B2B SaaS companies\n• Developer tools and platforms\n• AI agents and AI-first products\n• DevOps, cloud, infra, and security startups\n\nIf your buyers ask questions like “best tool for”, “how to solve”, or “which platform should I use”, GEO ensures your product is part of those AI-driven answers.",
    },
    {
        id: "5",
        question: "How long does it take to see results from AI GEO Optimization?",
        answer:
            "Most clients start seeing early AI visibility signals within 4 to 8 weeks, such as improved AI query alignment, product mentions, and inclusion in AI summaries.\nMore consistent visibility and citations typically build over 2 to 4 months as AI systems refresh, crawl, and retrain on structured content. Infrasity focuses on long-term, compounding AI visibility rather than short-term tactics.",
    },
    {
        id: "6",
        question: "Does Infrasity replace SEO with GEO, or work alongside it?",
        answer:
            "Infrasity treats GEO as an extension of modern SEO, not a replacement.\nTraditional SEO helps users find your product through links. GEO helps AI systems choose your product as the answer. Our approach aligns SEO, content marketing, and AI visibility into one cohesive strategy across search and conversational interfaces.",
    },
    {
        id: "7",
        question: "How does Infrasity measure success for AI GEO Optimization?",
        answer:
            "We measure success using AI-native metrics such as:\n\n• Product mentions and citations in AI tools\n• Visibility across AI platforms and prompts\n• AI referral signals and assisted discovery\n• Coverage for high-intent AI queries\n\nThis provides a clearer picture of how your startup performs across the AI-driven buyer journey, not just traditional rankings.",
    },
];

const FAQ = () => {
    return <FAQSection faqsData={faqs} />;
};

export default FAQ;
