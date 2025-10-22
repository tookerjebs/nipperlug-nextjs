# Vercel Edge Requests Analysis & Optimization Report

**Generated:** January 2025  
**Current Usage:** ~520k edge requests per month (52% of 1M free tier limit)  
**Analysis Period:** Last 12 hours (~10k edge requests)

---

## Table of Contents
1. [What Are Edge Requests?](#what-are-edge-requests)
2. [Understanding Vercel Observability Tabs](#understanding-vercel-observability-tabs)
3. [Current Usage Analysis](#current-usage-analysis)
4. [Key Findings](#key-findings)
5. [Top 10 Optimization Recommendations](#top-10-optimization-recommendations)
6. [Detailed Technical Recommendations](#detailed-technical-recommendations)
7. [Implementation Priority Matrix](#implementation-priority-matrix)
8. [Expected Impact](#expected-impact)

---

## What Are Edge Requests?

**Edge Requests** are counted every time content is served through Vercel's Edge Network. This includes:

- ✅ **Page requests** (HTML pages like `/build-planner`, `/stats-wiki`)
- ✅ **Static assets** (images, fonts, CSS, JavaScript files)
- ✅ **API routes** (like `/api/share-build`)
- ✅ **Dynamic content** (server-side rendered pages)
- ✅ **Redirects and rewrites** (from `vercel.json` and `next.config.js`)
- ✅ **Next.js internal files** (`/_next/static/*`, font files, etc.)
- ✅ **Public assets** (`/images/*`, `/favicon.ico`, etc.)

**Important:** Even if cached at the edge, the initial request still counts. However, cached responses are much more efficient and subsequent requests from the same region won't count against your limit.

---

## Understanding Vercel Observability Tabs

### Referrer Tab vs Router Tab - Why the Numbers Don't Match

You observed ~10k total in the Referrer tab but much less when adding Router tab numbers. Here's why:

#### **Referrer Tab** (Shows ~10k)
- Shows **WHERE traffic comes from** (which page referred the user)
- **Includes ALL sub-requests** made by that page:
  - Main HTML page
  - All images loaded on that page
  - All fonts loaded
  - All CSS/JS files
  - All API calls triggered
- Example: When "www.nipperlug.com" shows 1,500 requests, this includes:
  - 1 HTML page request
  - ~20-30 image requests (icons, backgrounds, etc.)
  - ~5-10 font file requests
  - ~5-10 CSS/JS chunk requests
  - Any API calls
  
#### **Router Tab** (Shows less)
- Shows **WHICH routes were accessed** (unique endpoints)
- Shows **aggregated totals per route**
- Does NOT break down all sub-resources
- Example: `/build-planner` shows 400 requests = 400 people visited that route
  - But each visit might trigger 20-50 additional requests for assets
  - Those asset requests appear separately or are aggregated elsewhere

**The Math:**
- Router tab: `/build-planner` = 400 requests (just the HTML page)
- Referrer tab: build-planner referrer = 1,200 requests (HTML + all assets × 400 visits)
- Ratio: ~3:1 (each page load triggers ~3 asset requests on average for your site)

---

## Current Usage Analysis

### Top Traffic Sources (Last 12 Hours - ~10k requests)

| Source | Requests | Cache Rate | Issue Level |
|--------|----------|------------|-------------|
| www.nipperlug.com (homepage) | 1,500 | 96% | ✅ Good |
| Build Planner | 1,200 | 59% | 🔴 **Critical** |
| Stats Wiki | 860 | 92% | ✅ Good |
| Tier Lists | 838 | 97% | ✅ Good |
| "No Referrer" | 626 | N/A | ⚠️ Investigate |
| Monster Database | 500 | Unknown | ⚠️ Monitor |
| Build Planner (?system=equipment) | 520 | 62% | 🔴 **Critical** |
| Event Mobs Location | 500 | 96% | ✅ Good |
| Collection Tracker | 400 | Unknown | ⚠️ Monitor |

### Cache Rate Analysis

**Good Cache Rates (90%+):**
- Homepage: 96% ✅
- Tier Lists: 97% ✅
- Stats Wiki: 92% ✅
- Event Mobs: 96% ✅

**Poor Cache Rates (<70%):**
- Build Planner: 59% 🔴
- Build Planner with query params: 62% 🔴

---

## Key Findings

### 🔴 Critical Issues

1. **Build Planner Low Cache Rate (59-62%)**
   - Root cause: Client-side page with URL query parameters
   - Impact: HIGH - This is one of your most popular pages
   - Each unique `?system=` param creates a different cache key
   - Currently has 16+ different system variations

2. **Google Fonts Loading**
   - External font requests count as edge requests
   - Currently loading: Geist Sans, Geist Mono
   - Impact: MEDIUM - Every page load triggers font requests

3. **No Static Revalidation Configuration**
   - Pages lack `export const revalidate` statements
   - All pages are treated as fully dynamic or fully static
   - No ISR (Incremental Static Regeneration) strategy

4. **Large Number of Image Assets**
   - Public folder contains 200+ images across multiple directories
   - Many small icons that could be sprited
   - No apparent image optimization strategy beyond Next.js defaults

### ⚠️ Medium Issues

5. **API Route Without Caching**
   - `/api/share-build` has no cache headers
   - Every GitHub Gist request counts

6. **Stats Pages Dynamic Generation**
   - 70+ stat pages generated with `generateStaticParams`
   - Good: Uses static generation
   - Issue: No revalidation strategy = rebuilds on every deploy

7. **Multiple Redirect Rules**
   - 8 redirect rules in `vercel.json`
   - Each redirect counts as an edge request
   - Some may be catching bot traffic (wp-admin, xmlrpc, etc.)

8. **No Prefetch Configuration**
   - Next.js Link components prefetch by default
   - With 20+ links on homepage, this creates extra requests

### ✅ Good Practices Found

- ✅ No middleware (avoids edge function invocations)
- ✅ Aggressive caching headers for calculators (1 year CDN)
- ✅ Image optimization configured (WebP, AVIF)
- ✅ Compression enabled
- ✅ Most pages use static generation where possible
- ✅ Using `generateStaticParams` for dynamic routes

---

## Top 10 Optimization Recommendations

### 🏆 Highest Impact - Implement These First

#### 1. **Add Revalidation to All Static Pages** ⚡⚡⚡
**Impact:** Could reduce requests by 20-30%  
**Effort:** Low (30 minutes)

Add to all calculator pages and info pages:

```typescript
// Add to page.tsx files
export const revalidate = 86400; // 24 hours in seconds

// For very stable pages (tier lists, stats wiki overview):
export const revalidate = 604800; // 7 days

// For frequently updated pages:
export const revalidate = 3600; // 1 hour
```

**Files to update:**
- `/src/app/tier-lists/page.tsx`
- `/src/app/stats-wiki/page.tsx`
- `/src/app/monster-database/page.tsx`
- `/src/app/collection-tracker/page.tsx`
- All calculator pages (`/src/app/*-calculator/page.tsx`)
- `/src/app/page.tsx` (homepage)

#### 2. **Self-Host Google Fonts** ⚡⚡⚡
**Impact:** Could reduce requests by 10-15%  
**Effort:** Low-Medium (1 hour)

Currently using `next/font/google` which still makes external requests.

**Solution:**
```typescript
// Download fonts and place in /public/fonts/
// Update layout.tsx:
import localFont from 'next/font/local';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff2',
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff2',
  variable: '--font-geist-mono',
  display: 'swap',
});
```

#### 3. **Fix Build Planner Cache Strategy** ⚡⚡⚡
**Impact:** HIGH - Could reduce requests by 15-20%  
**Effort:** Medium (2 hours)

Build Planner has low cache rate because query params create different cache keys.

**Solution A - Client-Side State (Recommended):**
```typescript
// Don't use URL query params for system selection
// Use local state only, save to localStorage
const [activeSystem, setActiveSystem] = useState(() => {
  return localStorage.getItem('lastActiveSystem') || 'equipment';
});

// Remove router.replace calls that update URL
```

**Solution B - Static Paths:**
If URLs are important for SEO/sharing:
```typescript
// Create static routes: /build-planner/equipment, /build-planner/pet, etc.
// Convert to generateStaticParams
```

#### 4. **Disable Unnecessary Link Prefetching** ⚡⚡
**Impact:** Could reduce requests by 5-10%  
**Effort:** Low (30 minutes)

```typescript
// On homepage and other pages with many links
// Add prefetch={false} to less critical links:
<Link href="/credits" prefetch={false}>Credits</Link>
<Link href="/legal" prefetch={false}>Legal</Link>

// Keep prefetch for important pages:
<Link href="/build-planner" prefetch={true}>Build Planner</Link>
```

#### 5. **Create Image Sprite Sheets for Icons** ⚡⚡
**Impact:** Could reduce requests by 10-15%  
**Effort:** High (4 hours)

You already have one sprite sheet (`spritesheet-stat-icons.png`). Expand this approach:

- Equipment icons sprite
- Class icons sprite
- System icons sprite
- UI icons sprite

**Current:** 100+ individual icon requests per page  
**After:** 4-5 sprite sheet requests per page

#### 6. **Add Cache Headers to API Routes** ⚡
**Impact:** Could reduce requests by 3-5%  
**Effort:** Low (15 minutes)

```typescript
// In /src/app/api/share-build/route.ts
export async function GET(request: NextRequest) {
  // ... existing code ...
  
  return NextResponse.json(
    { success: true, data: buildData },
    { 
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      }
    }
  );
}
```

#### 7. **Optimize Public Assets Caching** ⚡⚡
**Impact:** Could reduce requests by 5-8%  
**Effort:** Low (20 minutes)

Update `next.config.js`:

```javascript
{
  source: '/images/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
},
{
  source: '/favicon.ico',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
},
```

#### 8. **Add Revalidation to Stats Dynamic Pages** ⚡⚡
**Impact:** Could reduce requests by 8-12%  
**Effort:** Low (15 minutes)

```typescript
// In /src/app/stats/[slug]/page.tsx
// Add after imports:
export const revalidate = 604800; // 7 days - stats rarely change
```

#### 9. **Reduce Redirect Overhead** ⚡
**Impact:** Could reduce requests by 2-3%  
**Effort:** Low (15 minutes)

**Current issue:** You have 7 redirects for old WordPress paths that might be catching bot traffic.

**Solution:** These are good for SEO, but consider adding a `robots.txt` rule to reduce bot crawling:

```txt
# In /public/robots.txt
User-agent: *
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/
Disallow: /wp-login.php
Disallow: /xmlrpc.php
```

This won't eliminate edge requests from bots, but reduces them.

#### 10. **Implement Service Worker for Static Assets** ⚡⚡⚡
**Impact:** Could reduce requests by 20-30% for returning users  
**Effort:** High (6-8 hours)

For returning users, cache static assets in browser:
- Images from `/public/images/`
- Font files
- CSS/JS bundles

**Note:** This is a longer-term optimization but has the highest impact for repeat visitors.

---

## Detailed Technical Recommendations

### Image Optimization Strategy

**Current State:**
- 200+ images in `/public/images/`
- Multiple directories: equipment-system, items, classes, maps, etc.
- Each image is a separate request

**Optimization Plan:**

1. **Audit Image Usage**
   ```bash
   # Run this to find unused images
   # (Manual process - check which images are actually used)
   ```

2. **Create Critical Image Sprites**
   - Class icons (9 classes) → 1 sprite sheet
   - Equipment category icons → 1 sprite sheet
   - UI icons (buttons, badges) → 1 sprite sheet

3. **Lazy Load Non-Critical Images**
   ```typescript
   import Image from 'next/image';
   
   <Image 
     src="/images/items/item.png"
     loading="lazy" // Only load when needed
     alt="Item"
   />
   ```

4. **Use Next.js Image Optimization**
   Already configured, but ensure all `<img>` tags are converted to `<Image>` components.

### Caching Strategy Matrix

| Page Type | Revalidate Time | Reasoning |
|-----------|----------------|-----------|
| Homepage | 3600 (1 hour) | Frequently viewed, occasionally updated |
| Build Planner | 86400 (1 day) | Tools don't change often |
| Calculators | 604800 (7 days) | Formulas rarely change |
| Tier Lists | 86400 (1 day) | Meta changes occasionally |
| Stats Wiki | 604800 (7 days) | Game mechanics rarely change |
| Individual Stat Pages | 2592000 (30 days) | Rarely updated |
| Monster Database | 86400 (1 day) | Data occasionally updated |
| Collection Tracker | 86400 (1 day) | Tool doesn't change often |

### Font Optimization

**Current:**
```typescript
import { Geist, Geist_Mono } from "next/font/google";
```

**Issue:** This still makes requests to Google's servers, which count as edge requests.

**Solution:**

1. Download font files:
   ```
   Geist: https://vercel.com/font
   ```

2. Place in `/public/fonts/` or `/src/fonts/`

3. Update configuration:
   ```typescript
   import localFont from 'next/font/local';
   
   const geistSans = localFont({
     src: [
       {
         path: '../fonts/Geist-Regular.woff2',
         weight: '400',
         style: 'normal',
       },
       {
         path: '../fonts/Geist-Bold.woff2',
         weight: '700',
         style: 'normal',
       },
     ],
     variable: '--font-geist-sans',
     display: 'swap',
   });
   ```

### Link Prefetching Configuration

**Current:** All `<Link>` components prefetch by default.

**Recommended:**

```typescript
// In a shared Link component or directly:

// High-priority pages (keep prefetch)
<Link href="/build-planner" prefetch={true}>
  Build Planner
</Link>

// Low-priority pages (disable prefetch)
<Link href="/legal" prefetch={false}>
  Legal
</Link>

// Or set globally in next.config.js:
module.exports = {
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },
};
```

### Build Planner Specific Optimizations

**Problem:** Build Planner is your most popular page but has only 59-62% cache rate.

**Root Cause Analysis:**
1. Uses `useSearchParams()` and `router.replace()` to update URL
2. Each `?system=X` creates a different cache key
3. 16 different systems = 16 different URLs = lower cache efficiency

**Solution Options:**

**Option A: Remove URL Params (Best for caching)**
```typescript
// Don't use searchParams for system selection
const [activeSystem, setActiveSystem] = useState(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('activeSystem') || 'equipment';
  }
  return 'equipment';
});

// Remove this:
// router.replace(`?${newSearchParams.toString()}`);

// Add this:
const handleSystemChange = (systemId: string) => {
  setActiveSystem(systemId);
  localStorage.setItem('activeSystem', systemId);
};
```

**Option B: Create Static Routes (Best for SEO + caching)**
```
/build-planner/equipment
/build-planner/pet
/build-planner/stellar-link
... etc
```

```typescript
// Create /src/app/build-planner/[system]/page.tsx
export async function generateStaticParams() {
  return PROGRESSION_SYSTEMS.map((system) => ({
    system: system.id,
  }));
}

export const revalidate = 86400; // 1 day
```

**Option C: Hybrid Approach**
- Default route `/build-planner` (no params)
- Optional system param, but saved to localStorage
- Server renders default, client updates based on localStorage

---

## Implementation Priority Matrix

### Phase 1: Quick Wins (1-2 days, 30-40% reduction)
- ✅ Add `revalidate` exports to all pages
- ✅ Self-host fonts
- ✅ Add cache headers to API routes
- ✅ Disable prefetch on low-priority links
- ✅ Add cache headers for public assets

### Phase 2: Medium Effort (3-5 days, 15-25% additional reduction)
- ✅ Fix Build Planner caching (Option A or B)
- ✅ Create icon sprite sheets
- ✅ Optimize image loading strategy
- ✅ Add service worker for critical assets

### Phase 3: Long-term (1-2 weeks, 10-15% additional reduction)
- ✅ Implement full PWA caching strategy
- ✅ Audit and remove unused images
- ✅ Consider CDN for large assets
- ✅ Implement advanced code splitting

---

## Expected Impact

### Conservative Estimates

| Optimization | Expected Reduction | Effort | Priority |
|--------------|-------------------|--------|----------|
| Add revalidation configs | 15-20% | Low | 🔴 High |
| Self-host fonts | 8-12% | Low | 🔴 High |
| Fix Build Planner cache | 10-15% | Medium | 🔴 High |
| Disable unnecessary prefetch | 5-8% | Low | 🟡 Medium |
| Image sprites | 8-12% | High | 🟡 Medium |
| API route caching | 2-4% | Low | 🟢 Low |
| Service worker | 15-25% (returning users) | High | 🟡 Medium |

**Total Potential Reduction:** 40-60% of current usage

**From:** 520k/month → **To:** 208k-312k/month  
**Remaining headroom:** 688k-792k (68-79% of limit remaining)

### Aggressive Estimates (All optimizations implemented)

**Potential Reduction:** 50-70%  
**New Usage:** 156k-260k/month  
**Remaining headroom:** 740k-844k (74-84% of limit remaining)

---

## Monitoring & Validation

### How to Validate Improvements

After implementing optimizations, monitor in Vercel dashboard:

1. **Observability → Edge Requests**
   - Look at 24-hour and 7-day trends
   - Compare cache hit rates before/after

2. **Key Metrics to Track:**
   - Cache hit rate (aim for 80%+ on static pages)
   - Edge requests per day (should decrease)
   - Build Planner specific cache rate (target 85%+)

3. **Use Vercel Analytics:**
   ```bash
   # Check specific routes
   # Look for routes with high request counts but low cache rates
   ```

4. **Browser Dev Tools:**
   - Network tab → Check `cf-cache-status` header
   - Should see "HIT" for most static assets

---

## Additional Resources

- [Next.js Caching Documentation](https://nextjs.org/docs/app/guides/caching)
- [Vercel Edge Network FAQ](https://vercel.com/docs/edge-network/frequently-asked-questions)
- [Next.js 15 App Router Best Practices](https://nextjs.org/docs/app/building-your-application/routing)
- [Image Optimization in Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## Conclusion

Your current usage of 520k/month (52% of free tier) is moderate but can be significantly optimized. The biggest opportunities are:

1. **Build Planner caching** (currently 59% → target 85%+)
2. **Font self-hosting** (eliminate external requests)
3. **Revalidation configuration** (enable edge caching for all pages)

Implementing just the **Phase 1 quick wins** could reduce your usage by 30-40%, giving you plenty of headroom to grow without hitting the 1M limit.

The good news: Your architecture is already well-optimized in many ways (no middleware, static generation, good redirect rules). These recommendations are incremental improvements that will compound over time.

---

**Next Steps:**

1. Start with Phase 1 optimizations (1-2 days of work)
2. Monitor results in Vercel dashboard for 7 days
3. Proceed to Phase 2 based on impact observed
4. Continue monitoring monthly usage trends

**Questions?** Review this report and prioritize based on your available time and the expected impact of each optimization.