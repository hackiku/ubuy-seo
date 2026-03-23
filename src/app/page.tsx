// src/app/page.tsx
// Drop-in replacement for the T3 boilerplate homepage
// Tailwind + shadcn-compatible, dark-mode-aware, no extra deps

import Link from "next/link";

// ─── tiny mock stats for the hero ───────────────────────────────────────────
const STATS = [
	{ value: "46K+", label: "Whale buyers tracked" },
	{ value: "110K+", label: "eBay categories analysed" },
	{ value: "13 yrs", label: "In the market" },
];

// ─── browse category teasers ────────────────────────────────────────────────
const BROWSE_CATS = [
	{ slug: "video-game-lots", label: "Video Game Lots", flag: "🎮", blurb: "AI-extracted titles + margin vs asking price" },
	{ slug: "server-ram", label: "Server RAM", flag: "🖥️", blurb: "Part-# matched against live commodity pricing" },
	{ slug: "wristwatches", label: "Wristwatches", flag: "⌚", blurb: "Authentication signals + Chrono24 comps" },
	{ slug: "womens-handbags", label: "Women's Handbags", flag: "👜", blurb: "Counterfeit filtering + resale market comps" },
];

// ─── insight feature cards ───────────────────────────────────────────────────
const INSIGHTS = [
	{
		icon: "◈",
		title: "Whale Buyer Concentration",
		body: "See where the top 1% of eBay buyers cluster by category — and understand which niches have the deepest repeat-buyer pools.",
	},
	{
		icon: "◉",
		title: "Target Window Analysis",
		body: "Purchase volume broken into time-from-listing buckets. Know exactly how much GMV moves in the 1-day batch-buyer window.",
	},
	{
		icon: "◍",
		title: "Three-Signal Opportunity Score",
		body: "Whale concentration + sold volume + timing signal combined into one ranked opportunity matrix across 110K+ categories.",
	},
];

export default function Home() {
	return (
		<main className="min-h-screen bg-background text-foreground">

			{/* ── HERO ─────────────────────────────────────────────────────────── */}
			<section className="relative overflow-hidden border-b border-border">
				{/* subtle grid bg */}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 opacity-[0.04]"
					style={{
						backgroundImage:
							"linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
						backgroundSize: "48px 48px",
					}}
				/>

				<div className="relative mx-auto max-w-5xl px-6 py-24 md:py-36">
					{/* eyebrow */}
					<p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
						<span className="h-1.5 w-1.5 rounded-full bg-green-500" />
						Top-50 eBay Global Affiliate · Since 2013
					</p>

					<h1 className="mb-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
						The intelligence layer<br />
						<span className="text-primary">serious eBay buyers</span> run on.
					</h1>

					<p className="mb-10 max-w-xl text-lg text-muted-foreground">
						uBuyFirst turns 13 years of proprietary buyer data into actionable
						purchasing intelligence — from speed-buying alerts to AI-powered
						category deep dives. No noise. Just opportunity.
					</p>

					<div className="flex flex-wrap gap-3">
						<Link
							href="/browse/us"
							className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
						>
							Browse Listings →
						</Link>
						<Link
							href="/insights"
							className="rounded-md border border-border bg-muted/40 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
						>
							Explore Insights
						</Link>
					</div>

					{/* stats row */}
					<div className="mt-16 flex flex-wrap gap-8 border-t border-border pt-10">
						{STATS.map((s) => (
							<div key={s.label}>
								<p className="text-3xl font-extrabold tabular-nums">{s.value}</p>
								<p className="mt-0.5 text-sm text-muted-foreground">{s.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── BROWSE ───────────────────────────────────────────────────────── */}
			<section className="border-b border-border">
				<div className="mx-auto max-w-5xl px-6 py-20">
					<div className="mb-12 flex items-end justify-between gap-4">
						<div>
							<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
								Live Pages
							</p>
							<h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
								Browse curated listings
							</h2>
							<p className="mt-3 max-w-lg text-muted-foreground">
								Each page is a hand-curated, AI-processed feed for a specific
								niche — filtered, priced, and ranked so you skip straight to
								the opportunity.
							</p>
						</div>
						<Link
							href="/browse"
							className="hidden shrink-0 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted md:block"
						>
							All categories →
						</Link>
					</div>

					<div className="grid gap-3 sm:grid-cols-2">
						{BROWSE_CATS.map((cat) => (
							<Link
								key={cat.slug}
								href={`/browse/us/${cat.slug}`}
								className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary/50 hover:bg-muted/30"
							>
								<span className="mt-0.5 text-2xl">{cat.flag}</span>
								<div className="min-w-0">
									<p className="font-semibold group-hover:text-primary">
										{cat.label}
									</p>
									<p className="mt-1 text-sm text-muted-foreground">
										{cat.blurb}
									</p>
								</div>
								<span className="ml-auto shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary">
									→
								</span>
							</Link>
						))}
					</div>

					<Link
						href="/browse"
						className="mt-6 flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground md:hidden"
					>
						All categories →
					</Link>
				</div>
			</section>

			{/* ── INSIGHTS ─────────────────────────────────────────────────────── */}
			<section>
				<div className="mx-auto max-w-5xl px-6 py-20">
					<div className="mb-12">
						<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
							Market Intelligence
						</p>
						<h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
							Data the competition<br />doesn't have.
						</h2>
						<p className="mt-3 max-w-lg text-muted-foreground">
							46,000 high-volume buyers profiled. 110,000+ categories scored.
							This is what 13 years of eBay API access looks like when it's
							actually put to work.
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						{INSIGHTS.map((item) => (
							<div
								key={item.title}
								className="rounded-xl border border-border bg-card p-6"
							>
								<span className="mb-4 block text-2xl text-primary">
									{item.icon}
								</span>
								<h3 className="mb-2 font-semibold">{item.title}</h3>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{item.body}
								</p>
							</div>
						))}
					</div>

					<div className="mt-8 flex gap-3">
						<Link
							href="/insights"
							className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
						>
							Open Insights →
						</Link>
						<Link
							href="https://app.ubuyfirst.com"
							className="rounded-md border border-border bg-muted/40 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
						>
							Launch Web App
						</Link>
					</div>
				</div>
			</section>

		</main>
	);
}