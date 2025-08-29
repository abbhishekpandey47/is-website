"use client";
import * as Sentry from "@sentry/browser";
import { ErrorBoundary } from '@sentry/react';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
});

export default function ClientLayout({ children }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>} showDialog>
      {children}
    </ErrorBoundary>
  );
}
