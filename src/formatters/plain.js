import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (data) => {
  const iter = (item, key = '') => {
    const keys = [...key, item.key];
    switch (item.type) {
      case 'nested':
        return item.children.flatMap((child) => iter(child, keys)).join('\n');
      case 'removed':
        return `Property '${keys.join('.')}' was removed`;
      case 'added':
        return `Property '${keys.join('.')}' was added with value: ${stringify(item.value)}`;
      case 'changed':
        return `Property '${keys.join('.')}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type ${item.type}`);
    }
  };
  const result = data.map((node) => iter(node));
  return `${result.join('\n')}`;
};

export default plain;
