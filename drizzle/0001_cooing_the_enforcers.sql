ALTER TABLE "users" ADD COLUMN "emailVerified" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "plan";