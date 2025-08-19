import AIVideoScriptGenerator from "./hero"
import BlackMarquee from "./marquee"
import ClutchBadge from "./clutch"
import VideoScriptContent from "./content"
import AIScriptStep from "./step"
import Hero2 from "./hero2"

export default function Page() {
    return (
        <div className="" >
        <AIVideoScriptGenerator />
        <Hero2 />
        <ClutchBadge />
        <BlackMarquee />
        <VideoScriptContent />
        <AIScriptStep />
        </ div>
    )
}