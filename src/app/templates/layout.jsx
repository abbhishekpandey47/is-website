export const metadata = {
    title: 'Content Marketing Templates | Infrasity',
    description: 'Access free, ready-to-use content marketing templates for B2B SaaS companies. From content briefs to developer marketing, streamline your workflow with proven templates.',
    keywords: 'Content Marketing Templates, Developer Marketing Templates, Product Documentation Templates, Community Engagement, B2B SaaS Templates, Technical Writing Templates',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
    openGraph: {
        title: 'Content Marketing Templates | Infrasity',
        description: 'Access free, ready-to-use content marketing templates for B2B SaaS companies. From content briefs to developer marketing, streamline your workflow with proven templates.',
        images: [
            {
                url: '/blog_home/blog_home.png',
                width: 1200,
                height: 630,
                alt: 'Infrasity Templates',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Content Marketing Templates | Infrasity',
        description: 'Access free, ready-to-use content marketing templates for B2B SaaS companies.',
        images: ['/blog_home/blog_home.png'],
    },
};

export default function TemplatesLayout({ children }) {
    return children;
}
