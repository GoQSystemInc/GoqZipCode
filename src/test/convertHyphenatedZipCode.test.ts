import { expect } from '@jest/globals';
import { goqZipCode } from './goqZipCode';

describe('オプションによってハイフンを付与', () => {
  test('オプションでハイフンありを指定している場合、郵便番号にハイフンを追加する', () => {
    expect(goqZipCode.convertHyphenatedZipCode('7340001')).toBe('734-0001');
  });
});
