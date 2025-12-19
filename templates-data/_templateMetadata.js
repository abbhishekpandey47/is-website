const templateMetadata = [
    {
        id: "template-001",
        slug: "informational-content-template",
        title: "Informational Content Template",
        category: "Informational",
        description: "Create engaging informational content that educates your technical audience. Perfect for tutorials, explainer articles, and how-to guides that break down complex concepts into digestible insights.",
        shortDescription: "Perfect for educational blog posts, tutorials, and technical guides",
        thumbnailImage: "/template-thumbnails/informational.png",
        bannerImage: "/template-banners/informational.png",
        videoEmbedUrl: "https://www.loom.com/embed/YOUR_LOOM_VIDEO_ID_1", // Replace with actual video
        publishedOn: "2024-12-19",
        author: "Infrasity Team",
        authorImage: "/svgPatterns/profile.svg",
        
        // Template-specific fields
        useCase: "Educational blogs, how-to guides, technical tutorials, concept explanations",
        targetAudience: "Developers, Technical Writers, Content Marketers, Product Teams",
        downloadLink: "#", // Can add Google Docs/Notion template link
        
        // Content sections
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
    },
    {
        id: "template-002",
        slug: "developer-marketing-content-template",
        title: "Developer Marketing Content Template",
        category: "Developer Marketing",
        description: "Create authentic developer-focused content that resonates with technical audiences. Build trust through technical depth, real-world examples, and practical value.",
        shortDescription: "Engage developers with authentic, technical content that builds trust",
        thumbnailImage: "/template-thumbnails/developer-marketing.png",
        bannerImage: "/template-banners/developer-marketing.png",
        videoEmbedUrl: "https://www.loom.com/embed/YOUR_LOOM_VIDEO_ID_2", // Replace with actual video
        publishedOn: "2024-12-19",
        author: "Infrasity Team",
        authorImage: "/svgPatterns/profile.svg",
        
        useCase: "Developer blog posts, API documentation marketing, technical comparisons, integration guides, release announcements",
        targetAudience: "Developer Marketing Teams, DevRel Engineers, Product Marketers, Growth Teams",
        downloadLink: "#",
        
        overview: "Developer marketing requires a unique approach that balances technical credibility with marketing goals. This template helps you create content that developers actually want to read—technical, honest, and genuinely useful—while achieving your marketing objectives.",
        
        keyFeatures: [
            "Developer-first approach with technical credibility",
            "Code-heavy examples and working implementations",
            "Problem-solution framework developers trust",
            "Integration with popular tools and frameworks",
            "Community-friendly tone without marketing fluff"
        ],
        
        howToUse: [
            {
                step: "Understand Developer Pain Points",
                description: "Research real problems developers face. Check GitHub issues, Stack Overflow, Reddit, and developer forums."
            },
            {
                step: "Lead with Technical Value",
                description: "Start with the technical problem, not your product. Show you understand their workflow and challenges."
            },
            {
                step: "Provide Working Code",
                description: "Include complete, tested code examples. Developers should be able to copy-paste and run immediately."
            },
            {
                step: "Show, Don't Tell",
                description: "Demonstrate capabilities through real implementations rather than feature lists. Use GIFs, demos, or live examples."
            },
            {
                step: "Engage the Community",
                description: "Share on dev.to, Hacker News, Reddit (r/programming), and relevant Slack/Discord communities."
            }
        ],
        
        templateOutline: [
            {
                section: "Technical Hook",
                description: "Start with a specific technical problem or challenge developers face. Be concrete and relatable.",
                example: "Example: 'Deploying microservices to Kubernetes? Here's how to avoid the 5 most common configuration mistakes.'"
            },
            {
                section: "Context & Background",
                description: "Explain why this problem matters. Include statistics or developer survey data if available.",
                example: "Reference industry trends or common developer workflows."
            },
            {
                section: "Technical Deep Dive",
                description: "Get into the technical details. Explain how things work under the hood, not just what they do.",
                example: "Architecture diagrams, flow charts, and technical explanations."
            },
            {
                section: "Code Examples & Implementation",
                description: "Provide complete, working code examples. Include setup steps, dependencies, and error handling.",
                example: "GitHub repo link, code snippets with syntax highlighting, and configuration files."
            },
            {
                section: "Comparison & Alternatives",
                description: "Be honest about trade-offs. Compare with other solutions and explain when to use what.",
                example: "Show different approaches and their pros/cons."
            },
            {
                section: "Performance & Optimization",
                description: "Include benchmarks, performance considerations, and optimization tips developers care about.",
                example: "Share metrics, load testing results, or scaling considerations."
            },
            {
                section: "Getting Started Guide",
                description: "Make it easy to try. Provide quick start instructions, demo links, or sandbox environments.",
                example: "Step-by-step setup with expected outputs at each stage."
            },
            {
                section: "Community & Resources",
                description: "Link to docs, GitHub repos, Discord/Slack communities, and related resources.",
                example: "Encourage contributions, feedback, and community engagement."
            }
        ]
    },
    {
        id: "template-003",
        slug: "product-documentation-template",
        title: "Product Documentation Template",
        category: "Product Documentation",
        description: "Write clear, comprehensive product documentation that helps users succeed with your product. From getting started guides to advanced features, create docs that users actually read and understand.",
        shortDescription: "Create user-friendly documentation that drives product adoption",
        thumbnailImage: "/template-thumbnails/product-documentation.png",
        bannerImage: "/template-banners/product-documentation.png",
        videoEmbedUrl: "https://www.loom.com/embed/YOUR_LOOM_VIDEO_ID_3", // Replace with actual video
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
    },
    {
        id: "template-004",
        slug: "community-engagement-template",
        title: "Community Engagement Content Template",
        category: "Community Engagement",
        description: "Foster a thriving developer community through engaging content. From community updates to discussion starters, create content that brings your community together and encourages participation.",
        shortDescription: "Build and nurture developer communities through engaging content",
        thumbnailImage: "/template-thumbnails/community-engagement.png",
        bannerImage: "/template-banners/community-engagement.png",
        videoEmbedUrl: "https://www.loom.com/embed/YOUR_LOOM_VIDEO_ID_4", // Replace with actual video
        publishedOn: "2024-12-19",
        author: "Infrasity Team",
        authorImage: "/svgPatterns/profile.svg",
        
        useCase: "Community updates, event announcements, discussion starters, contributor spotlights, community challenges, monthly recaps",
        targetAudience: "Community Managers, DevRel Teams, Developer Advocates, Growth Teams",
        downloadLink: "#",
        
        overview: "Strong developer communities don't just happen—they're built through consistent, engaging communication. This template helps you create content that sparks conversations, recognizes contributions, and makes community members feel valued and connected.",
        
        keyFeatures: [
            "Conversation-focused structure that encourages replies",
            "Community spotlight and recognition elements",
            "Clear calls-to-action for participation",
            "Event and milestone celebration framework",
            "Inclusive and welcoming tone"
        ],
        
        howToUse: [
            {
                step: "Know Your Community",
                description: "Understand your community's interests, challenges, and preferred communication styles. Monitor discussions and engagement patterns."
            },
            {
                step: "Create Two-Way Conversations",
                description: "Don't just broadcast—ask questions, solicit feedback, and respond to comments. Make it a dialogue, not a monologue."
            },
            {
                step: "Recognize Contributors",
                description: "Highlight community members, their contributions, and achievements. People stay where they feel appreciated."
            },
            {
                step: "Be Authentic and Transparent",
                description: "Share both successes and challenges. Admit mistakes, share learnings, and be genuine in your communication."
            },
            {
                step: "Maintain Consistency",
                description: "Post regularly (weekly or bi-weekly). Consistency builds trust and keeps your community engaged."
            }
        ],
        
        templateOutline: [
            {
                section: "Engaging Hook",
                description: "Start with something that grabs attention—a question, a surprising fact, or a relatable scenario.",
                example: "Example: 'What's the coolest thing you built this week? We want to hear about it!'"
            },
            {
                section: "Community Highlight",
                description: "Spotlight a community member, project, or contribution. Include their story and what makes it special.",
                example: "Feature contributor profiles, showcase projects, or highlight helpful forum answers."
            },
            {
                section: "Main Content/Update",
                description: "Share the core message: update, announcement, discussion topic, or event details.",
                example: "New feature launches, upcoming events, important changes, or interesting discussions."
            },
            {
                section: "Visual Elements",
                description: "Include images, GIFs, or videos. Visual content increases engagement by 650%.",
                example: "Screenshots of featured projects, event photos, infographics, or demo videos."
            },
            {
                section: "Discussion Points",
                description: "Pose 2-3 specific questions or topics for discussion. Make it easy for people to jump in.",
                example: "'What's your experience with X?', 'Which approach do you prefer?', 'What should we build next?'"
            },
            {
                section: "Call-to-Action",
                description: "Clear, specific action you want community members to take. Keep it simple and achievable.",
                example: "Join the Discord, RSVP for the event, share your project, vote on features."
            },
            {
                section: "Event Calendar/What's Next",
                description: "Preview upcoming events, deadlines, or initiatives. Help people plan their participation.",
                example: "Upcoming hackathons, office hours, webinars, or community challenges."
            },
            {
                section: "Ways to Get Involved",
                description: "List different ways people can participate based on their interest level and time commitment.",
                example: "Quick: Star the repo, Vote on feature. Medium: Attend event, Share feedback. Deep: Contribute code, Write tutorial."
            },
            {
                section: "Resources & Links",
                description: "Provide relevant links: community channels, documentation, previous discussions, or related content.",
                example: "Discord server, GitHub, previous community spotlights, helpful resources."
            },
            {
                section: "Thank You & Sign-off",
                description: "End with gratitude and warmth. Make people feel valued and welcome.",
                example: "Thank the community, encourage continued engagement, include friendly sign-off."
            }
        ]
    }
];

module.exports = templateMetadata;
