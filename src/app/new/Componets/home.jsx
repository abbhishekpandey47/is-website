import Link from "next/link";
import ScrollToFaqButton from "./ScrollToFaqButton";
import Image from "next/image";
// blob GIF removed; using Framer HTML background instead

export default function HeroSection() {
	return (
		<section className="w-full mt-24 flex justify-center items-center overflow-hidden">
	
			<div className="z-10 flex flex-row items-center justify-between w-full max-w-6xl px-6 py-24">
				{/* Left Content */}
				<div className="flex flex-col gap-6 items-start">

					<div className="hero-heading w-full text-center mb-6">
						{/* blurred magenta background behind heading */}
						<div className="heading-bg absolute left-1/2 -translate-x-1/2" aria-hidden />
						<div className="relative z-10">
							<h1 className="hero-line" style={{fontSize: 'clamp(2rem, 5.5vw, 5.5rem)', lineHeight: 1, margin: 0}}>10X your visibility on AI Search.</h1>
							<h1 className="hero-line mt-2" style={{fontSize: 'clamp(2rem, 5.5vw, 5.5rem)', lineHeight: 1, margin: 0}}>Be the B2B startup</h1>
							<div className="hero-line brand-rotator mt-4" style={{position: 'relative', height: '1.1em'}}>
								<span className="rot-word">ChatGPT</span>
								<span className="rot-word">Google AI</span>
								<span className="rot-word">Perplexity</span>
								<span className="rot-word">ChatGPT</span>
							</div>
							<h1 className="hero-line mt-16" style={{fontSize: 'clamp(2rem, 5.5vw, 5.5rem)'}}>recommends first.</h1>
						</div>
					</div>
					<div className="flex justify-center w-full">
					<p className="text-lg md:text-xl text-white/90 mb-6 text-center max-w-3xl" style={{lineHeight: 1.6}}>
					AI Search is reshaping how customers search and find solutions for their needs. Our LLM Visibility Audit enables SaaS companies to track, optimize, and boost their presence in LLM-powered Searches, keeping you visible, relevant, and ahead of the competition
					</p>
					</div>
					<div className="flex w-full justify-center gap-4 mt-2">
						<Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-black bg-gradient-to-b from-gray-200 via-white to-gray-200 shadow transition hover:from-white hover:to-gray-100 border border-white/10 backdrop-blur-sm text-sm">
							{/* Play SVG */}
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-black">
								<g><path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path></g>
							</svg>
							Get a Demo
						</Link>
						<ScrollToFaqButton className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-b from-black/10 to-black/20 border border-white/10 backdrop-blur-sm shadow-inner shadow-white/10 text-sm">
							Learn More
						</ScrollToFaqButton>
					</div>
				</div>
				{/* Right Content (Video + Canvas + Dot Grid) */}
				<div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
					{/* Styled media card */}
					<div className="w-full relative">
						{/* Framer background (replaces blob GIF) */}
						<div className="framer-v5tokv absolute inset-0 pointer-events-none" data-framer-name="BG">
							<div
								className="framer-q5ecxp"
								data-framer-name="Big Circle"
								style={{ willChange: 'transform', opacity: 1, transform: 'rotate(-44.28deg)' }}
							/>
							<div
								className="framer-1mwerlq"
								data-framer-name="Small circle"
								style={{ willChange: 'transform', opacity: 1, transform: 'translate(-50%, -50%) rotate(217.92deg)' }}
							/>
						</div>
						<style>{`
						.framer-v5tokv { position: absolute; inset: 0; overflow: visible; }
						.framer-v5tokv, .framer-v5tokv * { pointer-events: none; }
						.framer-q5ecxp {
							position: absolute;
							top: 10%;
							left: 60%;
							width: 520px;
							height: 520px;
							border-radius: 50%;
							background: radial-gradient(closest-side at 30% 30%, rgba(138,111,255,0.35), rgba(15,199,255,0.18) 40%, rgba(15,199,255,0.06) 70%, transparent 100%);
							filter: blur(60px) saturate(120%);
							transform-origin: 50% 50%;
							mix-blend-mode: screen;
							animation: framer-rotate-slow 30s linear infinite;
						}
						.framer-1mwerlq {
							position: absolute;
							top: 50%;
							left: 30%;
							width: 240px;
							height: 240px;
							border-radius: 50%;
							background: radial-gradient(closest-side at 40% 40%, rgba(255,255,255,0.22), rgba(255,255,255,0.06) 50%, transparent 100%);
							filter: blur(40px) saturate(120%);
							transform-origin: 50% 50%;
							mix-blend-mode: screen;
							animation: framer-rotate-fast 14s linear infinite reverse;
							transform: translate(-50%, -50%) rotate(217.92deg);
						}
						@keyframes framer-rotate-slow {
							0% { transform: rotate(-44.28deg) translateZ(0); }
							50% { transform: rotate(15deg) translateZ(0); }
							100% { transform: rotate(-44.28deg) translateZ(0); }
						}
						@keyframes framer-rotate-fast {
							0% { transform: translate(-50%, -50%) rotate(217.92deg) scale(1); }
							50% { transform: translate(-50%, -50%) rotate(300deg) scale(1.05); }
							100% { transform: translate(-50%, -50%) rotate(217.92deg) scale(1); }
						}

						/* Animated hero heading (gradient shift + subtle float) */
						.animated-heading {
							display: inline-block;
							background: linear-gradient(0deg, rgba(255,255,255,0.8) 0%, #fff 100%);
							-webkit-background-clip: text;
							background-clip: text;
							color: transparent;
							background-size: 200% 200%;
							animation: gradientShift 6s linear infinite, floatUp 3s ease-in-out infinite alternate;
						}

						@keyframes gradientShift {
							0% { background-position: 0% 50%; }
							50% { background-position: 100% 50%; }
							100% { background-position: 0% 50%; }
						}

						@keyframes floatUp {
							0% { transform: translateY(0); }
							100% { transform: translateY(-6px); }
						}

						/* Hero heading styles to match screenshot */
						.hero-heading { position: relative; padding-top: 8px; padding-bottom: 8px; }
						.heading-bg { width: 760px; height: 380px; background: radial-gradient(circle at 50% 45%, rgba(195,15,97,0.9) 0%, rgba(114,8,59,0.55) 30%, transparent 60%); filter: blur(74px) saturate(120%); z-index: 0; border-radius: 50%; top: -40px; }
						.hero-line { font-weight: 700; color: white; font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
						.brand-rotator { display: block; position: relative; height: 1.1em; }
						.rot-word { position: absolute; left: 50%; top: 50%; transform: translate(-50%, 12px) scale(0.98); opacity: 0; font-size: clamp(2rem, 6vw, 6rem); line-height: 1; font-weight: 800; text-align: center; }
						.rot-word { will-change: transform, opacity; }
						.rot-word:nth-child(1) { animation: rotCycle 12s ease-in-out infinite; animation-delay: 0s; }
						.rot-word:nth-child(2) { animation: rotCycle 12s ease-in-out infinite; animation-delay: 4s; }
						.rot-word:nth-child(3) { animation: rotCycle 12s ease-in-out infinite; animation-delay: 8s; }
						.rot-word:nth-child(4) { animation: rotCycle 12s ease-in-out infinite; animation-delay: 12s; }

						@keyframes rotCycle {
							0% {
								opacity: 0;
								transform: translate(-50%, 20px) scale(0.98);
							}
							8% {
								opacity: 1;
								transform: translate(-50%, 0) scale(1);
							}
							30% {
								opacity: 1;
								transform: translate(-50%, 0) scale(1);
							}
							40% {
								opacity: 0;
								transform: translate(-50%, -20px) scale(0.98);
							}
							100% {
								opacity: 0;
								transform: translate(-50%, -20px) scale(0.98);
							}
						}
						`}</style>
						{/* Placeholder for main media/content over the background */}
						<div className="relative z-10 w-full flex items-center justify-center" aria-hidden>
							{/* Add any foreground media here if needed */}
						</div>
					</div>
				</div>
			</div>	
		</section>
	);
}
