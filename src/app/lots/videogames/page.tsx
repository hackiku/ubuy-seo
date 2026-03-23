// src/app/catalog/videogames/page.tsx
import type { Metadata } from "next";
import { MOCK_VIDEOGAME_LOTS } from "~/data/lots/mock/videogames";
import { getCompetitors } from "~/data/lots/competitors";
import { VideoGameLotCard } from "../_components/VideoGameLotCard";
import { CompetitorGrid } from "../_components/CompetitorGrid";
import { Breadcrumbs } from "~/components/browse/Breadcrumbs";

export const revalidate = 3600;

export const metadata: Metadata = {
	title: "Video Game Lots — uBuyFirst Catalog",
	description:
		"AI-analyzed video game lots from eBay. Extracted titles, estimated values, and margin scores — updated continuously.",
};

// Sort options (applied client-side in real version)
const sorted = [...MOCK_VIDEOGAME_LOTS].sort((a, b) => b.marginPercent - a.marginPercent);
const competitors = getCompetitors("videogames");

export default function VideoGameCatalogPage() {
	return (
		<div className="mx-auto max-w-5xl px-4 py-6">
			<Breadcrumbs
				crumbs={[
					{ name: "Lots", href: "/lots" },
					{ name: "Video Game Lots" },
				]}
			/>

			{/* Header */}
			<div className="mb-6">
				<h1 className="text-2xl font-extrabold tracking-tight">
					Video Game Lots
				</h1>
				<p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
					AI scans each lot photo to identify titles and cross-references buyback
					prices from PriceCharting. Sorted by margin opportunity.
				</p>
			</div>

			{/* Filter bar — stub */}
			<div className="mb-4 flex flex-wrap items-center gap-2">
				<select className="rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
					<option>All Platforms</option>
					<option>PS1 / PS2</option>
					<option>Nintendo</option>
					<option>Xbox</option>
					<option>Retro</option>
				</select>
				<select className="rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
					<option>Sort: Highest Margin</option>
					<option>Sort: Newest</option>
					<option>Sort: Lowest Price</option>
				</select>
				<div className="ml-auto text-sm text-muted-foreground">
					{sorted.length} lots
				</div>
			</div>

			{/* Lot feed */}
			<div className="flex flex-col gap-3">
				{sorted.map((lot) => (
					<VideoGameLotCard key={lot.id} lot={lot} />
				))}
			</div>

			{/* Competitor grid */}
			<CompetitorGrid competitors={competitors} />
		</div>
	);
}