import { Migration } from '@mikro-orm/migrations';

export class Migration20230622184635 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "recipes"."recipe" add column "cover_image_id" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipes"."recipe" drop column "cover_image_id";');
  }

}
