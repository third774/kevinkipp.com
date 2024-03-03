import type { Config } from "drizzle-kit";
import path from "path";

const wranglerConfigPath = path.resolve(__dirname, "wrangler.toml");

export default {
	schema: "./src/schema.ts",
	out: "./migrations",
	driver: "d1",
	dbCredentials: {
		dbName: "kevinkipp.com",
		wranglerConfigPath,
	},
} satisfies Config;
