import '@Typetron/Support'
import { program, Command } from 'commander'
import { NewProjectCommand } from './commands/NewProjectCommand'
import { boostrapApp } from './utils'
import * as packageJSON from './package.json'
import { Container } from '@Typetron/Container'

const typetron = program.description('Typetron CLI')

typetron.version(packageJSON.version, '-v')

// typetron
//     .command('serve')
//     .option('-p, --port [port]', 'The port to run the app at')
//     .action(serveCommand)

typetron
    .command('new <projectName>')
    .action(async function(this: Command) {
            const container = new Container()
            const {NewProjectCommand} = await import('./commands/NewProjectCommand')
            const command = container.get(NewProjectCommand)
            await command.run(this.args)
    })

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

typetron
.command('seed')
.action(async () => {
        console.log('Seeding...')
        const app = await boostrapApp()
        const {SeedCommand} = await import('./commands/SeedCommand')
        const command = app.get(SeedCommand)
        await command.run()
})

typetron.parse(process.argv)
