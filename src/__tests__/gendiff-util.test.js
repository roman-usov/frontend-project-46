import path from 'path';
import genDiff from '../gendiff-util.js';

describe('main flow scenarios', () => {
  const originalFileAbsPath = path.resolve(process.cwd(), 'src/__tests__/__fixtures__/main-flow-case/file1.json');
  const changedFileRelPath = 'src/__tests__/__fixtures__/main-flow-case/file2.json';

  test('it should display unchanged and changed lines', () => {
    const expectedResult = `\n{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(originalFileAbsPath, changedFileRelPath)).toEqual(expectedResult);
  });
});

describe('alternative flow scenarios', () => {
  const originalFilePath = 'src/__tests__/__fixtures__/error-case/file1.json';
  const changedFilePath = 'src/__tests__/__fixtures__/error-case/file2.txt';

  test('it should display error when file extensions do not match', () => {
    const expectedResult = 'Please, make sure the files have the same extension.';

    expect(genDiff(originalFilePath, changedFilePath)).toEqual(expectedResult);
  });
});
