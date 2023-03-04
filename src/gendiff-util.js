import fs from 'fs';
import path from 'path';
import genDiffForFlatJsonObjs from './genDiffForFlatJsonObjs.js';

const FORMAT = {
  json: 'json',
  txt: 'txt',
  yaml: 'yaml',
};

function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf('.') + 1);
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
