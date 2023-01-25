import _ from 'lodash';

const setIndent = (num, str = ' ') => str.repeat(num * 4 - 2);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${setIndent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${result.join('\n')}\n  ${setIndent(depth)}}`;
};

const stylish = (data) => {
  const iter = (node, depth = 1) => {
    const result = node.map((item) => {
      switch (item.type) {
        case 'nested':
          return `${setIndent(depth)}  ${item.key}: {\n${iter(item.children, depth + 1)}\n${setIndent(depth)}  }`;
        case 'removed':
          return `${setIndent(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'added':
          return `${setIndent(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'changed':
          return `${setIndent(depth)}- ${item.key}: ${stringify(item.value1, depth)}\n${setIndent(depth)}+ ${item.key}: ${stringify(item.value2, depth)}`;
        case 'unchanged':
          return `${setIndent(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
        default: throw new Error(`Unknown type: ${item.type}`);
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(data)}\n}`;
};

export default stylish;
