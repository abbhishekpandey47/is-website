export function generateMetadata() {
  const fullHref = 'https://www.infrasity.com/roi-cal';
  return {
    title: "Tech Content Marketing ROI Calculator | Infrasity",
    description:
      "Calculate your content marketing ROI in 10 seconds. See if your technical content efforts deliver results and whether in-house or Infrasity gives better ROI.",
    alternates: {
      canonical: fullHref,
      languages: {
        'x-default': fullHref,
        'en-us': fullHref,
      },
    },
  };
}

export default function PageLayout({ children }) {
  return <>{children}</>;
}
