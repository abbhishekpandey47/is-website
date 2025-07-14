export const metadata = {
    title: 'Blog | Infrasity',
    description: 'Explore Infrasity\'s latest blogs on Developer Relations, engineering insights, marketing strategies, and more to accelerate your pipeline and boost user engagement.',
    openGraph: {
        title: 'Blog | Infrasity',
        description: 'Explore Infrasity\'s latest blogs on Developer Relations, engineering insights, marketing strategies, and more to accelerate your pipeline and boost user engagement.',
        url: '',
        type: 'website',
        images: [
            {
                url: '/blog_home/blog_home.png',
                width: 1200,
                height: 630,
                alt: 'Infrasity Blog',
            },
        ],
    },
}

export default function PageLayout({ children }) {
    return <>{children}</>
}