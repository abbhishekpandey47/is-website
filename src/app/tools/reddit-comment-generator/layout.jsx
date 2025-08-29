"use client";
import { ErrorBoundary } from '@sentry/react';

export const metadata = {
  title: "Free Reddit Comment Generator Tool | Infrasity",
  description: "Need authentic Reddit comments? Our FREE tool generates high-quality comments to engage with B2B SaaS communities. Try it free today.",
};


export default function PlatformLayout({ children }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>} showDialog>
      {children}
    </ErrorBoundary>
  );
}
