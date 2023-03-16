import has from 'lodash.has';
import sortBy from 'lodash.sortby';
import isEqual from 'lodash.isequal';
import isObject from 'lodash.isobject';
import { ADDED, REMOVED, UNCHANGED } from './constants.js';

export default function genDiffForNestedObjs(originalObj, changedObj) {
  function iterate(origObj, chObj, depth = 1) {
    const uniqueKeys = sortBy(Object.keys({ ...origObj, ...chObj }));

    return uniqueKeys.reduce((acc, key) => {
      const originalValue = origObj[key];
      const changedValue = chObj[key];

      if (isObject(originalValue) && isObject(changedValue)) {
        return [
          ...acc,
          {
            [key]: {
              status: UNCHANGED,
              depth,
              children: iterate(originalValue, changedValue, depth + 1),
            },
          },
        ];
      }

      if (isEqual(originalValue, changedValue)) {
        return [
          ...acc,
          {
            [key]: {
              status: UNCHANGED,
              depth,
              value: originalValue,
            },
          },
        ];
      }

      if (has(origObj, key) && !has(chObj, key)) {
        return [
          ...acc,
          {
            [key]: {
              status: REMOVED,
              depth,
              value: originalValue,
            },
          },
        ];
      }

      if (!has(origObj, key) && has(chObj, key)) {
        return [
          ...acc,
          {
            [key]: {
              status: ADDED,
              depth,
              value: changedValue,
            },
          },
        ];
      }

      return [
        ...acc,
        {
          [key]: {
            status: REMOVED,
            depth,
            value: originalValue,
          },
        },
        {
          [key]: {
            status: ADDED,
            depth,
            value: changedValue,
          },
        },
      ];
    }, []);
  }

  return iterate(originalObj, changedObj, 1);
}
