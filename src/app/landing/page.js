import HeroSection from "./components/HeroSection";
import MasterPlaybookPage from "./components/MasterPlaybookPage";
import PlaybookPillars from "./components/PlaybookPillars";
import PlaybooksSection from "./components/PlaybooksSection";
import PlaybooksSection3 from "./components/PlaybooksSection3";
import PlaybookPillars4 from "./components/PlaybooksCardsSection4";
export default function LandingPage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <HeroSection />
      <MasterPlaybookPage/>
      <PlaybookPillars/>
      <PlaybooksSection/>
 <PlaybooksSection3/>
 <PlaybookPillars4/>
          </div>
  );
}
