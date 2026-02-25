import dynamic from "next/dynamic";
import AuditWhatYouGet from "../../lp/reddit-marketing-agency/auditWhatYouGet";
import HeroHome from "../../lp/reddit-marketing-agency/hero";
import DeferredSection from "@/Components/DeferredSection";
import ConversationToRevenue from "./conversationToRevenue";
import RespondCaseStudy from "./respondCaseStudy";

const Cta = dynamic(() => import("./cta"));
const RedditMarketingSlide = dynamic(() => import("../../lp/reddit-marketing-agency/why"));
const InfraMethodologyTimeline = dynamic(() => import("../../lp/reddit-marketing-agency/methodology"));
const RedditServiceCards = dynamic(() => import("../../lp/reddit-marketing-agency/whatYouGet"));
// const StartupHeroSection = dynamic(() => import("../../lp/reddit-marketing-agency/whoThisIsFor"));
const Testimonials = dynamic(() => import("../../lp/reddit-marketing-agency/testimonials"));
const FAQSection = dynamic(() => import("../../lp/reddit-marketing-agency/FAQ"));
const StatsSection = dynamic(() => import("../../lp/reddit-marketing-agency/numbers"));
const SubredditSense = dynamic(() => import("./SubredditSense"));
const ProposalShowcase = dynamic(() => import("./ProposalShowcase"));


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
                {/* Background SVG */}
      <div className="w-full pointer-events-none" aria-hidden="true">
        <img src="/reddit/betweenBg.svg" alt="" className="absolute w-full z-0" />
      </div>
      {/* <StartupHeroSection /> */}
      <ConversationToRevenue/>
            <div className="w-full pointer-events-none" aria-hidden="true">
        <img src="/reddit/auditBg.svg" alt="" className="absolute w-full z-0" />
      </div>
   
      <ProposalShowcase />
      <SubredditSense />
      <InfraMethodologyTimeline />
   <div className="w-full pointer-events-none" aria-hidden="true">
        <img src="/reddit/betweenBg.svg" alt="" className="absolute w-full z-0" />
      </div>
      <RedditMarketingSlide />
      {/* <WhyAI /> */}

      <RedditServiceCards />
      <RespondCaseStudy />
      {/* <StatsSection /> */}
      <DeferredSection rootMargin="500px 0px">
        <Testimonials />
      </DeferredSection>
      <DeferredSection rootMargin="500px 0px">
        <Cta />
      </DeferredSection>
    </div>
    <div>
      <DeferredSection rootMargin="500px 0px">
        <FAQSection />
      </DeferredSection>
    </div>
    </>
  );
}