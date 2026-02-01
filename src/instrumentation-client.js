// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

// Disable Sentry completely to prevent surveys.js loading (31.2 KiB overhead)
Sentry.init({
  enabled: false,
  dsn: undefined,
  integrations: [],
  tracesSampleRate: 0,
  enableLogs: false,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  autoSessionTracking: false,
  debug: false,
});



// Disable PostHog in development to avoid AbortError logs
if (process.env.NODE_ENV !== "development") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    capture_exceptions: true,
    debug: false,
  });
} else {
  console.log("[PostHog] Disabled in development to prevent AbortError logs.");
  posthog.opt_out_capturing();
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
