import { Migration } from '@mikro-orm/migrations';

export class Migration20230606161804 extends Migration {

  async up(): Promise<void> {
    this.addSql('create schema if not exists "users";');

    this.addSql('create schema if not exists "recipes";');

    this.addSql('create table "users"."user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "users"."user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "recipes"."recipe" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "recipe_name" varchar(255) not null, "servings" int not null, "prep_time" int not null, "cook_time" int not null, "creator_id" uuid not null, constraint "recipe_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."recipe_header_ingredient" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "header" varchar(255) not null, "recipes_id" uuid not null, constraint "recipe_header_ingredient_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."recipe_header_instruction" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "header" varchar(255) not null, "recipes_id" uuid not null, constraint "recipe_header_instruction_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."recipe_ingredient" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "ingredient" varchar(255) not null, "unit" varchar(255) null, "quantity" int null, "recipes_id" uuid not null, constraint "recipe_ingredient_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."recipe_instruction" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "instruction" varchar(255) not null, "step" int not null, "recipes_id" uuid not null, constraint "recipe_instruction_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."cookbook" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "cookbook_name" varchar(255) not null, "creator_id" uuid not null, constraint "cookbook_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."cookbook_recipes" ("cookbook_id" uuid not null, "recipe_id" uuid not null, constraint "cookbook_recipes_pkey" primary key ("cookbook_id", "recipe_id"));');

    this.addSql('alter table "recipes"."recipe" add constraint "recipe_creator_id_foreign" foreign key ("creator_id") references "users"."user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_header_ingredient" add constraint "recipe_header_ingredient_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_header_instruction" add constraint "recipe_header_instruction_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_ingredient" add constraint "recipe_ingredient_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_instruction" add constraint "recipe_instruction_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."cookbook" add constraint "cookbook_creator_id_foreign" foreign key ("creator_id") references "users"."user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."cookbook_recipes" add constraint "cookbook_recipes_cookbook_id_foreign" foreign key ("cookbook_id") references "recipes"."cookbook" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipes"."cookbook_recipes" add constraint "cookbook_recipes_recipe_id_foreign" foreign key ("recipe_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipes"."recipe" drop constraint "recipe_creator_id_foreign";');

    this.addSql('alter table "recipes"."cookbook" drop constraint "cookbook_creator_id_foreign";');

    this.addSql('alter table "recipes"."recipe_header_ingredient" drop constraint "recipe_header_ingredient_recipes_id_foreign";');

    this.addSql('alter table "recipes"."recipe_header_instruction" drop constraint "recipe_header_instruction_recipes_id_foreign";');

    this.addSql('alter table "recipes"."recipe_ingredient" drop constraint "recipe_ingredient_recipes_id_foreign";');

    this.addSql('alter table "recipes"."recipe_instruction" drop constraint "recipe_instruction_recipes_id_foreign";');

    this.addSql('alter table "recipes"."cookbook_recipes" drop constraint "cookbook_recipes_recipe_id_foreign";');

    this.addSql('alter table "recipes"."cookbook_recipes" drop constraint "cookbook_recipes_cookbook_id_foreign";');

    this.addSql('drop table if exists "users"."user" cascade;');

    this.addSql('drop table if exists "recipes"."recipe" cascade;');

    this.addSql('drop table if exists "recipes"."recipe_header_ingredient" cascade;');

    this.addSql('drop table if exists "recipes"."recipe_header_instruction" cascade;');

    this.addSql('drop table if exists "recipes"."recipe_ingredient" cascade;');

    this.addSql('drop table if exists "recipes"."recipe_instruction" cascade;');

    this.addSql('drop table if exists "recipes"."cookbook" cascade;');

    this.addSql('drop table if exists "recipes"."cookbook_recipes" cascade;');

    this.addSql('drop schema "users";');

    this.addSql('drop schema "recipes";');
  }

}
