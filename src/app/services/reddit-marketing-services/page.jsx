"use client";
import HeroHome from "./hero";
import MarqueePage from "./marquee";
import WhyAI from "./howWeWork";
// import HoverCards from "./contentBox";
// import TestimonialCarousel from "./testimonialCarousel";
// import MarketingHeadsCarousel from "./marketingHeadsCarousel";
// import ScrollingServicesSection from "./contentHeades";
import Cta from "./cta";
import RedditMarketingSlide from "./why";
import InfraMethodologyTimeline from "./methodology";
import RedditServiceCards from "./whatYouGet";
import StartupHeroSection from "./whoThisIsFor";
import FireflyClone from "./caseStudy";

export default function Page() {
    return (
        <div className="text-white overflow-x-hidden overflow-y-hidden">
            <HeroHome />
            <RedditMarketingSlide />
            <StartupHeroSection />
            {/* <MarqueePage /> */}
            <WhyAI />
            <InfraMethodologyTimeline />
            <RedditServiceCards />
            <FireflyClone />
            <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] mb-10"></div>

            <Cta />
        </div>
    );
}
