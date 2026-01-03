const template = {
    id: "template-005",
    slug: "developer-content-and-guides-outline",
    title: "Developer Content Outline Template",
    category: "Developer Content & Guides",
    description: "Plan developer content and guides with clarity before drafting. This template captures the brief, audience, intent, and structure so technical pieces stay aligned with how developers evaluate tools and how they search.",
    shortDescription: "Plan developer content and guides before you write",
    thumbnailImage: "/template-thumbnails/developer-outline.png",
    bannerImage: "/template-banners/developer-outline.png",
    videoEmbedUrl: "https://www.loom.com/embed/1ac16a99c5684ffab4973075c375e8e2",
    publishedOn: "2024-12-19",
    author: "Infrasity Team",
    authorImage: "/svgPatterns/profile.svg",
    layoutType: "developer-outline",
    useCase: "Developer comparisons, platform overviews, setup guides, SDK/API tutorials, infrastructure walkthroughs, and evaluation pieces",
    targetAudience: "Platform Engineers, DevOps Leaders, Developer Relations, Technical Writers, Documentation Teams",
    downloadLink: "/templates-pdf/best-ai-tools-for-documentation.pdf",
    overview: "A thinking framework used before writing developer-facing content. It defines what is being written, who it is for, why it exists, what it should achieve, and how deep it should go—so drafts ship faster with fewer rewrites and more trust from developer audiences.",
    educationalContent: {
        whatIs: {
            title: "What is Developer Content Outline",
            paragraphs: [
                "A planning framework used before writing developer-facing content. It defines intent, audience, and structure upfront so technical content is intentional, structured, and aligned with how developers evaluate products and how search engines surface technical information.",
                "It applies across DevTools, infrastructure platforms, APIs, SDKs, and AI systems. It is not a writing template and not a checklist—it is a thinking framework to plan developer content before drafting begins."
            ],
            highlight: "Plan first: what is being written, who it is for, why it exists, what it should achieve, and how deep it should go.",
            subtext: "Where this structure applies",
            bullets: [
                "Tool or platform overviews",
                "How-to or setup guides",
                "SDK or API tutorials",
                "Infrastructure walkthroughs",
                "Comparison and evaluation articles"
            ]
        },
        whyUse: {
            title: "Why developer content needs a brief before writing",
            intro: "Without a brief, developer content drifts. Writers make assumptions about audience, intent, or depth, and reviewers catch structural issues after drafting has begun. A brief answers what is being written, who it is for, why it exists, what it should achieve, and how deep it should go, preventing vague positioning and unnecessary rewrites.",
            cards: [
                {
                    title: "Prevent drift",
                    description: "Lock audience, intent, scope, and depth before drafting so the piece stays on track."
                },
                {
                    title: "Reduce rewrites",
                    description: "Resolve structural questions upfront instead of rewriting after reviews."
                },
                {
                    title: "Clarify purpose",
                    description: "Align on the primary query to rank for and the related questions to answer."
                },
                {
                    title: "Signal quality",
                    description: "For developer audiences, clear intent and structure show up immediately in the perceived quality of the content."
                }
            ]
        },
        templateOverview: {
            title: "What the Developer Content Outline contains",
            description: "Two components work together to remove ambiguity before writing starts: the brief defines what is being written and why; the suggested outline defines how the content should be structured.",
            sections: [
                {
                    title: "The Brief (inputs)",
                    description: "Capture the title, target audience, target intent, expected depth, focus keyword, and supporting keywords so everyone aligns on the plan."
                },
                {
                    title: "The Suggested Outline (execution plan)",
                    description: "Translate the brief into H1/H2/H3 structure: the primary intent, major sections, and sub-sections with examples and validation points."
                }
            ]
        }
    },
    whatIsContent: "A developer content and guide outline is a planning framework—not the draft itself—that defines what will be written, who it is for, why it exists, and how it will flow before any words are drafted.",
    whatIsContentDetailed: [
        "Purpose-built for developer audiences and their search behavior",
        "Applies the same logic to overviews, tutorials, evaluations, and walkthroughs",
        "Sets scope, intent, audience, and depth so drafts stay aligned",
        "Turns into an H1/H2/H3 map with examples, validation, and troubleshooting"
    ],
    whatIsTemplate: "The outline template standardizes how teams capture the brief and translate it into a suggested structure, so developer content and guides are intentional, sequenced, and trustworthy.",
    whatIsTemplateCovers: [
        "Brief inputs: title, audience, intent, expected depth, focus keyword, supporting keywords",
        "Suggested outline: H1 intent, H2 sections, H3 sub-sections with examples and validation",
        "Flow design: context → setup → implementation → validation → alternatives → next steps",
        "Signals for trust: explicit assumptions, examples, validation steps, and troubleshooting",
        "Alignment on discovery: mapping keywords to sections without stuffing"
    ],
    whyUseTemplate: [
        "Stops drift by forcing clarity before drafting",
        "Avoids late structural rewrites with agreed scope and depth",
        "Aligns engineers, writers, and reviewers on audience and outcomes",
        "Keeps sections predictable with built-in examples and validation",
        "Combines developer needs and SEO signals in one plan"
    ],
    keyFeatures: [
        "Brief-first workflow that captures intent, audience, and discovery terms",
        "Topic-agnostic outline pattern for DevTools, infrastructure, APIs, SDKs, and AI systems",
        "Section sequencing that ensures flow, coverage, validation, and troubleshooting",
        "Guidance on where to place keywords without stuffing",
        "Trust signals: explicit assumptions, examples, expected outputs, and next steps"
    ],
    howToUse: [
        {
            step: "Draft the brief",
            description: "Fill in title, audience, intent, expected depth, focus keyword, and supporting keywords. Be specific about who the content serves and what it must achieve."
        },
        {
            step: "Define success and constraints",
            description: "State the core query to rank for, related questions to cover, and the technical depth required. Decide what is out of scope to prevent drift."
        },
        {
            step: "Shape the outline",
            description: "Convert the brief into H1/H2/H3 sections: primary intent, major sections, sub-sections with examples, validation, and troubleshooting."
        },
        {
            step: "Stress-test the flow",
            description: "Check for missing context, uneven depth, and misplaced examples. Ensure validation steps follow implementation and troubleshooting captures likely failure modes."
        },
        {
            step: "Map keywords to sections",
            description: "Place the focus keyword in the title, intro, and a core H2. Assign supporting keywords to relevant sections to match developer discovery patterns."
        },
        {
            step: "Finalize acceptance criteria",
            description: "Agree on the audience assumptions, required evidence (screenshots, code, outputs), and what 'done' looks like before drafting begins."
        }
    ],
    templateOutline: [
        {
            section: "The Brief (the inputs)",
            showInNav: true,
            description: "The brief defines the constraints and goals of the content. It ensures that everyone involved — founders, engineers, writers — is aligned before execution starts.",
            subsections: [
                {
                    title: "The brief typically includes",
                    definitionItems: [
                        {
                            label: "Title",
                            example: "How Platform Teams Manage Developer Environments Across CI and Production"
                        },
                        {
                            label: "Target audience",
                            example: "Platform engineers, DevOps engineers, infrastructure leads"
                        },
                        {
                            label: "Target intent",
                            example: "Informational (help readers understand approaches and trade-offs)"
                        },
                        {
                            label: "Expected depth (word count)",
                            example: "~1,500–2,000 words (in-depth guide, not a short overview)"
                        },
                        {
                            label: "Focus keyword",
                            example: "platform engineering tools"
                        },
                        {
                            label: "Supporting / long-tail keywords",
                            exampleList: [
                                "internal developer platform examples",
                                "platform engineering best practices",
                                "developer environment management"
                            ]
                        }
                    ],
                    note: "These inputs change from topic to topic. The structure does not."
                },
                {
                    title: "Why this part exists",
                    intro: "Without a brief, developer content tends to drift. The brief forces clarity upfront by answering:",
                    labeledItems: [
                        {
                            label: "What are we writing?",
                            description: "(topic, scope, and angle)"
                        },
                        {
                            label: "Who is it for?",
                            description: "(specific engineering personas, not all developers)"
                        },
                        {
                            label: "Why are we writing it?",
                            description: "(education, evaluation, onboarding, comparison, etc.)"
                        },
                        {
                            label: "What should it achieve?",
                            description: "(rank for a primary query while covering related questions)"
                        },
                        {
                            label: "How deep should it go?",
                            description: "(surface-level explanation vs hands-on technical guide)"
                        }
                    ],
                    closingNote: "This prevents vague positioning and mismatched expectations."
                },
                {
                    title: "What the brief signals to prospects",
                    bulletItems: [
                        "Content is planned, not improvised",
                        "Topics are chosen intentionally, not opportunistically",
                        "Writing is scoped correctly for the intended audience",
                        "SEO and developer needs are considered together, not separately"
                    ]
                }
            ]
        },
        {
            section: "The Suggested Outline (the execution plan)",
            showInNav: true,
            description: "The suggested outline defines the section-by-section structure of the content and keeps depth predictable.",
            subsections: [
                {
                    title: "How the outline works",
                    paragraphs: [
                        "It is usually expressed as H1 (the primary intent of the page), H2 (major sections), and H3 (sub-sections, examples, validations).",
                        "The outline defines what sections will exist, the order in which they appear, and what kind of information belongs in each section. Importantly, the outline is topic-agnostic."
                    ]
                },
                {
                    title: "Where the outline can be used",
                    bulletItems: [
                        "A tool or platform overview",
                        "A how-to or setup guide",
                        "An SDK or API tutorial",
                        "An infrastructure walkthrough",
                        "A comparison or evaluation piece"
                    ],
                    note: "Only the content inside the sections changes. The structure remains consistent."
                },
                {
                    title: "Why the outline part exists",
                    intro: "Without an outline:",
                    bulletItems: [
                        "Content becomes uneven (some sections too deep, others too shallow)",
                        "Important developer questions get missed",
                        "Examples and validation steps are added randomly",
                        "Articles become hard to scan and harder to trust"
                    ],
                    closingNote: "The outline ensures logical flow, complete coverage, predictable depth, and consistency across topics and authors. For developer audiences, consistency is a trust signal."
                },
                {
                    title: "What the outline signals to prospects",
                    bulletItems: [
                        "Content is structured around how developers consume information",
                        "Sections exist for a reason, not as filler",
                        "Complex topics are broken down systematically",
                        "Writing is engineered for clarity and trust, not just length"
                    ]
                }
            ]
        },
        {
            section: "Why each part of the outline matters",
            showInNav: true,
            description: "Each component of the outline serves a specific purpose in creating trustworthy, effective developer content.",
            subsections: [
                {
                    title: "Title + Expected depth",
                    paragraphs: [
                        "Why it matters: Sets expectations for both the reader and the writer."
                    ],
                    bulletItems: [
                        "A quick overview",
                        "A deep technical walkthrough",
                        "A comprehensive reference"
                    ],
                    closingNote: "Signal: A commitment to substance, not thin content."
                },
                {
                    title: "Target intent (informational, evaluative, instructional, etc.)",
                    paragraphs: [
                        "Why it matters: Intent determines tone, structure, level of explanation, and what is included or excluded."
                    ],
                    bulletItems: [
                        "Informational → explain concepts and context",
                        "Instructional → show steps, commands, validation",
                        "Evaluative → discuss trade-offs and positioning"
                    ],
                    closingNote: "Signal: Content matches why someone searched, not just what they searched."
                },
                {
                    title: "Target audience (explicit personas)",
                    paragraphs: [
                        "Why it matters: Audience defines acceptable assumptions, depth of technical detail, and the tooling/examples that feel credible."
                    ],
                    bulletItems: [
                        "Platform engineers evaluate content differently than DevOps leads",
                        "DevOps leads look for operational depth and real-world validation",
                        "Junior developers rely on explicit assumptions and step-by-step proof"
                    ],
                    closingNote: "Signal: This is not generic developer content — it is written for specific engineering roles."
                },
                {
                    title: "Focus keyword + supporting keywords",
                    paragraphs: [
                        "Why it matters: Keywords anchor the content to a primary discovery query and the related questions developers naturally ask."
                    ],
                    bulletItems: [
                        "Prevents keyword stuffing",
                        "Stops off-topic sections from slipping in",
                        "Keeps the piece from ranking for nothing"
                    ],
                    closingNote: "Signal: Outlines are measurable and search-aware, not just editorial ideas."
                }
            ]
        },
        {
            section: "The key takeaway",
            showInNav: true,
            description: "The Developer Content Outline is not a blog template. It is a thinking framework for developer content.",
            bulletItems: [
                "Plan before writing",
                "Align structure with intent",
                "Ensure technical completeness",
                "Create content developers can trust"
            ]
        }
    ]
};

module.exports = template;
