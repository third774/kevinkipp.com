import rss from "@astrojs/rss";
import type { AstroUserConfig } from "astro/config";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import invariant from "tiny-invariant";
import { getPublishedBlogPosts } from "../../content/blog/_getPublishedBlogPosts";
const parser = new MarkdownIt();

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
			content: sanitizeHtml(parser.render(post.body)),
		})),
	});
}
