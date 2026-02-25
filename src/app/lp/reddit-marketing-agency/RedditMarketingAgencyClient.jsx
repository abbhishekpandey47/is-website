import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import AuditWhatYouGet from "./auditWhatYouGet";
import HeroHome from "./hero";
import DeferredSection from "@/Components/DeferredSection";

const Cta = dynamic(() => import("./cta"));
const RedditMarketingSlide = dynamic(() => import("./why"));
const InfraMethodologyTimeline = dynamic(() => import("./methodology"));
const RedditServiceCards = dynamic(() => import("./whatYouGet"));
// const StartupHeroSection = dynamic(() => import("./whoThisIsFor"));
const Testimonials = dynamic(() => import("./testimonials"));
const FAQSection = dynamic(() => import("./FAQ"));
const RespondCaseStudy = dynamic(() => import("../../services/reddit-marketing-agency/respondCaseStudy"));
const ConversationToRevenue = dynamic(() => import("../../services/reddit-marketing-agency/conversationToRevenue"));
const SubredditSense = dynamic(() => import("../../services/reddit-marketing-agency/SubredditSense"));
const ProposalShowcase = dynamic(() => import("../../services/reddit-marketing-agency/ProposalShowcase"));

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
