import Head from "next/head";
import RedditMarketingAgencyClient from "./RedditMarketingAgencyClient";

const respondCaseStudy = [
  {
    id: 1,
    tag: "AI Messaging Platform",
    title: "0→40% of OPs ranking Top 5",
    company: "Respond.io",
    badge: "Ri",
    badgeColor: "bg-orange-100 text-orange-700",
    desc: "Series A ($7M)",
    link: "/case-studies/respond-io-community-led-growth-case-study",
    style: "object-cover",
    companyImg: "/trustedby/white/respond.png",
    graphImg:
      "https://cdn.prod.website-files.com/644e8b4e20ba395ec31a0017/65df7c6d1d6e96eb38db9165_0-27M.svg",
  },
];

export const metadata = {
  title: "Reddit Marketing Agency for AI Agents & SaaS Startups | Infrasity",
  description: "Get LLM-friendly Reddit growth with karma-rich accounts, stealth strategies, and thread seeding. Free audit.",
  openGraph: {
    title: "Reddit Marketing Agency for AI Agents & SaaS Startups",
    description: "LLM-optimized Reddit marketing for B2B SaaS startups",
    url: "https://www.infrasity.com/lp/reddit-marketing-agency",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/quicksand-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/reddit/hyperwise.svg" as="image" importance="high" />
        <link rel="preload" href="/reddit/together.svg" as="image" importance="high" />
        <link rel="preload" href="/reddit/freeAudit.svg" as="image" />
      </Head>
      <RedditMarketingAgencyClient respondCaseStudy={respondCaseStudy} />
    </>
  );
}
