import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const FORMAT = {
  json: 'json',
  txt: 'txt',
  yaml: 'yaml',
};

function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf('.') + 1);
}

function genDiffForFlatJsonObjs(originalJson, changedJson) {
  const sortedKeys = _.sortBy(Object.keys({ ...originalJson, ...changedJson }));

  let result = '';

  for (let i = 0; i < sortedKeys.length; i += 1) {
    const currentKey = sortedKeys[i];

    if (originalJson[currentKey] === changedJson[currentKey]) {
      result = `${result}    ${currentKey}: ${originalJson[currentKey]}\n`;
      continue;
    }

    if (!changedJson[currentKey]) {
      result = `${result}  - ${currentKey}: ${originalJson[currentKey]}\n`;
      continue;
    }

    if (!originalJson[currentKey]) {
      result = `${result}  + ${currentKey}: ${changedJson[currentKey]}\n`;
      continue;
    }

    result = `${result}  - ${currentKey}: ${originalJson[currentKey]}\n  + ${currentKey}: ${changedJson[currentKey]}\n`;
  }

  return `\n{\n${result}}`;
}

export default function genDiff(originalFilePath, changedFilePath) {
  const originalFileFormat = getFileExtension(originalFilePath);
  const changedFileFormat = getFileExtension(changedFilePath);

  if (originalFileFormat !== changedFileFormat) {
    return 'Please, make sure the files have the same extension.';
  }

  const originalFileAbsPath = path.resolve(originalFilePath);
  const changedFileAbsPath = path.resolve(changedFilePath);

  if (originalFileFormat === FORMAT.json) {
    const originalFileContent = JSON.parse(fs.readFileSync(originalFileAbsPath));
    const changedFileContent = JSON.parse(fs.readFileSync(changedFileAbsPath));

    return genDiffForFlatJsonObjs(originalFileContent, changedFileContent);
  }

  return null;
}
