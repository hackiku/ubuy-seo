// src/app/browse/[country]/[category]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getMockBrowse } from "~/data/mock/listings";
import { getCountry } from "~/data/mock/categories";
import { buildItemListSchema } from "~/lib/seo/schema";
import { browseMeta } from "~/lib/seo/metadata";
import { ListingCard } from "~/components/browse/ListingCard";
import { SchemaScript } from "~/components/browse/SchemaScript";
import { Breadcrumbs } from "~/components/browse/Breadcrumbs";

export const revalidate = 3600;

interface Props {
	params: Promise<{ country: string; category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { country, category } = await params;
	const page = getMockBrowse(country, category);
	if (!page) return {};
	return browseMeta(page, country, category);
}

export default async function CategoryPage({ params }: Props) {
	const { country, category } = await params;

	const countryData = getCountry(country);
	if (!countryData) notFound();

	const page = getMockBrowse(country, category);
	if (!page) notFound();

	const schema = buildItemListSchema(page, countryData.currency);

	return (
		<>
			<SchemaScript schema={schema} />
			<div className="mx-auto max-w-5xl px-4 py-6">
				<Breadcrumbs
					crumbs={[
						{ name: "Browse", href: "/browse" },
						{ name: page.country, href: `/browse/${country}` },
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
						<option>{page.country}</option>
						<option>eBay UK</option>
						<option>eBay DE</option>
						<option>eBay AU</option>
					</select>
					<button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
						Search
					</button>
				</div>

				<div className="mb-5 rounded-lg border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
					Want instant alerts?{" "}
					<Link href="/signup" className="font-medium text-primary hover:underline">
						Create a free account
					</Link>
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
						<ListingCard key={listing.id} listing={listing} country={country} category={category} />
					))}
				</div>
			</div>
		</>
	);
}