import { Migration } from '@mikro-orm/migrations';

export class Migration20230515153636 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "recipes"."recipe" drop constraint "recipe_section_id_foreign";');

    this.addSql('drop table if exists "recipes"."cookbook_section" cascade;');

    this.addSql('alter table "recipes"."recipe" drop column "section_id";');
  }

  async down(): Promise<void> {
    this.addSql('create table "recipes"."cookbook_section" ("id" uuid not null default null, "created_at" timestamptz not null default null, "updated_at" timestamptz not null default null, "section_name" varchar not null default null, "cookbook_id" uuid not null default null, constraint "cookbook_section_pkey" primary key ("id"));');

    this.addSql('alter table "recipes"."cookbook_section" add constraint "cookbook_section_cookbook_id_foreign" foreign key ("cookbook_id") references "recipes"."cookbook" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipes"."recipe" add column "section_id" uuid not null default null;');
    this.addSql('alter table "recipes"."recipe" add constraint "recipe_section_id_foreign" foreign key ("section_id") references "recipes"."cookbook_section" ("id") on update cascade on delete cascade;');
  }

}
