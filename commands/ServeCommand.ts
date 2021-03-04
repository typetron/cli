import path from 'path'
import { prepareApp } from '../utils'

export async function serveCommand({port}: {port: string}) {
    prepareApp()

    require(path.join(process.cwd(), 'index.ts'))
}
