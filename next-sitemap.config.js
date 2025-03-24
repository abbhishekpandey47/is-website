/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://infrasity.com',
  generateRobotsTxt: false,
  outDir: 'public',
  sitemapSize: 70000,
  autoLastmod: false,
  generateIndexSitemap: false, // This prevents `sitemap.xml` from referencing multiple files
  exclude: [],
  alternateRefs: [],
  // This is important - make sure it's looking at the right directory for pages
  sourceDir: '.next',
  pagesDirectory: process.cwd() + '/src/app',
  transform: async (config, path) => {
    // Remove any trailing slashes for consistency
    path = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;

    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/blog') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path === '/contact' || path === '/faq') {
      priority = 0.6;
      changefreq = 'weekly';
    } else if (path === '/privacy-policy' || path === '/terms-of-services') {
      priority = 0.1;
      changefreq = 'weekly';
    } else if (path.startsWith('/service-')) {
      priority = 0.7;
      changefreq = 'daily';
    } else if (path === '/case-studies') {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog/')) {
      priority = 0.8;
      changefreq = 'daily';
    } else if (path.startsWith('/case-studies/')) {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (path.startsWith('/tutorials')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString().split('T')[0] + 'T08:02:42+00:00',
      alternateRefs: [],
    };
  }
};
