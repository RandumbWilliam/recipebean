import { Migration } from '@mikro-orm/migrations';

export class Migration20230512155516 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "recipes"."recipe_header_ingredient" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "header" varchar(255) not null, "recipes_id" uuid not null, constraint "recipe_header_ingredient_pkey" primary key ("id"));');

    this.addSql('create table "recipes"."recipe_header_instruction" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "header" varchar(255) not null, "recipes_id" uuid not null, constraint "recipe_header_instruction_pkey" primary key ("id"));');

    this.addSql('alter table "recipes"."recipe_header_ingredient" add constraint "recipe_header_ingredient_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_header_instruction" add constraint "recipe_header_instruction_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "recipes"."recipe_header" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "recipes"."recipe_header" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "order" int not null, "header" varchar(255) not null, "header_type" text check ("header_type" in (\'ingredient\', \'instruction\')) not null, "recipes_id" uuid not null, constraint "recipe_header_pkey" primary key ("id"));');

    this.addSql('alter table "recipes"."recipe_header" add constraint "recipe_header_recipes_id_foreign" foreign key ("recipes_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "recipes"."recipe_header_ingredient" cascade;');

    this.addSql('drop table if exists "recipes"."recipe_header_instruction" cascade;');
  }

}
