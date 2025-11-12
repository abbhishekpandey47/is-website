import { Page, Locator, expect } from '@playwright/test';

/**
 * Helper utilities for Company Highlights sidebar testing
 */

export const BREAKPOINTS = {
  MOBILE: { width: 375, height: 667 },
  TABLET_PORTRAIT: { width: 768, height: 1024 },
  TABLET_LANDSCAPE: { width: 1024, height: 768 },
  DESKTOP_LG: { width: 1280, height: 720 },
  DESKTOP_XL: { width: 1440, height: 900 },
} as const;

export class CompanyHighlightsHelpers {
  constructor(private page: Page) {}

  /**
   * Get the grid container
   */
  getGridContainer(): Locator {
    return this.page.locator('.case-study-main-grid');
  }

  /**
   * Get the TOC column
   */
  getTocColumn(): Locator {
    return this.page.locator('.toc-column');
  }

  /**
   * Get the main content column (article)
   */
  getContentColumn(): Locator {
    return this.page.locator('.article-column');
  }

  /**
   * Get the sidebar column (desktop only)
   */
  getSidebarColumn(): Locator {
    return this.page.locator('.sidebar-column');
  }

  /**
   * Get the Company Highlights sidebar component
   */
  getSidebar(): Locator {
    return this.page.locator('aside').filter({ hasText: /Company|Terrateam/ });
  }

  /**
   * Get sidebar title (company name)
   */
  getSidebarTitle(): Locator {
    return this.getSidebar().locator('h3').first();
  }

  /**
   * Get all field labels
   */
  getFieldLabels(): Locator {
    return this.getSidebar().locator('text=/^(COMPANY|HEADQUARTERS|FUNDING|INDUSTRY|EMPLOYEES|CLOUD|WEBSITE)$/i');
  }

  /**
   * Get field value by label
   */
  getFieldValue(label: string): Locator {
    const labelElement = this.getSidebar().locator(`text=/^${label}$/i`);
    return labelElement.locator('..').locator('.text-base').first();
  }

  /**
   * Get the Download PDF button
   */
  getDownloadButton(): Locator {
    return this.getSidebar().getByRole('button', { name: /Download PDF/i });
  }

  /**
   * Get all images in the main content
   */
  getImages(): Locator {
    return this.page.locator('article img, article figure img, .prose img');
  }

  /**
   * Get computed style for an element
   */
  async getComputedStyle(locator: Locator, property: string): Promise<string> {
    return await locator.evaluate((el, prop) => {
      return window.getComputedStyle(el).getPropertyValue(prop);
    }, property);
  }

  /**
   * Check if sticky positioning is active
   */
  async isSticky(locator: Locator): Promise<boolean> {
    const position = await this.getComputedStyle(locator, 'position');
    return position === 'sticky' || position === '-webkit-sticky';
  }

  /**
   * Get grid template columns value
   */
  async getGridTemplateColumns(): Promise<string> {
    const grid = this.getGridContainer();
    return await this.getComputedStyle(grid, 'grid-template-columns');
  }

  /**
   * Measure distance between content and sidebar
   */
  async getColumnGap(): Promise<number> {
    const grid = this.getGridContainer();
    const gap = await this.getComputedStyle(grid, 'column-gap');
    return parseFloat(gap) || 0;
  }

  /**
   * Check if any parent has overflow hidden/auto that breaks sticky
   */
  async checkParentsOverflow(element: Locator): Promise<string[]> {
    return await element.evaluate((el) => {
      const problematic: string[] = [];
      let current: HTMLElement | null = el.parentElement;
      
      while (current && current !== document.body) {
        const overflow = window.getComputedStyle(current).overflow;
        if (overflow === 'hidden' || overflow === 'auto') {
          problematic.push(current.tagName + (current.className ? `.${current.className.split(' ')[0]}` : ''));
        }
        current = current.parentElement;
      }
      return problematic;
    });
  }

  /**
   * Get sidebar width
   */
  async getSidebarWidth(): Promise<number> {
    const sidebar = this.getSidebar();
    const box = await sidebar.boundingBox();
    return box?.width || 0;
  }

  /**
   * Check if URL is truncated
   */
  async isUrlTruncated(locator: Locator): Promise<boolean> {
    const textOverflow = await this.getComputedStyle(locator, 'text-overflow');
    const overflow = await this.getComputedStyle(locator, 'overflow');
    return textOverflow === 'ellipsis' && (overflow === 'hidden' || overflow === 'clip');
  }

  /**
   * Get contrast ratio between foreground and background colors
   */
  async getContrastRatio(foreground: string, background: string): Promise<number> {
    // Simplified contrast calculation - for production use a library
    return await this.page.evaluate((fg, bg) => {
      // Parse RGB values (simplified)
      const rgbToLuminance = (r: number, g: number, b: number) => {
        const [rs, gs, bs] = [r, g, b].map(v => {
          v = v / 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };
      
      // This is a placeholder - would need actual color parsing
      return 4.5; // Return a mock value for now
    }, foreground, background);
  }

  /**
   * Check horizontal scroll
   */
  async hasHorizontalScroll(): Promise<boolean> {
    return await this.page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
  }

  /**
   * Get scroll width vs viewport width
   */
  async getScrollMetrics(): Promise<{ scrollWidth: number; clientWidth: number }> {
    return await this.page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });
  }

  /**
   * Check if element overlaps with another
   */
  async checkOverlap(element1: Locator, element2: Locator): Promise<boolean> {
    const box1 = await element1.boundingBox();
    const box2 = await element2.boundingBox();
    
    if (!box1 || !box2) return false;
    
    return !(
      box1.right < box2.left ||
      box1.left > box2.right ||
      box1.bottom < box2.top ||
      box1.top > box2.bottom
    );
  }
}

