import CalendarBooking from "../../calendarButton";
import ContactPopupButton from "../../lp/reddit-marketing-agency/ContactPopupButton";

export default function ServiceHighlights({ isAdsVariant = false }) {
	const cardBgSvg = "url(\"data:image/svg+xml,%3Csvg%20width%3D%27410%27%20height%3D%27449%27%20viewBox%3D%270%200%20410%20449%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20clip-path%3D%27url(%23clip0_195_6855)%27%3E%3Crect%20width%3D%27410%27%20height%3D%27449%27%20rx%3D%2722.948%27%20fill%3D%27%230E0B1B%27%2F%3E%3Cg%20opacity%3D%270.5%27%20filter%3D%27url(%23filter0_f_195_6855)%27%3E%3Crect%20width%3D%27459.819%27%20height%3D%27384.712%27%20transform%3D%27matrix(-0.79866%20-0.601782%20-0.601782%200.79866%20634.551%20289.562)%27%20fill%3D%27url(%23paint0_linear_195_6855)%27%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cdefs%3E%3Cfilter%20id%3D%27filter0_f_195_6855%27%20x%3D%27-57.2498%27%20y%3D%27-80.1976%27%20width%3D%27784.849%27%20height%3D%27770.063%27%20filterUnits%3D%27userSpaceOnUse%27%20color-interpolation-filters%3D%27sRGB%27%3E%3CfeFlood%20flood-opacity%3D%270%27%20result%3D%27BackgroundImageFix%27%2F%3E%3CfeBlend%20mode%3D%27normal%27%20in%3D%27SourceGraphic%27%20in2%3D%27BackgroundImageFix%27%20result%3D%27shape%27%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%2746.5243%27%20result%3D%27effect1_foregroundBlur_195_6855%27%2F%3E%3C%2Ffilter%3E%3ClinearGradient%20id%3D%27paint0_linear_195_6855%27%20x1%3D%27459.819%27%20y1%3D%271.69576e-05%27%20x2%3D%27-70.9646%27%20y2%3D%27196.769%27%20gradientUnits%3D%27userSpaceOnUse%27%3E%3Cstop%20stop-color%3D%27%230D0A1A%27%2F%3E%3Cstop%20offset%3D%270.716097%27%20stop-color%3D%27%23473B79%27%20stop-opacity%3D%270.8%27%2F%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%239B91C6%27%20stop-opacity%3D%270.8%27%2F%3E%3C%2FlinearGradient%3E%3CclipPath%20id%3D%27clip0_195_6855%27%3E%3Crect%20width%3D%27410%27%20height%3D%27449%27%20rx%3D%2722.948%27%20fill%3D%27white%27%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E\")";
	const cardBgSvgWide = "url(\"data:image/svg+xml,%3Csvg%20width%3D%27729%27%20height%3D%27450%27%20viewBox%3D%270%200%20729%20450%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20clip-path%3D%27url(%23clip0_195_6843)%27%3E%3Crect%20width%3D%27729%27%20height%3D%27450%27%20rx%3D%2722.948%27%20fill%3D%27%230E0B1B%27%2F%3E%3Cg%20opacity%3D%270.5%27%20filter%3D%27url(%23filter0_f_195_6843)%27%3E%3Crect%20x%3D%27573.052%27%20y%3D%27230.149%27%20width%3D%27459.819%27%20height%3D%27384.712%27%20transform%3D%27rotate(143.002%20573.052%20230.149)%27%20fill%3D%27url(%23paint0_linear_195_6843)%27%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cdefs%3E%3Cfilter%20id%3D%27filter0_f_195_6843%27%20x%3D%27-118.749%27%20y%3D%27-170.154%27%20width%3D%27784.849%27%20height%3D%27770.063%27%20filterUnits%3D%27userSpaceOnUse%27%20color-interpolation-filters%3D%27sRGB%27%3E%3CfeFlood%20flood-opacity%3D%270%27%20result%3D%27BackgroundImageFix%27%2F%3E%3CfeBlend%20mode%3D%27normal%27%20in%3D%27SourceGraphic%27%20in2%3D%27BackgroundImageFix%27%20result%3D%27shape%27%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%2746.5243%27%20result%3D%27effect1_foregroundBlur_195_6843%27%2F%3E%3C%2Ffilter%3E%3ClinearGradient%20id%3D%27paint0_linear_195_6843%27%20x1%3D%271032.87%27%20y1%3D%27230.149%27%20x2%3D%27502.087%27%20y2%3D%27426.918%27%20gradientUnits%3D%27userSpaceOnUse%27%3E%3Cstop%20stop-color%3D%27%230D0A1A%27%2F%3E%3Cstop%20offset%3D%270.716097%27%20stop-color%3D%27%23473B79%27%20stop-opacity%3D%270.8%27%2F%3E%3Cstop%20offset%3D%271%27%20stop-color%3D%27%239B91C6%27%20stop-opacity%3D%270.8%27%2F%3E%3C%2FlinearGradient%3E%3CclipPath%20id%3D%27clip0_195_6843)%27%3E%3Crect%20width%3D%27729%27%20height%3D%27450%27%20rx%3D%2722.948%27%20fill%3D%27white%27%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E\")";
	
	
	const cards = [
		{
			title: "AEO/GEO Services",
			text: "Get your product cited when developers ask ChatGPT, Claude, or Perplexity. We audit your AI search visibility, optimize content structure with FAQ schema, and build prompt-aligned pages that LLMs actually reference.",
			img: "/developerMarketing/1.png",
			className: "md:col-span-3",
		},
    {
			title: "Reddit Marketing Services",
			text: "We seed 40+ genuine technical contributions monthly across the subreddits where your buyers evaluate tools. Thread research, context-matched responses, aged accounts, and monthly visibility tracking no spam, just credibility that compounds.",
			img: "/developerMarketing/2.png",
			className: "md:col-span-3",
		},
		{
			title: "Video Production",
			text: "We turn a single product walkthrough into YouTube explainers, doc embeds, shorts, and landing page assets giving your product visibility across every channel where engineers learn and evaluate.",
			img: "/developerMarketing/3.png",
			className: "md:col-span-6",
		},
		{
			title: "Product Documentation",
			text: "API references, SDK guides, integration walkthroughs, quickstart tutorials, and architecture explainers structured code-first so developers go from discovery to first API call in minutes. Built for humans and LLM crawlers alike.",
			img: "/developerMarketing/4.png",
			className: "md:col-span-6",
		},
		{
			title: "UI/UX & Landing Pages",
			text: "Conversion-ready landing pages, feature announcement pages, and comparison layouts designed for developer-first products. Built to turn organic traffic and campaign clicks into signups and first API calls.",
			img: "/developerMarketing/5.png",
			className: "md:col-span-3",
		},
		{
			title: "Technical Writing Services",
			text: "From hands-on tutorials to comparison pages and SDK examples we create the technical content that ranks on Google, gets cited by AI models, and answers the questions developers actually search for. Each piece ships with code snippets, diagrams, and FAQ blocks.",
			img: "/developerMarketing/6.png",
			className: "md:col-span-3",
		}
	];

	return (
		<section className="relative w-full py-20 px-4 overflow-hidden">
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.35),_rgba(2,6,23,0)_55%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(14,165,233,0.2),_rgba(2,6,23,0)_50%)]" />
			</div>
			
			<div className="max-w-8xl mx-auto text-center mb-14">
				<h2 className="text-2xl md:text-4xl font-semibold text-white mb-4">
					The developer marketing services behind <span className="bg-[#5F64FF] p-1">30+ SaaS startups</span>
				</h2>
				<p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
					How top infra, AI, and SaaS startups scaled credibility without hiring full DevRel teams.
				</p>
			</div>

			<div className="relative max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
					{cards.map((card, index) => (
						<div
							key={index}
							className={`relative rounded-3xl bg-slate-950/95 border border-white/15 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.45)] ${card.className}`}
							style={
								index === 0 || index === 1 || index === 2
									? {
											backgroundImage: cardBgSvg,
											backgroundSize: "cover",
											backgroundPosition: "center",
										}
									: index === 3 || index === 4
										? {
												backgroundImage: cardBgSvgWide,
												backgroundSize: "cover",
												backgroundPosition: "center",
											}
										: undefined
							}
						>
							<div className="relative z-10 p-6 md:p-7">
								<div className="rounded-2xl border border-zinc-700/80 overflow-hidden mb-5">
									<img 
										src={card.img} 
										alt={card.title} 
										className="w-full h-[190px] object-contain" 
										onError={(e) => {
											e.target.style.display = "none";
										}}
									/>
								</div>
								<h3 className="text-white text-lg font-semibold">
									{card.title}
								</h3>
								<p className="text-neutral-400 text-sm mt-3">
									{card.text}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
				  {/* CTA Button */}
						<div className="mt-12 flex justify-center">
						  {isAdsVariant ? (
							<ContactPopupButton
							  buttonText="Book a Demo"
							  width="w-48"
							  height="h-12"
							  textSize="text-base"
							  textWeight="quicksand-semibold"
							/>
						  ) : (
							<CalendarBooking buttonText="Book a Call" />
						  )}
						</div>
		</section>
	);
}
