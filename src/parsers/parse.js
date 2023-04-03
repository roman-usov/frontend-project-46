import fs from 'fs';
import parseYaml from './yamlParser.js';
import parseJson from './jsonParser.js';
import { getFileExtension, getAbsolutePath } from '../utils.js';

// eslint-disable-next-line consistent-return
export default function parse(filePath) {
  try {
    const fileExt = getFileExtension(filePath);
    const fileContent = fs.readFileSync(getAbsolutePath(filePath));

    switch (fileExt) {
      case 'yaml':
      case 'yml': {
        return parseYaml(fileContent);
      }
      case 'json': {
        return parseJson(fileContent);
      }
      default: {
        console.error('The provided file format is not supported');
      }
    }
  } catch (e) {
    console.error(`Can't read the file. Error message: ${e.message}.`);
  }
}
