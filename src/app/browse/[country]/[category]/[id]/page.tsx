// src/app/browse/[country]/[category]/[id]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMockListing } from "~/data/mock/listings";
import { getCountry } from "~/data/mock/categories";
import { buildProductSchema, buildBreadcrumbSchema, buildSchemaGraph } from "~/lib/seo/schema";
import { listingMeta } from "~/lib/seo/metadata";
import { ListingDetailView } from "~/components/browse/ListingDetailView";
import { SchemaScript } from "~/components/browse/SchemaScript";
import { Breadcrumbs } from "~/components/browse/Breadcrumbs";

export const revalidate = 3600;

interface Props {
	params: Promise<{ country: string; category: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { country, category, id } = await params;
	const listing = getMockListing(id);
	if (!listing) return {};
	return listingMeta(listing, country, category);
}

export default async function ListingPage({ params }: Props) {
	const { country, category, id } = await params;

	const countryData = getCountry(country);
	if (!countryData) notFound();

	const listing = getMockListing(id);
	if (!listing) notFound();

	// Combine Product + BreadcrumbList into a single @graph — cleanest for Google
	const productSchema = buildProductSchema(listing, countryData.currency);
	const breadcrumbSchema = buildBreadcrumbSchema([
		{ name: "Browse", href: "/browse" },
		{ name: countryData.label, href: `/browse/${country}` },
		{ name: category.replace(/-/g, " "), href: `/browse/${country}/${category}` },
		{ name: listing.title },
	]);
	const graphSchema = buildSchemaGraph(productSchema, breadcrumbSchema);

	return (
		<>
			<SchemaScript schema={graphSchema} />
			<div className="mx-auto max-w-5xl px-4 py-6">
				<Breadcrumbs
					crumbs={[
						{ name: "Browse", href: "/browse" },
						{ name: countryData.label, href: `/browse/${country}` },
						{ name: category.replace(/-/g, " "), href: `/browse/${country}/${category}` },
						{ name: listing.title },
					]}
					pageSchema={graphSchema}
				/>

				<ListingDetailView listing={listing} />
			</div>
		</>
	);
}