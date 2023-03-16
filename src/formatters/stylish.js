import { INDENT_CHAR, SPACES_PER_INDENT, SPACES_FOR_CHANGE_INFO } from '../constants.js';
import { stringify } from '../utils.js';
import formatterController from './formatterController.js';

function stylish(data) {
  function iterate(val) {
    return val.reduce((acc, element) => {
      const [key, details] = Object.entries(element).flat();

      const indentBefore = INDENT_CHAR.repeat(
        SPACES_PER_INDENT * details.depth - SPACES_FOR_CHANGE_INFO,
      );
      const indentAfter = INDENT_CHAR.repeat(SPACES_PER_INDENT * details.depth);

      if (details.children) {
        return `${acc}${indentBefore}${details.status}${key}: {\n${iterate(
          details.children,
        )}${indentAfter}}\n`;
      }

      return `${acc}${indentBefore}${details.status}${key}:${
        details.value === '' ? '' : ' '
      }${stringify(details.value, INDENT_CHAR, SPACES_PER_INDENT, details.depth + 1)}\n`;
    }, '');
  }

  const lines = iterate(data);

  return `\n{\n${lines}}`;
}

formatterController.addFormatter('stylish', stylish);
