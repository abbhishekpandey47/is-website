const template = {
    id: "template-003",
    slug: "product-documentation-template",
    title: "Product Documentation Template",
    category: "Product Documentation",
    description: "Write clear, comprehensive product documentation that helps users succeed with your product. From getting started guides to advanced features, create docs that users actually read and understand.",
    shortDescription: "Create user-friendly documentation that drives product adoption",
    thumbnailImage: "/template-thumbnails/product-documentation.png",
    bannerImage: "/template-banners/product-documentation.png",
    videoEmbedUrl: "",
    publishedOn: "2024-12-19",
    author: "Infrasity Team",
    authorImage: "/svgPatterns/profile.svg",
    useCase: "API documentation, user guides, feature explanations, quickstart guides, troubleshooting docs, SDK references",
    targetAudience: "Technical Writers, Product Managers, Developer Experience Teams, Support Teams",
    downloadLink: "#",
    overview: "Great documentation is the difference between a product that users love and one they struggle with. This template provides a structured approach to creating documentation that's clear, comprehensive, and actually helpful—reducing support tickets and improving user satisfaction.",
    keyFeatures: [
        "Progressive disclosure: Basic to advanced content flow",
        "Task-oriented structure (how-to focused)",
        "Clear prerequisites and requirements sections",
        "Troubleshooting and FAQ integration",
        "Code examples and visual aids for clarity"
    ],
    howToUse: [
        {
            step: "Identify User Goals",
            description: "Understand what users are trying to accomplish. Create documentation around tasks, not just features."
        },
        {
            step: "Start with Quick Start",
            description: "Get users to their first success quickly. Focus on the happy path before covering edge cases."
        },
        {
            step: "Layer Information",
            description: "Start simple, add complexity gradually. Use expandable sections for advanced topics."
        },
        {
            step: "Add Visual Aids",
            description: "Include screenshots, diagrams, GIFs, or videos. Visual learning improves comprehension by 400%."
        },
        {
            step: "Test with Real Users",
            description: "Have new team members or beta users follow your docs. Fix areas where they get stuck."
        }
    ],
    templateOutline: [
        {
            section: "Overview",
            description: "Briefly explain what this feature/product does and who it's for. Set clear expectations.",
            example: "Example: 'The Authentication API allows you to securely manage user sign-in and access control.'"
        },
        {
            section: "Prerequisites",
            description: "List what users need before starting: accounts, API keys, software versions, technical knowledge.",
            example: "Required: Node.js 18+, API key, basic understanding of REST APIs."
        },
        {
            section: "Quick Start",
            description: "Get users to their first successful result in 5 minutes or less. Focus on the simplest use case.",
            example: "Step-by-step guide with code snippets and expected outputs."
        },
        {
            section: "Installation & Setup",
            description: "Detailed installation instructions for all supported platforms. Include verification steps.",
            example: "npm install commands, configuration files, environment variables."
        },
        {
            section: "Core Concepts",
            description: "Explain key concepts and terminology. Help users understand the mental model.",
            example: "Define important terms, explain how components interact."
        },
        {
            section: "How-To Guides",
            description: "Task-focused guides for common use cases. Each guide should accomplish one specific goal.",
            example: "'How to authenticate users', 'How to handle token refresh', etc."
        },
        {
            section: "API Reference",
            description: "Complete API/feature reference with parameters, return values, and examples.",
            example: "Method signatures, parameter types, response formats, error codes."
        },
        {
            section: "Troubleshooting",
            description: "Common issues and their solutions. Include error messages users might encounter.",
            example: "Problem → Cause → Solution format with code examples."
        },
        {
            section: "Best Practices",
            description: "Recommendations for optimal usage, security considerations, and performance tips.",
            example: "Do's and don'ts, security guidelines, scaling recommendations."
        },
        {
            section: "FAQs & Support",
            description: "Answers to frequently asked questions. Link to community forums or support channels.",
            example: "Common questions with direct answers and related documentation links."
        }
    ]
};

module.exports = template;
