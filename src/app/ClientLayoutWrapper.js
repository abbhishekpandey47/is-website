'use client';

import Footer from "@/Components/HomePage/Footer";
import { Loader } from "@/Components/Loader";
import Navbar from "@/Components/Navbar/Navbar";
import { Appwrap } from "@/context";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

export function ClientLayoutWrapper({ children }) {
  const CrispWithNoSSR = dynamic(
    () => import('../Components/chatbot')
  );
  
  const pathname = usePathname();
  const hideNavbar = pathname === '/technical-writing-services-b2b-saas';
  const hideNavBar2 = pathname === '/';
  
  
  return (
    <>
      {/* <CrispWithNoSSR /> */}
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
            {!(hideNavbar || hideNavBar2) && <Navbar />}
            {children}
            <Analytics />
            <Footer />
          </AntdRegistry>
        </Appwrap>
      </NextThemesProvider>
    </>
  );
}