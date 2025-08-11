import AIVideoScriptGenerator from "./hero"
import BlackMarquee from "./marquee"
import ClutchBadge from "./clutch"
import VideoScriptContent from "./content"
import AIScriptStep from "./step"

export default function Page() {
    return (
        <>
        <AIVideoScriptGenerator />
        <ClutchBadge />
        <BlackMarquee />
        <VideoScriptContent />
        <AIScriptStep />
        </>
    )
}