import rss from "@astrojs/rss";
import type { AstroUserConfig } from "astro/config";
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
		site: context.site,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.published,
			description: post.data.description,
			// Compute RSS link from post `slug`
			// This example assumes all posts are rendered as `/blog/[slug]` routes
			link: `/blog/${post.slug}/`,
			content: sanitizeHtml(marked.parse(post.body)),
		})),
	});
}
