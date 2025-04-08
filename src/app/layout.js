import { GoogleAnalytics } from '@next/third-parties/google';
import { ClientLayoutWrapper } from './ClientLayoutWrapper';
import "./globals.css";

import { metadata } from './metadata';
export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
      </head>
      <GoogleAnalytics gaId="G-G0BTN1FRWY"/>
      <body className="antialiased">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}