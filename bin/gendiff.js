#!/usr/bin/env node
import { createRequire } from 'module';
import { Command } from 'commander';
import genDiff from '../index.js';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const program = new Command();

program
  .name(`${pkg.name}`)
  .description('Compares two configuration files and shows a difference.')
  .version(`${pkg.version}`)
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to file 1')
  .argument('<filepath2>', 'path to file 2')
  .action((filepath1, filepath2, options) => {
    const type = options.format;
    console.log(genDiff(filepath1, filepath2, type));
  })
  .parse();
