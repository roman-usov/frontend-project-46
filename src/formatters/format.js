import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

// eslint-disable-next-line consistent-return
export default function format(changes, type = 'stylish') {
  try {
    switch (type) {
      case 'plain': {
        return plain(changes);
      }
      case 'json': {
        return json(changes);
      }
      default: {
        return stylish(changes);
      }
    }
  } catch (e) {
    console.error('Failed to format the output.');
  }
}
