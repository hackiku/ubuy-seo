---
title: Ivan Meeting Prep — Complete Materials Index
created: 2026-03-21
for: Ivan
status: READY FOR REVIEW
---

# Ivan Meeting Prep — Materials Index

This folder contains everything you need before the kickoff call (week of Mar 24). Start with the **Pre-Read**, then explore the supporting materials in the order that makes sense for you.

---

## Quick Start

**For a 10-minute overview:**
1. Read: [ivan-precursor-doc.md](ivan-precursor-doc.md) (sections 1–5)
2. View: [v1-strategy-visual.html](v1-strategy-visual.html) — open in Chrome

**For context on what we have:**
- Data: whale buyer analysis + Power BI sold data reports
- Mockup: existing page design with video game lots + gold tabs
- Team: 46K identified buyer dataset across 110K+ eBay categories

**For deep dive:**
- Read the full precursor doc
- Review the data reports (see breakdown below)
- Study the backend architecture requirements
- Check the mockup for what a live page looks like

---

## Materials Breakdown

### 1. Pre-Read (START HERE)

**File:** `ivan-precursor-doc.md`  
**What it is:** Complete business case + strategy breakdown  
**What's in it:**
- What uBuyFirst is (30 seconds)
- Market position (40-50% share at 1-3 min, cascading)
- Product map (desktop → web app → public pages)
- The opportunity (data-driven pages, no login required)
- **Worked example: Video Game Lots** — full end-to-end walkthrough
  - The friction buyers face
  - What we'd build
  - Page elements + design
  - Supporting content article
  - Distribution approach
- Initial category candidates (video games, gold, RAM, handbags, PLCs, trading cards)
- What Ivan's role covers

**Read time:** 15–20 minutes  
**Next:** View the strategy visual

---

### 2. Strategy Visual

**File:** `v1-strategy-visual.html`  
**What it is:** Interactive diagram of the full V1 approach  
**What's in it:**
- Market position cascade (bar chart)
- Per-category flywheel (5-step process)
- Worked example: video game lots (grid breakdown)
- Revenue flows
- Category candidates table
- Phasing: hand-pick → validate → systematize
- **8 discussion questions** for the call

**How to use:** Open in Chrome. Scroll through the flow. This is what you should have in your head before the call.

---

### 3. Data Reports

#### A. Whale Buyer Concentration & Categories
- **whale-concentration-report.html** — Top buyers by GMV, category concentration
- **category-distribution-report.html** — How many buyers per category, GMV spread
- **cn_hk_penetration_report.html** — Where seller country matters (CN/HK dominance by category)

**Why it matters:** Shows which categories have the deepest buyer concentration and where the highest-value opportunities are. Video game lots, server RAM, gold all have visible whale buyer presence.

#### B. Target Window Report
- **target-window-report.html** (in `projects/target-window-report/`)
- Shows GMV by time-from-listing bucket (30min, 1hr, 1day)
- Identifies which categories have volume in the "batch buyer" window (5 min to 1 day)
- **Key insight:** The 1-day window (where public pages live) has 8x the volume of the speed-buying window

**Why it matters:** Data-driven validation that there's real buying volume in the window public pages serve.

#### C. Power BI Analysis (Opportunities)
- **opportunity-report-v2.html** — Category-level opportunity matrix
- **three-way-signal-v2.html** — Three signals combined: sold volume + whale concentration + time-window analysis
- **match-analysis.html** — Data quality + signal strength per category

**Why it matters:** Shows the data-driven model for picking categories. These reports prove which niches have the right combination of: volume, buyer quality, and pricing-data solvability.

#### D. Category-Specific Deep Dives
- **Server RAM Category Research** (`../whale-buyer-data/projects/category-research/categories/memory-ram/results/`)
  - `memory-ram-discovery-report.html` — market analysis, buyer profiles, eBay user IDs
  - `server-ram-category-discovery-report.md` — markdown summary
  - **Why this category:** Proven live with enterprise customer (Kathy). Commodity matching pattern already validated.

- **Wristwatches Category Research** (`../whale-buyer-data/projects/category-research/categories/wristwatches/results/`)
  - `wristwatches-discovery-report.html` — buyer profiles, market signals
  - **Why this category:** Authentication + pricing data exist. Luxury buyer community is vocal.

- **Women's Handbags Category Research** (`../whale-buyer-data/projects/category-research/categories/womens-handbags/results/`)
  - `handbags-discovery-report.html` — similar pattern to watches
  - **Why this category:** Counterfeit filtering opportunity. Reseller community is large.

**What these show:** For each category, you get eBay user IDs of actual whale buyers, transaction patterns, and market-specific research. This is how you validate categories aren't just theoretical.

---

### 4. Mockup

**File:** `../seo-browse-pages/reference/mockup-ai-analysis-page.html`  
**What it is:** Working HTML mockup of what a live page looks like  
**What's in it:**
- Top bar with branding + save button
- Tab system (video game lots | gold)
- Filters + sorting (platform, margin %, price)
- Live listing feed:
  - Thumbnail
  - Title + seller info + auction status
  - AI confidence score
  - Hero metric (margin % for video games, over-spot for gold)
- Upsell banner (sign in for saved searches / custom prices)
- Detail modal (shows full lot contents breakdown)

**Why it matters:** Shows the user experience. No login required. Data automatically updates. Every click is trackable affiliate revenue.

---

### 5. Backend Architecture (Key for Ivan)

From the precursor doc, here's what's NOT visible on the page but IS critical:

**Required infrastructure per category:**
1. **Keyword search groups** (configurable)
   - Example: video games = ["lot", "Nintendo", "PS5", "mixed games", "estate", "collection"]
   - Grouped by platform, by size, by condition signals
   
2. **eBay search + filtering** 
   - Run automated searches on keyword combinations
   - Pull live listings (real-time or recent batches)
   - Apply business filters (min price, max price, seller quality, etc.)

3. **AI processing pipeline**
   - Input: listing title + photos + description
   - Output: structured data (game titles, confidence %, condition indicators)
   - Example: video game lots = image recognition → extract titles → match to PriceCharting
   - Different per category (lot analysis vs. commodity matching vs. spot price)

4. **External data feeds** (routine updates)
   - PriceCharting (video game buyback values)
   - Spot gold price (API)
   - Market comps databases
   - Custom buy lists (for logged-in users)

5. **Aggregation + display logic**
   - Combine AI results + price data
   - Calculate hero metric (margin %, over-spot, value breakdown)
   - Sort by opportunity (highest margin first, etc.)
   - Organize for visitor intent (filter by platform, etc.)

**Why this matters for site structure:**
- Each category might have different backend logic
- But the UI/UX pattern is the same (filter → sort → card feed → detail modal)
- Template-able at scale, but hand-configured for each niche initially

---

## Before the Call

**What you should be ready to discuss:**
1. Which 4–5 categories should we start with? (In what order?)
2. Site structure: where do these pages live? (Subdomain? Subfolder? Separate domains?)
3. Page design: what ranking + conversion factors matter most?
4. Content strategy: which article format works best for AI search?
5. Distribution: is YouTube + Reddit enough to bootstrap, or are we missing something?
6. Infrastructure: what decisions need architecting upfront before scaling?

**Prep work for us:**
- [ ] Confirm 40-50% market share numbers with sold data
- [ ] Pull 2–3 real video game lot examples from eBay (to walk through live)
- [ ] Summarize top 5 target categories by GMV + whale buyer concentration
- [ ] Review your earlier Vercel mockup for gold pages (comparison point)

---

## Questions?

If anything in these materials isn't clear, flag it before the call. The goal is to align on:
- **Which niches to start with** (hand-curated validation)
- **How to structure the pages** (SEO + user experience)
- **What Ivan's engagement covers** (prioritization, architecture, content strategy, distribution)

---

## File Manifest

```
ivan-meeting-prep/
├── INDEX.md (this file)
├── README.md (prep checklist)
├── ivan-precursor-doc.md ← START HERE
├── v1-strategy-visual.html ← THEN VIEW THIS
│
├── data-reports/
│   ├── whale-concentration-report.html
│   ├── category-distribution-report.html
│   ├── cn_hk_penetration_report.html
│   └── three-way-signal-v2.html (Power BI opportunity analysis)
│
└── [LINKED, NOT IN FOLDER]
    ├── ../seo-browse-pages/reference/mockup-ai-analysis-page.html (page design)
    ├── ../seo-browse-pages/projects/niche-pages/data/power-bi/opportunity-report-v2.html
    ├── ../seo-browse-pages/projects/niche-pages/data/power-bi/match-analysis.html
    └── ../whale-buyer-data/projects/category-research/categories/*/results/
        ├── memory-ram/memory-ram-discovery-report.html
        ├── wristwatches/wristwatches-discovery-report.html
        └── womens-handbags/handbags-discovery-report.html
```

---

*Last updated: March 21, 2026*  
*For: Ivan meeting prep (week of Mar 24)*
