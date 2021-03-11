import { program, Command } from 'commander'
import { NewProjectCommand } from './commands/NewProjectCommand'
import { boostrapApp } from './utils'
import { serveCommand } from './commands/ServeCommand'
import * as packageJSON from './package.json'

const typetron = program.description('Typetron CLI').version(packageJSON.version)

typetron.command('new <projectName>').action(NewProjectCommand)

typetron
    .command('serve')
    .option('-p, --port [port]', 'The port to run the app at')
    .action(serveCommand)

typetron
    .command('migrate')
    .action(async () => {
            console.log('Migrating...')
            const app = await boostrapApp()
            const {MigrateCommand} = await import('./commands/MigrateCommand')
            const command = app.get(MigrateCommand)
            await command.run()
    })

typetron
    .command('migrate:rollback')
    .action(async () => {
            console.log('Rolling back...')
            const app = await boostrapApp()
            const {RollbackCommand} = await import('./commands/RollbackCommand')
            const command = app.get(RollbackCommand)
            await command.run()
    })

typetron
    .command('migrate:reset')
    .action(async () => {
            console.log('Resetting database...')
            const app = await boostrapApp()
            const {ResetCommand} = await import('./commands/ResetCommand')
            const command = app.get(ResetCommand)
            await command.run()
    })

typetron
    .command('routes')
    .action(async () => {
            console.log('Reading routes...')
            const app = await boostrapApp()
            const {RoutesCommand} = await import('./commands/RoutesCommand')
            const command = app.get(RoutesCommand)
            await command.run()
    })

typetron
    .command(`generate <stub> <name>`)
    .alias('g')
    .action(async function(this: Command) {
            const app = await boostrapApp()
            const {GenerateCommand} = await import('./commands/generators/GenerateCommand')
            const command = app.get(GenerateCommand)
            await command.run(this.args)
    })

typetron.parse(process.argv)
