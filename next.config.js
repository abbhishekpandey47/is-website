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
    ];
  },
};
