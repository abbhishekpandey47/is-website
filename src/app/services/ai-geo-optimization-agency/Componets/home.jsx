"use client";
import Image from "next/image";
import Link from "next/link";


export default function HeroSection() {
  return (
    <section className="w-full h-[100vh] flex flex-col items-center justify-center bg-transparent pt-24 px-8">
      {/* Card background image */}
      <div className="relative w-full h-[100vh] rounded-3xl shadow-2xl overflow-hidden border">
        <Image
          src="/aeo/aeoHome.svg"
          alt="Home Background"
          fill
          priority
          className="absolute inset-0 object-cover"
        />
        {/* Content above image */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-8 px-4 mt-6">
          <h1 className="text-5xl md:text-5xl font-bold text-white mb-4 leading-tight">When Buyers Ask AI About Your Category, Be the Answer</h1>
          <p className="text-lg md:text-xl text-white/80 mb-6">AEO/GEO services for B2B SaaS and AI companies to increase visibility, citations, and share of voice across leading AI engines.</p>
          <Link href="/contact">
            <button className="mt-4 mb-4 px-4 py-2 rounded-xl bg-[#6F74FF] text-white font-semibold text-base shadow-lg hover:bg-[#473b79] transition">Book a Call</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
