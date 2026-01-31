import db from "../database/db.ts";
import { users } from "../database/schema.ts";
import { eq } from "drizzle-orm";

export async function getUserByUsername(username: string) {
	const user = await db
		.select()
		.from(users)
		.where(eq(users.username, username))
		.limit(1);
	return user[0];
}
