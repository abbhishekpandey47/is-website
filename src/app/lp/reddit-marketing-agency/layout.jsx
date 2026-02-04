export const metadata = {
    title: "Reddit Marketing Agency for B2B SaaS | Infrasity",
    description: "SaaS buyers talk on Reddit and share insights. We help B2B SaaS brands engage in subreddits and create authentic content. Let’s grow together.",
    robots: {
        index: false,
        follow: false,
    }
};

export default function PageLayout({ children }) {
    return (
        <>
            {/* Preload critical assets */}
            <link rel="preload" href="/fonts/quicksand-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
            <link rel="preload" href="/reddit/hyperwise.svg" as="image" fetchPriority="high" />
            <link rel="preload" href="/reddit/together.svg" as="image" fetchPriority="high" />
            <link rel="preload" href="/reddit/eclipse.svg" as="image" fetchPriority="high" />
            <link rel="preload" href="/reddit/freeAudit.svg" as="image" fetchPriority="high" />
            {children}
        </>
    );
}
