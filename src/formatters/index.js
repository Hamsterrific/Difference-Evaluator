import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formatData = (tree, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return formatStylish(tree);
    case 'plain':
      return formatPlain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Unknown format: ${outputFormat}`);
  }
};

export default formatData;
