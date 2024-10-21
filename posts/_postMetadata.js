let postMetaData = [
    {
        title: "Mastering Advanced UI Design",
        slug: "mastering_advanced_ui_designs",
        description: "Discover advanced techniques in UI design, covering the latest trends, tools, and principles to create immersive, user-friendly interfaces. Elevate your design approach with insights that ensure a seamless and engaging user experience.",
        ogImage: "/PostImages/mastering_advanced_ui_designs/0.webp",
        publishedOn: "2024-09-12",
        authorId: "author0001",
        category: "Informational",
        metaDescription: "Master advanced UI design techniques and trends for user-friendly, immersive interfaces. Improve your design skills with expert tips."
    },
    {
        title: "Becoming a Technical Content Writer for the Biggest Tech Companies",
        slug: "becoming-a-technical-content-writer-for-the-biggest-tech-companies",
        description: "Explore the world of technical content writing, where clarity and precision matter. Learn how top tech companies rely on skilled writers to simplify complex concepts and enhance user documentation, making an impact on their audience.",
        ogImage: "/PostImages/becoming-a-technical-content-writer-for-the-biggest-tech-companies/0.webp",
        publishedOn: "2024-10-07",
        authorId: "author0001",
        category: "Tutorials",
        metaDescription: "Learn how to become a technical content writer for top tech companies by mastering clear, precise writing for complex concepts."
    },
    {
        title: "Different Fields of Marketing – Exploring Different Paths and Strategies",
        slug: "explore-the-different-fields-of-marketing",
        description: "Dive into the various fields of marketing, from content and social media to product marketing. Uncover strategies that top SaaS companies use to grow and engage their audience, with insights into the latest trends such as AI-driven personalization.",
        ogImage: "",
        publishedOn: "2024-10-02",
        authorId: "author0001",
        category: "Informational",
        metaDescription: "Explore different marketing strategies and fields, including content, social media, and product marketing, with AI personalization insights."
    },
    {
        title: "How to Use React Developer Tools for Debugging and Performance Optimization",
        slug: "how-to-use-react-developer-tools-for-debugging-and-performance-optimization",
        description: "Maximize your React app's performance and catch bugs faster with React Developer Tools. This guide will help you optimize and debug your code efficiently, ensuring smoother, faster-running applications for end users.",
        ogImage: "/PostImages/how-to-use-react-developer-tools-for-debugging-and-performance-optimization/0.webp",
        publishedOn: "2024-09-14",
        authorId: "author0001",
        category: "Informational",
        metaDescription: "Optimize React app performance and debug efficiently with React Developer Tools. Learn techniques for faster, smoother apps."
    },
    {
        title: "Comprehensive Guide to Technical SEO for Improved Website Performance",
        slug: "comprehensive-guide-to-technical-seo-for-improved-website-performance",
        description: "Optimize your website's performance with technical SEO best practices. Learn how to enhance site speed, indexability, and overall performance to improve your search engine rankings and user engagement.",
        ogImage: "/PostImages/comprehensive-guide-to-technical-seo-for-improved-website-performance/0.webp",
        publishedOn: "2024-09-16",
        authorId: "author0001",
        category: "Informational",
        metaDescription: "Boost website performance with technical SEO. Improve speed, indexability, and rankings for better user engagement and traffic."
    },
    {
        title: "Best Platform for Blogs: How to Choose the Right One",
        slug: "best-platform-for-blogs-how-to-choose-the-right-one",
        description: "Looking to start a blog? This guide breaks down the best blogging platforms available, helping you choose the right one based on your needs, whether you're focused on SEO, ease of use, or customization.",
        ogImage: "/PostImages/best-platform-for-blogs-how-to-choose-the-right-one/0.webp",
        publishedOn: "2024-09-18",
        authorId: "author0001",
        category: "Informational",
        metaDescription: "Find the best platform for your blog. Compare platforms for SEO, ease of use, and customization to fit your blogging needs."
    },
    {
        title: "Jobs of Marketing: Career Paths, Roles and Skills",
        slug: "jobs-of-marketing-career-paths-roles-and-skills",
        description: "Discover the diverse career paths in marketing, from digital and product marketing to content and brand strategy. Explore the skills needed for each role and how you can start or pivot your career in this dynamic field.",
        ogImage: "",
        publishedOn: "2024-09-25",
        authorId: "author0001",
        category: "Informational",
        metaDescription: "Explore marketing careers and roles, from digital to brand strategy. Learn skills needed for success in the evolving marketing field."
    },
    {
        title: "Writing Technical Content – Benefits and Best Practices for SaaS Companies",
        slug: "importance-of-writing-organic-content-benefits-and-best-practices-for-saas-companies",
        description: "Technical content is crucial for SaaS companies to educate users and reduce support costs. Learn how to craft effective, clear documentation and user guides that enhance user experience and build trust.",
        ogImage: "/PostImages/importance-of-writing-organic-content-benefits-and-best-practices-for-saas-companies/0.webp",
        publishedOn: "2024-09-30",
        authorId: "author0001",
        category: "Informational",
        metaDescription: "Discover the benefits of writing technical content for SaaS companies. Learn best practices to improve user experience and trust."
    },
    {
        title: "Driving Rapid Growth Through Strategic Content: A Case Study with Terrateam",
        slug: "Terrateam_case_study",
        description: "This case study highlights how Infrasity helped Terrateam, a Netherlands-based startup, achieve rapid growth through strategic, high-impact technical content. By focusing on keyword research, SEO optimization, and developer-focused messaging, Infrasity increased Terrateam's traffic by 15% in just 14 days and boosted organic traffic by 13.8% over 90 days.",
        ogImage: "",
        publishedOn: "2024-09-12",
        authorId: "author0001",
        category: "Case Studies",
        metaDescription: "Discover how Infrasity partnered with Terrateam to drive a 15% traffic boost in just 14 days through strategic, high-impact content focused on keyword research, SEO, and developer personas."
    }
]

const sorted = () => {
    return postMetaData.sort((a, b) => {
        let datea = Math.floor(new Date(a.publishedOn).getTime() / 1000);
        let dateb = Math.floor(new Date(b.publishedOn).getTime() / 1000);
        return datea - dateb;
    })
};

postMetaData = sorted();

module.exports = postMetaData;
