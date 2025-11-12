// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || "";
const env = process.env.NODE_ENV || "development";
const telemetry = (process.env.SENTRY_TELEMETRY || "false").toLowerCase() === "true";

Sentry.init({
  dsn: dsn || undefined,
  enabled: Boolean(dsn),
  environment: process.env.SENTRY_ENVIRONMENT || env,
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0),
  enableLogs: telemetry,
  debug: (process.env.SENTRY_DEBUG || "false").toLowerCase() === "true",
  telemetry: false,
  // Only create release/upload source maps if auth token is present
  ...(process.env.SENTRY_AUTH_TOKEN ? {} : {
    beforeSend: () => null,
  }),
});
