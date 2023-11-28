import { getCollection } from "astro:content";

export const getPublishedBlogPosts = async () => {
	const blog = await getCollection("blog");
	return (
		blog
			.filter((blogPost) =>
				import.meta.env.PROD ? blogPost.data.published > new Date(0) : true,
			)
			// sort by published date putting the most recent first
			.sort((a, b) => b.data.published.getTime() - a.data.published.getTime())
	);
};
