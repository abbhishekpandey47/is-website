import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/HomePage/Footer";

export const metadata = {
  title: "Technical Writing Services for SaaS Startups | Infrasity",
  description: "Boost your SaaS growth with Infrasity, a B2B tech content marketing agency offering expert technical content writing services tailored for success.",
  keywords: "Technical Writing Services, technical content writer​, technical content marketing​,tech content marketing,content marketing for tech companies,developer relations, devrel service, technical content writing​,content marketing for tech businesses,b2b tech content marketing agency,technical content writing services​",
  name: "viewport",
  content: "width=device-width, initial-scale=1.0",
  metadataBase: `https://www.infrasity.com`,
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: "Technical Writing Services for SaaS Startups | Infrasity",
    description: "Boost your SaaS growth with Infrasity, a B2B tech content marketing agency offering expert technical content writing services tailored for success.",
    url: "",
    type: "website",
    images: [
      {
        url: "https://www.infrasity.com/_next/image?url=%2Flogodata%2Finfrasity_logo.png&w=256&q=75",
        width: 1200,
        height: 630,
        alt: "Infrasity - Technical Content Marketing for Cloud Companies",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}