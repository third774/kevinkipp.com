---
{
  'title': 'QR code doorbells',
  'description': 'How to hack together a QR doorbell with Discord, Remix, and Cloudflare Workers',
  'heroImage': '../../assets/door-knocker.jpg',
  'pubDate': '2023-09-08T23:55:28-05:00',
  'heroAlt': 'An old door knocker in the shape of a lion holding a ring in its mouth',
}
---

## The problem

The [Austin JavaScript Meetup](https://austinjavascript.com/) is hosted at Cloudflare, where there
are pretty strict policies requiring that the doors not be held open. This means we need one of the
organizers to let people in as they arrive and usher them to the space where we hold the Meetup —
which is fine except that once the talk starts we need to either stop letting people in, or someone
needs to hang out by the door for a bit and miss a chunk of the talk.

## Whipping up a digital doorbell 👨🏻‍🍳

The first iteration of this was hacked together in about 15 minutes — we'll walk through the quick
and dirty way this was thrown together step by step, and save a walkthrough of the [proper improved
version](https://github.com/third774/austinjs-knock-knock) for another post.

Run the following to create the project, and select Cloudflare Workers as the deploy target:

```sh
npx create-remix@latest
```

Open the project in the editor of your choice and run the following to start up the dev server:

```sh
npm run dev
```

Open `app/routes/_index.tsx`. We're going to add a message here telling people that the doorbell
has been rung.

```tsx
export default function Index() {
	return <h1>Someone is on the way to let you in!</h1>;
}
```

Next we need to add a [loader](https://remix.run/docs/en/1.19.3/route/loader) that will post a
message to a Discord Channel. First let's create a [webhook within Discord](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) so we have a URL to send a URL to post the message to. It should look _something_ like this:

```
https://discord.com/api/webhooks/NUMS/RANDOM_NUMS_AND_CHARS
```

Then we can update `app/routes/_index.tsx` with the loader:

```tsx
const webhookUrl =
	'https://discord.com/api/webhooks/NUMS/RANDOM_NUMS_AND_CHARS';

export const loader = async () => {
	const time = new Date().toLocaleTimeString('en-US', {
		timeZone: 'America/Chicago',
	});
	await fetch(webhookUrl, {
		method: 'post',
		body: JSON.stringify({
			content: `Someone is at the door: ${time}`,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return null;
};

export default function Index() {
	return <h1>Someone is on the way to let you in!</h1>;
}
```

Let's deploy it! Make sure you're already logged in with `wrangler`

```sh
npx wrangler whoami
```

If you're not logged in, log in with:

```sh
npx wrangler login
```

Now deploy!

```sh
npm run deploy
```

Visiting the URL should post a message to your Discord webhook! Almost done!

Let's head over to 10015.io for their [QR code generator](https://10015.io/tools/qr-code-generator).
Paste in the URL of the freshly deployed worker to generate one. Now we just need to print it out on
a piece of paper with instructions to scan to page us to let you in!
