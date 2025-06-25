export function generateMetadata() {
  const fullHref = 'https://www.infrasity.com/services';
  return {
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