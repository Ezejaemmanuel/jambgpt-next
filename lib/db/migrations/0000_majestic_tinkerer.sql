DO $$ BEGIN
 CREATE TYPE "public"."UserRole" AS ENUM('User', 'Admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY NOT NULL,
	"role" "UserRole" DEFAULT 'User' NOT NULL,
	"firstName" text,
	"username" text,
	"fullName" text,
	"imageUrl" text,
	"email" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");