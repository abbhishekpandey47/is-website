export const metadata = {
  title: "Product Documentation Services | Infrasity",
  description:
    "Get expert product documentation services that improve clarity, onboarding, and adoption for APIs, SDKs, and integrations, reducing support and boosting growth.",
  keywords:
    "documentation services, SDK documentation, API documentation, CLI documentation, technical writing, developer documentation, docs as code, documentation agency, developer adoption",
  openGraph: {
    title: "Product Documentation Services | Infrasity",
    description:
      "Get expert product documentation services that improve clarity, onboarding, and adoption for APIs, SDKs, and integrations, reducing support and boosting growth.",
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

