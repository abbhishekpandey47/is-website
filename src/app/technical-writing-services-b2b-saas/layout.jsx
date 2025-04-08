export const metadata = {
  title: "Expert B2B SaaS Technical Writing Services | Infrasity",
  description:
    "Boost clarity and conversions with Infrasity’s expert B2B SaaS technical writing services. Tailored content for user guides, manuals, and product documentation.",
  keywords:
    "Infrasity, Blog As Code, Developer Relations, Engineering Support, Marketing Strategies, User Sign-ups, Pipeline Acceleration, DevOps, Infrastructure as Code, Automation, Continuous Integration, Continuous Deployment",
  openGraph: {
    title: "Blog As Code | Infrasity",
    description:
      "Discover how Infrasity's Blog As Code leverages Developer Relations to help engineering and marketing teams initiate conversations, boost user sign-ups, and accelerate your pipeline effectively.",
    url: "",
    type: "website",
    images: [
      {
        url: "/blog_home/blog_home.png",
        width: 1200,
        height: 630,
        alt: "Infrasity Blog As Code",
      },
    ],
  },
};

export default function PageLayout({ children }) {
  return <>{children}</>;
}
