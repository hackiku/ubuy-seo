// src/app/lots/gold/page.tsx
import Link from "next/link";
import { Breadcrumbs } from "~/components/browse/Breadcrumbs";
import { getCompetitors } from "~/data/lots/competitors";
import { CompetitorGrid } from "../_components/CompetitorGrid";

export const metadata = {
	title: "Gold & Precious Metals — uBuyFirst Catalog",
};

export default function GoldCatalogPage() {
	return (
		<div className="mx-auto max-w-5xl px-4 py-6">
			<Breadcrumbs
				crumbs={[
					{ name: "Catalog", href: "/catalog" },
					{ name: "Gold & Precious Metals" },
				]}
			/>
			<h1 className="mb-2 text-2xl font-extrabold tracking-tight">Gold & Precious Metals</h1>
			<p className="mb-8 text-sm text-muted-foreground">
				Live spot price feed + over/under spot calculation per listing. Coming soon.
			</p>
			<div className="rounded-lg border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
				<p className="text-sm">This catalog page is in development.</p>
				<Link href="/catalog" className="mt-3 inline-block text-sm text-primary hover:underline">
					← Back to Catalog
				</Link>
			</div>
			<CompetitorGrid competitors={getCompetitors("gold")} />
		</div>
	);
}