export const metadata = {
    title: 'FAQ | Infrasity',
    description: 'Find answers to frequently asked questions about Infrasity\'s Developer Relations services, engineering support, marketing strategies, user sign-ups, and pipeline acceleration.',
    keywords: 'Infrasity, FAQ, Frequently Asked Questions, Developer Relations, Engineering Support, Marketing Strategies, User Sign-ups, Pipeline Acceleration, Customer Support, Infrasity FAQ',
    openGraph: {
        title: 'FAQ | Infrasity',
        description: 'Explore Infrasity\'s Frequently Asked Questions to learn more about our Developer Relations services, engineering and marketing support, user engagement strategies, and pipeline acceleration solutions.',
        url: '',
        type: 'website',
        images: [
            {
                url: '/blog_home/blog_home.png',
                width: 1200,
                height: 630,
                alt: 'Infrasity FAQ',
            },
        ],
    },
}

export default function PageLayout({ children }) {
    return <>{children}</>
}
