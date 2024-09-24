CREATE TABLE IF NOT EXISTS "reset_password_tokens" (
	"user_id" text NOT NULL,
	"token_code" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL
);
