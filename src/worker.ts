import { handle } from "@astrojs/cloudflare/handler";

export default {
	async fetch(request, env, ctx) {
		return handle(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
