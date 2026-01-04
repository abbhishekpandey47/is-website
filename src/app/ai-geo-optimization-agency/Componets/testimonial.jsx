
"use client";
import Image from "next/image";
import TypewriterText from "../../../Components/TypewriterText";


const testimonialsData = [
	{
		name: "Cindy Blake",
		quote: "Infrasity was quick to onboard and understand how to best show off the capabilities of Firefly's cloud asset management. Team has been super responsive and collaborative.",
		title: "VP Marketting, Firefly",
		avatar: "/Testimon/cindyFirefly.jpg",
		logo: null,
		logoAlt: "",
		bgPattern: null,
		companyLogo:"/trustedby/white/firefly.png",
		about:"/ YC-backed cloud governance platform"
	},
	{
		name: "Josh",
		quote: "The Infrasity team has been fantastic to work with. Their attention to detail and level of accuracy is top notch. I'd fully recommend their services to anyone.",
		title: "Co-Founder, Terrateam",
		avatar: "/Testimon/joshTerraTeam.jpg",
		logo: null,
		logoAlt: "",
		bgPattern: null,
        companyLogo:"/trustedby/white/terrateam.png",
		about:"/ Open-source Terraform automation platform"
	},
	{
		name: "Shaked Askayo",
		quote: "Infrasity's creative content has significantly enhanced the visibility and appeal of our product in a competitive market. Crafting content that engages our audience and eloquently highlights the advanced capabilities of Kubiya.ai.",
		title: "CTO, Kubiya.ai",
		avatar: "/Testimon/Shaked.png",
		logo: null,
		logoAlt: "",
		bgPattern: null,
		companyLogo:"/trustedby/white/kubiya.png",
		about:"/ YC-backed AI DevOps platform"
	},
	{
		name: "Frank Weissmann",
		quote: "Infrasity's work has improved the client's SEO, earning a score of over 75%. They've also enabled the client to onboard end customers faster. Moreover, the team listens to the client's content needs, produces work that aligns with their conversation and delivers output in a quick turnaround time.",
		title: "Customer Success Lead, Firefly.ai",
		avatar: "/Testimon/Frank.jpg",
		logo: null,
		logoAlt: "",
		bgPattern: null,
		companyLogo:"/trustedby/white/firefly.png",
		about:"/ YC-backed cloud governance platform"
	},
	{
		name: "Igal Zeifman",
		quote: "Infrasity provided exceptional tech content on infrastructure engineering, with deep expertise in Terraform and the tech stack. Their collaborative approach and hands-on, developer-focused writing make their work impactful. Highly recommend them for technical content creation.",
		title: "VP Marketing, Env0",
		avatar: "/Testimon/igalEnv0.jpg",
		logo: null,
		logoAlt: "",
		bgPattern: null,
		companyLogo:"/trustedby-bw/bw/env0-infra-1.png",
		about:"/ Insight Partners–backed infrastructure automation platform"
	},
	{
		name: "Debosmit Ray",
		quote: "Infrasity has helped us create technical content, product documentation, and recipe libraries for integrating DevZero with different tech stacks. Their product videos showcase our key features, making it easier to engage users. A great content partner in our journey!",
		title: "Founder, DevZero",
		avatar: "/Testimon/devzeroDebo1.png",
		logo: null,
		logoAlt: "",
		bgPattern: null,
		companyLogo:"/trustedby/white/devzero.png",
		about:"/ Cloud development platform"
	}
];

function TestimonialCard({ quote, name, title, avatar, logo, logoAlt, bgPattern, companyLogo, about }) {
	return (
		<div className="framer-154pkg relative rounded-2xl border border-[#23232b] bg-[#18181c]/90 shadow-xl flex flex-col overflow-hidden" data-border="true" data-framer-name={name}>
			{/* Border Top */}
			<div className="framer-cis7t4 w-full h-[0.1rem] bg-gradient-to-r from-[#8a6fff] via-[#0fc7ff] to-[#8a6fff]" data-framer-name="Border Top"></div>
			{/* Top tiled background (uses bgPattern if provided, otherwise a default tile) */}
			<div
				className="framer-1rd8rw0 absolute left-0 right-0 top-0 h-16 md:h-16 z-0 pointer-events-none rounded-t-2xl overflow-hidden"
				style={{
					backgroundImage: `url(${bgPattern || 'https://framerusercontent.com/images/NnHLCsLlyjdTyS5xBtx645Fut4U.webp?width=500&height=500'})`,
					backgroundRepeat: 'repeat',
					backgroundPosition: 'left top',
					backgroundSize: '160px',
					opacity: 0.8,
					maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
					WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
				}}></div>
			{/* Company logo and about section at top left */}
			<div className="grid items-center pt-6 pl-8">
				{companyLogo && (
					<img src={companyLogo} alt="Company Logo" width={60} height={60} className="testimonial-logo object-contain h-10 w-16" />
				)}
				{about && (
					<TypewriterText text={about} className="company-testimonial-about text-xs text-white/70 font-medium" />
				)}
			</div>
			<div className="framer-nidtgl flex-1 flex flex-col justify-between relative z-10 p-8 pt-4">
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
							<span style={{position: 'absolute', inset: 0, borderRadius: '100%', overflow: 'hidden'}}>
								<img src={avatar} alt={name} width={48} height={48} style={{display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover', objectPosition: 'center'}} />
							</span>
						</div>
					</div>
					<div className="framer-aim7sb" style={{transform: 'translateY(-10%)'}}>
						<p className="framer-text font-sans text-white text-base font-semibold leading-tight mb-0">{name}</p>
						<p className="framer-text text-xs text-white/70 leading-tight mt-1">{title}</p>
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
			<div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
				<div
					className="inset-0 z-0"
					style={{
						backgroundColor: "rgb(15,199,255)",
						filter: "blur(300px)",
						opacity: 0.4,
						width: "60vw",
						height: "30vh",
					}}
					aria-hidden="true"
				/>
			</div>

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
