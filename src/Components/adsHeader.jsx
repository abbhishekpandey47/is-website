"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import ContactPopupButton from "../app/lp/reddit-marketing-agency/ContactPopupButton";

const AdsHeader = () => {
  const pathname = usePathname() ?? "";
  const isGeoPage = pathname.startsWith("/services/ai-geo-optimization-agency");
  const auditText = isGeoPage ? "Free AEO audit included" : "Free Reddit audit included";
  return (
    <div className="sticky top-0 z-[999] w-full bg-slate-900 shadow-navshadow p-4 sm:p-0 md:p-0">
      <div className="w-full sm:w-[90vw] md:max-w-6xl p-2 sm:p-3 md:p-4 mx-auto rounded-lg flex justify-between items-center gap-2 sm:gap-4">
        
        <div className="flex justify-center items-center">
          <Image
            loading="lazy"
            width={224}
            height={56}
            src="/logodata/infrasity_logo.png"
            alt="Infrasity Logo"
            className="w-36 h-8 sm:w-36 sm:h-8 md:w-48 md:h-12"
          />
        </div>
        
        <div className="flex flex-col justify-center items-center gap-1">
          <ContactPopupButton
            buttonText="Book a Strategy Call"
            width="w-36 sm:w-44 md:w-52"
            height="h-9 sm:h-10 md:h-11"
            textSize="text-xs sm:text-sm"
            textWeight="quicksand-semibold"
          />
          <p className="text-[0.65rem] sm:text-[0.75rem] text-gray-400">{auditText}</p>
        </div>

      </div>
    </div>
  );
};

export default AdsHeader;
