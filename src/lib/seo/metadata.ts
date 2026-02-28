// src/lib/seo/metadata.ts
// generateMetadata helpers — call these in page.tsx files

import type { Metadata } from "next";
import type { Listing, BrowsePage } from "~/data/mock/listings";

const SITE_NAME = "uBuyFirst";
const SITE_URL = "https://ubuyfirst.com";

export function browseMeta(page: BrowsePage, country: string, category: string): Metadata {
	const title = `${page.displayName} on ${page.country} | ${SITE_NAME}`;
	const description = `Browse ${page.totalResults.toLocaleString()} ${page.displayName} listings on ${page.country}. Real-time prices, seller ratings, and instant alerts.`;
	const url = `${SITE_URL}/browse/${country}/${category}`;

	return {
		title,
		description,
		alternates: { canonical: url },
		openGraph: {
			title,
			description,
			url,
			siteName: SITE_NAME,
			type: "website",
		},
	};
}

export function listingMeta(listing: Listing, country: string, category: string): Metadata {
	const total = listing.price + (listing.shipping ?? 0);
	const title = `${listing.title} | ${SITE_NAME}`;
	const description = `${listing.condition} · $${total.toFixed(2)} total · Seller: ${listing.seller.username} (${listing.seller.feedbackPercent}% positive feedback)`;
	const url = `${SITE_URL}/browse/${country}/${category}/${listing.id}`;

	return {
		title,
		description,
		alternates: { canonical: url },
		openGraph: {
			title,
			description,
			url,
			siteName: SITE_NAME,
			type: "website",
			images: listing.imageUrl ? [{ url: listing.imageUrl, alt: listing.title }] : [],
		},
	};
}