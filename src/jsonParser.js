import parserController from './ParserController.js';

function parseJson(fileContent) {
  return JSON.parse(fileContent);
}

parserController.addParser('json', parseJson);
