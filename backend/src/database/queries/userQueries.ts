import { eq } from "drizzle-orm";
import db from "../db.ts";
import { users } from "../schema.ts";
import type { InsertUser } from "../schema.ts";
import { hashPassword } from "../../lib/password.ts";

// function to insert a new user into the user table in db
export async function createUser(userData: InsertUser) {
  // check and see if the username already exists in the db
  const isExistingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, userData.username));

  // if username exists, throw error; otherwise, continue to insertion of user
  if (isExistingUser.length > 0) {
    throw new Error(
      "Username already exists. Please enter a different username.",
    );
  }

  // hash password before insertion
  const hashedPassword = await hashPassword(userData.password);

  // create new user object with hashed password
  const userWithHashedPassword = {
    ...userData,
    password: hashedPassword,
  };

  // insert user into user table in db
  const insertedUser = await db
    .insert(users)
    .values(userWithHashedPassword)
    .returning();

  return insertedUser;
}
