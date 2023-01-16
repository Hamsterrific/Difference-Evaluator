import plain from './plain.js';
import stylish from './stylish.js';

const getFormat = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default getFormat;
