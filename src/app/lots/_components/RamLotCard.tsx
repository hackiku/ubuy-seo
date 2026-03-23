// src/app/lots/_components/RamLotCard.tsx
"use client";

import { useState } from "react";
import { Clock, ShoppingCart, ChevronDown, ChevronUp, Cpu } from "lucide-react";
import type { RamListing } from "~/data/lots/mock/ram";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function MarginBadge({ pct }: { pct: number }) {
	const color =
		pct >= 80 ? "bg-green-500 text-white" :
			pct >= 30 ? "bg-yellow-400 text-black" :
				"bg-muted text-muted-foreground";
	return (
		<span className={cn("rounded px-2 py-0.5 text-xs font-bold tabular-nums", color)}>
			+{pct.toFixed(0)}% margin
		</span>
	);
}

const TYPE_COLOR: Record<string, string> = {
	DDR3: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
	DDR4: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
	DDR5: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
};

export function RamLotCard({ listing }: { listing: RamListing }) {
	const [open, setOpen] = useState(false);
	const total = listing.askingPrice + (listing.shipping ?? 0);
	const primarySpec = listing.extractedSpecs[0];

	return (
		<div className="rounded-lg border bg-card shadow-sm transition hover:shadow-md">
			<div className="flex flex-col gap-3 p-4 md:flex-row md:items-start">

				{/* Icon stand-in for image */}
				<div className="size-24 shrink-0 overflow-hidden rounded-md bg-muted flex items-center justify-center">
					<Cpu className="size-8 text-muted-foreground/40" />
				</div>

				{/* Main info */}
				<div className="flex min-w-0 flex-1 flex-col gap-1.5">
					<h3 className="text-sm font-medium leading-snug line-clamp-2">
						{listing.title}
					</h3>

					<div className="flex flex-wrap items-center gap-2">
						<span className="text-base font-bold text-green-600">
							${total.toFixed(2)}
						</span>
						{listing.shipping !== null && (
							<span className="text-xs text-muted-foreground">
								(${listing.askingPrice} + ${listing.shipping} ship)
							</span>
						)}
						<MarginBadge pct={listing.marginPercent} />
					</div>

					{/* Spec summary */}
					{primarySpec && (
						<div className="flex flex-wrap items-center gap-1.5">
							<span className={cn("rounded px-1.5 py-0.5 text-[11px] font-semibold", TYPE_COLOR[primarySpec.type])}>
								{primarySpec.type}
							</span>
							<span className="text-xs text-muted-foreground">
								{listing.quantity > 1 ? `${listing.quantity}×` : ""}{primarySpec.capacity}
							</span>
							<span className="text-xs text-muted-foreground">{primarySpec.speed}</span>
							<span className="text-xs text-muted-foreground">{primarySpec.formFactor}</span>
							{primarySpec.ecc && (
								<span className="rounded border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground">
									ECC
								</span>
							)}
						</div>
					)}

					<div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
						<span>~${listing.totalMarketValue} market value</span>
						<span>·</span>
						<span>{listing.extractedSpecs.length} part{listing.extractedSpecs.length > 1 ? "s" : ""} identified</span>
						<span>·</span>
						<Clock className="size-3" />
						<span>{listing.postedMinutesAgo}m ago</span>
						<span>·</span>
						<span>{listing.seller.username}</span>
					</div>
				</div>

				{/* CTAs */}
				<div className="flex shrink-0 flex-row gap-2 md:flex-col">
					<Button
						variant="ghost"
						size="sm"
						className="h-7 gap-1 text-xs"
						onClick={() => setOpen((v) => !v)}
					>
						{open ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
						Specs
					</Button>
					<Button asChild size="sm" className="h-7 gap-1 text-xs">
						<a href={listing.affiliateUrl} target="_blank" rel="noopener noreferrer">
							<ShoppingCart className="size-3" />
							Buy
						</a>
					</Button>
				</div>
			</div>

			{/* Expanded spec breakdown */}
			{open && (
				<div className="border-t px-4 py-3">
					<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						Extracted Specs
					</p>
					<div className="flex flex-col gap-2">
						{listing.extractedSpecs.map((spec, i) => (
							<div key={i} className="rounded-md bg-muted/40 p-3 text-xs">
								<div className="flex items-center justify-between gap-4">
									<span className="font-mono font-medium">{spec.partNumber}</span>
									<span className="font-bold text-green-600">${spec.marketPrice} ea</span>
								</div>
								<div className="mt-1 flex flex-wrap gap-2 text-muted-foreground">
									<span>{spec.brand}</span>
									<span>·</span>
									<span>{spec.capacity} {spec.type} {spec.speed}</span>
									<span>·</span>
									<span>{spec.formFactor}</span>
									{spec.ecc && <><span>·</span><span>ECC</span></>}
									<span>·</span>
									<span>{(spec.confidence * 100).toFixed(0)}% confidence</span>
								</div>
							</div>
						))}
					</div>
					{listing.quantity > 1 && (
						<div className="mt-3 flex justify-end border-t pt-2 text-xs">
							<span className="text-muted-foreground">{listing.quantity} units × market price</span>
							<span className="ml-3 font-bold text-green-600">
								${listing.totalMarketValue} total
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}