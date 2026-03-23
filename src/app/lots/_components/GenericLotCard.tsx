// src/app/lots/_components/GenericLotCard.tsx
"use client";

import { useState } from "react";
import { Clock, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

// ── Shared types ─────────────────────────────────────────────────────────────
// Every mock file has the same outer shape — we extract just what we need.

export interface GenericExtractedItem {
	label: string;       // title / partNumber / model / name — whatever is most meaningful
	sublabel?: string;   // platform / brand / set / formFactor
	value: number;       // estimatedValue / marketPrice / estimatedResaleValue
	confidence: number;
	meta?: string;       // gradeEstimate / reference / yearEstimate — optional extra
}

export interface GenericLot {
	id: string;
	affiliateUrl: string;
	title: string;
	askingPrice: number;
	shipping: number | null;
	condition: string;
	listingType: "BIN" | "Auction" | "BestOffer";
	postedMinutesAgo: number;
	bids?: number;
	seller: {
		username: string;
		feedbackScore: number;
		feedbackPercent: number;
	};
	extractedItems: GenericExtractedItem[];
	totalEstimatedValue: number;
	marginPercent: number;
	aiConfidenceAvg: number;
	quantity?: number;
	// Label for the extracted section header e.g. "Extracted Titles", "Part Numbers"
	extractedLabel?: string;
}

// ── Adapters — coerce each mock type into GenericLot ─────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toGenericLot(raw: any, category: string): GenericLot {
	const base = {
		id: raw.id,
		affiliateUrl: raw.affiliateUrl,
		title: raw.title,
		askingPrice: raw.askingPrice,
		shipping: raw.shipping,
		condition: raw.condition,
		listingType: raw.listingType,
		postedMinutesAgo: raw.postedMinutesAgo,
		bids: raw.bids,
		seller: raw.seller,
		totalEstimatedValue: raw.totalEstimatedValue,
		marginPercent: raw.marginPercent,
		aiConfidenceAvg: raw.aiConfidenceAvg,
		quantity: raw.quantity,
	};

	switch (category) {
		case "videogames":
			return { ...base, extractedLabel: "Extracted Titles", extractedItems: (raw.extractedTitles ?? []).map((t: any) => ({ label: t.title, sublabel: t.platform, value: t.estimatedValue, confidence: t.confidence })) };
		case "ram":
			return { ...base, extractedLabel: "Part Numbers", extractedItems: (raw.extractedSpecs ?? []).map((s: any) => ({ label: s.partNumber, sublabel: `${s.brand} ${s.type} ${s.capacity}`, value: s.marketPrice, confidence: s.confidence, meta: s.formFactor })) };
		case "handbags":
			return { ...base, extractedLabel: "Identified Bags", extractedItems: (raw.extractedBags ?? []).map((b: any) => ({ label: `${b.brand} ${b.model}`, sublabel: b.color, value: b.estimatedResaleValue, confidence: b.confidence, meta: b.yearEstimate })) };
		case "watches":
			return { ...base, extractedLabel: "Identified Watches", extractedItems: (raw.extractedWatches ?? []).map((w: any) => ({ label: `${w.brand} ${w.model}`, sublabel: w.reference, value: w.estimatedValue, confidence: w.confidence })) };
		case "tradingcards":
			return { ...base, extractedLabel: "Identified Cards", extractedItems: (raw.extractedCards ?? []).map((c: any) => ({ label: c.name, sublabel: `${c.set} ${c.year}`, value: c.estimatedValue, confidence: c.confidence, meta: c.gradeEstimate })) };
		case "plcs":
			return { ...base, extractedLabel: "Extracted Parts", extractedItems: (raw.extractedPlcs ?? []).map((p: any) => ({ label: p.partNumber, sublabel: `${p.brand} — ${p.description}`, value: p.estimatedMarketValue, confidence: p.confidence })) };
		case "smartphones":
			return { ...base, extractedLabel: "Identified Devices", extractedItems: (raw.extractedDevices ?? []).map((d: any) => ({ label: d.model, sublabel: d.carrier ?? d.condition, value: d.buybackValue ?? d.marketPrice, confidence: d.confidence })) };
		default:
			// Best-effort: look for any array starting with "extracted"
			const extractedKey = Object.keys(raw).find((k) => k.startsWith("extracted"));
			const items = extractedKey ? (raw[extractedKey] ?? []) : [];
			return { ...base, extractedLabel: "Extracted Items", extractedItems: items.map((i: any) => ({ label: i.title ?? i.partNumber ?? i.model ?? i.name ?? "Item", sublabel: i.platform ?? i.brand ?? i.set ?? "", value: i.estimatedValue ?? i.marketPrice ?? i.estimatedResaleValue ?? 0, confidence: i.confidence ?? 0 })) };
	}
}

// ── UI helpers ────────────────────────────────────────────────────────────────

function MarginBadge({ pct }: { pct: number }) {
	const color =
		pct >= 100 ? "bg-green-500 text-white" :
			pct >= 40 ? "bg-yellow-400 text-black" :
				pct >= 0 ? "bg-muted text-muted-foreground" :
					"bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";
	const sign = pct >= 0 ? "+" : "";
	return (
		<span className={cn("rounded px-2 py-0.5 text-xs font-bold tabular-nums", color)}>
			{sign}{pct.toFixed(0)}% margin
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

// ── Card ──────────────────────────────────────────────────────────────────────

export function GenericLotCard({ lot }: { lot: GenericLot }) {
	const [open, setOpen] = useState(false);
	const total = lot.askingPrice + (lot.shipping ?? 0);

	return (
		<div className="rounded-lg border bg-card shadow-sm transition hover:shadow-md">
			<div className="flex flex-col gap-3 p-4 md:flex-row md:items-start">

				{/* Placeholder thumb */}
				<div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-xs text-muted-foreground">
					No img
				</div>

				{/* Main */}
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
						{lot.extractedItems.length > 0 && <span>{lot.extractedItems.length} item{lot.extractedItems.length > 1 ? "s" : ""} identified</span>}
						{lot.extractedItems.length > 0 && <span>·</span>}
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

				{/* CTAs */}
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

			{/* Expanded breakdown */}
			{open && lot.extractedItems.length > 0 && (
				<div className="border-t px-4 py-3">
					<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						{lot.extractedLabel ?? "Extracted Items"}
					</p>
					<div className="flex flex-col gap-1.5">
						{lot.extractedItems.map((item, i) => (
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