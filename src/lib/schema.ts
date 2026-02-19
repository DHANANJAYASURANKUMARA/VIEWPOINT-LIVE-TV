import { pgTable, text, boolean, timestamp, uuid } from "drizzle-orm/pg-core";

export const channels = pgTable("channels", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    category: text("category").notNull(),
    logo: text("logo"),
    viewers: text("viewers").default("0"),
    trending: boolean("trending").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});

export const favorites = pgTable("favorites", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().default("default_user"),
    channelId: text("channel_id").notNull().references(() => channels.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const settings = pgTable("settings", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().default("default_user"),
    key: text("key").notNull(),
    value: text("value").notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
