import plain from './plain.js';
import stylish from './stylish.js';

const formatData = (tree, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Unknown format: ${outputFormat}`);
  }
};

export default formatData;
