// src/app/lots/ram/page.tsx
import type { Metadata } from "next";
import { MOCK_RAM_LISTINGS } from "~/data/lots/mock/ram";
import { getCompetitors } from "~/data/lots/competitors";
import { RamLotCard } from "~/app/lots/_components/RamLotCard";
import { CompetitorGrid } from "~/app/lots/_components/CompetitorGrid";
import { Breadcrumbs } from "~/components/browse/Breadcrumbs";

export const revalidate = 3600;

export const metadata: Metadata = {
	title: "Server RAM & Memory — uBuyFirst Lots",
	description:
		"Part-number matched server memory from eBay. Market pricing vs asking price — updated continuously.",
};

const sorted = [...MOCK_RAM_LISTINGS].sort((a, b) => b.marginPercent - a.marginPercent);
const competitors = getCompetitors("ram");

export default function RamLotsPage() {
	return (
		<div className="mx-auto max-w-5xl px-4 py-6">
			<Breadcrumbs
				crumbs={[
					{ name: "Lots", href: "/lots" },
					{ name: "Server RAM" },
				]}
			/>

			<div className="mb-6">
				<h1 className="text-2xl font-extrabold tracking-tight">Server RAM & Memory</h1>
				<p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
					AI extracts part numbers from listing titles and photos, then matches
					against commodity market pricing. Sorted by margin opportunity.
				</p>
			</div>

			{/* Filter bar */}
			<div className="mb-4 flex flex-wrap items-center gap-2">
				<select className="rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
					<option>All Types</option>
					<option>DDR5</option>
					<option>DDR4</option>
					<option>DDR3</option>
				</select>
				<select className="rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
					<option>All Form Factors</option>
					<option>RDIMM</option>
					<option>LRDIMM</option>
					<option>DIMM</option>
					<option>SO-DIMM</option>
				</select>
				<select className="rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
					<option>Sort: Highest Margin</option>
					<option>Sort: Newest</option>
					<option>Sort: Lowest Price</option>
					<option>Sort: Most Units</option>
				</select>
				<div className="ml-auto text-sm text-muted-foreground">
					{sorted.length} listings
				</div>
			</div>

			<div className="flex flex-col gap-3">
				{sorted.map((listing) => (
					<RamLotCard key={listing.id} listing={listing} />
				))}
			</div>

			<CompetitorGrid competitors={competitors} />
		</div>
	);
}