// src/app/lots/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { LOT_CATEGORIES, type LotCategory } from "~/data/lots/registry";

export const metadata: Metadata = {
	title: "Lots — AI-Analyzed eBay Buying Pages | uBuyFirst",
	description:
		"Stop evaluating lots manually. uBuyFirst AI reads the photo, prices every item, and ranks the opportunity. No login required.",
};

const STATS = [
	{ value: "46K+", label: "high-value buyers tracked" },
	{ value: "13 yr", label: "eBay API access" },
	{ value: `${LOT_CATEGORIES.length}`, label: "categories in pipeline" },
	{ value: "0", label: "logins required" },
];

function StatusPill({ status }: { status: LotCategory["status"] }) {
	if (status === "live") return (
		<span className="flex items-center gap-1 rounded-full border border-green-300 bg-green-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
			<span className="size-1.5 rounded-full bg-green-500" />
			Live
		</span>
	);
	if (status === "soon") return (
		<span className="flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400">
			<span className="size-1.5 rounded-full bg-amber-400" />
			Coming soon
		</span>
	);
	return (
		<span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
			In pipeline
		</span>
	);
}

function LotCard({ lot }: { lot: LotCategory }) {
	const isLive = lot.status === "live";
	return (
		<Link
			href={`/lots/${lot.slug}`}
			className="group relative flex flex-col gap-4 rounded-xl border bg-card p-5 transition hover:border-primary/50 hover:shadow-md"
		>
			<div className="flex items-start justify-between gap-2">
				<span className="text-3xl">{lot.icon}</span>
				<StatusPill status={lot.status} />
			</div>

			<div className="flex-1">
				<h2 className="font-semibold transition-colors group-hover:text-primary">
					{lot.label}
				</h2>
				<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
					{lot.description}
				</p>
			</div>

			<div className="rounded-lg border bg-muted/40 px-3 py-2">
				<p className="text-xl font-extrabold tabular-nums">{lot.stats[0]?.value}</p>
				<p className="text-xs text-muted-foreground">{lot.stats[0]?.label}</p>
			</div>

			<div className="flex flex-wrap gap-1.5">
				{lot.tags.slice(0, 3).map((t) => (
					<span key={t} className="rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
						{t}
					</span>
				))}
			</div>

			<div className="flex items-center gap-1 text-xs font-medium">
				{isLive ? (
					<span className="flex items-center gap-1 text-primary">
						Browse lots <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
					</span>
				) : (
					<span className="flex items-center gap-1 text-muted-foreground">
						<Lock className="size-3" /> Preview page
					</span>
				)}
			</div>
		</Link>
	);
}

export default function LotsPage() {
	const live = LOT_CATEGORIES.filter((c) => c.status === "live");
	const soon = LOT_CATEGORIES.filter((c) => c.status === "soon");
	const building = LOT_CATEGORIES.filter((c) => c.status === "building");

	return (
		<div className="mx-auto max-w-5xl px-4">

			{/* Hero */}
			<section className="border-b py-14">
				<p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
					<span className="size-1.5 rounded-full bg-green-500" />
					No login required
				</p>
				<h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
					Stop the {" "}
					<span className="text-primary">manual</span> lot-hunting
				</h1>
				<p className="mt-4 max-w-lg text-lg text-muted-foreground">
					uBuyFirst AI reads the listing, prices every item inside, and ranks
					the opportunity — before you click through to eBay.
				</p>
				<div className="mt-8 flex flex-wrap gap-3">
					{live.slice(0, 2).map((c) => (
						<Link
							key={c.slug}
							href={`/lots/${c.slug}`}
							className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
						>
							Browse {c.label} →
						</Link>
					))}
				</div>
			</section>

			{/* Stats bar */}
			<section className="grid grid-cols-2 gap-px border-b bg-border sm:grid-cols-4">
				{STATS.map((s) => (
					<div key={s.label} className="bg-background px-5 py-5">
						<p className="text-2xl font-extrabold tabular-nums">{s.value}</p>
						<p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
					</div>
				))}
			</section>

			{/* Live */}
			{live.length > 0 && (
				<section className="py-10">
					<p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Live now</p>
					<h2 className="mb-5 text-xl font-extrabold tracking-tight">Ready to browse</h2>
					<div className="grid gap-4 sm:grid-cols-2">
						{live.map((lot) => <LotCard key={lot.slug} lot={lot} />)}
					</div>
				</section>
			)}

			{/* Coming soon */}
			{soon.length > 0 && (
				<section className="border-t py-10">
					<p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Coming soon</p>
					<h2 className="mb-5 text-xl font-extrabold tracking-tight">Pipeline nearly ready</h2>
					<div className="grid gap-4 sm:grid-cols-2">
						{soon.map((lot) => <LotCard key={lot.slug} lot={lot} />)}
					</div>
				</section>
			)}

			{/* Building */}
			{building.length > 0 && (
				<section className="border-t py-10">
					<p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">In the pipeline</p>
					<h2 className="mb-2 text-xl font-extrabold tracking-tight">Up next</h2>
					<p className="mb-5 text-sm text-muted-foreground">Market researched, pricing sources identified. Build queued.</p>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{building.map((lot) => <LotCard key={lot.slug} lot={lot} />)}
					</div>
				</section>
			)}

			{/* CTA */}
			<section className="mb-16 rounded-xl border bg-muted/30 px-6 py-10 text-center">
				<h2 className="text-xl font-extrabold tracking-tight">Want alerts when new lots drop?</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					Free tier shows you what's live. The web app pings you the moment a high-margin lot is listed.
				</p>
				<div className="mt-6 flex flex-wrap justify-center gap-3">
					<Link href="https://app.ubuyfirst.com/signup" className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
						Create free account
					</Link>
					<Link href="https://app.ubuyfirst.com" className="rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">
						Launch web app
					</Link>
				</div>
			</section>

		</div>
	);
}