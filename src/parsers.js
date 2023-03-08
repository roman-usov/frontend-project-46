import path from 'path';
import fs from 'fs';
import parserController from './ParserController.js';
import './jsonParser.js';
import './yamlParser.js';

function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf('.') + 1);
}

export function getAbsolutePath(filePath) {
  return path.resolve(filePath);
}

export default function parseFile(filePath) {
  const fileExt = getFileExtension(filePath);
  const fileContent = fs.readFileSync(getAbsolutePath(filePath));

  return parserController.getParser(fileExt)(fileContent);
}
