import 'reflect-metadata'
import { Application } from '@Typetron/Framework'
import * as path from 'path'

export function prepareApp() {
    const tsConfig = require(path.join(process.cwd(), 'tsconfig'))
    const tsConfigPaths = require('tsconfig-paths')

    // TODO this package tries to load a ton of files until it finds the right one
    //  Need more investigation on this as it slows down the CLI app quite a bit
    tsConfigPaths.register({
        baseUrl: './',
        mainFields: ['index'],
        paths: tsConfig.compilerOptions.paths
    })
}

export async function boostrapApp() {
    prepareApp()

    const dotenv = require(path.join(process.cwd(), 'node_modules', 'dotenv'))
    dotenv.config({path: path.join(process.cwd(), '.env')})

    const {appBuilder} = require(path.join(process.cwd(), 'app.ts')) as {appBuilder: Promise<Application>}

    return await appBuilder
}
