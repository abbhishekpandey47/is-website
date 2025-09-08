import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {};

// Disable Sentry's bundler plugins (which create releases & upload sourcemaps)
// unless you explicitly enable them via SENTRY_RELEASES_ENABLED=true.
const enableSentryPlugins = process.env.SENTRY_RELEASES_ENABLED === "true";

export default withSentryConfig(nextConfig, {
	silent: true,
	disableClientWebpackPlugin: !enableSentryPlugins,
	disableServerWebpackPlugin: !enableSentryPlugins,
	// Explicitly pass env-driven config so sentry-cli doesn't miss them
	org: process.env.SENTRY_ORG,
	project: process.env.SENTRY_PROJECT,
	authToken: process.env.SENTRY_AUTH_TOKEN,
	url: process.env.SENTRY_URL, // optional, for self-hosted Sentry
});
