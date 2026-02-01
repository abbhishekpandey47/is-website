// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

Sentry.init({
  dsn: "https://51fbc61b729d5e67090ec73c6f67b586@o4509925786320896.ingest.de.sentry.io/4509925792088144",

  // Add optional integrations for additional features
  integrations: [
    // Disable replay integration to prevent surveys.js loading (31.3 KiB overhead)
    // Sentry.replayIntegration(),
  ],

  // Reduce trace sample rate to reduce JS execution overhead (20% instead of 100%)
  tracesSampleRate: 0.2,
  // Enable logs to be sent to Sentry
  enableLogs: false, // Disable to reduce overhead

  // Define how likely Replay events are sampled.
  // Reduced from 0.1 to 0.05 (5%) to minimize performance impact
  replaysSessionSampleRate: false, // Disabled to prevent surveys.js

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: false, // Disabled to prevent surveys.js

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Disable auto session tracking to reduce overhead and prevent surveys.js loading (31.3 KiB)
  autoSessionTracking: false,
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
