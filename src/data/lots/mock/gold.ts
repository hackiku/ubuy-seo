// src/data/lots/mock/gold.ts
// Gold / Precious Metals — spot + premium based valuation

export interface GoldItem {
	type: string;           // e.g. "American Eagle", "Krugerrand"
	weightOz: number;
	purity: string;         // "9999", "916", etc.
	spotValue: number;      // current spot price per oz
	premium: number;        // USD over spot
	estimatedValue: number; // spotValue * weightOz + premium
	confidence: number;
}

export interface GoldLot {
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
	extractedItems: GoldItem[];
	totalEstimatedValue: number;
	marginPercent: number;
	aiConfidenceAvg: number;
	quantity: number;
}

const BASE_AFF = "https://www.ebay.com/itm/{id}?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5339084940&toolid=10001";
const aff = (id: string) => BASE_AFF.replace("{id}", id);

export const MOCK_GOLD_LOTS: GoldLot[] = [
	{
		id: "gold-001",
		ebayItemId: "396001234567",
		affiliateUrl: aff("396001234567"),
		title: "Lot of 5x 2024-2025 American Gold Eagle 1 oz BU - Random Year",
		askingPrice: 2850.0,
		shipping: 18.95,
		imageUrl: "https://i.ebayimg.com/images/g/abc123/s-l1600.jpg",
		condition: "New",
		listingType: "BIN",
		postedMinutesAgo: 9,
		seller: { username: "bullion_depot_usa", feedbackScore: 15400, feedbackPercent: 99.8, countryCode: "US" },
		extractedItems: Array(5).fill({
			type: "American Eagle",
			weightOz: 1,
			purity: "9999",
			spotValue: 2650,
			premium: 212,
			estimatedValue: 2862,
			confidence: 0.98,
		}),
		totalEstimatedValue: 14310,
		marginPercent: 402,
		aiConfidenceAvg: 0.98,
		quantity: 5,
	},
	{
		id: "gold-002",
		ebayItemId: "396009876543",
		affiliateUrl: aff("396009876543"),
		title: "10x South African Krugerrand 1 oz Gold Coins - Mixed Years",
		askingPrice: 26900.0,
		shipping: null,
		imageUrl: "https://i.ebayimg.com/images/g/def456/s-l1600.jpg",
		condition: "Used",
		listingType: "Auction",
		postedMinutesAgo: 17,
		bids: 7,
		seller: { username: "preciousmetalsintl", feedbackScore: 8900, feedbackPercent: 99.6, countryCode: "US" },
		extractedItems: Array(10).fill({
			type: "Krugerrand",
			weightOz: 1,
			purity: "916",
			spotValue: 2650,
			premium: 53,
			estimatedValue: 2703,
			confidence: 0.95,
		}),
		totalEstimatedValue: 27030,
		marginPercent: 0.5,
		aiConfidenceAvg: 0.95,
		quantity: 10,
	},
	{
		id: "gold-003",
		ebayItemId: "396005551234",
		affiliateUrl: aff("396005551234"),
		title: "3x 2025 Canadian Maple Leaf 1 oz Gold - Brilliant Uncirculated",
		askingPrice: 7950.0,
		shipping: 24.99,
		imageUrl: "https://i.ebayimg.com/images/g/ghi789/s-l1600.jpg",
		condition: "New",
		listingType: "BIN",
		postedMinutesAgo: 4,
		seller: { username: "canadianbullionco", feedbackScore: 3200, feedbackPercent: 99.9, countryCode: "CA" },
		extractedItems: Array(3).fill({
			type: "Maple Leaf",
			weightOz: 1,
			purity: "9999",
			spotValue: 2650,
			premium: 132,
			estimatedValue: 2782,
			confidence: 0.97,
		}),
		totalEstimatedValue: 8346,
		marginPercent: 5,
		aiConfidenceAvg: 0.97,
		quantity: 3,
	},
	{
		id: "gold-004",
		ebayItemId: "396007654321",
		affiliateUrl: aff("396007654321"),
		title: "Lot 20x 1/10 oz American Gold Eagle Coins - Random Years",
		askingPrice: 2850.0,
		shipping: 14.99,
		imageUrl: "https://i.ebayimg.com/images/g/jkl012/s-l1600.jpg",
		condition: "Used",
		listingType: "BestOffer",
		postedMinutesAgo: 31,
		seller: { username: "goldstackerpro", feedbackScore: 12400, feedbackPercent: 99.7, countryCode: "US" },
		extractedItems: Array(20).fill({
			type: "American Eagle",
			weightOz: 0.1,
			purity: "9999",
			spotValue: 265,
			premium: 28,
			estimatedValue: 293,
			confidence: 0.94,
		}),
		totalEstimatedValue: 5860,
		marginPercent: 105,
		aiConfidenceAvg: 0.94,
		quantity: 20,
	},
];