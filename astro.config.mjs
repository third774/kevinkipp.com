// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://kevinkipp.com",
	integrations: [mdx(), sitemap()],
	output: "static",

	adapter: cloudflare({
		imageService: "compile",
	}),

	vite: {
		plugins: [tailwindcss()],
	},
});
