import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import { defineConfig, envField } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
	site: "https://kevinkipp.com",
	vite: {
		plugins: [tailwindcss()],
	},
	experimental: {
		env: {
			schema: {
				FEEDBIN_EMAIL: envField.string({ access: "secret", context: "server" }),
				FEEDBIN_PASSWORD: envField.string({
					access: "secret",
					context: "server",
				}),
				API_TOKEN: envField.string({ access: "secret", context: "server" }),
				BSKY_LOGIN: envField.string({
					access: "secret",
					context: "server",
					optional: true,
				}),
				BSKY_PASSWORD: envField.string({
					access: "secret",
					context: "server",
					optional: true,
				}),
			},
		},
	},
	integrations: [mdx(), sitemap(), robotsTxt()],
	output: "hybrid",
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
});
