// src/data/lots/mock/plcs.ts
// Industrial PLCs / automation — part number + surplus value

export interface PlcSpec {
	brand: string;
	partNumber: string;
	description: string;
	estimatedMarketValue: number;
	confidence: number;
}

export interface PlcLot {
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
	extractedPlcs: PlcSpec[];
	totalEstimatedValue: number;
	marginPercent: number;
	aiConfidenceAvg: number;
	quantity: number;
}

const BASE_AFF = "https://www.ebay.com/itm/{id}?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5339084940&toolid=10001";
const aff = (id: string) => BASE_AFF.replace("{id}", id);

export const MOCK_PLC_LOTS: PlcLot[] = [
	{
		id: "plc-001",
		ebayItemId: "441001234567",
		affiliateUrl: aff("441001234567"),
		title: "Lot of 6 Allen-Bradley PLC-5 Processors - 1785-L40B / L60B",
		askingPrice: 1710.0,
		shipping: 65.0,
		imageUrl: "https://i.ebayimg.com/images/g/xyz890/s-l1600.jpg",
		condition: "Used - Tested",
		listingType: "BIN",
		postedMinutesAgo: 8,
		seller: { username: "industrial_surplus_co", feedbackScore: 9800, feedbackPercent: 99.7, countryCode: "US" },
		extractedPlcs: [
			{ brand: "Allen-Bradley", partNumber: "1785-L40B", description: "PLC-5 Processor", estimatedMarketValue: 420, confidence: 0.96 },
			{ brand: "Allen-Bradley", partNumber: "1785-L60B", description: "PLC-5 Processor", estimatedMarketValue: 480, confidence: 0.94 },
		],
		totalEstimatedValue: 2520,
		marginPercent: 47,
		aiConfidenceAvg: 0.95,
		quantity: 6,
	},
	{
		id: "plc-002",
		ebayItemId: "441009876543",
		affiliateUrl: aff("441009876543"),
		title: "Siemens S7-300 Lot - 6ES7 315-2AH14-0AB0 + Modules",
		askingPrice: 980.0,
		shipping: 42.0,
		imageUrl: "https://i.ebayimg.com/images/g/abc123/s-l1600.jpg",
		condition: "Used - Working",
		listingType: "BestOffer",
		postedMinutesAgo: 15,
		seller: { username: "automationresale", feedbackScore: 4500, feedbackPercent: 99.4, countryCode: "DE" },
		extractedPlcs: [
			{ brand: "Siemens", partNumber: "6ES7315-2AH14-0AB0", description: "CPU 315-2DP", estimatedMarketValue: 650, confidence: 0.95 },
			{ brand: "Siemens", partNumber: "6ES7321-1BL00-0AA0", description: "Digital Input Module", estimatedMarketValue: 180, confidence: 0.92 },
		],
		totalEstimatedValue: 830,
		marginPercent: -15, // under spot example
		aiConfidenceAvg: 0.935,
		quantity: 8,
	},
	{
		id: "plc-003",
		ebayItemId: "441005551234",
		affiliateUrl: aff("441005551234"),
		title: "Allen-Bradley CompactLogix 1769-L33ER + I/O Modules Lot",
		askingPrice: 1450.0,
		shipping: 55.0,
		imageUrl: "https://i.ebayimg.com/images/g/def456/s-l1600.jpg",
		condition: "Refurbished",
		listingType: "BIN",
		postedMinutesAgo: 4,
		seller: { username: "plcsurplusdepot", feedbackScore: 7200, feedbackPercent: 99.8, countryCode: "US" },
		extractedPlcs: [
			{ brand: "Allen-Bradley", partNumber: "1769-L33ER", description: "CompactLogix 5370", estimatedMarketValue: 1850, confidence: 0.97 },
			{ brand: "Allen-Bradley", partNumber: "1769-OB16", description: "Digital Output Module", estimatedMarketValue: 220, confidence: 0.93 },
		],
		totalEstimatedValue: 2070,
		marginPercent: 43,
		aiConfidenceAvg: 0.95,
		quantity: 5,
	},
];