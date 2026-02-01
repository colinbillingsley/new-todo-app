import db from "../database/db.ts";
import { eq } from "drizzle-orm";
import { lists } from "../database/schema.ts";

export async function createList(id: string, userId: string, title: string) {
	const list = await db
		.insert(lists)
		.values({
			id,
			userId,
			title,
		})
		.returning();

	return list[0];
}

export async function getUserLists(userId: string) {
	const userLists = await db
		.select()
		.from(lists)
		.where(eq(lists.userId, userId));

	return userLists ?? [];
}
