import { MASTODON_PROFILE } from "../consts";

export const prerender = false;

export async function GET() {
	return new Response(null, {
		status: 302,
		headers: {
			Location: MASTODON_PROFILE,
		},
	});
}
