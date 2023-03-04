import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const FORMAT = {
  json: 'json',
  txt: 'txt',
  yaml: 'yaml',
};

const STATUS = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf('.') + 1);
}

function getRemovedElements(sourceObj, changedObj) {
  const sourceObjEntries = Object.entries(sourceObj);
  const changedObjKeys = Object.keys(changedObj);

  return sourceObjEntries.reduce((acc, entry) => {
    const [key, value] = entry;

    if (!changedObjKeys.includes(key)) {
      return [...acc, Object.fromEntries([[key, { value, status: STATUS.removed }]])];
    }

    return acc;
  }, []);
}

function getAddedElements(sourceObj, changedObj) {
  const sourceObjKeys = Object.keys(sourceObj);
  const changedObjEntries = Object.entries(changedObj);

  return changedObjEntries.reduce((acc, entry) => {
    const [key, value] = entry;
    if (!sourceObjKeys.includes(key)) {
      return [...acc, Object.fromEntries([[key, { value, status: STATUS.added }]])];
    }

    return acc;
  }, []);
}

function getChangedElements(sourceObj, changedObj) {
  const matchingKeys = Object.keys(sourceObj).filter((key) => sourceObj[key] && changedObj[key]);

  return matchingKeys.reduce((acc, key) => {
    if (sourceObj[key] !== changedObj[key]) {
      return [
        ...acc,
        Object.fromEntries([
          [
            key,
            {
              value: sourceObj[key],
              status: STATUS.removed,
            },
          ],
        ]),
        Object.fromEntries([
          [
            key,
            {
              value: changedObj[key],
              status: STATUS.added,
            },
          ],
        ]),
      ];
    }

    return acc;
  }, []);
}

function getUnchangedElements(sourceObj, changedObj) {
  const sourceObjKeys = Object.keys(sourceObj);

  return sourceObjKeys.reduce((acc, key) => {
    if (sourceObj[key] === changedObj[key]) {
      return [
        ...acc,
        Object.fromEntries([
          [
            key,
            {
              value: sourceObj[key],
              status: STATUS.unchanged,
            },
          ],
        ]),
      ];
    }

    return acc;
  }, []);
}

function formatChanges(arrWithChanges) {
  return arrWithChanges.reduce((acc, obj) => {
    const [key, entryValue] = Object.entries(obj).flat();
    return `${acc}  ${entryValue.status} ${key}: ${entryValue.value}\n`;
  }, '\n');
}

function genDiffForFlatJsonObjs(originalJson, changedJson) {
  const deletedEntries = getRemovedElements(originalJson, changedJson);
  const addedEntries = getAddedElements(originalJson, changedJson);
  const changedEntries = getChangedElements(originalJson, changedJson);
  const unchangedEntries = getUnchangedElements(originalJson, changedJson);
  const allEntries = [...deletedEntries, ...addedEntries, ...changedEntries, ...unchangedEntries];
  const sortedEntries = _.sortBy(allEntries, [(o) => Object.keys(o)[0]]);

  return `\n{${formatChanges(sortedEntries)}}`;
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
