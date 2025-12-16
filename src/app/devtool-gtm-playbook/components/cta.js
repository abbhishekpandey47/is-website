"use client";

import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="max-w-6xl mx-auto my-20">
    <div className="mx-6 md:mx-16 bg-gradient-to-r from-blue-800 to-purple-800 relative flex flex-col items-center rounded-xl p-16 text-center overflow-hidden bg-cover bg-no-repeat"
    >
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-white max-w-xl">
        Ready to Build Your <span className="specialtext">Growth Engine</span>?
      </h2>

      {/* Subheading */}
        <p className="text-[white] text-lg md:text-xl mb-10 max-w-2xl mx-auto quicksand-semibold">
          Get the complete playbook and start implementing a systematic approach to developer growth today.
        </p>
      {/* CTA Button */}
    <a
         href="#playbook-pillars" 
        className="mt-8 inline-flex items-center text-lg rounded-full bg-black px-14 py-5 text-white font-medium hover:bg-gray-900 transition"
      >
             Get the Playbook
      </a>

      {/* Background Decorative Image 1 */}
      <div className="absolute -bottom-10 left-1">
        <Image
          src="https://cdn.prod.website-files.com/65030bfd09557ada51fe30e2/6509ed92ac966ebcf5de4dea_Mask%20group%20(13).webp"
          alt="decor"
          width={180}
          height={180}
          className="w-40 h-auto"
        />
      </div>

      {/* Background Decorative Image 2 */}
      <div className="absolute -top-10 right-0">
        <Image
          src="https://cdn.prod.website-files.com/65030bfd09557ada51fe30e2/6509ed92c684d5f4210dbe47_Mask%20group%20(14).webp"
          alt="decor"
          width={180}
          height={180}
          className="w-40 h-auto"
        />
      </div>
    </div>
    </section>
  );
}
