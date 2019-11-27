import Big from 'big.js';
import { error } from '../assets/manifest.json';

function operate(numberOne, numberTwo, operation) {
  if ((operation === '%' || operation === '+/-') && (numberOne === null && numberTwo === null)) {
    return error.expression;
  }
  if (
    operation !== null
    && operation.match(/[-+x÷]/)
    && operation !== '+/-'
    && (numberOne === null || numberTwo === null)
  ) {
    return error.expression;
  }

  let res;
  let temp;
  switch (operation) {
    case '+':
      res = Big(numberOne).plus(numberTwo);
      break;
    case '-':
      res = Big(numberOne).minus(numberTwo);
      break;
    case 'x':
      res = Big(numberOne).times(numberTwo);
      break;
    case '÷':
      if (numberTwo === '0') {
        return error.zeroDivisionError;
      }
      res = Big(numberOne).div(numberTwo);
      break;
    case '%':
      temp = numberOne || numberTwo || '0';
      res = Big(temp).div('100');
      break;
    case '+/-':
      temp = numberOne || numberTwo || '0';
      res = temp !== '0' ? Big(temp).times('-1') : '0';
      break;
    default:
      res = numberOne || numberTwo || '0';
  }
  res = res.toString();
  if (res.match(/e+/) || res.split('.')[0].length >= 20) {
    return error.long;
  }
  if (res.match(/\./) && res.split('.')[1].length >= 7) {
    res = Big(res)
      .toFixed(7)
      .toString();
  }
  if (res[res.length - 1] === '.') {
    res = res.slice(0, res.length - 1);
  }
  return res.toString();
}

export default operate;
