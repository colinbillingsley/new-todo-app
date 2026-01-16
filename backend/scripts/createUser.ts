import { createUser } from "../src/database/queries/userQueries.ts";
import { v4 as uuidv4 } from "uuid";

async function run() {
  const user = await createUser({
    id: uuidv4(),
    name: "Test Name",
    username: "testname",
    password: "password123",
  });

  console.log("Created user:", user);
}

run()
  .then(() => process.exit(0))
  .catch(console.error);
