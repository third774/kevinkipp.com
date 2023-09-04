import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z
			.object({
				title: z.string().max(60),
				description: z.string().max(120),
				// Transform string to Date object
				pubDate: z
					.string()
					.or(z.date())
					.transform((val) => new Date(val)),
				updatedDate: z
					.string()
					.optional()
					.transform((str) => (str ? new Date(str) : undefined)),
				heroImage: image().optional(),
				heroAlt: z.string().optional(),
			})
			.refine((data) => {
				if (!data.heroImage) return true;
				return data.heroAlt !== undefined;
			}),
});

export const collections = { blog };
