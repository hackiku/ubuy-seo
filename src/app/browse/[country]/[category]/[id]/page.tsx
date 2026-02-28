// src/app/browse/[country]/[category]/[id]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getMockListing } from "~/data/mock/listings";
import { getCountry } from "~/data/mock/categories";
import { ListingDetailView } from "~/components/browse/ListingDetailView";
import { SchemaScript } from "~/components/browse/SchemaScript";

export const revalidate = 3600;

interface Props {
	params: Promise<{ country: string; category: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const listing = getMockListing(id);
	if (!listing) return {};
	const total = listing.price + (listing.shipping ?? 0);
	return {
		title: `${listing.title} | uBuyFirst`,
		description: `${listing.condition} · $${total.toFixed(2)} total · Seller: ${listing.seller.username} (${listing.seller.feedbackPercent}% positive)`,
		openGraph: { images: listing.imageUrl ? [listing.imageUrl] : [] },
	};
}

export default async function ListingPage({ params }: Props) {
	const { country, category, id } = await params;

	const countryData = getCountry(country);
	if (!countryData) notFound();

	const listing = getMockListing(id);
	if (!listing) notFound();

	const schema = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: listing.title,
		image: listing.images.length > 0 ? listing.images : [listing.imageUrl],
		offers: {
			"@type": "Offer",
			price: listing.price.toFixed(2),
			priceCurrency: countryData.currency,
			availability: "https://schema.org/InStock",
			priceValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
				.toISOString()
				.split("T")[0],
			url: listing.affiliateUrl,
			seller: { "@type": "Person", name: listing.seller.username },
		},
		itemCondition:
			listing.condition === "New"
				? "https://schema.org/NewCondition"
				: listing.condition === "Refurbished"
					? "https://schema.org/RefurbishedCondition"
					: "https://schema.org/UsedCondition",
	};

	return (
		<>
			<SchemaScript schema={schema} />
			<div className="min-h-screen bg-background">
				<div className="mx-auto max-w-5xl px-4 py-6">

					<nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
						<Link href="/browse" className="hover:text-foreground transition-colors">Browse</Link>
						<span>/</span>
						<Link href={`/browse/${country}/${category}`} className="hover:text-foreground transition-colors capitalize">
							{category.replace(/-/g, " ")}
						</Link>
						<span>/</span>
						<span className="max-w-xs truncate text-foreground">{listing.title}</span>
					</nav>

					<ListingDetailView listing={listing} />

				</div>
			</div>
		</>
	);
}