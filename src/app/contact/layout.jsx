import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/HomePage/Footer";

export const metadata = {
  title: "Contact Infrasity | B2B SaaS Marketing Agency",
  description: "Reach out to Infrasity for GTM content, Reddit marketing, and technical writing that drives growth. Click the link below and get in touch with us today!",
  keywords: "",
  name: "viewport",
  content: "width=device-width, initial-scale=1.0",
  metadataBase: `https://www.infrasity.com`,
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: "Contact Us - Get in Touch with Infrasity",
    description: "Reach out to Infrasity for inquiries, support, and business opportunities. We're here to assist with all your needs. Contact us today for quick assistance.",
    url: "",
    type: "website",
    images: [
      {
        url: "https://www.infrasity.com/_next/image?url=%2Flogodata%2Finfrasity_logo.png&w=256&q=75",
        width: 1200,
        height: 630,
        alt: "Technical Writing Services for SaaS Startups | Infrasity",
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
