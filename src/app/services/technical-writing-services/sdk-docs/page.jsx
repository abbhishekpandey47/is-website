import BookDemo from "./bookDemo";
import SalesHero from "./hero";
import CRMAutomationPage from "./sdk-docs";

export default function HowToGuidesPage() {
    return <div>

        <div className="pt-28">
            < SalesHero />
        </div>

        <div>
        < CRMAutomationPage />
        </div>
        <div         style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}>
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-12"></div>
      <div className="w-full flex justify-center items-center">
        <BookDemo />
      </div>
      </div>
    </div>;
  }
  