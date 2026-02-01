// This file configures the initialization of Sentry on the server.
// Sentry has been completely disabled to improve performance and remove surveys.js overhead
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || "";
const env = process.env.NODE_ENV || "development";

// Completely disable Sentry on server
Sentry.init({
  dsn: undefined,
  enabled: false,
  environment: env,
  tracesSampleRate: 0,
  beforeSend: () => null,
});
