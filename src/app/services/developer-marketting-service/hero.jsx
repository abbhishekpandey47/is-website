"use client";
import Particles from "@/Components/ui/particles";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate transform-gpu pt-28">
      <div className="absolute inset-0 -z-10 top-0 bg-[radial-gradient(70%_80%_at_50%_-20%,rgba(108,91,233,0.5),rgba(255,255,255,0))]" />

      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 
                   [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="hero"
            width="80"
            height="80"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)" />
      </svg>

      <div className="py-24 sm:py-32 lg:pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative mx-auto max-w-3xl text-center">
            <h1 className="font-[quicksand] bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-5xl/[1.07] font-bold tracking-tight text-transparent md:text-7xl/[1.07]">
              The developer marketing engine behind top SaaS startups
            </h1>
            <p className="font-[quicksand]  mt-6 text-lg font-medium text-zinc-400 md:text-xl">
              We work with leading infra and AI companies to transform product features into developer adoption through GitHub repos, community-first content, and technical storytelling.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-y-8">
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
              {/* Learn More */}
              <div className="">
                <a href="/#intro" className="flex flex-col items-center gap-1">
                  <p className="text-sm/6 text-zinc-400 duration-300 group-hover:text-white">
                    Learn more
                  </p>
                  <ArrowDown
                    className="w-4 h-4 text-zinc-400 duration-300 
                               group-hover:translate-y-1.5 group-hover:text-white"
                  />
                </a>
              </div>
            </div>
          </div>


              {/* Top Glow Line */}
              {/* <div className="absolute -top-px right-20 h-2 w-20 
                              [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)] 
                              md:w-32 lg:w-64">
                <div className="h-px w-full animate-starlight-right bg-gradient-to-r from-purple-500/0 via-[rgba(108,91,233,1)] to-purple-500/0"></div>
              </div> */}
{/* 
              <div className="rounded-md bg-zinc-950 ring-1 ring-white/10 lg:rounded-2xl">
                <Image
                  src="/landingfolio/dashboard.webp"
                  alt="App screenshot"
                  width={4200}
                  height={2490}
                  priority
                  className="rounded-md lg:rounded-2xl"
                />
              </div> */}

              {/* Bottom Glow Line */}
              {/* <div className="absolute -bottom-2 left-20 h-2 w-20 
                              [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)] 
                              md:w-32 lg:w-64">
                <div className="h-px w-full animate-starlight-left bg-gradient-to-r from-purple-500/0 via-[rgba(108,91,233,1)] to-purple-500/0"></div>
              </div> */}
            </div>
      </div>

    
        <Particles
              className="absolute inset-0"
              quantity={100}
              ease={80}
              color={"#ffffff"}
              refresh
            />
    </section>
  );
}
