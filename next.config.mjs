import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {};

// Disable Sentry's bundler plugins (which create releases & upload sourcemaps)
// unless you explicitly enable them via SENTRY_RELEASES_ENABLED=true.
const disableSentryPlugins = process.env.SENTRY_RELEASES_ENABLED !== "true";

export default withSentryConfig(nextConfig, {
	silent: true,
	disableClientWebpackPlugin: disableSentryPlugins,
	disableServerWebpackPlugin: disableSentryPlugins,
});
