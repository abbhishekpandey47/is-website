"use client";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    const bgSvg = <>
    <svg class="absolute inset-0 -z-10 h-full w-full stroke-white/5 [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]" aria-hidden="true"><defs><pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M.5 200V.5H200" fill="none"></path></pattern></defs><rect width="100%" height="100%" stroke-width="0" fill="url(#hero)"></rect></svg>
    </>
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0a0f1c] to-black text-center px-6">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:30px_30px]">
        <bgSvg />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1
  className="bg-gradient-to-br font-[quicksand] from-white to-zinc-500 bg-clip-text text-transparent text-5xl/[1.07] md:text-7xl/[1.07] font-bold tracking-tight"
>
  Unleash the power of intuitive finance
</h1>


        <p className="mt-6 text-lg font-[quicksand] md:text-xl text-gray-400">
          Say goodbye to outdated financial tools. Every small business owner,
          regardless of background, can now manage their business like a pro.
          <br />
          <span className="block font-[quicksand] mt-2">Simple. Intuitive. And never boring.</span>
        </p>

        {/* Buttons */}
        <div className="mt-10 gap-4 justify-center items-center">
          <button
  type="button"
  className="group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow"
>
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(108,91,233,0.6)_0%,rgba(108,91,233,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
  </span>
  <div className="relative z-10 rounded-full bg-zinc-950 px-6 py-2 ring-1 ring-white/10">
    Join the waitlist
  </div>
  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#6c5be9]/0 via-[#6c5be9]/90 to-[#6c5be9]/0 transition-opacity duration-500 group-hover:opacity-40"></span>
</button>

        </div>
        <div className="mt-10 gap-4 flex justify-center items-center">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            Learn more <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
