import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../../index.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixtureAbsPath = (filename) => path.join(__dirname, '__fixtures__', filename);
const getFixtureRelPath = (filename) => path.join('src', '__tests__', '__fixtures__', filename);

const expected = fs.readFileSync(getFixtureAbsPath('expected-result'), 'utf8').trimEnd();

const cases = [
  {
    name: 'json',
    originalFileAbsPath: getFixtureAbsPath('original-file.json'),
    changedFileRelPath: getFixtureRelPath('changed-file.json'),
  },
  {
    name: 'yaml',
    originalFileAbsPath: getFixtureAbsPath('original-file.yaml'),
    changedFileRelPath: getFixtureRelPath('changed-file.yml'),
  },
  {
    name: 'yaml and json',
    originalFileAbsPath: getFixtureAbsPath('original-file.json'),
    changedFileRelPath: getFixtureRelPath('changed-file.yml'),
  },
];

describe.each(cases)(
  'when it compares two files',
  ({ name, originalFileAbsPath, changedFileRelPath }) => {
    test(`it should display unchanged, changed, added and deleted lines for ${name}`, () => {
      const actual = genDiff(originalFileAbsPath, changedFileRelPath);

      expect(actual).toEqual(expected);
    });
  },
);
