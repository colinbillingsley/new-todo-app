import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("Database URL not connected properly");
}

const db = drizzle(process.env.DATABASE_URL);

export default db;
