module.exports = {
    reactStrictMode: false,
    images: {
         domains: ["cdn.prod.website-files.com", "framerusercontent.com", "images.surferseo.art", "betterstackcdn.com", "devplaybook-landing.lovable.app"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.prod.website-files.com',
            },
            {
                protocol: 'https',
                hostname: 'framerusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'images.surferseo.art',
            },
            {
                protocol: 'https',
                hostname: 'devplaybook-landing.lovable.app',
            },
        ],
    },
    // Add redirect configuration
    async redirects() {
        return [
                {
                    source: '/blog/10-best-technical-writing-content-service-providers',
                    destination: '/blog/top-10-technical-writing-service-companies',
                    permanent: true,
                    statusCode: 301,
                },
            {
                source: '/blog/how-to-create-a-powerful-product-document',
                destination: '/blog/b2b-saas-prd',
                permanent: true,
            },
            {
                source: '/case-studies/top-10-technical-writing-service-companies',
                destination: '/blog/top-10-technical-writing-service-companies',
                permanent: true,
            },
            {
                source: '/blog/explainer-video-agency',
                destination: '/blog/saas-video-production',
                permanent: true,
            },
            {
                source: '/services/yc-page',
                destination: '/services/gtm-content-services-for-yc-startups',
                permanent: true,
            },
            {
                source: '/blog/best-b2b-saas-video-agencies',
                destination: '/blog/top-explainer-video-companies',
                permanent: true,
            },
            {
                source: '/blog/dev-marketing',
                destination: '/blog/developer-marketing',
                permanent: true,
            },
            {
                source: '/services/reddit-marketing-services',
                destination: '/services/reddit-marketing-agency',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/services/service-video-production',
                destination: '/services/tech-video-production',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/tools/script-generator',
                destination: '/tools/ai-script-generator',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/services/developer-marketting-service',
                destination: '/services/developer-marketing-agency',
                permanent: true,
                statusCode: 301,
            },
            // Handle common misspellings and variants for developer marketing service
            {
                source: '/services/developer-marketing-service',
                destination: '/services/developer-marketing-agency',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/services/developer-marketting-agency',
                destination: '/services/developer-marketing-agency',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/services/developer-marketing',
                destination: '/services/developer-marketing-agency',
                permanent: true,
                statusCode: 301,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/ingest/static/:path*",
                destination: "https://us-assets.i.posthog.com/static/:path*",
            },
            {
                source: "/ingest/:path*",
                destination: "https://us.i.posthog.com/:path*",
            },
        ];
    },
    // This is required to support PostHog trailing slash API requests
    skipTrailingSlashRedirect: true,
};


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "infrasity",
    project: "reddit-tools",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // Disable source map upload if auth token is missing
    authToken: process.env.SENTRY_AUTH_TOKEN || undefined,
    
    // Don't fail build on missing auth token
    errorHandler: (err, invokeErr, compilation) => {
      if (!process.env.SENTRY_AUTH_TOKEN) {
        // Silently ignore errors when auth token is missing
        return;
      }
      // Otherwise, use default error handling
      if (invokeErr) {
        compilation.errors.push(invokeErr);
      }
    },

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
