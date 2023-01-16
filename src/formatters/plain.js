import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (data) => {
  const iter = (node, key = '') => {
    const result = node.flatMap((item) => {
      const keys = [...key, item.key];
      if (item.type === 'nested') {
        return iter(item.children, keys);
      } if (item.type === 'removed') {
        return `Property '${keys.join('.')}' was removed`;
      } if (item.type === 'added') {
        return `Property '${keys.join('.')}' was added with value: ${stringify(item.value)}`;
      } if (item.type === 'changed') {
        return `Property '${keys.join('.')}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
      } if (item.type === 'unchanged') {
        return null;
      } throw new Error(`Unknown type: ${item.type}`);
    });

    return result.filter((item) => item !== null).join('\n');
  };
  return iter(data, []);
};

export default plain;
