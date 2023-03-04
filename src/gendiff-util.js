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

  const result = sortedKeys.reduce((acc, key) => {
    // no change in the entry
    if (originalJson[key] === changedJson[key]) {
      return `${acc}    ${key}: ${originalJson[key]}\n`;
    }

    // deleted entry
    if (!changedJson[key]) {
      return `${acc}  - ${key}: ${originalJson[key]}\n`;
    }

    // added entry
    if (!originalJson[key]) {
      return `${acc}  + ${key}: ${changedJson[key]}\n`;
    }

    // changed entry
    return `${acc}  - ${key}: ${originalJson[key]}\n  + ${key}: ${changedJson[key]}\n`;
  }, '');

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
