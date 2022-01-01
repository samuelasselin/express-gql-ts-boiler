import { Migration } from "@mikro-orm/migrations";

export class Migration20220101214603 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_user_name_unique";');
    this.addSql('alter table "user" drop column "user_name";');
  }
}
