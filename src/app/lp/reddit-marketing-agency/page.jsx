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


export default function Page() {
  return <RedditMarketingAgencyClient respondCaseStudy={respondCaseStudy} />;
}
