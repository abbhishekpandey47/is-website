// This file configures the initialization of Sentry on the client.
// Sentry has been completely disabled to improve performance and remove surveys.js overhead
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import posthog from "posthog-js";

// Disable PostHog in development to avoid AbortError logs
if (process.env.NODE_ENV === "production") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    capture_exceptions: true,
    debug: false,
  });
}

// Empty export for compatibility
export const onRouterTransitionStart = () => {};
