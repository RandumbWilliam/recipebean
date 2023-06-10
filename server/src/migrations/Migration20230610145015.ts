import { Migration } from '@mikro-orm/migrations';

export class Migration20230610145015 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "recipes"."recipe_cookbooks" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "recipes"."recipe_cookbooks" ("recipe_id" uuid not null, "cookbook_id" uuid not null, constraint "recipe_cookbooks_pkey" primary key ("recipe_id", "cookbook_id"));');

    this.addSql('alter table "recipes"."recipe_cookbooks" add constraint "recipe_cookbooks_recipe_id_foreign" foreign key ("recipe_id") references "recipes"."recipe" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipes"."recipe_cookbooks" add constraint "recipe_cookbooks_cookbook_id_foreign" foreign key ("cookbook_id") references "recipes"."cookbook" ("id") on update cascade on delete cascade;');
  }

}
