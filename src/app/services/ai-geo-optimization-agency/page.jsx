import Home from "./Componets/home";
import SecondSection from "./Componets/secondSection";
import ThirdSection from "./Componets/thirdSection";
import Testimonials from "../../lp/reddit-marketing-agency/testimonials";
import FAQ from "./Componets/faq";
import CTA from "../developer-marketing-agency/cta";
import TrustedMarquee from "@/app/lp/reddit-marketing-agency/TrustedMarquee";
import CaseStudies from "./Componets/caseStudies";
import AEOReportSection from "./Componets/AEOReportSection";
import ServiceHighlights from "./Componets/serviceHighlights";
import FourthSection from "./Componets/FourthSection";
import FifthSection from "./Componets/FifthSection";
import Cta from "./Componets/Cta";

export const metadata = {
  title: 'AI Generative Engine Optimization Agency | GEO & AI Search Visibility',
  description:
    'We provide Generative Engine Optimization services that improve discoverability across AI search platforms through entity SEO, structured content and GEO strategy.',
};



export default function LandingPage() {
  return (
    <main>
      <Home />
      <TrustedMarquee />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      {/* <ServiceHighlights /> */}
      {/* <CaseStudies /> */}
      <Cta />
      <AEOReportSection />
      <Testimonials />
      <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10 mb-12"></div>
      <FAQ />
    </main>
  );
}
