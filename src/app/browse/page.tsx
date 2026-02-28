// src/app/browse/page.tsx

import Link from "next/link";
import { MOCK_BROWSE } from "~/data/mock/listings";
import { ListingCard } from "~/components/browse/ListingCard";
import { SchemaScript } from "~/components/browse/SchemaScript";

export const metadata = {
	title: "Browse eBay Listings | uBuyFirst",
	description: "Browse millions of eBay listings with real-time prices and instant alerts.",
};

// Default to us/vinyl-records for the demo — swap this for a real search later
const DEMO_COUNTRY = "us";
const DEMO_CATEGORY = "vinyl-records";

export default function BrowsePage() {
	const page = MOCK_BROWSE[`${DEMO_COUNTRY}/${DEMO_CATEGORY}`];
	if (!page) return <div>No data</div>;

	const schema = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: `${page.displayName} on ${page.country}`,
		numberOfItems: page.totalResults,
		itemListElement: page.listings.slice(0, 10).map((listing, i) => ({
			"@type": "ListItem",
			position: i + 1,
			item: {
				"@type": "Product",
				name: listing.title,
				image: listing.imageUrl,
				offers: {
					"@type": "Offer",
					price: listing.price.toFixed(2),
					priceCurrency: "USD",
					availability: "https://schema.org/InStock",
					url: listing.affiliateUrl,
				},
			},
		})),
	};

	return (
		<>
			<SchemaScript schema={schema} />
			<div className="min-h-screen bg-background">
				<div className="mx-auto max-w-5xl px-4 py-6">

					{/* Breadcrumb */}
					<nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
						<span className="text-foreground">Browse</span>
						<span>/</span>
						<span>{page.country}</span>
						<span>/</span>
						<span className="capitalize">{page.displayName}</span>
					</nav>

					{/* Heading */}
					<h1 className="mb-5 text-2xl font-bold tracking-tight">
						{page.displayName} on {page.country}
					</h1>

					{/* Search bar */}
					<div className="mb-4 flex gap-2">
						<input
							defaultValue={page.displayName}
							className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
						/>
						<select className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
							<option>eBay US</option>
							<option>eBay UK</option>
							<option>eBay DE</option>
							<option>eBay AU</option>
						</select>
						<button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">
							Search
						</button>
					</div>

					{/* Upsell banner */}
					<div className="mb-5 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
						Want instant alerts when new items are listed?{" "}
						<Link href="/signup" className="font-medium text-primary hover:underline">
							Create a free account
						</Link>{" "}
						to set up real-time search alerts.
					</div>

					{/* Results bar */}
					<div className="mb-3 flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5">
						<span className="text-sm font-medium">
							{page.totalResults.toLocaleString()} results
						</span>
						<select className="rounded border border-input bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-ring">
							<option>Posted: Newest</option>
							<option>Price: Low to High</option>
							<option>Price: High to Low</option>
							<option>Ending Soon</option>
						</select>
					</div>

					{/* Listing cards */}
					<div className="flex flex-col gap-2">
						{page.listings.map((listing) => (
							<ListingCard
								key={listing.id}
								listing={listing}
								country={DEMO_COUNTRY}
								category={DEMO_CATEGORY}
							/>
						))}
					</div>

				</div>
			</div>
		</>
	);
}