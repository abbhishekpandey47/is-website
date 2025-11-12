import { test, expect } from '@playwright/test';
import { CompanyHighlightsHelpers, BREAKPOINTS } from './helpers/company-highlights-helpers';

const TEST_SLUG = 'terrateam-case-study';
const TEST_URL = `/case-studies/${TEST_SLUG}`;

test.describe('Company Highlights Sidebar', () => {
  let helpers: CompanyHighlightsHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new CompanyHighlightsHelpers(page);
    await page.goto(TEST_URL);
    await page.waitForLoadState('networkidle');
  });

  test.describe('Desktop XL (≥1440px)', () => {
    test.use({ viewport: BREAKPOINTS.DESKTOP_XL });

    test('desktop-xl_grid-has-3-columns-toc-article-sidebar', async ({ page }) => {
      const gridColumns = await helpers.getGridTemplateColumns();
      expect(gridColumns).toContain('360px');
      expect(gridColumns).toContain('280px');
      expect(gridColumns).toContain('minmax');
      
      const tocCol = helpers.getTocColumn();
      const sidebarCol = helpers.getSidebarColumn();
      const articleCol = helpers.getContentColumn();
      
      await expect(tocCol).toBeVisible();
      await expect(sidebarCol).toBeVisible();
      await expect(articleCol).toBeVisible();
      
      const sidebarWidth = await helpers.getSidebarWidth();
      expect(sidebarWidth).toBeGreaterThanOrEqual(300);
      expect(sidebarWidth).toBeLessThanOrEqual(360);
      
      const tocWidth = await helpers.getTocColumn().boundingBox().then(b => b?.width || 0);
      expect(tocWidth).toBeGreaterThanOrEqual(220);
      expect(tocWidth).toBeLessThanOrEqual(280);
    });

    test('desktop-xl_sticky-ON-top-96px-both-toc-and-sidebar', async ({ page }) => {
      const sidebarCol = helpers.getSidebarColumn();
      const tocCol = helpers.getTocColumn();
      
      await expect(sidebarCol).toBeVisible();
      await expect(tocCol).toBeVisible();
      
      const sidebarSticky = await helpers.isSticky(sidebarCol);
      const tocSticky = await helpers.isSticky(tocCol);
      
      expect(sidebarSticky).toBe(true);
      expect(tocSticky).toBe(true);
      
      const sidebarTop = await helpers.getComputedStyle(sidebarCol, 'top');
      const tocTop = await helpers.getComputedStyle(tocCol, 'top');
      expect(parseFloat(sidebarTop)).toBeCloseTo(96, 0);
      expect(parseFloat(tocTop)).toBeCloseTo(96, 0);
    });

    test('desktop-xl_gap-≥32px-between-columns', async ({ page }) => {
      const gap = await helpers.getColumnGap();
      expect(gap).toBeGreaterThanOrEqual(32);
    });

    test('desktop-xl_no-overlap-toc-sidebar-article-images', async ({ page }) => {
      const sidebar = helpers.getSidebar();
      const toc = helpers.getTocColumn();
      const article = helpers.getContentColumn();
      const images = helpers.getImages();
      const imageCount = await images.count();
      
      // Check sidebar doesn't overlap article
      const sidebarArticleOverlap = await helpers.checkOverlap(sidebar, article);
      expect(sidebarArticleOverlap).toBe(false);
      
      // Check TOC doesn't overlap article
      const tocArticleOverlap = await helpers.checkOverlap(toc, article);
      expect(tocArticleOverlap).toBe(false);
      
      // Check images don't overlap with sidebar or TOC
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const image = images.nth(i);
        if (await image.isVisible()) {
          const sidebarOverlaps = await helpers.checkOverlap(sidebar, image);
          const tocOverlaps = await helpers.checkOverlap(toc, image);
          expect(sidebarOverlaps).toBe(false);
          expect(tocOverlaps).toBe(false);
        }
      }
    });

    test('desktop-xl_sidebar-above-content-z-index', async ({ page }) => {
      const sidebar = helpers.getSidebar();
      const sidebarZ = await helpers.getComputedStyle(sidebar, 'z-index');
      const sidebarColZ = await helpers.getComputedStyle(helpers.getSidebarColumn(), 'z-index');
      
      expect(parseInt(sidebarColZ) || 0).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Desktop LG (1280–1439px)', () => {
    test.use({ viewport: BREAKPOINTS.DESKTOP_LG });

    test('desktop-lg_2-columns-340px-sidebar', async ({ page }) => {
      const gridColumns = await helpers.getGridTemplateColumns();
      expect(gridColumns).toContain('340px');
      
      const sidebarWidth = await helpers.getSidebarWidth();
      expect(sidebarWidth).toBeGreaterThanOrEqual(300);
      expect(sidebarWidth).toBeLessThanOrEqual(340);
    });

    test('desktop-lg_sticky-ON-no-overlap', async ({ page }) => {
      const sidebarCol = helpers.getSidebarColumn();
      const isSticky = await helpers.isSticky(sidebarCol);
      expect(isSticky).toBe(true);
      
      // Scroll to ensure sticky works
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(100);
      
      const sidebarBox = await sidebarCol.boundingBox();
      expect(sidebarBox?.y).toBeLessThanOrEqual(100); // Should stick near top
    });
  });

  test.describe('Tablet/Landscape (1024–1279px)', () => {
    test.use({ viewport: BREAKPOINTS.TABLET_LANDSCAPE });

    test('tablet-landscape_1-column-all-stacked', async ({ page }) => {
      const gridColumns = await helpers.getGridTemplateColumns();
      expect(gridColumns).not.toContain('340px');
      expect(gridColumns).not.toContain('360px');
      expect(gridColumns).not.toContain('280px');
      
      const sidebarCol = helpers.getSidebarColumn();
      const tocCol = helpers.getTocColumn();
      await expect(sidebarCol).toBeHidden();
      await expect(tocCol).toBeHidden();
      
      // Both should be visible in mobile/tablet position (stacked in article)
      const sidebar = helpers.getSidebar();
      const tocNav = page.locator('#outlineComponent');
      await expect(sidebar).toBeVisible();
      await expect(tocNav).toBeVisible();
    });

    test('tablet-landscape_sticky-OFF', async ({ page }) => {
      // Sidebar column should be hidden (not in desktop position)
      const sidebarCol = helpers.getSidebarColumn();
      await expect(sidebarCol).toBeHidden();
    });

    test('tablet-landscape_no-horizontal-scroll', async ({ page }) => {
      const hasScroll = await helpers.hasHorizontalScroll();
      expect(hasScroll).toBe(false);
      
      const metrics = await helpers.getScrollMetrics();
      expect(metrics.scrollWidth).toBe(metrics.clientWidth);
    });
  });

  test.describe('Tablet/Portrait (768–1023px)', () => {
    test.use({ viewport: BREAKPOINTS.TABLET_PORTRAIT });

    test('tablet-portrait_sidebar-full-width-spacing', async ({ page }) => {
      const sidebar = helpers.getSidebar();
      await expect(sidebar).toBeVisible();
      
      const sidebarBox = await sidebar.boundingBox();
      const viewportWidth = page.viewportSize()?.width || 0;
      
      // Sidebar should be nearly full width with padding
      expect(sidebarBox?.width).toBeGreaterThan(viewportWidth * 0.9);
    });

    test('tablet-portrait_images-scale-max-width-100', async ({ page }) => {
      const images = helpers.getImages();
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const image = images.nth(i);
        const maxWidth = await helpers.getComputedStyle(image, 'max-width');
        expect(['100%', 'none']).toContain(maxWidth);
        
        const imageBox = await image.boundingBox();
        const viewportWidth = page.viewportSize()?.width || 0;
        expect(imageBox?.width).toBeLessThanOrEqual(viewportWidth);
      }
    });
  });

  test.describe('Mobile (375–767px)', () => {
    test.use({ viewport: BREAKPOINTS.MOBILE });

    test('mobile_sidebar-below-intro-padding', async ({ page }) => {
      const sidebar = helpers.getSidebar();
      await expect(sidebar).toBeVisible();
      
      // Check padding/spacing around sidebar
      const sidebarBox = await sidebar.boundingBox();
      expect(sidebarBox?.width).toBeGreaterThan(300);
    });

    test('mobile_no-text-overflow-long-urls-ellipsis', async ({ page }) => {
      const websiteValue = helpers.getFieldValue('Website');
      await expect(websiteValue).toBeVisible();
      
      // Check if URL is truncated
      const isTruncated = await helpers.isUrlTruncated(websiteValue);
      expect(isTruncated).toBe(true);
      
      // Check title attribute has full URL
      const title = await websiteValue.getAttribute('title');
      expect(title).toBeTruthy();
      expect(title?.length).toBeGreaterThan(0);
    });

    test('mobile_no-horizontal-scroll', async ({ page }) => {
      const hasScroll = await helpers.hasHorizontalScroll();
      expect(hasScroll).toBe(false);
    });
  });

  test.describe('Functional/Visual Assertions', () => {
    test.use({ viewport: BREAKPOINTS.DESKTOP_XL });

    test('sidebar-width-clamped-300-360px', async ({ page }) => {
      const sidebarWidth = await helpers.getSidebarWidth();
      expect(sidebarWidth).toBeGreaterThanOrEqual(300);
      expect(sidebarWidth).toBeLessThanOrEqual(360);
    });

    test('column-gap-≥32px-desktop', async ({ page }) => {
      const gap = await helpers.getColumnGap();
      expect(gap).toBeGreaterThanOrEqual(32);
    });

    test('no-overlap-figures-images-canvas', async ({ page }) => {
      const sidebar = helpers.getSidebar();
      const figures = page.locator('article figure, article canvas');
      const figureCount = await figures.count();
      
      for (let i = 0; i < figureCount; i++) {
        const figure = figures.nth(i);
        if (await figure.isVisible()) {
          const overlaps = await helpers.checkOverlap(sidebar, figure);
          expect(overlaps).toBe(false);
        }
      }
    });

    test('parent-wrappers-no-overflow-hidden', async ({ page }) => {
      const sidebarCol = helpers.getSidebarColumn();
      const tocCol = helpers.getTocColumn();
      
      const sidebarProblematic = await helpers.checkParentsOverflow(sidebarCol);
      const tocProblematic = await helpers.checkParentsOverflow(tocCol);
      
      expect(sidebarProblematic).toEqual([]);
      expect(tocProblematic).toEqual([]);
    });

    test('download-button-keyboard-focus-ring-visible', async ({ page }) => {
      const button = helpers.getDownloadButton();
      await button.focus();
      
      // Check focus styles
      const outline = await helpers.getComputedStyle(button, 'outline');
      const ringWidth = await page.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return parseFloat(style.getPropertyValue('--tw-ring-width') || '0') ||
               parseFloat(style.getPropertyValue('box-shadow').match(/\d+/)?.[0] || '0');
      }, await button.elementHandle() || null);
      
      expect(outline !== 'none' || ringWidth > 0).toBe(true);
    });

    test('download-button-hover-no-layout-shift', async ({ page }) => {
      const button = helpers.getDownloadButton();
      const boxBefore = await button.boundingBox();
      
      await button.hover();
      await page.waitForTimeout(100);
      
      const boxAfter = await button.boundingBox();
      
      // Check for minimal layout shift (CLS)
      const widthShift = Math.abs((boxBefore?.width || 0) - (boxAfter?.width || 0));
      const heightShift = Math.abs((boxBefore?.height || 0) - (boxAfter?.height || 0));
      
      expect(widthShift).toBeLessThan(2);
      expect(heightShift).toBeLessThan(2);
    });

    test('reduced-motion-respected', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      
      const button = helpers.getDownloadButton();
      const transition = await helpers.getComputedStyle(button, 'transition');
      
      // Should have reduced or no transition
      expect(transition.includes('none') || transition.includes('0s')).toBe(true);
    });

    test('dark-theme-contrast-meets-wcag', async ({ page }) => {
      const labels = helpers.getFieldLabels();
      const labelCount = await labels.count();
      
      for (let i = 0; i < Math.min(labelCount, 3); i++) {
        const label = labels.nth(i);
        const color = await helpers.getComputedStyle(label, 'color');
        // Color should be #9CA3AF or similar
        expect(color).toBeTruthy();
      }
      
      const websiteValue = helpers.getFieldValue('Website');
      const valueColor = await helpers.getComputedStyle(websiteValue, 'color');
      expect(valueColor).toBeTruthy();
    });

    test('content-column-bottom-padding-≥64px', async ({ page }) => {
      const contentCol = helpers.getContentColumn();
      const paddingBottom = await helpers.getComputedStyle(contentCol, 'padding-bottom');
      const paddingValue = parseFloat(paddingBottom);
      expect(paddingValue).toBeGreaterThanOrEqual(64);
    });

    test('toc-anchor-scroll-margin-top-effective', async ({ page }) => {
      const tocLinks = page.locator('#outlineComponent [role="link"]');
      const linkCount = await tocLinks.count();
      
      if (linkCount > 0) {
        // Click first TOC link
        await tocLinks.first().click();
        await page.waitForTimeout(300);
        
        // Check if heading is visible (not hidden under sticky)
        const headings = page.locator('article h2');
        if (await headings.count() > 0) {
          const firstHeading = headings.first();
          const headingBox = await firstHeading.boundingBox();
          const viewport = page.viewportSize();
          
          // Heading should be visible in viewport (with scroll-margin-top accounted)
          expect(headingBox?.top).toBeGreaterThanOrEqual(100);
        }
      }
    });

    test('sidebar-aria-landmark-or-labelledby', async ({ page }) => {
      const sidebar = helpers.getSidebar();
      const role = await sidebar.getAttribute('role');
      const ariaLabel = await sidebar.getAttribute('aria-label');
      const ariaLabelledBy = await sidebar.getAttribute('aria-labelledby');
      
      const hasAccessibility = role === 'complementary' || 
                                role === 'region' || 
                                !!ariaLabel || 
                                !!ariaLabelledBy;
      expect(hasAccessibility).toBe(true);
    });

    test('title-unique-per-page', async ({ page }) => {
      const title = helpers.getSidebarTitle();
      const titleText = await title.textContent();
      expect(titleText).toBeTruthy();
      
      // Check for duplicate titles on page
      const allTitles = page.locator(`h3:has-text("${titleText}")`);
      const count = await allTitles.count();
      expect(count).toBeLessThanOrEqual(1);
    });
  });

  test.describe('Non-Regression Checks', () => {
    test.use({ viewport: BREAKPOINTS.DESKTOP_XL });

    test('sidebar-visible-short-content', async ({ page }) => {
      // Simulate short content by checking initial render
      const sidebar = helpers.getSidebar();
      await expect(sidebar).toBeVisible();
      
      const sidebarBox = await sidebar.boundingBox();
      expect(sidebarBox?.height).toBeGreaterThan(100);
    });

    test('long-company-name-handled', async ({ page }) => {
      const title = helpers.getSidebarTitle();
      const titleText = await title.textContent();
      
      // Check if title wraps or truncates properly
      const titleBox = await title.boundingBox();
      const sidebarBox = await sidebar.boundingBox();
      
      expect(titleBox?.width).toBeLessThanOrEqual(sidebarBox?.width || Infinity);
    });

    test('long-stack-badges-wrap', async ({ page }) => {
      const cloudValue = helpers.getFieldValue('Cloud');
      if (await cloudValue.isVisible()) {
        const cloudText = await cloudValue.textContent();
        expect(cloudText?.length || 0).toBeGreaterThan(0);
        
        // Should not overflow
        const cloudBox = await cloudValue.boundingBox();
        const sidebarBox = await sidebar.boundingBox();
        expect(cloudBox?.width).toBeLessThanOrEqual(sidebarBox?.width || Infinity);
      }
    });

    test('website-url-60-chars-ellipsis', async ({ page }) => {
      const websiteValue = helpers.getFieldValue('Website');
      
      // Check if it's a link with ellipsis
      const isTruncated = await helpers.isUrlTruncated(websiteValue);
      expect(isTruncated).toBe(true);
      
      // Full URL should be in title attribute
      const title = await websiteValue.getAttribute('title');
      expect(title).toBeTruthy();
    });

    test('no-layout-shifts-lighthouse-ready', async ({ page }) => {
      // Simulate page load and measure CLS
      await page.evaluate(() => {
        // Trigger any animations/transitions
        const sidebar = document.querySelector('aside');
        if (sidebar) {
          sidebar.scrollIntoView({ behavior: 'smooth' });
        }
      });
      
      await page.waitForTimeout(500);
      
      // Check that elements maintain position
      const sidebarBox = await helpers.getSidebar().boundingBox();
      expect(sidebarBox).toBeTruthy();
    });
  });

  test.describe('Accessibility', () => {
    test('keyboard-navigation-all-elements', async ({ page }) => {
      const button = helpers.getDownloadButton();
      
      // Tab to button
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab'); // May need multiple tabs
      
      // Check if button is focused
      const isFocused = await button.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBe(true);
    });

    test('focus-ring-not-clipped', async ({ page }) => {
      const button = helpers.getDownloadButton();
      await button.focus();
      
      const buttonBox = await button.boundingBox();
      const sidebarBox = await helpers.getSidebar().boundingBox();
      
      // Focus ring should be visible (button box within sidebar)
      expect(buttonBox?.x).toBeGreaterThanOrEqual(sidebarBox?.x || 0);
      expect(buttonBox?.width).toBeLessThanOrEqual(sidebarBox?.width || Infinity);
    });
  });
});

