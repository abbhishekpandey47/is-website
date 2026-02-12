import Home from "./Componets/home";
import SecondSection from "./Componets/secondSection";
// import ThirdSection from "./Componets/thirdSection";
import Testimonials from "../../lp/reddit-marketing-agency/testimonials";
import FAQ from "./Componets/faq";
import CTA from "../developer-marketing-agency/cta";
import CaseStudies from "./Componets/caseStudies";
import AEOReportSection from "./Componets/AEOReportSection";
import ServiceHighlights from "./Componets/serviceHighlights";
import FourthSection from "./Componets/FourthSection";
import FifthSection from "./Componets/FifthSection";
import Cta from "./Componets/Cta";
import { createMetadata } from "@/utils/metadata";
// import ClientSection from "./Componets/clientSection";

export const metadata = createMetadata(
  'AI Generative Engine Optimization Agency | GEO & AI Search Visibility',
  'We provide Generative Engine Optimization services that improve discoverability across AI search platforms through entity SEO, structured content and GEO strategy.',
  'https://www.infrasity.com/services/ai-geo-optimization-agency'
);



export default async function LandingPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const isAdsVariant = resolvedSearchParams?.app === "ads";
  return (
    <main>
      <Home isAdsVariant={isAdsVariant} />
      {/* <ClientSection/> */}
      <FourthSection />
      <SecondSection />
      {/* <ThirdSection /> */}
      <AEOReportSection />
      <FifthSection />
      <Testimonials
        heading="Trusted by Leading B2B SaaS, DevTools, and AI Startups"
        highlight=""
        trailing=""
        subHeading="Hear from the teams behind fast-growing SaaS and AI companies"
        wrapperClassName="text-center max-w-5xl mx-auto"
        headingClassName="text-2xl md:text-4xl font-semibold text-white"
        highlightClassName="text-2xl md:text-4xl font-semibold text-white"
        subHeadingClassName="text-white/70 text-base md:text-lg"
        headingStyle={{ fontFamily: 'Manrope, sans-serif' }}
        showDivider={false}
      />
      <Cta isAdsVariant={isAdsVariant} />
      <FAQ />
    </main>
  );
}
