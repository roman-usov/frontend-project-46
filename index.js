import genDiffForNestedObjs from './src/genDiffForNestedObjs.js';
import parse from './src/parsers/parse.js';
import format from './src/formatters/format.js';

export default function genDiff(originalFilePath, changedFilePath, formatType) {
  const changes = genDiffForNestedObjs(parse(originalFilePath), parse(changedFilePath));
  return format(changes, formatType);
}
