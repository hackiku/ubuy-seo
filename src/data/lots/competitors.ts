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
	{
		name: "GoCollect",
		domain: "gocollect.com",
		url: "https://gocollect.com/video-games",
		description: "Real-time video game sales tracking and price guide for collectors.",
		type: "pricing-db",
		categories: ["videogames"],
	},
	{
		name: "GameValueNow",
		domain: "gamevaluenow.com",
		url: "https://gamevaluenow.com",
		description: "Aggregated video game price data from eBay and other sources.",
		type: "pricing-db",
		categories: ["videogames"],
	},
	{
		name: "eStarland",
		domain: "estarland.com",
		url: "https://www.estarland.com/trade-in",
		description: "Video game trade-in and buyback prices with instant quotes.",
		type: "pricing-db",
		categories: ["videogames"],
	},
	{
		name: "DKOldies",
		domain: "dkoldies.com",
		url: "https://www.dkoldies.com/sell-video-games",
		description: "Buyback specialist for retro consoles and game lots.",
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
	{
		name: "JM Bullion",
		domain: "jmbullion.com",
		url: "https://www.jmbullion.com",
		description: "Major bullion marketplace with low premiums and spot tracking.",
		type: "marketplace",
		categories: ["gold"],
	},
	{
		name: "Money Metals Exchange",
		domain: "moneymetals.com",
		url: "https://www.moneymetals.com",
		description: "Precious metals dealer with strong education and competitive pricing.",
		type: "marketplace",
		categories: ["gold"],
	},
	{
		name: "GoldAPI.io",
		domain: "goldapi.io",
		url: "https://www.goldapi.io",
		description: "Real-time gold/silver/platinum spot prices JSON API.",
		type: "pricing-db",
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
	{
		name: "The RealReal",
		domain: "therealreal.com",
		url: "https://www.therealreal.com",
		description: "Luxury consignment marketplace with in-house authentication.",
		type: "marketplace",
		categories: ["handbags"],
	},
	{
		name: "Real Authentication",
		domain: "realauthentication.com",
		url: "https://realauthentication.com",
		description: "Expert human + tech authentication for 170+ luxury brands.",
		type: "authentication",
		categories: ["handbags"],
	},
	{
		name: "LegitGrails",
		domain: "legitgrails.com",
		url: "https://legitgrails.com",
		description: "Digital AI-powered authentication for designer handbags.",
		type: "authentication",
		categories: ["handbags"],
	},

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
	{
		name: "ServerPartDeals",
		domain: "serverpartdeals.com",
		url: "https://serverpartdeals.com",
		description: "Refurbished enterprise server RAM and hardware marketplace.",
		type: "marketplace",
		categories: ["ram"],
	},
	{
		name: "BuySellRAM",
		domain: "buysellram.com",
		url: "https://www.buysellram.com",
		description: "Bulk buyer of used server and enterprise RAM modules.",
		type: "marketplace",
		categories: ["ram"],
	},

	// ── Wristwatches (NEW NICHE) ──────────────────────────────────────────────
	{
		name: "Chrono24",
		domain: "chrono24.com",
		url: "https://www.chrono24.com",
		description: "Global luxury watch marketplace with built-in price database.",
		type: "marketplace",
		categories: ["watches"],
	},
	{
		name: "Bob's Watches",
		domain: "bobswatches.com",
		url: "https://www.bobswatches.com",
		description: "Pre-owned Rolex specialist with transparent buy/sell pricing.",
		type: "marketplace",
		categories: ["watches"],
	},
	{
		name: "WatchCharts",
		domain: "watchcharts.com",
		url: "https://watchcharts.com",
		description: "Watch price tracking, valuation tools, and market indexes.",
		type: "pricing-db",
		categories: ["watches"],
	},
	{
		name: "The WatchBox",
		domain: "thewatchbox.com",
		url: "https://www.thewatchbox.com",
		description: "Curated pre-owned luxury watch marketplace.",
		type: "marketplace",
		categories: ["watches"],
	},
	{
		name: "EveryWatch",
		domain: "everywatch.com",
		url: "https://everywatch.com",
		description: "Data aggregator pulling auction + marketplace watch prices.",
		type: "aggregator",
		categories: ["watches"],
	},

	// ── Trading Cards (NEW NICHE) ─────────────────────────────────────────────
	{
		name: "Card Ladder",
		domain: "cardladder.com",
		url: "https://www.cardladder.com",
		description: "Comprehensive trading card sales history and price guide.",
		type: "pricing-db",
		categories: ["tradingcards"],
	},
	{
		name: "Card Hedger",
		domain: "cardhedger.com",
		url: "https://www.cardhedger.com",
		description: "Sports, Pokémon, and TCG price guide with graded data.",
		type: "pricing-db",
		categories: ["tradingcards"],
	},
	{
		name: "Sports Card Investor",
		domain: "sportscardinvestor.com",
		url: "https://www.sportscardinvestor.com",
		description: "Sports card price database and collection tracker.",
		type: "pricing-db",
		categories: ["tradingcards"],
	},

	// ── Smartphones (NEW NICHE) ───────────────────────────────────────────────
	{
		name: "Gazelle",
		domain: "gazelle.com",
		url: "https://www.gazelle.com",
		description: "Phone buyback and trade-in pricing engine for used smartphones.",
		type: "pricing-db",
		categories: ["smartphones"],
	},
	{
		name: "Back Market",
		domain: "backmarket.com",
		url: "https://www.backmarket.com",
		description: "Refurbished smartphone marketplace with condition-based pricing.",
		type: "marketplace",
		categories: ["smartphones"],
	},
	{
		name: "SellCell",
		domain: "sellcell.com",
		url: "https://www.sellcell.com",
		description: "Aggregator comparing 40+ phone buyback offers instantly.",
		type: "aggregator",
		categories: ["smartphones"],
	},
	{
		name: "BankMyCell",
		domain: "bankmycell.com",
		url: "https://www.bankmycell.com",
		description: "Cell phone trade-in price comparison from verified buyers.",
		type: "aggregator",
		categories: ["smartphones"],
	},

	// ── Industrial Automation (PLCs) (NEW NICHE) ──────────────────────────────
	{
		name: "NJT Automation",
		domain: "njtautomation.com",
		url: "https://njtautomation.com",
		description: "Surplus Allen-Bradley PLC and automation equipment buyer.",
		type: "marketplace",
		categories: ["plcs"],
	},
	{
		name: "Industrial Automation Co",
		domain: "industrialautomationco.com",
		url: "https://www.industrialautomationco.com",
		description: "Buyer of surplus PLCs, HMIs, and industrial automation parts.",
		type: "marketplace",
		categories: ["plcs"],
	},
	{
		name: "DREAMland PLC",
		domain: "dreamland-plc.com",
		url: "https://dreamland-plc.com",
		description: "Buyback for non-functional and surplus industrial PLC components.",
		type: "marketplace",
		categories: ["plcs"],
	},
];

/** Filter competitors by catalog category slug */
export function getCompetitors(category: string): Competitor[] {
	return COMPETITORS.filter((c) => c.categories.includes(category));
}