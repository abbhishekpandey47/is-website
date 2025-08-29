import ClutchBadge from "./clutch"
import VideoScriptContent from "./content"
import FAQSection from "./FAQ"
import AIVideoScriptGenerator from "./hero"
import Hero2 from "./hero2"
import BlackMarquee from "./marquee"
import AIScriptStep from "./step"
import WhyUse from "./whyUse"

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

// Example usage:
// const scriptData = session.get('script');
// session.set('script', { value: 'example' });
