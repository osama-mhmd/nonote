import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: ["./src/db/schemas/index.ts", "./src/db/schemas/habits.ts"],
  dialect: "postgresql",
  out: "./src/db/migrations/drizzle",
});
