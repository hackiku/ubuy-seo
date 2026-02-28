// src/app/images/page.tsx

import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";

export default async function ImagesPage() {

	const robots = `User-agent: *
Disallow: /d/w1600/pict/
Disallow: /*_57.jpg$
Disallow: /images/g/`

	
	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center justify-center bg-background">
				
				
			</main>
		</HydrateClient>
	);
}
