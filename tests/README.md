# Company Highlights Sidebar - Playwright Tests

Comprehensive test suite for verifying the Company Highlights sidebar layout and behavior across all breakpoints.

## Installation

```bash
# Install Playwright and browsers
npm install -D @playwright/test
npx playwright install

# Or install specific browsers only
npx playwright install chromium
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests for specific breakpoint
```bash
# Desktop XL
npx playwright test -g "Desktop XL"

# Mobile
npx playwright test -g "Mobile"

# Tablet
npx playwright test -g "Tablet"
```

### Run in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run in debug mode
```bash
npx playwright test --debug
```

### Run specific test file
```bash
npx playwright test tests/company-highlights.spec.ts
```

### Run with UI mode
```bash
npx playwright test --ui
```

## Test Coverage

### Breakpoints Tested
- **Desktop XL** (≥1440px): 2 columns, 360px sidebar, sticky ON
- **Desktop LG** (1280–1439px): 2 columns, 340px sidebar, sticky ON
- **Tablet/Landscape** (1024–1279px): 1 column, sidebar stacked, sticky OFF
- **Tablet/Portrait** (768–1023px): 1 column, full-width sidebar
- **Mobile** (375–767px): 1 column, sidebar below intro

### Functional Tests
- ✅ Grid layout and column configuration
- ✅ Sticky positioning behavior
- ✅ Column gap measurement
- ✅ Overlap detection with images/figures
- ✅ Sidebar width clamping (300–360px)
- ✅ Z-index hierarchy
- ✅ Parent overflow checks
- ✅ Keyboard navigation and focus rings
- ✅ Hover effects and layout shifts (CLS)
- ✅ Reduced motion support
- ✅ Dark theme contrast ratios
- ✅ ARIA accessibility
- ✅ URL truncation with ellipsis
- ✅ Horizontal scroll prevention
- ✅ Image scaling and constraints

## CI Integration

### GitHub Actions Example

```yaml
name: Playwright Tests

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

### Environment Variables

Set `BASE_URL` if your app runs on a different URL:
```bash
BASE_URL=https://staging.example.com npx playwright test
```

## Manual QA Checklist

Use this checklist for quick visual verification:

### Desktop ≥1440px
- [ ] Sidebar is sticky (remains visible on scroll)
- [ ] Sidebar width is exactly 360px
- [ ] Gap between content and sidebar is ≥32px
- [ ] No overlap with images or figures
- [ ] Scrolls smoothly without jank

### Desktop 1280–1439px
- [ ] Sidebar width is ~340px
- [ ] Sticky positioning works
- [ ] No overlap occurs

### ≤1279px (Tablet/Mobile)
- [ ] Sidebar stacks below intro section
- [ ] Sticky is disabled
- [ ] No horizontal scrolling
- [ ] Sidebar is full-width with proper padding

### Interactions
- [ ] Long website URLs truncate with ellipsis
- [ ] Hover on PDF button shows purple tint
- [ ] Button lift on hover is smooth (no jiggle)
- [ ] Focus ring on PDF button is visible and not clipped
- [ ] Keyboard navigation works (Tab to reach button)

### Visual
- [ ] Labels are muted gray (#9CA3AF)
- [ ] Values are readable (#E5E7EB)
- [ ] Contrast meets WCAG AA standards
- [ ] Images never cross into sidebar area
- [ ] Dark theme looks polished

## Troubleshooting

### Tests fail locally but pass in CI
- Ensure your local dev server matches production build
- Check for localhost-specific issues
- Verify viewport size matches test expectations

### Sticky positioning not detected
- Check if any parent has `overflow: hidden`
- Verify `top` value matches expected 96px
- Ensure sidebar column is visible on desktop breakpoints

### Overlap false positives
- Images might be loading lazily - add wait times
- Check for fixed positioning that might cause overlap
- Verify grid gap is actually applied

### URL truncation not working
- Check CSS for `text-overflow: ellipsis`
- Verify `overflow: hidden` and `white-space: nowrap` are set
- Ensure `title` attribute contains full URL

## Test Results

View HTML report:
```bash
npx playwright show-report
```

## Contributing

When adding new tests:
1. Follow naming convention: `breakpoint_test-name`
2. Use helper functions from `helpers/company-highlights-helpers.ts`
3. Add relevant assertions
4. Update this README if adding new test categories




