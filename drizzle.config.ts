import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schemas/index.ts",
  dialect: "postgresql",
  out: "./src/db/migrations/drizzle",
});
