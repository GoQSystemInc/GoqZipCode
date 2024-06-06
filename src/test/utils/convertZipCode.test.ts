import { expect } from '@jest/globals';
import { convertZipCode } from './';

describe('郵便番号を変換する処理のテスト', () => {
  const expectedZipCodeExcludingHyphen = '7320021';

  test('全角の郵便番号を半角に変換', () => {
    expect(convertZipCode('７３２００２１')).toBe(
      expectedZipCodeExcludingHyphen
    );
  });

  test('全角の郵便番号を半角に変換して、ハイフンを削除', () => {
    expect(convertZipCode('７３２ー００２１')).toBe(
      expectedZipCodeExcludingHyphen
    );
  });

  test('半角のハイフンを削除', () => {
    expect(convertZipCode('732-0021')).toBe(expectedZipCodeExcludingHyphen);
  });

  test('半角と全角の郵便番号を半角に変換', () => {
    expect(convertZipCode('７３2００２1')).toBe(expectedZipCodeExcludingHyphen);
  });
});
