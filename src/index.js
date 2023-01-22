import { readFileSync } from 'node:fs';
import path from 'path';
import parse from './parsers.js';
import formatData from './formatters/index.js';
import buildDiffTree from './buildDiffTree.js';

const buildAbsoluteFilepath = (filepath) => path.resolve(process.cwd(), filepath);
const extractExtension = (filepath) => path.extname(filepath);
const readFile = (filepath) => {
  const data = readFileSync(buildAbsoluteFilepath(filepath));
  return parse(data, extractExtension(filepath));
};

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const tree = buildDiffTree(data1, data2);
  return formatData(tree, outputFormat);
};
export default genDiff;
