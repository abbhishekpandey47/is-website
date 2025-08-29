export const metadata = {
  title: "Subreddit Dashboard",
  description: "Analyze subreddit engagement, top threads, and more.",
};

import ClientLayout from "./ClientLayout";

export default function PlatformLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
