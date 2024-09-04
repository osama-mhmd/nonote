import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const dbURI = process.env.DATABASE_URL!;

const client = postgres(dbURI, {
  ssl: {
    rejectUnauthorized: false,
  },
  prepare: false,
});

const db = drizzle(client);

export default db;
