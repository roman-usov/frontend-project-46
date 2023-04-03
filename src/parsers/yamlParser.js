import jsYaml from 'js-yaml';

export default function parseYaml(fileContent) {
  return jsYaml.load(fileContent, 'utf8');
}
