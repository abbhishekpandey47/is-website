export function generateMetadata() {
  const fullHref = 'https://www.infrasity.com/services/webflow-agency';
  return {
    alternates: {
      canonical: fullHref,
      languages: {
        'x-default': fullHref,
        'en-us': fullHref,
      },
    },
    title: "Webflow Design & Development Agency | Infrasity",
    description:
      "Partner with Infrasity, a leading Webflow agency offering custom, responsive web design & development to elevate your brand and boost online performance.",

  };
}
export default function PageLayout({ children }) {
  return <>{children}</>;
}
