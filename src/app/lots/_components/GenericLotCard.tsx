// src/app/lots/_components/GenericLotCard.tsx
"use client";

import { useState } from "react";
import { Clock, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { GenericLot, GenericExtractedItem } from "~/lib/lots/toGenericLot";

export type { GenericLot, GenericExtractedItem } from "~/lib/lots/toGenericLot";

function MarginBadge({ pct }: { pct: number }) {
	const color =
		pct >= 100 ? "bg-green-500 text-white" :
			pct >= 40 ? "bg-yellow-400 text-black" :
				pct >= 0 ? "bg-muted text-muted-foreground" :
					"bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";
	return (
		<span className={cn("rounded px-2 py-0.5 text-xs font-bold tabular-nums", color)}>
			{pct >= 0 ? "+" : ""}{pct.toFixed(0)}% margin
		</span>
	);
}

function ConfidenceDots({ score }: { score: number }) {
	const filled = Math.round(score * 5);
	return (
		<span className="flex items-center gap-0.5" title={`${(score * 100).toFixed(0)}% confidence`}>
			{Array.from({ length: 5 }).map((_, i) => (
				<span key={i} className={cn("inline-block h-1.5 w-1.5 rounded-full", i < filled ? "bg-primary" : "bg-muted")} />
			))}
		</span>
	);
}

export function GenericLotCard({ lot }: { lot: GenericLot }) {
	const [open, setOpen] = useState(false);
	const total = lot.askingPrice + (lot.shipping ?? 0);

	return (
		<div className="rounded-lg border bg-card shadow-sm transition hover:shadow-md">
			<div className="flex flex-col gap-3 p-4 md:flex-row md:items-start">

				<div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-xs text-muted-foreground">
					No img
				</div>

				<div className="flex min-w-0 flex-1 flex-col gap-1.5">
					<h3 className="line-clamp-2 text-sm font-medium leading-snug">{lot.title}</h3>

					<div className="flex flex-wrap items-center gap-2">
						<span className="text-base font-bold text-green-600">${total.toFixed(2)}</span>
						{lot.shipping !== null && lot.shipping > 0 && (
							<span className="text-xs text-muted-foreground">(${lot.askingPrice} + ${lot.shipping} ship)</span>
						)}
						<MarginBadge pct={lot.marginPercent} />
					</div>

					<div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
						{lot.extractedItems.length > 0 && (
							<><span>{lot.extractedItems.length} item{lot.extractedItems.length > 1 ? "s" : ""} identified</span><span>·</span></>
						)}
						<span>~${lot.totalEstimatedValue.toLocaleString()} est. value</span>
						<span>·</span>
						<ConfidenceDots score={lot.aiConfidenceAvg} />
					</div>

					<div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
						<Clock className="size-3" />
						<span>{lot.postedMinutesAgo}m ago</span>
						<span>·</span>
						<span>{lot.seller.username}</span>
						<span>·</span>
						<span>⭐ {lot.seller.feedbackPercent.toFixed(1)}%</span>
						{lot.listingType === "Auction" && lot.bids !== undefined && (
							<><span>·</span><span>{lot.bids} bids</span></>
						)}
					</div>
				</div>

				<div className="flex shrink-0 flex-row gap-2 md:flex-col">
					{lot.extractedItems.length > 0 && (
						<Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={() => setOpen(v => !v)}>
							{open ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
							Details
						</Button>
					)}
					<Button asChild size="sm" className="h-7 gap-1 text-xs">
						<a href={lot.affiliateUrl} target="_blank" rel="noopener noreferrer">
							<ShoppingCart className="size-3" /> Buy
						</a>
					</Button>
				</div>
			</div>

			{open && lot.extractedItems.length > 0 && (
				<div className="border-t px-4 py-3">
					<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						{lot.extractedLabel ?? "Extracted Items"}
					</p>
					<div className="flex flex-col gap-1.5">
						{lot.extractedItems.map((item: GenericExtractedItem, i: number) => (
							<div key={i} className="flex items-center justify-between gap-4 text-xs">
								<div className="flex min-w-0 items-center gap-2">
									<ConfidenceDots score={item.confidence} />
									<span className="truncate font-medium">{item.label}</span>
									{item.sublabel && <span className="shrink-0 text-muted-foreground">{item.sublabel}</span>}
									{item.meta && <span className="shrink-0 rounded border border-border px-1 text-muted-foreground">{item.meta}</span>}
								</div>
								<span className="shrink-0 font-mono text-green-600">${item.value.toLocaleString()}</span>
							</div>
						))}
					</div>
					<div className="mt-3 flex justify-end border-t pt-2 text-xs">
						<span className="text-muted-foreground">Total estimated</span>
						<span className="ml-3 font-bold text-green-600">${lot.totalEstimatedValue.toLocaleString()}</span>
					</div>
				</div>
			)}
		</div>
	);
}