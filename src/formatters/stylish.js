import { INDENT_CHAR, SPACES_PER_INDENT, SPACES_FOR_CHANGE_INFO } from '../constants.js';
import { stringify } from '../utils.js';
import formatterController from './formatterController.js';

function createObjPropertyString(key, space, val) {
  return `${key}:${space}${val}`;
}

function stylish(data) {
  function iterate(val) {
    return val.reduce((acc, element) => {
      const [key, details] = Object.entries(element).flat();
      const indentBefore = INDENT_CHAR.repeat(
        SPACES_PER_INDENT * details.depth - SPACES_FOR_CHANGE_INFO,
      );
      const indentAfter = INDENT_CHAR.repeat(SPACES_PER_INDENT * details.depth);
      const keyString = `${acc}${indentBefore}${details.status}${key}`;
      const spaceAfterColon = details.value === '' ? '' : ' ';
      let valueString;

      if (details.children) {
        const childrenString = iterate(details.children);
        valueString = `{\n${childrenString}${indentAfter}}\n`;

        return createObjPropertyString(keyString, spaceAfterColon, valueString);
      }

      valueString = `${stringify(
        details.value,
        INDENT_CHAR,
        SPACES_PER_INDENT,
        details.depth + 1,
      )}\n`;

      return createObjPropertyString(keyString, spaceAfterColon, valueString);
    }, '');
  }
  const lines = iterate(data);

  return `\n{\n${lines}}`;
}

formatterController.addFormatter('stylish', stylish);
