import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Head from "next/head";
import Navbar from "@/Components/Navbar/Navbar";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Footer from "@/Components/HomePage/Footer";
import { Appwrap } from "@/context";
import { Loader } from "@/Components/Loader";
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'

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
    <html lang="en">
      <GoogleAnalytics gaId="G-G0BTN1FRWY"/>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
      </Head>
      <body
        className={`antialiased`}
      >

        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Appwrap>
            <AntdRegistry>
              <Loader/>
              <Navbar />
              {children}
              <Analytics />
              <Footer />
            </AntdRegistry>
          </Appwrap>
        </NextThemesProvider>
      </body>
    </html>
  );
}
