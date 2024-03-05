import type { Config } from "drizzle-kit";
import path from "path";

const wranglerConfigPath = path.resolve(__dirname, "wrangler.toml");

export default process.env.LOCAL_DB_PATH
	? ({
			schema: "./src/schema.ts",
			driver: "better-sqlite",
			dbCredentials: {
				url: process.env.LOCAL_DB_PATH!,
			},
		} satisfies Config)
	: ({
			schema: "./src/schema.ts",
			out: "./migrations",
			driver: "d1",
			dbCredentials: {
				wranglerConfigPath,
				dbName: "kevinkipp.com",
			},
		} satisfies Config);
