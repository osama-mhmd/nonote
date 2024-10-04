CREATE TABLE IF NOT EXISTS "workspace_documents" (
	"workspace_id" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"title" text DEFAULT '',
	"content" text DEFAULT '',
	"parent_id" text NOT NULL
);
