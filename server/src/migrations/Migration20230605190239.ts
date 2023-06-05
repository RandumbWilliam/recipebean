import { Migration } from '@mikro-orm/migrations';

export class Migration20230605190239 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "recipes"."recipe_ingredient" alter column "unit" type varchar(255) using ("unit"::varchar(255));');
    this.addSql('alter table "recipes"."recipe_ingredient" alter column "unit" drop not null;');
    this.addSql('alter table "recipes"."recipe_ingredient" alter column "quantity" type int using ("quantity"::int);');
    this.addSql('alter table "recipes"."recipe_ingredient" alter column "quantity" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipes"."recipe_ingredient" alter column "unit" type varchar using ("unit"::varchar);');
    this.addSql('alter table "recipes"."recipe_ingredient" alter column "unit" set not null;');
    this.addSql('alter table "recipes"."recipe_ingredient" alter column "quantity" type int4 using ("quantity"::int4);');
    this.addSql('alter table "recipes"."recipe_ingredient" alter column "quantity" set not null;');
  }

}
