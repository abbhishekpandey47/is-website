import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import AlternateLinks from './AlternateLinks';
import { ClientLayoutWrapper } from './ClientLayoutWrapper';
import DeferredScripts from './components/DeferredScripts';
import './globals.css';
import { metadata } from './metadata';

export function generateMetadata() {
  return metadata;
}

export default function RootLayout({ children }) {
  return (
  <html lang='en' suppressHydrationWarning>
            <head>
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                  <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                  {/* Preconnect to critical third-party origins */}
                  <link rel="preconnect" href="https://cdn.prod.website-files.com" crossOrigin="anonymous" />
                  <link rel="preconnect" href="https://scripts.clarity.ms" crossOrigin="anonymous" />
                  <link rel="preconnect" href="https://snap.licdn.com" crossOrigin="anonymous" />
                  <link rel="preconnect" href="https://www.googletagmanager.com" />
                  <link rel="preconnect" href="https://www.google-analytics.com" />
                  <link rel="stylesheet" href="/fonts.css" />
                  <AlternateLinks />
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
