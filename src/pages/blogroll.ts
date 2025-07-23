export const prerender = false;

// sup

export async function GET() {
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/follows",
		},
	});
}
