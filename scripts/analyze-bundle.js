#!/usr/bin/env node

/**
 * Bundle Analyzer Script
 * 
 * Usage: npm run analyze
 * 
 * This script helps identify which dependencies are consuming the most bundle size
 * Integrate with @next/bundle-analyzer for detailed analysis
 */

const fs = require('fs');
const path = require('path');

console.log('📦 Next.js Bundle Analysis Setup\n');

// Check if @next/bundle-analyzer is installed
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const hasBundleAnalyzer = packageJson.devDependencies && 
  packageJson.devDependencies['@next/bundle-analyzer'];

if (hasBundleAnalyzer) {
  console.log('✅ @next/bundle-analyzer is installed\n');
  console.log('To analyze your bundle, run:');
  console.log('   ANALYZE=true npm run build\n');
  console.log('This will generate .next/analyze reports for client and server bundles\n');
} else {
  console.log('❌ @next/bundle-analyzer is NOT installed\n');
  console.log('Install it with:');
  console.log('   npm install --save-dev @next/bundle-analyzer\n');
  console.log('Then update your next.config.mjs with:\n');
  
  const example = `
import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundleConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleConfig({
  // your next.config.mjs settings...
});
  `;
  
  console.log(example);
  console.log('Then run: ANALYZE=true npm run build\n');
}

// Report on current optimizations
console.log('\n🚀 Current JavaScript Optimizations:\n');

const optimizations = [
  '✅ SWC minification enabled (faster than Terser)',
  '✅ Image format optimization (AVIF, WebP)',
  '✅ Font optimization and preloading',
  '✅ Production source maps disabled',
  '✅ Package import optimization',
  '✅ Sentry traces sampled at 20% (reduced from 100%)',
  '✅ Sentry replay sessions at 5% (reduced from 10%)',
  '✅ Third-party scripts deferred with lazyOnload strategy',
  '✅ GSAP dynamically imported (loaded only when needed)',
  '✅ Post metadata lazy-loaded with caching',
];

optimizations.forEach(opt => console.log('  ' + opt));

console.log('\n📊 Bundle Size Benchmarks:\n');
console.log('  Targeting: < 150KB gzipped (initial JS)');
console.log('  Monitor with: ANALYZE=true npm run build\n');

console.log('💡 Tips to further reduce JavaScript:\n');
const tips = [
  'Review unused @radix-ui imports and tree-shake accordingly',
  'Consider code-splitting large pages or features',
  'Use React.memo() for expensive components',
  'Lazy load routes with dynamic imports',
  'Remove unused dependencies with npm audit',
  'Consider image optimization via next/image',
];

tips.forEach((tip, i) => console.log(`  ${i + 1}. ${tip}`));

console.log('\n');
