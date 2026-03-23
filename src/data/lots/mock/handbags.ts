// src/data/lots/mock/handbags.ts
// Luxury handbags — resale value from comps (Rebag, Vestiaire, etc.)

export interface HandbagSpec {
	brand: string;
	model: string;
	color: string;
	yearEstimate: string;
	estimatedResaleValue: number;
	confidence: number;
}

export interface HandbagLot {
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
	extractedBags: HandbagSpec[];
	totalEstimatedValue: number;
	marginPercent: number;
	aiConfidenceAvg: number;
	quantity: number;
}

const BASE_AFF = "https://www.ebay.com/itm/{id}?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5339084940&toolid=10001";
const aff = (id: string) => BASE_AFF.replace("{id}", id);

export const MOCK_HANDBAG_LOTS: HandbagLot[] = [
	{
		id: "bag-001",
		ebayItemId: "405001234567",
		affiliateUrl: aff("405001234567"),
		title: "Louis Vuitton Neverfull MM Monogram + Gucci Dionysus Mini Lot",
		askingPrice: 920.0,
		shipping: 15.0,
		imageUrl: "https://i.ebayimg.com/images/g/mno345/s-l1600.jpg",
		condition: "Pre-owned",
		listingType: "BIN",
		postedMinutesAgo: 12,
		seller: { username: "luxuryresale_nyc", feedbackScore: 6700, feedbackPercent: 99.7, countryCode: "US" },
		extractedBags: [
			{ brand: "Louis Vuitton", model: "Neverfull MM", color: "Monogram", yearEstimate: "2021–2023", estimatedResaleValue: 680, confidence: 0.96 },
			{ brand: "Gucci", model: "Dionysus Mini", color: "Black", yearEstimate: "2022", estimatedResaleValue: 520, confidence: 0.89 },
		],
		totalEstimatedValue: 1200,
		marginPercent: 30,
		aiConfidenceAvg: 0.925,
		quantity: 2,
	},
	{
		id: "bag-002",
		ebayItemId: "405009876543",
		affiliateUrl: aff("405009876543"),
		title: "Chanel Classic Flap Medium Caviar Black - Authenticated",
		askingPrice: 4200.0,
		shipping: 29.99,
		imageUrl: "https://i.ebayimg.com/images/g/pqr678/s-l1600.jpg",
		condition: "Very Good",
		listingType: "BestOffer",
		postedMinutesAgo: 8,
		seller: { username: "authenticluxuryco", feedbackScore: 9800, feedbackPercent: 99.9, countryCode: "US" },
		extractedBags: [
			{ brand: "Chanel", model: "Classic Flap Medium", color: "Black Caviar", yearEstimate: "2019–2022", estimatedResaleValue: 6200, confidence: 0.98 },
		],
		totalEstimatedValue: 6200,
		marginPercent: 48,
		aiConfidenceAvg: 0.98,
		quantity: 1,
	},
	{
		id: "bag-003",
		ebayItemId: "405005551234",
		affiliateUrl: aff("405005551234"),
		title: "Lot of 4 Designer Bags - Hermes, Prada, Dior, Fendi (Mixed Auth)",
		askingPrice: 1450.0,
		shipping: 22.0,
		imageUrl: "https://i.ebayimg.com/images/g/stu901/s-l1600.jpg",
		condition: "Pre-owned",
		listingType: "Auction",
		postedMinutesAgo: 19,
		bids: 5,
		seller: { username: "designerclosetout", feedbackScore: 3400, feedbackPercent: 98.5, countryCode: "US" },
		extractedBags: [
			{ brand: "Hermes", model: "Kelly 28", color: "Etoupe", yearEstimate: "2018", estimatedResaleValue: 9500, confidence: 0.82 },
			{ brand: "Prada", model: "Galleria", color: "Black", yearEstimate: "2020", estimatedResaleValue: 780, confidence: 0.91 },
			{ brand: "Dior", model: "Saddle", color: "Oblique", yearEstimate: "2021", estimatedResaleValue: 1450, confidence: 0.87 },
		],
		totalEstimatedValue: 11730,
		marginPercent: 709,
		aiConfidenceAvg: 0.867,
		quantity: 3,
	},
];