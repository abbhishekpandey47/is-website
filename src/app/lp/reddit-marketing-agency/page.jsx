"use client";
import CaseStudies from "@/Components/caseStudies";
import dynamic from "next/dynamic";
import { Videos } from "../../playbook/developer-marketing/videosData";
import AuditWhatYouGet from "./auditWhatYouGet";
import HeroHome from "./hero";
import WhyAI from "./howWeWork";
import ContactPopupButton from "./ContactPopupButton";
const Cta = dynamic(() => import("./cta"), { ssr: false });
const RedditMarketingSlide = dynamic(() => import("./why"), { ssr: false });
const InfraMethodologyTimeline = dynamic(() => import("./methodology"), { ssr: false });
const RedditServiceCards = dynamic(() => import("./whatYouGet"), { ssr: false });
const StartupHeroSection = dynamic(() => import("./whoThisIsFor"), { ssr: false });
// const DownloadPDF = dynamic(() => import("./download"), { ssr: false });
const Testimonials = dynamic(() => import("../../services/gtm-content-services-for-yc-startups/testimonials"), { ssr: false });
const VideoTestimonials = dynamic(() => import("../../playbook/developer-marketing/testimonials"), { ssr: false });
const FAQSection = dynamic(() => import("./FAQ"), { ssr: false });
const StatsSection = dynamic(() => import("./numbers"), { ssr: false });


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
    return (
        <div className="text-white">
            <HeroHome />
            <AuditWhatYouGet />
            <StartupHeroSection />
            <RedditMarketingSlide />
            <WhyAI />
            <InfraMethodologyTimeline />
            <RedditServiceCards />
            <StatsSection />
                  <div className="mt-8">
                        <CaseStudies
                          studies={respondCaseStudy}
                          heading="Community-Led Growth in Action"
                          subheading="Case studies showing how B2B SaaS brands scale visibility and sentiment on Reddit"
                          hideLink
                        />
            </div>
                  <div className="flex flex-col items-center mb-12">
                    <ContactPopupButton
                      buttonText="Get Free Reddit Audit"
                      width="w-52"
                      height="h-11"
                      textSize="text-sm"
                      textWeight="quicksand-semibold"
                    />
                  </div>
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
                    <div className="flex w-full flex-col items-center gap-6">
                      <VideoTestimonials className="max-w-6xl" items={Videos.map(video => ({ ...video, cta: undefined }))} />
                       <div className="flex flex-col items-center my-4">
                    <ContactPopupButton
                      buttonText="Book a Strategy Call"
                      width="w-52"
                      height="h-11"
                      textSize="text-sm"
                      textWeight="quicksand-semibold"
                    />
                  </div>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="text-white text-lg">Video testimonials loading...</div>
                      <div className="text-gray-400 text-sm mt-2">Videos: {Videos ? Videos.length : 'undefined'}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] mb-10 mt-6"></div>
            <FAQSection />
            <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] my-10"></div>

            <Cta />

        </div>
    );
}
