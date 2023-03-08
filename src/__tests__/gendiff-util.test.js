import genDiff from '../../index.js';
import { getAbsolutePath } from '../parsers.js';
import { ParserController } from '../ParserController.js';

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

describe('parser controller tests', () => {
  const parserController = new ParserController();

  test('it should allow creating only a single instance of the parserController', () => {
    expect(parserController).toEqual(new ParserController());
  });

  test('it should throw an error if an unsupported parser type is provided', () => {
    const unsupportedParser = () => '';
    const unsupportedType = 'unsupportedType';

    expect(() => {
      parserController.addParser(unsupportedType, unsupportedParser);
    }).toThrow('This parser type is not supported yet.');
  });
});
