import Home from "./Componets/home";
import SecondSection from "./Componets/secondSection";
import ThirdSection from "./Componets/thirdSection";
import NewMarquee from "@/Components/NewMarquee.jsx";
import Testimonials from "./Componets/testimonial";
// import IntegrationSection from "./Componets/integrationSection";
// import SecuritySection from "./Componets/securitySection";
import FAQ from "./Componets/faq";
import CTA from "../services/developer-marketing-agency/cta";

export default function LandingPage() {
  return (
    <main>
      <Home />
      <NewMarquee />
      <SecondSection />
      <ThirdSection />
      <Testimonials />
      {/* <IntegrationSection /> */}
      {/* <SecuritySection /> */}
      <FAQ />
      <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10 mb-12"></div>
      <CTA />
    </main>
  );
}
