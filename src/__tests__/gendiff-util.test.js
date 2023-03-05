import genDiff from '../gendiff-util.js';
import { getAbsolutePath } from '../parsers.js';

describe('main flow scenarios', () => {
  const expectedResult = `\n{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  test('it should display unchanged and changed lines for json', () => {
    const originalFileAbsPath = getAbsolutePath(
      'src/__tests__/__fixtures__/main-flow-case/file1.json',
    );
    const changedFileRelPath = 'src/__tests__/__fixtures__/main-flow-case/file2.json';

    expect(genDiff(originalFileAbsPath, changedFileRelPath)).toEqual(expectedResult);
  });

  test('it should display unchanged and changed lines for yaml', () => {
    const originalFileAbsPath = getAbsolutePath(
      'src/__tests__/__fixtures__/main-flow-case/file1.yaml',
    );
    const changedFileRelPath = 'src/__tests__/__fixtures__/main-flow-case/file2.yml';

    expect(genDiff(originalFileAbsPath, changedFileRelPath)).toEqual(expectedResult);
  });

  test('it should display unchanged and changed lines for yaml and json', () => {
    const originalFileAbsPath = getAbsolutePath(
      'src/__tests__/__fixtures__/main-flow-case/file1.json',
    );
    const changedFileRelPath = 'src/__tests__/__fixtures__/main-flow-case/file2.yml';

    expect(genDiff(originalFileAbsPath, changedFileRelPath)).toEqual(expectedResult);
  });
});
