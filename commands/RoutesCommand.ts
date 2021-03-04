import { Inject } from '@Typetron/Container'
import { Command } from './Command'
import { Router } from '@Typetron/Router'
import Table = require('cli-table')

export class RoutesCommand implements Command {

    @Inject()
    router: Router

    async run() {
        const routes = this.router.routes
            .map(route => {
                return [
                    route.uri,
                    route.method,
                    route.name,
                    `${route.controller.name}.${route.action}`
                ]
            })

        const table = new Table({
            head: ['Uri', 'Method', 'Name', 'Controller Action'],
        })

        table.push(...routes)

        console.log(table.toString())
    }
}
