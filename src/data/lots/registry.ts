// src/data/lots/registry.ts
// Central registry for all Lots categories.
// The dynamic route /lots/[slug] reads from here — add a category, get a page.
// Static pages (videogames, ram, gold, handbags) override this with custom UI.
// Everything else renders via the generic template.

export type LotStatus = "live" | "soon" | "building";

export interface LotCategory {
	slug: string;
	label: string;
	icon: string;
	status: LotStatus;
	// Hero section
	tagline: string;          // one punchy line under the h1
	description: string;      // 2-3 sentence pitch
	// Stats strip (3 items max)
	stats: { value: string; label: string }[];
	// How value is calculated for this category
	heroMetric: {
		label: string;          // e.g. "Margin vs asking price"
		source: string;         // e.g. "PriceCharting API"
	};
	// What AI does for this category
	aiMethod: string;         // e.g. "Image recognition + title extraction"
	// Tags shown on lots/index cards
	tags: string[];
	// SEO
	metaTitle: string;
	metaDescription: string;
}

export const LOT_CATEGORIES: LotCategory[] = [
	// ── Live (have custom pages) ─────────────────────────────────────────────
	{
		slug: "videogames",
		label: "Video Game Lots",
		icon: "🎮",
		status: "live",
		tagline: "Stop squinting at lot photos.",
		description:
			"eBay lots contain 10–60+ games. AI reads the photo, identifies every title, and cross-references PriceCharting buyback prices so you see margin before you bid.",
		stats: [
			{ value: "+194%", label: "avg margin found" },
			{ value: "10–60", label: "titles per lot" },
			{ value: "0.91", label: "avg AI confidence" },
		],
		heroMetric: { label: "Margin vs asking price", source: "PriceCharting API" },
		aiMethod: "Image recognition + title extraction",
		tags: ["Image recognition", "PriceCharting API", "Margin calculator"],
		metaTitle: "Video Game Lots — AI Margin Analysis | uBuyFirst",
		metaDescription:
			"AI reads every lot photo, IDs each title, cross-references PriceCharting. See margin before you bid. No login required.",
	},
	{
		slug: "ram",
		label: "Server RAM",
		icon: "🖥️",
		status: "live",
		tagline: "Part number in. Market price out.",
		description:
			"AI extracts part numbers from listing titles and images, then matches against live commodity pricing. Built on the same pattern validated with enterprise buyers.",
		stats: [
			{ value: "DDR3–5", label: "all generations" },
			{ value: "ECC", label: "RDIMM / LRDIMM" },
			{ value: "97%", label: "avg part# confidence" },
		],
		heroMetric: { label: "Market value vs asking price", source: "Commodity pricing feed" },
		aiMethod: "Part number extraction + commodity matching",
		tags: ["Part# extraction", "Commodity pricing", "ECC / RDIMM"],
		metaTitle: "Server RAM & Memory — Market Price Analysis | uBuyFirst",
		metaDescription:
			"AI extracts part numbers from eBay server RAM listings and matches against live commodity pricing. Sorted by margin. No login required.",
	},

	// ── Soon (custom pages exist, pipeline pending) ──────────────────────────
	{
		slug: "gold",
		label: "Gold & Precious Metals",
		icon: "🥇",
		status: "live",
		tagline: "Know exactly what you're paying over spot.",
		description:
			"Live spot price feed from Kitco. Every listing shows over/under spot in real time — so arbitrage opportunities are obvious at a glance.",
		stats: [
			{ value: "Live", label: "Kitco spot feed" },
			{ value: "Au/Ag/Pt", label: "metals covered" },
			{ value: "0%", label: "logins required" },
		],
		heroMetric: { label: "Over / under spot %", source: "Kitco API" },
		aiMethod: "Weight + purity extraction from listing title",
		tags: ["Kitco API", "Over/under spot", "Coins + bars"],
		metaTitle: "Gold & Precious Metals — Spot Price Analysis | uBuyFirst",
		metaDescription:
			"Live spot price vs eBay asking price for gold, silver, and platinum listings. Find under-spot deals instantly.",
	},
	{
		slug: "handbags",
		label: "Women's Handbags",
		icon: "👜",
		status: "live",
		tagline: "Authentication signals on every listing.",
		description:
			"Auth signals surfaced per listing. Prices cross-referenced against Rebag, Vestiaire, and Fashionphile so you know what resale actually looks like.",
		stats: [
			{ value: "Auth", label: "signals per listing" },
			{ value: "3×", label: "price comps per bag" },
			{ value: "170+", label: "brands covered" },
		],
		heroMetric: { label: "Resale value vs asking price", source: "Rebag / Vestiaire" },
		aiMethod: "Brand + model ID from photos and description",
		tags: ["Auth signals", "Rebag comps", "Counterfeit filter"],
		metaTitle: "Women's Handbags — Authentication & Resale Analysis | uBuyFirst",
		metaDescription:
			"Authentication signals and resale comps from Rebag, Vestiaire, and Fashionphile for eBay handbag listings.",
	},

	// ── Building (dynamic template only) ────────────────────────────────────
	{
		slug: "watches",
		label: "Wristwatches",
		icon: "⌚",
		status: "live",
		tagline: "Reference prices from Chrono24, not guesswork.",
		description:
			"Model identified from listing title and photos, cross-referenced against WatchCharts and Chrono24 market data. Authentication risk flagged per listing.",
		stats: [
			{ value: "Chrono24", label: "market comps" },
			{ value: "Auth", label: "risk flagging" },
			{ value: "Rolex+", label: "major brands" },
		],
		heroMetric: { label: "Market comp vs asking price", source: "WatchCharts / Chrono24" },
		aiMethod: "Model ID from title + image + reference number",
		tags: ["WatchCharts", "Chrono24 comps", "Auth risk", "Model ID"],
		metaTitle: "Wristwatches — Market Price & Authentication Analysis | uBuyFirst",
		metaDescription:
			"Luxury and vintage watch listings cross-referenced against Chrono24 and WatchCharts. Authentication risk flagged. No login required.",
	},
	{
		slug: "tradingcards",
		label: "Trading Card Lots",
		icon: "🃏",
		status: "live",
		tagline: "Same lot analysis pattern as video games.",
		description:
			"AI scans lot photos and listings to identify individual cards, then cross-references TCGPlayer, Card Ladder, and PSA graded data for value estimates.",
		stats: [
			{ value: "TCGPlayer", label: "price feed" },
			{ value: "PSA/BGS", label: "graded data" },
			{ value: "Pokémon+", label: "all major sets" },
		],
		heroMetric: { label: "Estimated lot value vs asking price", source: "TCGPlayer / Card Ladder" },
		aiMethod: "Card recognition + set identification from photos",
		tags: ["TCGPlayer API", "PSA graded data", "Card recognition", "Set ID"],
		metaTitle: "Trading Card Lots — AI Value Analysis | uBuyFirst",
		metaDescription:
			"AI identifies cards in eBay lots and cross-references TCGPlayer and Card Ladder pricing. See value before you bid.",
	},
	{
		slug: "smartphones",
		label: "Smartphones",
		icon: "📱",
		status: "live",
		tagline: "Model, carrier, condition — extracted automatically.",
		description:
			"Model and condition extracted from listing title and photos. Buyback prices pulled from Gazelle and SellCell so margin is pre-calculated.",
		stats: [
			{ value: "Gazelle", label: "buyback feed" },
			{ value: "IMEI", label: "clean check signals" },
			{ value: "iPhone+", label: "major brands" },
		],
		heroMetric: { label: "Buyback value vs asking price", source: "Gazelle / SellCell" },
		aiMethod: "Model + condition + carrier extraction from title",
		tags: ["Gazelle API", "SellCell comps", "Condition scoring", "IMEI signals"],
		metaTitle: "Smartphones — Buyback Price Analysis | uBuyFirst",
		metaDescription:
			"eBay smartphone listings cross-referenced against Gazelle and SellCell buyback prices. Find margin fast.",
	},
	{
		slug: "plcs",
		label: "Industrial PLCs",
		icon: "⚙️",
		status: "live",
		tagline: "Surplus automation equipment, priced against the market.",
		description:
			"Model numbers extracted from listing titles, cross-referenced against surplus dealer pricing. High-value niche with enterprise buyers who know exactly what they need.",
		stats: [
			{ value: "Allen-B+", label: "major brands" },
			{ value: "Surplus", label: "dealer pricing" },
			{ value: "B2B", label: "buyer profile" },
		],
		heroMetric: { label: "Surplus market value vs asking price", source: "NJT Automation / IAC" },
		aiMethod: "Model number + series extraction from title",
		tags: ["Part# matching", "Surplus pricing", "Allen-Bradley", "Siemens"],
		metaTitle: "Industrial PLCs — Surplus Market Analysis | uBuyFirst",
		metaDescription:
			"Allen-Bradley, Siemens, and other PLC listings cross-referenced against surplus dealer pricing. No login required.",
	},
];

// Helpers
export function getCategory(slug: string): LotCategory | undefined {
	return LOT_CATEGORIES.find((c) => c.slug === slug);
}

export function getLiveCategories(): LotCategory[] {
	return LOT_CATEGORIES.filter((c) => c.status === "live");
}

// Slugs that have custom static pages — dynamic route should defer to them
export const STATIC_LOT_SLUGS = new Set(["videogames", "ram"]);