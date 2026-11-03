import rss from "@astrojs/rss";
import type { AstroUserConfig } from "astro";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import invariant from "tiny-invariant";
import { getPublishedBlogPosts } from "../../content/blog/_getPublishedBlogPosts";

export async function GET(context: AstroUserConfig) {
	invariant(
		context.site,
		"RSS feed requires 'site' metadata in astro.config.mjs",
	);
	const blog = await getPublishedBlogPosts();
	return rss({
		title: "Kevin Kipp's blog",
		description: "Kevin's blog — not his first, probably not his last.",
		stylesheet: "../pretty-feed-v3.xsl",
		site: context.site,
		items: await Promise.all(
			blog.map(async (post) => {
				invariant(post.body, `Blog post ${post.id} has no body`);
				return {
					title: post.data.title,
					pubDate: post.data.published,
					description: post.data.description,
					// Compute RSS link from post `id`
					// This example assumes all posts are rendered as `/blog/[slug]` routes
					link: `/blog/${post.id}/?utm_source=rss&utm_medium=feed`,
					content: sanitizeHtml(await marked.parse(post.body)),
				};
			}),
		),
	});
}
