import { Migration } from '@mikro-orm/migrations';

export class Migration20230620214656 extends Migration {

  async up(): Promise<void> {
    this.addSql('create schema if not exists "users";');

    this.addSql('create schema if not exists "recipes";');

    this.addSql('create table "users"."user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "full_name" varchar(255) not null, "avatar_id" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "users"."user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "recipes"."recipe" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "recipe_name" varchar(255) not null, "servings" int not null, "prep_time" int not null, "cook_time" int not null, "cover_image" varchar(255) not null, "creator_id" uuid not null, constraint "recipe_pkey" primary key ("id"));');
    this.addSql('create index "recipe_recipe_name_index" on "recipes"."recipe" using gin(to_tsvector(\'simple\', "recipe_name"));');

    this.addSql('create table "recipes"."recipe_instruction" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "instruction" varchar(255) not null, "step" int not null, "recipes_id" uuid not null, constraint "recipe_instruction_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."recipe_ingredient" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "ingredient" varchar(255) not null, "alternative_ingredients" text[] null, "has_alternative_ingredients" boolean not null, "has_added_measurements" boolean not null, "comments" varchar(255) null, "recipes_id" uuid not null, constraint "recipe_ingredient_pkey" primary key ("id"));');
    this.addSql('create index "recipe_ingredient_ingredient_index" on "recipes"."recipe_ingredient" using gin(to_tsvector(\'simple\', "ingredient"));');

    this.addSql('create table "recipes"."measurement" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "quantity" real null, "quantity_range" text[] null, "is_range" boolean not null, "unit" varchar(255) null, "is_converted" boolean not null, "ingredients_id" uuid not null, constraint "measurement_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."recipe_header_instruction" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "header" varchar(255) not null, "recipes_id" uuid not null, constraint "recipe_header_instruction_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."recipe_header_ingredient" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "header" varchar(255) not null, "recipes_id" uuid not null, constraint "recipe_header_ingredient_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."cookbook" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "cookbook_name" varchar(255) not null, "cookbook_cover_id" varchar(255) not null, "creator_id" uuid not null, constraint "cookbook_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."cookbook_recipes" ("cookbook_id" uuid not null, "recipe_id" uuid not null, constraint "cookbook_recipes_pkey" primary key ("cookbook_id", "recipe_id"));');

    this.addSql('alter table "recipes"."recipe" add constraint "recipe_creator_id_foreign" foreign key ("creator_id") references "users"."user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_instruction" add constraint "recipe_instruction_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_ingredient" add constraint "recipe_ingredient_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."measurement" add constraint "measurement_ingredients_id_foreign" foreign key ("ingredients_id") references "recipes"."recipe_ingredient" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_header_instruction" add constraint "recipe_header_instruction_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_header_ingredient" add constraint "recipe_header_ingredient_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."cookbook" add constraint "cookbook_creator_id_foreign" foreign key ("creator_id") references "users"."user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."cookbook_recipes" add constraint "cookbook_recipes_cookbook_id_foreign" foreign key ("cookbook_id") references "recipes"."cookbook" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipes"."cookbook_recipes" add constraint "cookbook_recipes_recipe_id_foreign" foreign key ("recipe_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');
  }

}
