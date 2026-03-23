// src/app/lots/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "~/components/browse/Breadcrumbs";
import { LOTS_DROPDOWN } from "~/data/navigation";

export const metadata: Metadata = {
	title: "Lots — uBuyFirst",
	description: "AI-powered curated buying pages by category. No login required.",
};

export default function LotsIndexPage() {
	const entries = LOTS_DROPDOWN[0]?.items ?? [];

	return (
		<div className="mx-auto max-w-5xl px-4 py-6">
			<Breadcrumbs crumbs={[{ name: "Lots" }]} />

			<div className="mb-8">
				<h1 className="text-2xl font-extrabold tracking-tight">Lots</h1>
				<p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
					Hand-curated, AI-processed buying pages. Each category is filtered,
					priced, and ranked — no eBay noise.
				</p>
			</div>

			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{entries.map((entry) => {
					const isLive = entry.badge === "live";
					const Wrapper = isLive ? Link : "div";
					return (
						<Wrapper
							key={entry.href}
							{...(isLive ? { href: entry.href } : {})}
							className={[
								"group flex flex-col gap-3 rounded-xl border bg-card p-5 transition",
								isLive
									? "cursor-pointer hover:border-primary/50 hover:bg-muted/30"
									: "cursor-default opacity-60",
							].join(" ")}
						>
							<div className="flex items-start justify-between">
								<span
									className={[
										"rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
										isLive
											? "border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
											: "border-border bg-muted text-muted-foreground",
									].join(" ")}
								>
									{entry.badge ?? "soon"}
								</span>
							</div>
							<div>
								<p className="font-semibold transition-colors group-hover:text-primary">
									{entry.label}
								</p>
								{entry.description && (
									<p className="mt-1 text-sm text-muted-foreground">
										{entry.description}
									</p>
								)}
							</div>
						</Wrapper>
					);
				})}
			</div>
		</div>
	);
}