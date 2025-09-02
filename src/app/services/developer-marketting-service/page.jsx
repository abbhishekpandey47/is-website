import Image from "next/image";
import Hero from "./hero";
import Card1 from "./card1";
import FeatureComparison from "./FeatureComparison";
import Card2 from "./card2";
import CTA from "./cta";
import NeonToSupabaseHero from "./NeonToSupabaseHero";
import WhyInfrasity from "./WhyInfrasity";
import Testimonials from "./Testimonial";
import NewMarquee from "./marquee";

export default function Page() {
  return (
    <div className="">
      <Hero />
      <NewMarquee />
      <Card1 />
      <Card2 />
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <NeonToSupabaseHero />
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
        <FeatureComparison />
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
        <CTA />
      </div>
    </div>
  )
}