import { read, readFileSync } from 'node:fs';
import _ from 'lodash';
import parse from './parsers.js';
import path from 'path';

const getFilepath = (file) => path.resolve(process.cwd(), file);
const getFormat = (filepath) => path.extname(filepath);
const readFile = (filepath) => readFileSync(getFilepath(filepath));

const ast = (file1, file2) => {
  const entries1 = Object.entries(file1);
  const entries2 = Object.entries(file2);
  const entries = _.sortBy([...entries1, ...entries2]);
  const result = entries.reduce((acc, [key, value]) => {
    if (!Object.hasOwn(file1, key)) {
      acc[key] = { type: 'added', value };
    } else if (!Object.hasOwn(file2, key)) {
      acc[key] = { type: 'removed', value };
    } else if (file1[key] !== file2[key]) {
      acc[key] = { type: 'modified', oldValue: file1[key], newValue: file2[key] };
    } else {
      acc[key] = { type: 'unchanged', value };
    }
    return acc;
  }, {});
  return result;
};

const formatData = (data) => {
  const entries = Object.entries(data);
  /* eslint-disable no-param-reassign */
  const result = entries.reduce((acc, [key, desc]) => {
    const { type, value } = desc;
    if (type === 'removed') {
      acc += `-${key}: ${value}\n`;
    } else if (type === 'added') {
      acc += `+${key}: ${value}\n`;
    } else if (type === 'unchanged') {
      acc += ` ${key}: ${value}\n`;
    } else if (type === 'modified') {
      acc += `-${key}: ${desc.oldValue}\n`;
      acc += `+${key}: ${desc.newValue}\n`;
    }
    return acc;
  }, '');
  /* eslint-enable no-param-reassign */
  return '{\n' + result + '}';
};

const genDiff = (data1, data2) => {
  const file1 = readFile(data1);
  const file2 = readFile(data2);
  const file1Parsed = parse(file1, getFormat(data1));
  const file2Parsed = parse(file2, getFormat(data2));
  const nodeTypes = ast(file1Parsed, file2Parsed);
  return formatData(nodeTypes);
};
export default genDiff;
