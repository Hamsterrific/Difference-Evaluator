import { readFileSync } from 'node:fs';
import path from 'path';
import parse from './parsers.js';
import getFormat from './formatters/index.js';
import ast from './ast.js';

const getFilepath = (filepath) => path.resolve(process.cwd(), filepath);
const getExtension = (filepath) => path.extname(filepath);
const readFile = (filepath) => readFileSync(getFilepath(filepath));

const genDiff = (data1, data2, format = 'stylish') => {
  const file1 = readFile(data1);
  const file2 = readFile(data2);
  const file1Parsed = parse(file1, getExtension(data1));
  const file2Parsed = parse(file2, getExtension(data2));
  const nodes = ast(file1Parsed, file2Parsed);
  return getFormat(nodes, format);
};
export default genDiff;
