import { Migration } from '@mikro-orm/migrations';

export class Migration20230611165948 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "recipes"."measurment" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "quantity" int null, "quantity_range" text[] null, "is_range" boolean not null, "unit" varchar(255) null, "is_converted" boolean not null, "ingredients_id" uuid not null, constraint "measurment_pkey" primary key ("id"));');

    this.addSql('alter table "recipes"."measurment" add constraint "measurment_ingredients_id_foreign" foreign key ("ingredients_id") references "recipes"."recipe_ingredient" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe_ingredient" add column "alternative_ingredients" text[] null, add column "has_alternative_ingredients" boolean not null, add column "has_added_measurments" boolean not null;');
    this.addSql('alter table "recipes"."recipe_ingredient" drop column "unit";');
    this.addSql('alter table "recipes"."recipe_ingredient" drop column "quantity";');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "recipes"."measurment" cascade;');

    this.addSql('alter table "recipes"."recipe_ingredient" add column "unit" varchar null default null, add column "quantity" int4 null default null;');
    this.addSql('alter table "recipes"."recipe_ingredient" drop column "alternative_ingredients";');
    this.addSql('alter table "recipes"."recipe_ingredient" drop column "has_alternative_ingredients";');
    this.addSql('alter table "recipes"."recipe_ingredient" drop column "has_added_measurments";');
  }

}
