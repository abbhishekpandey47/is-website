export const metadata = {
    title: 'Blogs | Infrasity',
    description: 'Explore Infrasity\'s latest blogs on Developer Relations, engineering insights, marketing strategies, and more to accelerate your pipeline and boost user engagement.',
    keywords: 'Infrasity, Blogs, Developer Relations, Engineering, Marketing, User Sign-ups, Pipeline Acceleration, Tech Insights, Software Development, Growth Strategies',
    openGraph: {
        title: 'Blogs | Infrasity',
        description: 'Explore Infrasity\'s latest blogs on Developer Relations, engineering insights, marketing strategies, and more to accelerate your pipeline and boost user engagement.',
        url: '',
        type: 'website',
        images: [
            {
                url: '/blog_home/blog_home.png',
                width: 1200,
                height: 630,
                alt: 'Infrasity Blogs',
            },
        ],
    },
}

export default function PageLayout({ children }) {
    return <>{children}</>
}
