"use client";
import React, { useState, useEffect, useRef } from "react";

// Custom hook for stats animation
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      setCount(Math.floor(percentage * end));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, isVisible]);

  return { count, countRef };
};

const WhyChooseInfrasity = () => {
  // Stats
  const stats = [
    {
      value: 4000,
      suffix: "+",
      description: "Technical Content pieces developed",
    },
    {
      value: 70,
      suffix: "%",
      description:
        "Lower cost compared to building a full-time DevRel or content team",
    },
    {
      value: 50,
      suffix: "+",
      description: " Trusted by infra founders. Loved by engineering teams.",
    },
  ];
  return (
    <section
      className="w-full px-6 md:px-10"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
      }}
    >
      <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-16"></div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl quicksand-bold text-white mb-16 text-center">
          Why top engineering teams rely on Infrasity for content ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const { count, countRef } = useCountUp(stat.value, 2500);

            return (
              <div
                key={index}
                className={`text-center p-4 ${
                  index < stats.length - 1
                    ? "border-r-0 md:border-r border-white/10"
                    : ""
                }`}
                ref={countRef}
              >
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                  {count}
                  {stat.suffix}
                </h3>
                <p className="text-white/80 text-lg">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseInfrasity;
