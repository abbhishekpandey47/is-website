#!/usr/bin/env node

/**
 * Script to validate that page files only export allowed Next.js App Router exports.
 * Allowed exports: metadata, generateMetadata, generateStaticParams, dynamic, 
 * dynamicParams, revalidate, fetchCache, runtime, preferredRegion, maxDuration, 
 * viewport, segment, and default.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ALLOWED_EXPORTS = new Set([
  'metadata',
  'generateMetadata',
  'generateStaticParams',
  'dynamic',
  'dynamicParams',
  'revalidate',
  'fetchCache',
  'runtime',
  'preferredRegion',
  'maxDuration',
  'viewport',
  'segment',
  'default',
]);

function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findPageFiles(filePath, fileList);
    } else if (/^page\.(js|jsx|ts|tsx)$/.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function extractExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const exports = new Set();

  // Match export const/function/class declarations
  const exportConstRegex = /export\s+(?:const|function|class|async\s+function)\s+(\w+)/g;
  let match;
  while ((match = exportConstRegex.exec(content)) !== null) {
    exports.add(match[1]);
  }

  // Match export { ... } syntax
  const exportNamedRegex = /export\s*\{[^}]*\b(\w+)\b[^}]*\}/g;
  while ((match = exportNamedRegex.exec(content)) !== null) {
    // Extract all identifiers from the export block
    const block = match[0];
    const identifiers = block.match(/\b(\w+)\b/g);
    if (identifiers) {
      identifiers.slice(1).forEach((id) => {
        if (id !== 'export' && id !== 'from') {
          exports.add(id);
        }
      });
    }
  }

  // Match export default
  if (/export\s+default/.test(content)) {
    exports.add('default');
  }

  return exports;
}

function checkPages() {
  const appDir = path.join(process.cwd(), 'src', 'app');
  
  if (!fs.existsSync(appDir)) {
    console.error(`App directory not found: ${appDir}`);
    process.exit(1);
  }

  const pageFiles = findPageFiles(appDir);
  let hasErrors = false;

  console.log(`Checking ${pageFiles.length} page files...\n`);

  pageFiles.forEach((filePath) => {
    const exports = extractExports(filePath);
    const invalidExports = Array.from(exports).filter(
      (exp) => !ALLOWED_EXPORTS.has(exp)
    );

    if (invalidExports.length > 0) {
      hasErrors = true;
      const relativePath = path.relative(process.cwd(), filePath);
      console.error(`❌ ${relativePath}`);
      console.error(`   Invalid exports: ${invalidExports.join(', ')}`);
      console.error(`   Allowed exports: ${Array.from(ALLOWED_EXPORTS).join(', ')}\n`);
    }
  });

  if (hasErrors) {
    console.error('\n❌ Found invalid exports in page files!');
    console.error('Move invalid exports to separate modules and import them locally.');
    process.exit(1);
  } else {
    console.log('✅ All page files have valid exports only.');
  }
}

checkPages();

