import React from "react";

const securityCards = [
	{
		icon: (
			<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mb-4">
				{/* Shield SVG */}
				<svg width="24" height="30" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8 20C5.683 19.417 3.771 18.087 2.262 16.012C0.753 13.937 -0.001 11.633 0 9.1L0 3L8 0L16 3V9.1C16 11.633 15.246 13.938 13.738 16.013C12.23 18.088 10.317 19.417 8 20ZM6 14H10C10.283 14 10.521 13.904 10.713 13.712C10.905 13.52 11.001 13.283 11 13V10C11 9.717 10.904 9.479 10.712 9.288C10.52 9.097 10.283 9.001 10 9V8C10 7.45 9.804 6.979 9.413 6.588C9.022 6.197 8.551 6.001 8 6C7.449 5.999 6.979 6.195 6.588 6.588C6.197 6.981 6.001 7.451 6 8V9C5.717 9 5.479 9.096 5.288 9.288C5.097 9.48 5.001 9.717 5 10V13C5 13.283 5.096 13.521 5.288 13.713C5.48 13.905 5.717 14.001 6 14ZM7 9V8C7 7.717 7.096 7.479 7.288 7.288C7.48 7.097 7.717 7.001 8 7C8.283 6.999 8.52 7.095 8.713 7.288C8.906 7.481 9.001 7.718 9 8V9H7Z" fill="#fff"/>
				</svg>
			</span>
		),
		title: <><span style={{fontSize:23}}>RegGuard</span><sup>TM</sup> <span style={{fontSize:23}}>Compliance</span></>,
		desc: "Built-in compliance brain that scans all generated content against FDA/DSHEA rules and brand guidelines, automatically enforcing compliance outcomes with tamper-proof audit trails for legal teams.",
	},
	{
		icon: (
			<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mb-4">
				{/* Key SVG */}
				<svg width="20" height="30" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6 9C6.833 9 7.542 8.708 8.125 8.125C8.708 7.542 9 6.833 9 6C9 5.167 8.708 4.458 8.125 3.875C7.542 3.292 6.833 3 6 3C5.167 3 4.458 3.292 3.875 3.875C3.292 4.458 3 5.167 3 6C3 6.833 3.292 7.542 3.875 8.125C4.458 8.708 5.167 9 6 9ZM6.05 22L2 18L4 16L2 14L4 12V11.65C2.8 11.233 1.833 10.508 1.1 9.475C0.367 8.442 0 7.283 0 6C0 4.333 0.583 2.917 1.75 1.75C2.917 0.583 4.333 0 6 0C7.667 0 9.083 0.583 10.25 1.75C11.417 2.917 12 4.333 12 6C12 7.35 11.617 8.529 10.85 9.538C10.083 10.547 9.133 11.251 8 11.65V20Z" fill="#fff"/>
				</svg>
			</span>
		),
		title: "Single Sign-On (SSO)",
		desc: "Streamline team access with enterprise SSO using SAML or OIDC, enhancing security while simplifying user authentication across your organization.",
	},
	{
		icon: (
			<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mb-4">
				{/* Lock SVG */}
				<svg width="24" height="30" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2 21C1.45 21 0.979 20.804 0.588 20.413C0.197 20.022 0.001 19.551 0 19V9C0 8.45 0.196 7.979 0.588 7.588C0.98 7.197 1.451 7.001 2 7H3V5C3 3.617 3.488 2.438 4.463 1.463C5.438 0.488 6.617 0.001 8 0C9.383 -0.001 10.562 0.487 11.538 1.463C12.514 2.439 13.001 3.618 13 5V7H14C14.55 7 15.021 7.196 15.413 7.588C15.805 7.98 16.001 8.451 16 9V19C16 19.55 15.804 20.021 15.413 20.413C15.022 20.805 14.551 21.001 14 21H2ZM8 16C8.55 16 9.021 15.804 9.413 15.413C9.805 15.022 10.001 14.551 10 14C9.999 13.449 9.804 12.979 9.413 12.588C9.022 12.197 8.551 12.001 8 12C7.449 11.999 6.978 12.195 6.588 12.588C6.198 12.981 6.002 13.452 6 14C5.998 14.548 6.194 15.019 6.588 15.413C6.982 15.807 7.453 16.003 8 16ZM5 7H11V5C11 4.167 10.708 3.458 10.125 2.875C9.542 2.292 8.833 2 8 2C7.167 2 6.458 2.292 5.875 2.875C5.292 3.458 5 4.167 5 5V7Z" fill="#fff"/>
				</svg>
			</span>
		),
		title: "Automated Data Protection",
		desc: "Enterprise-grade encryption, automated backups, and secure data retention policies ensure your brand assets and performance data are always protected.",
	},
];

export default function SecuritySection() {
	return (
		<section className="relative py-24 px-4 md:px-0 flex flex-col items-center overflow-hidden">
			{/* Blurred BG */}
			<div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
				<div className="mb-6">
					<span className="px-4 py-1 rounded-full border border-[#222] text-xs font-medium text-white/80 bg-black/30">Security</span>
				</div>
				<h2 className="text-center font-manrope text-white text-[2.8rem] md:text-[3.1rem] font-bold leading-[1.1] tracking-tight mb-4" style={{letterSpacing: '-0.04em'}}>Enterprise-Grade Security & Compliance</h2>
				<p className="text-center text-white/75 font-manrope text-lg font-medium max-w-2xl mb-12" style={{letterSpacing: '-0.02em', lineHeight: '1.5em'}}>Azoma is built with enterprise-grade security and compliance standards to protect your competitive data and ensure seamless integration with your existing security infrastructure.</p>
			</div>
			<div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-8 px-4 md:px-0">
				{securityCards.map((card, idx) => (
					<div key={idx} className="relative bg-[#0F0F13] rounded-2xl p-8 flex flex-col items-start gap-6 shadow-[0_10px_40px_rgba(2,2,6,0.6)] min-h-[240px] border border-[#27272a] overflow-hidden">
						{/* gradient/border subtle inset */}
						<div className="absolute inset-0 rounded-2xl pointer-events-none" style={{boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)'}} />
						{/* dotted texture overlay */}
						<div className="absolute inset-0 rounded-2xl pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'%2322222b\' fill-opacity=\'0.08\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '20px 20px', opacity: 0.14, zIndex: 1}} />

						{/* top-left icon */}
						<div className="relative z-10">{card.icon}</div>

						{/* title + desc */}
						<div className="relative z-10 flex-1">
							<h3 className="font-manrope text-white text-[1.6rem] md:text-[1.75rem] font-semibold mb-3 leading-tight">{card.title}</h3>
							<p className="text-white/80 text-lg leading-relaxed" style={{lineHeight: '1.7'}}>{card.desc}</p>
						</div>

						{/* centered purple glow at bottom */}
						<div className="absolute left-6 right-6 bottom-0 h-20 pointer-events-none overflow-hidden rounded-b-2xl">
							<div className="w-full h-full rounded-b-2xl" style={{background: 'radial-gradient(50% 50% at 50% 100%, #814ac84d 0%, #0000 100%)', filter: 'blur(12px)'}} />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
