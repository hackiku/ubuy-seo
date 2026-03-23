// src/data/lots/mock/smartphones.ts
// Used/refurbished phones — model + condition based buyback

export interface PhoneSpec {
	model: string;
	storage: string;
	carrier: string;
	condition: string;      // "Unlocked", "Fair", "Good", "Excellent"
	buybackValue: number;
	confidence: number;
}

export interface SmartphoneLot {
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
	extractedPhones: PhoneSpec[];
	totalEstimatedValue: number;
	marginPercent: number;
	aiConfidenceAvg: number;
	quantity: number;
}

const BASE_AFF = "https://www.ebay.com/itm/{id}?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5339084940&toolid=10001";
const aff = (id: string) => BASE_AFF.replace("{id}", id);

export const MOCK_SMARTPHONE_LOTS: SmartphoneLot[] = [
	{
		id: "phone-001",
		ebayItemId: "432001234567",
		affiliateUrl: aff("432001234567"),
		title: "Lot of 29 Samsung Galaxy Phones - Various Models & Conditions",
		askingPrice: 1995.0,
		shipping: 89.0,
		imageUrl: "https://i.ebayimg.com/images/g/opq901/s-l1600.jpg",
		condition: "Used",
		listingType: "BIN",
		postedMinutesAgo: 5,
		seller: { username: "bulkphonedeals", feedbackScore: 14500, feedbackPercent: 99.6, countryCode: "US" },
		extractedPhones: [
			{ model: "Galaxy S23", storage: "128GB", carrier: "Unlocked", condition: "Good", buybackValue: 320, confidence: 0.94 },
			{ model: "Galaxy A54", storage: "128GB", carrier: "Unlocked", condition: "Fair", buybackValue: 140, confidence: 0.88 },
			{ model: "Galaxy S22", storage: "256GB", carrier: "Unlocked", condition: "Excellent", buybackValue: 280, confidence: 0.96 },
		],
		totalEstimatedValue: 7400, // approx for 29 phones
		marginPercent: 271,
		aiConfidenceAvg: 0.927,
		quantity: 29,
	},
	{
		id: "phone-002",
		ebayItemId: "432009876543",
		affiliateUrl: aff("432009876543"),
		title: "50x iPhone 11 64GB - Mixed Conditions - For Parts / Repair",
		askingPrice: 2450.0,
		shipping: 120.0,
		imageUrl: "https://i.ebayimg.com/images/g/rst234/s-l1600.jpg",
		condition: "For parts or not working",
		listingType: "Auction",
		postedMinutesAgo: 18,
		bids: 14,
		seller: { username: "iphonebulkliquidation", feedbackScore: 8900, feedbackPercent: 99.3, countryCode: "US" },
		extractedPhones: Array(50).fill({
			model: "iPhone 11",
			storage: "64GB",
			carrier: "Unlocked",
			condition: "Fair/Parts",
			buybackValue: 95,
			confidence: 0.91,
		}),
		totalEstimatedValue: 4750,
		marginPercent: 94,
		aiConfidenceAvg: 0.91,
		quantity: 50,
	},
	{
		id: "phone-003",
		ebayItemId: "432005551234",
		affiliateUrl: aff("432005551234"),
		title: "10x Google Pixel 7 Pro 128GB - Unlocked - Excellent Condition",
		askingPrice: 2850.0,
		shipping: 38.0,
		imageUrl: "https://i.ebayimg.com/images/g/uvw567/s-l1600.jpg",
		condition: "Excellent - Refurbished",
		listingType: "BIN",
		postedMinutesAgo: 7,
		seller: { username: "pixelresellers", feedbackScore: 6200, feedbackPercent: 99.8, countryCode: "US" },
		extractedPhones: Array(10).fill({
			model: "Pixel 7 Pro",
			storage: "128GB",
			carrier: "Unlocked",
			condition: "Excellent",
			buybackValue: 380,
			confidence: 0.96,
		}),
		totalEstimatedValue: 3800,
		marginPercent: 33,
		aiConfidenceAvg: 0.96,
		quantity: 10,
	},
];