import { Migration } from '@mikro-orm/migrations';

export class Migration20220915015628 extends Migration {

  async up(): Promise<void> {
    this.addSql('create schema if not exists "recipes";');

    this.addSql('create schema if not exists "users";');

    this.addSql('create table "recipes"."unit" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "unit" varchar(255) not null, constraint "unit_pkey" primary key ("id"));');
    this.addSql('alter table "recipes"."unit" add constraint "unit_unit_unique" unique ("unit");');

    this.addSql('create table "recipes"."quantity" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "quantity" varchar(255) not null, constraint "quantity_pkey" primary key ("id"));');
    this.addSql('alter table "recipes"."quantity" add constraint "quantity_quantity_unique" unique ("quantity");');

    this.addSql('create table "recipes"."ingredient" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "ingredient" varchar(255) not null, constraint "ingredient_pkey" primary key ("id"));');
    this.addSql('alter table "recipes"."ingredient" add constraint "ingredient_ingredient_unique" unique ("ingredient");');

    this.addSql('create table "users"."user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "users"."user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "recipes"."cookbook" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "cookbook_name" varchar(255) not null, "creator_id" uuid not null, constraint "cookbook_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."cookbook_section" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "section_name" varchar(255) not null, "cookbook_id" uuid not null, constraint "cookbook_section_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."recipe" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "recipe_name" varchar(255) not null, "servings" int not null, "prep_time" int not null, "cook_time" int not null, "section_id" uuid not null, "cookbook_id" uuid not null, "creator_id" uuid not null, constraint "recipe_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."recipe_header" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "header_name" varchar(255) not null, "recipes_id" uuid not null, constraint "recipe_header_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."recipe_ingredient" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "recipes_id" uuid not null, "ingredients_id" uuid not null, "units_id" uuid not null, "quantities_id" uuid not null, constraint "recipe_ingredient_pkey" primary key ("id"));');

    this.addSql('alter table "recipes"."cookbook" add constraint "cookbook_creator_id_foreign" foreign key ("creator_id") references "users"."user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."cookbook_section" add constraint "cookbook_section_cookbook_id_foreign" foreign key ("cookbook_id") references "recipes"."cookbook" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe" add constraint "recipe_section_id_foreign" foreign key ("section_id") references "recipes"."cookbook_section" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipes"."recipe" add constraint "recipe_cookbook_id_foreign" foreign key ("cookbook_id") references "recipes"."cookbook" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipes"."recipe" add constraint "recipe_creator_id_foreign" foreign key ("creator_id") references "users"."user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_header" add constraint "recipe_header_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_ingredient" add constraint "recipe_ingredient_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipes"."recipe_ingredient" add constraint "recipe_ingredient_ingredients_id_foreign" foreign key ("ingredients_id") references "recipes"."ingredient" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipes"."recipe_ingredient" add constraint "recipe_ingredient_units_id_foreign" foreign key ("units_id") references "recipes"."unit" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipes"."recipe_ingredient" add constraint "recipe_ingredient_quantities_id_foreign" foreign key ("quantities_id") references "recipes"."quantity" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipes"."recipe_ingredient" drop constraint "recipe_ingredient_units_id_foreign";');

    this.addSql('alter table "recipes"."recipe_ingredient" drop constraint "recipe_ingredient_quantities_id_foreign";');

    this.addSql('alter table "recipes"."recipe_ingredient" drop constraint "recipe_ingredient_ingredients_id_foreign";');

    this.addSql('alter table "recipes"."cookbook" drop constraint "cookbook_creator_id_foreign";');

    this.addSql('alter table "recipes"."recipe" drop constraint "recipe_creator_id_foreign";');

    this.addSql('alter table "recipes"."cookbook_section" drop constraint "cookbook_section_cookbook_id_foreign";');

    this.addSql('alter table "recipes"."recipe" drop constraint "recipe_cookbook_id_foreign";');

    this.addSql('alter table "recipes"."recipe" drop constraint "recipe_section_id_foreign";');

    this.addSql('alter table "recipes"."recipe_header" drop constraint "recipe_header_recipes_id_foreign";');

    this.addSql('alter table "recipes"."recipe_ingredient" drop constraint "recipe_ingredient_recipes_id_foreign";');

    this.addSql('drop table if exists "recipes"."unit" cascade;');

    this.addSql('drop table if exists "recipes"."quantity" cascade;');

    this.addSql('drop table if exists "recipes"."ingredient" cascade;');

    this.addSql('drop table if exists "users"."user" cascade;');

    this.addSql('drop table if exists "recipes"."cookbook" cascade;');

    this.addSql('drop table if exists "recipes"."cookbook_section" cascade;');

    this.addSql('drop table if exists "recipes"."recipe" cascade;');

    this.addSql('drop table if exists "recipes"."recipe_header" cascade;');

    this.addSql('drop table if exists "recipes"."recipe_ingredient" cascade;');

    this.addSql('drop schema "recipes";');

    this.addSql('drop schema "users";');
  }

}
