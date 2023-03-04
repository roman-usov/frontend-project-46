import _ from 'lodash';

const STATUS = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

function getAddedAndRemovedElements(sourceObj, changedObj) {
  const keys = Object.keys({ ...sourceObj, ...changedObj });

  return keys.reduce((acc, key) => {
    if (_.has(sourceObj, key) && !_.has(changedObj, key)) {
      return [
        ...acc,
        Object.fromEntries([[key, { value: sourceObj[key], status: STATUS.removed }]]),
      ];
    }

    if (!_.has(sourceObj, key) && _.has(changedObj, key)) {
      return [
        ...acc,
        Object.fromEntries([[key, { value: changedObj[key], status: STATUS.added }]]),
      ];
    }

    return acc;
  }, []);
}

function getChangedElements(sourceObj, changedObj) {
  const matchingKeys = Object.keys(sourceObj).filter((key) => sourceObj[key] && changedObj[key]);
  return matchingKeys.reduce((acc, key) => {
    if (sourceObj[key] !== changedObj[key]) {
      const sourceObjChanges = Object.fromEntries([
        [
          key,
          {
            value: sourceObj[key],
            status: STATUS.removed,
          },
        ],
      ]);
      const changedObjChanges = Object.fromEntries([
        [
          key,
          {
            value: changedObj[key],
            status: STATUS.added,
          },
        ],
      ]);
      return [...acc, sourceObjChanges, changedObjChanges];
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
export default function genDiffForFlatJsonObjs(originalJson, changedJson) {
  const deletedAndAddedEntries = getAddedAndRemovedElements(originalJson, changedJson);
  const changedEntries = getChangedElements(originalJson, changedJson);
  const unchangedEntries = getUnchangedElements(originalJson, changedJson);
  const allEntries = [...deletedAndAddedEntries, ...changedEntries, ...unchangedEntries];
  const sortedEntries = _.sortBy(allEntries, [(o) => Object.keys(o)[0]]);

  return `\n{${formatChanges(sortedEntries)}}`;
}
