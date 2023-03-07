import jsYaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf('.') + 1);
}

function parseJson(fileContent) {
  return JSON.parse(fileContent);
}

function parseYaml(fileContent) {
  return jsYaml.load(fileContent, 'utf8');
}

export function getAbsolutePath(filePath) {
  return path.resolve(filePath);
}

export default function parseFile(filePath) {
  const fileExt = getFileExtension(filePath);
  const fileContent = fs.readFileSync(getAbsolutePath(filePath));

  switch (fileExt) {
    case 'json': {
      return parseJson(fileContent);
    }
    case 'yaml':
    case 'yml': {
      return parseYaml(fileContent);
    }
    default: {
      return null;
    }
  }
}
