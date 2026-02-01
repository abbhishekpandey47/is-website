// This file configures the initialization of Sentry for edge features
// Sentry has been completely disabled to improve performance and remove surveys.js overhead
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const env = process.env.NODE_ENV || "development";

// Completely disable Sentry on edge
Sentry.init({
  dsn: undefined,
  enabled: false,
  environment: env,
  tracesSampleRate: 0,
  beforeSend: () => null,
});
