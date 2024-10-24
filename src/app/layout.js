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
  title: "Content Marketing Services for SaaS Companies | infrasity",
  description: "Explore the best SaaS content marketing agencies, including Infrasity, know for driving growth through tailored content strategies for early stage startups.",
  keywords: "Best SaaS Content Marketing Agencies, B2B SaaS content marketing agency, Technical Marketing Content for Software Startups, Content Marketing Strategy for Technology, A Complete Introduction to Technical Marketing, Content Marketing for Tech Companies, SaaS Blog Writing Services, Content Marketing for Tech Startups",
  name: "viewport",
  content: "width=device-width, initial-scale=1.0",
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
      <GoogleAnalytics gaId="G-TZC3YF8FSD"/>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="canonical" href="https://www.infrasity.com/" />
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
