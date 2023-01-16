import _ from 'lodash';

const setIndent = (num, str = ' ') => str.repeat(num * 4 - 2);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const newKey = value[key];
    return `${setIndent(depth + 1)}  ${key}: ${stringify(newKey, depth + 1)}`;
  });
  return `{\n${result.join('\n')}\n  ${setIndent(depth)}}`;
};

const stylish = (data) => {
  const iter = (node, depth = 1) => {
    const result = node.reduce((acc, item) => {
      if (item.type === 'nested') {
        acc.push(`${setIndent(depth)}  ${item.key}: {\n${iter(item.children, depth + 1)}\n${setIndent(depth)}  }`);
      } else if (item.type === 'removed') {
        acc.push(`${setIndent(depth)}- ${item.key}: ${stringify(item.value, depth)}`);
      } else if (item.type === 'added') {
        acc.push(`${setIndent(depth)}+ ${item.key}: ${stringify(item.value, depth)}`);
      } else if (item.type === 'changed') {
        acc.push((`${setIndent(depth)}- ${item.key}: ${stringify(item.oldValue, depth)}\n${setIndent(depth)}+ ${item.key}: ${stringify(item.newValue, depth)}`));
      } else if (item.type === 'unchanged') {
        acc.push(`${setIndent(depth)}  ${item.key}: ${stringify(item.value, depth)}`);
      } else {
        throw new Error(`Unknown type: ${item.type}`);
      }
      return acc;
    }, []);
    return result.join('\n');
  };
  return `{\n${iter(data)}\n}`;
};

export default stylish;
