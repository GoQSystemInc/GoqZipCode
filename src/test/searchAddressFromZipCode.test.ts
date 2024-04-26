import { expect } from '@jest/globals';
import { goqZipCode } from './goqZiipCode';
import {
  addresses,
  expectedAddressExcludingHyphenDataList,
  expectedAddressIncludingHyphenDataList,
} from './constants/masterData/address';

describe('convertZipCodeの動作をテスト', () => {
  const expectedZipCodeExcludingHyphen = '7320021';
  test('全角の郵便番号を半角に変換', () => {
    const testZipCodeExcludingHyphen = '７３２００２１';

    expect(goqZipCode.convertZipCode(testZipCodeExcludingHyphen)).toBe(
      expectedZipCodeExcludingHyphen
    );
  });

  test('全角の郵便番号を半角に変換して、ハイフンを削除', () => {
    const testZipCodeIncludingHyphen = '７３２ー００２１';

    expect(goqZipCode.convertZipCode(testZipCodeIncludingHyphen)).toBe(
      expectedZipCodeExcludingHyphen
    );
  });

  test('半角のハイフンを削除', () => {
    const testZipCodeIncludingHyphen = '732-0021';

    expect(goqZipCode.convertZipCode(testZipCodeIncludingHyphen)).toBe(
      expectedZipCodeExcludingHyphen
    );
  });

  test('半角と全角の郵便番号を半角に変換', () => {
    const testZipCodeMixtureFullAndHalf = '７３2００２1';

    expect(goqZipCode.convertZipCode(testZipCodeMixtureFullAndHalf)).toBe(
      expectedZipCodeExcludingHyphen
    );
  });
});

describe('郵便番号が期待する桁数かチェック', () => {
  test('完全一致検索で入力データが7文字ならtrueを返す', () => {
    expect(goqZipCode.checkLength(true, 7)).toBe(true);
  });

  test('完全一致検索で入力データが7文字以外ならfalseを返す', () => {
    expect(goqZipCode.checkLength(true, 8)).toBe(false);
  });

  test('部分一致検索で入力データが2文字以上ならtrueを返す', () => {
    expect(goqZipCode.checkLength(false, 2)).toBe(true);
  });

  test('部分一致検索で入力データが1文字以下の場合はfalseを返す', () => {
    expect(goqZipCode.checkLength(false, 1)).toBe(false);
  });
});

describe('オプションによってハイフンを付与', () => {
  test('オプションでハイフンありを指定している場合、郵便番号にハイフンを追加する', () => {
    expect(goqZipCode.convertHyphenatedZipCode(true, addresses)).toEqual(
      expectedAddressIncludingHyphenDataList
    );
  });

  test('オプションでハイフンなしを指定している場合、郵便番号にハイフンを追加しない', () => {
    expect(goqZipCode.convertHyphenatedZipCode(false, addresses)).toEqual(
      expectedAddressExcludingHyphenDataList
    );
  });
});
