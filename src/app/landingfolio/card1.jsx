"use client";
import { useEffect, useState } from "react";

const words = [
  { text: "Interviews.", video: "https://cluely.com/videos/home/interviews-section/interviews.mp4", poster: "/videos/home/interviews-section/interviews-poster.jpg" },
  { text: "Sales calls.", video: "https://cluely.com/videos/home/interviews-section/sales-calls.mp4", poster: "/videos/home/interviews-section/sales-calls-poster.jpg" },
  { text: "Homework.", video: "https://cluely.com/videos/home/interviews-section/homework.mp4", poster: "/videos/home/interviews-section/homework-poster.jpg" },
  { text: "Meetings.", video: "https://cluely.com/videos/home/interviews-section/meetings.mp4", poster: "/videos/home/interviews-section/meetings-poster.jpg" },
  { text: "Really everything.", video: "https://cluely.com/videos/home/interviews-section/really-everything.mp4", poster: "/videos/home/interviews-section/really-everything-poster.jpg" },
];

export default function VideoTextHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const getMaskId = (index) => `text-mask-${index}`;

  return (
    <section className="relative mx-auto w-full max-w-7xl px-5 md:px-8 py-20">
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none">
        <defs>
          {words.map((word, index) => (
            <mask key={index} id={getMaskId(index)}>
              <text
                x="0"
                y="80"
                fill="white"
                fontSize="96"
                fontFamily="quicksand"
                fontWeight="600"
                dominantBaseline="middle"
              >
                {word.text}
              </text>
            </mask>
          ))}
        </defs>
      </svg>

      <div className="max-w-5xl">
        <span className="block text-lg font-medium leading-[1.75] -tracking-[0.04em] text-zinc-400 md:text-xl lg:text-2xl xl:text-[28px]">
          It's time to cheat
        </span>
        
        <h2 className="relative block font-[quicksand] text-[48px] leading-tight font-semibold text-white md:text-[64px] lg:text-[84px] xl:text-[96px]">
          {words.map((word, index) => (
            <span
              key={index}
              className="relative inline-block pr-3 transition-all duration-700 ease-in-out transform-gpu will-change-transform"
            >
              <span 
                className={`relative z-10 ${active === index ? 'text-white/5' : 'text-gray-400'}`}
              >
                {word.text}
              </span>
              
              {active === index && (
                <video
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                  style={{
                    mask: `url(#${getMaskId(index)})`,
                    WebkitMask: `url(#${getMaskId(index)})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'left center',
                    WebkitMaskPosition: 'left center'
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={word.poster}
                >
                  <source src={word.video} type="video/mp4" />
                </video>
              )}
            </span>
          ))}
        </h2>

        {/* CTA  */}
        <div className="w-full mt-10 flex flex-col gap-5 sm:flex-row">
          <a
            href="https://downloads.cluely.com/downloads/cluely-setup.exe"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-11 w-40 items-center justify-center rounded-md 
                       bg-gradient-to-r from-violet-500 to-purple-600 px-6 font-semibold text-white 
                       shadow-lg shadow-violet-800/40 ring-1 ring-violet-400/40 sm:w-[199px] 
                       transition hover:scale-105 hover:shadow-xl"
          >
           <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
<path d="M12.1818 4H4V12.1818H12.1818V4Z" fill="#F9FAFB"/>
<path d="M13.8182 12.1816L22 12.1816L22 3.99982L13.8182 3.99982L13.8182 12.1816Z" fill="#F9FAFB"/>
<path d="M12.1818 13.8184H4V22.0002H12.1818V13.8184Z" fill="#F9FAFB"/>
<path d="M13.8182 22L22 22L22 13.8182L13.8182 13.8182L13.8182 22Z" fill="#F9FAFB"/>
</svg>
            Get for Windows
          </a>
        </div>
      </div>
    </section>
  );
}