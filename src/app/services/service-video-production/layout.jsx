export function generateMetadata() {
    const fullHref = 'https://www.infrasity.com/services/service-video-production';
    return {
        alternates: {
            canonical: fullHref,
            languages: {
                'x-default': fullHref,
                'en-us': fullHref,
            },
        },
        title: 'Best Video Production Company for Tech Videos | Infrasity',
        description: 'Looking for top-notch video production? We specialize in tech video production, delivering engaging and professional content for all your needs.',
        keywords: 'b2b video production, best video production company, saas video production, b2b video marketing agency, tech video production​, tech product videos​, tech video production agency, video tech productions​',
        openGraph: {
            title: 'Best Video Production Company for Tech Videos | Infrasity',
            description: 'Looking for top-notch video production? We specialize in tech video production, delivering engaging and professional content for all your needs.',
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
    };
}

export default function PageLayout({ children }) {
    return <>{children}</>
}
