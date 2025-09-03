"use client";
import HeroHome from "./hero";
import MarqueePage from "./marquee";
import WhyAI from "./howWeWork";
import Cta from "./cta";
import RedditMarketingSlide from "./why";
import InfraMethodologyTimeline from "./methodology";
import RedditServiceCards from "./whatYouGet";
import StartupHeroSection from "./whoThisIsFor";
import DownloadPDF from "./download";
import Testimonials from "../gtm-content-services-for-yc-startups/testimonials";
import FAQSection from "./FAQ";
import StatsSection from "./numbers";
import RedditComment from "./redditComment";
import BlogSection from "./blogSection";


export default function Page() {
    return (
        <div className="text-white">
            <HeroHome />
            <StartupHeroSection />
            <RedditMarketingSlide />
            <WhyAI />
            <InfraMethodologyTimeline />
            <RedditServiceCards />
            <StatsSection />
            <RedditComment />
            <DownloadPDF />
            <BlogSection />
            <Testimonials />
            <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] mb-10"></div>
            <Cta />
            <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] my-10"></div>
            <FAQSection />
        </div>
    );
}
