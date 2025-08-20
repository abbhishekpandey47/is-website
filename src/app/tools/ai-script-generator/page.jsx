import AIVideoScriptGenerator from "./hero"
import BlackMarquee from "./marquee"
import ClutchBadge from "./clutch"
import VideoScriptContent from "./content"
import AIScriptStep from "./step"
import Hero2 from "./hero2"
import WhyUse from "./whyUse"
import FAQSection from "./FAQ"

export default function Page() {
    return (
        <div className="" >
        <AIVideoScriptGenerator />
        <Hero2 />
        <ClutchBadge />
        <BlackMarquee />
        <VideoScriptContent />
        <AIScriptStep />
        <WhyUse />
        <FAQSection />
        </ div>
    )
}