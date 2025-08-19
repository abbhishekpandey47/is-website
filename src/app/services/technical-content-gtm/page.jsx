import CaseStudy from "./caseStudy";
import Cta from "./cta";
import YCStartupLanding from "./hero";
import WhatWeCreate from "./whatWeCreate";
import WhyInfra from "./whyInfra";
import WorkWith from "./workWith";

export default function () {
    return (
        <div className="relative">
            <YCStartupLanding />
            <WorkWith />
            <WhatWeCreate />
            <WhyInfra />
            <CaseStudy />

            {/* Gradient divider */}
            <div
                className="w-6xl h-[1px] m-16"
                style={{
                    background:
                        "radial-gradient(50% 50% at 50% 50%, #6B5BE7 50%, #FFFFFF 100%)",
                }}
            ></div>

            <Cta />
        </div>
    )
}