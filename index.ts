#!node

import program from 'commander'
import { newProject } from './commands/newProject'

const typetron = program.description('Typetron CLI')

typetron.command('new <projectName>').action(newProject)

typetron.parse(process.argv)
