import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { userTable, sessionTable } from "./schemas";

import db from ".";

export const adapter = new DrizzlePostgreSQLAdapter(
  db,
  sessionTable,
  userTable,
);
