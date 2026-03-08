"use client";
import FAQSection from "../../lp/reddit-marketing-agency/FAQ";

// FAQ data for developer marketing
const developerMarketingFaqData = [
    {
        id: "1",
        question: "What is developer marketing?",
        answer:
            "Developer marketing is a specialized approach to marketing products built for software developers. Instead of relying on traditional promotional messaging, it focuses on technical content, tutorials, documentation, and real product use cases that help developers understand and evaluate tools through hands-on learning.",
    },
    {
        id: "2",
        question: "What does Infrasity's developer marketing agency do?",
        answer:
            "Infrasity helps developer-focused companies grow by creating technical content and marketing strategies that resonate with engineering audiences. We work with DevTools, infrastructure, and developer-first startups to produce tutorials, technical blogs, and developer-focused resources that help engineers understand and adopt new technologies.",
    },
    {
        id: "3",
        question: "How is developer marketing different from traditional marketing?",
        answer:
            "Traditional marketing often focuses on promotional messaging targeted at business decision-makers. Developer marketing is designed specifically for technical audiences who prefer educational resources, detailed documentation, and practical examples that show how a product works in real development environments.",
    },
    {
        id: "4",
        question: "Why work with a developer marketing agency instead of building it in-house?",
        answer:
            "Developer marketing requires a mix of technical expertise, content strategy, and understanding of developer communities. Many companies partner with specialized agencies to produce consistent, high-quality technical content and developer-focused campaigns without diverting their internal engineering teams from product development.",
    },
    {
        id: "5",
        question: "What kind of content does Infrasity create for developer marketing?",
        answer:
            "Infrasity produces technical blogs, tutorials, guides, and educational resources designed for developers. The goal is to help developers discover your product, understand how it works, and see how it solves real engineering problems through clear and practical examples.",
    },
    {
        id: "6",
        question: "How long does it take to see results from developer marketing with Infrasity?",
        answer:
            "Developer marketing is a long-term growth strategy. Many companies start seeing improvements in developer traffic, engagement, and product awareness within a few months, while consistent technical content, GEO and SEO efforts continue to build stronger results over time.",
    },
    {
        id: "7",
        question: "Why choose Infrasity for developer marketing?",
        answer:
            "Infrasity specializes in marketing for developer-focused products and technical audiences. Our experience working with infrastructure tools, DevTools, and developer platforms allows us to create technically accurate content that builds trust with engineers and helps companies grow within developer communities.",
    },
];

export default function DeveloperMarketingFAQ() {
    return (
        <FAQSection 
            faqData={developerMarketingFaqData}
            heading="Frequently Asked Questions"
            description="Have a question that needs a human to answer? No problem."
        />
    );
}
