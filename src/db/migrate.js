/**
 * we will not use typescript as it still experimental in node
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const dbURI = process.env.DATABASE_URL;
const client = postgres(dbURI);
const db = drizzle(client);

const main = async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
};

main()
  .then(() => {
    console.log("Migrations done");
    process.exit(0);
  })
  .catch((e) => console.log(":(, ", e));
