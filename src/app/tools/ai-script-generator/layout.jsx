"use client";
import { ErrorBoundary } from '@sentry/react';

export const metadata = {
};


export default function PlatformLayout({ children }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>} showDialog>
      {children}
    </ErrorBoundary>
  );
}
