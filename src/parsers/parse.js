import fs from 'fs';
import parserController from './parserController.js';
import './yamlParser.js';
import './jsonParser.js';
import { getFileExtension, getAbsolutePath } from '../utils.js';

// eslint-disable-next-line consistent-return
export default function parse(filePath) {
  try {
    const fileExt = getFileExtension(filePath);
    const fileContent = fs.readFileSync(getAbsolutePath(filePath));
    return parserController.getParser(fileExt)(fileContent);
  } catch (e) {
    console.error(`Can't read the file. Error message: ${e.message}.`);
  }
}
