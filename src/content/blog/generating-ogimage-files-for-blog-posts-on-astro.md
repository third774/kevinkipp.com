---
{
  "title": "Automatic og:image files for blog posts",
  "description": "How to generate images for an Astro blog using Puppeteer",
  "published": "2023-12-24T21:00:31-06:00",
}
---

I wanted to add some nice `og:image` files for my blog posts, but in the spirit of
[minimizing friction to posting](../minimizing-friction-to-posting/)
I wanted to automate the process so that I'm not making things any harder for myself.

```ts
import type { CollectionEntry } from "astro:content";
import fs from "fs";
import puppeteer from "puppeteer";
import { template } from "./template";

// only use one instance of puppeteer
// to keep build times down
const browser =
	await puppeteer.launch();
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
const description = await page.$(
	"#description",
);
const isProd = import.meta.env.PROD;

export async function generateBlogPostOgImage(
	post: CollectionEntry<"blog">,
) {
	console.time(
		`screenshot for ${post.slug}`,
	);
	const filename = `${post.slug}.png`;
	// In prod, the public folder has already been copied to dist
	// so we need to use the dist folder instead.
	const path = `${
		isProd ? "dist" : "public"
	}/open-graph/`;

	await title?.evaluate(
		(el, content) => {
			el.textContent = content;
		},
		post.data.title,
	);

	await description?.evaluate(
		(el, content) => {
			if (content) {
				el.removeAttribute("hidden");
				el.textContent = content;
			} else {
				el.setAttribute(
					"hidden",
					"true",
				);
			}
		},
		post.data.description,
	);

	// ensure directory exists
	fs.mkdirSync(path, {
		recursive: true,
	});

	await page.screenshot({
		path: `${path}${filename}`,
	});
	console.timeEnd(
		`screenshot for ${post.slug}`,
	);
	console.log(
		`Created screenshot ${path}${filename}`,
	);
}
```

Then in `src/pages/blog/[...slug].astro` we just use `generateBlogPostOgImage` to generate the image for each post!

```ts
---
import { type CollectionEntry } from "astro:content";
import { getPublishedBlogPosts } from "../../content/blog/_getPublishedBlogPosts";
import BlogPost from "../../layouts/BlogPost.astro";
import { generateBlogPostOgImage } from "../../utils/ogImages/generateBlogPostOgImage";

interface Props {
	post: CollectionEntry<"blog">;
}

export async function getStaticPaths() {
	const posts = await getPublishedBlogPosts();
	return posts.map((post) => ({
		params: { slug: post.slug },
		props: { post },
	}));
}

const { post } = Astro.props;
const { Content, remarkPluginFrontmatter } = await post.render();
await generateBlogPostOgImage(post);
---

<BlogPost minutesRead={remarkPluginFrontmatter.minutesRead} post={post}>
	<Content />
</BlogPost>
```

That's all there is to it — and it produces the image below!

<img alt="Image preview of this blog post" src="/open-graph/generating-ogimage-files-for-blog-posts-on-astro.png" style="border: .25rem solid white;" />
