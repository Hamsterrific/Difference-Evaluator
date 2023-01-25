import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(buildFixturePath(filename), 'utf-8');

const formats = ['json', 'yml'];

const expectedStylish = readFixtureFile('expected_stylish.txt');
const expectedPlain = readFixtureFile('expected_plain.txt');
const expectedJSON = readFixtureFile('expected_json.txt');

test.each(formats)('compares two files and displays differences in set format', (format) => {
  const filepath1 = buildFixturePath(`file1.${format}`);
  const filepath2 = buildFixturePath(`file2.${format}`);
  expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJSON);
});
