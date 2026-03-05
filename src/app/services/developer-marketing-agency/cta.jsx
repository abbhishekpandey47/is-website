"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const ContactPopupButton = dynamic(
  () => import("../../lp/reddit-marketing-agency/ContactPopupButton"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 md:mt-8 h-12 w-40 rounded-full bg-white/10 animate-pulse" />
    ),
  }
);

export default function CTA({ isAdsVariant = false }) {
  return (
    <section className="max-w-6xl mx-auto my-10 md:my-20 px-4 md:px-0">
    <div className="mx-0 sm:mx-6 md:mx-16 bg-gradient-to-r from-blue-800 to-purple-800 relative flex flex-col items-center rounded-xl p-8 sm:p-12 md:p-16 text-center overflow-hidden bg-cover bg-no-repeat"
    >
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white max-w-xl z-10">
        YC-backed SaaS companies trust Infrasity to drive adoption.<br className="hidden sm:block" />Ready to join them?
      </h2>

      {/* CTA Button */}
      {isAdsVariant ? (
        <div className="mt-6 md:mt-8 z-10">
          <ContactPopupButton
            buttonText="Book a Strategy Call"
            width="w-52"
            height="h-12"
          />
        </div>
      ) : (
        <Link
          href="/contact"
          className="mt-6 md:mt-8 inline-flex items-center text-base md:text-lg rounded-full bg-black px-8 sm:px-10 md:px-14 py-3 sm:py-4 md:py-5 text-white font-medium hover:bg-gray-900 transition z-10"
        >
          Book a Demo
        </Link>
      )}

      {/* Background Decorative Image 1 */}
      <div className="absolute -bottom-5 sm:-bottom-8 md:-bottom-10 left-0 sm:left-1">
        <Image
          src="https://cdn.prod.website-files.com/65030bfd09557ada51fe30e2/6509ed92ac966ebcf5de4dea_Mask%20group%20(13).webp"
          alt="decor"
          width={180}
          height={180}
          className="w-20 sm:w-32 md:w-40 h-auto opacity-50 sm:opacity-75 md:opacity-100"
        />
      </div>

      {/* Background Decorative Image 2 */}
      <div className="absolute -top-5 sm:-top-8 md:-top-10 right-0">
        <Image
          src="https://cdn.prod.website-files.com/65030bfd09557ada51fe30e2/6509ed92c684d5f4210dbe47_Mask%20group%20(14).webp"
          alt="decor"
          width={180}
          height={180}
          className="w-20 sm:w-32 md:w-40 h-auto opacity-50 sm:opacity-75 md:opacity-100"
        />
      </div>
    </div>
    </section>
  );
}
