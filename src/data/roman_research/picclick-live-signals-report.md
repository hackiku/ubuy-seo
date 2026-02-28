# PicClick Live SEO Signals Report

> **Date**: 2026-02-10
> **Branch**: roman-dev
> **Status**: Complete (updated with live HTML analysis via curl)
> **Scope**: Deep analysis of PicClick's live site signals — sitemap, structured data, HTTP infrastructure, performance, page scale, and domain authority
> **Companion**: See `picclick-seo-analysis.md` for the foundational analysis and `competitive-intelligence-report.md` for business/market context

---

## Executive Summary

PicClick operates a remarkably efficient SEO machine built on **nginx/PHP/MySQL** by a single developer (Ryan Sit) since 2008. The site generates ~20M visits/month across 8 country domains, with ~47% from organic search on the .com domain (higher on regional domains -- up to 78% on picclick.fr).

Its SEO dominance stems from:
- **Scale**: 17,093 sub-sitemaps in the sitemap index, each containing up to ~10,000 item URLs (estimated **85-170 million indexed item pages**)
- **Full schema.org microdata**: Product, Offer, AggregateRating, BreadcrumbList -- all via HTML microdata attributes (NOT JSON-LD)
- **Clean architecture**: keyword-rich `.html` URLs, comprehensive image optimization, dedicated image CDN
- **Surgical crawl control**: aggressive robots.txt blocking 100+ bots

**CORRECTION from initial analysis**: PicClick **DOES** use extensive schema.org structured data via microdata (`itemscope`/`itemtype`/`itemprop`). The initial analysis only checked for JSON-LD and missed the embedded microdata. However, PicClick still does NOT use JSON-LD, which remains a meaningful competitive gap since JSON-LD is Google's recommended format and enables additional rich result features.

---

## A. Sitemap Structure Analysis

### Sitemap Index Location

Declared in `robots.txt`:
```text
Sitemap: https://picclick.com/sitemapindex.xml
```

### Findings (Live Fetch via curl with browser UA)

The `sitemapindex.xml` is a **proper sitemap index** containing **17,093 sub-sitemaps**. Each sub-sitemap corresponds to a leaf-level eBay category.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap><loc>https://picclick.com/sitemap.xml</loc><lastmod>2026-02-10T00:00:00+00:00</lastmod></sitemap>
<sitemap><loc>https://picclick.com/Antiques/Architectural-Garden/Balusters/sitemap.xml</loc>...</sitemap>
<!-- ... 17,091 more sub-sitemaps ... -->
<sitemap><loc>https://picclick.com/Video-Games-Consoles/Video-Games/sitemap.xml</loc>...</sitemap>
</sitemapindex>
```

All entries share the modification date `2026-02-10T00:00:00+00:00` (today -- regenerated daily).

### Sub-Sitemap Contents

Each sub-sitemap contains **individual item `.html` URLs with image tags**. Sample from `Video-Games-Consoles/Video-Games/sitemap.xml`:

```xml
<url>
  <loc>https://picclick.com/DISNEYLAND-ADVENTURES-XBOX-360-Game-COMPLETE-With-137027467643.html</loc>
  <lastmod>2026-02-10T09:18:06+00:00</lastmod>
  <image:image>
    <image:loc>https://www.picclickimg.com/iNYAAOSw5t1lrmTJ/DISNEYLAND-ADVENTURES-XBOX-360-Game-COMPLETE-With.webp</image:loc>
  </image:image>
</url>
```

A sample sub-sitemap (`Video-Games-Consoles/Video-Games/sitemap.xml`) contains **9,925 URLs**. Individual timestamps show items updated within minutes of the fetch (e.g., `09:18:06`, `09:17:33`), confirming **near-real-time sitemap updates**.

### Scale Estimation

| Metric | Value |
|---|---|
| **Sub-sitemaps in index** | 17,093 |
| **Sample sub-sitemap URL count** | 9,925 |
| **Estimated total item URLs** (if all sub-sitemaps average ~5,000-10,000) | **85M - 170M** |
| **Sitemap update frequency** | Daily (lastmod = today) |
| **Item-level update frequency** | Near real-time (timestamps within minutes) |

### Key Sitemap SEO Features

1. **Image sitemap extension** (`xmlns:image`): Every item URL includes an `<image:image>` tag with the CDN image URL -- this explicitly tells Google about each item's primary image
2. **Granular lastmod**: Per-item timestamps (not just per-sitemap) help Google prioritize fresh content
3. **Category-based partitioning**: Sub-sitemaps organized by eBay category hierarchy, not arbitrary numbering
4. The root `/sitemap.xml` contains ~1,000+ **category page URLs** (not items)

---

## B. Microdata / RDFa / Structured Data Check

### CORRECTION: PicClick DOES Use Microdata

**Live HTML analysis reveals extensive schema.org microdata** on item pages. The initial analysis (which only checked for JSON-LD and searched for `[itemtype]` via screenshots) missed this.

### Schema.org Product Microdata (Item Pages)

```html
<div id="item-157517096190" class="item" itemscope itemtype="https://schema.org/Product">
  <meta itemprop="name" content="8 POPEYES PAPER Coupons - Expire 3/22/2026" />
  <meta itemprop="sku" content="157517096190" />

  <div class="pricing" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <meta itemprop="price" content="6.50" />
    <meta itemprop="priceCurrency" content="USD" />
    <meta itemprop="priceValidUntil" content="2036-02-17" />
    <meta itemprop="url" content="https://picclick.com/...157517096190.html" />
    <meta itemprop="availability" itemtype="https://schema.org/ItemAvailability"
          content="https://schema.org/InStock" />
  </div>

  <div itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
    <meta itemprop="reviewCount" content="2117" />
    <meta itemprop="ratingValue" content="5" />
  </div>
  <!-- Fix Missing field "aggregateRating", use seller ratings to fix error, testing... -->

  <div itemprop="review" itemscope itemtype="https://schema.org/Review">
    <div itemprop="author" itemscope itemtype="https://schema.org/Person">
      <meta itemprop="name" content="PicClick" />
    </div>
  </div>
  <!-- Fix Missing field "review" -->
</div>
```

### Schema.org BreadcrumbList Microdata

```html
<ol class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a href="https://picclick.com/Gift-Cards-Coupons/" itemprop="item">
      <span itemprop="name">Gift Cards & Coupons</span>
    </a>
    <meta itemprop="position" content="1" />
  </li>
  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a href="https://picclick.com/Gift-Cards-Coupons/Coupons/" itemprop="item">
      <span itemprop="name">Coupons</span>
    </a>
    <meta itemprop="position" content="2" />
  </li>
  <!-- ... current item as position 3 ... -->
</ol>
```

### Complete Structured Data Inventory (Item Pages)

| Schema Type | Format | Properties |
|---|---|---|
| **Product** | Microdata | `name`, `sku` |
| **Offer** | Microdata (nested in Product) | `price`, `priceCurrency`, `priceValidUntil`, `url`, `availability` |
| **AggregateRating** | Microdata (nested in Product) | `reviewCount`, `ratingValue` (uses seller feedback count/rating) |
| **Review** | Microdata (nested in Product) | `author` (hardcoded as "PicClick") |
| **BreadcrumbList** | Microdata | `itemListElement` with `name`, `item`, `position` |

### What's Still MISSING

| Missing Element | Impact |
|---|---|
| **JSON-LD** | Google's recommended format; enables some features microdata cannot |
| **Brand schema** | No `brand` property on Product |
| **Description in Product** | Product description only in meta tags, not in microdata |
| **Image in Product** | Product image not declared via `itemprop="image"` in microdata (only in OG tags and sitemap image extension) |
| **Organization schema** | No sitewide Organization/WebSite structured data |
| **FAQ/HowTo schema** | No additional rich result types |

### HTML Comments Reveal Active SEO Testing

The HTML contains revealing comments:
```html
<!-- Fix Missing field "aggregateRating", use seller ratings to fix error, testing... -->
<!-- Fix Missing field "review" -->
```

This shows PicClick **actively tests and fixes** their structured data based on Google Search Console errors. They're using seller feedback ratings as aggregate ratings and injecting a dummy "PicClick" review to satisfy Google's Product snippet requirements.

### Open Graph Tags (Complement Microdata)

```html
<meta property="og:title" content="8 Popeyes Paper Coupons - Expire 3/22/2026 * $6.50" />
<meta property="og:type" content="product" />
<meta property="og:site_name" content="PicClick" />
<meta property="og:url" content="https://picclick.com/...157517096190.html" />
<meta property="og:description" content="8 POPEYES PAPER Coupons..." />
<meta property="og:price:amount" content="6.50" />
<meta property="og:price:currency" content="USD" />
<meta property="og:image" content="https://www.picclickimg.com/.../8-Popeyes-Paper-Coupons-...webp" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@PicClick" />
```

### Popular Pages -- Less Structured Data

Popular pages (e.g., `/Popular/sold-listings`) have **simpler meta tags** and **NO microdata**:
```html
<title>Sold Listings FOR SALE! - PicClick</title>
<meta name="description" content="Sold Listings FOR SALE!. Shop the Largest Selection..." />
<meta name="robots" content="all" />
<meta property="og:title" content="Sold Listings FOR SALE!" />
<meta property="og:image" content="/img/picclick-logo.png" />
<meta name="twitter:card" content="summary" />  <!-- Not summary_large_image -->
<link rel="canonical" href="https://picclick.com/Popular/sold-listings" />
```

Note: Popular pages use `twitter:card = "summary"` (small image) vs item pages which use `"summary_large_image"`.

### Revised Competitive Gap for uBuyFirst

The structured data gap is **smaller than initially assessed** but still exploitable:

1. **JSON-LD advantage**: uBuyFirst can implement JSON-LD Product schema (Google's preferred format) which enables features not available via microdata alone
2. **Richer Product data**: Include `brand`, `description`, `image`, `gtin` in structured data
3. **Legitimate ratings**: PicClick's `aggregateRating` is a hack (seller feedback != product rating). Genuine product-level ratings would be more valuable
4. **Additional schema types**: FAQ, HowTo, Organization, WebSite schema for sitewide authority signals
5. **AI/LLM optimization**: JSON-LD is more parseable by AI systems than embedded microdata

---

## C. HTTP Response Headers & Infrastructure

### Live HTTP Headers (Item Page)

```http
HTTP/1.1 200 OK
Server: nginx
Content-Type: text/html; charset=UTF-8
Vary: Accept-Encoding
Content-Security-Policy: default-src 'self'; script-src https://cdnjs.cloudflare.com
  https://autosug.ebay.com https://suggestqueries.google.com
  https://www.google-analytics.com https://www.googletagmanager.com
  https://js-agent.newrelic.com https://bam-cell.nr-data.net
  https://s.flocdn.com https://*.s1search.co https://swurl.com
  'unsafe-inline' 'unsafe-eval' 'self'; ...
Strict-Transport-Security: max-age=31536000
X-XSS-Protection: 0
Cache-Control: no-transform
Set-Cookie: history=157517096190; Max-Age=31536000; path=/
Set-Cookie: lasturl=...; Max-Age=43200; path=/
```

### Technology Stack (Confirmed via Live Headers)

| Component | Technology | Evidence |
|---|---|---|
| **Web Server** | **nginx** | `Server: nginx` header |
| **Language** | PHP | `.php` endpoints, founder confirmed |
| **Database** | MySQL | Founder confirmed |
| **Analytics** | Google Analytics (GA4) | `G-XGSVV513B0` via GTM |
| **Tag Manager** | Google Tag Manager | GTM script in HTML |
| **APM** | New Relic | `nr-loader-spa-1.309.0.min.js`, account `1048008` |
| **CDN (JS/CSS)** | Cloudflare cdnjs | `cdnjs.cloudflare.com` in CSP |
| **Search Suggestions** | eBay + Google | `autosug.ebay.com`, `suggestqueries.google.com` in CSP |
| **Ads/Monetization** | FloC/s1search | `s.flocdn.com`, `*.s1search.co`, `swurl.com`, `soflopxl.com` in CSP |
| **Image CDN** | eBay's Fastly CDN | `picclickimg.com` (see image CDN section below) |
| **SSL** | HSTS enabled | `max-age=31536000` (1 year) |

### Image CDN Discovery: Images Served from eBay's Infrastructure

```http
HTTP/1.1 200 OK
Content-Type: image/webp
Content-Length: 64452
x-ebay-pop-id: UFES2-MRS-zoe-anycast
x-CDN: Fastly
Cache-Control: public, max-age=31536000
Strict-Transport-Security: max-age=31557600
Alt-Svc: h3=":443"; ma=93600,h3-29=":443"; ma=93600
Access-Control-Allow-Origin: *
```

**Key finding**: `picclickimg.com` images are served directly from **eBay's own Fastly CDN infrastructure**:
- `x-ebay-pop-id: UFES2-MRS-zoe-anycast` -- eBay's Point of Presence identifier
- `x-CDN: Fastly` -- eBay's CDN provider
- `Cache-Control: public, max-age=31536000` -- 1-year browser cache
- `Alt-Svc: h3=":443"` -- HTTP/3 support
- `Access-Control-Allow-Origin: *` -- CORS wide open for cross-domain loading

This means PicClick doesn't host images at all -- they use eBay's image infrastructure with their own domain as a proxy/alias. This gives them:
1. **Zero image hosting costs**
2. **eBay's global Fastly CDN performance**
3. **Keyword-rich URLs** pointing to eBay's actual image storage
4. **Automatic image updates** when sellers change photos

### Content Security Policy Analysis

The CSP reveals all third-party integrations:

| Integration | Domain | Purpose |
|---|---|---|
| Cloudflare cdnjs | `cdnjs.cloudflare.com` | JS/CSS libraries |
| eBay suggestions | `autosug.ebay.com` | Search autocomplete |
| Google suggestions | `suggestqueries.google.com` | Search autocomplete |
| Google Analytics | `www.google-analytics.com` | Analytics |
| Google Tag Manager | `www.googletagmanager.com` | Tag management |
| New Relic | `js-agent.newrelic.com`, `bam-cell.nr-data.net` | Performance monitoring |
| PicClick API | `api.picclick.com` | Internal API |
| FloC/Ad network | `s.flocdn.com`, `soflopxl.com` | Advertising |
| s1search | `*.s1search.co` | Search monetization |
| Swurl | `swurl.com` | Link tracking/monetization |

### HTML Page Caching Strategy

- **HTML pages**: `Cache-Control: no-transform` -- allows browser caching but prevents CDN transformation. No `max-age` directive means **no aggressive caching of HTML**
- **Images**: `Cache-Control: public, max-age=31536000` -- 1-year cache
- **Cookies**: History cookie (1 year), lasturl cookie (12 hours)

### Bot Detection

PicClick returns **404 for curl without User-Agent** but **200 for browser User-Agent**. This confirms active bot detection beyond just `robots.txt`.

---

## D. Page Speed & Core Web Vitals

### Direct PageSpeed API: Rate-limited

The Google PageSpeed Insights API returned 429 during testing.

### Page Weight Analysis (Live Fetch)

| Metric | Value |
|---|---|
| **HTML document size** | ~83 KB (compressed) |
| **Total images on page** | 65 (for this item -- varies by category) |
| **All images have alt text** | Yes -- product title as alt text |
| **JavaScript** | GTM + GA4 + New Relic + vanilla JS |
| **No JS framework** | No React/Vue/Angular bundle |
| **Primary image loading** | `loading="eager"` |
| **Related item images** | Default (lazy) loading |

### Performance Indicators (Positive)

| Signal | Assessment |
|---|---|
| **SSR PHP via nginx** | Full HTML delivered on first response, nginx is fast at serving |
| **WebP images** | Modern compressed format (~64 KB per image) |
| **Fastly CDN for images** | eBay's global CDN for image delivery |
| **HTTP/3 for images** | `Alt-Svc: h3` on image CDN |
| **1-year image cache** | `max-age=31536000` |
| **No JS framework hydration** | No React/Vue bundle to parse |
| **HSTS preloading** | Avoids HTTP-to-HTTPS redirect overhead |

### Performance Indicators (Negative)

| Signal | Assessment |
|---|---|
| **No CDN for HTML** | nginx serving HTML directly from origin |
| **New Relic SPA loader** | `nr-loader-spa-1.309.0.min.js` adds JS payload |
| **No HTTP/2 or HTTP/3 for HTML** | Only `Connection: keep-alive` (HTTP/1.1) for HTML |
| **Crawl-delay 1s for Bing/Yandex** | Suggests limited server capacity |
| **No explicit Cache-Control for HTML** | Pages not cached at edge |

### Estimated Core Web Vitals

| Metric | Estimate | Reasoning |
|---|---|---|
| **LCP** | 2-3.5s (moderate) | Main image eager-loaded from Fastly CDN; PHP SSR is fast; no CDN for HTML |
| **CLS** | <0.1 (good) | Fixed dimensions on images; no dynamic content injection |
| **INP** | <200ms (good) | Minimal JavaScript; no framework event handlers |

### Comparative Advantage for uBuyFirst

uBuyFirst on Next.js with Vercel/CDN deployment can outperform PicClick:
- **Edge-rendered HTML** (vs PicClick's origin-only nginx)
- **HTTP/2 and HTTP/3 for all assets** (PicClick only has HTTP/3 for images)
- **next/image optimization** with automatic WebP, sizing, and lazy loading
- **Code splitting** -- only load JS needed per page
- **ISR/SSG** -- pre-render popular pages at the edge

---

## E. Popular Pages -- Scale & Pattern

### Confirmed Working (Live Fetch)

Popular pages are **live and accessible**. `/Popular/sold-listings` returns 200 OK:

```http
HTTP/1.1 200 OK
Server: nginx
Content-Type: text/html; charset=UTF-8
Cache-Control: no-transform
```

### Popular Page vs Item Page Comparison

| Feature | Item Page | Popular Page |
|---|---|---|
| **Microdata** | Full Product, Offer, AggregateRating, BreadcrumbList | None |
| **og:type** | `product` | Not set |
| **og:image** | CDN product image (keyword-rich URL) | `/img/picclick-logo.png` (generic) |
| **twitter:card** | `summary_large_image` | `summary` |
| **robots meta** | `max-snippet:-1, max-image-preview:large` | `all` |
| **Canonical** | Yes | Yes |
| **Title pattern** | `"PRODUCT NAME $PRICE - PicClick"` | `"KEYWORD FOR SALE! - PicClick"` |

### Scale Estimation

| Data Point | Value |
|---|---|
| Sub-sitemaps in index | 17,093 |
| Each sub-sitemap = one eBay category | Yes |
| Popular pages target search terms within categories | Yes |
| `robots.txt` blocks `/popularhtml.php` (generator) | Yes |
| Estimated Popular pages | Tens of thousands to hundreds of thousands |

---

## F. Domain Authority & Backlink Profile

### Quantitative Metrics

| Metric | Value | Source |
|---|---|---|
| **Backlinks** | 247,430 | Semrush (Oct 2025) |
| **Referring Domains** | 35,400 | Semrush (Oct 2025) |
| **Ranking Keywords (US)** | 550,000+ | Sistrix |
| **Ranking Keywords (DE)** | 2,200,000+ | Sistrix |
| **Monthly Visits (.com)** | ~4.3M (Oct 2025) | Semrush |
| **Monthly Visits (all domains)** | ~20M | OMR/Similarweb |
| **Peak Monthly Visits** | 50M (historical peak) | Founder statement |
| **Revenue** | ~$5-5.9M/year | Kona Equity / OMR |
| **eBay Affiliate Rank** | #1 out of 26,000+ affiliates | Founder statement |
| **GMV Driven to eBay** | ~$1B/year (peak) | Founder statement |
| **Sitemap sub-sitemaps** | 17,093 | Live fetch |
| **Sample sub-sitemap URLs** | 9,925 | Live fetch (Video Games) |

### Traffic Sources (picclick.com)

| Source | Share |
|---|---|
| Direct | 49-50% |
| Organic Search | 47% |
| Referral | ~2% |
| Social | <1% |

### Regional Organic Search Dependency

| Domain | Organic Search % |
|---|---|
| picclick.com (US) | 47% |
| picclick.co.uk | 60% |
| picclick.de | 75%+ |
| picclick.fr | 78% |

The **non-US domains are far more dependent on organic search**, making them more vulnerable to an SEO competitor.

### Domain Authority Estimation

Direct DA/DR scores are unavailable (PicClick blocks AhrefsBot and SemrushBot). Estimates:
- **Estimated Moz DA**: 70-80 range
- **Estimated Ahrefs DR**: 75-85 range
- **Domain age**: ~18 years (since 2008)
- **35,400 referring domains** is a very strong backlink profile

---

## G. Key Vulnerabilities Identified (Revised)

### 1. No JSON-LD (High -- Revised from Critical)
- Uses microdata instead of JSON-LD (Google's recommended format)
- Microdata works but JSON-LD enables additional rich result features
- **Hacky structured data**: Uses seller feedback as `aggregateRating`, dummy "PicClick" review
- HTML comments reveal active SEO testing/debugging (slow iteration)

### 2. Stale Technology (High)
- nginx/PHP/MySQL with no modern framework
- New Relic monitoring but no CDN for HTML pages
- HTTP/1.1 for HTML (HTTP/3 only for images via eBay's Fastly)
- One developer -- slow to adapt to Google algorithm changes

### 3. Image Dependency on eBay (High -- New Finding)
- All images served from eBay's Fastly CDN via `picclickimg.com`
- If eBay revokes access or changes infrastructure, PicClick loses all images
- Zero control over image optimization, format, or CDN configuration
- Upside: zero image hosting cost, eBay-level CDN performance

### 4. Limited Server Infrastructure (High)
- Crawl-delay directives suggest capacity constraints
- nginx serving HTML from single origin
- Blocks performance monitoring bots (Pingdom) -- hiding metrics
- HTTP/1.1 for HTML delivery

### 5. Declining Traffic (Medium)
- Organic traffic dropped -3.93% month-over-month (Semrush Oct 2025)
- Down from 50M monthly visits at peak to ~20M combined
- Google's increasing preference for JSON-LD and Core Web Vitals may be eroding position

### 6. No AI/LLM Optimization (Medium)
- Blocks CCBot, Bytespider, ChatGLM-Spider -- invisible to AI search engines
- Microdata is less parseable by AI systems than JSON-LD
- As search shifts toward AI results, traditional SEO moat weakens

### 7. Popular Pages Under-Optimized (Medium -- New Finding)
- Popular pages have **no structured data** at all (no microdata, no JSON-LD)
- Use generic PicClick logo instead of product images for OG tags
- Use `twitter:card = "summary"` instead of `"summary_large_image"`
- These pages could rank higher with proper optimization

### 8. Content Duplication Risk (Medium)
- Item pages mirror eBay listings with added "PicClick Insights"
- Google may penalize thin/duplicate aggregator content over time
- "aggregateRating" is seller feedback, not genuine product ratings

---

## H. Recommendations for uBuyFirst (Revised)

### Exploit PicClick's Weaknesses

1. **Implement JSON-LD Product schema** -- Google's preferred format; enables merchant listings, price drop badges, product knowledge panels
2. **Use legitimate structured data** -- Real product ratings (if available), proper brand/GTIN, genuine reviews -- not hacked seller feedback
3. **Optimize Popular/browse pages** -- PicClick leaves these under-optimized; add structured data, product images in OG tags, `summary_large_image` twitter cards
4. **Target Core Web Vitals excellence** -- Edge-rendered Next.js > origin-only nginx/PHP
5. **Welcome AI crawlers** -- Allow CCBot, Bytespider while PicClick blocks them
6. **HTTP/2 and HTTP/3 everywhere** -- PicClick only has HTTP/3 for images

### Match PicClick's Strengths

1. **Individual item pages at scale** -- The single biggest requirement (17K+ sitemaps with ~10K items each)
2. **Image sitemap with `<image:image>` tags** -- PicClick submits image URLs in sitemaps
3. **Keyword-rich image filenames** on dedicated CDN
4. **Near-real-time sitemap updates** -- PicClick updates individual item timestamps within minutes
5. **100% alt text coverage** with full product titles
6. **Massive internal linking** via related items grid

---

## Data Sources

- PicClick item page HTML (live curl fetch 2026-02-10, URL: `8-Popeyes-Paper-Coupons-...157517096190.html`)
- PicClick Popular page HTML (live curl fetch 2026-02-10, URL: `Popular/sold-listings`)
- PicClick `sitemapindex.xml` (live curl fetch 2026-02-10, **17,093 sub-sitemaps**)
- PicClick sub-sitemap (live curl fetch 2026-02-10, `Video-Games-Consoles/Video-Games/sitemap.xml`, **9,925 URLs**)
- PicClick HTTP response headers (live curl fetch 2026-02-10)
- PicClick image CDN headers (live curl fetch 2026-02-10, `picclickimg.com`)
- PicClick `robots.txt` (live curl fetch 2026-02-10)
- OMR Daily: "Picclick continues to generate millions of clicks" (2023)
- ChannelX: "Meet the company: PicClick -- Where are they now?" (2018)
- Semrush: picclick.com overview (October 2025)
- Similarweb: picclick.com traffic analytics (July 2025)
- Kona Equity: PicClick LLC revenue estimate
- Founder interviews (Gaebler, StartupNextDoor, BookThink)
- PicClick screenshots captured in `docs/seo/` directory
