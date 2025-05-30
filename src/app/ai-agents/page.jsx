"use client";
import HeroHome from "./hero";
import MarqueePage from "./marquee";
import WhyAI from "./whyai";
import HoverCards from "./contentBox";
import TestimonialCarousel from "./testimonialCarousel";
import MarketingHeadsCarousel from "./marketingHeadsCarousel";

export default function Page() {
  return (
    <div className="text-white overflow-x-hidden overflow-y-hidden">
      <HeroHome />
      <MarqueePage />
      <WhyAI />
      <HoverCards />
      <TestimonialCarousel />
      <MarketingHeadsCarousel />
    </div>
  );
}
