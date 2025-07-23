import type { SSRManifest } from "astro";
import { App } from "astro/app";

export function createExports(manifest: SSRManifest) {
	const app = new App(manifest);

	return {
		default: {
			async fetch(request: Request, env: Env, ctx: ExecutionContext) {
				return app.render(request, {
					locals: {
						runtime: {
							env,
							ctx,
						},
					},
				});
			},
		} satisfies ExportedHandler<Env>,
	};
}

