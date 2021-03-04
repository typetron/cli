#!ts-node-transpile-only
import program from 'commander'
import { NewProjectCommand } from './commands/NewProjectCommand'
import { boostrapApp } from './utils'
import { serveCommand } from './commands/ServeCommand'

const typetron = program.description('Typetron CLI')

typetron.command('new <projectName>').action(NewProjectCommand)

typetron.command('serve')
    .option('-p, --port [port]', 'The port to run the app at')
    .action(serveCommand)

typetron.command('migrate').action(async () => {
    const app = await boostrapApp()
    const {MigrateCommand} = await import('./commands/MigrateCommand')
    const command = app.get(MigrateCommand)
    await command.run()
})

typetron.command('routes').action(async () => {
    console.log('Reading routes...')
    const app = await boostrapApp()
    const {RoutesCommand} = await import('./commands/RoutesCommand')
    const routesCommand = app.get(RoutesCommand)
    await routesCommand.run()
})

typetron.parse(process.argv)
