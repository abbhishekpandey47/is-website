export function generateMetadata() {
  const fullHref = 'https://www.infrasity.com/services/how-to-guides';
  return {
    alternates: {
      canonical: fullHref,
      languages: {
        'x-default': fullHref,
        'en-us': fullHref,
      },
    },
    title: "How-To Guide Writing Services by Technical Writing Experts",
    description:
      "Clear and concise how-to guides crafted by technical writing experts. Improve product usability and provide users with reliable, task-oriented documentation.",

  };
}

export default function PageLayout({ children }) {
  return <>{children}</>;
}
