import jsYaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const FORMAT = {
  json: 'json',
  txt: 'txt',
  yaml: 'yaml',
  yml: 'yml',
};

function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf('.') + 1);
}

function parseJson(fileContent) {
  try {
    return JSON.parse(fileContent);
  } catch (e) {
    console.error(e);
  }

  return null;
}

function parseYaml(fileContent) {
  try {
    return jsYaml.load(fileContent, 'utf8');
  } catch (e) {
    console.error(e);
  }

  return null;
}

export function getAbsolutePath(filePath) {
  return path.resolve(filePath);
}

export default function parseFile(filePath) {
  const fileExt = getFileExtension(filePath);
  const fileContent = fs.readFileSync(getAbsolutePath(filePath));

  switch (fileExt) {
    case FORMAT.json: {
      return parseJson(fileContent);
    }
    case FORMAT.yaml:
    case FORMAT.yml: {
      return parseYaml(fileContent);
    }
    default: {
      console.error('Failed to parse the file.');
      return null;
    }
  }
}
