import PageLayoutClient from "./PageLayoutClient";

export const metadata = {
  title: "Tech Content Marketing ROI Calculator | Infrasity",
  description:
    "Calculate your content marketing ROI in 10 seconds. See if your technical content efforts deliver results and whether in-house or Infrasity gives better ROI.",
};

export default function Layout({ children }) {
  // Wrap children with your client layout
  return <PageLayoutClient>{children}</PageLayoutClient>;
}
