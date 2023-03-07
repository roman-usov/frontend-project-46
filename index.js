import genDiffForFlatObjs from './src/genDiffForFlatObjs.js';
import parseFile from './src/parsers.js';

export default function genDiff(originalFilePath, changedFilePath) {
  return genDiffForFlatObjs(parseFile(originalFilePath), parseFile(changedFilePath));
}
