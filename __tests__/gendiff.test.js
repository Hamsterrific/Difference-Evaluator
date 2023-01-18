import { readFileSync } from 'node:fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getFixturePath(filename));

const cases = [
  ['file1.json', 'file2.json', 'expected_stylish.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'expected_stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'expected_plain.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'expected_plain.txt', 'plain'],
  ['file1.json', 'file2.json', 'expected_json.txt', 'json'],
  ['file1.yml', 'file2.yml', 'expected_json.txt', 'json'],
];

test.each(cases)('compares two files in set format', (file1, file2, expected, format) => {
  const result = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  expect(result).toEqual(readFixtureFile(expected));
});
