import { GoogleAnalytics } from '@next/third-parties/google';
import * as Sentry from '@sentry/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Quicksand } from 'next/font/google';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import AlternateLinks from './AlternateLinks';
import { ClientLayoutWrapper } from './ClientLayoutWrapper';
import DeferredScripts from './components/DeferredScripts';
import './globals.css';
import { metadata } from './metadata';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

export function generateMetadata() {
  return {
    ...metadata,
    other: {
      ...Sentry.getTraceData()
    }
  };
}

export default function RootLayout({ children }) {
  return (
  <html lang='en' suppressHydrationWarning>
            <head>
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                  <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                  {/* Preconnect to critical third-party origins */}
                  <link rel="preconnect" href="https://cdn.prod.website-files.com" crossOrigin="anonymous" />
                  <link rel="preconnect" href="https://cdn.getkoala.com" crossOrigin="anonymous" />
                  <link rel="preconnect" href="https://scripts.clarity.ms" crossOrigin="anonymous" />
                  <link rel="preconnect" href="https://snap.licdn.com" crossOrigin="anonymous" />
                  {/* Preload critical fonts */}
                  <link
                    rel="preload"
                    href="/fonts/Quicksand-Bold.woff"
                    as="font"
                    type="font/woff"
                    crossOrigin="anonymous"
                  />
                  <link
                    rel="preload"
                    href="/fonts/Quicksand-SemiBold.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                  />
                  <link
                    rel="preload"
                    href="/fonts/Quicksand-Medium.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                  />
                  <link
                    rel="preload"
                    href="/fonts/Quicksand-Light.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                  />
                  <AlternateLinks />
                  <link rel="preload" href="/landingfolio/dashboard.webp" as="image" />
            </head>
            <GoogleAnalytics gaId='G-G0BTN1FRWY' />
            <body className='antialiased' suppressHydrationWarning>
                <noscript>
                    <iframe
                        src='https://www.googletagmanager.com/ns.html?id=GTM-WGZGHXZS'
                    title='Google Tag Manager'
                        height='0'
                        width='0'
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
                <Suspense fallback={null}>
                  <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
                </Suspense>
                <SpeedInsights />
                <DeferredScripts />
            </body>
        </html>
    );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
