import Link from "next/link";

export default function HeroSection() {
	return (
		<section className="w-full mt-24 flex justify-center items-center overflow-hidden">
	
			<div className="z-10 flex flex-row items-center justify-between w-full max-w-6xl px-6 py-24 gap-12">
				{/* Left Content */}
				<div className="flex-1 flex flex-col gap-6 items-start">
					<div className="flex items-center gap-3 mb-2">
						<span className="inline-flex items-center justify-center rounded-full border border-violet-400/40 bg-black/5 shadow-inner shadow-violet-500/20 p-3">
							{/* Star SVG */}
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 text-violet-200 fill-violet-200">
								<g><path d="M194.82,151.43l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0l-20.3-55.09-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3A7.92,7.92,0,0,1,194.82,151.43Z" opacity="0.2"></path><path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"></path></g>
							</svg>
						</span>
						<span className="text-violet-100 text-lg font-medium">Dominate AI conversations</span>
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-4">
						Get your brand recommended by AI Search
					</h1>
					<p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
						Be discoverable by billions of shoppers using AI Answer Engines like ChatGPT, Google AI Mode, Amazon Rufus, Walmart Sparky, Perplexity etc; via our end-to-end enterprise workflow
					</p>
					<div className="flex gap-4 mt-2">
						<Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-black bg-gradient-to-b from-gray-200 via-white to-gray-200 shadow transition hover:from-white hover:to-gray-100 border border-white/10 backdrop-blur-sm text-sm">
							{/* Play SVG */}
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-5 h-5 fill-black">
								<g><path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path></g>
							</svg>
							Get a Demo
						</Link>
						<Link href="/#faq" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-b from-black/10 to-black/20 border border-white/10 backdrop-blur-sm shadow-inner shadow-white/10 text-sm">
							Learn More
						</Link>
					</div>
				</div>
				{/* Right Content (Video + Canvas + Dot Grid) */}
				<div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
                    		<div className="inset-0 z-0">
				{/* Background video */}
				<video
					src="/Vid BG rvmd.mp4"
					autoPlay
					loop
					muted
					playsInline
					className="w-full h-full object-cover"
				/>
			</div>
				</div>
			</div>
		</section>
	);
}
