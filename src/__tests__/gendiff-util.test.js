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

  const testPathNames = {
    json: {
      originalFileAbsPath: getAbsolutePath('src/__tests__/__fixtures__/main-flow-case/file1.json'),
      changedFileRelPath: 'src/__tests__/__fixtures__/main-flow-case/file2.json',
    },
    yaml: {
      originalFileAbsPath: getAbsolutePath('src/__tests__/__fixtures__/main-flow-case/file1.yaml'),
      changedFileRelPath: 'src/__tests__/__fixtures__/main-flow-case/file2.yml',
    },
    yamlAndJson: {
      originalFileAbsPath: getAbsolutePath('src/__tests__/__fixtures__/main-flow-case/file1.json'),
      changedFileRelPath: 'src/__tests__/__fixtures__/main-flow-case/file2.yml',
    },
  };

  test('it should display unchanged and changed lines for json', () => {
    expect(
      genDiff(testPathNames.json.originalFileAbsPath, testPathNames.json.changedFileRelPath),
    ).toEqual(expectedResult);
  });

  test('it should display unchanged and changed lines for yaml', () => {
    expect(
      genDiff(testPathNames.yaml.originalFileAbsPath, testPathNames.yaml.changedFileRelPath),
    ).toEqual(expectedResult);
  });

  test('it should display unchanged and changed lines for yaml and json', () => {
    expect(
      genDiff(
        testPathNames.yamlAndJson.originalFileAbsPath,
        testPathNames.yamlAndJson.changedFileRelPath,
      ),
    ).toEqual(expectedResult);
  });
});
