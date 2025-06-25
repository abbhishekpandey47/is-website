export function generateMetadata() {
    const fullHref = 'https://www.infrasity.com/pricing';
    return {
        title: "Pricing | Infrasity",
        description:
            "Explore pricing options for Infrasity's technical content and marketing services.",
        alternates: {
            canonical: fullHref,
            languages: {
                'x-default': fullHref,
                'en-us': fullHref,
            },
        },
        robots: "noindex, nofollow",
    };
}

export default function PageLayout({ children }) {
    return (
        <>
            {children}
        </>
    );
}
