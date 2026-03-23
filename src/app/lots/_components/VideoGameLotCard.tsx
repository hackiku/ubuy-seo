// src/app/lots/_components/VideoGameLotCard.tsx
"use client";

import { useState } from "react";
import { Clock, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import type { VideoGameLot, GameTitle } from "~/data/lots/mock/videogames";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function MarginBadge({ pct }: { pct: number }) {
	const color =
		pct >= 100 ? "bg-green-500 text-white" :
			pct >= 40 ? "bg-yellow-400 text-black" :
				"bg-muted text-muted-foreground";
	return (
		<span className={cn("rounded px-2 py-0.5 text-xs font-bold tabular-nums", color)}>
			+{pct.toFixed(0)}% margin
		</span>
	);
}

function ConfidenceDots({ score }: { score: number }) {
	const filled = Math.round(score * 5);
	return (
		<span className="flex items-center gap-0.5" title={`AI confidence ${(score * 100).toFixed(0)}%`}>
			{Array.from({ length: 5 }).map((_, i) => (
				<span
					key={i}
					className={cn(
						"inline-block h-1.5 w-1.5 rounded-full",
						i < filled ? "bg-primary" : "bg-muted"
					)}
				/>
			))}
		</span>
	);
}

export function VideoGameLotCard({ lot }: { lot: VideoGameLot }) {
	const [open, setOpen] = useState(false);
	const total = lot.askingPrice + (lot.shipping ?? 0);

	return (
		<div className="rounded-lg border bg-card shadow-sm transition hover:shadow-md">
			<div className="flex flex-col gap-3 p-4 md:flex-row md:items-start">

				<div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-xs text-muted-foreground">
					No image
				</div>

				<div className="flex min-w-0 flex-1 flex-col gap-1.5">
					<h3 className="line-clamp-2 text-sm font-medium leading-snug">
						{lot.title}
					</h3>

					<div className="flex flex-wrap items-center gap-2">
						<span className="text-base font-bold text-green-600">
							${total.toFixed(2)}
						</span>
						{lot.shipping !== null && (
							<span className="text-xs text-muted-foreground">
								(${lot.askingPrice} + ${lot.shipping} ship)
							</span>
						)}
						<MarginBadge pct={lot.marginPercent} />
					</div>

					<div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
						<span>{lot.extractedTitles.length} titles identified</span>
						<span>·</span>
						<span>~${lot.totalEstimatedValue} est. value</span>
						<span>·</span>
						<ConfidenceDots score={lot.aiConfidenceAvg} />
					</div>

					<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
						<Clock className="size-3" />
						<span>{lot.postedMinutesAgo}m ago</span>
						<span>·</span>
						<span>{lot.seller.username}</span>
						<span>·</span>
						<span>⭐ {lot.seller.feedbackPercent.toFixed(1)}%</span>
					</div>
				</div>

				<div className="flex shrink-0 flex-row gap-2 md:flex-col">
					<Button
						variant="ghost"
						size="sm"
						className="h-7 gap-1 text-xs"
						onClick={() => setOpen((v) => !v)}
					>
						{open ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
						Titles
					</Button>
					<Button asChild size="sm" className="h-7 gap-1 text-xs">
						<a href={lot.affiliateUrl} target="_blank" rel="noopener noreferrer">
							<ShoppingCart className="size-3" />
							Buy
						</a>
					</Button>
				</div>
			</div>

			{open && (
				<div className="border-t px-4 py-3">
					<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						AI-Extracted Titles
					</p>
					<div className="flex flex-col gap-1.5">
						{lot.extractedTitles.map((t: GameTitle, i: number) => (
							<div key={i} className="flex items-center justify-between gap-4 text-xs">
								<div className="flex min-w-0 items-center gap-2">
									<ConfidenceDots score={t.confidence} />
									<span className="truncate font-medium">{t.title}</span>
									<span className="shrink-0 text-muted-foreground">{t.platform}</span>
								</div>
								<span className="shrink-0 font-mono text-green-600">
									${t.estimatedValue}
								</span>
							</div>
						))}
					</div>
					<div className="mt-3 flex justify-end border-t pt-2 text-xs">
						<span className="text-muted-foreground">Total estimated</span>
						<span className="ml-3 font-bold text-green-600">
							${lot.totalEstimatedValue}
						</span>
					</div>
				</div>
			)}
		</div>
	);
}