import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://kevinkipp.com",
	integrations: [
		mdx(),
		sitemap(),
		tailwind({
			applyBaseStyles: false,
		}),
		robotsTxt(),
	],
	output: "hybrid",
	adapter: cloudflare(),
});
