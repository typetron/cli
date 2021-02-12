#!node

import program from 'commander'
import fetch from 'node-fetch'
import * as unzipper from 'unzipper'
import path from 'path'
// @ts-ignore
import { Writer } from 'fstream'

const typetron = program.description('Typetron CLI')

typetron
    .command('new <projectName>')
    .action((projectName: string) => {
        newProject(projectName)
    })

typetron.parse(process.argv)

async function newProject(projectName: string) {
    console.log(`Creating '${projectName}'`)
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

    response.body.on('close', () => {
        console.log('Project created')
    })
}
