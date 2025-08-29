import PageLayoutClient from "./PageLayoutClient";

export const metadata = {
  title: "Free Reddit Comment Generator Tool | Infrasity",
  description:
    "Need authentic Reddit comments? Our FREE tool generates high-quality comments to engage with B2B SaaS communities. Try it free today.",
};

export default function PlatformLayout({ children }) {
  return <PageLayoutClient>{children}</PageLayoutClient>;
}
