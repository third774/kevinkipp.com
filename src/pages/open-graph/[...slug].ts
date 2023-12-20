import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import fs from "fs";
import puppeteer from "puppeteer";
import { getPublishedBlogPosts } from "../../content/blog/_getPublishedBlogPosts";

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

const template = (props: { title: string; description?: string }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
	<meta charset="UTF-8">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Recursive:wght,CASL,CRSV@400,0,0.5;1000,0,0.5;1000,1,1&display=swap" rel="stylesheet">
		<style>
			:root {
				--surface: #2C2E36; 
				--foreground: #E1E3EE;
				--dim: #B7BAC4;
				font-family: 'Recursive', sans-serif;
				font-size: 2.5rem;
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
				font-size: 2rem;
				font-weight: 1000;
				text-wrap: balance;
				line-height: 1;
				font-variation-settings:
					"CRSV" 1,
					"CASL" 1;
				margin: 0;
			}

			p {
				padding-top: 1em;
				text-wrap: pretty;
			}

			.dim {
				color: var(--dim);
			}

			.grid {
				padding: 1rem;
				display: grid;
				align-content: center;
			}
		</style>
  </head>
  <body>
		<div class="grid">
			<h1>${props.title}</h1>
			${props.description ? `<p class="dim">${props.description}</p>` : ""}
		</div>
  </body>
`;

export async function getStaticPaths() {
	const posts = await getPublishedBlogPosts();

	let results = [];
	for (const post of posts) {
		await generateScreenshot(post);
		results.push({
			params: { slug: post.slug },
			props: post,
		});
	}
	await browser.close();
	return results;
}

async function generateScreenshot(post: CollectionEntry<"blog">) {
	await page.setContent(template(post.data));
	await page.waitForNetworkIdle();

	const filename = `${post.slug}.png`;
	const path = `${isProd ? "dist" : "public"}/open-graph/`;

	// ensure directory exists
	fs.mkdirSync(path, { recursive: true });

	await page.screenshot({
		path: `${path}${filename}`,
	});
	console.log(`Created screenshot ${path}${filename}`);
}

export const GET: APIRoute = ({ request, params: { slug } }) => {
	return new Response(null, {
		status: 302,
		headers: {
			location: slug ? `/open-graph/${slug.replace(/\/$/, "")}.png` : "/",
		},
	});
};
