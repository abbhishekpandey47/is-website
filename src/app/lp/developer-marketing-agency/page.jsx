"use client"

import Image from "next/image";
import dynamic from "next/dynamic";
import Hero from "./hero";
import Card1 from "./card1";
import NewMarquee from "@/Components/NewMarquee";
const Card2 = dynamic(() => import("./card2"), { ssr: false });
const WhyInfrasity = dynamic(() => import("./WhyInfrasity"), { ssr: false });
const IndustrySection = dynamic(() => import("./IndustrySection"), { ssr: false });
const IntegrationsSection = dynamic(() => import("./IntegrationsSection"), { ssr: false });
const FeatureComparison = dynamic(() => import("./FeatureComparison"), { ssr: false });
const RealResult = dynamic(() => import("./realresults"), { ssr: false });
const Testimonials = dynamic(() => import("./Testimonial"), { ssr: false });
const SuccessStories = dynamic(() => import("../../../Components/SuccessStories"), { ssr: false });
const VideoTestimonials = dynamic(() => import("../../playbook/developer-marketing/testimonials"), { ssr: false });
import { Videos } from "../../playbook/developer-marketing/videosData";
const CTA = dynamic(() => import("./cta"), { ssr: false });

export default function Page() {
  return (
    <div className="">
      <Hero />
      <NewMarquee />
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-8 mb-1"></div>

        <Card1 />
      </div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-0 mb-1"></div>

        <Card2 />
      </div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <WhyInfrasity />
      </div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>

        <IndustrySection />
      </div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-16"></div>

        <IntegrationsSection />
      </div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <FeatureComparison />
      </div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10 mb-12"></div>
        <RealResult />
      </div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10"></div>

        <Testimonials />
      </div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10 mb-12"></div>
        <SuccessStories />
      </div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10 mb-1"></div>
        
        {/* Video Testimonials Section */}
        <div className="relative mt-28">
          {/* Background Blob / Gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #ff79c6, #5b36ff 70%)",
              opacity: 0.3,
              filter: "blur(120px)",
            }}
          ></div>
          <div className="flex justify-center">
          <VideoTestimonials className="max-w-6xl" items={Videos} />
          </div>
        </div>
      </div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10 mb-12"></div>
        <CTA />
      </div>
    </div>
  )
}