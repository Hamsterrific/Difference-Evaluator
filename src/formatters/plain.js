import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const plain = (data) => {
  const iter = (node, path) => node.flatMap((item) => {
    const newPath = [...path, item.key];
    switch (item.type) {
      case 'nested':
        return iter(item.children, newPath);
      case 'added':
        return `Property '${newPath.join('.')}' was added with value: ${stringify(item.value)}`;
      case 'removed':
        return `Property '${newPath.join('.')}' was removed`;
      case 'changed':
        return `Property '${newPath.join('.')}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${item.type}`);
    }
  });
  return `${iter(data, []).join('\n')}`;
};

export default plain;
