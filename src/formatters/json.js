import has from 'lodash.has';
import formatterController from './formatterController.js';
import { ADDED, REMOVED, UNCHANGED } from '../constants.js';

const statuses = new Map([
  ['  ', 'unchanged'],
  ['+ ', 'added'],
  ['- ', 'removed'],
]);

function createChangesObject(status, ...value) {
  return {
    status: status === 'updated' ? 'updated' : statuses.get(status),
    value: status === 'updated' ? { removed: value[0], added: value[1] } : value[0],
  };
}

function iterateObjs(objArr) {
  let canSkipNextObj;

  return objArr.reduce((acc, obj, i) => {
    const [key, details] = Object.entries(obj).flat();

    if (details.children) {
      acc[key] = { ...iterateObjs(details.children) };

      return acc;
    }

    if (details.status === UNCHANGED) {
      acc[key] = createChangesObject(UNCHANGED, details.value);

      return acc;
    }

    if (details.status === REMOVED) {
      const nextObj = objArr[i + 1];

      if (has(nextObj, key)) {
        canSkipNextObj = true;

        acc[key] = createChangesObject('updated', ...[details.value, nextObj[key].value]);

        return acc;
      }

      acc[key] = createChangesObject(REMOVED, details.value);

      return acc;
    }

    if (canSkipNextObj) {
      canSkipNextObj = false;
      return acc;
    }

    acc[key] = createChangesObject(ADDED, details.value);

    return acc;
  }, {});
}

export default function json(changesArr) {
  return `\n${JSON.stringify(iterateObjs(changesArr), null, 2)}`;
}

formatterController.addFormatter('json', json);
