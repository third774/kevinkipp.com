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

// Load profile picture into memory
const profilePicture = fs.readFileSync("src/assets/profile.jpg");

const base64ProfilePicture = Buffer.from(profilePicture).toString("base64");

const template = (props: { title: string; description?: string }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
	<meta charset="UTF-8">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Recursive:wght,CASL,CRSV@400,0,0.5;1000,0,0.5;1000,1,1&family=Noto+Color+Emoji&display=swap" rel="stylesheet">
		<style>
			:root {
				--surface: #2C2E36; 
				--foreground: #E1E3EE;
				--dim: #B7BAC4;
				font-family: 'Recursive', 'Noto Color Emoji', sans-serif;
				font-size: 2.25rem;
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
				font-weight: 500;
			}
		</style>
  </head>
  <body>
		<div class="grid">
			<div>
				<h1>${props.title}</h1>
				${
					props.description
						? `<p style="margin-top: 1em;" class="dim">${props.description}</p>`
						: ""
				}
			</div>
			<div style="display: flex; align-items: end;">
				<p class="name" style="opacity: .7; line-height: 1; margin-left: auto; margin-right: 1rem;">kevinkipp.com</p>
				<img style="display: block; border-radius: 35% 65% 60% 25% / 35% 20% 60% 65%; max-width: 3rem;" src="data:image/png;base64, ${base64ProfilePicture}" />
			</div>
		</div>
  </body>
`;

export async function generateBlogPostOgImage(post: CollectionEntry<"blog">) {
	const filename = `${post.slug}.png`;
	const path = `${isProd ? "dist" : "public"}/open-graph/`;

	// For prod builds if file exists, skip
	if (isProd && fs.existsSync(`${path}${filename}`)) {
		return;
	}

	await page.setContent(template(post.data));
	// await page.setContent(
	// 	template({
	// 		title: "Attention he extremity unwilling on otherwise. Conviction up",
	// 		description:
	// 			"Prepared do an dissuade be so whatever steepest. Yet her beyond looked either day wished nay. By doubtful disposed do no",
	// 	}),
	// );
	await page.waitForNetworkIdle();

	// ensure directory exists
	fs.mkdirSync(path, { recursive: true });

	await page.screenshot({
		path: `${path}${filename}`,
	});
	console.log(`Created screenshot ${path}${filename}`);
}
