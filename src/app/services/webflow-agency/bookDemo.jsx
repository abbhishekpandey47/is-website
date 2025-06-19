import React from "react";
import { Zap } from "lucide-react";
import Link from "next/link";

const BookDemo = () => {
  return (
    <div className="w-[65%] bg-[linear-gradient(to_right,#1966ff,#d129ff,#8c1eff)] p-[2px] mt-16 -mb-10 rounded-2xl flex justify-center items-center shadow-2xl backdrop-blur-lg">
      <section className=" w-full bg-[#0D0A1A] relative  rounded-2xl shadow-lg min-h-[50vh] md:min-h-[50vh] lg:min-h-[35vh] overflow-hidden ">
        {/* Stars */}
        <Stars />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
          <h1 className="text-3xlc text-white text-purple sm:text-3xl md:text-3xl quicksand-bold text-center mb-4">
            Trusted by fastest growing B2B SaaS Startups.
          </h1>
          <p className="text-m text-white md:text-lg quicksand-medium text-gray text-center max-w-2xl mb-8">
            Trusted by YC startups. Built for developer-first companies.
          </p>
          <Link href="/book-a-demo" passHref>
            <button className="magic-button group rounded-md px-6 py-3 text-white font-medium text-m transition-all duration-300 hover:scale-105 ">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 transition-transform group-hover:rotate-12" />
                <span className="quicksand-medium">Book Demo</span>
              </div>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const Stars = () => {
  // Generate random positions for the stars
  const smallStars = Array.from({ length: 100 }).map((_, i) => ({
    id: `small-${i}`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    animation:
      i % 3 === 0
        ? "animate-float"
        : i % 3 === 1
        ? "animate-float-delay-1"
        : "animate-float-delay-2",
  }));

  const mediumStars = Array.from({ length: 30 }).map((_, i) => ({
    id: `medium-${i}`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    animation:
      i % 3 === 0
        ? "animate-float"
        : i % 3 === 1
        ? "animate-float-delay-1"
        : "animate-float-delay-2",
  }));

  const largeStars = Array.from({ length: 15 }).map((_, i) => ({
    id: `large-${i}`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    animation:
      i % 3 === 0
        ? "animate-pulse-slow"
        : i % 3 === 1
        ? "animate-float-delay-1"
        : "animate-scale-slow",
  }));

  return (
    <div className="absolute inset-0 z-0">
      {smallStars.map((star) => (
        <div
          key={star.id}
          className={`absolute star-small ${star.animation}`}
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        ></div>
      ))}
      {mediumStars.map((star) => (
        <div
          key={star.id}
          className={`absolute star-medium ${star.animation}`}
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        ></div>
      ))}
      {largeStars.map((star) => (
        <div
          key={star.id}
          className={`absolute star-large ${star.animation}`}
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        ></div>
      ))}
    </div>
  );
};

export default BookDemo;
