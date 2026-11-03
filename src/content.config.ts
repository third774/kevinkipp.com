import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
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
				updated: z
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
	loader: glob({ pattern: "**/*.json", base: "./src/content/wishes" }),
	schema: () =>
		z.object({
			title: z.string(),
			url: z.string().optional(),
			description: z.string().optional(),
			image: z.string().optional(),
			price: z.number().optional(),
		}),
});

const misc = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/misc" }),
});

export const collections = { blog, wishes, misc };
