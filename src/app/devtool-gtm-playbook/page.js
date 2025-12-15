import HeroSection from "./components/HeroSection";
import Marquee from "../infrasity-vs-developer-relations-engineer/components/marquee";
import MasterPlaybookPage from "./components/MasterPlaybookPage";
import PlaybookPillars from "./components/PlaybookPillars";
import PlaybooksSection from "./components/PlaybooksSection";
import PlaybooksSection3 from "./components/PlaybooksSection3";
import PlaybookPillars4 from "./components/PlaybooksCardsSection4";
import ProcessSecion from "./components/ProcessSection";
import TemplatesToolsPage from "./components/TemplatesToolsPage";
import WhoThisIsFor from "./components/WhoThisIsFor";
import CTASection from "./components/CTASection";

export default function LandingPage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <HeroSection />
     <Marquee/>
      <MasterPlaybookPage />
      <PlaybookPillars />
      <PlaybooksSection />
      <PlaybooksSection3 />
      <PlaybookPillars4 />
      <ProcessSecion/>
      <TemplatesToolsPage/>
      <WhoThisIsFor/>
      <CTASection/>
      
    </div>
  );
}
