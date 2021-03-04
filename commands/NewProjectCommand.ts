import fetch from 'node-fetch'
import * as unzipper from 'unzipper'
import path from 'path'
// @ts-ignore
import { Writer } from 'fstream'
import Listr from 'listr'
import { projectInstall } from 'pkg-install'

export async function NewProjectCommand(projectName: string) {
    const tasks = new Listr([
        {
            title: `Initializing project '${projectName}'`,
            task: () => initializeProject(projectName)
        },
        {
            title: 'Installing dependencies',
            task: () => projectInstall({cwd: path.resolve(process.cwd(), projectName)})
        }
    ])

    try {
        await tasks.run()
        console.log('\nProject ready!')
    } catch (error) {
        console.error(error)
    }
}

async function initializeProject(projectName: string) {
    return new Promise<void>(async (resolve) => {

        const url = 'https://github.com/typetron/typetron/archive/master.zip'
        const response = await fetch(url)

        let firstEntry: string
        response.body
            .pipe(unzipper.Parse())
            .on('entry', function(entry) {
                const fileName: string = entry.path
                if (!firstEntry) {
                    firstEntry = fileName
                    entry.autodrain()
                    return
                }
                const filePath = path.join(projectName, fileName.replace(`${firstEntry}`, ''))
                if (entry.type == 'Directory') return
                const writer = Writer({path: filePath})

                entry.pipe(writer).on('error', function(error: Error) {console.log('Unzip file error', error)})
            })

        response.body.on('close', resolve)
    })
}
