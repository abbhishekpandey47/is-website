export const metadata = {
    title: 'Tech Video Production Company for B2B SaaS & AI',
    description: 'Infrasity creates high-quality technology videos for SaaS, DevOps, and AI brands. Boost engagement with expert-led tech video production services.',
    keywords: 'b2b video production, best video production company, saas video production, b2b video marketing agency, tech video production​, tech product videos​, tech video production agency, video tech productions​',
    openGraph: {
        title: 'Tech Video Production Company for B2B SaaS & AI',
        description: 'Infrasity creates high-quality technology videos for SaaS, DevOps, and AI brands. Boost engagement with expert-led tech video production services.',
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
