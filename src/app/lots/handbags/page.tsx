// src/app/catalog/handbags/page.tsx
import Link from "next/link";
import { Breadcrumbs } from "~/components/browse/Breadcrumbs";
import { getCompetitors } from "~/data/lots/competitors";
import { CompetitorGrid } from "../_components/CompetitorGrid";

export const metadata = {
	title: "Women's Handbags — uBuyFirst Catalog",
};

export default function HandbagsCatalogPage() {
	return (
		<div className="mx-auto max-w-5xl px-4 py-6">
			<Breadcrumbs
				crumbs={[
					{ name: "Catalog", href: "/catalog" },
					{ name: "Women's Handbags" },
				]}
			/>
			<h1 className="mb-2 text-2xl font-extrabold tracking-tight">Women's Handbags</h1>
			<p className="mb-8 text-sm text-muted-foreground">
				Authentication signals, counterfeit filtering, and Rebag/Vestiaire price comps. Coming soon.
			</p>
			<div className="rounded-lg border bg-muted/30 px-6 py-12 text-center text-muted-foreground">
				<p className="text-sm">This catalog page is in development.</p>
				<Link href="/catalog" className="mt-3 inline-block text-sm text-primary hover:underline">
					← Back to Catalog
				</Link>
			</div>
			<CompetitorGrid competitors={getCompetitors("handbags")} />
		</div>
	);
}