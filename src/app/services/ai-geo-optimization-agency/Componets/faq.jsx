
"use client";

import React, { useState } from "react";

const faqs = [
	{
		question: "What does Infrasity’s LLM Visibility Audit include?",
		answer:
			"Our audit analyzes how your brand appears across AI assistants such as ChatGPT, Perplexity, Claude, and Gemini. You receive a visibility benchmark, competitor comparison, citation/source analysis, and a prioritized action roadmap.",
	},
	{
		question: "How is this different from a regular SEO audit?",
		answer:
			"Traditional SEO focuses on ranking in Google search results. Our audit focuses on how AI systems describe, cite, and recommend your brand inside generated answers. We optimize entities, citations, and authority signals rather than just keywords.",
	},
	{
		question: "Who is this service best suited for?",
		answer:
			"This service is ideal for SaaS companies, developer tools, AI-first products, and B2B brands that rely on organic discovery and want to shape how AI models talk about them.",
	},
	{
		question: "How long does the audit take?",
		answer:
			"Most engagements are completed within 2–4 weeks depending on your content footprint and number of categories analysed.",
	},
	{
		question: "What outputs will our team receive?",
		answer:
			"You receive: full visibility audit report, list of influencing sources and citations, gap analysis vs competitors, platform-wise performance insights, and a prioritized implementation roadmap. We also walk you through findings on a strategy call.",
	},
	{
		question: "Can Infrasity implement the recommendations as well?",
		answer:
			"Yes. You may execute internally, or Infrasity can handle implementation across content optimization, entity cleanup, structured data, GEO, and digital PR.",
	},
	{
		question: "Do you require access to analytics tools?",
		answer:
			"Access to GA4 or product analytics helps us tie AI-driven traffic to conversions. If access is limited, we can still conduct a visibility-focused audit.",
	},
	{
		question: "What happens if AI tools currently show wrong or outdated information about us?",
		answer:
			"We identify why incorrect responses occur and outline corrective actions such as entity alignment, authority source updates, and content restructuring so AI models present accurate brand information.",
	},
	{
		question: "Will this replace our SEO efforts?",
		answer:
			"No. LLM visibility complements SEO. Strong SEO strengthens the signals AI systems rely on, and GEO + SEO together drive better organic discovery.",
	},
	{
		question: "How soon can we expect results after implementation?",
		answer:
			"Timelines vary by category and authority level, but most brands begin seeing changes in AI responses and citations within 6–12 weeks as sources refresh and models update.",
	},
];


const FAQ = () => {
	const [openIndex, setOpenIndex] = useState(0);
	const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

	return (
		<section className="relative py-20 px-4 md:px-0 flex flex-col items-center min-h-[100vh] overflow-hidden">
			{/* Framer-style background image (optional, can be added as needed) */}
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<img
					src="https://framerusercontent.com/images/lO5wRJVVWbi7QLa9BiEu9kcMMig.webp?width=2048&height=1318"
					alt="FAQ background"
					className="w-full h-full object-cover object-center opacity-60"
					draggable="false"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-[#0B070F] via-[#0B070F]/80 to-[#0B070F]" />
			</div>

			{/* Section Tag */}
			<div className="mb-4 flex justify-center">
				<span className="px-4 py-1 rounded-full bg-[#2B1B4B] text-xs font-semibold text-[#C7A6F7] tracking-wider shadow-md border border-[#6B3FC9]">FAQs</span>
			</div>

			{/* Heading */}
			<h2 className="text-[1.8rem] md:text-[3.25rem] font-extrabold text-center mb-4 text-white leading-tight max-w-[1100px]">
				Frequently Asked Questions
			</h2>
			<p className="text-[#bdbdbd] text-center max-w-2xl mb-12 text-base md:text-lg">
				Here are some of the most common questions people ask us about Azoma
			</p>

			{/* FAQ Cards */}
			<div className="w-full max-w-4xl flex flex-col gap-6">
				{faqs.map((faq, idx) => (
					<div
						key={idx}
						className="relative rounded-[18px] overflow-hidden group"
						style={{boxShadow: '0 12px 40px rgba(2,2,6,0.6)'}}
					>
						{/* gradient border */}
						<div className="absolute inset-0 rounded-[18px] pointer-events-none " style={{
							background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
							zIndex: 1,
						}} />
						{/* dotted texture and dark fill */}
						<div className="absolute inset-0 rounded-[15px] m-[0.15rem] pointer-events-none" style={{
							background: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.02), transparent 20%), rgba(11,7,15,0.6)',
							backdropFilter: 'blur(6px)',
							zIndex: 2,
						}} />

						{/* conic/angular subtle overlay visible when expanded */}
						<div className="absolute inset-0 rounded-[15px] mx-2 my-2 pointer-events-none"
							style={{
								background: 'conic-gradient(from 83deg at 102.4% 100%, rgb(11, 10, 11) 77.8378deg, rgb(11, 10, 11) 169.3741deg, rgb(255, 255, 255) 198deg, rgb(11, 10, 11) 227.1727deg)',
								opacity: openIndex === idx ? 0.1 : 0,
								transition: 'opacity 280ms ease',
								zIndex: 3,
							}} />

						{/* content block */}
						<div className="relative z-30 p-6 md:p-8 flex flex-col gap-4">
							<header className="flex items-start w-full">
								<button
									className="flex-1 text-left focus:outline-none"
									onClick={() => toggle(idx)}
									aria-expanded={openIndex === idx}
									aria-controls={`faq-panel-${idx}`}
								>
									<h3 className="font-semibold text-xl md:text-2xl text-white leading-tight">
										{faq.question}
									</h3>
								</button>
								{/* toggle icon */}
								<button
									className="ml-4 mt-1 p-1 rounded focus:outline-none"
									onClick={() => toggle(idx)}
									aria-hidden="true"
								>
									{openIndex === idx ? (
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x="4" y="11" width="16" height="2" rx="1" fill="#fff" />
										</svg>
									) : (
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									)}
								</button>
							</header>

							<div
								id={`faq-panel-${idx}`}
								role="region"
								aria-labelledby={`faq-button-${idx}`}
								className="overflow-hidden transition-max-h duration-300"
								style={{
									maxHeight: openIndex === idx ? '1000px' : '0px',
									transition: 'max-height 320ms ease',
								}}
							>
								<p className="text-[#d4d4d8] text-base md:text-lg leading-relaxed max-w-full" style={{lineHeight: '1.8'}}>
									{faq.answer}
								</p>
							</div>
						</div>

						{/* subtle purple glow at bottom */}
						<div className="absolute left-6 right-6 bottom-4 h-14 pointer-events-none rounded-b-[14px] overflow-hidden">
							<div style={{width: '100%', height: '100%', background: 'radial-gradient(50% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.06) 35%, transparent 65%)'}} />
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default FAQ;
