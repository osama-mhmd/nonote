import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schemas.ts",
  dialect: "postgresql",
  out: "./drizzle",
});
