import { defineConfig } from "vitest/config";
import { resolve } from "path";
import { readFileSync } from "fs";

const envFile = readFileSync(".env", "utf8");
const url = envFile.match(/(.*)DATABASE_URL="(.*)"/)![2];

export default defineConfig({
  root: ".",
  test: {
    env: {
      DATABASE_URL: url ?? "",
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
});
