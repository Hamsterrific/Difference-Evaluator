import { readFileSync } from 'node:fs'
import _ from 'lodash';
import path from 'path';git

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const ast = (file1, file2) => {
    const entries1 = Object.entries(file1);
    const entries2 = Object.entries(file2);
    const entries = _.sortBy([...entries1, ...entries2]);
    const result = entries.reduce((acc, [key, value]) => {
    if (!Object.hasOwn(file1, key)) {
        acc[key] = { type: 'added', value: value };
      } else if (!Object.hasOwn(file2, key)) {
        acc[key] = acc[key] = { type: 'removed', value: value };
      } else if (file1[key] !== file2[key]) {
        acc[key] = { type: 'modified', oldValue: file1[key], newValue: file2[key] }
      } else {
        acc[key] = { type: 'unchanged', value: value }
      }
      return acc;
    }, {});
    return result;
  };

  const jsonify = (obj) => {
    const entries = Object.entries(obj);
    const result = entries.reduce((acc, [key, desc]) => {
        const {type, value} = desc;
        if (type === 'removed') {
            acc = acc + `-${key}: ${value}\n`;
        } else if (type === 'added') {
            acc = acc + `+${key}: ${value}\n`;
        } else if (type === 'unchanged') {
            acc =  acc + ` ${key}: ${value}\n`;
        } else if (type === 'modified') {
            acc = acc + `-${key}: ${desc.oldValue}\n`;
            acc = acc + `+${key}: ${desc.newValue}\n`; 
        }
        return acc;
    }, '');
    return result;
  }

  const genDiff = (json1, json2) => {
    const filepath1 = getAbsolutePath(json1);
    const filepath2 = getAbsolutePath(json2);
    const file1 = readFileSync(filepath1);
    const file2 = readFileSync(filepath2);
    const file1Parsed = JSON.parse(file1);
    const file2Parsed = JSON.parse(file2);
    const nodeTypes = ast(file1Parsed, file2Parsed);
    return jsonify(nodeTypes);
  }
  export default genDiff;