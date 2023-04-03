import has from 'lodash.has';
import { ADDED, REMOVED, UNCHANGED } from '../constants.js';

const statuses = new Map([
  ['  ', 'unchanged'],
  ['+ ', 'added'],
  ['- ', 'removed'],
]);

function createChangesObject(key, status, value) {
  return {
    [key]: {
      status: status === 'updated' ? 'updated' : statuses.get(status),
      value: status === 'updated' ? { removed: value[0], added: value[1] } : value,
    },
  };
}

function iterateObjs(objArr) {
  return objArr.reduce((acc, obj, i) => {
    const [key, details] = Object.entries(obj).flat();

    if (details.children) {
      const children = iterateObjs(details.children);

      return {
        ...acc,
        [key]: children,
      };
    }

    if (details.status === UNCHANGED) {
      return {
        ...acc,
        ...createChangesObject(key, UNCHANGED, details.value),
      };
    }

    if (details.status === REMOVED) {
      const nextObj = objArr[i + 1];

      if (has(nextObj, key)) {
        return {
          ...acc,
          ...createChangesObject(key, 'updated', [details.value, nextObj[key].value]),
        };
      }

      return {
        ...acc,
        ...createChangesObject(key, REMOVED, details.value),
      };
    }

    const prevObj = objArr[i - 1];

    if (has(prevObj, key)) {
      return {
        ...acc,
      };
    }

    return {
      ...acc,
      ...createChangesObject(key, ADDED, details.value),
    };
  }, {});
}

export default function json(changesArr) {
  return `${JSON.stringify(iterateObjs(changesArr), null, 2)}`;
}
