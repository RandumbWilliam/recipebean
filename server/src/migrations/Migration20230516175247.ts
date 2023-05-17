import { Migration } from '@mikro-orm/migrations';

export class Migration20230516175247 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "recipes"."cookbook_recipes" ("cookbook_id" uuid not null, "recipe_id" uuid not null, constraint "cookbook_recipes_pkey" primary key ("cookbook_id", "recipe_id"));');

    this.addSql('alter table "recipes"."cookbook_recipes" add constraint "cookbook_recipes_cookbook_id_foreign" foreign key ("cookbook_id") references "recipes"."cookbook" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipes"."cookbook_recipes" add constraint "cookbook_recipes_recipe_id_foreign" foreign key ("recipe_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "recipes"."recipe_cookbook" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "recipes"."recipe_cookbook" ("recipe_id" uuid not null default null, "cookbook_id" uuid not null default null, constraint "recipe_cookbook_pkey" primary key ("recipe_id", "cookbook_id"));');

    this.addSql('alter table "recipes"."recipe_cookbook" add constraint "recipe_cookbook_cookbook_id_foreign" foreign key ("cookbook_id") references "recipes"."cookbook" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipes"."recipe_cookbook" add constraint "recipe_cookbook_recipe_id_foreign" foreign key ("recipe_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "recipes"."cookbook_recipes" cascade;');
  }

}
