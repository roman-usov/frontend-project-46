import has from 'lodash.has';
import sortBy from 'lodash.sortby';

const ADDED = '+';
const REMOVED = '-';
const UNCHANGED = ' ';

function getAddedAndRemovedEntries(sourceObj, changedObj) {
  const keys = Object.keys({ ...sourceObj, ...changedObj });

  return keys.reduce((acc, key) => {
    if (has(sourceObj, key) && !has(changedObj, key)) {
      return [...acc, Object.fromEntries([[key, { value: sourceObj[key], status: REMOVED }]])];
    }

    if (!has(sourceObj, key) && has(changedObj, key)) {
      return [...acc, Object.fromEntries([[key, { value: changedObj[key], status: ADDED }]])];
    }

    return acc;
  }, []);
}

function getChangedEntries(sourceObj, changedObj) {
  const matchingKeys = Object.keys(sourceObj).filter((key) => sourceObj[key] && changedObj[key]);
  return matchingKeys.reduce((acc, key) => {
    if (sourceObj[key] !== changedObj[key]) {
      const sourceObjChanges = Object.fromEntries([
        [
          key,
          {
            value: sourceObj[key],
            status: REMOVED,
          },
        ],
      ]);
      const changedObjChanges = Object.fromEntries([
        [
          key,
          {
            value: changedObj[key],
            status: ADDED,
          },
        ],
      ]);
      return [...acc, sourceObjChanges, changedObjChanges];
    }

    return acc;
  }, []);
}

function getUnchangedEntries(sourceObj, changedObj) {
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
              status: UNCHANGED,
            },
          ],
        ]),
      ];
    }

    return acc;
  }, []);
}

function formatChanges(arrWithChanges) {
  const result = arrWithChanges.reduce((acc, obj) => {
    const [key, entryValue] = Object.entries(obj).flat();
    return `${acc}  ${entryValue.status} ${key}: ${entryValue.value}\n`;
  }, '\n');

  return `\n{${result}}`;
}

export default function genDiffForFlatObjs(originalObj, changedObj) {
  const deletedAndAddedEntries = getAddedAndRemovedEntries(originalObj, changedObj);
  const changedEntries = getChangedEntries(originalObj, changedObj);
  const unchangedEntries = getUnchangedEntries(originalObj, changedObj);
  const allEntries = [...deletedAndAddedEntries, ...changedEntries, ...unchangedEntries];
  const sortedEntries = sortBy(allEntries, [(o) => Object.keys(o)[0]]);

  return formatChanges(sortedEntries);
}
