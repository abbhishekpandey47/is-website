
"use client";
import Image from "next/image";


const testimonialsData = [
	{
		quote: "Azoma is a pioneer in the AI space, combining deep algorithmic expertise, data-driven mindset, and an incredibly supportive team that brings vision, energy, and imagination to every engagement. With their support we feel better equipped and future focussed to take on AI discovery”.",
		name: "Saumya Kowtha",
		title: "Global E-Commerce & AI Strategist, MARS",
		avatar: "https://framerusercontent.com/images/68BgzFOPubh5LxV9cY8v5BnPKQ.jpg?width=240&height=240",
		logo: "/logos/mars.png",
		logoAlt: "MARS",
		bgPattern: "https://framerusercontent.com/images/NnHLCsLlyjdTyS5xBtx645Fut4U.webp?width=500&height=500"
	},
	{
		quote: "There is a need for this service. There are a lot of vendors out there for ChatGPT, but we have not come across another that is building for Rufus and Sparky",
		name: "Robert Connor",
		title: "Principal, Business Strategy Manager, HP",
		avatar: "/avatars/robert.jpg",
		logo: "/logos/hp.png",
		logoAlt: "HP",
		bgPattern: null
	},
	{
		quote: "Ruroc is now consistently the <span class='font-bold text-white bg-gradient-to-r from-white/80 to-white/100 bg-clip-text text-transparent'>#1 most recommended Ski & Snowboarding Helmet brand by ChatGPT</span> to our target customers across multiple Geographies, thanks to Azoma, and they have increased our site traffic from this channel <span class='font-bold text-white'>14x.</span> As a $50m revenue D2C brand, they are the GEO tool of choice to get mentioned by ChatGPT Shopping.",
		name: "Daniel Rees",
		title: "Founder, Ruroc",
		avatar: "https://framerusercontent.com/images/CGbieaXUKZCecPcUjGmHSBF1V10.jpg?width=400&height=459",
		logo: "/logos/ruroc.png",
		logoAlt: "Ruroc",
		bgPattern: null
	},
	{
		quote: "<span class='font-semibold text-white'>Azoma has been delivering tangible results by helping brands and retailers optimize for <span class='font-bold text-white bg-gradient-to-r from-white/80 to-white/100 bg-clip-text text-transparent'>LLM-based search for three years</span>, via their innovative technology across <span class='font-bold text-white'>two patents</span>, long before many of the new entrants were even founded.",
		name: "Mark Evans",
		title: "ex-CMO, Direct Line Group & NED, The Marketing Society",
		avatar: "/avatars/mark.jpg",
		logo: "/logos/marketing-society.png",
		logoAlt: "Marketing Society",
		bgPattern: null
	},
	{
		quote: "As Europe's leading Matcha brand, we have seen tremendous value from our longstanding partnership with Azoma. Their platform has been <span class='font-bold text-white bg-gradient-to-r from-white/80 to-white/100 bg-clip-text text-transparent'>instrumental in boosting top-of-funnel visibility among consumers searching for healthier energy drink alternatives on ChatGPT and Perplexity</span>, contributing to our remarkable <span class='font-bold text-white'>+532% year-over-year revenue growth</span> across all channels.",
		name: "Kelly Shaw",
		title: "Head of Marketing, Perfect Ted",
		avatar: "/avatars/kelly.jpg",
		logo: "/logos/perfect-ted.png",
		logoAlt: "Perfect Ted",
		bgPattern: null
	},
	{
		quote: "Azoma has helped us increase our <span class='font-bold text-white bg-gradient-to-r from-white/80 to-white/100 bg-clip-text text-transparent'>share of mentions from Amazon Rufus by 5x</span> on average across our portfolio of Brands, whilst the product listing content they generated has been demonstrated in Amazon split-testing to <span class='font-bold text-white'>increase conversion by +32%</span>.",
		name: "Sim Mahon",
		title: "8-figure Amazon brand Portfolio owner (including Yogii & Deer & Oak)",
		avatar: "/avatars/sim.jpg",
		logo: "/logos/ai-direct.png",
		logoAlt: "AI Direct",
		bgPattern: null
	},
];

function TestimonialCard({ quote, name, title, avatar, logo, logoAlt, bgPattern }) {
	return (
		<div className="framer-154pkg relative rounded-2xl border border-[#23232b] bg-[#18181c]/90 shadow-xl flex flex-col overflow-hidden" data-border="true" data-framer-name={name}>
			{/* Border Top */}
			<div className="framer-cis7t4 w-full h-[0.1rem] bg-gradient-to-r from-[#8a6fff] via-[#0fc7ff] to-[#8a6fff]" data-framer-name="Border Top"></div>
			{/* Optional Pattern BG */}
			{bgPattern && (
				<div className="framer-1rd8rw0 absolute inset-0 z-0" style={{backgroundImage: `url(${bgPattern})`, backgroundRepeat: 'repeat', backgroundPosition: 'left top', backgroundSize: '160px', opacity: 0.12}}></div>
			)}
			<div className="framer-nidtgl flex-1 flex flex-col justify-between relative z-10 p-8">
				<div className="framer-11syty2 mb-6">
					<div className="framer-1dh0plq">
						<div className="framer-1k13d4z">
							<p className="framer-text framer-styles-preset-m4ve7w text-white/90 text-base leading-relaxed" style={{textAlign: 'left'}}>
								<em dangerouslySetInnerHTML={{ __html: quote }} />
							</p>
						</div>
					</div>
				</div>
				<div className="framer-xg3zsn flex items-center gap-4 mt-auto">
					<div className="framer-3dq005 relative w-12 h-12">
						<div className="framer-1u4p6ow absolute left-1/2 top-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2">
							<span style={{position: 'absolute', inset: 0, borderRadius: 'inherit', overflow: 'hidden'}}>
								<img src={avatar} alt={name} width={48} height={48} style={{display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover', objectPosition: 'center'}} />
							</span>
						</div>
					</div>
					<div className="framer-aim7sb" style={{transform: 'translateY(-10%)'}}>
						<p className="framer-text font-sans text-white text-base font-semibold leading-tight mb-0">{name}</p>
						<p className="framer-text text-xs text-white/70 leading-tight mt-1">{title}</p>
					</div>
					<div className="framer-1xc7od7 ml-auto w-14 h-6 flex items-center justify-center">
						<span style={{position: 'absolute', inset: 0, borderRadius: 'inherit', overflow: 'hidden'}}>
							<img src={logo} alt={logoAlt} width={56} height={24} style={{display: 'block', width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center'}} />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Testimonials() {
	return (
		<section id="testimonials" className="relative py-20 px-4 bg-transparent">
			{/* Blurred background */}
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundColor: "rgb(15,199,255)",
					filter: "blur(300px)",
					opacity: 0.4,
					width: "60vw",
					height: "30vh",
				}}
				aria-hidden="true"
			/>
			<div className="relative z-10 max-w-5xl mx-auto">
				{/* Section Heading */}
				<div className="flex flex-col items-center mb-12">
					<div className="px-4 py-1 mb-3 rounded-full border border-blue-300/40 bg-black/10 shadow-inner shadow-blue-500/20">
						<p className="text-blue-100 text-base font-medium">Testimonials</p>
					</div>
					<h2
						className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2 text-center"
						style={{
							background:
								"linear-gradient(0deg, rgba(255,255,255,0.8) 0%, #fff 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Hear From Our Clients
					</h2>
				</div>
				{/* Testimonials Grid */}
				<div className="grid md:grid-cols-2 gap-10">
					{testimonialsData.map((testimonial, idx) => (
						<TestimonialCard key={idx} {...testimonial} />
					))}
				</div>
			</div>
		</section>
	);
}
