require("dotenv").config();

const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres")
const { migrate } = require("drizzle-orm/postgres-js/migrator")

const dbURI = process.env.DATABASE_URL
const client = postgres(dbURI);
const db = drizzle(client);

const main = async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
};

main()
  .then(() => {
    console.log("Migrations done");
    process.exit(1);
  })
  .catch((e) => console.log(":(, ", e));
