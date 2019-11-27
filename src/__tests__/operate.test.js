import operate from '../logic/operate';
import { error } from '../assets/manifest.json';

describe('#operate', () => {
  it('returns correct value for arithmetic calculation', () => {
    expect(operate('0', '1', '+')).toBe('1');
    expect(operate('1', '0', '+')).toBe('1');
    expect(operate('0', '1', '-')).toBe('-1');
    expect(operate('1', '0', '-')).toBe('1');
    expect(operate('0', '1', 'x')).toBe('0');
    expect(operate('2', '3', 'x')).toBe('6');
    expect(operate('0', '3', '÷')).toBe('0');
    expect(operate('6', '3', '÷')).toBe('2');
  });

  it('returns zero value for %', () => {
    expect(operate(null, '0', '%')).toBe('0');
    expect(operate('0', null, '%')).toBe('0');
  });

  it('returns percentage value for %', () => {
    expect(operate(null, '60', '%')).toBe('0.6');
    expect(operate('60', null, '%')).toBe('0.6');
  });

  it('returns zero value for +/-', () => {
    expect(operate(null, '0', '+/-')).toBe('0');
    expect(operate('0', null, '+/-')).toBe('0');
  });

  it('returns changed sign value for +/-', () => {
    expect(operate('60', null, '+/-')).toBe('-60');
    expect(operate('-60', null, '+/-')).toBe('60');
  });

  it('returns correct value for calculated long decimal point value', () => {
    const long = '8'.repeat(12);
    const short = '8'.repeat(1);
    expect(operate(`${long}.${short}`, `${long}.${short}`, 'x')).toBe(error.long);
    expect(operate(null, `${long}.${long}`, '8')).toBe(`${long}.${'8'.repeat(6)}9`);
  });

  it('returns error for longer than 20 sized integral part number', () => {
    expect(operate(null, `${'8'.repeat(20)}.8`, '8')).toBe(error.long);
    expect(operate(null, `-${'8'.repeat(19)}`, '8')).toBe(error.long);
    expect(operate(null, '8'.repeat(20), '8')).toBe(error.long);
  });

  it('returns error for zero division', () => {
    expect(operate('1', '0', '÷')).toBe(error.zeroDivisionError);
  });

  it('returns error for uncomplete operation for arithmetic operation', () => {
    expect(operate(null, null, 'x')).toBe(error.expression);
    expect(operate(null, '1', 'x')).toBe(error.expression);
    expect(operate('1', null, 'x')).toBe(error.expression);
  });

  it('returns error for uncomplete operation for rest operation', () => {
    expect(operate(null, null, '+/-')).toBe(error.expression);
    expect(operate(null, null, '%')).toBe(error.expression);
  });
});
