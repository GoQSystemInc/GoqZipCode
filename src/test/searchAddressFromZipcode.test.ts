import { expect } from '@jest/globals';
import {
  addresses,
  expectedAddressExcludingHyphenDataList,
  expectedAddressIncludeHyphenDataList,
} from './constants/masterData/address';
import { fullInputZipCodeExcludingHyphen } from './constants/userInput/zipcode';

import type { Addresses } from './type'

const goqZipCode = {
  convertZipCode: function (testZipCode: string): string {
    const a: string = testZipCode.replace(/[０-９]/g, (s: string) =>
      String.fromCharCode(s.charCodeAt(0) - 65248)
    );
    
    const b = a.replaceAll(/\D/g, '')
    return b;
  },

  checkLength: function (isExact: boolean, length: number) {
    if (isExact === true && length !== 7) {
      return false;
    }

    if (isExact === false && length <= 1) {
      return false;
    }

    return true;
  },

  convertHyphenatedZipCode: function (hasOptionHyphen: boolean, addresses:Addresses) {
    if (hasOptionHyphen === false) {
      return addresses;
    }

    return addresses.map((address) => {
      return {
        ...address,
        zipcode: `${address.zipcode.slice(0, 3)}-${address.zipcode.slice(3)}`,
      };
    });
  },
};

describe('convertZipCodeの動作をテスト', () => {
  test('全角の郵便番号を半角に変換', () => {
    const expectedZipCodeExcludingHyphen = '7320021';
    const testZipCodeExcludingHyphen = '７３２００２１';

    expect(goqZipCode.convertZipCode(testZipCodeExcludingHyphen)).toBe(
      expectedZipCodeExcludingHyphen
    );
  });

  test('全角の郵便番号を半角に変換して、ハイフンを削除', () => {
    const expectedZipCodeExcludingHyphen = '7320021';
    const testZipCodeIncludingHyphen = '７３２ー００２１';

    expect(goqZipCode.convertZipCode(testZipCodeIncludingHyphen)).toBe(
      expectedZipCodeExcludingHyphen
    );
  });

  test('全角のみ半角に変換', () => {
    const expectedZipCodeExcludingHyphen = '7320021';
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
      expectedAddressIncludeHyphenDataList
    );
  });

  test('オプションでハイフンなしを指定している場合、郵便番号にハイフンを追加しない', () => {
    expect(goqZipCode.convertHyphenatedZipCode(false, addresses)).toEqual(
      expectedAddressExcludingHyphenDataList
    );
  });
});

test('ユーザー入力から取得した郵便番号を元に、完全一致で郵便番号から住所を検索する', () => {
  const expectedAddressData = {
    zipcode: '7320021',
    pref: '広島県',
    city: '広島市東区',
    town: '中山新町',
  };

  const matchAddress = addresses.find(
    (element) => element.zipcode === fullInputZipCodeExcludingHyphen
  );

  expect(matchAddress).toEqual(expectedAddressData);
});
