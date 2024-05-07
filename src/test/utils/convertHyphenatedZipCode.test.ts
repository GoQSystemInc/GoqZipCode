import { expect } from '@jest/globals';
import { goqZipCode } from '../goqZipCode';

test('郵便番号にハイフンを追加', () => {
  expect(goqZipCode.convertHyphenatedZipCode('7340001')).toBe('734-0001');
});
