import Link from 'next/link';

export default function Cta() {
	return (
		<section className="relative overflow-hidden text-white h-[30rem] py-12 my-12">
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
					<h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-[3.75rem]">
						Want to Own AI Search Visibility
					</h2>
					<p className="text-lg text-white/70 md:text-xl" style={{ lineHeight: '1.6' }}>
						Stop watching competitors rank. Let's build your strategy to own the space.
					</p>
					<div className="flex flex-wrap gap-4">
						<Link
							href="/contact"
							className="rounded-lg bg-[#5F64FF] px-8 py-3 text-lg font-semibold text-white shadow-[0_10px_35px_rgba(95,100,255,0.35)] transition hover:bg-[#3e43ff]"
						>
							Book a Demo
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
