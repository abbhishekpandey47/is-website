'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import AwardBanner from '../Components/HomePage/awardwinner';
import Footer from '../Components/HomePage/Footer';
import { Loader } from '../Components/Loader';
import Navbar from '../Components/Navbar/Navbar';
import { Appwrap } from '../context';
import { initMixpanel } from "../lib/mixpanel";
import mixpanel from "mixpanel-browser";

export function ClientLayoutWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initMixpanel();
  }, []);

  useEffect(() => {
    if (mounted) {
      mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL, {
        autocapture: true, // enable autocapture
        debug: true,
  });
    //   mixpanel.identify("USER_ID");

    //   mixpanel.people.set({
    //     $name: "Jane Doe",
    //     $email: "jane.doe@example.com",
    //     plan: "Premium",
    //   });
    }
  }, [mounted]);



  const CrispWithNoSSR = dynamic(() => import("../Components/chatbot"));

  const pathname = usePathname();
  
  // Add safety check for pathname
  const safePathname = pathname || '';
  
  const hideNavbar =
    safePathname === "/technical-writing-services-b2b-saas" ||
    safePathname.startsWith("/threadflow") ||
    safePathname.startsWith("/auth");
  const hideNavBar2 =
    safePathname === "/services/webflow-agency" ||
    safePathname.startsWith("/threadflow") ||
    safePathname.startsWith("/auth");
  const hideNavBar3 = safePathname === "/tools/reddit-comment-generator";
  const hideNavBarAndFooter =
    safePathname === "/tools/reddit-tools" ||
    safePathname.startsWith("/auth") ||
    safePathname.startsWith("/threadflow")||
     safePathname === "/landing"; 
  const shouldShowAwardBanner = !hideNavBarAndFooter && !hideNavBar2 && safePathname !== "/careers";
  const shouldShowNavbar = !hideNavBarAndFooter && !hideNavbar;

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

      {!mounted ? (
        <div style={{ visibility: 'hidden' }}>
          <Appwrap>
            <AntdRegistry>
              {children}
            </AntdRegistry>
          </Appwrap>
        </div>
      ) : (
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
          enableSystem={false}
        disableTransitionOnChange
      >
        <Appwrap>
          <AntdRegistry>
            <Loader />

            {shouldShowAwardBanner && <AwardBanner />}

            {shouldShowNavbar && <Navbar />}

            {children}
            <Analytics />
            {!hideNavBarAndFooter && <Footer />}
          </AntdRegistry>
        </Appwrap>
      </NextThemesProvider>
      )}
    </>
  );
}
