export const metadata = {
  title: "Free Reddit Comment Generator [No Login Required]",
  description: "Create human-like Reddit comments and posts for free. No login required. Avoid downvotes with our authentic Reddit Comment Generator for organic engagement.",
};

import ClientLayout from "./ClientLayout";

export default function PlatformLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
