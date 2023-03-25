import has from 'lodash.has';
import sortBy from 'lodash.sortby';
import isEqual from 'lodash.isequal';
import isObject from 'lodash.isobject';
import { ADDED, REMOVED, UNCHANGED } from './constants.js';

function createDiffObj(key, status, depth, value, children = null) {
  return {
    [key]: {
      status,
      depth,
      value,
      children,
    },
  };
}

function diffObjIterator(origObj, chObj, depth = 1) {
  const uniqueKeys = sortBy(Object.keys({ ...origObj, ...chObj }));

  return uniqueKeys.reduce((acc, key) => {
    const originalValue = origObj[key];
    const changedValue = chObj[key];

    if (isObject(originalValue) && isObject(changedValue)) {
      const children = diffObjIterator(originalValue, changedValue, depth + 1);
      acc.push(createDiffObj(key, UNCHANGED, depth, null, children));
      return acc;
    }

    if (isEqual(originalValue, changedValue)) {
      acc.push(createDiffObj(key, UNCHANGED, depth, originalValue));
      return acc;
    }

    if (has(origObj, key) && !has(chObj, key)) {
      acc.push(createDiffObj(key, REMOVED, depth, originalValue));
      return acc;
    }

    if (!has(origObj, key) && has(chObj, key)) {
      acc.push(createDiffObj(key, ADDED, depth, changedValue));
      return acc;
    }

    acc.push(createDiffObj(key, REMOVED, depth, originalValue));
    acc.push(createDiffObj(key, ADDED, depth, changedValue));
    return acc;
  }, []);
}

export default function genDiffForNestedObjs(originalObj, changedObj) {
  return diffObjIterator(originalObj, changedObj, 1);
}
