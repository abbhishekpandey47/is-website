export function generateMetadata() {
    const fullHref = 'https://www.infrasity.com/services/technical-content-gtm';
    return {
        alternates: {
            canonical: fullHref,
            languages: {
                'x-default': fullHref,
                'en-us': fullHref,
            },
        },
        robots: {
            index: false,
            follow: true,
        },
    };
}

export default function PageLayout({ children }) {
    return <>{children}</>
}
