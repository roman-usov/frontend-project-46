import isObject from 'lodash.isobject';
import { REMOVED, UNCHANGED, COMPLEX_VALUE } from '../constants.js';
import formatterController from './formatterController.js';

function produceOutputValue(value) {
  if (typeof value === 'string' && value !== COMPLEX_VALUE) {
    return `'${value}'`;
  }

  return value;
}

function produceAddedStr(path, value) {
  return `Property '${path}' was added with value: ${produceOutputValue(value)}`;
}

function produceUpdatedStr(path, oldVal, newVal) {
  return `Property '${path}' was updated. From ${produceOutputValue(
    oldVal,
  )} to ${produceOutputValue(newVal)}`;
}

function produceRemovedStr(path) {
  return `Property '${path}' was removed`;
}

function stringIterator(dataToIterate) {
  const changedKeysAndValues = dataToIterate
    .flatMap((obj) => Object.entries(obj))
    // eslint-disable-next-line no-unused-vars
    .filter(([_, value]) => value.children || value.status !== UNCHANGED);

  let canSkipKey;

  return changedKeysAndValues.reduce((acc, [key, details], i) => {
    if (details.children) {
      const childrenStr = stringIterator(details.children);

      return `${acc}${childrenStr}`;
    }

    const currKeyHasComplexValue = isObject(details.value);
    const currValue = currKeyHasComplexValue ? COMPLEX_VALUE : details.value;

    if (details.status === REMOVED) {
      const [nextKey, nextDetails] = changedKeysAndValues[i + 1];
      const isUpdateCase = key === nextKey;

      if (isUpdateCase) {
        const nextKeyHasComplexValue = isObject(nextDetails.value);
        const nextValue = nextKeyHasComplexValue ? COMPLEX_VALUE : nextDetails.value;

        canSkipKey = true;

        return `${acc}${produceUpdatedStr(details.path, currValue, nextValue)}\n`;
      }

      return `${acc}${produceRemovedStr(details.path)}\n`;
    }

    if (canSkipKey) {
      canSkipKey = false;
      return `${acc}`;
    }

    return `${acc}${produceAddedStr(details.path, currValue)}\n`;
  }, '');
}

function plain(data) {
  const lines = stringIterator(data);

  return `\n${lines}`.trimEnd();
}

formatterController.addFormatter('plain', plain);
