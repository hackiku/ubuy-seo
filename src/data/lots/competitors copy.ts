// src/data/lots/competitors.ts
// One entry per external pricing/market reference site.
// `categories` links to catalog slugs where this comp is relevant.

export interface Competitor {
	name: string;
	domain: string;
	url: string;
	description: string;
	type: "pricing-db" | "marketplace" | "aggregator" | "authentication";
	categories: string[];
}

export const COMPETITORS: Competitor[] = [
	// ── Video Games ──────────────────────────────────────────────────────────
	{
		name: "PriceCharting",
		domain: "pricecharting.com",
		url: "https://www.pricecharting.com",
		description: "Canonical buyback & market pricing for video games. API available.",
		type: "pricing-db",
		categories: ["videogames"],
	},
	{
		name: "GameStop Trade-In",
		domain: "gamestop.com",
		url: "https://www.gamestop.com/trade",
		description: "Retail buyback prices — floor benchmark for lot margin calc.",
		type: "pricing-db",
		categories: ["videogames"],
	},
	{
		name: "TCGPlayer",
		domain: "tcgplayer.com",
		url: "https://www.tcgplayer.com",
		description: "Trading card market prices. Overlaps for retro game card bundles.",
		type: "marketplace",
		categories: ["videogames"],
	},

	// ── Gold / Precious Metals ────────────────────────────────────────────────
	{
		name: "APMEX",
		domain: "apmex.com",
		url: "https://www.apmex.com",
		description: "Spot price reference + premium over spot for gold/silver coins.",
		type: "pricing-db",
		categories: ["gold"],
	},
	{
		name: "Kitco",
		domain: "kitco.com",
		url: "https://www.kitco.com",
		description: "Live spot price API. Used to calculate over/under spot.",
		type: "pricing-db",
		categories: ["gold"],
	},
	{
		name: "SD Bullion",
		domain: "sdbullion.com",
		url: "https://sdbullion.com",
		description: "Competitor marketplace — premium benchmarks for popular coins.",
		type: "marketplace",
		categories: ["gold"],
	},

	// ── Handbags ──────────────────────────────────────────────────────────────
	{
		name: "Vestiaire Collective",
		domain: "vestiairecollective.com",
		url: "https://www.vestiairecollective.com",
		description: "Auth-verified resale. Price comps + demand signal for luxury bags.",
		type: "marketplace",
		categories: ["handbags"],
	},
	{
		name: "Rebag",
		domain: "rebag.com",
		url: "https://www.rebag.com",
		description: "Structured resale pricing via Clair AI. Strong model-level data.",
		type: "pricing-db",
		categories: ["handbags"],
	},
	{
		name: "Fashionphile",
		domain: "fashionphile.com",
		url: "https://www.fashionphile.com",
		description: "Pre-owned luxury resale. Authentication + buyback price reference.",
		type: "marketplace",
		categories: ["handbags"],
	},
	{
		name: "Entrupy",
		domain: "entrupy.com",
		url: "https://www.entrupy.com",
		description: "AI authentication service for luxury goods. Not a marketplace.",
		type: "authentication",
		categories: ["handbags"],
	},

	// ADD these entries to src/data/lots/competitors.ts
	// (append into the COMPETITORS array)

	// ── Server RAM / Memory ───────────────────────────────────────────────────
	{
		name: "ServerMonkey",
		domain: "servermonkey.com",
		url: "https://www.servermonkey.com",
		description: "Refurb server hardware reseller. Strong price reference for branded server RAM.",
		type: "marketplace",
		categories: ["ram"],
	},
	{
		name: "Memory4Less",
		domain: "memory4less.com",
		url: "https://www.memory4less.com",
		description: "Commodity pricing for enterprise memory modules. Part# lookup.",
		type: "pricing-db",
		categories: ["ram"],
	},
	{
		name: "Crucial / Micron",
		domain: "crucial.com",
		url: "https://www.crucial.com",
		description: "OEM pricing baseline. Useful for calculating discount-to-new.",
		type: "pricing-db",
		categories: ["ram"],
	},
	{
		name: "IT Asset Partners",
		domain: "itassetpartners.com",
		url: "https://www.itassetpartners.com",
		description: "Enterprise secondary market. Bulk RAM pricing reference.",
		type: "marketplace",
		categories: ["ram"],
	},
];

/** Filter competitors by catalog category slug */
export function getCompetitors(category: string): Competitor[] {
	return COMPETITORS.filter((c) => c.categories.includes(category));
}