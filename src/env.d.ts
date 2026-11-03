/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace Cloudflare {
	interface Env {
		API_TOKEN?: string;
		FEEDBIN_EMAIL?: string;
		FEEDBIN_PASSWORD?: string;
	}
}
