// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

Sentry.init({
  dsn: "https://51fbc61b729d5e67090ec73c6f67b586@o4509925786320896.ingest.de.sentry.io/4509925792088144",

  // Disable all integrations to prevent surveys.js loading (31.3 KiB overhead)
  integrations: [],

  // Reduce trace sample rate to reduce JS execution overhead (10% instead of 20%)
  tracesSampleRate: 0.1,
  // Disable logs to reduce overhead
  enableLogs: false,

  // Disable all replay features to prevent surveys.js
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Disable auto session tracking to reduce overhead
  autoSessionTracking: false,

  // Disable debug logging
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
