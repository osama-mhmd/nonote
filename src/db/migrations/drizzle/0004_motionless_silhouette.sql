CREATE TABLE IF NOT EXISTS "users_permissions" (
	"user_id" text NOT NULL,
	"workpsace_id" text NOT NULL,
	"permission" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workspaces" DROP CONSTRAINT "workspaces_owner_users_id_fk";
--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "last_updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "last_updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "viewed_by" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN IF EXISTS "owner";--> statement-breakpoint
ALTER TABLE "workspaces" DROP COLUMN IF EXISTS "permissions";