// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
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
});
