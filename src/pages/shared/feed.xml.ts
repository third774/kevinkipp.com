import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { desc } from "drizzle-orm";
import invariant from "tiny-invariant";
import { getDb, linkShare } from "../../schema";

export const prerender = false;

export const GET: APIRoute = async (context) => {
	invariant(
		context.site,
		"RSS feed requires 'site' metadata in astro.config.mjs",
	);
	const data = await getDb(context.locals)
		.select()
		.from(linkShare)
		.orderBy(desc(linkShare.created))
		.limit(1000);

	const response = await rss({
		title: "Kevin Kipp links",
		description: "Links Kevin thought were worth sharing",
		stylesheet: "../pretty-feed-v3.xsl",
		site: context.site,
		items: await Promise.all(
			data.map(async (share) => ({
				title: share.title,
				pubDate: share.created,
				description: share.remark ?? undefined,
				// Compute RSS link from post `slug`
				// This example assumes all posts are rendered as `/blog/[slug]` routes
				link: share.url,
			})),
		),
	});

	response.headers.set("Cache-Control", "public, max-age=60, s-maxage=60");

	return response;
};
