import yaml from 'js-yaml';

const parse = (file, format) => {
    if (format === '.json') {
      return JSON.parse(file);
    }
    if (format === '.yaml' || format === '.yml') {
    return yaml.load(file);
    }
    else {
      throw new Error('Wrong format');
    }
  }
  
export default parse;
