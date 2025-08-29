"use client";

import { ErrorBoundary } from "@sentry/react";

export default function PageLayoutClient({ children }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>} showDialog>
      {children}
    </ErrorBoundary>
  );
}
