// src/components/navigation/Nav.tsx
"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ModeToggle } from "~/components/ui/mode-toggle";
import {
	BROWSE_DROPDOWN,
	LOTS_DROPDOWN,
	type NavGroup,
} from "~/data/navigation";

const BADGE_STYLES = {
	live: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
	soon: "bg-muted text-muted-foreground border-border",
	new: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
};

function Badge({ type }: { type: "live" | "soon" | "new" }) {
	return (
		<span className={`rounded-full border px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide ${BADGE_STYLES[type]}`}>
			{type}
		</span>
	);
}

function Dropdown({ groups, onClose }: { groups: NavGroup[]; onClose: () => void }) {
	return (
		<div className="absolute left-0 top-full z-50 mt-1 min-w-[480px] rounded-xl border bg-popover shadow-xl">
			<div className="flex gap-0 divide-x divide-border">
				{groups.map((group) => (
					<div key={group.label} className="flex-1 p-4">
						<p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
							{group.label}
						</p>
						<div className="flex flex-col gap-1">
							{group.items.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									onClick={onClose}
									className="group flex items-start gap-2 rounded-lg px-2 py-2 transition hover:bg-muted"
								>
									<div className="min-w-0 flex-1">
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium group-hover:text-primary">
												{item.label}
											</span>
											{item.badge && <Badge type={item.badge} />}
										</div>
										{item.description && (
											<p className="mt-0.5 text-xs text-muted-foreground">
												{item.description}
											</p>
										)}
									</div>
								</Link>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function NavDropdownItem({
	label,
	groups,
}: {
	label: string;
	groups: NavGroup[];
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handler(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	return (
		<div ref={ref} className="relative">
			<button
				onClick={() => setOpen((v) => !v)}
				className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-foreground"
				aria-expanded={open}
			>
				{label}
				<ChevronDown
					className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
				/>
			</button>
			{open && <Dropdown groups={groups} onClose={() => setOpen(false)} />}
		</div>
	);
}

export default function Nav() {
	return (
		<nav className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
			<div className="mx-auto flex h-14 max-w-5xl items-center gap-1 px-4">
				{/* Logo */}
				<Link
					href="/"
					className="mr-4 flex items-center gap-2 text-sm font-extrabold tracking-tight"
				>
					<span className="text-primary">uBuy</span>
					<span>First</span>
				</Link>

				{/* Nav items */}
				<NavDropdownItem label="Browse" groups={BROWSE_DROPDOWN} />
				<NavDropdownItem label="Lots" groups={LOTS_DROPDOWN} />

				{/* Right side */}
				<div className="ml-auto flex items-center gap-2">
					<ModeToggle />
					<Link
						href="https://app.ubuyfirst.com/signin"
						className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-foreground"
					>
						Sign in
					</Link>
					<Link
						href="https://app.ubuyfirst.com/signup"
						className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
					>
						Get started
					</Link>
				</div>
			</div>
		</nav>
	);
}