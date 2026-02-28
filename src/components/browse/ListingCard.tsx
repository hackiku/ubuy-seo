// src/app/browse/_components/ListingCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Eye, EyeOff, ShoppingCart, Ellipsis } from "lucide-react";
import type { Listing } from "~/data/mock/listings";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface Props {
	listing: Listing;
	country: string;
	category: string;
}

function formatFeedback(score: number): string {
	if (score >= 1000) return `${(score / 1000).toFixed(score >= 10000 ? 0 : 1)}K`;
	return score.toString();
}

function TimeAgo({ minutes }: { minutes: number }) {
	const label = minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h`;
	return (
		<div className="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium bg-yellow-500 text-white">
			<Clock className="size-3" aria-hidden />
			<span>{label}</span>
		</div>
	);
}

function ListingTypeBadge({ type }: { type: Listing["listingType"] }) {
	const styles: Record<Listing["listingType"], string> = {
		BIN: "bg-blue-50 border border-blue-300 text-blue-700 dark:bg-blue-950 dark:border-blue-700 dark:text-blue-300",
		Auction: "bg-orange-50 border border-orange-300 text-orange-700 dark:bg-orange-950 dark:border-orange-700 dark:text-orange-300",
		BestOffer: "bg-green-50 border border-green-300 text-green-700 dark:bg-green-950 dark:border-green-700 dark:text-green-300",
	};
	const labels: Record<Listing["listingType"], string> = {
		BIN: "Buy It Now",
		Auction: "Auction",
		BestOffer: "Best Offer",
	};
	return (
		<span className={cn("rounded px-2 py-0.5 text-xs font-medium", styles[type])}>
			{labels[type]}
		</span>
	);
}

function FlagImg({ code, size = 12 }: { code: string; size?: number }) {
	return (
		<img
			alt={code}
			src={`/images/flags/${code}.SVG`}
			style={{ height: size, width: size * 1.5, objectFit: "contain" }}
			loading="lazy"
			className="inline-block align-middle"
		/>
	);
}

export function ListingCard({ listing, country, category }: Props) {
	const total = listing.price + (listing.shipping ?? 0);

	return (
		<div className="relative flex flex-col md:flex-row cursor-pointer rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
			{/* Image section */}
			<div className="relative flex shrink-0 flex-col items-center p-2 pt-3" style={{ width: 144 }}>
				<Link href={`/browse/${country}/${category}/${listing.id}`}>
					<div className="relative overflow-hidden rounded-md bg-muted" style={{ width: 128, height: 128 }}>
						{listing.imageUrl && !listing.imageUrl.includes("placeholder") ? (
							<img
								alt={listing.title}
								src={listing.imageUrl}
								className="absolute inset-0 h-full w-full object-cover"
							/>
						) : (
							<div className="absolute inset-0 flex items-center justify-center bg-muted text-xs text-muted-foreground">
								No image
							</div>
						)}
					</div>
				</Link>
			</div>

			{/* Content section */}
			<div className="flex min-w-0 flex-1 flex-col justify-center py-2 pr-2">
				<h3 className="line-clamp-1 text-sm font-medium leading-tight">
					<Link
						href={`/browse/${country}/${category}/${listing.id}`}
						className="hover:underline"
					>
						{listing.title}
					</Link>
				</h3>

				{/* Price */}
				<div className="mt-1 flex flex-wrap items-baseline gap-1">
					<span className="text-base font-bold text-green-600">
						{listing.listingType === "Auction" && listing.bids === 0
							? "Starting bid"
							: `$${listing.price.toFixed(2)}`}
					</span>
					{listing.shipping !== null ? (
						<span className="text-xs text-muted-foreground">
							+${listing.shipping.toFixed(2)} ship
						</span>
					) : (
						<span className="text-xs text-green-600">Free shipping</span>
					)}
				</div>
				{listing.shipping !== null && (
					<div className="text-xs text-muted-foreground">${total.toFixed(2)} Total</div>
				)}

				{/* Badges */}
				<div className="mt-1 flex flex-wrap items-center gap-1.5">
					<ListingTypeBadge type={listing.listingType} />
					<span className="rounded px-2 py-0.5 text-xs font-medium bg-gray-100 border border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300">
						{listing.condition}
					</span>
					{listing.listingType === "Auction" && listing.bids !== undefined && (
						<span className="rounded px-2 py-0.5 text-xs font-medium bg-orange-100 border border-orange-300 text-orange-700">
							{listing.bids} bids
						</span>
					)}
				</div>

				{/* Location */}
				<div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
					<MapPin className="size-3" aria-hidden />
					<span>{listing.location}</span>
					<FlagImg code={listing.countryCode} />
				</div>
			</div>

			{/* Seller section */}
			<div className="flex w-full flex-col justify-between border-t bg-muted/30 p-2.5 md:w-48 md:shrink-0 md:border-l md:border-t-0">
				<div className="flex items-center justify-between gap-2">
					<Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
						<EyeOff className="size-3.5" aria-hidden />
					</Button>
					<TimeAgo minutes={listing.postedMinutesAgo} />
					<Button variant="ghost" size="icon" className="size-8">
						<Ellipsis className="size-4" aria-hidden />
					</Button>
				</div>

				<div className="mt-1">
					<div className="flex items-center gap-1">
						<FlagImg code={listing.seller.countryCode} size={14} />
						<span className="truncate text-xs font-medium">{listing.seller.username}</span>
					</div>
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<span className="flex items-center gap-0.5">
							📦 {formatFeedback(listing.seller.feedbackScore)}
						</span>
						<span>⭐ {listing.seller.feedbackPercent.toFixed(1)}%</span>
					</div>
				</div>

				<div className="mt-2 flex flex-col gap-1">
					<Button
						asChild
						variant="outline"
						className="h-7 w-full gap-1 border-blue-600 text-xs text-blue-600 hover:bg-blue-50"
					>
						<Link href={`/browse/${country}/${category}/${listing.id}`}>
							<Eye className="size-3" aria-hidden />
							View Details
						</Link>
					</Button>
					<Button asChild className="h-7 w-full gap-1 text-xs">
						<a href={listing.affiliateUrl} target="_blank" rel="noopener noreferrer">
							<ShoppingCart className="size-3" aria-hidden />
							Buy It Now
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}