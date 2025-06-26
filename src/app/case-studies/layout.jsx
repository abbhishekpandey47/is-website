export const metadata = {
    title: 'Case Studies | Infrasity',
    description: 'Explore Infrasity\'s latest case studies on Developer Relations, engineering insights, marketing strategies, and more to accelerate your pipeline and boost user engagement.',
    keywords: 'Infrasity, Case Studies, Developer Relations, Engineering, Marketing, User Sign-ups, Pipeline Acceleration, Tech Insights, Software Development, Growth Strategies',
    openGraph: {
        title: 'Case Studies | Infrasity',
        description: 'Explore Infrasity\'s latest case studies on Developer Relations, engineering insights, marketing strategies, and more to accelerate your pipeline and boost user engagement.',
        url: '',
        type: 'website',
        images: [
            {
                url: '/blog_home/blog_home.png',
                width: 1200,
                height: 630,
                alt: 'Infrasity Case Studies',
            },
        ],
    },
}

export default function PageLayout({ children }) {
    return <>{children}</>
}
