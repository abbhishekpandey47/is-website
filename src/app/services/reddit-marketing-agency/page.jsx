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
import VideoTestimonials from "../../playbook/developer-marketing/testimonials";
import { Videos } from "../../playbook/developer-marketing/videosData";
import FAQSection from "./FAQ";
import StatsSection from "./numbers";
import RedditComment from "./redditComment";
import BlogSection from "./blogSection";


export default function Page() {
    // Debug logging
    console.log("Reddit Marketing Agency Page - Videos:", Videos);
    console.log("Reddit Marketing Agency Page - Videos length:", Videos ? Videos.length : 'undefined');
    
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
           
            <Testimonials />
            
            {/* Video Testimonials Section - Right after written testimonials */}
            <div className="mt-16">
              <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-12"></div>
              
              <div className="relative">
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
                  {Videos && Videos.length > 0 ? (
                    <VideoTestimonials className="max-w-6xl" items={Videos} />
                  ) : (
                    <div className="text-center p-8">
                      <div className="text-white text-lg">Video testimonials loading...</div>
                      <div className="text-gray-400 text-sm mt-2">Videos: {Videos ? Videos.length : 'undefined'}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
              }}
            >
              <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-12"></div>
             
              <BlogSection />
            </div>
            <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] mb-10"></div>
            <Cta />
            <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] my-10"></div>
            <FAQSection />
        </div>
    );
}
