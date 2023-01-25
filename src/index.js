import { readFileSync } from 'node:fs';
import path from 'path';
import parse from './parsers.js';
import formatData from './formatters/index.js';
import buildDiffTree from './buildDiffTree.js';

const buildAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const extractFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => {
  const data = readFileSync(buildAbsolutePath(filepath));
  return parse(data, extractFormat(filepath));
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const tree = buildDiffTree(data1, data2);
  return formatData(tree, outputFormat);
};
export default genDiff;
