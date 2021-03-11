import { Migration } from '@Typetron/Database/Migrations'

export class $$name$$ extends Migration {
    async up() {
        await this.connection.runRaw(`select 'migration'`)
    }

    async down() {
        await this.connection.runRaw(`select 'migration'`)
    }
}
