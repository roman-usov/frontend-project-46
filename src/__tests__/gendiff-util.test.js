import { describe, expect, test } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../../index.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixtureAbsPath = (filename) => path.join(__dirname, '__fixtures__', filename);
const getFixtureRelPath = (filename) => path.join('src', '__tests__', '__fixtures__', filename);

const cases = [
  {
    name: 'json',
    originalFileAbsPath: getFixtureAbsPath('original-file.json'),
    changedFileRelPath: getFixtureRelPath('changed-file.json'),
    formatType: 'stylish',
    expected: fs.readFileSync(getFixtureAbsPath('expected-result-stylish'), 'utf8').trimEnd(),
  },
  {
    name: 'yaml',
    originalFileAbsPath: getFixtureAbsPath('original-file.yaml'),
    changedFileRelPath: getFixtureRelPath('changed-file.yml'),
    expected: fs.readFileSync(getFixtureAbsPath('expected-result-stylish'), 'utf8').trimEnd(),
  },
  {
    name: 'yaml and json',
    originalFileAbsPath: getFixtureAbsPath('original-file.json'),
    changedFileRelPath: getFixtureRelPath('changed-file.yml'),
    expected: fs.readFileSync(getFixtureAbsPath('expected-result-stylish'), 'utf8').trimEnd(),
  },
  {
    name: 'json',
    originalFileAbsPath: getFixtureAbsPath('original-file.json'),
    changedFileRelPath: getFixtureRelPath('changed-file.json'),
    formatType: 'plain',
    expected: fs.readFileSync(getFixtureAbsPath('expected-result-plain'), 'utf8').trimEnd(),
  },
];

describe.each(cases)(
  'when it compares two files',
  ({ name, originalFileAbsPath, changedFileRelPath, formatType, expected }) => {
    test(`it should display unchanged, changed, added and deleted lines for ${name} and for ${formatType} formatter`, () => {
      const actual = genDiff(originalFileAbsPath, changedFileRelPath, formatType);

      expect(actual).toEqual(expected);
    });
  },
);
