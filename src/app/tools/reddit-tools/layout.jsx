export const metadata = {
  title: "Free Reddit Comment Generator [No Login Required]",
  description: "Create human-like Reddit comments and posts for free. No login required. Avoid downvotes with our authentic Reddit Comment Generator for organic engagement.",
  robots: {
    index: false,
    follow: false,
  },
};




const tabs = [
  { name: "Home", href: "/tools/reddit-tools" },
  { name: "Subreddit Dashboard", href: "/tools/reddit-tools/subredditsense" },
  // ...add other tabs as needed
];

export default function PlatformLayout({ children }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <main className="w-full">{children}</main>
  );
}
