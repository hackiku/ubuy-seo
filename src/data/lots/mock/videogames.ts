// src/data/catalog/mock/videogames.ts
// Mock lot listings for the video games catalog page.
// Shape mirrors what the real AI pipeline will produce.

export interface GameTitle {
	title: string;
	platform: string;
	estimatedValue: number; // USD, from PriceCharting buyback
	confidence: number;     // 0–1, AI extraction confidence
}

export interface VideoGameLot {
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
	extractedTitles: GameTitle[];
	totalEstimatedValue: number;   // sum of extractedTitles values
	marginPercent: number;         // (totalEstimatedValue - askingPrice) / askingPrice * 100
	aiConfidenceAvg: number;       // average confidence across titles
}

const BASE_AFF = "https://www.ebay.com/itm/{id}?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5339084940&toolid=10001";
const aff = (id: string) => BASE_AFF.replace("{id}", id);

export const MOCK_VIDEOGAME_LOTS: VideoGameLot[] = [
	{
		id: "lot-001",
		ebayItemId: "387001234567",
		affiliateUrl: aff("387001234567"),
		title: "Lot of 22 Mixed PS1 PS2 Games — Final Fantasy, Crash, Tony Hawk + More",
		askingPrice: 38.0,
		shipping: 12.0,
		imageUrl: "https://i.ebayimg.com/images/g/placeholder-games1/s-l500.webp",
		condition: "Used",
		listingType: "BIN",
		postedMinutesAgo: 4,
		seller: {
			username: "gameflip_warehouse",
			feedbackScore: 4200,
			feedbackPercent: 99.4,
			countryCode: "US",
		},
		extractedTitles: [
			{ title: "Final Fantasy VII", platform: "PS1", estimatedValue: 28, confidence: 0.97 },
			{ title: "Crash Bandicoot 2", platform: "PS1", estimatedValue: 14, confidence: 0.93 },
			{ title: "Tony Hawk Pro Skater 3", platform: "PS2", estimatedValue: 8, confidence: 0.88 },
			{ title: "Kingdom Hearts", platform: "PS2", estimatedValue: 12, confidence: 0.91 },
			{ title: "Gran Turismo 3", platform: "PS2", estimatedValue: 6, confidence: 0.85 },
		],
		totalEstimatedValue: 112,
		marginPercent: 194,
		aiConfidenceAvg: 0.91,
	},
	{
		id: "lot-002",
		ebayItemId: "387009876543",
		affiliateUrl: aff("387009876543"),
		title: "Nintendo Estate Lot 18 Games SNES N64 Gameboy — Untested",
		askingPrice: 95.0,
		shipping: null,
		imageUrl: "https://i.ebayimg.com/images/g/placeholder-games2/s-l500.webp",
		condition: "Used",
		listingType: "Auction",
		postedMinutesAgo: 11,
		bids: 3,
		seller: {
			username: "midwest_estate_finds",
			feedbackScore: 870,
			feedbackPercent: 98.9,
			countryCode: "US",
		},
		extractedTitles: [
			{ title: "Super Mario World", platform: "SNES", estimatedValue: 22, confidence: 0.95 },
			{ title: "The Legend of Zelda: Ocarina of Time", platform: "N64", estimatedValue: 35, confidence: 0.92 },
			{ title: "Donkey Kong Country", platform: "SNES", estimatedValue: 18, confidence: 0.89 },
			{ title: "Pokemon Red", platform: "Gameboy", estimatedValue: 42, confidence: 0.82 },
		],
		totalEstimatedValue: 198,
		marginPercent: 108,
		aiConfidenceAvg: 0.895,
	},
	{
		id: "lot-003",
		ebayItemId: "387005551234",
		affiliateUrl: aff("387005551234"),
		title: "30x Xbox 360 Games Lot — Call of Duty, Halo, GTA, Sports Titles",
		askingPrice: 55.0,
		shipping: 18.0,
		imageUrl: "https://i.ebayimg.com/images/g/placeholder-games3/s-l500.webp",
		condition: "Used",
		listingType: "BIN",
		postedMinutesAgo: 7,
		seller: {
			username: "tech_resale_pro",
			feedbackScore: 12400,
			feedbackPercent: 99.7,
			countryCode: "US",
		},
		extractedTitles: [
			{ title: "Halo 3", platform: "Xbox 360", estimatedValue: 8, confidence: 0.96 },
			{ title: "GTA V", platform: "Xbox 360", estimatedValue: 10, confidence: 0.94 },
			{ title: "Call of Duty: Black Ops", platform: "Xbox 360", estimatedValue: 6, confidence: 0.9 },
			{ title: "Red Dead Redemption", platform: "Xbox 360", estimatedValue: 14, confidence: 0.88 },
		],
		totalEstimatedValue: 89,
		marginPercent: 21,
		aiConfidenceAvg: 0.92,
	},
];