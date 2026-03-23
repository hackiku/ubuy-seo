// src/data/lots/mock/watches.ts
// Luxury watches — model + ref based valuation

export interface WatchSpec {
	brand: string;
	model: string;
	reference: string;
	estimatedValue: number;
	confidence: number;
}

export interface WatchLot {
	id: string;
	ebayItemId: string;
	affiliateUrl: string;
	title: string;
	askingPrice: number;
	shipping: number | null;
	imageUrl: string;
	condition: string;
	listingType: "BIN" | "Auction" | "BestOffer";
	postedMinutesAgo: number;
	bids?: number;
	seller: {
		username: string;
		feedbackScore: number;
		feedbackPercent: number;
		countryCode: string;
	};
	extractedWatches: WatchSpec[];
	totalEstimatedValue: number;
	marginPercent: number;
	aiConfidenceAvg: number;
	quantity: number;
}

const BASE_AFF = "https://www.ebay.com/itm/{id}?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5339084940&toolid=10001";
const aff = (id: string) => BASE_AFF.replace("{id}", id);

export const MOCK_WATCH_LOTS: WatchLot[] = [
	{
		id: "watch-001",
		ebayItemId: "414001234567",
		affiliateUrl: aff("414001234567"),
		title: "Rolex Submariner Date 116610LN - Full Set 2018",
		askingPrice: 10500.0,
		shipping: 45.0,
		imageUrl: "https://i.ebayimg.com/images/g/vwx234/s-l1600.jpg",
		condition: "Pre-owned",
		listingType: "BIN",
		postedMinutesAgo: 6,
		seller: { username: "watchoutletpro", feedbackScore: 11200, feedbackPercent: 99.8, countryCode: "US" },
		extractedWatches: [
			{ brand: "Rolex", model: "Submariner Date", reference: "116610LN", estimatedValue: 13800, confidence: 0.97 },
		],
		totalEstimatedValue: 13800,
		marginPercent: 31,
		aiConfidenceAvg: 0.97,
		quantity: 1,
	},
	{
		id: "watch-002",
		ebayItemId: "414009876543",
		affiliateUrl: aff("414009876543"),
		title: "Lot of 3 Omega Speedmaster Professional Moonwatch - Hesalite",
		askingPrice: 4200.0,
		shipping: null,
		imageUrl: "https://i.ebayimg.com/images/g/yzab56/s-l1600.jpg",
		condition: "Used",
		listingType: "Auction",
		postedMinutesAgo: 14,
		bids: 9,
		seller: { username: "vintagetimepieces", feedbackScore: 5600, feedbackPercent: 99.4, countryCode: "GB" },
		extractedWatches: Array(3).fill({
			brand: "Omega",
			model: "Speedmaster Professional",
			reference: "311.30.42.30.01.005",
			estimatedValue: 5200,
			confidence: 0.93,
		}),
		totalEstimatedValue: 15600,
		marginPercent: 271,
		aiConfidenceAvg: 0.93,
		quantity: 3,
	},
	{
		id: "watch-003",
		ebayItemId: "414005551234",
		affiliateUrl: aff("414005551234"),
		title: "Cartier Tank Must Large WSTA0042 - Box & Papers",
		askingPrice: 3200.0,
		shipping: 28.0,
		imageUrl: "https://i.ebayimg.com/images/g/cde789/s-l1600.jpg",
		condition: "Excellent",
		listingType: "BIN",
		postedMinutesAgo: 22,
		seller: { username: "luxurywatchdepot", feedbackScore: 8900, feedbackPercent: 99.7, countryCode: "US" },
		extractedWatches: [
			{ brand: "Cartier", model: "Tank Must", reference: "WSTA0042", estimatedValue: 4200, confidence: 0.95 },
		],
		totalEstimatedValue: 4200,
		marginPercent: 31,
		aiConfidenceAvg: 0.95,
		quantity: 1,
	},
];