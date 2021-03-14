import { Command } from '../Command'
import { Inject } from '@Typetron/Container'
import { Storage } from '@Typetron/Storage'
import { DatabaseConfig } from '@Typetron/Framework'
import * as path from 'path'

export class GenerateCommand implements Command {

    @Inject()
    storage: Storage

    @Inject()
    databaseConfig: DatabaseConfig

    async run([stubName, name]: string[]) {
        const stubPath = path.join(__dirname, `./stubs/${stubName}.ts`)
        if (!await this.storage.exists(stubPath)) {
            return console.error(`Generator does no exists. This is the list of all generators:\n${await this.getMigrationsList()}`)
        }

        console.log(`Generating migration...`)

        let stubContent = (await this.storage.read(stubPath)).toString()

        stubContent = stubContent.replace('$$name$$', name)

        await this.storage.put(path.join(this.databaseConfig.migrationsDirectory, `${Date.now()}_${name}.ts`), stubContent)

        console.log(`Migration '${name}' generated`)
    }

    private async getMigrationsList() {
        return (await this.storage.files(path.join(__dirname, 'stubs')))
            .map(file => `- ${path.parse(file.name).name}`)
            .join('\n')
    }
}
