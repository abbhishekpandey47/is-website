
import Image from "next/image";
import { clientPaddingMap, serviceClientLogo } from "@/clients";

const getLogoPadding = (filename) => clientPaddingMap[filename] || "p-4";

export default function ClientSection() {
	const logos = serviceClientLogo.slice(0, 15);

	return (
		<section className="w-full py-20 px-4 md:px-0 flex flex-col items-center">
			<div className="w-full max-w-6xl">
				<div className="flex flex-col items-center text-center mb-10">
					<span className="px-4 py-1 rounded-full border border-[#222] text-xs font-medium text-white/80 mb-6">
						Trusted By
					</span>
					<h2 className="text-white font-manrope text-[2.25rem] md:text-[2.75rem] font-medium leading-[1.1] tracking-tight">
						Trusted by high-growth B2B SaaS teams
					</h2>
					<p className="text-white/75 font-manrope text-lg font-medium max-w-2xl mt-4">
						We help teams improve AI search visibility and win technical buyers.
					</p>
				</div>

				<div className="rounded-2xl border border-[#222] overflow-hidden bg-[#0F0F13]">
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
						{logos.map((file, idx) => (
							<div
								key={`${file}-${idx}`}
								className="h-24 sm:h-28 lg:h-28 flex items-center justify-center border-b border-r border-[#222] last:border-r-0"
							>
								<div className={`mix-blend-color-burn ${getLogoPadding(file)}`}>
									<Image
										loading="lazy"
										width={170}
										height={80}
										className="object-contain opacity-90 max-h-12 w-auto"
										src={`/trustedby-bw/bw/${file}`}
										alt="Company logo"
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

