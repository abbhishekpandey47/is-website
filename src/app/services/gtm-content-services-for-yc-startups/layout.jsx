export function generateMetadata() {
    const fullHref = 'https://www.infrasity.com/services/gtm-content-services-for-yc-startups';
    return {
        alternates: {
            canonical: fullHref,
            languages: {
                'x-default': fullHref,
                'en-us': fullHref,
            },
        },
        title: "GTM Content Services for YC Startups | Infrasity",
        description: "Grow your YC startup with tailored GTM content services. From thought leadership to growth content, get marketing that converts leads into customers.",
    };
}

// ✅ Only one default export should exist
export default function PageLayout({ children }) {
    return <>{children}</>;
}
