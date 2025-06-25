export function generateMetadata() {
  const fullHref = 'https://www.infrasity.com/services/cli-guide';
  return {
    alternates: {
      canonical: fullHref,
      languages: {
        'x-default': fullHref,
        'en-us': fullHref,
      },
    },
    title: "CLI Guide Documentation by Technical Writing Experts",
    description:
      "Accurate and user-friendly CLI guides crafted by technical writing experts. Help developers interact with your tools efficiently using clear command-line docs.",

  };
}

export default function PageLayout({ children }) {
  return <>{children}</>;
}
