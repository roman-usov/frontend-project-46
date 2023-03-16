import path from 'path';
import isObject from 'lodash.isobject';

export function getFileExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf('.') + 1);
}

export function getAbsolutePath(filePath) {
  return path.resolve(filePath);
}

export function indent(indentStr, count) {
  return indentStr.repeat(count);
}

export function stringify(data, replacer = ' ', replacerCount = 1, startingDepth = 1) {
  function iterator(value, depth = 1) {
    if (!isObject(value)) {
      return `${value}`;
    }

    const indentSize = replacerCount * depth;
    const indentBeforeKey = indent(replacer, indentSize);
    const indentBeforeClosingParen = indent(replacer, indentSize - replacerCount);

    const lines = Object.entries(value).reduce(
      (prevStr, [key, val]) => `${prevStr}${indentBeforeKey}${key}: ${iterator(val, depth + 1)}\n`,
      '',
    );

    return `{\n${lines}${indentBeforeClosingParen}}`;
  }

  return iterator(data, startingDepth);
}
