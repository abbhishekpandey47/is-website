"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const sectionRef = useRef(null);
  const [scrollYProgress, setScrollYProgress] = useState(null);
  const controls = useAnimation();
  const graphRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [hoveredNode, setHoveredNode] = useState(null);

  const topics = [
    "6 core pillars of developer marketing: communities, content, videos, distribution, docs & landing pages",
    "Why → Try → Buy → Fly model: the modern developer journey that actually converts",
    "Real case studies: How we drove 781% organic traffic growth for Firefly.ai",
    "Developer personas, pain points, and decision-making processes that matter",
    "ROI metrics that matter: adoption, engagement, advocacy over vanity metrics"
  ];

  const standardEasing = [0.25, 0.1, 0.25, 1];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: standardEasing,
      },
    },
  };

  const outerNodePulseVariants = {
    animate: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 1.5,
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 lg:px-14 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-4xl font-bold text-white leading-tight">
            What is the{" "} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600">
             Playbook </span> About?
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 lg:w-1/2 flex justify-center items-center">
            <div className="relative justify-center items-center">
              <Image
                src={`/blog_as_service/blogHeading.png`}
                width={800}
                height={600}
                alt="Technical Content Marketing Image"
              />
            </div>
          </div>

          <div className="flex-1 lg:w-1/2 space-y-6">
            <div className="space-y-10">

              <h1 className="text-4xl font-medium text-white leading-tight">
              What You'd Learn If We Handed You Our Entire <span className="text-[#ff4500]">Developer Marketing</span> Strategy 
              </h1>
            </div>

            <div className="space-y-10 text-gray-300 text-lg leading-relaxed">
              <p>

              We've built this playbook from hundreds of developer marketing campaigns across AI, DevTools, and B2B startups. It's not theory. It's the same playbook we've used to drive 781% organic traffic growth, 828% keyword growth, and turn developers into advocates without a single paid ad.
              </p>
            </div>

            <div className="border border-b-[0.5px] border-gray-700"></div>

            <div className="rounded-lg shadow-sm">
              <h1 className="text-3xl font-bold text-white mb-8">
                What to Expect
              </h1>

              <div className="space-y-3">
                {topics.map((topic, index) => (
                  <div key={index} className="flex items-start space-x-2 group">
                    <div className="flex-shrink-0 mt-[6px] flex items-end justify-end">
                      <div className="w-4 h-4 bg-green-700 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed group-hover:text-gray-400 transition-colors duration-200">
                      {topic}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
