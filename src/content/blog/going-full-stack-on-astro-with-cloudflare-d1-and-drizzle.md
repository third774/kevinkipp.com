---
{
  "title": "Going full-stack on Astro with Cloudflare D1 and Drizzle",
  "description": "A step-by-step guide to adding a back-end to your Astro project using Cloudflare D1 and Drizzle ORM",
  "published": "2024-03-05T23:24:16-06:00",
}
---

I recently wrote about adding [/shared links](/shared) to my website, and
wanted to document how I went about setting it up for anyone who wants to
do the same!

## Installing Astro

This is pretty straightforward — running the following:

```sh
npm create astro@latest
```

1. Select `Empty` for the template
2. Opt-in to the strictest TypeScript
3. Defaults are fine for everything else

Then you can `cd` into your project and run `npm run dev`

## Adding Cloudflare adapter

In your project, you can now run:

```sh
npx astro add cloudflare
```

Say yes to everytyhing, then commit everything and push it up to Github.

## Deploying to Pages

Head over to the [Create Pages Application](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/pages)
page in the Cloudflare dashboard and click "Connect to git" to create a Pages
application using the Github repo.

**Be sure to select the Astro Framework preset!**

## Install wrangler and log in

If you haven't already done this, install `wrangler` and log in by running:

```sh
npm i -g wrangler
wrangler login
```

## Create D1 databases

We're going to create two databases, one for production, and one for preview builds.

To do this, run the following commands:

```sh
wrangler d1 create d1-demo-prod-db
wrangler d1 create d1-demo-preview-db
```

## Create `wrangler.toml` file

We're going to need a wrangler.toml file with the `database_id` from each of the databases
we just created.

```toml
node_compat = true

[[d1_databases]]
binding = "DB"
database_name = "d1-demo-prod-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
preview_database_id = "DB"

[env.preview]
name = "preview"
[[env.preview.d1_databases]]
binding = "DB"
database_name = "d1-demo-preview-db"
database_id = "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"
```

## Add `.wrangler` to `.gitignore`

```
echo .wrangler >> .gitignore
```

## Update `astro.config.ts`

We need to add the D1 binding like this:

```ts
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: cloudflare({
		runtime: {
			mode: "local",
			type: "pages",
			bindings: {
				DB: {
					type: "d1",
				},
			},
		},
	}),
});
```

## Install Drizzle dependencies

Run the following commands:

```sh
npm i drizzle-orm
npm i -D better-sqlite3 drizzle-kit cross-env @types/node
```

## Create `drizzle.config.ts`

As of this writing, there's an open issue for better support of drizzle-studio
with D1 projects, so we're going to use a [workaround](https://github.com/drizzle-team/drizzle-orm/discussions/1545#discussioncomment-8115423)
for now. This is what our `drizzle.config.ts` file will look like:

```ts
import type { Config } from "drizzle-kit";

const {
	LOCAL_DB_PATH,
	WRANGLER_CONFIG,
	DB_NAME = "d1-demo-prod-db",
} = process.env;

// Use better-sqlite driver for local development
export default LOCAL_DB_PATH
	? ({
			schema: "./src/schema.ts",
			driver: "better-sqlite",
			dbCredentials: {
				url: LOCAL_DB_PATH,
			},
		} satisfies Config)
	: ({
			schema: "./src/schema.ts",
			out: "./migrations",
			driver: "d1",
			dbCredentials: {
				wranglerConfigPath:
					new URL(
						"wrangler.toml",
						import.meta.url,
					).pathname +
					// This is a hack to inject additional cli flags to wrangler
					// since drizzle-kit doesn't support specifying environments
					WRANGLER_CONFIG
						? ` ${WRANGLER_CONFIG}`
						: "",
				dbName: DB_NAME,
			},
		} satisfies Config);
```

## Create your schema

Let's go ahead and create `src/schema.ts`

```ts
import { drizzle } from "drizzle-orm/d1";
import {
	integer,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const linkShare = sqliteTable(
	"linkShare",
	{
		id: integer("id").primaryKey({
			autoIncrement: true,
		}),
		url: text("url").notNull(),
		title: text("title").notNull(),
		remark: text("remark"),
		created: integer("created", {
			mode: "timestamp_ms",
		})
			.notNull()
			.$defaultFn(() => new Date()),
		modified: integer("modified", {
			mode: "timestamp_ms",
		})
			.notNull()
			.$defaultFn(() => new Date()),
		deleted: integer("deleted", {
			mode: "timestamp_ms",
		}),
	},
);
```

## Add scripts to `package.json`

Let's add the following scripts to our `package.json`'s `scripts`.

```json
{
	// ...
	"scripts": {
		"db:generate": "drizzle-kit generate:sqlite",
		"db:migrate:local": "wrangler d1 migrations apply d1-demo-prod-db --local",
		"db:migrate:prod": "wrangler d1 migrations apply d1-demo-prod-db",
		"db:migrate:preview": "wrangler d1 migrations apply --env preview d1-demo-preview-db",
		"db:studio:local": "cross-env LOCAL_DB_PATH=$(find .wrangler/state/v3/d1/miniflare-D1DatabaseObject -type f -name '*.sqlite' -print -quit) drizzle-kit studio",
		"db:studio:preview": "cross-env DB_NAME='d1-demo-preview-db' WRANGLER_CONFIG='--environment=preview' drizzle-kit studio",
		"db:studio:prod": "drizzle-kit studio"
		// ...
	}
	// ...
}
```

## Generate migrations

Now we're going to use Drizzle to generate the first migration to apply!

```sh
npm run db:generate
```

## Apply the migration locally

We will run

```sh
npm run db:migrate:local
```

This will apply the migration to our local database!

## Interact with local DB using Drizzle Studio

Now we can inspect the local database by running

```sh
npm run db:studio:local
```

Try inserting a row into the `linkShares` table adding only the `url` and `title`!

## Add DB to locals

In `env.d.ts`, we need to do this:

```ts
/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

type D1Database =
	import("@cloudflare/workers-types/experimental").D1Database;
type ENV = {
	DB: D1Database;
};

type Runtime =
	import("@astrojs/cloudflare").AdvancedRuntime<ENV>;

declare namespace App {
	interface Locals extends Runtime {}
}
```

## Render the links

In `src/pages/index.astro`, you can now query the D1 database:

```astro
---
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { linkShare } from "../schema";

const db = drizzle(
	Astro.locals.runtime.env.DB,
);

const links = await db
	.select()
	.from(linkShare)
	.orderBy(desc(linkShare.created));
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link
			rel="icon"
			type="image/svg+xml"
			href="/favicon.svg"
		/>
		<meta
			name="viewport"
			content="width=device-width"
		/>
		<meta
			name="generator"
			content={Astro.generator}
		/>
		<title>Astro</title>
	</head>
	<body>
		<h1>Shared Links</h1>
		<ul>
			{
				links.map((link) => (
					<li>
						<a href={link.url}>
							{link.title}
						</a>
					</li>
				))
			}
		</ul>
	</body>
</html>
```

At this point, you should be able to run the local dev server again:

```sh
npm run dev
```

## Add bindings in Pages project

1. In the Cloudflare dashboard, go to your [Pages projects](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
   and open your project.
2. Go to **Settings > Functions > D1 database bindings**
3. Under the "Production" tab, click "Add binding", and name it `DB`. Bind this to the `d1-demo-prod-db` database we created earlier.
4. Under the "Preview" tab, click "Add binding", and name it `DB`. Bind this to the `d1-demo-preview-db` database we created earlier.

## Run migrations for preview and prod

```sh
npm run db:migrate:preview
npm run db:migrate:prod
```

## Add data to preview and prod environments

Use Drizzle Studio again to populate some data in the preview environment by running:

```sh
npm run db:studio:preview
```

Then do the same for prod by running:

```sh
npm run db:studio:prod
```

## Commit and open a PR

It's time to test the preview build! Let's create a branch and push it up.

```sh
git checkout -b testing-preview-builds
git add .
git commit -m "D1 and Drizzle setup"
git push -u origin HEAD
```

The preview build should work! Go ahead and merge it, and prod should work too! 🎉

## That's all!

You can check out the completed code on [Github](https://github.com/third774/astro-d1-drizzle-demo).
