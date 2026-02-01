'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import PropTypes from 'prop-types';
import { Suspense, useEffect } from 'react';
import AwardBanner from '../Components/HomePage/awardwinner';
import Footer from '../Components/HomePage/Footer';
import { Loader } from '../Components/Loader';
import Navbar from '../Components/Navbar/Navbar';
import { Appwrap } from '../context';
import { initMixpanel } from "../lib/mixpanel";

export function ClientLayoutWrapper({ children }) {
  useEffect(() => {
    if (globalThis.window === undefined) return;

    const initMixpanelInIdle = () => initMixpanel({ debug: false });
    if ('requestIdleCallback' in globalThis) {
      const idleId = globalThis.requestIdleCallback(initMixpanelInIdle);
      return () => globalThis.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(initMixpanelInIdle, 0);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);



  const AdsFooter = dynamic(() => import("../Components/adsFooter"), { ssr: true });
  const AdsHeader = dynamic(() => import("../Components/adsHeader"), { ssr: true });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const safePathname = pathname || '';
  const routeReady = Boolean(pathname);
  const appParam = searchParams?.get('app');
  const isAdsApp = appParam === 'ads';

  const hideNavbar =
    safePathname === "/technical-writing-services-b2b-saas" ||
    safePathname.startsWith("/lp/developer-marketing-agency") ||
    safePathname.startsWith("/lp/reddit-marketing-agency") ||
    safePathname.startsWith("/threadflow") ||
    safePathname.startsWith("/auth")

  const hideNavBar2 =
    safePathname === "/services/webflow-agency" ||
    safePathname.startsWith("/threadflow") ||
    safePathname.startsWith("/auth");

  const hideNavBarAndFooter =
    safePathname === "/tools/reddit-tools" ||
    safePathname.startsWith("/auth") ||
    safePathname.startsWith("/threadflow");

  const hideAwardBanner =
    safePathname.startsWith("/lp/developer-marketing-agency") ||
    safePathname.startsWith("/lp/reddit-marketing-agency");

  const shouldShowAwardBanner =
    routeReady &&
    !hideAwardBanner &&
    !hideNavBarAndFooter &&
    !hideNavBar2 &&
    safePathname !== "/careers" &&
    !(safePathname === "/contact" && isAdsApp);

  const shouldShowNavbar =
    routeReady && !hideNavBarAndFooter && !hideNavbar && !isAdsApp;

  const isRedditMarketingAgencyLp =
    routeReady && safePathname.startsWith("/lp/reddit-marketing-agency");

  return (
    <Suspense fallback={null}>
      <>
        {/* <CrispWithNoSSR /> */}
        <Script
          id="koala-tracking"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t){var k="ko",i=(window.globalKoalaKey=window.globalKoalaKey||k);if(window[i])return;var ko=(window[i]=[]);["identify","track","removeListeners","on","off","qualify","ready"].forEach(function(t){ko[t]=function(){var n=[].slice.call(arguments);return n.unshift(t),ko.push(n),ko}});var n=document.createElement("script");n.async=!0,n.setAttribute("src","https://cdn.getkoala.com/v1/pk_ccda6b50f34963a28c2f035673b27491be24/sdk.js"),(document.body || document.head).appendChild(n)}();
            `,
          }}
        />

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

              {isRedditMarketingAgencyLp ? <AdsHeader /> : shouldShowNavbar && <Navbar />}

              {children}
              <Analytics />
              {isRedditMarketingAgencyLp ? <AdsFooter /> : !hideNavBarAndFooter && <Footer />}
            </AntdRegistry>
          </Appwrap>
        </NextThemesProvider>
      </>
    </Suspense>
  );
}

ClientLayoutWrapper.propTypes = {
  children: PropTypes.node,
};
