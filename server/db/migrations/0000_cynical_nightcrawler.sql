CREATE TABLE "recipes" (
	"id" varchar(12) PRIMARY KEY NOT NULL,
	"user_id" varchar(12) NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"images" json,
	"cook_time" integer NOT NULL,
	"prep_time" integer NOT NULL,
	"servings" integer NOT NULL,
	"ingredients" json NOT NULL,
	"instructions" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(12) PRIMARY KEY NOT NULL,
	"user_id" varchar(12) NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(12) PRIMARY KEY NOT NULL,
	"google_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_googleId_unique" UNIQUE("google_id")
);
--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;