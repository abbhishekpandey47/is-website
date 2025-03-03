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
import dynamic from 'next/dynamic'

export const metadata = {
  title: "Technical Content Writing​ for SaaS Startups | Infrasity",
  description: "Get professional technical writing services for businesses and organizations. From manuals to user guides, we’ve got you covered. Get started today!",
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
        alt: "Technical Writing Services for SaaS Startups | Infrasity",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  const CrispWithNoSSR = dynamic(
    () => import('../Components/chatbot')
  )

  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-G0BTN1FRWY"/>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
      </Head>
      <CrispWithNoSSR />
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
