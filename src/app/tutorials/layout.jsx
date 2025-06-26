export const metadata = {
    title: 'Tutorials | Infrasity',
    description: 'Access Infrasity\'s comprehensive tutorials to enhance your Developer Relations skills, streamline engineering and marketing processes, boost user sign-ups, and accelerate your pipeline effectively.',
    keywords: 'Infrasity, Tutorials, Developer Relations, Engineering Tutorials, Marketing Tutorials, User Sign-ups, Pipeline Acceleration, Technical Guides, Step-by-Step Tutorials, Software Development, DevOps, Automation, Continuous Integration, Continuous Deployment',
    openGraph: {
        title: 'Tutorials | Infrasity',
        description: 'Explore Infrasity\'s tutorials to improve your Developer Relations strategies, optimize engineering and marketing workflows, increase user engagement, and accelerate your business pipeline.',
        url: '', 
        type: 'website',
        images: [
            {
                url: '/blog_home/blog_home.png', 
                width: 1200,
                height: 630,
                alt: 'Infrasity Tutorials',
            },
        ],
    },
}

export default function PageLayout({ children }) {
    return <>{children}</>
}
