"use client";
import dynamic from "next/dynamic";
import CalendarBooking from "../../../calendarButton";

const ContactPopupButton = dynamic(
	() => import("../../../lp/reddit-marketing-agency/ContactPopupButton"),
	{
		ssr: false,
		loading: () => (
			<div className="h-11 w-52 rounded-[5px] bg-white/10 animate-pulse" />
		),
	}
);

export default function Cta({ isAdsVariant = false }) {
	return (
		<section className="relative overflow-hidden text-white h-[30rem] my-10">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.35),_transparent_50%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.25),_transparent_60%)]" />
			<div className="pointer-events-none absolute inset-0">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: "url('/aeo/cta.svg')" }}
				/>
			</div>

			<div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex-1 space-y-6">
					<h2 className="text-2xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
						Ready to Get Your Product <span className="bg-[#5F64FF] p-1">Recommended</span> by AI?
					</h2>
					<p className="text-lg text-white/70 md:text-xl" style={{ lineHeight: '1.6' }}>
						We&apos;ll show you where your product stands today and what it takes to get cited across ChatGPT, Claude, and Perplexity.
					</p>
					<div className="flex flex-wrap gap-4">
					   <div className="flex flex-col items-center">
					      {isAdsVariant ? (
					        <ContactPopupButton
					          buttonText="Book a Strategy Call"
					          width="w-52"
					          height="h-11"
					        />
					      ) : (
					        <CalendarBooking text="Book a Demo" />
					      )}
					    </div>
					</div>
				</div>
			</div>
		</section>
	);
}
