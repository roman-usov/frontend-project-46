import genDiffForNestedObjs from './src/genDiffForNestedObjs.js';
import parse from './src/parsers/parse.js';
import format from './src/formatters/format.js';

// eslint-disable-next-line consistent-return
export default function genDiff(originalFilePath, changedFilePath, formatType) {
  try {
    const changes = genDiffForNestedObjs(parse(originalFilePath), parse(changedFilePath));
    return format(changes, formatType);
  } catch (e) {
    console.error('Failed to generate the diff.');
  }
}
