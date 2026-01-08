const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const fg = require('fast-glob');

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
const appDir = path.join(__dirname, '..', 'src', 'app');
const staticRouteMap = buildStaticRouteMap();

function buildStaticRouteMap() {
  const map = new Map();
  const routeFiles = fg.sync('**/page.*', { cwd: appDir, onlyFiles: true });

  for (const routeFile of routeFiles) {
    if (routeFile.includes('[')) continue; // Skip dynamic routes

    const normalizedRoute = routeFile
      .replaceAll('\\', '/')
      .replace(/\/page(?:\.[^/]*)?$/, '')
      .replace(/\/$/, '');

    const routePath = normalizedRoute === '' ? '/' : `/${normalizedRoute}`;
    if (!map.has(routePath)) {
      map.set(routePath, path.join(appDir, routeFile));
    }
  }

  return map;
}

function findPostContentFile(slug) {
  const extensions = ['md', 'mdx', 'markdown'];

  for (const ext of extensions) {
    const candidate = path.join(postsDir, `${slug}.${ext}`);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  const matches = fg.sync(`**/${slug}.@(md|mdx|markdown)`, {
    cwd: postsDir,
    absolute: true,
    onlyFiles: true,
  });

  return matches[0] || null;
}

function getLastModifiedDateForUrl(url) {
  const candidates = [];

  if (staticRouteMap.has(url)) {
    candidates.push(staticRouteMap.get(url));
  }

  const postMatch = url.match(/^\/(?:blog|case-studies|tutorials)\/(.+)$/);
  if (postMatch) {
    const postFile = findPostContentFile(postMatch[1]);
    if (postFile) {
      candidates.push(postFile);
    }
  }

  const mtimes = [];

  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;

    try {
      mtimes.push(fs.statSync(file).mtime);
    } catch (error) {
      console.debug(`Failed to stat ${file}:`, error);
    }
  }

  if (mtimes.length === 0) {
    return null;
  }

  return new Date(Math.max(...mtimes.map(date => date.getTime())));
}

// Default URLs (used if sitemap doesn't exist or for validation)
const defaultUrls = [
  { url: '/', priority: 1, changefreq: 'daily' },
  { url: '/blog', priority: 0.9, changefreq: 'daily' },
  { url: '/contact', priority: 0.6, changefreq: 'weekly' },
  { url: '/faq', priority: 0.6, changefreq: 'weekly' },
  { url: '/privacy-policy', priority: 0.1, changefreq: 'weekly' },
  { url: '/terms-of-services', priority: 0.1, changefreq: 'weekly' },
  { url: '/case-studies', priority: 0.8, changefreq: 'weekly' },
  { url: '/tutorials', priority: 0.8, changefreq: 'weekly' },
  { url: '/service-blog-as-code', priority: 0.7, changefreq: 'daily' },
  { url: '/service-video-production', priority: 0.7, changefreq: 'daily' },
  { url: '/about', priority: 0.6, changefreq: 'weekly' },
];

// Function to generate sitemap XML content
function generateSitemapXml(urls) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  for (const { url, priority, changefreq } of urls) {
    const lastmodDate = getLastModifiedDateForUrl(url) ?? new Date();
    const lastmod = lastmodDate.toISOString();
    sitemap += `<url><loc>https://www.infrasity.com${url}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>\n`;
  }

  sitemap += `</urlset>`;
  return sitemap;
}

// Function to extract URLs from existing sitemap
function extractUrlsFromSitemap(sitemapContent) {
  const urls = [];
  const regex = /<url><loc>https:\/\/www\.infrasity\.com(.*?)<\/loc>.*?<changefreq>(.*?)<\/changefreq><priority>(.*?)<\/priority><\/url>/g;
  let match;

  while ((match = regex.exec(sitemapContent)) !== null) {
    urls.push({
      url: match[1],
      changefreq: match[2],
      priority: Number.parseFloat(match[3])
    });
  }

  return urls;
}

// Read _postMetadata.js directly to categorize content properly
function getPostMetadata() {
  try {
    // Require the metadata file directly (it exports the array)
    const metadataPath = path.join(__dirname, '..', 'posts', '_postMetadata.js');

    // Using eval here since we need to load the file dynamically
    // In a production environment, a more secure approach would be recommended
    const content = fs.readFileSync(metadataPath, 'utf8');
    const metadata = eval(content.replace('module.exports = postMetaData;', ''));

    return metadata;
  } catch (error) {
    console.error('Error reading post metadata:', error);
    return [];
  }
}

// Collect content by category
function collectContent() {
  console.log('Looking for content...');
  const blogPosts = [];
  const caseStudies = [];
  const tutorials = [];
  const validBlogSlugs = new Set();
  const validCaseStudySlugs = new Set();
  const validTutorialSlugs = new Set();

  // Get metadata directly
  const postMetadata = getPostMetadata();

  if (postMetadata && postMetadata.length > 0) {
    console.log(`Found ${postMetadata.length} posts in metadata`);

    postMetadata.forEach(post => {
      // Skip if no slug or category
      if (!post.slug || !post.category) return;

      // Categorize based on the 'category' field
      if (post.category === 'Case Studies') {
        validCaseStudySlugs.add(post.slug);
        caseStudies.push({
          url: `/case-studies/${post.slug}`,
          priority: 0.7,
          changefreq: 'monthly'
        });
      } else if (post.category === 'Tutorials') {
        validTutorialSlugs.add(post.slug);
        tutorials.push({
          url: `/blog/${post.slug}`,
          priority: 0.8,
          changefreq: 'weekly'
        });
      } else {
        // Everything else goes to blog
        validBlogSlugs.add(post.slug);
        blogPosts.push({
          url: `/blog/${post.slug}`,
          priority: 0.8,
          changefreq: 'daily'
        });
      }
    });
  } else {
    console.log('No posts found in metadata');

    // Fallback to file system if metadata loading fails
    try {
      if (fs.existsSync(postsDir)) {
        // Check for .md files
        const mdFiles = fg.sync('**/*.md', { cwd: postsDir });
        console.log(`Found ${mdFiles.length} .md files`);

        mdFiles.forEach(file => {
          // Skip metadata files
          if (file.startsWith('_')) return;

          const slug = file.replace(/\.md$/, '');
          validBlogSlugs.add(slug);

          // Default to blog when we can't determine the category
          blogPosts.push({
            url: `/blog/${slug}`,
            priority: 0.8,
            changefreq: 'daily'
          });
        });

        // Also check for .mdx files
        const mdxFiles = fg.sync('**/*.mdx', { cwd: postsDir });
        console.log(`Found ${mdxFiles.length} .mdx files`);

        mdxFiles.forEach(file => {
          if (file.startsWith('_')) return;

          const slug = file.replace(/\.mdx$/, '');
          validBlogSlugs.add(slug);

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
      console.error('Error processing files:', error);
    }
  }

  return {
    blogPosts,
    caseStudies,
    tutorials,
    validBlogSlugs,
    validCaseStudySlugs,
    validTutorialSlugs
  };
}

// Main process
if (fs.existsSync(sitemapPath)) {
  console.log('Sitemap exists, updating...');

  // Read existing sitemap
  const existingSitemap = fs.readFileSync(sitemapPath, 'utf8');
  const existingUrls = extractUrlsFromSitemap(existingSitemap);
  console.log(`Found ${existingUrls.length} URLs in existing sitemap`);

  // Get content and valid slugs
  const {
    blogPosts,
    caseStudies,
    tutorials,
    validBlogSlugs,
    validCaseStudySlugs,
    validTutorialSlugs
  } = collectContent();

  // Create a set of default URLs for quick lookup
  const defaultUrlSet = new Set(defaultUrls.map(item => item.url));

  // Filter out URLs that no longer exist
  const updatedUrls = existingUrls.filter(item => {
    // Keep all default URLs
    if (defaultUrlSet.has(item.url)) return true;

    // For blog posts, check if they still exist
    if (item.url.startsWith('/blog/')) {
      const slug = item.url.replace('/blog/', '');
      return validBlogSlugs.has(slug) || validTutorialSlugs.has(slug);
    }

    // For case studies, check if they still exist in case studies category
    if (item.url.startsWith('/case-studies/')) {
      const slug = item.url.replace('/case-studies/', '');
      return validCaseStudySlugs.has(slug);
    }

    // Keep other URLs (services, etc.)
    return true;
  });

  console.log(`Removed ${existingUrls.length - updatedUrls.length} deleted content items from sitemap`);

  // Create a map of existing URLs for easy lookup
  const urlMap = new Map();
  updatedUrls.forEach(item => urlMap.set(item.url, item));

  // Add new content that doesn't already exist
  let addedBlogCount = 0;
  let addedCaseStudyCount = 0;
  let addedTutorialCount = 0;

  blogPosts.forEach(post => {
    if (!urlMap.has(post.url)) {
      updatedUrls.push(post);
      addedBlogCount++;
    }
  });

  caseStudies.forEach(caseStudy => {
    if (!urlMap.has(caseStudy.url)) {
      updatedUrls.push(caseStudy);
      addedCaseStudyCount++;
    }
  });

  tutorials.forEach(tutorial => {
    if (!urlMap.has(tutorial.url)) {
      updatedUrls.push(tutorial);
      addedTutorialCount++;
    }
  });

  console.log(`Added ${addedBlogCount} new blog posts to sitemap`);
  console.log(`Added ${addedCaseStudyCount} new case studies to sitemap`);
  console.log(`Added ${addedTutorialCount} new tutorials to sitemap`);

  // Write updated sitemap
  fs.writeFileSync(sitemapPath, generateSitemapXml(updatedUrls));
  console.log('Sitemap updated successfully!');
} else {
  console.log('Sitemap not found, creating a new one...');

  // Start with default URLs
  const urls = [...defaultUrls];

  // Add content
  const { blogPosts, caseStudies, tutorials } = collectContent();
  urls.push(...blogPosts, ...caseStudies, ...tutorials);

  // Write the sitemap
  fs.writeFileSync(sitemapPath, generateSitemapXml(urls));
  console.log('New sitemap created successfully!');
}

console.log('Sitemap generation completed.');
