import { readFileSync } from 'node:fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import getFormat from './formatters/index.js';

const getFilepath = (filepath) => path.resolve(process.cwd(), filepath);
const getExtension = (filepath) => path.extname(filepath);
const readFile = (filepath) => readFileSync(getFilepath(filepath));

const ast = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = keys.reduce((acc, key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      acc.push({ type: 'nested', key, children: ast(file1[key], file2[key]) });
    } else if (!Object.hasOwn(file1, key)) {
      acc.push({ type: 'added', key, value: file2[key] });
    } else if (!Object.hasOwn(file2, key)) {
      acc.push({ type: 'removed', key, value: file1[key] });
    } else if (file1[key] !== file2[key]) {
      acc.push({
        type: 'changed', key, oldValue: file1[key], newValue: file2[key]
      });
    } else {
      acc.push({ type: 'unchanged', key, value: file1[key] });
    }
    return acc;
  }, []);
  console.log(result);
  return result;
};

const genDiff = (data1, data2, format = 'stylish') => {
  const file1 = readFile(data1);
  const file2 = readFile(data2);
  const file1Parsed = parse(file1, getExtension(data1));
  const file2Parsed = parse(file2, getExtension(data2));
  const nodes = ast(file1Parsed, file2Parsed);
  return getFormat(nodes, format);
};
export default genDiff;
