export const metadata = {
  title: "Technical Content Writing Services for SaaS & Dev Tools",
  description:
    "Technical Content Writing Services for SaaS & Dev Tools Meta Description: Get expert technical content writing services for SaaS, APIs, and DevTools. We create clear, engaging docs, blogs, and guides that drive growth and adoption.",
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
