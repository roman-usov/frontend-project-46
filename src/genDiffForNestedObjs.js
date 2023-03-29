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
      acc.push(createDiffObj(key, UNCHANGED, depth, updatedPath, { children }));
      return acc;
    }

    if (isEqual(originalValue, changedValue)) {
      acc.push(createDiffObj(key, UNCHANGED, depth, updatedPath, { value: originalValue }));
      return acc;
    }

    if (has(origObj, key) && !has(chObj, key)) {
      acc.push(createDiffObj(key, REMOVED, depth, updatedPath, { value: originalValue }));
      return acc;
    }

    if (!has(origObj, key) && has(chObj, key)) {
      acc.push(createDiffObj(key, ADDED, depth, updatedPath, { value: changedValue }));
      return acc;
    }

    acc.push(createDiffObj(key, REMOVED, depth, updatedPath, { value: originalValue }));
    acc.push(createDiffObj(key, ADDED, depth, updatedPath, { value: changedValue }));
    return acc;
  }, []);
}

export default function genDiffForNestedObjs(originalObj, changedObj) {
  return diffObjIterator(originalObj, changedObj, 1);
}
