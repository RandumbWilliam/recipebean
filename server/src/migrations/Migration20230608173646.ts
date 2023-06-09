import { Migration } from '@mikro-orm/migrations';

export class Migration20230608173646 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "recipes"."recipe_ingredient" add column "comments" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipes"."recipe_ingredient" drop column "comments";');
  }

}
