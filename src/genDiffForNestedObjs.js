import has from 'lodash.has';
import sortBy from 'lodash.sortby';
import isEqual from 'lodash.isequal';
import isObject from 'lodash.isobject';
import { ADDED, REMOVED, UNCHANGED } from './constants.js';

function createDiffObj(key, status, depth, path, { value = null, children = null } = {}) {
  return {
    [key]: {
      status,
      depth,
      value,
      children,
      path,
    },
  };
}

function diffObjIterator(origObj, chObj, depth = 1, path = '') {
  const uniqueKeys = sortBy(Object.keys({ ...origObj, ...chObj }));

  return uniqueKeys.reduce((acc, key) => {
    const originalValue = origObj[key];
    const changedValue = chObj[key];

    const updatedPath = depth === 1 ? `${key}` : `${path}.${key}`;

    if (isObject(originalValue) && isObject(changedValue)) {
      const children = diffObjIterator(originalValue, changedValue, depth + 1, updatedPath);
      return [...acc, createDiffObj(key, UNCHANGED, depth, updatedPath, { children })];
    }

    if (isEqual(originalValue, changedValue)) {
      return [...acc, createDiffObj(key, UNCHANGED, depth, updatedPath, { value: originalValue })];
    }

    if (has(origObj, key) && !has(chObj, key)) {
      return [...acc, createDiffObj(key, REMOVED, depth, updatedPath, { value: originalValue })];
    }

    if (!has(origObj, key) && has(chObj, key)) {
      return [...acc, createDiffObj(key, ADDED, depth, updatedPath, { value: changedValue })];
    }

    return [
      ...acc,
      createDiffObj(key, REMOVED, depth, updatedPath, { value: originalValue }),
      createDiffObj(key, ADDED, depth, updatedPath, { value: changedValue }),
    ];
  }, []);
}

export default function genDiffForNestedObjs(originalObj, changedObj) {
  return diffObjIterator(originalObj, changedObj, 1);
}
