"use server";

import { db } from "./db";
import { channels, favorites, settings } from "./schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getChannels() {
    try {
        return await db.select().from(channels);
    } catch (error) {
        console.error("Failed to fetch channels:", error);
        return [];
    }
}

export async function getFavorites(userId: string = "default_user") {
    try {
        return await db.select().from(favorites).where(eq(favorites.userId, userId));
    } catch (error) {
        console.error("Failed to fetch favorites:", error);
        return [];
    }
}

export async function toggleFavorite(channelId: string, userId: string = "default_user") {
    try {
        const existing = await db
            .select()
            .from(favorites)
            .where(and(eq(favorites.channelId, channelId), eq(favorites.userId, userId)));

        if (existing.length > 0) {
            await db
                .delete(favorites)
                .where(and(eq(favorites.channelId, channelId), eq(favorites.userId, userId)));
        } else {
            await db.insert(favorites).values({
                channelId,
                userId,
            });
        }
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to toggle favorite:", error);
        return { success: false };
    }
}

export async function getSettings(userId: string = "default_user") {
    try {
        const data = await db.select().from(settings).where(eq(settings.userId, userId));
        return data.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return {};
    }
}

export async function updateSetting(key: string, value: string, userId: string = "default_user") {
    try {
        const existing = await db
            .select()
            .from(settings)
            .where(and(eq(settings.key, key), eq(settings.userId, userId)));

        if (existing.length > 0) {
            await db
                .update(settings)
                .set({ value, updatedAt: new Date() })
                .where(and(eq(settings.key, key), eq(settings.userId, userId)));
        } else {
            await db.insert(settings).values({
                key,
                value,
                userId,
            });
        }
        return { success: true };
    } catch (error) {
        console.error("Failed to update setting:", error);
        return { success: false };
    }
}

export async function seedChannels(initialChannels: any[]) {
    try {
        for (const channel of initialChannels) {
            const existing = await db.select().from(channels).where(eq(channels.id, channel.id));
            if (existing.length === 0) {
                await db.insert(channels).values({
                    id: channel.id,
                    name: channel.name,
                    url: channel.url,
                    category: channel.category,
                    logo: channel.logo,
                    viewers: channel.viewers,
                    trending: channel.trending,
                });
            }
        }
        return { success: true };
    } catch (error) {
        console.error("Failed to seed channels:", error);
        return { success: false };
    }
}
