// src/app/catalog/_components/CompetitorGrid.tsx
import type { Competitor } from "~/data/catalog/competitors";
import { ExternalLink } from "lucide-react";

const TYPE_STYLES: Record<Competitor["type"], { label: string; className: string }> = {
	"pricing-db": { label: "Pricing DB", className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800" },
	"marketplace": { label: "Marketplace", className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800" },
	"aggregator": { label: "Aggregator", className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800" },
	"authentication": { label: "Authentication", className: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800" },
};

interface Props {
	competitors: Competitor[];
}

export function CompetitorGrid({ competitors }: Props) {
	if (!competitors.length) return null;

	return (
		<section className="mt-12 border-t pt-8">
			<div className="mb-4">
				<h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
					Market References
				</h2>
				<p className="mt-1 text-xs text-muted-foreground">
					Pricing data sources and comparable marketplaces used for this category.
				</p>
			</div>

			<div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
				{competitors.map((c) => {
					const badge = TYPE_STYLES[c.type];
					return (
						<a
							key={c.domain}
							href={c.url}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex flex-col gap-2 rounded-lg border bg-card p-4 transition hover:border-primary/40 hover:bg-muted/30"
						>
							<div className="flex items-start justify-between gap-2">
								<span className="font-medium text-sm group-hover:text-primary transition-colors">
									{c.name}
								</span>
								<ExternalLink className="size-3.5 shrink-0 mt-0.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
							</div>

							<span className="text-xs text-muted-foreground">{c.domain}</span>

							<p className="text-xs leading-relaxed text-muted-foreground">
								{c.description}
							</p>

							<span
								className={`mt-auto self-start rounded border px-2 py-0.5 text-[10px] font-medium ${badge.className}`}
							>
								{badge.label}
							</span>
						</a>
					);
				})}
			</div>
		</section>
	);
}