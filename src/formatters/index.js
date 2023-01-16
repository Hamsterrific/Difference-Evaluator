import stylish from './stylish.js';

const getFormat = (nodes, format) => {
  switch (format) {
    case 'stylish':
      return stylish(nodes);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default getFormat;