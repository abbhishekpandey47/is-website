module.exports = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: ['www.infrasity.com', 'images.surferseo.art'],
    },
    // Add redirect configuration
    async redirects() {
        return [
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
            // {
            //     source: '/outline-generator/:path*',
            //     destination: 'https://www.youtube.com/:path*',
            //     permanent: true,
            // },
        ];
    },
};
