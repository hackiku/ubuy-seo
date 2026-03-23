// src/data/navigation.ts
// Single source of truth for nav + footer links.

export interface NavItem {
	label: string;
	href: string;
	description?: string;   // shown in megamenu
	badge?: "live" | "soon" | "new";
}

export interface NavGroup {
	label: string;
	items: NavItem[];
}

// ── Top-level nav links ──────────────────────────────────────────────────────
export const NAV_LINKS: NavItem[] = [
	{ label: "Browse", href: "/browse" },
	{ label: "Lots", href: "/lots" },
];

// ── Megamenu: Browse dropdown ────────────────────────────────────────────────
export const BROWSE_DROPDOWN: NavGroup[] = [
	{
		label: "By Country",
		items: [
			{ label: "eBay US", href: "/browse/us", description: "United States listings" },
			{ label: "eBay UK", href: "/browse/uk", description: "United Kingdom listings" },
			{ label: "eBay DE", href: "/browse/de", description: "Germany listings" },
			{ label: "eBay AU", href: "/browse/au", description: "Australia listings" },
		],
	},
	{
		label: "Popular Categories",
		items: [
			{ label: "iPhones", href: "/browse/us/iphone", description: "Apple iPhone — all models" },
			{ label: "Vinyl Records", href: "/browse/us/vinyl-records", description: "LPs, 45s, collector pressings" },
			{ label: "Wristwatches", href: "/browse/us/wristwatches", description: "Luxury + vintage timepieces" },
			{ label: "View all →", href: "/browse" },
		],
	},
];

// ── Megamenu: Lots dropdown ──────────────────────────────────────────────────
export const LOTS_DROPDOWN: NavGroup[] = [
	{
		label: "AI-Analyzed Lots",
		items: [
			{
				label: "Video Game Lots",
				href: "/lots/videogames",
				description: "Title extraction + PriceCharting margin scores",
				badge: "live",
			},
			{
				label: "Server RAM",
				href: "/lots/ram",
				description: "Part# matching against commodity pricing",
				badge: "live",
			},
			{
				label: "Gold & Metals",
				href: "/lots/gold",
				description: "Over/under spot price calculation",
				badge: "soon",
			},
			{
				label: "Women's Handbags",
				href: "/lots/handbags",
				description: "Authentication signals + resale comps",
				badge: "soon",
			},
		],
	},
];

// ── Footer ───────────────────────────────────────────────────────────────────
export interface FooterColumn {
	heading: string;
	links: NavItem[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
	{
		heading: "Product",
		links: [
			{ label: "Browse Listings", href: "/browse" },
			{ label: "Lots", href: "/lots" },
			{ label: "Web App", href: "https://app.ubuyfirst.com" },
			{ label: "Desktop App", href: "https://ubuyfirst.com/get-started" },
			{ label: "Pricing", href: "https://ubuyfirst.com/pricing" },
		],
	},
	{
		heading: "Lots",
		links: [
			{ label: "Video Game Lots", href: "/lots/videogames" },
			{ label: "Server RAM", href: "/lots/ram" },
			{ label: "Gold & Metals", href: "/lots/gold" },
			{ label: "Women's Handbags", href: "/lots/handbags" },
		],
	},
	{
		heading: "Company",
		links: [
			{ label: "About", href: "https://ubuyfirst.com/about" },
			{ label: "Features", href: "https://ubuyfirst.com/features" },
			{ label: "Blog", href: "https://ubuyfirst.com/blog" },
			{ label: "Schedule a Demo", href: "https://calendly.com/ubuyfirst/ubuyfirst-demo" },
		],
	},
	{
		heading: "Legal",
		links: [
			{ label: "Privacy Policy", href: "https://ubuyfirst.com/privacy-policy" },
			{ label: "Terms of Service", href: "https://ubuyfirst.com/terms" },
			{ label: "eBay Affiliate Disclosure", href: "https://ubuyfirst.com/affiliate-disclosure" },
		],
	},
];

export const FOOTER_TAGLINE =
	"The intelligence layer serious eBay buyers run on. Top-50 eBay Global Affiliate since 2013.";