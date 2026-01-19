import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Enable SWC minification (faster than default Terser)
	swcMinify: true,
	
	// Optimize images
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},

	// Enable compression
	compress: true,

	// Optimize fonts
	optimizeFonts: true,

	// Reduce initial JS payload
	productionBrowserSourceMaps: false,

	// Optimize build output
	experimental: {
		// Enable next.js optimizations
		optimizePackageImports: ["@radix-ui/react-*", "@headlessui/react", "lucide-react"],
	},

	// Webpack optimization
	webpack: (config, { isServer }) => {
		// Enable tree-shaking for unused code
		config.optimization.usedExports = true;
		
		return config;
	},
};

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
