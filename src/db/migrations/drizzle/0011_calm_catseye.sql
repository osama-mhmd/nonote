CREATE TABLE IF NOT EXISTS "habits_records" (
	"habit_id" text NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "habits" (
	"id" text NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"quote" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"frequency" text NOT NULL
);
