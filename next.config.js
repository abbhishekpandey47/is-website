module.exports = {
    reactStrictMode: false,

    compress: true,

    experimental: {
        optimizeCss: true,
        optimizePackageImports: [
            'lucide-react',
            'date-fns',
            'react-icons',
            'zod',
            'antd'
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    productionBrowserSourceMaps: false,
    images: {
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
              {
                source: '/blog/reddit-b2b-marketing-strategy',
                destination: '/blog/subreddit-strategy-for-reddit-b2b-marketing',
                permanent: true,
                statusCode: 301,
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ],
            },
            {
                source: '/_next/image',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400',
                    }
                ],
            },
            // Cache CSS files with long expiration
            {
                source: '/_next/static/css/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    }
                ],
            },
            // Cache fonts with long expiration
            {
                source: '/fonts/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    }
                ],
            },
            // Cache images with long expiration
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ],
            },
            {
                source: '/:path*.{jpg,jpeg,png,gif,webp,svg,ico}',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ],
            },
            // Cache common public asset folders
            {
                source: '/reddit/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ],
            },
            {
                source: '/PostImages/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ],
            },
            // Cache testimonial images with long expiration
            {
                source: '/Testimon/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ],
            },
            // Cache public folder images and SVGs
            {
                source: '/:path*.svg',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ],
            },
            {
                source: '/:path*.webp',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ],
            },
            // Cache fonts.css with longer expiration
            {
                source: '/fonts.css',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    }
                ],
            },
            // Cache third-party analytics and tracking scripts longer
            {
                source: '/ingest/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400',
                    }
                ],
            },
            // Cache main content and API responses appropriately
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, stale-while-revalidate=86400',
                    }
                ],
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
    webpack: (config, { dev }) => {
        // Suppress noisy cache serialization warnings
        if (!config.infrastructureLogging) config.infrastructureLogging = {};
        config.infrastructureLogging.level = 'error';

        // Optimize CSS loading
        if (!dev) {
            config.optimization = {
                ...config.optimization,
                minimize: true,
                usedExports: true,
                sideEffects: true,
                // Reduce polyfill overhead by targeting modern browsers
                nodeEnv: 'production',
            };
        }

        // Disable source maps to reduce memory usage in production builds
        if (!dev) {
            config.devtool = false;
        }

        // Target modern browsers to reduce polyfills
        if (!dev) {
            config.target = ['web', 'es2020'];

            // Explicitly set output environment to prevent polyfills
            config.output.environment = {
                arrowFunction: true,
                bigIntLiteral: true,
                const: true,
                destructuring: true,
                dynamicImport: true,
                forOf: true,
                module: true,
                optionalChaining: true,
            };

            // Disable polyfills for modern JavaScript features
            config.resolve.fallback = {
                ...config.resolve.fallback,
                'core-js': false,
                'regenerator-runtime': false,
            };

            // Force terser to remove polyfills
            if (config.optimization && config.optimization.minimizer) {
                config.optimization.minimizer.forEach(minimizer => {
                    if (minimizer.constructor.name === 'TerserPlugin') {
                        minimizer.options = minimizer.options || {};
                        minimizer.options.terserOptions = {
                            ...minimizer.options.terserOptions,
                            compress: {
                                ...minimizer.options.terserOptions?.compress,
                                pure_funcs: [
                                    'Array.from',
                                    'Object.fromEntries',
                                    'Object.hasOwn',
                                ],
                            },
                        };
                    }
                });
            }
        }

        return config;
    },
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

    // Skip Sentry webpack plugin entirely if no auth token
    disabled: !process.env.SENTRY_AUTH_TOKEN,

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

    // Upload a minimal set of source maps to reduce build work
    widenClientFileUpload: false,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    webpack: {
      treeshake: {
        removeDebugLogging: true,
      },
      // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    },
  }
);
