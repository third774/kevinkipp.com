import type { APIRoute, AstroCookies } from "astro";
import { z } from "astro/zod";
import { API_TOKEN } from "astro:env/server";
import { getDb, linkShare } from "../../../schema";

export const prerender = false;

const apiSchema = z.object({
	url: z.string(),
	title: z.string(),
	remark: z.string().optional(),
});

const hasEditPermission = ({
	cookies,
	request,
}: {
	request: Request;
	cookies: AstroCookies;
}) => {
	if (cookies.get("api_token")?.value === API_TOKEN) {
		return true;
	}
	if (
		API_TOKEN === request.headers.get("Authorization")?.replace("Bearer ", "")
	) {
		return true;
	}

	return false;
};

export const POST: APIRoute = async (Astro) => {
	if (!hasEditPermission(Astro)) {
		return new Response(null, { status: 401 });
	}

	const result = await apiSchema.safeParseAsync(Astro.request.json());

	if (result.data) {
		await getDb(Astro.locals).insert(linkShare).values(result.data);
		return new Response(null, {
			status: 200,
		});
	} else {
		return new Response(null, {
			status: 400,
		});
	}
};
