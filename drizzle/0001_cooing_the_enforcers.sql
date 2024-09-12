ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "emailVerified" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "plan";