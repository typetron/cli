#!/usr/bin/env node
const path = require('path')

require('ts-node').register({
	project : path.join(process.cwd(), 'tsconfig.json'),
	transpileOnly : true,
	preferTsExts : true,
})
require('./cli')

