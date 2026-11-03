import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const getDb = () => {
	return drizzle(env.DB);
};

export const linkShare = sqliteTable("linkShare", {
	id: integer("id").primaryKey({
		autoIncrement: true,
	}),
	url: text("url").notNull(),
	title: text("title").notNull(),
	remark: text("remark"),
	created: integer("created", {
		mode: "timestamp_ms",
	})
		.notNull()
		.$defaultFn(() => new Date()),
	modified: integer("modified", {
		mode: "timestamp_ms",
	})
		.notNull()
		.$defaultFn(() => new Date()),
	deleted: integer("deleted", {
		mode: "timestamp_ms",
	}),
});
