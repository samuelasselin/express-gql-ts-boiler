import { Migration } from "@mikro-orm/migrations";

export class Migration20211215003912 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "user" rename column "name" to "user_name";');

    this.addSql(
      'alter table "user" add constraint "user_user_name_unique" unique ("user_name");'
    );
  }
}
