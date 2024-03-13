import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z
			.object({
				title: z.string().max(60),
				description: z.string().max(120).optional(),
				// Transform string to Date object
				published: z
					.string()
					.optional()
					.or(z.date())
					.transform((val) => new Date(val ?? 0)),
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

const wishes = defineCollection({
	type: "data",
	// Type-check frontmatter using a schema
	schema: () =>
		z.object({
			title: z.string(),
			url: z.string().optional(),
			description: z.string().optional(),
			image: z.string().optional(),
			price: z.number().optional(),
		}),
});

export const collections = { blog, wishes };
