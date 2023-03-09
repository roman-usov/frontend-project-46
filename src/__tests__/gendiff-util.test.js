import genDiff from '../../index.js';
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

  const testData = [
    {
      name: 'json',
      originalFileAbsPath: getAbsolutePath('src/__tests__/__fixtures__/main-flow-case/file1.json'),
      changedFileRelPath: 'src/__tests__/__fixtures__/main-flow-case/file2.json',
    },
    {
      name: 'yaml',
      originalFileAbsPath: getAbsolutePath('src/__tests__/__fixtures__/main-flow-case/file1.yaml'),
      changedFileRelPath: 'src/__tests__/__fixtures__/main-flow-case/file2.yml',
    },
    {
      name: 'yaml and json',
      originalFileAbsPath: getAbsolutePath('src/__tests__/__fixtures__/main-flow-case/file1.json'),
      changedFileRelPath: 'src/__tests__/__fixtures__/main-flow-case/file2.yml',
    },
  ];

  testData.forEach(({ name, originalFileAbsPath, changedFileRelPath }) => {
    test(`it should display unchanged and changed lines for ${name}`, () => {
      expect(genDiff(originalFileAbsPath, changedFileRelPath)).toEqual(expectedResult);
    });
  });
});
