import parserController from './parserController.js';

function parseJson(fileContent) {
  return JSON.parse(fileContent);
}

parserController.addParser('json', parseJson);
