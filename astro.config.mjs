// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://kevinkipp.com",
  integrations: [mdx(), sitemap(), robotsTxt()],
  output: "static",

  adapter: cloudflare({
      platformProxy: {
          enabled: true,
      },
	}),

  markdown: {
      remarkPlugins: [remarkReadingTime],
	},

  vite: {
    plugins: [tailwindcss()],
  },
});