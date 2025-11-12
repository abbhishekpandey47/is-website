export const metadata = {
  title: "Documentation That Drives Developer Adoption | Infrasity Docs Engine",
  description:
    "We build SDK, API, CLI, and integration docs that engineers actually use — written by engineers, optimized for growth. Trusted by fast-growing AI and DevTool companies.",
  keywords:
    "documentation services, SDK documentation, API documentation, CLI documentation, technical writing, developer documentation, docs as code, documentation agency, developer adoption",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Documentation That Drives Developer Adoption | Infrasity",
    description:
      "We build SDK, API, CLI, and integration docs that engineers actually use — written by engineers, optimized for growth.",
    url: "https://infrasity.com/services/product-documentation",
    type: "website",
    images: [
      {
        url: "/services/docs-engine-og.png",
        width: 1200,
        height: 630,
        alt: "Infrasity Documentation Services",
      },
    ],
  },
};

export default function DocsEngineLayout({ children }) {
  return <>{children}</>;
}

