---
title: uBuyFirst — SEO & Public Pages Opportunity Brief
for: Ivan
from: Dustin
date: 2026-03-21
status: DRAFT — brainstorm stage, needs data confirmation
purpose: Pre-read before kickoff call (week of Mar 24)
visual: v1-strategy-visual.html (open in Chrome for the full strategy diagram)
mockup: ../../seo-browse-pages/reference/mockup-ai-analysis-page.html (existing page mockup with video game lots + gold tabs)
---

# uBuyFirst — The Opportunity

## What uBuyFirst Is

uBuyFirst builds buying tools for eBay business buyers — companies and resellers who purchase inventory on eBay at scale. We've been in the market since 2013 and dominate the competitive buying space for newly listed items.

**Two revenue streams:**
- **Software subscriptions** — desktop app, web app, browser tools for professional eBay buyers
- **eBay Partner Network (EPN)** — top-50 global eBay affiliate. Every transaction through our tools generates affiliate revenue

**The web app** (app.ubuyfirst.com) launched February 2026 — cross-platform, no download required. This is where public-facing pages drive traffic to.

---

## Our Market Position

In categories where there's enough volume for dedicated purchasing agents, we capture roughly **40–50% of all purchases within the first 1–3 minutes** of an item being listed on eBay.

The buying volume cascades as time from listing increases:

```
Time from Listing          Relative Purchase Volume
─────────────────────────────────────────────────────
1–3 minutes                ██████████  (~40-50% share)
5–30 minutes               ████████████████████  (~2x)
30 min – few hours         ████████████████████████████████████████  (~4x)
Up to 1 day                ████████████████████████████████████████████████████████████████████████████████  (~8x)
```

**What this means:**
- Our desktop app owns the speed-buying market (1–3 min). That's established.
- The web app serves the **5 min to 1 day** window — batch search, processing, filtering. This is where the growth is.
- Public-facing SEO pages serve the **entire funnel** — no login, no software. Top-of-funnel discovery that converts into both web app users and affiliate revenue.

> **[PREP TASK]** Pull sold data from Power BI / existing datasets to confirm these ratios and build a visual showing purchase volume by time-from-listing overlaid onto our product map.

---

## The Product Map

| Product | Audience | How They Buy | Status |
|---------|----------|-------------|--------|
| **Desktop App** | Enterprise buyers, speed-dependent professionals | Newly listed, first 1–5 min. Competing on speed. | Established, profitable |
| **Web App — Alert Mode** | Smaller/faster buyers | Real-time monitoring, saved searches, sound alerts | Launched Feb 2026 |
| **Web App — Search Mode** | Batch buyers, on-demand processing | Run searches, filter results, process in batches | Launched Feb 2026 |
| **SEO / Public Pages** | Anyone searching for eBay buying opportunities | No login. Land on curated, data-driven page. | **This is the opportunity** |

The public pages are the missing piece. Right now, every buyer has to know about us, download something, or create an account. The pages remove that barrier entirely.

---

## The Opportunity: Data-Driven Public Pages

### What We Have

- **46,000+ high-volume buyers** identified across eBay — we know what they buy, what categories they're in, and how much volume flows through those categories
- **110,000+ eBay categories** analyzed for seller penetration patterns (which categories are dominated by overseas sellers, where buyers need filtering most)
- **Target-category analysis** showing GMV opportunity by buying window — which niches have the most value in the batch-buyer segment
- **eBay-approved AI processing** — we have legitimate API access and approval to run Python + AI analysis against live eBay listings at scale. Very few companies have this.
- **Proven analysis engine** — our SKU Manager already runs matching and analysis logic against live eBay data for enterprise customers. The architecture exists; it just isn't public-facing yet.

### What We Can Build

Public-facing pages that solve real buyer problems without requiring any software:

1. **Catalog matching** — buyers struggle to create accurate search terms that map to their buying catalog. Our pages do that for them.
2. **Price filtering** — buyers want to see only items that hit certain price criteria relative to their buy list or market pricing. We process and filter for them.
3. **Noise elimination** — eBay search is noisy. Packs, OEM, wrong conditions, irrelevant sellers. A curated page strips that away.

**The result:** A buyer lands on a page and sees "here's what's on eBay right now that matches what you're looking for, filtered to only the opportunities worth your time."

These pages generate value three ways:
- **Affiliate revenue** on every click/purchase (EPN)
- **Conversion to web app** — power buyers want alerts and saved searches
- **SEO authority** — real data, real analysis, real conversions = Google signal

---

## Worked Example: Video Game Lots

This is the kind of niche we'd hand-pick for a first page. It illustrates the full approach.

### The Friction

Video game lots on eBay contain 10–60+ games across multiple systems. To evaluate a lot, a buyer has to:

1. **Identify every title** — often from a single photo with glare, partial visibility, stacked cases
2. **Cross-reference each title** against a buy list or pricing database (PriceCharting, etc.)
3. **Calculate total estimated value** vs. the asking price
4. **Decide in minutes** before someone else buys it

This is painful. Resellers and retail arbitrage buyers do this manually today — screenshot the listing photo, paste into ChatGPT, wait for a response, then do their own math separately.

### What We'd Build

A public page (no login required) showing live video game lots from eBay, where each lot is:

- **AI-analyzed** — image recognition identifies individual game titles with confidence scores
- **Cross-referenced** against a public buyback price database to estimate total lot value
- **Displayed with a value breakdown** — what's in the lot, estimated value per title, total vs. asking price

### The Page Elements

> **[PREP TASK]** Draw up a wireframe/mockup of all elements for one video game lot page to share with Ivan.

**Lot detail view (per listing):**
- eBay listing photo + title + price
- AI-extracted game list (title, system, confidence %)
- Estimated value per title (from public pricing DB)
- Total estimated value vs. asking price
- Seller info + condition notes
- Direct link to eBay listing (EPN-tracked)

**Category landing page:**
- Filtered views by system (PS5 lots, Nintendo lots, retro lots, etc.)
- Sort by value gap, newest, ending soon
- Fresh feed — updated continuously

**Supporting content:**
- SEO article optimized for AI search engines: "Top 10 Places to Source Video Games for Resale"
- Covers all channels: eBay, Facebook Marketplace, meetups, Craigslist, ads, wholesale
- Talks about the tools and knowledge needed in the industry
- Naturally positions our curated eBay page as one of those sources
- AI-optimized formatting (structured answers, comparison tables, clear takeaways)
- **CTA links back to the page** (not the app yet) — page generates audience, page is the funnel top

**Distribution:**
- Reddit posting via existing partner (avoids heavy backlink investment upfront)
- Forum seeding in relevant communities
- The page itself generates repeat visitors because the data refreshes and margins are real

### The Backend Architecture (Critical for Ivan)

This is what doesn't show on the page but makes it all work. We broke down "software barrier" into:

**1. Keyword search configuration**
- Define search term groups per category: ["lot", "Nintendo", "PS5", "SNES", "mixed games", "estate games", "collection"]
- Grouped by: platform (Nintendo vs PlayStation), lot size signals (estate, collection, bulk), condition signals
- These feeds create the initial pool of listings to analyze

**2. Live eBay search + filtering**
- Automated queries running on keyword groups
- Pull live/recent listings matching those terms
- Apply business filters: min price, max price, seller quality rules, item condition filters
- Output: set of listing URLs for AI processing

**3. AI processing pipeline (per category)**
- **Input:** Listing title + photos + description
- **Output:** Structured data (extracted items, confidence scores, condition indicators, value signals)
- **Video games example:** Image recognition → extract game titles in lot photo → match titles to database → return {title, system, confidence, price}
- **Server RAM example:** Parse description + look for part numbers → normalize part codes → match against specs database
- Different per category (lot analysis vs. commodity matching vs. trend data)
- Not all items — only ones matching your keyword filters

**4. External data feeds (routine updates)**
- **PriceCharting** (video games) — API call for buyback values per title, updated hourly
- **Spot gold API** (gold pages) — live commodity price
- **Market pricing databases** (RAM) — supplier pricing for commodity specs
- **Custom buy lists** (for logged-in users) — user uploads their own price sheet
- All feeds integrated into the aggregation layer

**5. Aggregation + display logic**
- Combine AI extraction results + price data
- Calculate the hero metric for this category (margin % for games, over-spot for gold, margin for RAM)
- Sort results by opportunity (highest margin first, etc.)
- Organize filters by buyer intent (filter by platform, lot size, seller rating, etc.)
- Format for the page template (card feeds, detail modals, filter UI)
- Generate EPN affiliate links for every listing

**Why this matters for site structure:** Each category might need custom AI logic or different price feeds, but the UI/UX pattern stays the same. You can template it, but each niche needs hand-configuration initially. After 4–5 pages, patterns emerge and you can automate.

---

## Why This Isn't Just "Scrape eBay"

Building pages that rank and convert requires:
- **Real data processing** — not thin mirrors of eBay. Your page shows insights eBay doesn't (lot contents, margin calcs, buyer comparisons)
- **AI integration** — solving the friction buyers actually have (identifying lot contents, matching specs, authenticating)
- **Pricing accuracy** — pulling real reference data (PriceCharting, spot prices, market comps) and matching it correctly
- **User-centric display** — organizing results by what THIS buyer needs (margin %, system preference, lot size)
- **Repeatable revenue** — every click is affiliate revenue, repeat visitors bookmark the page, power users convert to subscription

The pages are assets. They build authority. They generate direct revenue. They're not meant to eventually redirect to the app — they ARE valuable on their own.

| Factor | Video Game Lots |
|--------|----------------|
| **Friction** | Extremely high — manual identification + pricing per title |
| **AI fit** | Image recognition required, can't be done with text search alone |
| **Audience** | Retail users through professional resellers — wide appeal |
| **Pricing data** | Public databases exist (PriceCharting) — no proprietary data needed |
| **Scope** | Lots only (not all individual game listings) — manageable AI processing volume |
| **Community** | Active, vocal, forum-heavy buyers who share useful tools |

---

## The Approach: Hand-Pick → Validate → Systematize

We're not trying to programmatically generate thousands of pages on day one. The path:

### Phase 1: Hand-Curated Pages (4–5 niches)
- Pick categories where friction is highest and AI adds the most value
- Build each page intentionally — custom analysis logic, custom content, custom landing page
- Each page gets a supporting content article + light distribution
- Prove the model: traffic, engagement, affiliate revenue, web app conversion

### Phase 2: Find the Consistencies
- After 4–5 pages, identify what's common across them
- What page elements perform? What content converts? What distribution works?
- Build the repeatable playbook

### Phase 3: Data-Driven Scale
- Use our category/buyer data to identify the next 50–100 targets
- Apply the playbook systematically
- Now backlink strategy, site structure, and infrastructure matter
- This is where Ivan's SEO architecture expertise becomes critical

**Why this order:**
- Least friction, most value upfront
- Validates before investing in scale infrastructure
- Each hand-built page teaches us something
- Avoids the "1,000 thin pages that don't rank" trap

---

## Two Core Examples: What We're Building

We have two solid exemplars to lead with. These show the pattern; we'll pick 2–3 more in the call.

### Example 1: Video Game Lots

**The page:** Curated feed of video game lots from eBay, with AI-extracted titles + GameStop buyback values vs. asking price. Ranked by margin opportunity.

**Backend required:**
- Keyword search groups: ["lot", "Nintendo", "PS5", "SNES", "mixed games", "estate"]
- AI processing: image recognition → extract titles from photos
- Price feed: PriceCharting buyback API (routine updates)
- Display logic: calc margin %, sort by opportunity, filter by platform

**Why this one:** Highest friction niche. Buyers need manual work for each lot. AI solves it completely. Community is vocal (r/GameFlipping, resellers know they need help).

### Example 2: Server RAM / Memory

**The page:** Curated feed of server memory modules from eBay, matched against buy lists + market pricing. Shows margin opportunity for IT resellers.

**Backend required:**
- Keyword search groups: ["DDR4", "DDR5", "memory module", "DRAM", "server RAM", "Kingston", "Hynix", etc.]
- AI processing: part # extraction + normalization (DRAM is commodity, specs matter)
- Price feed: market pricing for commodity components
- Display logic: match against buyer's price list (if logged in), show margin, flag by spec

**Why this one:** Already proven with enterprise customer Kathy. Part # matching pattern is solvable. IT reseller community has high buying volume. Market is hot (AI infrastructure demand).

**Gold pages are a different opportunity** — they target the spot-price arbitrage buyer, not the general reseller. We'll revisit after validating video game lots + RAM.

## Additional Category Candidates

| Category | Why | AI Requirement | Pricing Data |
|----------|-----|---------------|--------------|
| **Women's Handbags** | Authentication signals matter, luxury buyer community | Brand + model ID from images | Market comps (Rebag, Vestiaire, etc.) |
| **Watches** | Similar to handbags, counterfeit risk, active collecting | Brand + model ID from descriptions | Market comps (Chrono24, Watchmaxx) |
| **Trading Card Lots** | Same lot-analysis pattern as video games | Image recognition + set identification | TCGPlayer / PSA pricing |
| **PLC / Industrial Drives** | Enterprise value, counterfeit risk, strategic hedge | Model ID + spec matching | Specialized (enterprise) |
| **Cell Phones** | Origin category for uBuyFirst, model identification | Model/condition extraction | Market pricing comps |

We'll discuss which of these (and others) make sense from an SEO + content strategy perspective during the call.

---

## What We're Looking for From Ivan

1. **Category prioritization** — given these options and the data, where should we start?
2. **SEO architecture** — site structure, domain strategy, how pages relate to each other and to the main site
3. **Page design** — what elements on a data-driven category page actually rank and convert?
4. **Content strategy** — what supporting content per niche? How to optimize for AI search engines?
5. **Distribution approach** — beyond Reddit seeding, what's the minimum viable backlink/authority strategy for hand-curated pages?
6. **Scaling framework** — when we move from 5 pages to 50+, what infrastructure decisions need to be made upfront?

The engagement starts small and focused. We want to validate the approach with a handful of pages before committing to scale.

---

## Companion Materials

- **Strategy Visual** → `v1-strategy-visual.html` — full diagram: market position cascade, per-category flywheel, worked example, category table, phasing, discussion questions
- **Page Mockup** → `../../seo-browse-pages/reference/mockup-ai-analysis-page.html` — working HTML mockup with video game lots tab + gold tab (shared with Ivan previously)

## Before the Call: Prep Checklist

- [x] ~~Create strategy visual with flywheel + phasing~~ → `v1-strategy-visual.html`
- [x] ~~Draw up wireframe of video game lot page elements~~ → existing mockup covers this
- [ ] Confirm market share numbers (40-50% at 1-3 min) with sold data — pull from Power BI
- [ ] Pull 2-3 real video game lot examples from eBay to walk through live
- [ ] Summarize top target categories from data analysis (GMV, buyer count, volume)
- [ ] Review Ivan's earlier Vercel mockup for gold pages — bring as reference point
