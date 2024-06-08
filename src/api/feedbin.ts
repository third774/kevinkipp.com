interface Subscription {
	id: number;
	created_at: string;
	feed_id: number;
	title: string;
	feed_url: string;
	site_url: string;
}

const subscriptionsApiUrl = "https://api.feedbin.com/v2/subscriptions.json";
const cacheKey = "feedbin:subscriptions";

export async function getSubscriptions({ runtime: { env } }: App.Locals) {
	const { FEEDBIN_EMAIL, FEEDBIN_PASSWORD, KV_API_CACHE } = env;
	const cachedSubscriptions = await KV_API_CACHE.get(cacheKey);

	if (cachedSubscriptions) {
		return JSON.parse(cachedSubscriptions);
	}

	const headers = {
		Authorization: `Basic ${btoa(`${FEEDBIN_EMAIL}:${FEEDBIN_PASSWORD}`)}`,
	};

	// fetch from feedbin api
	const response = await fetch(subscriptionsApiUrl, {
		headers,
	});

	const subscriptions: Subscription[] = await response.json();

	await KV_API_CACHE.put(cacheKey, JSON.stringify(subscriptions), {
		// 1 day
		expirationTtl: 86400,
	});

	return subscriptions;
}
