// src/data/lots/mock/ram.ts
// Server RAM / Memory — commodity matching pattern.
// Shape: part number extracted → matched against market pricing → margin calc.

export interface RamSpec {
	partNumber: string;
	brand: string;
	type: "DDR3" | "DDR4" | "DDR5";
	capacity: string;   // e.g. "32GB", "128GB"
	speed: string;      // e.g. "2400MHz", "3200MHz"
	formFactor: "DIMM" | "SO-DIMM" | "RDIMM" | "LRDIMM";
	ecc: boolean;
	marketPrice: number;  // USD, from commodity pricing feed
	confidence: number;   // 0–1, part# extraction confidence
}

export interface RamListing {
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
	// AI-extracted payload
	extractedSpecs: RamSpec[];
	totalMarketValue: number;   // sum of extractedSpecs.marketPrice
	marginPercent: number;
	aiConfidenceAvg: number;
	quantity: number;           // total sticks in listing
}

const BASE_AFF = "https://www.ebay.com/itm/{id}?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5339084940&toolid=10001";
const aff = (id: string) => BASE_AFF.replace("{id}", id);

export const MOCK_RAM_LISTINGS: RamListing[] = [
	{
		id: "ram-001",
		ebayItemId: "354001112233",
		affiliateUrl: aff("354001112233"),
		title: "LOT 8x Samsung 32GB DDR4 2400MHz ECC RDIMM M393A4K40BB1-CRC Server RAM",
		askingPrice: 180.0,
		shipping: null,
		imageUrl: "",
		condition: "Used",
		listingType: "BIN",
		postedMinutesAgo: 6,
		seller: {
			username: "enterprise_surplus_dc",
			feedbackScore: 8900,
			feedbackPercent: 99.6,
			countryCode: "US",
		},
		quantity: 8,
		extractedSpecs: [
			{
				partNumber: "M393A4K40BB1-CRC",
				brand: "Samsung",
				type: "DDR4",
				capacity: "32GB",
				speed: "2400MHz",
				formFactor: "RDIMM",
				ecc: true,
				marketPrice: 48,
				confidence: 0.97,
			},
		],
		totalMarketValue: 384,   // 8 × $48
		marginPercent: 113,
		aiConfidenceAvg: 0.97,
	},
	{
		id: "ram-002",
		ebayItemId: "354009988776",
		affiliateUrl: aff("354009988776"),
		title: "Mixed Server Memory Lot — 16x Sticks DDR4 ECC Various Brands 16GB/32GB",
		askingPrice: 95.0,
		shipping: 12.0,
		imageUrl: "",
		condition: "Used",
		listingType: "Auction",
		postedMinutesAgo: 22,
		bids: 4,
		seller: {
			username: "midwest_datacenter",
			feedbackScore: 1240,
			feedbackPercent: 98.8,
			countryCode: "US",
		},
		quantity: 16,
		extractedSpecs: [
			{
				partNumber: "HMA82GR7AFR8N-UH",
				brand: "Hynix",
				type: "DDR4",
				capacity: "16GB",
				speed: "2400MHz",
				formFactor: "RDIMM",
				ecc: true,
				marketPrice: 22,
				confidence: 0.91,
			},
			{
				partNumber: "M393A4K40CB2-CTD",
				brand: "Samsung",
				type: "DDR4",
				capacity: "32GB",
				speed: "2666MHz",
				formFactor: "RDIMM",
				ecc: true,
				marketPrice: 52,
				confidence: 0.88,
			},
		],
		totalMarketValue: 264,   // rough: 8×22 + 8×52 / 2 mixed
		marginPercent: 148,
		aiConfidenceAvg: 0.895,
	},
	{
		id: "ram-003",
		ebayItemId: "354005544332",
		affiliateUrl: aff("354005544332"),
		title: "Kingston 64GB DDR4 2133MHz ECC LRDIMM KVR21L15Q4/64 — Tested Working",
		askingPrice: 65.0,
		shipping: 8.0,
		imageUrl: "",
		condition: "Refurbished",
		listingType: "BIN",
		postedMinutesAgo: 14,
		seller: {
			username: "kathy_it_resale",
			feedbackScore: 3100,
			feedbackPercent: 99.9,
			countryCode: "US",
		},
		quantity: 1,
		extractedSpecs: [
			{
				partNumber: "KVR21L15Q4/64",
				brand: "Kingston",
				type: "DDR4",
				capacity: "64GB",
				speed: "2133MHz",
				formFactor: "LRDIMM",
				ecc: true,
				marketPrice: 110,
				confidence: 0.95,
			},
		],
		totalMarketValue: 110,
		marginPercent: 50,
		aiConfidenceAvg: 0.95,
	},
	{
		id: "ram-004",
		ebayItemId: "354003321109",
		affiliateUrl: aff("354003321109"),
		title: "4x Micron 32GB DDR5 4800MHz ECC RDIMM MTC20C2085S1RC48BA1 — Pull from Dell R760",
		askingPrice: 320.0,
		shipping: null,
		imageUrl: "",
		condition: "Used",
		listingType: "BestOffer",
		postedMinutesAgo: 3,
		seller: {
			username: "server_parts_nyc",
			feedbackScore: 5600,
			feedbackPercent: 99.5,
			countryCode: "US",
		},
		quantity: 4,
		extractedSpecs: [
			{
				partNumber: "MTC20C2085S1RC48BA1",
				brand: "Micron",
				type: "DDR5",
				capacity: "32GB",
				speed: "4800MHz",
				formFactor: "RDIMM",
				ecc: true,
				marketPrice: 95,
				confidence: 0.93,
			},
		],
		totalMarketValue: 380,   // 4 × $95
		marginPercent: 19,
		aiConfidenceAvg: 0.93,
	},
];