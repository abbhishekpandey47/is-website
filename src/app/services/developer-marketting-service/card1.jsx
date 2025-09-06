"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const words = [
  { text: "We take developer.", video: "/landingfolio/Interviews.mp4", poster: "/videos/home/interviews-section/interviews-poster.jpg" },
  { text: "marketing off your.", video: "/landingfolio/sales.mp4", poster: "/videos/home/interviews-section/sales-calls-poster.jpg" },
  { text: "plate.", video: "/landingfolio/home.mp4", poster: "/videos/home/interviews-section/homework-poster.jpg" },
  { text: "so adoption.", video: "/landingfolio/meeting.mp4", poster: "/videos/home/interviews-section/meetings-poster.jpg" },
  { text: "doesn't slip.", video: "https://cluely.com/videos/home/interviews-section/really-everything.mp4", poster: "/videos/home/interviews-section/really-everything-poster.jpg" },
];

export default function VideoTextHero() {
  const [active, setActive] = useState(0);
  const [videoReady, setVideoReady] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const getMaskId = (index) => `text-mask-${index}`;

  const handleVideoReady = (index) => {
    setVideoReady(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section className="relative mx-auto w-full max-w-7xl px-5 md:px-8 py-20">
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none">
        <defs>
          {words.map((word, index) => (
            <mask key={index} id={getMaskId(index)}>
              <text
                x="0"
                y="40"  
                fill="white"
                fontSize="48" 
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
        <span className="block text-lg font-medium leading-[1.75] -tracking-[0.04em] text-zinc-400 md:text-xl lg:text-xl xl:text-[20px]">
          It's time to cheat
        </span>
        
        <h2 className="relative block font-[quicksand] text-[20px] leading-tight font-semibold md:text-[32px] lg:text-[40px] xl:text-[48px]">
          {words.map((word, index) => (
            <span
              key={index}
              className="relative inline-block pr-3 transition-all duration-700 ease-in-out transform-gpu will-change-transform"
            >
              <span 
                className={`relative z-10 bg-gradient-to-br from-gray-200 to-zinc-400 bg-clip-text text-transparent transition-opacity duration-300 ${
                  active === index && videoReady[index] ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {word.text}
              </span>
              
              {active === index && (
                <video
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-opacity duration-300 ${
                    videoReady[index] ? 'opacity-100' : 'opacity-0'
                  }`}
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
                  onCanPlayThrough={() => handleVideoReady(index)}
                >
                  <source src={word.video} type="video/mp4" />
                </video>
              )}
            </span>
          ))}
        </h2>

        {/* CTA  */}
        <div className="mt-6 flex flex-col items-start justify-center gap-y-8">
          <div className="mt-10 gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="group relative inline-flex rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow"
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(108,91,233,0.6)_0%,rgba(108,91,233,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </span>
              <div className="relative z-10 rounded-full bg-zinc-950 px-6 py-2 ring-1 ring-white/10">
                Book a demo
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#6c5be9]/0 via-[#6c5be9]/90 to-[#6c5be9]/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}