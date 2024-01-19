import { CALCOM_30_MINUTES_LINK } from "../consts";

export const prerender = false;

export async function GET() {
	return new Response(null, {
		status: 302,
		headers: {
			Location: CALCOM_30_MINUTES_LINK,
		},
	});
}
