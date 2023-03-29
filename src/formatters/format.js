import formatterController from './formatterController.js';
import './stylish.js';
import './plain.js';

// eslint-disable-next-line consistent-return
export default function format(changes, type = 'stylish') {
  try {
    return formatterController.getFormatter(type)(changes);
  } catch (e) {
    console.error('Failed to format the output.');
  }
}
