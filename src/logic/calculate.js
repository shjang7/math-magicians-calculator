import operate from './operate';
import { error } from '../assets/manifest.json';

function calculate(calculator, buttonName) {
  const { total, next, operation } = calculator;
  let updatedTotal = null;
  let updatedNext = null;

  switch (buttonName) {
    case '=':
      updatedTotal = operate(total, next, operation);
      return { total: updatedTotal, next: null, operation: null };
    case 'AC':
      return { total: null, next: null, operation: null };
    case '%':
    case '+/-':
      if (total === null && next !== null && operation !== null) break;
      if (total !== null && next === null && operation !== null) break;
      updatedTotal = total && next && operation ? operate(total, next, operation) : total;
      updatedTotal = operate(updatedTotal, next, buttonName);
      return { total: updatedTotal, next: null, operation: null };
    case '+':
    case '-':
    case 'x':
    case '÷':
      if (total !== null) {
        if (next !== null && operation !== null) {
          updatedTotal = operate(total, next, operation);
          return { total: updatedTotal, next: null, operation: buttonName };
        }
        if (next === null && operation !== null) break;
        return { total, next, operation: buttonName };
      }
      if (total === null && next && operation === null) {
        return { total: next, next: null, operation: buttonName };
      }
      break;
    case '.':
      if (total !== null && next === null && operation !== null) break;
      if (total === null && next === null && operation === null) break;
      if (next !== null && next.match(/\./)) break;
      if (total !== null && next === null && operation === null) {
        if (total.split('.')[1]) break;
        return { total: null, next: total + buttonName, operation };
      }
      return { total, next: next !== null ? next + buttonName : buttonName, operation };
    default:
      if (!!next && (next.length >= 20 || (next.match(/\./) && next.split('.')[1].length >= 7))) {
        return { total: error.long, next: null, operation: null };
      }
      if (total && next === null && operation === null) {
        return { total: null, next: buttonName, operation };
      }
      updatedNext
        = next === null || next === '0' ? buttonName : operate(null, next + buttonName, '=');
      return { total, next: updatedNext, operation };
  }
  return { total: error.expression, next: null, operation: null };
}

export default calculate;
