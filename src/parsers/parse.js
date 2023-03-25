import fs from 'fs';
import parserController from './parserController.js';
import './yamlParser.js';
import './jsonParser.js';
import { getFileExtension, getAbsolutePath } from '../utils.js';

export default function parse(filePath) {
  try {
    const fileExt = getFileExtension(filePath);
    const fileContent = fs.readFileSync(getAbsolutePath(filePath));

    return parserController.getParser(fileExt)(fileContent);
  } catch (e) {
    throw new Error(`Can't read the file. ${e.message}.`);
  }
}
