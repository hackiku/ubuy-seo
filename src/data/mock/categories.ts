// src/data/mock/categories.ts

export const COUNTRIES = {
	us: { label: "eBay US", currency: "USD", ebayDomain: "ebay.com" },
	uk: { label: "eBay UK", currency: "GBP", ebayDomain: "ebay.co.uk" },
	de: { label: "eBay DE", currency: "EUR", ebayDomain: "ebay.de" },
	au: { label: "eBay AU", currency: "AUD", ebayDomain: "ebay.com.au" },
} as const;

export type CountryCode = keyof typeof COUNTRIES;

export function getCountry(code: string) {
	return COUNTRIES[code as CountryCode] ?? null;
}