# Case Study Layout Documentation

## Overview

All case study pages use a consistent global layout component (`CaseStudyLayout`) that provides a standardized 3-column grid structure with optional TOC and right rail (sidebar) components.

## Components

### CaseStudyLayout

The main layout wrapper that handles:
- 3-column grid (TOC | Article | Right Rail) on desktop (≥1280px)
- Single column stacking on mobile/tablet (<1280px)
- Sticky positioning for TOC and sidebar when space allows
- Full-bleed right rail on wide screens (≥1440px)

**Props:**
- `children` - Article content (required)
- `toc` - Table of Contents component (optional)
- `sidebar` - Right rail component (optional)
- `className` - Additional CSS classes (optional)

**Usage:**
```jsx
<CaseStudyLayout
  toc={<Outline content={postContent} />}
  sidebar={<CaseStudySidebar companyHighlights={data} title={title} />}
>
  {/* Article content */}
</CaseStudyLayout>
```

### CaseStudySidebar

Reusable right rail component that includes:
- Company Highlights card (from frontmatter)
- "Book a demo" CTA card

**Props:**
- `companyHighlights` - Object with company data (optional)
- `title` - Post title for fallback company name extraction

**Usage:**
```jsx
<CaseStudySidebar
  companyHighlights={postData.companyHighlights}
  title={postData.title}
/>
```

## Frontmatter Fields

To populate the Company Highlights sidebar, add `companyHighlights` to your case study metadata:

```javascript
{
  slug: "your-case-study-slug",
  title: "Your Case Study Title",
  // ... other fields
  companyHighlights: {
    company: "Company Name",
    headquarters: "City, Country",
    funding: "Series A / Bootstrapped / etc",
    industry: "DevTools / AI / FinOps / etc",
    employees: "1–10 / 11–50 / etc",
    cloud: "AWS · Terraform · Kubernetes",
    website: "company.com"
  }
}
```

**Note:** If `companyHighlights` is missing, the card will still render with the company name extracted from the title.

## Layout Rules

### Grid Structure

- **Outer container**: Centered, `max-width: 1440px` (clamped), side padding `24-32px`
- **Desktop (≥1280px)**: 
  - TOC: `clamp(220px, 16vw, 280px)`
  - Article: `minmax(0, 1fr)`
  - Sidebar: `clamp(300px, 24vw, 360px)` (full-bleed positioned)
  - Gap: `32px` (increases to `40px` at ≥1600px)
- **Mobile/Tablet (<1280px)**: Single column, order: Article → TOC → Sidebar

### Sticky Behavior

- **TOC + Sidebar**: `position: sticky; top: 96px` only when grid is 3-column (≥1280px)
- **Disabled** below 1280px
- All ancestors have `overflow: visible` to ensure sticky works

### Full-bleed Right Rail (≥1440px)

- Sidebar extends to viewport right edge with safe inset (`24-32px`)
- Maintains hard gap `≥32px` from article column
- Container padding adjusted to prevent overlap

### Guards

- **Scroll margin**: `120px` on `h2+` headings for anchor navigation
- **Media**: All images/media use `max-width: 100%; height: auto;`
- **No overflow**: Content never crosses into side columns

## Data Test Selectors

For testing purposes, the following `data-test` attributes are available:

- `data-test="layout-grid"` - Main grid container
- `data-test="toc"` - Table of Contents column
- `data-test="article"` - Article column
- `data-test="sidebar"` - Sidebar wrapper
- `data-test="sidebar-cta"` - "Book a demo" CTA card
- `data-test="sidebar-title"` - CTA card heading

## Default Integration

All case studies automatically use this layout when using the `[slug]` route template. Simply ensure your case study:

1. Has `category: "Case Studies"` in `_postMetadata.js`
2. Optionally includes `companyHighlights` object in metadata
3. Uses the standard `page.jsx` template

The layout will be applied automatically to all existing and new case studies.

