const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const glob = require('glob');

// Run next-sitemap to generate the sitemap
try {
  console.log('Running next-sitemap...');
  execSync('npx next-sitemap', { stdio: 'inherit' });
} catch (error) {
  console.error('Error running next-sitemap:', error);
}

// Get paths and data
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
const postsDir = path.join(__dirname, '..', 'posts');
const today = new Date().toISOString().split('T')[0] + 'T08:02:42+00:00';

// Default URLs (used if sitemap doesn't exist or for validation)
const defaultUrls = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/blog', priority: 0.9, changefreq: 'daily' },
  { url: '/contact', priority: 0.6, changefreq: 'weekly' },
  { url: '/faq', priority: 0.6, changefreq: 'weekly' },
  { url: '/privacy-policy', priority: 0.1, changefreq: 'weekly' },
  { url: '/terms-of-services', priority: 0.1, changefreq: 'weekly' },
  { url: '/case-studies', priority: 0.8, changefreq: 'weekly' },
  { url: '/tutorials', priority: 0.8, changefreq: 'weekly' },
  { url: '/service-blog-as-code', priority: 0.7, changefreq: 'daily' },
  { url: '/service-video-production', priority: 0.7, changefreq: 'daily' },
];

// Function to generate sitemap XML content
function generateSitemapXml(urls) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  for (const { url, priority, changefreq } of urls) {
    sitemap += `<url><loc>https://infrasity.com${url}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>\n`;
  }

  sitemap += `</urlset>`;
  return sitemap;
}

// Function to extract URLs from existing sitemap
function extractUrlsFromSitemap(sitemapContent) {
  const urls = [];
  const regex = /<url><loc>https:\/\/infrasity\.com(.*?)<\/loc>.*?<changefreq>(.*?)<\/changefreq><priority>(.*?)<\/priority><\/url>/g;
  let match;

  while ((match = regex.exec(sitemapContent)) !== null) {
    urls.push({
      url: match[1],
      changefreq: match[2],
      priority: parseFloat(match[3])
    });
  }

  return urls;
}

// Collect blog posts
function collectBlogPosts() {
  console.log('Looking for blog posts...');
  const blogPosts = [];
  const validSlugs = new Set(); // Keep track of valid slugs

  try {
    if (fs.existsSync(postsDir)) {
      // Check for .md files first (your current posts)
      const mdFiles = glob.sync('**/*.md', { cwd: postsDir });
      console.log(`Found ${mdFiles.length} .md blog posts`);

      mdFiles.forEach(file => {
        // Skip metadata files
        if (file.startsWith('_')) return;

        const slug = file.replace(/\.md$/, '');
        validSlugs.add(slug); // Add to valid slugs set
        blogPosts.push({
          url: `/blog/${slug}`,
          priority: 0.8,
          changefreq: 'daily'
        });
      });

      // Also check for .mdx files (future-proofing)
      const mdxFiles = glob.sync('**/*.mdx', { cwd: postsDir });
      console.log(`Found ${mdxFiles.length} .mdx blog posts`);

      mdxFiles.forEach(file => {
        if (file.startsWith('_')) return;

        const slug = file.replace(/\.mdx$/, '');
        validSlugs.add(slug); // Add to valid slugs set
        blogPosts.push({
          url: `/blog/${slug}`,
          priority: 0.8,
          changefreq: 'daily'
        });
      });
    } else {
      console.log('Posts directory not found');
    }
  } catch (error) {
    console.error('Error processing blog posts:', error);
  }

  return { blogPosts, validSlugs };
}

// Main process
if (!fs.existsSync(sitemapPath)) {
  console.log('Sitemap not found, creating a new one...');

  // Start with default URLs
  const urls = [...defaultUrls];

  // Add blog posts
  const { blogPosts } = collectBlogPosts();
  urls.push(...blogPosts);

  // Write the sitemap
  fs.writeFileSync(sitemapPath, generateSitemapXml(urls));
  console.log('New sitemap created successfully!');
} else {
  console.log('Sitemap exists, updating...');

  // Read existing sitemap
  const existingSitemap = fs.readFileSync(sitemapPath, 'utf8');
  const existingUrls = extractUrlsFromSitemap(existingSitemap);
  console.log(`Found ${existingUrls.length} URLs in existing sitemap`);

  // Get blog post URLs and valid slugs
  const { blogPosts, validSlugs } = collectBlogPosts();

  // Create a set of default URLs for quick lookup
  const defaultUrlSet = new Set(defaultUrls.map(item => item.url));

  // Filter out URLs that no longer exist (deleted blog posts)
  const updatedUrls = existingUrls.filter(item => {
    // Keep all default URLs
    if (defaultUrlSet.has(item.url)) return true;

    // For blog posts, check if they still exist
    if (item.url.startsWith('/blog/')) {
      const slug = item.url.replace('/blog/', '');
      return validSlugs.has(slug);
    }

    // Keep other URLs (case studies, services, etc.)
    return true;
  });

  console.log(`Removed ${existingUrls.length - updatedUrls.length} deleted blog posts from sitemap`);

  // Create a map of existing URLs for easy lookup
  const urlMap = new Map();
  updatedUrls.forEach(item => urlMap.set(item.url, item));

  // Add new blog posts that don't already exist
  let addedCount = 0;
  blogPosts.forEach(post => {
    if (!urlMap.has(post.url)) {
      updatedUrls.push(post);
      addedCount++;
    }
  });

  console.log(`Added ${addedCount} new blog posts to sitemap`);

  // Write updated sitemap
  fs.writeFileSync(sitemapPath, generateSitemapXml(updatedUrls));
  console.log('Sitemap updated successfully!');
}

console.log('Sitemap generation completed.');
