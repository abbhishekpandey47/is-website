import { GoogleAnalytics } from '@next/third-parties/google';
import * as Sentry from '@sentry/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Quicksand } from 'next/font/google';
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
                <AlternateLinks />
            </head>
            <GoogleAnalytics gaId='G-G0BTN1FRWY' />
            <body className='antialiased' suppressHydrationWarning>
                <noscript>
                    <iframe
                        src='https://www.googletagmanager.com/ns.html?id=GTM-WGZGHXZS'
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
