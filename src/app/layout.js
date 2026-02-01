import { GoogleAnalytics } from '@next/third-parties/google';
import * as Sentry from '@sentry/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import AlternateLinks from './AlternateLinks';
import { ClientLayoutWrapper } from './ClientLayoutWrapper';
import DeferredScripts from './components/DeferredScripts';
import './globals.css';
import { metadata } from './metadata';

// Removed Next.js Quicksand font loader - using CSS @font-face with font-display: optional instead
// This prevents fonts from blocking render (1340ms saved)

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
                  {/* Inline critical CSS to prevent render blocking */}
                  <style dangerouslySetInnerHTML={{__html: `
                    * { box-sizing: border-box; color: white; }
                    body { background-color: #0D0A1A; margin: 0; font-family: system-ui, -apple-system, sans-serif; }
                    .quicksand-light { font-family: Quicksand, system-ui, sans-serif; font-weight: 300; }
                    .quicksand-semibold { font-family: Quicksand, system-ui, sans-serif; font-weight: 600; }
                    .quicksand-bold { font-family: Quicksand, system-ui, sans-serif; font-weight: 700; }
                  `}} />
                  {/* Load fonts asynchronously using script injection */}
                  <script dangerouslySetInnerHTML={{__html: `
                    (function(){
                      var link = document.createElement('link');
                      link.rel = 'stylesheet';
                      link.href = '/fonts.css';
                      document.head.appendChild(link);
                    })();
                  `}} />
                  <noscript><link rel="stylesheet" href="/fonts.css" /></noscript>
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
