import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import AuditWhatYouGet from "./auditWhatYouGet";
import HeroHome from "./hero";
import WhyAI from "./howWeWork";
import DeferredSection from "@/Components/DeferredSection";

const Cta = dynamic(() => import("./cta"));
const RedditMarketingSlide = dynamic(() => import("./why"));
const InfraMethodologyTimeline = dynamic(() => import("./methodology"));
const RedditServiceCards = dynamic(() => import("./whatYouGet"));
// const StartupHeroSection = dynamic(() => import("./whoThisIsFor"));
const Testimonials = dynamic(() => import("./testimonials"));
const FAQSection = dynamic(() => import("./FAQ"));
const StatsSection = dynamic(() => import("./numbers"));
const Threadflow = dynamic(() => import("./threadflow"));
const TrustedMarquee = dynamic(() => import("./TrustedMarquee"));
const RespondCaseStudy = dynamic(() => import("../../services/reddit-marketing-agency/respondCaseStudy"));
const ConversationToRevenue = dynamic(() => import("../../services/reddit-marketing-agency/conversationToRevenue"));

export default function RedditMarketingAgencyClient() {
  return (
    <>
    <div
      className="text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/reddit/bgstar.svg')",
        backgroundPosition: 'center',
      }}
    >
      <HeroHome />
      <AuditWhatYouGet />
      {/* <StartupHeroSection /> */}
      <RedditMarketingSlide />
      <ConversationToRevenue/>
      <Threadflow />
      <WhyAI />
      <InfraMethodologyTimeline />
      <RedditServiceCards />
      <RespondCaseStudy />
      <StatsSection />

      <DeferredSection rootMargin="500px 0px">
        <Testimonials />
      </DeferredSection>

    </div>
    <div>
      <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] mb-10 mt-6"></div>

      <DeferredSection rootMargin="500px 0px">
        <FAQSection />
      </DeferredSection>

      <div className="w-full h-px shadow-[#877aeb] bg-gradient-to-r from-pink-500/5 via-[#877aeb] to-pink-[#877aeb] pb-[2px] my-10"></div>

      <DeferredSection rootMargin="500px 0px">
        <Cta />
      </DeferredSection>
    </div>
    </>
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
