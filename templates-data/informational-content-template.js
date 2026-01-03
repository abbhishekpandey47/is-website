const template = {
    id: "template-001",
    slug: "informational-content-template",
    title: "Informational Content Template",
    category: "Informational",
    description: "Create engaging informational content that educates your technical audience. Perfect for tutorials, explainer articles, and how-to guides that break down complex concepts into digestible insights.",
    shortDescription: "Perfect for educational blog posts, tutorials, and technical guides",
    thumbnailImage: "/template-thumbnails/informational.png",
    bannerImage: "/template-banners/informational.png",
    videoEmbedUrl: "",
    publishedOn: "2024-12-19",
    author: "Infrasity Team",
    authorImage: "/svgPatterns/profile.svg",
    useCase: "Educational blogs, how-to guides, technical tutorials, concept explanations",
    targetAudience: "Developers, Technical Writers, Content Marketers, Product Teams",
    downloadLink: "#",
    overview: "This template helps you structure informational content that educates and engages technical audiences. It provides a proven framework for breaking down complex topics into clear, actionable insights that drive understanding and engagement.",
    keyFeatures: [
        "Clear introduction framework that hooks readers",
        "Structured body sections with logical flow",
        "Code examples and visual aids integration",
        "Actionable takeaways and next steps",
        "SEO-optimized structure for technical content"
    ],
    howToUse: [
        {
            step: "Define Your Topic",
            description: "Identify the technical concept or problem you want to explain. Research your audience's pain points and knowledge level."
        },
        {
            step: "Structure Your Content",
            description: "Use our framework to organize information logically: Problem → Background → Solution → Implementation → Conclusion."
        },
        {
            step: "Add Technical Depth",
            description: "Include code examples, diagrams, and real-world use cases that demonstrate practical application."
        },
        {
            step: "Optimize for Search",
            description: "Incorporate relevant keywords naturally, add meta descriptions, and structure with proper headings."
        },
        {
            step: "Review and Refine",
            description: "Ensure clarity, check technical accuracy, and validate that examples work as expected."
        }
    ],
    templateOutline: [
        {
            section: "Introduction (Hook)",
            description: "Start with a relatable problem or question that your audience faces. Make it clear why this topic matters.",
            example: "Example: 'Ever wondered why your API calls are timing out in production but work fine locally?'"
        },
        {
            section: "Background & Context",
            description: "Provide necessary context and prerequisite knowledge. Define key terms and concepts.",
            example: "Explain the fundamentals needed to understand the main topic."
        },
        {
            section: "Problem Statement",
            description: "Clearly articulate the challenge or concept you're addressing. Include common symptoms or scenarios.",
            example: "Detail the specific issues developers encounter and their impact."
        },
        {
            section: "Solution Deep Dive",
            description: "Break down your solution or explanation into logical steps. Include code examples, diagrams, or visuals.",
            example: "Walk through implementation with annotated code blocks."
        },
        {
            section: "Implementation Guide",
            description: "Provide step-by-step instructions or a complete walkthrough with practical examples.",
            example: "Include copy-paste ready code snippets and configuration examples."
        },
        {
            section: "Best Practices & Tips",
            description: "Share expert tips, common pitfalls to avoid, and optimization recommendations.",
            example: "List do's and don'ts based on real-world experience."
        },
        {
            section: "Conclusion & Next Steps",
            description: "Summarize key takeaways and suggest related topics or advanced implementations.",
            example: "Provide links to documentation and encourage further exploration."
        }
    ]
};

module.exports = template;
