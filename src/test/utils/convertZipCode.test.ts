import { expect } from '@jest/globals';
import { goqZipCode } from '../goqZipCode';

describe('convertZipCodeの動作をテスト', () => {
  const expectedZipCodeExcludingHyphen = '7320021';

  test('全角の郵便番号を半角に変換', () => {
    expect(goqZipCode.convertZipCode('７３２００２１')).toBe(
      expectedZipCodeExcludingHyphen
    );
  });

  test('全角の郵便番号を半角に変換して、ハイフンを削除', () => {
    expect(goqZipCode.convertZipCode('７３２ー００２１')).toBe(
      expectedZipCodeExcludingHyphen
    );
  });

  test('半角のハイフンを削除', () => {
    expect(goqZipCode.convertZipCode('732-0021')).toBe(
      expectedZipCodeExcludingHyphen
    );
  });

  test('半角と全角の郵便番号を半角に変換', () => {
    expect(goqZipCode.convertZipCode('７３2００２1')).toBe(
      expectedZipCodeExcludingHyphen
    );
  });
});
