import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { Videos } from "../../playbook/developer-marketing/videosData";
import AuditWhatYouGet from "./auditWhatYouGet";
import ContactPopupButton from "./ContactPopupButton";
import HeroHome from "./hero";
import WhyAI from "./howWeWork";
import DeferredSection from "@/Components/DeferredSection";

const Cta = dynamic(() => import("./cta"));
const CaseStudies = dynamic(() => import("@/Components/caseStudies"));
const RedditMarketingSlide = dynamic(() => import("./why"));
const InfraMethodologyTimeline = dynamic(() => import("./methodology"));
const RedditServiceCards = dynamic(() => import("./whatYouGet"));
const StartupHeroSection = dynamic(() => import("./whoThisIsFor"));
const Testimonials = dynamic(() => import("../../services/gtm-content-services-for-yc-startups/testimonials"));
const VideoTestimonials = dynamic(() => import("../../playbook/developer-marketing/testimonials"));
const FAQSection = dynamic(() => import("./FAQ"));
const StatsSection = dynamic(() => import("./numbers"));

export default function RedditMarketingAgencyClient({ respondCaseStudy }) {
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
      <div className="flex flex-col items-center mb-12">
        <ContactPopupButton
          buttonText="Get Free Reddit Audit"
          width="w-52"
          height="h-11"
          textSize="text-sm"
          textWeight="quicksand-semibold"
        />
      </div>

      {/* Defer heavy sections below fold */}
      <DeferredSection rootMargin="500px 0px">
        <div className="mt-8">
          <CaseStudies
            studies={respondCaseStudy}
            heading="Community-Led Growth in Action"
            subheading="Case studies showing how B2B SaaS brands scale visibility and sentiment on Reddit"
            hideLink
          />
        </div>
      </DeferredSection>

      <DeferredSection rootMargin="500px 0px">
        <Testimonials />
      </DeferredSection>

      {/* Video Testimonials Section - Right after written testimonials */}
      <DeferredSection rootMargin="500px 0px">
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
                  <VideoTestimonials
                    className="max-w-6xl"
                    items={Videos.map((video) => ({ ...video, cta: undefined }))}
                  />
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
                  <div className="text-gray-400 text-sm mt-2">
                    Videos: {Videos ? Videos.length : "undefined"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DeferredSection>

      <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] mb-10 mt-6"></div>

      <DeferredSection rootMargin="500px 0px">
        <FAQSection />
      </DeferredSection>

      <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] my-10"></div>

      <DeferredSection rootMargin="500px 0px">
        <Cta />
      </DeferredSection>
    </div>
  );
}

RedditMarketingAgencyClient.propTypes = {
  respondCaseStudy: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tag: PropTypes.string,
      title: PropTypes.string,
      company: PropTypes.string,
      badge: PropTypes.string,
      badgeColor: PropTypes.string,
      desc: PropTypes.string,
      link: PropTypes.string,
      style: PropTypes.string,
      companyImg: PropTypes.string,
      graphImg: PropTypes.string,
    })
  ),
};
