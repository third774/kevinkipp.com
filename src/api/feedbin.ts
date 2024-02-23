const { FEEDBIN_EMAIL, FEEDBIN_PASSWORD } = import.meta.env;
const headers = {
	Authorization: `Basic ${btoa(`${FEEDBIN_EMAIL}:${FEEDBIN_PASSWORD}`)}`,
};

interface Subscription {
	id: number;
	created_at: string;
	feed_id: number;
	title: string;
	feed_url: string;
	site_url: string;
}

export async function getSubscriptions() {
	// fetch from feedbin api
	return fetch("https://api.feedbin.com/v2/subscriptions.json", {
		headers,
	}).then((response) => response.json() as Promise<Subscription[]>);
}
