"use client";
import dynamic from "next/dynamic";
import HeroHome from "./hero";
import MarqueePage from "./marquee";
import WhyAI from "./howWeWork";
const Cta = dynamic(() => import("./cta"), { ssr: false });
const RedditMarketingSlide = dynamic(() => import("./why"), { ssr: false });
const InfraMethodologyTimeline = dynamic(() => import("./methodology"), { ssr: false });
const RedditServiceCards = dynamic(() => import("./whatYouGet"), { ssr: false });
const StartupHeroSection = dynamic(() => import("./whoThisIsFor"), { ssr: false });
const DownloadPDF = dynamic(() => import("./download"), { ssr: false });
const Testimonials = dynamic(() => import("../gtm-content-services-for-yc-startups/testimonials"), { ssr: false });
const VideoTestimonials = dynamic(() => import("../../playbook/developer-marketing/testimonials"), { ssr: false });
import { Videos } from "../../playbook/developer-marketing/videosData";
import CaseStudies from "@/Components/caseStudies";
const FAQSection = dynamic(() => import("./FAQ"), { ssr: false });
const StatsSection = dynamic(() => import("./numbers"), { ssr: false });
const RedditComment = dynamic(() => import("./redditComment"), { ssr: false });
const BlogSection = dynamic(() => import("./blogSection"), { ssr: false });
const Threadflow = dynamic(() => import("./threadflow"), { ssr: false });

const respondCaseStudy = [
  {
    id: 1,
    tag: "AI Messaging Platform",
    title: "0→40% of OPs ranking Top 5",
    company: "Respond.io",
    badge: "Ri",
    badgeColor: "bg-orange-100 text-orange-700",
    desc: "Series A ($7M)",
    link: "/case-studies/respond-io-community-led-growth-case-study",
    style: "object-cover",
    companyImg: "/trustedby/white/respond.png",
    graphImg:
      "https://cdn.prod.website-files.com/644e8b4e20ba395ec31a0017/65df7c6d1d6e96eb38db9165_0-27M.svg",
  },
];


export default function Page() {
    // Debug logging
    console.log("Reddit Marketing Agency Page - Videos:", Videos);
    console.log("Reddit Marketing Agency Page - Videos length:", Videos ? Videos.length : 'undefined');
    
    return (
        <div className="text-white">
            <HeroHome />
              <div className="mt-8">
              <CaseStudies
                studies={respondCaseStudy}
                heading="Community-Led Growth in Action"
                subheading="Case studies showing how B2B SaaS brands scale visibility and sentiment on Reddit"
              />
            </div>
            <StartupHeroSection />
            <RedditMarketingSlide />
            <WhyAI />
            <InfraMethodologyTimeline />
            <RedditServiceCards />
            <StatsSection />
            <RedditComment />
            <Threadflow />
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
