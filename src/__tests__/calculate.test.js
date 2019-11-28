import calculate from '../logic/calculate';
import { error } from '../assets/manifest.json';

describe('#calculate', () => {
  it('returns same value for equal button with an input', () => {
    const rightCalc = calculate({ total: null, next: '3', operation: null }, '=');
    const rightResult = { total: '3', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns same value for equal button with exist value', () => {
    const rightCalc = calculate({ total: '3', next: null, operation: null }, '=');
    const rightResult = { total: '3', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns correct value for equal button with zero total', () => {
    const rightCalc = calculate({ total: '0', next: '1', operation: '+' }, '=');
    const rightResult = { total: '1', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns correct value for equal button with zero next', () => {
    const rightCalc = calculate({ total: '1', next: '0', operation: '+' }, '=');
    const rightResult = { total: '1', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns empty value for AC button', () => {
    const rightCalc = calculate({ total: '1', next: '0', operation: '+' }, 'AC');
    const rightResult = { total: null, next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns percentage value for % button with an input', () => {
    const rightCalc = calculate({ total: null, next: '60', operation: null }, '%');
    const rightResult = { total: '0.6', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns percentage value for % button with exist value', () => {
    const rightCalc = calculate({ total: '60', next: null, operation: null }, '%');
    const rightResult = { total: '0.6', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns percentage value for % button after completing calculation', () => {
    const rightCalc = calculate({ total: '20', next: '3', operation: 'x' }, '%');
    const rightResult = { total: '0.6', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns correct value for equal button with zero next', () => {
    const rightCalc = calculate({ total: null, next: '0', operation: null }, '0');
    const rightResult = { total: null, next: '0', operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns correct value for equal button with zero next for decimal point', () => {
    const firstCalc = calculate({ total: null, next: '0.', operation: null }, '0');
    const firstResult = { total: null, next: '0.0', operation: null };
    expect(firstCalc).toEqual(firstResult);
    const secondCalc = calculate({ total: null, next: '0.0', operation: null }, '3');
    const secondResult = { total: null, next: '0.03', operation: null };
    expect(secondCalc).toEqual(secondResult);
  });

  it('returns error for % button right after operator button', () => {
    const { total } = calculate({ total: null, next: '3', operation: 'x' }, '%');
    expect(total).toEqual(error.expression);
  });

  it('returns error for % button right after operator button with exist value', () => {
    const { total } = calculate({ total: '3', next: null, operation: 'x' }, '%');
    expect(total).toEqual(error.expression);
  });

  it('returns swapped sign value for +/- button with an input', () => {
    const rightCalc = calculate({ total: null, next: '60', operation: null }, '+/-');
    const rightResult = { total: '-60', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns swapped sign value for +/- button with exist value', () => {
    const rightCalc = calculate({ total: '60', next: null, operation: null }, '+/-');
    const rightResult = { total: '-60', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns swapped sign value for +/- button after completing calculation', () => {
    const rightCalc = calculate({ total: '20', next: '3', operation: 'x' }, '+/-');
    const rightResult = { total: '-60', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns error for +/- button right after operator button', () => {
    const { total } = calculate({ total: null, next: '3', operation: 'x' }, '+/-');
    expect(total).toEqual(error.expression);
  });

  it('returns error for +/- button right after operator button with exist value', () => {
    const { total } = calculate({ total: '3', next: null, operation: 'x' }, '+/-');
    expect(total).toEqual(error.expression);
  });

  it('returns error for arithmetic calculation button repeated input', () => {
    const { total } = calculate({ total: '3', next: null, operation: 'x' }, '+');
    expect(total).toEqual(error.expression);
  });

  it('returns error for zero division', () => {
    const { total } = calculate({ total: '1', next: '0', operation: '÷' }, '-');
    expect(total).toEqual(error.zeroDivisionError);
  });

  it('returns error for double arithmetic', () => {
    const { total } = calculate({ total: null, next: '60', operation: 'x' }, '+');
    expect(total).toEqual(error.expression);
  });

  it('returns error for double mixed operation', () => {
    const { total } = calculate({ total: null, next: '60', operation: 'x' }, '+/-');
    expect(total).toEqual(error.expression);
  });

  it('returns correct value second calculation', () => {
    const firstResult = '-1';
    const secondFactor = '3';
    const secondCalc = calculate({ total: '1', next: '2', operation: '-' }, '+');
    const secondResult = { total: firstResult, next: null, operation: '+' };
    expect(secondCalc).toEqual(secondResult);

    const thirdCalc = calculate({ total: firstResult, next: secondFactor, operation: 'x' }, '=');
    const thirdResult = { total: '-3', next: null, operation: null };
    expect(thirdCalc).toEqual(thirdResult);
  });

  it('returns correct value for decimal point value with arithmetic operation', () => {
    const rightCalc = calculate({ total: '2.3', next: '30.02', operation: '+' }, '=');
    const rightResult = { total: '32.32', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns correct value for decimal point value with other operation', () => {
    const rightCalc = calculate({ total: '2.3', next: '30.02', operation: '+' }, '%');
    const rightResult = { total: '0.3232', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns correct value for decimal point without further number and submit', () => {
    const rightCalc = calculate({ total: null, next: '30.', operation: null }, '=');
    const rightResult = { total: '30', next: null, operation: null };
    expect(rightCalc).toEqual(rightResult);
  });

  it('returns error for decimal point doubled input', () => {
    const { total } = calculate({ total: null, next: '2.3', operation: null }, '.');
    expect(total).toEqual(error.expression);
  });

  it('returns error for decimal point input right after decimal point', () => {
    const { total } = calculate({ total: null, next: '30.', operation: null }, '.');
    expect(total).toEqual(error.expression);
  });

  it('returns error for decimal point doubled with exist value', () => {
    const { total } = calculate({ total: '2.3', next: null, operation: null }, '.');
    expect(total).toEqual(error.expression);
  });

  it('returns error for decimal point input before submit', () => {
    const { total } = calculate({ total: '2.3', next: '30.02', operation: '+' }, '.');
    expect(total).toEqual(error.expression);
  });

  it('returns error for decimal point input only twice times', () => {
    const { total } = calculate({ total: null, next: '30.', operation: null }, '.');
    expect(total).toEqual(error.expression);
  });

  it('returns error for decimal point only after operation input', () => {
    const { total } = calculate({ total: '30.02', next: null, operation: '+' }, '.');
    expect(total).toEqual(error.expression);
  });

  it('returns error for decimal point only starting calculation', () => {
    const { total } = calculate({ total: null, next: null, operation: null }, '.');
    expect(total).toEqual(error.expression);
  });

  it('returns error for longer than 20 sized decimal point input', () => {
    const { total } = calculate({ total: null, next: `8.${'8'.repeat(11)}`, operation: null }, '8');
    expect(total).toEqual(error.long);
  });

  it('returns error for longer than 20 sized natural number input', () => {
    const { total } = calculate({ total: null, next: '8'.repeat(20), operation: null }, '8');
    expect(total).toEqual(error.long);
  });
});
