import HeroSection from "./components/HeroSection";
import Marquee from "./components/marqee";
import MasterPlaybookPage from "./components/MasterPlaybookPage";

import PlaybooksSection from "./components/PlaybooksSection";
import PlaybooksSection3 from "./components/PlaybooksSection3";
import PlaybookPillars4 from "./components/PlaybooksCardsSection4";
import ProcessSecion from "./components/ProcessSection";
import TemplatesToolsPage from "./components/TemplatesToolsPage";
import WhoThisIsFor from "./components/WhoThisIsFor";
import Cta from "./components/cta";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
export default function LandingPage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <HeroSection />
     <Marquee/>
      <PlaybookPillars4 />
      <MasterPlaybookPage />
      <PlaybooksSection />
      <PlaybooksSection3 />
      <ProcessSecion/>
      <TemplatesToolsPage/>
      <WhoThisIsFor/>
      <Cta/>
      
    </div>
  );
}
