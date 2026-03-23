// src/app/lots/[slug]/page.tsx
"use client"
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Zap, ScanLine, BarChart2 } from "lucide-react";
import { getCategory, STATIC_LOT_SLUGS, LOT_CATEGORIES } from "~/data/lots/registry";
import { getCompetitors } from "~/data/lots/competitors";
import { CompetitorGrid } from "~/app/lots/_components/CompetitorGrid";
import { Breadcrumbs } from "~/components/browse/Breadcrumbs";
import { GenericLotCard, toGenericLot } from "~/app/lots/_components/GenericLotCard";

interface Props {
	params: Promise<{ slug: string }>;
}

// export async function generateStaticParams() {
// 	return LOT_CATEGORIES
// 		.filter((c) => !STATIC_LOT_SLUGS.has(c.slug))
// 		.map((c) => ({ slug: c.slug }));
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
// 	const { slug } = await params;
// 	const category = getCategory(slug);
// 	if (!category) return {};
// 	return { title: category.metaTitle, description: category.metaDescription };
// }

// Lazy-load mock data by slug — try/catch so missing files don't crash
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getMockData(slug: string): Promise<any[]> {
	try {
		switch (slug) {
			case "watches": return (await import("~/data/lots/mock/watches")).MOCK_WATCH_LOTS;
			case "tradingcards": return (await import("~/data/lots/mock/tradingcards")).MOCK_TRADINGCARD_LOTS;
			case "handbags": return (await import("~/data/lots/mock/handbags")).MOCK_HANDBAG_LOTS;
			case "gold": return (await import("~/data/lots/mock/gold")).MOCK_GOLD_LOTS;
			case "plcs": return (await import("~/data/lots/mock/plcs")).MOCK_PLC_LOTS;
			case "smartphones": return (await import("~/data/lots/mock/smartphones")).MOCK_SMARTPHONE_LOTS;
			default: return [];
		}
	} catch {
		return [];
	}
}

const STATUS = {
	live: { label: "Live", color: "border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400", dot: "bg-green-500" },
	soon: { label: "Coming soon", color: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400", dot: "bg-amber-400" },
	building: { label: "In pipeline", color: "border-border bg-muted text-muted-foreground", dot: "bg-muted-foreground" },
};

export default async function GenericLotPage({ params }: Props) {
	const { slug } = await params;

	if (STATIC_LOT_SLUGS.has(slug)) redirect(`/lots/${slug}`);

	const category = getCategory(slug);
	if (!category) notFound();

	const rawData = await getMockData(slug);
	const lots = rawData
		.map((r) => toGenericLot(r, slug))
		.sort((a, b) => b.marginPercent - a.marginPercent);

	const competitors = getCompetitors(slug);
	const s = STATUS[category.status];

	return (
		<div className="mx-auto max-w-5xl px-4 py-6">
			<Breadcrumbs crumbs={[{ name: "Lots", href: "/lots" }, { name: category.label }]} />

			{/* Header */}
			<div className="mb-8 border-b pb-8">
				<div className="mb-4 flex items-center gap-3">
					<span className="text-4xl">{category.icon}</span>
					<span className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${s.color}`}>
						<span className={`size-1.5 rounded-full ${s.dot}`} />
						{s.label}
					</span>
				</div>
				<h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{category.label}</h1>
				<p className="mt-1 text-lg font-medium text-primary">{category.tagline}</p>
				<p className="mt-3 max-w-xl text-muted-foreground">{category.description}</p>
				<div className="mt-6 flex flex-wrap gap-6">
					{category.stats.map((stat) => (
						<div key={stat.label}>
							<p className="text-2xl font-extrabold tabular-nums">{stat.value}</p>
							<p className="text-xs text-muted-foreground">{stat.label}</p>
						</div>
					))}
				</div>
			</div>

			{/* Feed */}
			{lots.length > 0 ? (
				<div className="mb-10">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
								{category.status !== "live" ? "Sample data — pipeline in development" : "Live feed"}
							</p>
							<h2 className="mt-0.5 text-lg font-extrabold tracking-tight">
								{lots.length} listings · sorted by margin
							</h2>
						</div>
						<div className="flex flex-wrap gap-1.5">
							{category.tags.slice(0, 2).map((t) => (
								<span key={t} className="rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">{t}</span>
							))}
						</div>
					</div>

					{category.status !== "live" && (
						<div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
							⚠ Sample data — showing what the live page will look like once the pipeline launches.
						</div>
					)}

					<div className="flex flex-col gap-3">
						{lots.map((lot) => (
							<GenericLotCard key={lot.id} lot={lot} />
						))}
					</div>
				</div>
			) : (
				<div className="mb-10 rounded-xl border border-dashed bg-muted/20 px-6 py-12 text-center">
					<p className="font-semibold">Pipeline in build queue</p>
					<p className="mt-2 max-w-sm mx-auto text-sm text-muted-foreground">
						Market researched, pricing sources identified. Sample data coming soon.
					</p>
				</div>
			)}

			{/* How it works */}
			<div className="mb-10 border-t pt-8">
				<h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">How it works</h2>
				<div className="grid gap-3 sm:grid-cols-3">
					{[
						{ icon: ScanLine, title: "Listings monitored", body: `New ${category.label.toLowerCase()} listings pulled from eBay in real time.` },
						{ icon: Zap, title: category.aiMethod, body: `AI processes each listing. Hero metric: ${category.heroMetric.label}.` },
						{ icon: BarChart2, title: "Ranked by opportunity", body: `Sorted by ${category.heroMetric.label.toLowerCase()} using ${category.heroMetric.source}.` },
					].map(({ icon: Icon, title, body }) => (
						<div key={title} className="rounded-lg border bg-card p-4">
							<Icon className="mb-2 size-4 text-primary" />
							<p className="text-sm font-medium">{title}</p>
							<p className="mt-1 text-xs text-muted-foreground">{body}</p>
						</div>
					))}
				</div>
			</div>

			{/* CTA */}
			<div className="mb-10 rounded-xl border bg-muted/30 px-6 py-8 text-center">
				<h2 className="font-extrabold tracking-tight">Get notified when {category.label} launches</h2>
				<p className="mt-1.5 text-sm text-muted-foreground">Free account — alerts the moment a high-margin lot is listed.</p>
				<Link
					href="https://app.ubuyfirst.com/signup"
					className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
				>
					<Zap className="size-3.5" /> Create free account
				</Link>
			</div>

			{competitors.length > 0 && <CompetitorGrid competitors={competitors} />}

			<div className="mt-10 border-t pt-6">
				<Link href="/lots" className="flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
					<ArrowLeft className="size-3.5" /> Back to all Lots
				</Link>
			</div>
		</div>
	);
}