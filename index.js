#!/usr/bin/env node
const path = require('path')
const fs = require('fs')

const appTsConfigPath = path.join(process.cwd(), 'tsconfig.json')
require('ts-node').register({
	project : fs.existsSync(appTsConfigPath) ? appTsConfigPath : path.join(__dirname, 'tsconfig.json'),
	transpileOnly : true,
	skipIgnore : true,
	preferTsExts : true,
})
require('./cli')

