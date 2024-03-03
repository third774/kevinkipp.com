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

export async function generateOgImage(config: {
	pathname: string;
	title: string;
	description?: string;
}) {
	console.time(`screenshot for ${config.pathname}`);
	const filename = `og-image.png`;
	// In prod, the public folder has already been copied to dist
	// so we need to use the dist folder instead.
	const path = `${isProd ? "dist" : "public"}/open-graph${config.pathname}`;

	await title?.evaluate((el, content) => {
		el.textContent = content;
	}, config.title);

	await description?.evaluate((el, content) => {
		if (content) {
			el.removeAttribute("hidden");
			el.textContent = content;
		} else {
			el.setAttribute("hidden", "true");
		}
	}, config.description);

	// ensure directory exists
	fs.mkdirSync(path, { recursive: true });

	await page.screenshot({
		path: `${path}${filename}`,
	});
	console.timeEnd(`screenshot for ${config.pathname}`);
	console.log(`Created screenshot ${path}${filename}`);
}
