import formatterController from './formatterController.js';
import './stylish.js';

export default function format(changes, type = 'stylish') {
  return formatterController.getFormatter(type)(changes);
}
