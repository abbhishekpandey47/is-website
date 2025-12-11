import HeroSection from "./components/HeroSection";
import MasterPlaybookPage from "./components/MasterPlaybookPage";
import PlaybookPillars from "./components/PlaybookPillars";
export default function LandingPage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <HeroSection />
      <MasterPlaybookPage/>
      <PlaybookPillars/>
          </div>
  );
}
