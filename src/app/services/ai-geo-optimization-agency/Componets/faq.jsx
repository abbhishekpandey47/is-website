
"use client";

import React, { useState } from "react";
import FAQSection from "../../../lp/reddit-marketing-agency/FAQ"

const faqs = [
	{
		id: "1",
		question: "What does Infrasity’s LLM Visibility Audit include?",
		answer:
			"Our audit analyzes how your brand appears across AI assistants such as ChatGPT, Perplexity, Claude, and Gemini. You receive a visibility benchmark, competitor comparison, citation/source analysis, and a prioritized action roadmap.",
	},
	{
		id: "2",
		question: "How is this different from a regular SEO audit?",
		answer:
			"Traditional SEO focuses on ranking in Google search results. Our audit focuses on how AI systems describe, cite, and recommend your brand inside generated answers. We optimize entities, citations, and authority signals rather than just keywords.",
	},
	{
		id: "3",
		question: "Who is this service best suited for?",
		answer:
			"This service is ideal for SaaS companies, developer tools, AI-first products, and B2B brands that rely on organic discovery and want to shape how AI models talk about them.",
	},
	{
		id: "4",
		question: "How long does the audit take?",
		answer:
			"Most engagements are completed within 2–4 weeks depending on your content footprint and number of categories analysed.",
	},
	{
		id: "5",
		question: "What outputs will our team receive?",
		answer:
			"You receive: full visibility audit report, list of influencing sources and citations, gap analysis vs competitors, platform-wise performance insights, and a prioritized implementation roadmap. We also walk you through findings on a strategy call.",
	},
	{
		id: "6",
		question: "Can Infrasity implement the recommendations as well?",
		answer:
			"Yes. You may execute internally, or Infrasity can handle implementation across content optimization, entity cleanup, structured data, GEO, and digital PR.",
	},
	{
		id: "7",
		question: "Do you require access to analytics tools?",
		answer:
			"Access to GA4 or product analytics helps us tie AI-driven traffic to conversions. If access is limited, we can still conduct a visibility-focused audit.",
	},
	{
		id: "8",
		question: "What happens if AI tools currently show wrong or outdated information about us?",
		answer:
			"We identify why incorrect responses occur and outline corrective actions such as entity alignment, authority source updates, and content restructuring so AI models present accurate brand information.",
	},
	{
		id: "9",
		question: "Will this replace our SEO efforts?",
		answer:
			"No. LLM visibility complements SEO. Strong SEO strengthens the signals AI systems rely on, and GEO + SEO together drive better organic discovery.",
	},
	{
		id: "10",
		question: "How soon can we expect results after implementation?",
		answer:
			"Timelines vary by category and authority level, but most brands begin seeing changes in AI responses and citations within 6–12 weeks as sources refresh and models update.",
	},
];


const FAQ = () => {
	return (
		<FAQSection faqsData={faqs} />
	);
};

export default FAQ;
