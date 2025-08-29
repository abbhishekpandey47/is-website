"use client"

import FAQ from "./faq";
import RedditPostTemplate from "./hero";
import ToolsSection from "./tools";

export default function Page() {
    return (
        <div className="pt-36">
            <RedditPostTemplate />
            <FAQ />
            <ToolsSection />
        </div>
    )
}

// Example usage:
// const commentData = session.get('comment');
// session.set('comment', { text: 'Hello' });
