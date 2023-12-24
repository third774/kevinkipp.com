import type { CollectionEntry } from "astro:content";
import fs from "fs";
import puppeteer from "puppeteer";

const isProd = import.meta.env.PROD;

// generate screenshot for each post
const browser = await puppeteer.launch();
const page = await browser.newPage();

// set viewport size
await page.setViewport({
	width: 1200,
	height: 630,
	deviceScaleFactor: 1,
});

const base64ProfilePicture = fs.readFileSync("src/assets/profile.jpg", {
	encoding: "base64",
});

const base64RecursiveFont = fs.readFileSync("public/fonts/recursive.woff2", {
	encoding: "base64",
});

const base64EmojiFont = fs.readFileSync(
	"public/fonts/NotoColorEmoji-Regular.ttf",
	{
		encoding: "base64",
	},
);

const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
	<meta charset="UTF-8">
		<style>
			@font-face {
				font-family: 'Recursive';
				src: url(data:font/ttf;charset=utf-8;base64,${base64RecursiveFont}) format('truetype');
				font-weight: 300 1000;
			}

			@font-face {
				font-family: 'Noto Color Emoji';
				src: url(data:font/ttf;charset=utf-8;base64,${base64EmojiFont}) format('truetype');
				font-weight: 400;
			}

			:root {
				--surface: #2C2E36; 
				--foreground: #E1E3EE;
				--dim: #B7BAC4;
				font-family: 'Recursive', 'Noto Color Emoji', sans-serif;
				font-size: 2.25rem;
				font-weight: 500;
				line-height: 1.5;
			}

			* {
				margin: 0;
				box-sizing: border-box;
			}

			body {
				background-color: var(--surface);
				color: var(--foreground);
			}

			html, body, .grid {
				height: 630px;
			}

			h1 {
				font-size: 1.75rem;
				font-weight: 1000;
				text-wrap: balance;
				line-height: 1;
				font-variation-settings:
					"CRSV" 1,
					"CASL" 1;
				margin: 0;
			}

			p {
				text-wrap: pretty;
			}

			.dim {
				color: var(--dim);
			}

			.grid {
				padding: 2rem;
				display: grid;
				align-content: space-between;
			}

			.name {
				text-decoration: underline;
				text-decoration-color: oklch(.744141 .151562 340 / 1);
				text-underline-offset: 4px;
			}
		</style>
  </head>
  <body>
		<div class="grid">
			<div>
				<h1 id="title"></h1>
				<p style="margin-top: 1em;" id="description" class="dim"></p>
			</div>
			<div style="display: flex; align-items: end;">
				<p class="name" style="opacity: .7; line-height: 1; margin-left: auto; margin-right: 1rem;">kevinkipp.com</p>
				<img style="display: block; border-radius: 35% 65% 60% 25% / 35% 20% 60% 65%; max-width: 3rem;" src="data:image/png;base64, ${base64ProfilePicture}" />
			</div>
		</div>
  </body>
`;

await page.setContent(template);
await page.waitForNetworkIdle();
const title = await page.$("#title");
const description = await page.$("#description");

export async function generateBlogPostOgImage(post: CollectionEntry<"blog">) {
	const filename = `${post.slug}.png`;
	const path = `${isProd ? "dist" : "public"}/open-graph/`;

	// For prod builds if file exists, skip
	if (isProd && fs.existsSync(`${path}${filename}`)) {
		return;
	}

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
	console.log(`Created screenshot ${path}${filename}`);
}
