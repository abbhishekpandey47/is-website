import Image from "next/image";
import {clientWhiteLogo , clientWhiteStyle} from "@/clients";


export default function ClientSection() {
	const logos = clientWhiteLogo.slice(0, 15);
    const clientWhiteStyleMap = clientWhiteStyle;

	return (
		<section className="w-full py-20 px-4 md:px-0 flex flex-col items-center">
			<div className="w-full max-w-6xl">
				<div className="flex flex-col items-center text-center mb-10">
					 <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
          <p className="text-violet-100 text-base font-medium">Trusted</p>
        </div>
					<h2 className="text-white font-manrope text-[2.25rem] md:text-[2.75rem] font-medium leading-[1.1] tracking-tight">
						Trusted by high-growth B2B SaaS teams
					</h2>
					<p className="text-white/75 font-manrope text-lg font-medium max-w-2xl mt-4">
						We help teams improve AI search visibility and win technical buyers.
					</p>
				</div>

				   <div className="overflow-hidden">
					   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
						   {logos.map((file, idx) => {
							   // Calculate if last column or last row for border logic
							   const isLastCol = (idx + 1) % 5 === 0;
							   const isLastRow = idx >= 10; // 15 logos, 5 per row, so last row is idx 10-14
							   let borderClass = " border-dashed";
							   if (!isLastCol) borderClass += " border-r-2";
							   if (!isLastRow) borderClass += " border-b-2";
							   return (
								   <div
									   key={`${file}-${idx}`}
									   className={`h-28 flex items-center justify-center${borderClass} border-[#fff]/30`}
								   >
									   <div className="flex items-center justify-center w-[170px] h-[80px]">
										   <Image
											   loading="lazy"
											   width={150}
											   height={60}
											   className={`${clientWhiteStyleMap[file] || "object-contain"} opacity-90 w-[150px] h-[60px]`}
											   src={`/trustedby/white/${file}`}
											   alt="Company logo"
										   />
									   </div>
								   </div>
							   );
						   })}
					   </div>
				   </div>
			</div>
		</section>
	);
}

