interface Subscription {
	id: number;
	created_at: string;
	feed_id: number;
	title: string;
	feed_url: string;
	site_url: string;
}

const subscriptionsApiUrl = "https://api.feedbin.com/v2/subscriptions.json";

export async function getSubscriptions({
	runtime: { env, caches },
}: App.Locals) {
	const cache = await caches.open("feedbin:subscriptions");
	const { FEEDBIN_EMAIL, FEEDBIN_PASSWORD } = env;
	const headers = {
		Authorization: `Basic ${btoa(`${FEEDBIN_EMAIL}:${FEEDBIN_PASSWORD}`)}`,
	};
	// fetch from feedbin api
	const request = new Request(subscriptionsApiUrl, {
		headers,
	});

	const match = await cache.match(subscriptionsApiUrl, {
		ignoreMethod: true,
	});
	const response: Response = (match ??
		(await fetch(request).then((res) => {
			console.log("Fetched subscriptions from feedbin");
			return res;
		}))) as any;

	if (!match) {
		const cachedResponse = new Response(await response.clone().text(), {
			headers: new Headers([...response.headers]),
		});
		cachedResponse.headers.set("Cache-Control", "max-age=180, public");
		await cache.put(subscriptionsApiUrl, cachedResponse as any);
	}

	const subscriptions: Subscription[] = await response.json();
	return subscriptions;
}
