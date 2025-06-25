export function generateMetadata() {
  const fullHref = 'https://www.infrasity.com/services/release-notes';
  return {
    alternates: {
      canonical: fullHref,
      languages: {
        'x-default': fullHref,
        'en-us': fullHref,
      },
    },
    title: "Release Notes Writing Services by Technical Writing Experts",
    description:
      "Deliver clear, concise release notes that keep your users informed. Our technical writing experts create structured updates for every product version or patch.",

  };
}

export default function PageLayout({ children }) {
  return <>{children}</>;
}
