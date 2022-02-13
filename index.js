#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const tsConfigPaths = require('tsconfig-paths')
const appTsConfigPath = path.join(process.cwd(), 'tsconfig.json')
const tsConfig = require(path.join(__dirname, 'tsconfig.json'))

require('ts-node').register({
	project : fs.existsSync(appTsConfigPath) ? appTsConfigPath : path.join(__dirname, 'tsconfig.json'),
	transpileOnly : true,
	skipIgnore : true,
	preferTsExts : true,
})

tsConfigPaths.register({
	baseUrl : __dirname,
	paths : tsConfig.compilerOptions.paths
})
require('./cli')

