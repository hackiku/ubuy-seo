// src/components/browse/Breadcrumbs.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SchemaScript } from "~/components/browse/SchemaScript";
import { buildBreadcrumbSchema, type BreadcrumbItem } from "~/lib/seo/schema";
import { SchemaViewer } from "~/components/schema/SchemaViewer";

interface Props {
	crumbs: BreadcrumbItem[];
	/** Pass the page's full schema to show in the viewer dropdown */
	pageSchema?: Record<string, unknown>;
}

export function Breadcrumbs({ crumbs, pageSchema }: Props) {
	const breadcrumbSchema = buildBreadcrumbSchema(crumbs);

	return (
		<>
			<SchemaScript schema={breadcrumbSchema} />
			<div className="mb-4 flex items-center justify-between">
				{/* Breadcrumb trail */}
				<nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
					{crumbs.map((crumb, i) => {
						const isLast = i === crumbs.length - 1;
						return (
							<span key={i} className="flex items-center gap-1">
								{i > 0 && <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/50" />}
								{crumb.href && !isLast ? (
									<Link
										href={crumb.href}
										className="hover:text-foreground transition-colors"
									>
										{crumb.name}
									</Link>
								) : (
									<span className={isLast ? "text-foreground" : ""}>{crumb.name}</span>
								)}
							</span>
						);
					})}
				</nav>

				{/* Schema viewer toggle — only rendered if pageSchema provided */}
				{pageSchema && (
					<SchemaViewer
						schemas={[
							{ label: "BreadcrumbList", schema: breadcrumbSchema },
							{ label: "Page Schema", schema: pageSchema },
						]}
					/>
				)}
			</div>
		</>
	);
}