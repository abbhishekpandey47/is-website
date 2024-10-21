export const metadata = {
    title: 'Video Production | Infrasity',
    description: 'Discover how Infrasity\'s Video Production services enhance your Developer Relations efforts by creating engaging content, increasing user sign-ups, and accelerating your pipeline efficiently.',
    keywords: 'Infrasity, Video Production, Developer Relations, Content Creation, Marketing Strategies, User Sign-ups, Pipeline Acceleration, Video Marketing, Brand Engagement, Corporate Videos, Explainer Videos, Video Editing, Animation',
    openGraph: {
        title: 'Video Production | Infrasity',
        description: 'Learn how Infrasity\'s Video Production services support your Developer Relations team by creating compelling content, boosting user engagement, and accelerating your business pipeline.',
        url: '', 
        type: 'website',
        images: [
            {
                url: '/blog_home/blog_home.png', 
                width: 1200,
                height: 630,
                alt: 'Infrasity Video Production',
            },
        ],
    },
}

export default function PageLayout({ children }) {
    return <>{children}</>
}
