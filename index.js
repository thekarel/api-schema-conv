#!/usr/bin/env node
const cli = require('commander')
const toOpenApi = require('json-schema-to-openapi-schema')
const {version} = require('./package.json')
const {readFileSync} = require('fs')
const yamljs = require('yamljs');

const convert = (file, {yaml}) => {
    const jsonSchema = readFileSync(file, {encoding: 'utf8'})
    const openApi = toOpenApi(JSON.parse(jsonSchema))

    const output = yaml ? yamljs.stringify(openApi, 4) : JSON.stringify(openApi, null, 4)

    console.log(output)
}

cli
    .version(version)
    .command('convert <file>')
    .option('--yaml', 'Output YAML (JSON by default)')
    .action(convert)

cli.parse(process.argv)
