import { readFileSync } from 'node:fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('first', () => {
  const expected = readFixtureFile('result.txt');
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toEqual(expected);
});
