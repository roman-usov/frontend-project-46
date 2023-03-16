import jsYaml from 'js-yaml';
import parserController from './parserController.js';

function parseYaml(fileContent) {
  return jsYaml.load(fileContent, 'utf8');
}

parserController.addParser('yaml', parseYaml);
parserController.addParser('yml', parseYaml);
