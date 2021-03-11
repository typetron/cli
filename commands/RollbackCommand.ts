import { Command } from './Command'
import { Inject } from '@Typetron/Container'
import { Query } from '@Typetron/Database'
import { Migrator } from '@Typetron/Database/Migrations'
import { DatabaseConfig } from '@Typetron/Framework'
import { Storage } from '@Typetron/Storage'

export class RollbackCommand implements Command {

    @Inject()
    storage: Storage

    @Inject()
    databaseConfig: DatabaseConfig

    async run() {
        const runner = new Migrator(this.storage, Query.connection, this.databaseConfig.migrationsDirectory)

        await runner.rollback()
    }
}
