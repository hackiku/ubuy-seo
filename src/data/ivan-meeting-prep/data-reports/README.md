---
title: Data Reports — Guide & Navigation
created: 2026-03-21
for: Ivan
purpose: Explains which reports to review and what each one shows
---

# Data Reports — Guide for Ivan

This folder contains **references and guidance** for the key data reports that inform category selection and validate the opportunity. The actual reports are linked below with direct paths.

---

## Quick Summary: What the Data Shows

Our strategy is grounded in three data streams:

1. **Whale Buyer Concentration** — Where the highest-value buyers cluster by category
2. **Target Window Analysis** — Purchase volume in the batch-buyer window (5 min to 1 day)
3. **Category-Specific Deep Dives** — Real eBay user profiles, market signals, and pricing data solvability

Together, these tell you: Which categories have enough whale buyers + enough volume + solvable pricing + sufficient AI opportunity to justify hand-curating a page.

---

## Report 1: Whale Buyer Concentration

**What:** Top N% of buyers by total GMV across all categories, broken down to which categories they concentrate in.

**Why it matters:** Identifies where high-value repeat buyers cluster. If a category has many whales + high concentration % of whales, those are buyers who will use the page daily.

**How to read it:**
- **Whale Count** = how many top-tier buyers are in this category
- **Concentration %** = what share of this category's buyers are whales (higher = better signal)
- **Whale GMV/mo** = how much monthly volume flows through whales in this category

**Location:** `../../whale-buyer-data/analysis/whale-concentration-report.html`

**Categories that stand out:**
- Video game lots (if we filter for lots specifically, concentration should be even higher)
- Server RAM (clear whale presence, confirmed with enterprise customer Kathy)
- Watches/handbags (authentication/luxury buyer concentration)

---

## Report 2: Category Distribution

**What:** Spread of buyers across categories. Shows which categories have concentrated buyer bases vs. fragmented ones.

**Why it matters:** Categories with concentrated buyers are easier to reach and more likely to become repeat page users. Fragmented categories = harder distribution.

**Location:** `../../whale-buyer-data/analysis/category-distribution-report.html`

**How to interpret:**
- High concentration = 80% of buyers concentrated in a few large players → easier marketing (target the 10-20 whale buyers)
- Distributed = buyers spread across hundreds of small players → harder, but larger addressable market

---

## Report 3: CN/HK Seller Penetration

**What:** Which categories are dominated by Chinese/Hong Kong sellers. Shows where the "seller country filter" value prop matters most.

**Why it matters:** If 60%+ of listings in a category are from overseas sellers (and quality issues are common), our curated pages add huge value by filtering to trusted sellers.

**Location:** `../../whale-buyer-data/analysis/cn_hk_penetration_report.html`

**Best targets:**
- Categories where overseas dominance is high (70%+)
- AND there's significant buyer friction with quality/authenticity (watches, handbags, electronics)

---

## Report 4: Target Window Analysis

**What:** Breaks down purchase volume by time-from-listing buckets: 30 min, 1 hr, 1 day, up to 30 days.

**Why it matters:** Validates that there's real volume in the window our pages target (batch buyers, 5 min to 1 day post-listing). Shows which categories have the most opportunity at scale.

**Location:** `../../seo-browse-pages/projects/target-window-report/`
- Main report: `output/target-window-report.html`
- Raw data: `data/Nov18-Jan18-buyers-10k-GMV (2).xlsx`

**Key metrics to watch:**
- **1-day total volume** = sum of buying activity 24 hours after listing
- **Whale buyer participation** = what % of 1-day volume comes from whale buyers
- **Top categories by 1-day GMV** = best targets for public pages (highest absolute volume)

---

## Report 5: Power BI Opportunity Analysis

**What:** Three-signal analysis combining whale concentration + sold volume + target window timing.

**Why it matters:** This is the data-driven model for picking categories. Combines multiple signals into one ranking.

**Location:** `../../seo-browse-pages/projects/niche-pages/data/power-bi/`

**Key reports:**
- `three-way-signal-v2.html` — three signals ranked by total opportunity
- `opportunity-report-v2.html` — category matrix with whale signal + volume signal + timing signal
- `match-analysis.html` — data quality + signal strength per category

**How to use it:**
1. Identify categories in top 50 by three-way signal
2. Cross-reference with whale concentration report (is it a whale-heavy category?)
3. Check target window report (does it have volume in 1-day bucket?)
4. If all three align = high-confidence target for hand-curation

---

## Report 6: Category-Specific Deep Dives

These are custom research reports for individual categories, showing eBay user profiles, market signals, and real buying examples.

### Server RAM / Memory
**Location:** `../../whale-buyer-data/projects/category-research/categories/memory-ram/results/`
- `memory-ram-discovery-report.html` — summary
- `server-ram-category-discovery-report.md` — markdown with eBay user IDs

**What it shows:**
- Real eBay buyer usernames (Tier A / Tier B scoring)
- Company profiles + market research
- Buying patterns + price sensitivity
- Pricing data solvability (commodity pricing exists)

**Why this category matters:** Proven with enterprise customer Kathy. Commodity matching pattern already validated. Server RAM market is hot (AI infrastructure demand driving prices up 45-60% QoQ).

### Wristwatches
**Location:** `../../whale-buyer-data/projects/category-research/categories/wristwatches/results/`
- `wristwatches-discovery-report.html`

**What it shows:**
- Luxury buyer concentration
- Authentication + pricing challenges
- Market comps exist (Watchmaxx, Chrono24, etc.)
- Active collecting community

**Why this category matters:** High friction on authentication. Price data is public. Community is vocal about counterfeits. Curated page with auth signals = moat PickClick doesn't have.

### Women's Handbags
**Location:** `../../whale-buyer-data/projects/category-research/categories/womens-handbags/results/`
- `handbags-discovery-report.html`

**What it shows:**
- Similar luxury buyer pattern to watches
- Counterfeit risk even higher than watches
- Market comps exist (Rebag, Fashionphile, Vestiaire)
- Reseller community is large + vocal

**Why this category matters:** Authentication is the pain point. We can surface authenticity signals (condition, provenance, seller trust scores). Fills a real gap.

---

## How to Use These Reports for Ivan

**Before the call:**
1. **Skim** Report 1 (whale concentration) — 10 minutes. Get a sense of which categories have whale clusters.
2. **Browse** Report 4 (target window) — 10 minutes. See which categories have volume in the 1-day bucket.
3. **Check** one deep dive (server RAM) — 15 minutes. Understand what "solvable" looks like.

**During the call:**
- Reference the whale concentration data when discussing category prioritization
- Show the target window analysis to prove there's volume in the batch-buyer window
- Walk through the server RAM deep dive as a "here's what validation looks like" example
- Use the three-way signal report as the data-driven model for subsequent category scoring

---

## The Data Model (TL;DR)

A category is a good target if it has:

| Signal | Source | What to Look For |
|--------|--------|------------------|
| **Whale concentration** | Whale concentration report | 20+ whales in the category, >5% whale concentration |
| **Volume in 1-day window** | Target window report | At least $5M-10M monthly GMV in 1-day bucket |
| **Pricing data exists** | Category deep dive | External databases (PriceCharting, spot prices, market comps) |
| **AI opportunity** | Domain knowledge | Friction the page can solve (authentication, lot analysis, condition assessment) |
| **Community presence** | Deep dive + research | Forums, Reddit, Facebook groups — buyers exist to tell about the page |

**Example: Video Game Lots**
- ✓ Whale concentration: many collectors + resellers in game-buying space
- ✓ Volume: video game auctions have 1000s daily, lots are subset but growing
- ✓ Pricing: PriceCharting, GameStop buyback prices, eBay comps
- ✓ AI opportunity: image recognition to extract titles from lot photos
- ✓ Community: r/GameFlipping, r/retrogaming, Discord communities

---

## Navigation Quick Links

All reports are in the parent workspace directories. Use these relative paths:

```
ivan-meeting-prep/
├── INDEX.md (materials guide)
├── ivan-precursor-doc.md (business case + strategy)
├── v1-strategy-visual.html (strategy flow)
├── README.md (checklist)
└── data-reports/
    └── THIS FILE (you are here)

────────────────────────────────────────────────────────
Actual reports (linked below, not in this folder):

whale-buyer-data/analysis/
├── whale-concentration-report.html
├── category-distribution-report.html
├── cn_hk_penetration_report.html
└── category-distribution-report.html

whale-buyer-data/projects/category-research/categories/*/results/
├── memory-ram/memory-ram-discovery-report.html
├── wristwatches/wristwatches-discovery-report.html
└── womens-handbags/handbags-discovery-report.html

whale-buyer-data/projects/target-window-report/
└── output/target-window-report.html

seo-browse-pages/projects/niche-pages/data/power-bi/
├── three-way-signal-v2.html
├── opportunity-report-v2.html
└── match-analysis.html
```

---

## Questions Before Opening These?

The data can feel overwhelming at first. Key things to understand:

- **Whale buyer data:** All eBay buyers in Nov 2025 - Jan 2026 (anonymized)
- **Sold data:** Time-bucketed purchase records showing when buyers buy
- **What you CAN'T do:** Identify specific individuals by name (data is anonymized)
- **What you CAN do:** See patterns: which categories have whale clusters, which have batch-buying volume, which match our AI opportunities

Trust the data. It's what makes this different from a guess.

---

*For questions about these reports, Dustin has the original analysis scripts and can regenerate newer versions with updated data.*
