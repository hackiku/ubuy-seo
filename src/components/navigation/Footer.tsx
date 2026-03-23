// src/components/navigation/Footer.tsx
import Link from "next/link";
import { FOOTER_COLUMNS, FOOTER_TAGLINE } from "~/data/navigation";

export function Footer() {
	return (
		<footer className="mt-24 border-t bg-muted/30">
			<div className="mx-auto max-w-5xl px-4 py-12">

				{/* Top: logo + tagline + columns */}
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">

					{/* Brand column */}
					<div className="lg:col-span-1">
						<Link href="/" className="text-sm font-extrabold tracking-tight">
							<span className="text-primary">uBuy</span>First
						</Link>
						<p className="mt-3 text-xs leading-relaxed text-muted-foreground">
							{FOOTER_TAGLINE}
						</p>
						<p className="mt-3 text-[11px] text-muted-foreground/60">
							As an eBay Partner, we may be compensated if you make a purchase
							through our links.
						</p>
					</div>

					{/* Link columns */}
					{FOOTER_COLUMNS.map((col) => (
						<div key={col.heading}>
							<p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
								{col.heading}
							</p>
							<ul className="flex flex-col gap-2">
								{col.links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="text-xs text-muted-foreground transition hover:text-foreground"
											{...(link.href.startsWith("http")
												? { target: "_blank", rel: "noopener noreferrer" }
												: {})}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom bar */}
				<div className="mt-10 flex flex-col items-start justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center">
					<p className="text-xs text-muted-foreground">
						© {new Date().getFullYear()} uBuyFirst. All rights reserved.
					</p>
					<p className="text-xs text-muted-foreground">
						Not affiliated with eBay Inc.
					</p>
				</div>
			</div>
		</footer>
	);
}