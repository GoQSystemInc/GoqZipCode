import { expect } from '@jest/globals';
import { convertHyphenatedZipCode } from './';

test('郵便番号にハイフンを追加', () => {
  expect(convertHyphenatedZipCode('7340001')).toBe('734-0001');
});
