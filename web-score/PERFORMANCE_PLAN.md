# Core Web Vitals Optimization Plan - Reddit Marketing Agency LP

**Current Metrics (Feb 1, 6:34 PM):**
- FCP: 0.7s (Target: <0.5s) ❌ (-200ms needed)
- LCP: 1.7s (Target: <1.2s) ❌ (-500ms needed)
- TBT: 380ms (Target: <200ms) ❌ (-180ms needed)
- CLS: 0.003 (Target: <0.1) ✅
- **Current Score: 74/100** → Target: **90+/100** (16+ points needed)

**Previous Metrics (Feb 1, 6:09 PM):**
- FCP: 0.7s, LCP: 1.7s, TBT: 540ms → Only -160ms TBT improvement from prior changes
- Score was 52 → Now 74 (+22 points after first wave of optimizations)

**Total Potential Savings Remaining: 640+ KiB**

---

## Priority 1: Critical Rendering Path (Highest Impact on FCP/LCP)

### 1.1 Render-Blocking CSS (59.9 KiB, 240ms delay)
- **Issue**: `chunks/96d589c0b3342152.css` (59.9 KiB) blocks initial render for 240ms
- **Potential Savings**: 54.5 KiB unused CSS
- **Solution**:
  - Extract above-the-fold CSS for critical styles (hero, nav, first section)
  - Inline critical CSS in `<head>` or use `media="print"` for below-fold
  - Defer non-critical CSS with async loading
  - Status: NOT DONE

### 1.2 Font Loading Chain
- **Issue**: Multiple font files still loading sequentially (Quicksand-Bold, SemiBold, Medium, Light all 29-49 KiB)
- **Current**: Preloading only Light (29 KiB)
- **Solution**:
  - Keep Light/Medium preloaded (for hero/body text)
  - Load Bold/SemiBold as `font-display: swap` in CSS (not preload)
  - Add `preconnect` to ensure DNS resolved early
  - Status: PARTIALLY DONE (Quicksand-Light preloaded, but others not optimized)

---

## Priority 2: Script Evaluation & TBT (978ms script eval + 136ms forced reflows)

### 2.1 Reduce Unused JavaScript (242 KiB estimated savings)
- **Major bloat sources**:
  - `chunks/92d5eb87debc63cb.js`: 204.7 KiB (85.2 KiB unused)
  - `chunks/f50e3395f9440cf2.js`: 95.0 KiB (68.8 KiB unused)
  - `surveys.js` (Sentry): 31.3 KiB (24.6 KiB unused)
  - Empty modules: preact (5.7 KiB), survey components (9.0 KiB)
- **Solution**:
  - Identify what's in chunk 92d5eb87 - likely shared utils/polyfills
  - Check if surveys feature is actually used on page
  - Remove dead code from dynamic imports
  - Split larger chunks or lazy-load non-critical features
  - Status: NOT DONE

### 2.2 Fix Legacy JavaScript (33.1 KiB still present)
- **Issue**: Polyfills still bundled despite `target: 'es2020'` in webpack
  - Array.from, Array.prototype.at/flat/flatMap
  - Object.fromEntries, Object.hasOwn
  - String.prototype.trimStart/trimEnd
  - Math.trunc
- **Solution**:
  - Verify webpack config actually using `es2020` target for all chunks
  - Check if external libraries importing helpers (lodash, date-fns, etc.)
  - Use `terser` to remove unnecessary polyfills
  - Or upgrade libraries that depend on polyfills
  - Status: PARTIALLY DONE (webpack target set but not working)

### 2.3 Fix Forced Reflows (136ms total)
- **Issue**: JavaScript in chunk 92d5eb87 causing layout recalculations
  - Likely: carousel/slider measuring offsetWidth before DOM layout
  - Other chunk 92d5eb87 causing another 136ms
- **Solution**:
  - Defer or batch layout queries
  - Use `requestAnimationFrame` to group DOM reads/writes
  - Lazy-load carousel libraries until interaction
  - Status: NOT DONE

---

## Priority 3: Unused CSS (54.5 KiB)

- **Issue**: `chunks/96d589c0b3342152.css` has 54.5 KiB unused rules
- **Solution**:
  - Run PurgeCSS/Tailwind purge to remove unused selectors
  - Check if importing full CSS frameworks (Bootstrap, Tailwind, Material-UI)
  - Consider component-scoped styling instead of global CSS
  - Status: NOT DONE

---

## Priority 4: Third-Party Scripts (Keep but Defer)

### 4.1 Google Tag Manager (415.3 KiB, 158.8 KiB estimated savings)
- **Current**: Loading synchronously, blocking initial render
- **Solution**:
  - Already using `afterInteractive` strategy
  - Verify GTM is not delay-blocking other resources
  - Use GTM's own debouncing/lazy loading for sub-tags
  - Status: VERIFY

### 4.2 Surveys/Sentry (31.3 KiB + 5.7 KiB overhead)
- **Issue**: Sentry surveys.js + survey components loaded even if user doesn't trigger
- **Solution**:
  - Defer to `lazyOnload` if not critical
  - Check if actually used (may be dead code)
  - Status: NOT DONE (but preserve functionality)

---

## Priority 5: Other Optimizations

### 5.1 Image Optimization
- WhoPDF already converted to WebP ✅
- Testimonial images still JPG (64-49 KiB) - consider WebP
- Case study images - verify using optimized formats
- Status: PARTIAL (need to check remaining images)

### 5.2 Code Splitting
- Verify all dynamic imports using `ssr: false` are actually lazy-loaded
- Check if some imports could be moved to `lazyOnload` instead of `afterInteractive`
- Status: DONE (RedditMarketingAgencyClient structure good)

### 5.3 Cache Headers
- Opportunity to extend cache TTL on static assets (potential 393 KiB savings)
- But this is Vercel config, not code
- Status: DEFER (infrastructure config)

---

## Implementation Roadmap

### Phase 1: Quick Wins (No Breaking Changes)
1. **Fix webpack polyfills** - ensure es2020 target applied to all chunks
2. **Defer non-critical fonts** - defer Bold/SemiBold loading
3. **Defer surveys.js** - move to lazyOnload
4. **Check unused imports** - remove dead code from shared chunks

### Phase 2: CSS Optimization
1. **Extract critical CSS** - inline hero section styles
2. **Defer non-critical CSS** - use async/media="print" pattern
3. **PurgeCSS** - remove unused selectors

### Phase 3: Script Optimization
1. **Fix forced reflows** - defer layout measurements
2. **Reduce chunk sizes** - consider code splitting refinements

### Phase 4: Testing & Validation
1. Build and verify no errors
2. Run Lighthouse and confirm metrics improve
3. Manual testing - all features work, ads/tracking intact

---

## Files to Modify

- [next.config.js](next.config.js) - webpack polyfill fix
- [src/app/layout.js](src/app/layout.js) - font optimization
- [src/app/components/DeferredScripts.jsx](src/app/components/DeferredScripts.jsx) - survey deferral
- [src/app/lp/reddit-marketing-agency/head.js](src/app/lp/reddit-marketing-agency/head.js) - critical CSS
- [src/app/lp/reddit-marketing-agency/RedditMarketingAgencyClient.jsx](src/app/lp/reddit-marketing-agency/RedditMarketingAgencyClient.jsx) - force reflow fix

---

## Constraints
✅ Keep all ads (Google Tag Manager, LinkedIn)
✅ Keep all tracking (Clarity, Sentry, Koala, Apollo, Factors)
✅ Keep all interactive features
✅ No functionality removal
✅ Build must pass (0 errors)

---

## Expected Outcomes
- FCP: 0.7s → 0.4-0.5s (inline critical CSS)
- LCP: 1.7s → 1.0-1.2s (remove 54.5 KiB CSS + fix fonts)
- TBT: 540ms → 300-400ms (fix forced reflows + defer scripts)
- **Final Score: 52 → 75+**
