import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/HomePage/Footer";

export const metadata = {
  title: "Content Marketing Services for SaaS Companies | infrasity",
  description: "Explore the best SaaS content marketing agencies, including Infrasity, know for driving growth through tailored content strategies for early stage startups.",
  keywords: "Best SaaS Content Marketing Agencies, B2B SaaS content marketing agency, Technical Marketing Content for Software Startups, Content Marketing Strategy for Technology, A Complete Introduction to Technical Marketing, Content Marketing for Tech Companies, SaaS Blog Writing Services, Content Marketing for Tech Startups",
  name: "viewport",
  content: "width=device-width, initial-scale=1.0",
  metadataBase: `https://www.infrasity.com`,
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: "Infrasity",
    description: "Explore the best SaaS content marketing agencies, including Infrasity, know for driving growth through tailored content strategies for early stage startups.",
    url: "",
    type: "website",
    images: [
      {
        url: "",
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