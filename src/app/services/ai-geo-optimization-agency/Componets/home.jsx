"use client";
import Image from "next/image";
import Link from "next/link";
import TrustedMarquee from "@/app/lp/reddit-marketing-agency/TrustedMarquee";



export default function HeroSection() {
  return (
    <section className="w-full flex flex-col pb-10 items-center justify-end bg-transparent">
      {/* Card background image */}
      <div className="relative w-full shadow-2xl overflow-hidden -mt-18">
        <Image
          src="/aeo/aeoHome.svg"
          alt="Home Background"
          fill
          priority
          className="absolute inset-0 object-cover"
          style={{ top: "-3rem" }}
        />
        {/* Content above image */}
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-8 -pb-28 px-4 mt-[21rem]">
          <h1 className="text-5xl md:text-5xl font-bold text-white mb-4 leading-tight">When Buyers Ask AI About Your Category, Be the Answer</h1>
          <p className="text-lg md:text-xl text-white/80 mb-6">AEO/GEO services for B2B SaaS and AI companies to increase visibility, citations, and share of voice across leading AI engines.</p>
          <Link href="/contact">
            <button className="mt-4 mb-4 px-4 py-2 rounded-xl bg-[#6F74FF] text-white font-semibold text-base shadow-lg hover:bg-[#473b79] transition">Book a Call</button>
          </Link>
        </div>
             <TrustedMarquee
        heading=""
        highlight=""
        wrapperClassName="text-center max-w-5xl mx-auto"
        headingClassName="text-2xl md:text-4xl font-semibold text-white"
        highlightClassName="bg-clip-text text-transparent bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#6366f1]"
        headingStyle={{ fontFamily: 'Manrope, sans-serif' }}
        spacingClassName="pt-0"
      />
      </div>
   
    </section>
  );
}
