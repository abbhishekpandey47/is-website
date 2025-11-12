export const metadata = {
  title: "Documentation Services | SDK, API & CLI Docs That Drive Adoption",
  description:
    "Professional documentation services for engineering-led startups. We build SDK, API, CLI, and integration docs that engineers actually use — written by engineers, optimized for growth.",
  keywords:
    "documentation services, technical documentation, SDK documentation, API documentation, CLI documentation, developer documentation, technical writing, documentation agency, software documentation, developer docs",
  openGraph: {
    title: "Documentation Services | SDK, API & CLI Docs That Drive Adoption",
    description:
      "Professional documentation services for engineering-led startups. We build SDK, API, CLI, and integration docs that engineers actually use — written by engineers, optimized for growth.",
    url: "https://infrasity.com/services/documentation-services",
    type: "website",
    images: [
      {
        url: "/services/documentation-og.png",
        width: 1200,
        height: 630,
        alt: "Infrasity Documentation Services",
      },
    ],
  },
};

export default function PageLayout({ children }) {
  return <>{children}</>;
}

