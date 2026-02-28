// src/lib/seo/schema.ts
// Schema.org JSON-LD generators — import these in pages, never write schema in JSX

import type { Listing, BrowsePage } from "~/data/mock/listings";

// ─── Types ────────────────────────────────────────────────────────────────────

export type JsonLd = Record<string, unknown>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function itemConditionUrl(condition: Listing["condition"]): string {
	switch (condition) {
		case "New": return "https://schema.org/NewCondition";
		case "Refurbished": return "https://schema.org/RefurbishedCondition";
		case "For parts": return "https://schema.org/DamagedCondition";
		default: return "https://schema.org/UsedCondition";
	}
}

function priceValidUntil(daysFromNow = 7): string {
	return new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000)
		.toISOString()
		.split("T")[0]!;
}

// ─── Generators ───────────────────────────────────────────────────────────────

/**
 * ItemList schema for browse/category pages.
 * Emitted as a single <script type="application/ld+json"> in the <head>.
 */
export function buildItemListSchema(
	page: BrowsePage,
	currency: string,
	limit = 10,
): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: `${page.displayName} on ${page.country}`,
		numberOfItems: page.totalResults,
		itemListElement: page.listings.slice(0, limit).map((listing, i) => ({
			"@type": "ListItem",
			position: i + 1,
			item: {
				"@type": "Product",
				name: listing.title,
				image: listing.imageUrl,
				offers: {
					"@type": "Offer",
					price: listing.price.toFixed(2),
					priceCurrency: currency,
					availability: "https://schema.org/InStock",
					url: listing.affiliateUrl,
				},
			},
		})),
	};
}

/**
 * Product schema for individual listing pages.
 */
export function buildProductSchema(
	listing: Listing,
	currency: string,
): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "Product",
		name: listing.title,
		image: listing.images.length > 0 ? listing.images : [listing.imageUrl],
		offers: {
			"@type": "Offer",
			price: listing.price.toFixed(2),
			priceCurrency: currency,
			availability: "https://schema.org/InStock",
			priceValidUntil: priceValidUntil(7),
			url: listing.affiliateUrl,
			seller: {
				"@type": "Person",
				name: listing.seller.username,
			},
		},
		itemCondition: itemConditionUrl(listing.condition),
	};
}

/**
 * BreadcrumbList schema — pass the same crumbs array you use for the UI.
 */
export interface BreadcrumbItem {
	name: string;
	href?: string; // omit for current/last page
}

export function buildBreadcrumbSchema(crumbs: BreadcrumbItem[]): JsonLd {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: crumbs.map((crumb, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: crumb.name,
			...(crumb.href ? { item: `https://ubuyfirst.com${crumb.href}` } : {}),
		})),
	};
}

/**
 * Combine multiple schemas into an @graph — preferred when emitting
 * multiple types on a single page (e.g. Product + BreadcrumbList).
 */
export function buildSchemaGraph(...schemas: JsonLd[]): JsonLd {
	return {
		"@context": "https://schema.org",
		"@graph": schemas.map(({ "@context": _ctx, ...rest }) => rest),
	};
}