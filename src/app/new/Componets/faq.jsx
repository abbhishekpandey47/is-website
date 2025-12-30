
"use client";

import React, { useState } from "react";

const faqs = [
	{
		question: "What Is Generative Engine Optimization?",
		answer:
			"Generative Engine Optimization (GEO) is the process of optimizing content for AI-driven search engines and generative models, which provide more comprehensive and human-like responses to queries than traditional search engines. Unlike conventional SEO that focuses on keyword rankings to drive clicks, GEO centers on creating authoritative, well-structured content that AI systems can easily synthesize and cite within their conversational responses. As users increasingly seek direct answers from AI rather than browsing links, GEO ensures your content becomes an integral part of the AI's knowledge base and gets referenced when users ask relevant questions.",
	},
	{
		question: "How can I get my product featured in ChatGPT shopping?",
		answer:
			"To get your products featured in ChatGPT Shopping, you need to either be a merchant listed on a platform that ChatGPT integrates with, or wait for OpenAI to open up direct submissions for merchants. Currently, ChatGPT pulls shopping recommendations from integrated platforms like Shopify and Amazon, making these your primary pathways for inclusion. To maximize your visibility, ensure your product listings feature comprehensive descriptions, high-quality images, and proper structured data markup that AI systems can easily parse. While OpenAI continues developing direct merchant submission capabilities, you can monitor their official channels for updates and express interest through their Help Center to stay informed about future opportunities.",
	},
	{
		question:
			"How is generative engine optimization different from traditional SEO?",
		answer:
			"Traditional SEO focuses on improving a website's ranking in search engine results pages (SERPs) using keywords and backlinks. GEO, on the other hand, aims to influence the generation of AI-driven answers and search results by optimizing content for AI-powered search engines. While traditional SEO targets click-through rates by positioning web pages higher in link-based results, GEO prioritizes creating content that AI systems can synthesize and cite within their conversational responses. This fundamental shift reflects how users increasingly seek direct answers from AI rather than browsing multiple websites, requiring content creators to optimize for AI comprehension and attribution rather than traditional ranking signals.",
	},
	{
		question: "Can my SEO software help me track LLM performance?",
		answer:
			"Different software is needed to track LLM performance because these models are inherently complex and their behavior is not always predictable, making traditional monitoring methods inadequate. Traditional SEO software was designed to track keyword rankings and website traffic from search engines, but LLMs operate on entirely different principles—they generate conversational responses, synthesize information from multiple sources, and provide direct answers rather than ranked links. Specialized LLM observability tools like Azoma are built to handle these unique challenges by tracking metrics such as response accuracy, citation frequency, content synthesis patterns, and AI model behavior across different queries. These platforms provide the granular insights needed to understand how your content performs within AI-generated responses, something that conventional SEO analytics simply cannot measure or optimize for effectively.",
	},
	{
		question: 'How is Azoma an "end-to-end" workflow solution?',
		answer:
			"Azoma not only provides you with Analytics on how you perform in AI Search, but also enables you to generate optimized visual and written content - such as product listings, blogs, recipes etc, at scale. Azoma also integrates with your existing workflows to enable the publishing of this content in one click",
	},
	{
		question: "How Does Azoma Help Me Stay Competitive?",
		answer:
			"Azoma gives you real-time visibility into how your topics of interest are being discussed across major AI platforms, surfaces insights into consumer queries, and helps optimize your content strategy to increase presence in AI-powered search. It’s your competitive and end-to-end automation edge in the new AI era.",
	},
	{
		question: "Who was Azoma built for?",
		answer:
			"Azoma was built for leaders in companies selling 'high consideration' products or services. If your customers are amongst the billion people using ChatGPT each day; or the +14% of Amazon shoppers asking questions to Amazon Rufus; then Azoma is for you.",
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
