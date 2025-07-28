"use client"

import FAQ from "./faq"
import RedditPostTemplate from "./hero"
import ToolsSection from "./tools"

export default function Page() {
    return (
        <div className="pt-36">
            <RedditPostTemplate />
            <FAQ />
            <ToolsSection />
        </div>
    )
}