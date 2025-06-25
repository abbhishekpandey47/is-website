export function generateMetadata() {
  const fullHref = 'https://www.infrasity.com/services/ai-agents-gtm-services';
  return {
    alternates: {
      canonical: fullHref,
      languages: {
        'x-default': fullHref,
        'en-us': fullHref,
      },
    },
    title: "GTM Content Services for AI Agents | Infrasity",
    description: "Get expert GTM support for your AI agent. We craft messaging, content, and campaigns that convert helping you stand out, generate leads, and grow revenue.",

  };
}

export default function PageLayout({ children }) {
  return <>{children}</>;
}
