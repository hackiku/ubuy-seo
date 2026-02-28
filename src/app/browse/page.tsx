// src/app/browse/page.tsx
import { MOCK_BROWSE } from "~/data/mock/listings";
import { buildItemListSchema } from "~/lib/seo/schema";
import { ListingCard } from "~/components/browse/ListingCard";
import { SchemaScript } from "~/components/browse/SchemaScript";
import { Breadcrumbs } from "~/components/browse/Breadcrumbs";
import Link from "next/link";

export const metadata = {
	title: "Browse eBay Listings | uBuyFirst",
	description: "Browse millions of eBay listings with real-time prices and instant alerts.",
};

const DEMO_COUNTRY = "us";
const DEMO_CATEGORY = "vinyl-records";

export default function BrowsePage() {
	const page = MOCK_BROWSE[`${DEMO_COUNTRY}/${DEMO_CATEGORY}`];
	if (!page) return <div>No data</div>;

	const schema = buildItemListSchema(page, "USD");

	return (
		<>
			<SchemaScript schema={schema} />
			<div className="mx-auto max-w-5xl px-4 py-6">
				<Breadcrumbs
					crumbs={[
						{ name: "Browse", href: "/browse" },
						{ name: page.country },
						{ name: page.displayName },
					]}
					pageSchema={schema}
				/>

				<h1 className="mb-5 text-2xl font-bold tracking-tight">
					{page.displayName} on {page.country}
				</h1>

				<div className="mb-4 flex gap-2">
					<input
						defaultValue={page.displayName}
						className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
					/>
					<select className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
						<option>eBay US</option>
						<option>eBay UK</option>
						<option>eBay DE</option>
						<option>eBay AU</option>
					</select>
					<button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
						Search
					</button>
				</div>

				<div className="mb-5 rounded-lg border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
					Want instant alerts when new items are listed?{" "}
					<Link href="/signup" className="font-medium text-primary hover:underline">
						Create a free account
					</Link>{" "}
					to set up real-time search alerts.
				</div>

				<div className="mb-3 flex items-center justify-between rounded-lg border bg-card px-4 py-2.5">
					<span className="text-sm font-medium">{page.totalResults.toLocaleString()} results</span>
					<select className="rounded border border-input bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-ring">
						<option>Posted: Newest</option>
						<option>Price: Low to High</option>
						<option>Price: High to Low</option>
						<option>Ending Soon</option>
					</select>
				</div>

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
		</>
	);
}