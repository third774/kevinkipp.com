import { getCollection } from "astro:content";

const isProd = import.meta.env.PROD;

export const getPublishedBlogPosts = async () => {
	const blog = await getCollection("blog");
	return (
		blog
			.filter((blogPost) => {
				// if we're in dev mode, return all posts
				if (!isProd) return true;
				return (
					// file name doesn't start with -draft
					!blogPost.slug.startsWith("-draft") &&
					// and published date is in the past
					blogPost.data.published <= new Date()
				);
			})
			// sort by published date putting the most recent first
			.sort((a, b) => b.data.published.getTime() - a.data.published.getTime())
	);
};
