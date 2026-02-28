// src/components/schema/SchemaViewer.tsx
"use client";

import { useState } from "react";
import { Code, ChevronDown, Copy, Check } from "lucide-react";
import { cn } from "~/lib/utils";

interface SchemaEntry {
	label: string;
	schema: Record<string, unknown>;
}

interface Props {
	schemas: SchemaEntry[];
}

export function SchemaViewer({ schemas }: Props) {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(0);
	const [copied, setCopied] = useState(false);

	const current = schemas[active]!;
	const json = JSON.stringify(current.schema, null, 2);

	function copy() {
		void navigator.clipboard.writeText(json);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}

	return (
		<div className="relative">
			<button
				onClick={() => setOpen((o) => !o)}
				className={cn(
					"flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
					open
						? "border-primary/40 bg-primary/5 text-primary"
						: "border-border bg-background text-muted-foreground hover:text-foreground hover:border-border/80"
				)}
			>
				<Code className="size-3.5" />
				JSON-LD
				<ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
			</button>

			{open && (
				<div className="absolute right-0 top-8 z-50 w-[480px] max-w-[90vw] overflow-hidden rounded-lg border bg-card shadow-lg">
					{/* Tab bar */}
					{schemas.length > 1 && (
						<div className="flex border-b bg-muted/30">
							{schemas.map((s, i) => (
								<button
									key={i}
									onClick={() => setActive(i)}
									className={cn(
										"px-3 py-2 text-xs font-medium transition-colors",
										active === i
											? "border-b-2 border-primary text-foreground -mb-px"
											: "text-muted-foreground hover:text-foreground"
									)}
								>
									{s.label}
								</button>
							))}
						</div>
					)}

					{/* Header */}
					<div className="flex items-center justify-between border-b px-3 py-2">
						<span className="text-xs text-muted-foreground font-mono">
							application/ld+json
						</span>
						<button
							onClick={copy}
							className="flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
						>
							{copied ? <Check className="size-3 text-green-500" /> : <Copy className="size-3" />}
							{copied ? "Copied" : "Copy"}
						</button>
					</div>

					{/* Code block */}
					<pre className="max-h-80 overflow-auto p-3 text-[11px] leading-relaxed font-mono text-foreground/90 bg-muted/20">
						<code>{json}</code>
					</pre>

					{/* Footer hint */}
					<div className="border-t bg-muted/30 px-3 py-2">
						<p className="text-[10px] text-muted-foreground">
							This schema is injected as{" "}
							<code className="font-mono bg-muted px-1 rounded">{"<script>"}</code>{" "}
							in {"<head>"}. PicClick has zero structured data. ✓
						</p>
					</div>
				</div>
			)}
		</div>
	);
}