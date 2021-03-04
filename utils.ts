import { Application } from '@Typetron/Framework'
import * as path from 'path'

export function prepareApp() {
    const tsConfig = require(path.join(process.cwd(), 'tsconfig'))
    const tsConfigPaths = require('tsconfig-paths')

    const baseUrl = path.join(process.cwd())
    tsConfigPaths.register({
        baseUrl,
        paths: tsConfig.compilerOptions.paths
    })
}

export async function boostrapApp() {
    prepareApp()

    const {appBuilder} = require(path.join(process.cwd(), 'app.ts')) as {appBuilder: Promise<Application>}
    return await appBuilder
}
