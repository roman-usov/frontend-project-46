import genDiffForFlatObjs from './genDiffForFlatObjs.js';
import parseFile from './parsers.js';

export default function genDiff(originalFilePath, changedFilePath) {
  return genDiffForFlatObjs(parseFile(originalFilePath), parseFile(changedFilePath));
}
