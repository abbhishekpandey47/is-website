import PageLayoutClient from "./PageLayoutClient";

export const metadata = {
  title: "Platform | Infrasity",
  description: "Platform page layout with error boundary",
};

export default function PlatformLayout({ children }) {
  return <PageLayoutClient>{children}</PageLayoutClient>;
}
