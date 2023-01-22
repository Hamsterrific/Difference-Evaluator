import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yml'];

const expectedStylish = readFixtureFile('expected_stylish.txt');
const expectedPlain = readFixtureFile('expected_plain.txt');
const expectedJSON = readFixtureFile('expected_json.txt');

test.each(formats)('compares two files and displays differences in set format', (extension) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);
  expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJSON);
});
