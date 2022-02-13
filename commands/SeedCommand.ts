import { Command } from './Command'
import { Inject } from '@Typetron/Container'
import { SeederManager } from '@Typetron/Database/Seeders'
import { DatabaseConfig } from '@Typetron/Framework'
import { Storage } from '@Typetron/Storage'

export class SeedCommand implements Command {

    @Inject()
    storage: Storage

    @Inject()
    databaseConfig: DatabaseConfig

    async run() {
        const runner = new SeederManager(this.storage, this.databaseConfig.seedersDirectory)

        await runner.seed()
    }
}
