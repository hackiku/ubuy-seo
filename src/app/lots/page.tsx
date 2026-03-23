// src/app/lots/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, ScanLine, BarChart2, Lock } from "lucide-react";

export const metadata: Metadata = {
	title: "Lots — AI-Analyzed eBay Buying Pages | uBuyFirst",
	description:
		"Stop evaluating lots manually. uBuyFirst AI reads the photo, prices every item, and ranks the opportunity. No login required.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

const LOTS = [
	{
		slug: "videogames",
		label: "Video Game Lots",
		icon: "🎮",
		live: true,
		pitch: "eBay lots contain 10–60+ games. AI reads the photo, IDs every title, and cross-references PriceCharting buyback prices so you see margin before you bid.",
		heroStat: { value: "+194%", label: "avg margin found" },
		tags: ["Image recognition", "PriceCharting API", "Margin calculator"],
	},
	{
		slug: "ram",
		label: "Server RAM",
		icon: "🖥️",
		live: true,
		pitch: "AI extracts part numbers from listing titles and images, then matches against live commodity pricing. Built on the same pattern validated with enterprise buyers.",
		heroStat: { value: "DDR3–5", label: "all generations" },
		tags: ["Part# extraction", "Commodity pricing", "ECC / RDIMM"],
	},
	{
		slug: "gold",
		label: "Gold & Precious Metals",
		icon: "🥇",
		live: false,
		pitch: "Live spot price feed from Kitco. Every listing shows exactly how far over or under spot you're paying — in real time.",
		heroStat: { value: "Live", label: "spot price feed" },
		tags: ["Kitco API", "Over/under spot", "Coins + bars"],
	},
	{
		slug: "handbags",
		label: "Women's Handbags",
		icon: "👜",
		live: false,
		pitch: "Authentication signals surfaced per listing. Prices cross-referenced against Rebag, Vestiaire, and Fashionphile — so you know what resale actually looks like.",
		heroStat: { value: "Auth", label: "signals per listing" },
		tags: ["Auth signals", "Rebag comps", "Counterfeit filter"],
	},
];

const STATS = [
	{ value: "46K+", label: "high-value buyers tracked" },
	{ value: "13 yr", label: "eBay API access" },
	{ value: "4", label: "AI pipelines, growing" },
	{ value: "0", label: "logins required" },
];

const HOW_IT_WORKS = [
	{
		icon: ScanLine,
		step: "01",
		title: "Lots hit eBay",
		body: "Our pipeline monitors newly listed lots in real time using eBay API access most competitors don't have.",
	},
	{
		icon: Zap,
		step: "02",
		title: "AI processes each one",
		body: "Image recognition, part# extraction, or authentication signals — depending on category. Confidence scored per result.",
	},
	{
		icon: BarChart2,
		step: "03",
		title: "Margin ranked, noise removed",
		body: "Each lot gets a hero metric: margin %, over/under spot, or auth score. Sorted so the best opportunity is always first.",
	},
];

// ── Components ────────────────────────────────────────────────────────────────

function StatusPill({ live }: { live: boolean }) {
	return live ? (
		<span className="flex items-center gap-1 rounded-full border border-green-300 bg-green-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
			<span className="size-1.5 rounded-full bg-green-500" />
			Live
		</span>
	) : (
		<span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
			Coming soon
		</span>
	);
}

function LotCard({ lot }: { lot: (typeof LOTS)[number] }) {
	return (
		<Link
			href={`/lots/${lot.slug}`}
			className="group relative flex flex-col gap-4 rounded-xl border bg-card p-5 transition hover:border-primary/50 hover:shadow-md"
		>
			<div className="flex items-start justify-between gap-2">
				<span className="text-3xl">{lot.icon}</span>
				<StatusPill live={lot.live} />
			</div>

			<div className="flex-1">
				<h2 className="font-semibold transition-colors group-hover:text-primary">
					{lot.label}
				</h2>
				<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
					{lot.pitch}
				</p>
			</div>

			{/* Hero stat */}
			<div className="rounded-lg border bg-muted/40 px-3 py-2">
				<p className="text-xl font-extrabold tabular-nums">{lot.heroStat.value}</p>
				<p className="text-xs text-muted-foreground">{lot.heroStat.label}</p>
			</div>

			{/* Tags */}
			<div className="flex flex-wrap gap-1.5">
				{lot.tags.map((t) => (
					<span
						key={t}
						className="rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground"
					>
						{t}
					</span>
				))}
			</div>

			{/* CTA row */}
			<div className="flex items-center gap-1 text-xs font-medium text-primary">
				{lot.live ? (
					<>Browse lots <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" /></>
				) : (
					<><Lock className="size-3 text-muted-foreground" /> <span className="text-muted-foreground">Preview available</span></>
				)}
			</div>
		</Link>
	);
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LotsPage() {
	return (
		<div className="mx-auto max-w-5xl px-4">

			{/* ── Hero ─────────────────────────────────────────────────────────── */}
			<section className="border-b py-14">
				<p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
					<span className="size-1.5 rounded-full bg-green-500" />
					No login required
				</p>
				<h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
					Stop the {' '}
					<span className="text-primary">manual</span> lot-hunting
				</h1>
				<p className="mt-4 max-w-lg text-lg text-muted-foreground">
					uBuyFirst AI reads the listing, prices every item inside, and ranks
					the opportunity before you even click through to eBay.
				</p>
				<div className="mt-8 flex flex-wrap gap-3">
					<Link
						href="/lots/videogames"
						className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
					>
						Browse Video Game Lots →
					</Link>
					<Link
						href="/lots/ram"
						className="rounded-md border border-border bg-muted/40 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
					>
						Browse Server RAM
					</Link>
				</div>
			</section>

			{/* ── Stats bar ────────────────────────────────────────────────────── */}
			<section className="grid grid-cols-2 gap-px border-b bg-border sm:grid-cols-4">
				{STATS.map((s) => (
					<div key={s.label} className="bg-background px-5 py-5">
						<p className="text-2xl font-extrabold tabular-nums">{s.value}</p>
						<p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
					</div>
				))}
			</section>

			{/* ── Lot cards ────────────────────────────────────────────────────── */}
			<section className="py-12">
				<div className="mb-6 flex items-end justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
							Categories
						</p>
						<h2 className="mt-1 text-xl font-extrabold tracking-tight">
							Pick your market
						</h2>
					</div>
					<p className="text-xs text-muted-foreground">
						{LOTS.filter((l) => l.live).length} live ·{" "}
						{LOTS.filter((l) => !l.live).length} in pipeline
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					{LOTS.map((lot) => (
						<LotCard key={lot.slug} lot={lot} />
					))}
				</div>
			</section>

			{/* ── How it works ─────────────────────────────────────────────────── */}
			<section className="border-t py-12">
				<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					How it works
				</p>
				<h2 className="mb-8 text-xl font-extrabold tracking-tight">
					From listing to ranked opportunity in seconds.
				</h2>
				<div className="grid gap-4 sm:grid-cols-3">
					{HOW_IT_WORKS.map(({ icon: Icon, step, title, body }) => (
						<div key={step} className="rounded-xl border bg-card p-5">
							<div className="mb-3 flex items-center gap-3">
								<span className="text-xs font-bold tabular-nums text-muted-foreground/50">
									{step}
								</span>
								<Icon className="size-4 text-primary" />
							</div>
							<h3 className="font-semibold">{title}</h3>
							<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
						</div>
					))}
				</div>
			</section>

			{/* ── Bottom CTA ───────────────────────────────────────────────────── */}
			<section className="mb-16 rounded-xl border bg-muted/30 px-6 py-10 text-center">
				<h2 className="text-xl font-extrabold tracking-tight">
					Want alerts when new lots drop?
				</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					The free tier shows you what's live. The web app pings you the moment
					a high-margin lot is listed.
				</p>
				<div className="mt-6 flex flex-wrap justify-center gap-3">
					<Link
						href="https://app.ubuyfirst.com/signup"
						className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
					>
						Create free account
					</Link>
					<Link
						href="https://app.ubuyfirst.com"
						className="rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
					>
						Launch web app
					</Link>
				</div>
			</section>

		</div>
	);
}
