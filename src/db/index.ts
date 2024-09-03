import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const dbURI =
  "postgresql://postgres.aoihtskteljdmvrizgwd:0jmXPjR2po3PiZqw@aws-0-eu-central-1.pooler.supabase.com:6543/postgres";

const client = postgres(dbURI!, {
  ssl: {
    rejectUnauthorized: false,
  },
  prepare: false,
});

const db = drizzle(client);

export default db;
