// src/lib/seo/sitemap.ts
// Sitemap entry builders — wire these into app/sitemap.ts when you scale

export interface SitemapEntry {
	url: string;
	lastModified?: Date;
	changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
	priority?: number;
}

const SITE_URL = "https://ubuyfirst.com";

/** Category/browse pages — daily refresh, high priority */
export function browseSitemapEntry(country: string, category: string): SitemapEntry {
	return {
		url: `${SITE_URL}/browse/${country}/${category}`,
		lastModified: new Date(),
		changeFrequency: "daily",
		priority: 0.8,
	};
}

/** Individual listing pages — hourly (listings go stale fast) */
export function listingSitemapEntry(country: string, category: string, id: string): SitemapEntry {
	return {
		url: `${SITE_URL}/browse/${country}/${category}/${id}`,
		lastModified: new Date(),
		changeFrequency: "hourly",
		priority: 0.6,
	};
}

/** Marketing pages — weekly, lower crawl priority */
export function marketingSitemapEntry(slug: string): SitemapEntry {
	return {
		url: `${SITE_URL}/${slug}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 0.5,
	};
}