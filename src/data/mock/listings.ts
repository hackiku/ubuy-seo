export type ListingType = "BIN" | "Auction" | "BestOffer";
export type Condition = "New" | "Used" | "For parts" | "Refurbished";

export interface Listing {
	id: string;
	title: string;
	price: number;
	shipping: number | null; // null = free
	listingType: ListingType;
	condition: Condition;
	imageUrl: string;
	images: string[];
	location: string;
	countryCode: string;
	seller: {
		username: string;
		feedbackScore: number;
		feedbackPercent: number;
		countryCode: string;
	};
	postedMinutesAgo: number;
	bids?: number;
	endTimeHours?: number;
	ebayItemId: string;
	affiliateUrl: string;
}

export interface BrowsePage {
	country: string;
	category: string;
	displayName: string;
	totalResults: number;
	listings: Listing[];
}

const EBAY_AFFILIATE_BASE =
	"https://www.ebay.com/itm/{id}?mkevt=1&mkcid=1&mkrid=711-53200-19255-0&campid=5339084940&toolid=10001";

function affiliateUrl(id: string) {
	return EBAY_AFFILIATE_BASE.replace("{id}", id);
}

export const MOCK_BROWSE: Record<string, BrowsePage> = {
	"us/vinyl-records": {
		country: "eBay US",
		category: "vinyl-records",
		displayName: "vinyl records",
		totalResults: 12022916,
		listings: [
			{
				id: "188106133741",
				title:
					"Emerson Lake & Palmer Works 1977 2x Vinyl LP K80009 Trifold Sleeve PROCLEANED EX",
				price: 11.2,
				shipping: 24.27,
				listingType: "BIN",
				condition: "Used",
				imageUrl: "https://i.ebayimg.com/images/g/tScAAeSwcRdpowzt/s-l500.webp",
				images: [
					"https://i.ebayimg.com/images/g/tScAAeSwcRdpowzt/s-l500.webp",
					"https://i.ebayimg.com/images/g/vusAAeSwrpBpowz2/s-l225.jpg",
					"https://i.ebayimg.com/images/g/rLQAAeSwwBxpow0B/s-l225.jpg",
					"https://i.ebayimg.com/images/g/wgIAAeSwrr9pow0S/s-l225.jpg",
				],
				location: "ATHERSTONE",
				countryCode: "GB",
				seller: {
					username: "mrspie34",
					feedbackScore: 1500,
					feedbackPercent: 100.0,
					countryCode: "GB",
				},
				postedMinutesAgo: 3,
				ebayItemId: "188106133741",
				affiliateUrl: affiliateUrl("188106133741"),
			},
			{
				id: "266813402211",
				title:
					"Dionne Warwick's Greatest Motion Picture Hits 1969 Scepter Records SPS 575 Y3",
				price: 2.54,
				shipping: 5.99,
				listingType: "BIN",
				condition: "Used",
				imageUrl: "https://i.ebayimg.com/images/g/9nkAAeSw~CBpowzH/s-l500.webp",
				images: [
					"https://i.ebayimg.com/images/g/9nkAAeSw~CBpowzH/s-l500.webp",
				],
				location: "San Diego",
				countryCode: "US",
				seller: {
					username: "amfprez",
					feedbackScore: 170,
					feedbackPercent: 100.0,
					countryCode: "US",
				},
				postedMinutesAgo: 2,
				ebayItemId: "266813402211",
				affiliateUrl: affiliateUrl("266813402211"),
			},
			{
				id: "256789012345",
				title:
					'The Saints "(I\'m) Stranded c/w No Time" 45 Vinyl (1977) PROMO SRE 1005 Australia',
				price: 72.95,
				shipping: 18.5,
				listingType: "BIN",
				condition: "Used",
				imageUrl: "https://i.ebayimg.com/images/g/AZoAAeSw1K5powzy/s-l500.webp",
				images: [
					"https://i.ebayimg.com/images/g/AZoAAeSw1K5powzy/s-l500.webp",
				],
				location: "Lakeland",
				countryCode: "US",
				seller: {
					username: "tacotowntreasures",
					feedbackScore: 3800,
					feedbackPercent: 99.8,
					countryCode: "US",
				},
				postedMinutesAgo: 3,
				ebayItemId: "256789012345",
				affiliateUrl: affiliateUrl("256789012345"),
			},
			{
				id: "334512678901",
				title:
					"1932 RICHARD TAUBER Gräfin COUNTESS MARIZA Komm Zigany Grüß mir mein Wien Odeon",
				price: 14.99,
				shipping: 6.5,
				listingType: "BIN",
				condition: "Used",
				imageUrl: "https://i.ebayimg.com/images/g/zOQAAeSw0BRpowzy/s-l500.webp",
				images: [
					"https://i.ebayimg.com/images/g/zOQAAeSw0BRpowzy/s-l500.webp",
				],
				location: "San Francisco",
				countryCode: "US",
				seller: {
					username: "carsten_sf",
					feedbackScore: 10000,
					feedbackPercent: 100.0,
					countryCode: "US",
				},
				postedMinutesAgo: 4,
				ebayItemId: "334512678901",
				affiliateUrl: affiliateUrl("334512678901"),
			},
			{
				id: "276543210987",
				title: "Melanie Martinez | HADES - Spotify Fans First Picture Disc",
				price: 200.0,
				shipping: null,
				listingType: "BIN",
				condition: "New",
				imageUrl: "https://i.ebayimg.com/images/g/QKEAAeSwLiBpowz9/s-l500.webp",
				images: [
					"https://i.ebayimg.com/images/g/QKEAAeSwLiBpowz9/s-l500.webp",
				],
				location: "Palm Harbor",
				countryCode: "US",
				seller: {
					username: "floridaforeverrecords",
					feedbackScore: 2,
					feedbackPercent: 100.0,
					countryCode: "US",
				},
				postedMinutesAgo: 4,
				ebayItemId: "276543210987",
				affiliateUrl: affiliateUrl("276543210987"),
			},
			{
				id: "387654321098",
				title:
					"Pink Floyd The Wall 2x LP 1979 Columbia PC2 36183 First Pressing Gatefold NM",
				price: 89.0,
				shipping: 12.0,
				listingType: "BIN",
				condition: "Used",
				imageUrl: "https://i.ebayimg.com/images/g/placeholder1/s-l500.webp",
				images: [],
				location: "Austin",
				countryCode: "US",
				seller: {
					username: "vinyl_vault_atx",
					feedbackScore: 4200,
					feedbackPercent: 99.9,
					countryCode: "US",
				},
				postedMinutesAgo: 7,
				ebayItemId: "387654321098",
				affiliateUrl: affiliateUrl("387654321098"),
			},
			{
				id: "412398765432",
				title:
					"Led Zeppelin IV 1971 Atlantic SD 7208 First US Pressing Superhype VG+/VG+",
				price: 0,
				shipping: 9.99,
				listingType: "Auction",
				condition: "Used",
				imageUrl: "https://i.ebayimg.com/images/g/placeholder2/s-l500.webp",
				images: [],
				location: "Chicago",
				countryCode: "US",
				seller: {
					username: "windy_city_wax",
					feedbackScore: 892,
					feedbackPercent: 98.7,
					countryCode: "US",
				},
				postedMinutesAgo: 12,
				bids: 7,
				endTimeHours: 4,
				ebayItemId: "412398765432",
				affiliateUrl: affiliateUrl("412398765432"),
			},
			{
				id: "523109876543",
				title:
					"Miles Davis Kind of Blue 1959 Columbia CL 1355 Six Eye Original MONO VG+",
				price: 145.0,
				shipping: 15.0,
				listingType: "BestOffer",
				condition: "Used",
				imageUrl: "https://i.ebayimg.com/images/g/placeholder3/s-l500.webp",
				images: [],
				location: "Brooklyn",
				countryCode: "US",
				seller: {
					username: "nyc_jazz_records",
					feedbackScore: 7800,
					feedbackPercent: 99.6,
					countryCode: "US",
				},
				postedMinutesAgo: 19,
				ebayItemId: "523109876543",
				affiliateUrl: affiliateUrl("523109876543"),
			},
		],
	},
	"us/iphone": {
		country: "eBay US",
		category: "iphone",
		displayName: "iPhone",
		totalResults: 847293,
		listings: [
			{
				id: "314159265358",
				title: "Apple iPhone 16 Pro Max 256GB Desert Titanium Unlocked A3293 - Excellent",
				price: 1049.0,
				shipping: null,
				listingType: "BIN",
				condition: "Refurbished",
				imageUrl: "https://i.ebayimg.com/images/g/placeholder-iphone1/s-l500.webp",
				images: [],
				location: "Los Angeles",
				countryCode: "US",
				seller: {
					username: "apple_certified_resale",
					feedbackScore: 52000,
					feedbackPercent: 99.8,
					countryCode: "US",
				},
				postedMinutesAgo: 1,
				ebayItemId: "314159265358",
				affiliateUrl: affiliateUrl("314159265358"),
			},
			{
				id: "271828182845",
				title: "Apple iPhone 15 Pro 128GB Black Titanium T-Mobile - Good Condition",
				price: 699.0,
				shipping: null,
				listingType: "BIN",
				condition: "Used",
				imageUrl: "https://i.ebayimg.com/images/g/placeholder-iphone2/s-l500.webp",
				images: [],
				location: "Seattle",
				countryCode: "US",
				seller: {
					username: "pacnw_phones",
					feedbackScore: 1240,
					feedbackPercent: 99.2,
					countryCode: "US",
				},
				postedMinutesAgo: 5,
				ebayItemId: "271828182845",
				affiliateUrl: affiliateUrl("271828182845"),
			},
		],
	},
};

export function getMockBrowse(country: string, category: string): BrowsePage | null {
	return MOCK_BROWSE[`${country}/${category}`] ?? null;
}

export function getMockListing(id: string): Listing | null {
	for (const page of Object.values(MOCK_BROWSE)) {
		const found = page.listings.find((l) => l.id === id);
		if (found) return found;
	}
	return null;
}