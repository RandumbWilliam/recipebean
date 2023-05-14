import { Migration } from '@mikro-orm/migrations';

export class Migration20230510200948 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "recipes"."recipe_instruction" add column "step" int not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipes"."recipe_instruction" drop column "step";');
  }

}
