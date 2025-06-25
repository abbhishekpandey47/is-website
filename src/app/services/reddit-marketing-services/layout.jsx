export function generateMetadata() {
    const fullHref = 'https://www.infrasity.com/services/reddit-marketing-services';
    return {
        alternates: {
            canonical: fullHref,
            languages: {
                'x-default': fullHref,
                'en-us': fullHref,
            },
        },
        title: "Reddit Marketing Agency for AI Agents & SaaS Startups",
        description: "Our Reddit marketing agency creates and executes strategies tailored to Reddit, helping startups build authority, engage communities, and drive conversions."

    };
}
export default function PageLayout({ children }) {
    return <>{children}</>;
}
