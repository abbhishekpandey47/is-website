import Footer from "@/Components/HomePage/Footer";
import { Loader } from "@/Components/Loader";
import Navbar from "@/Components/Navbar/Navbar";
import { Appwrap } from "@/context";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from 'next/dynamic';
import Head from "next/head";
import Script from 'next/script';
import "./globals.css";

export const metadata = {
  title: "Technical Content Writing​ Services | Infrasity",
  description: "Get professional technical writing services for businesses and organizations. From manuals to user guides, we’ve got you covered. Get started today!",
  keywords: "Technical Content Writing services, ​Technical Writing Services, technical content writer​, technical content marketing​,tech content marketing,content marketing for tech companies,developer relations, devrel service, technical content writing​,content marketing for tech businesses,b2b tech content marketing agency,technical content writing services​",
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
        <Script
          id="koala-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t){var k="ko",i=(window.globalKoalaKey=window.globalKoalaKey||k);if(window[i])return;var ko=(window[i]=[]);["identify","track","removeListeners","on","off","qualify","ready"].forEach(function(t){ko[t]=function(){var n=[].slice.call(arguments);return n.unshift(t),ko.push(n),ko}});var n=document.createElement("script");n.async=!0,n.setAttribute("src","https://cdn.getkoala.com/v1/pk_ccda6b50f34963a28c2f035673b27491be24/sdk.js"),(document.body || document.head).appendChild(n)}();
            `,
          }}
        />

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
