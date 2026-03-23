// src/lib/lots/toGenericLot.ts
// Pure data transformation — no React, no "use client".
// Imported by the server page to normalize mock data,
// and re-exported from GenericLotCard for convenience.

export interface GenericExtractedItem {
	label: string;
	sublabel?: string;
	value: number;
	confidence: number;
	meta?: string;
}

export interface GenericLot {
	id: string;
	affiliateUrl: string;
	title: string;
	askingPrice: number;
	shipping: number | null;
	condition: string;
	listingType: "BIN" | "Auction" | "BestOffer";
	postedMinutesAgo: number;
	bids?: number;
	seller: {
		username: string;
		feedbackScore: number;
		feedbackPercent: number;
	};
	extractedItems: GenericExtractedItem[];
	totalEstimatedValue: number;
	marginPercent: number;
	aiConfidenceAvg: number;
	quantity?: number;
	extractedLabel?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toGenericLot(raw: any, category: string): GenericLot {
	const base = {
		id: raw.id,
		affiliateUrl: raw.affiliateUrl,
		title: raw.title,
		askingPrice: raw.askingPrice,
		shipping: raw.shipping,
		condition: raw.condition,
		listingType: raw.listingType,
		postedMinutesAgo: raw.postedMinutesAgo,
		bids: raw.bids,
		seller: raw.seller,
		totalEstimatedValue: raw.totalEstimatedValue,
		marginPercent: raw.marginPercent,
		aiConfidenceAvg: raw.aiConfidenceAvg,
		quantity: raw.quantity,
	};

	switch (category) {
		case "videogames":
			return { ...base, extractedLabel: "Extracted Titles", extractedItems: (raw.extractedTitles ?? []).map((t: any) => ({ label: t.title, sublabel: t.platform, value: t.estimatedValue, confidence: t.confidence })) };
		case "ram":
			return { ...base, extractedLabel: "Part Numbers", extractedItems: (raw.extractedSpecs ?? []).map((s: any) => ({ label: s.partNumber, sublabel: `${s.brand} ${s.type} ${s.capacity}`, value: s.marketPrice, confidence: s.confidence, meta: s.formFactor })) };
		case "handbags":
			return { ...base, extractedLabel: "Identified Bags", extractedItems: (raw.extractedBags ?? []).map((b: any) => ({ label: `${b.brand} ${b.model}`, sublabel: b.color, value: b.estimatedResaleValue, confidence: b.confidence, meta: b.yearEstimate })) };
		case "watches":
			return { ...base, extractedLabel: "Identified Watches", extractedItems: (raw.extractedWatches ?? []).map((w: any) => ({ label: `${w.brand} ${w.model}`, sublabel: w.reference, value: w.estimatedValue, confidence: w.confidence })) };
		case "tradingcards":
			return { ...base, extractedLabel: "Identified Cards", extractedItems: (raw.extractedCards ?? []).map((c: any) => ({ label: c.name, sublabel: `${c.set} ${c.year}`, value: c.estimatedValue, confidence: c.confidence, meta: c.gradeEstimate })) };
		case "plcs":
			return { ...base, extractedLabel: "Extracted Parts", extractedItems: (raw.extractedPlcs ?? []).map((p: any) => ({ label: p.partNumber, sublabel: `${p.brand} — ${p.description}`, value: p.estimatedMarketValue, confidence: p.confidence })) };
		case "smartphones":
			return { ...base, extractedLabel: "Identified Devices", extractedItems: (raw.extractedDevices ?? []).map((d: any) => ({ label: d.model, sublabel: d.carrier ?? d.condition, value: d.buybackValue ?? d.marketPrice ?? 0, confidence: d.confidence })) };
		default: {
			const extractedKey = Object.keys(raw).find((k) => k.startsWith("extracted"));
			const items = extractedKey ? (raw[extractedKey] ?? []) : [];
			return { ...base, extractedLabel: "Extracted Items", extractedItems: items.map((i: any) => ({ label: i.title ?? i.partNumber ?? i.model ?? i.name ?? "Item", sublabel: i.platform ?? i.brand ?? i.set ?? "", value: i.estimatedValue ?? i.marketPrice ?? i.estimatedResaleValue ?? 0, confidence: i.confidence ?? 0 })) };
		}
	}
}