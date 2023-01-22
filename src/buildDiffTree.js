import _ from 'lodash';

const buildDiffTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const result = keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { type: 'nested', key, children: buildDiffTree(file1[key], file2[key]) };
    }
    if (!Object.hasOwn(file1, key)) {
      return { type: 'added', key, value: file2[key] };
    }
    if (!Object.hasOwn(file2, key)) {
      return { type: 'removed', key, value: file1[key] };
    }
    if (file1[key] !== file2[key]) {
      return {
        type: 'changed',
        key,
        oldValue: file1[key],
        newValue: file2[key],
      };
    } return { type: 'unchanged', key, value: file1[key] };
  });
  return result;
};

export default buildDiffTree;
