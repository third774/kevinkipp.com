import { getCollection } from 'astro:content';

export const getPublishedBlogPosts = async () => {
	const blog = await getCollection('blog');
	return blog.filter((b) =>
		import.meta.env.PROD ? b.data.published > new Date(0) : true,
	);
};
