import type { CollectionEntry } from "astro:content";
import fs from "fs";
import puppeteer from "puppeteer";
import { template } from "./template";

// only use one instance of puppeteer
// to keep build times down
const browser = await puppeteer.launch();
const page = await browser.newPage();

// set viewport size
await page.setViewport({
	width: 1200,
	height: 630,
	deviceScaleFactor: 1,
});

// template is just an HTML document as
// a string, fonts and profile picture
// are base64 encoded inline.
await page.setContent(template);
await page.waitForNetworkIdle();

const title = await page.$("#title");
const description = await page.$("#description");
const isProd = import.meta.env.PROD;

export async function generateBlogPostOgImage(post: CollectionEntry<"blog">) {
	console.time(`screenshot for ${post.slug}`);
	const filename = `${post.slug}.png`;
	// In prod, the public folder has already been copied to dist
	// so we need to use the dist folder instead.
	const path = `${isProd ? "dist" : "public"}/open-graph/`;

	await title?.evaluate((el, content) => {
		el.textContent = content;
	}, post.data.title);

	await description?.evaluate((el, content) => {
		if (content) {
			el.removeAttribute("hidden");
			el.textContent = content;
		} else {
			el.setAttribute("hidden", "true");
		}
	}, post.data.description);

	// ensure directory exists
	fs.mkdirSync(path, { recursive: true });

	await page.screenshot({
		path: `${path}${filename}`,
	});
	console.timeEnd(`screenshot for ${post.slug}`);
	console.log(`Created screenshot ${path}${filename}`);
}
