CREATE TABLE IF NOT EXISTS "workspaces" (
	"id" text PRIMARY KEY NOT NULL,
	"owner" text NOT NULL,
	"name" text NOT NULL,
	"visibility" text NOT NULL,
	"permissions" json DEFAULT '{"edit":{"config":{"name":"editors","notNull":false,"hasDefault":false,"primaryKey":false,"isUnique":false,"dataType":"array","columnType":"PgArray","baseBuilder":{"config":{"name":"editors","notNull":false,"hasDefault":false,"primaryKey":false,"isUnique":false,"dataType":"string","columnType":"PgText"},"foreignKeyConfigs":[{"actions":{}}]}},"foreignKeyConfigs":[]},"comment":{"config":{"name":"commentors","notNull":false,"hasDefault":false,"primaryKey":false,"isUnique":false,"dataType":"array","columnType":"PgArray","baseBuilder":{"config":{"name":"commentors","notNull":false,"hasDefault":false,"primaryKey":false,"isUnique":false,"dataType":"string","columnType":"PgText"},"foreignKeyConfigs":[{"actions":{}}]}},"foreignKeyConfigs":[]},"view":{"config":{"name":"viewers","notNull":false,"hasDefault":false,"primaryKey":false,"isUnique":false,"dataType":"array","columnType":"PgArray","baseBuilder":{"config":{"name":"viewers","notNull":false,"hasDefault":false,"primaryKey":false,"isUnique":false,"dataType":"string","columnType":"PgText"},"foreignKeyConfigs":[{"actions":{}}]}},"foreignKeyConfigs":[]}}'::json
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "emailVerified" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
