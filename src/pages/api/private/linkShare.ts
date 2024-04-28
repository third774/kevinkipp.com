import type { APIRoute, AstroCookies } from "astro";
import { object, optional, safeParse, string } from "valibot";
import { getDb, linkShare } from "../../../schema";

export const prerender = false;

const apiSchema = object({
  url: string(),
  title: string(),
  remark: optional(string()),
});

const hasEditPermission = ({
  cookies,
  locals,
  request,
}: {
  request: Request;
  cookies: AstroCookies;
  locals: App.Locals;
}) => {
  if (cookies.get("api_token")?.value === locals.runtime.env.API_TOKEN) {
    return true;
  }
  if (
    locals.runtime.env.API_TOKEN ===
    request.headers.get("Authorization")?.replace("Bearer ", "")
  ) {
    return true;
  }

  return false;
};

export const POST: APIRoute = async (Astro) => {
  if (!hasEditPermission(Astro)) {
    return new Response(null, { status: 401 });
  }

  const result = safeParse(apiSchema, await Astro.request.json());

  if (result.success) {
    await getDb(Astro.locals).insert(linkShare).values(result.output);
    return new Response(null, {
      status: 200,
    });
  } else {
    return new Response(null, {
      status: 400,
    });
  }
};
