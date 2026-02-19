import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import AuditWhatYouGet from "../../lp/reddit-marketing-agency/auditWhatYouGet";
import HeroHome from "../../lp/reddit-marketing-agency/hero";
import WhyAI from "../../lp/reddit-marketing-agency/howWeWork";
import DeferredSection from "@/Components/DeferredSection";
import ConversationToRevenue from "./conversationToRevenue";
import RespondCaseStudy from "./respondCaseStudy";

const Cta = dynamic(() => import("../../lp/reddit-marketing-agency/cta"));
const RedditMarketingSlide = dynamic(() => import("../../lp/reddit-marketing-agency/why"));
const InfraMethodologyTimeline = dynamic(() => import("../../lp/reddit-marketing-agency/methodology"));
const RedditServiceCards = dynamic(() => import("../../lp/reddit-marketing-agency/whatYouGet"));
// const StartupHeroSection = dynamic(() => import("../../lp/reddit-marketing-agency/whoThisIsFor"));
const Testimonials = dynamic(() => import("../../lp/reddit-marketing-agency/testimonials"));
const FAQSection = dynamic(() => import("../../lp/reddit-marketing-agency/FAQ"));
const StatsSection = dynamic(() => import("../../lp/reddit-marketing-agency/numbers"));
const Threadflow = dynamic(() => import("../../lp/reddit-marketing-agency/threadflow"));
const SubredditSense = dynamic(() => import("./SubredditSense"));
const ProposalShowcase = dynamic(() => import("./ProposalShowcase"));
const TrustedMarquee = dynamic(() => import("../../lp/reddit-marketing-agency/TrustedMarquee"));

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
      <HeroHome customPadding={"pt-44"}/>
      <AuditWhatYouGet />
      {/* <StartupHeroSection /> */}
      <RedditMarketingSlide />
      <ConversationToRevenue/>
      <Threadflow />
      <ProposalShowcase />
      <SubredditSense />
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