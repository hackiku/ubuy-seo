// src/app/lots/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "~/components/browse/Breadcrumbs";

export const metadata: Metadata = {
	title: "Catalog — uBuyFirst",
	description: "AI-powered curated buying pages by category. No login required.",
};

const LOTS_ENTRIES = [
	{
		slug: "videogames",
		label: "Video Game Lots",
		flag: "🎮",
		blurb: "AI title extraction + PriceCharting margin scores",
		status: "live" as const,
	},
	{
		slug: "gold",
		label: "Gold & Precious Metals",
		flag: "🥇",
		blurb: "Over/under spot price with live Kitco feed",
		status: "soon" as const,
	},
	{
		slug: "handbags",
		label: "Women's Handbags",
		flag: "👜",
		blurb: "Authentication signals + Rebag/Vestiaire comps",
		status: "soon" as const,
	},
];

export default function CatalogIndexPage() {
	return (
		<div className="mx-auto max-w-5xl px-4 py-6">
			<Breadcrumbs crumbs={[{ name: "Lots" }]} />

			<div className="mb-8">
				<h1 className="text-2xl font-extrabold tracking-tight">Catalog</h1>
				<p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
					Hand-curated, AI-processed buying pages. Each category is filtered,
					priced, and ranked — no eBay noise.
				</p>
			</div>

			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{LOTS_ENTRIES.map((entry) => {
					const isLive = entry.status === "live";
					const Wrapper = isLive ? Link : "div";
					return (
						<Wrapper
							key={entry.slug}
							{...(isLive ? { href: `/lots/${entry.slug}` } : {})}
							className={[
								"group flex flex-col gap-3 rounded-xl border bg-card p-5 transition",
								isLive
									? "hover:border-primary/50 hover:bg-muted/30 cursor-pointer"
									: "opacity-60 cursor-default",
							].join(" ")}
						>
							<div className="flex items-start justify-between">
								<span className="text-2xl">{entry.flag}</span>
								<span
									className={[
										"rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border",
										isLive
											? "border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
											: "border-border bg-muted text-muted-foreground",
									].join(" ")}
								>
									{isLive ? "Live" : "Coming soon"}
								</span>
							</div>
							<div>
								<p className="font-semibold group-hover:text-primary transition-colors">
									{entry.label}
								</p>
								<p className="mt-1 text-sm text-muted-foreground">{entry.blurb}</p>
							</div>
						</Wrapper>
					);
				})}
			</div>
		</div>
	);
}