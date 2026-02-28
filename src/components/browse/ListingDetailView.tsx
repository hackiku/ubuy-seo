// src/app/browse/_components/ListingDetailView.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import {
	Clock,
	ChevronLeft,
	ChevronRight,
	Expand,
	ShoppingCart,
	ExternalLink,
	ThumbsDown,
	Store,
	Check,
	ThumbsUp,
	EyeOff,
} from "lucide-react";
import type { Listing } from "~/data/mock/listings";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function FlagImg({ code, size = 12 }: { code: string; size?: number }) {
	return (
		<img
			alt={code}
			src={`/images/flags/${code}.SVG`}
			style={{ height: size, width: size * 1.5, objectFit: "contain" }}
			loading="lazy"
			className="inline-block align-middle shrink-0"
		/>
	);
}

function formatFeedback(score: number): string {
	if (score >= 1000) return `${(score / 1000).toFixed(score >= 10000 ? 0 : 1)}K`;
	return score.toString();
}

function TimeAgo({ minutes }: { minutes: number }) {
	const label = minutes < 60 ? `${minutes}m ago` : `${Math.floor(minutes / 60)}h ago`;
	return (
		<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
			<Clock className="size-4" aria-hidden />
			<span>{label}</span>
		</div>
	);
}

interface Props {
	listing: Listing;
}

export function ListingDetailView({ listing }: Props) {
	const [activeImage, setActiveImage] = useState(0);
	const images = listing.images.length > 0 ? listing.images : [listing.imageUrl];
	const hasRealImages = listing.imageUrl && !listing.imageUrl.includes("placeholder");
	const total = listing.price + (listing.shipping ?? 0);

	const prevImage = () => setActiveImage((i) => (i - 1 + images.length) % images.length);
	const nextImage = () => setActiveImage((i) => (i + 1) % images.length);

	return (
		<div className="flex flex-col overflow-hidden rounded-lg border bg-background shadow-lg md:flex-row md:max-h-[85vh]">
			{/* Left: Images + title + price */}
			<div className="w-full shrink-0 px-4 py-4 md:w-[45%] md:overflow-y-auto md:border-r">
				{/* Image viewer */}
				<div
					className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg bg-muted"
					tabIndex={0}
				>
					{hasRealImages ? (
						<img
							alt={listing.title}
							src={images[activeImage]}
							className="absolute inset-0 size-full object-contain"
						/>
					) : (
						<div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
							Image unavailable
						</div>
					)}

					{images.length > 1 && (
						<>
							<button
								onClick={prevImage}
								className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-md bg-white/90 flex items-center justify-center shadow-sm hover:bg-white"
								aria-label="Previous image"
							>
								<ChevronLeft className="size-4" />
							</button>
							<button
								onClick={nextImage}
								className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-md bg-white/90 flex items-center justify-center shadow-sm hover:bg-white"
								aria-label="Next image"
							>
								<ChevronRight className="size-4" />
							</button>
							<div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
								{activeImage + 1} / {images.length}
							</div>
						</>
					)}

					<button
						className="absolute right-2 top-2 size-8 rounded-md bg-white/90 flex items-center justify-center shadow-sm hover:bg-white"
						aria-label="Expand image"
					>
						<Expand className="size-4" />
					</button>
				</div>

				{/* Thumbnails */}
				{images.length > 1 && (
					<div className="mt-3 flex gap-1.5 overflow-x-auto">
						{images.map((img, i) => (
							<button
								key={i}
								onClick={() => setActiveImage(i)}
								className={cn(
									"relative size-12 flex-shrink-0 overflow-hidden rounded border-2 transition-colors",
									activeImage === i ? "border-primary" : "border-transparent hover:border-muted-foreground/50"
								)}
								aria-label={`View image ${i + 1}`}
							>
								<img
									alt={`Thumbnail ${i + 1}`}
									src={img}
									className="absolute inset-0 size-full object-cover"
								/>
							</button>
						))}
					</div>
				)}

				{/* Title */}
				<h2 className="mt-4 text-lg font-semibold leading-tight">{listing.title}</h2>

				{/* Price */}
				<div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
					<span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
					<span className="text-sm text-muted-foreground">
						(${listing.price.toFixed(2)}
						{listing.shipping !== null
							? ` + $${listing.shipping.toFixed(2)} ship`
							: " + free shipping"}
						)
					</span>
				</div>

				{/* Specs grid */}
				<div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-3">
					<div>
						<div className="text-xs text-muted-foreground">Condition</div>
						<div className="font-medium">{listing.condition}</div>
					</div>
					<div>
						<div className="text-xs text-muted-foreground">Listing Type</div>
						<div className="font-medium">
							{listing.listingType === "BIN"
								? "Buy It Now"
								: listing.listingType === "Auction"
									? `Auction · ${listing.bids ?? 0} bids`
									: "Best Offer"}
						</div>
					</div>
					<div>
						<div className="text-xs text-muted-foreground">Location</div>
						<div className="font-medium flex items-center gap-1">
							{listing.location}{" "}
							<FlagImg code={listing.countryCode} size={14} />
						</div>
					</div>
					<div>
						<div className="text-xs text-muted-foreground">Shipping</div>
						<div className="font-medium">
							{listing.shipping === null ? "Free" : `$${listing.shipping.toFixed(2)}`}
						</div>
					</div>
				</div>

				{/* Seller */}
				<div className="mt-4 border-t px-0 py-3">
					<div className="text-xs text-muted-foreground">Seller</div>
					<div className="mt-1 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="font-medium">{listing.seller.username}</span>
							<Button
								variant="ghost"
								size="icon"
								className="size-7 text-muted-foreground hover:text-blue-600"
								title="View seller's other items"
							>
								<Store className="size-4" aria-hidden />
							</Button>
						</div>
						<span className="flex items-center gap-3 text-sm text-muted-foreground">
							<span className="flex items-center gap-1">
								<Check className="size-3" />
								{formatFeedback(listing.seller.feedbackScore)}
							</span>
							<span className="flex items-center gap-1">
								<ThumbsUp className="size-3" />
								{listing.seller.feedbackPercent.toFixed(1)}%
							</span>
						</span>
					</div>
				</div>
			</div>

			{/* Right: Description + CTAs */}
			<div className="flex w-full flex-col md:w-[55%]">
				{/* Header row */}
				<div className="flex items-center justify-between border-b px-4 py-3">
					<div className="flex items-center gap-3">
						<TimeAgo minutes={listing.postedMinutesAgo} />
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7 text-muted-foreground"
						>
							<EyeOff className="size-3.5" aria-hidden />
						</Button>
					</div>
				</div>

				{/* Description iframe placeholder */}
				<div className="flex flex-1 flex-col overflow-hidden p-4">
					<div className="flex min-h-0 flex-1 flex-col">
						<h3 className="mb-2 text-sm font-medium">Item Description</h3>
						<div className="relative flex-1 overflow-hidden rounded-lg border bg-muted/30">
							<div className="flex h-full min-h-[200px] items-center justify-center text-sm text-muted-foreground">
								<div className="text-center">
									<p>Description loads from eBay</p>
									<p className="text-xs mt-1 opacity-60">
										iframe: itm.ebaydesc.com/{listing.ebayItemId}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* CTAs */}
				<div className="border-t p-4">
					<div className="flex flex-col gap-2">
						<div className="flex gap-2">
							<Button
								asChild
								className="flex-1 bg-green-600 hover:bg-green-700"
							>
								<a
									href={listing.affiliateUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<ShoppingCart className="mr-2 size-4" aria-hidden />
									Go to Checkout
								</a>
							</Button>
						</div>
						<Button asChild variant="outline">
							<a
								href={`https://www.ebay.com/itm/${listing.ebayItemId}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<ExternalLink className="mr-2 size-4" aria-hidden />
								View on eBay
							</a>
						</Button>
						<Button
							variant="ghost"
							className="text-muted-foreground hover:text-destructive"
						>
							<ThumbsDown className="mr-2 size-4" aria-hidden />
							Not Interested
							<span className="ml-1 text-xs opacity-70">(double-click)</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}