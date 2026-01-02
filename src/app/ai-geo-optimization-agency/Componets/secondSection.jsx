import Link from "next/link";
import Image from "next/image";
export default function SecondSection() {
	return (
		<section className="relative w-full py-24 px-4 overflow-hidden">
			{/* Section Heading Framer Style */}
			<div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
				<div className="inline-block px-6 py-2 mb-6 rounded-full border border-[#7c3aed] bg-[#1a0033] shadow-[0_0_0_2px_rgba(124,58,237,0.2)]">
					<p className="text-sm font-medium text-white">Infrasity helps technical B2B companies win visibility in AI answers</p>
				</div>
                 <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4" style={{background: 'linear-gradient(0deg, rgba(255,255,255,0.8) 0%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
									Turn AI Search into measurable growth for B2B startups
								</h2>
						  <div className="w-full flex justify-center mb-6 absolute z-[-1]">
						  <Image
							src="https://framerusercontent.com/images/aootIzwv3wiOmpUg9vnbUWVqA1U.png"
							alt="AI Search Growth"
							width={420}
							height={260} // use actual image height if known
							className="w-full h-auto object-contain rounded-xl"
							priority
						  />
					</div>
						<p className="text-white/80 text-lg max-w-2xl mx-auto mb-2" style={{textAlign: 'center'}}>
						When developers research new tools, they don't scroll ten links. They ask ChatGPT, Perplexity, Claude or Google AI and trust what those systems cite.
						</p>
			</div>

			{/* Solutions Section Framer Style */}
			<div className="relative max-w-5xl mx-auto z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative">
					{[
						{
							title: 'Establish your B2B startup as an authority',
							text: "We structure your presence so your B2B startup is included in high-value AI answers, not left out of the conversation.",
						},
						{
							title: 'Secure mentions in trusted sources',
							text: "We put your B2B startup in front of the right people by earning placements in the sources AI systems rely on.",
						},
						{
							title: 'Create content that gets picked up',
							text: "We research the real questions people ask tools like ChatGPT, then help your B2B startup publish content designed to answer them.",
						},
						{
							title: 'Control how your startup is described',
							text: "We make sure AI tools reflect the right story. From product positioning to company facts, we help shape how your B2B startup is presented.",
						},
					].map((card, i) => (
						<div key={i} className="relative flex flex-col rounded-[16px] border border-[#23232b] bg-[#18181c]/90 shadow-lg overflow-hidden px-8 pt-0 pb-8 min-h-[320px]" style={{boxShadow: '0 2px 24px 0 rgba(0,0,0,0.18)'}}>
							<div className="h-[0.1rem] w-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#0ea5e9] opacity-60" />
							<div
								className="absolute left-0 right-0 top-0 h-16 md:h-16 z-0 pointer-events-none rounded-t-[16px] overflow-hidden"
								style={{
									backgroundImage: 'url(https://framerusercontent.com/images/NnHLCsLlyjdTyS5xBtx645Fut4U.webp?width=500&height=500)',
									backgroundRepeat: 'repeat',
									backgroundSize: '160px',
									backgroundPosition: 'top center',
									opacity: 0.8,
									maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
									WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
								}}
							/>
							<div className="absolute inset-0 z-0 pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%2322222b\' fill-opacity=\'0.12\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '20px 20px', opacity: 0.18}} />
							<div className="relative z-10 flex flex-col gap-0">
								<div className="flex items-baseline gap-2 mt-8">
									<h3 className="text-[1.75rem] md:text-[2.25rem] font-semibold leading-[1.1] bg-gradient-to-r from-white/60 to-white text-transparent bg-clip-text" style={{fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em'}}>{card.title}</h3>
								</div>
								<p className="text-gray-300 text-lg font-medium mb-2 mt-2" style={{fontFamily: 'Inter, sans-serif'}}>{card.text}</p>
								<Link href="/contact" className="mt-6 inline-block w-full text-center px-0 py-3 rounded-[10px] font-medium text-white border border-[#23232b] bg-gradient-to-b from-[#1c1c1c1a] to-[#12121233] hover:bg-black/40 transition text-base shadow-[0_0_0_1.5px_rgba(255,255,255,0.08)_inset]" style={{backdropFilter: 'blur(5px)', boxShadow: 'rgba(255,255,255,0.9) 0px 0.6px 0.6px -1.58px inset, rgba(255,255,255,0.74) 0px 2.28px 2.28px -3.16px inset, rgba(255,255,255,0.05) 0px 10px 10px -4.75px inset'}}>Talk to us</Link>
							</div>
						</div>
					))}
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
