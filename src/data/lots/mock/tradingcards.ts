// src/data/lots/mock/tradingcards.ts
// Trading cards — graded / raw value estimation

export interface CardSpec {
	name: string;
	set: string;
	year: number;
	gradeEstimate: string; // "PSA 9", "Raw", etc.
	estimatedValue: number;
	confidence: number;
}

export interface TradingCardLot {
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
	extractedCards: CardSpec[];
	totalEstimatedValue: number;
	marginPercent: number;
	aiConfidenceAvg: number;
	quantity: number;
}

const BASE_AFF = "https://www.ebay.com/itm/{id}?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5339084940&toolid=10001";
const aff = (id: string) => BASE_AFF.replace("{id}", id);

export const MOCK_TRADINGCARD_LOTS: TradingCardLot[] = [
	{
		id: "card-001",
		ebayItemId: "423001234567",
		affiliateUrl: aff("423001234567"),
		title: "Pokemon Lot 150+ Cards - Base Set, Jungle, Fossil - Some Holo",
		askingPrice: 185.0,
		shipping: 9.99,
		imageUrl: "https://i.ebayimg.com/images/g/fgh012/s-l1600.jpg",
		condition: "Used",
		listingType: "BIN",
		postedMinutesAgo: 11,
		seller: { username: "pokemongrader", feedbackScore: 4500, feedbackPercent: 99.5, countryCode: "US" },
		extractedCards: [
			{ name: "Charizard", set: "Base Set", year: 1999, gradeEstimate: "Raw", estimatedValue: 220, confidence: 0.89 },
			{ name: "Blastoise", set: "Base Set", year: 1999, gradeEstimate: "Raw", estimatedValue: 85, confidence: 0.92 },
			{ name: "Venusaur", set: "Base Set", year: 1999, gradeEstimate: "Raw", estimatedValue: 70, confidence: 0.87 },
		],
		totalEstimatedValue: 375,
		marginPercent: 103,
		aiConfidenceAvg: 0.893,
		quantity: 150,
	},
	{
		id: "card-002",
		ebayItemId: "423009876543",
		affiliateUrl: aff("423009876543"),
		title: "2023 Topps Chrome Shohei Ohtani Superfractor 1/1 Parallel - PSA 10",
		askingPrice: 12500.0,
		shipping: 35.0,
		imageUrl: "https://i.ebayimg.com/images/g/ijk345/s-l1600.jpg",
		condition: "Graded",
		listingType: "BIN",
		postedMinutesAgo: 3,
		seller: { username: "sportscardvault", feedbackScore: 7800, feedbackPercent: 99.9, countryCode: "US" },
		extractedCards: [
			{ name: "Shohei Ohtani", set: "Topps Chrome", year: 2023, gradeEstimate: "PSA 10", estimatedValue: 18500, confidence: 0.98 },
		],
		totalEstimatedValue: 18500,
		marginPercent: 48,
		aiConfidenceAvg: 0.98,
		quantity: 1,
	},
	{
		id: "card-003",
		ebayItemId: "423005551234",
		affiliateUrl: aff("423005551234"),
		title: "Bulk Lot 500+ Magic: The Gathering Cards - Modern + Vintage Mix",
		askingPrice: 320.0,
		shipping: 14.99,
		imageUrl: "https://i.ebayimg.com/images/g/lmn678/s-l1600.jpg",
		condition: "Used",
		listingType: "Auction",
		postedMinutesAgo: 27,
		bids: 12,
		seller: { username: "mtgcollectiondump", feedbackScore: 2100, feedbackPercent: 98.2, countryCode: "CA" },
		extractedCards: [
			{ name: "Black Lotus", set: "Beta", year: 1993, gradeEstimate: "Raw", estimatedValue: 28000, confidence: 0.65 },
			{ name: "Ancestral Recall", set: "Unlimited", year: 1993, gradeEstimate: "Raw", estimatedValue: 4200, confidence: 0.78 },
		],
		totalEstimatedValue: 32200,
		marginPercent: 9955,
		aiConfidenceAvg: 0.715,
		quantity: 500,
	},
];