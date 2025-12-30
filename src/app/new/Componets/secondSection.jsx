import Link from "next/link";

export default function SecondSection() {
	return (
		<section className="relative w-full bg-[#0e001a] py-24 px-4 overflow-hidden">
			{/* Section Heading Framer Style */}
			<div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
				<div className="inline-block px-6 py-2 mb-6 rounded-full border border-[#7c3aed] bg-[#1a0033] shadow-[0_0_0_2px_rgba(124,58,237,0.2)]">
					<p className="text-sm font-medium text-white">Azoma is the partner of choice for the world's leading consumer brands & retailers to win in the era of AI Shopping</p>
				</div>
				<h2 className="text-5xl md:text-6xl font-bold leading-tight text-white mb-4" style={{fontFamily: 'Inter, sans-serif'}}>Our Solutions</h2>
			</div>

			{/* Solutions Section Framer Style */}
			<div className="relative max-w-5xl mx-auto z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
					{/* For Brands Card */}
					<div className="relative flex flex-col rounded-[16px] border border-[#23232b] bg-[#18181c]/90 shadow-lg overflow-hidden px-8 pt-0 pb-8 min-h-[520px]" style={{boxShadow: '0 2px 24px 0 rgba(0,0,0,0.18)'}}>
						{/* Top border accent */}
						<div className="h-[0.1rem] w-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#0ea5e9] opacity-60" />
						{/* Card background image */}
						<div className="absolute inset-0 z-0 pointer-events-none" style={{backgroundImage: 'url(https://framerusercontent.com/images/NnHLCsLlyjdTyS5xBtx645Fut4U.webp?width=500&height=500)', backgroundRepeat: 'repeat', backgroundSize: '160px', opacity: 0.13}} />
						{/* Dot grid overlay */}
						<div className="absolute inset-0 z-0 pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%2322222b\' fill-opacity=\'0.12\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '20px 20px', opacity: 0.18}} />
						{/* Card content */}
						<div className="relative z-10 flex flex-col gap-0">
							<div className="flex items-baseline gap-2 mt-8">
								<h3 className="text-[2.75rem] font-semibold leading-[1.1] bg-gradient-to-r from-white/60 to-white text-transparent bg-clip-text" style={{fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em'}}>For Brands</h3>
							</div>
							<p className="text-gray-300 text-lg font-medium mb-2 mt-2" style={{fontFamily: 'Inter, sans-serif'}}>Brand visibility across AI engines, and optimized content published across marketplaces</p>
							{/* Divider and Features include */}
							<div className="flex flex-col items-center my-4">
								<div className="flex items-center w-full max-w-[260px] mx-auto">
									<div className="flex-1 h-px bg-[#23232b] opacity-60" />
									<span className="mx-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase" style={{letterSpacing: '0.08em'}}>Features include</span>
									<div className="flex-1 h-px bg-[#23232b] opacity-60" />
								</div>
							</div>
							{/* Feature List */}
							<div className="flex flex-col gap-4 mt-2">
								<FeatureCheck text={<><b>Track your Presence:</b> Understand how your brand is talked about by AI Answer Engines (e.g. ChatGPT, Amazon Rufus, etc)</>} />
								<FeatureCheck text={<><b>Consumer Trends:</b> Understand what billions of people are asking AI around your topics of interest</>} />
								<FeatureCheck text={<><b>Uncover Citations:</b> Find out which sources are informing the AI conversation about your brand</>} />
								<FeatureCheck text={<><b>Generate and Publish Optimized Content:</b> Generate optimized content, including product listings, blogs, and recipes; and publish on Amazon, Shopify, Walmart or your own website</>} />
							</div>
							{/* CTA */}
							<Link href="/contact" className="mt-8 inline-block w-full text-center px-0 py-3 rounded-[10px] font-medium text-white border border-[#23232b] bg-gradient-to-b from-[#1c1c1c1a] to-[#12121233] hover:bg-black/40 transition text-base shadow-[0_0_0_1.5px_rgba(255,255,255,0.08)_inset]" style={{backdropFilter: 'blur(5px)', boxShadow: 'rgba(255,255,255,0.9) 0px 0.6px 0.6px -1.58px inset, rgba(255,255,255,0.74) 0px 2.28px 2.28px -3.16px inset, rgba(255,255,255,0.05) 0px 10px 10px -4.75px inset'}}>Find out more</Link>
						</div>
					</div>

					{/* For Retailers Card */}
					<div className="relative flex flex-col rounded-[16px] border border-[#23232b] bg-[#18181c]/90 shadow-lg overflow-hidden px-8 pt-0 pb-8 min-h-[520px]" style={{boxShadow: '0 2px 24px 0 rgba(0,0,0,0.18)'}}>
						{/* Top border accent */}
						<div className="h-[0.1rem] w-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#0ea5e9] opacity-60" />
						{/* Card background image */}
						<div className="absolute inset-0 z-0 pointer-events-none" style={{backgroundImage: 'url(https://framerusercontent.com/images/NnHLCsLlyjdTyS5xBtx645Fut4U.webp?width=500&height=500)', backgroundRepeat: 'repeat', backgroundSize: '160px', opacity: 0.13}} />
						{/* Dot grid overlay */}
						<div className="absolute inset-0 z-0 pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%2322222b\' fill-opacity=\'0.12\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '20px 20px', opacity: 0.18}} />
						{/* Card content */}
						<div className="relative z-10 flex flex-col gap-0">
							<div className="flex items-baseline gap-2 mt-8">
								<h3 className="text-[2.75rem] font-semibold leading-[1.1] bg-gradient-to-r from-white/60 to-white text-transparent bg-clip-text" style={{fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em'}}>For Retailers</h3>
							</div>
							<p className="text-gray-300 text-lg font-medium mb-2 mt-2" style={{fontFamily: 'Inter, sans-serif'}}>Automate ecommerce merchandising at speed and scale with our agentic, end-to-end solution.</p>
							{/* Divider and Features include */}
							<div className="flex flex-col items-center my-4">
								<div className="flex items-center w-full max-w-[260px] mx-auto">
									<div className="flex-1 h-px bg-[#23232b] opacity-60" />
									<span className="mx-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase" style={{letterSpacing: '0.08em'}}>Features include</span>
									<div className="flex-1 h-px bg-[#23232b] opacity-60" />
								</div>
							</div>
							{/* Feature List */}
							<div className="flex flex-col gap-4 mt-2">
								<FeatureCheck text={<><b>Speed &amp; Scale:</b> Bulk generate product listings, including lifestyle images, infographics, and optimized copy in your brand guidelines and tone of voice</>} />
								<FeatureCheck text={<><b>Conversion:</b> Improve conversion with high quality content, utilizing the latest AI models and our Patented Technology</>} />
								<FeatureCheck text={<><b>Localization:</b> Generate content in any language and for every geography</>} />
								<FeatureCheck text={<><b>Discoverability:</b> Increase visibility on traditional search as well as  AI Answer Engines</>} />
							</div>
							{/* CTA */}
							<Link href="/contact" className="mt-8 inline-block w-full text-center px-0 py-3 rounded-[10px] font-medium text-white border border-[#23232b] bg-gradient-to-b from-[#1c1c1c1a] to-[#12121233] hover:bg-black/40 transition text-base shadow-[0_0_0_1.5px_rgba(255,255,255,0.08)_inset]" style={{backdropFilter: 'blur(5px)', boxShadow: 'rgba(255,255,255,0.9) 0px 0.6px 0.6px -1.58px inset, rgba(255,255,255,0.74) 0px 2.28px 2.28px -3.16px inset, rgba(255,255,255,0.05) 0px 10px 10px -4.75px inset'}}>Find out more</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function FeatureCheck({ text }) {
	return (
		<div className="flex items-start gap-2 text-white/90 text-sm">
			<span className="mt-1">
				{/* Tick Circle SVG */}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5 text-cyan-400 fill-cyan-400">
					<circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.15" />
					<path d="M8.5 13.5l-3-3 1.06-1.06L8.5 11.38l5.44-5.44L15 7l-6.5 6.5z" fill="currentColor" />
				</svg>
			</span>
			<span>{text}</span>
		</div>
	);
}
