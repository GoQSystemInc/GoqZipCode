import { expect } from '@jest/globals';
import {
  addresses,
  expectedAddressExcludingHyphenDataList,
  expectedAddressIncludeHyphenDataList,
} from './constants/masterData/address';
import { fullInputZipcodeExcludingHyphen } from './constants/userInput/zipcode';

const goqZipCode = {
  convertZipCode: function (testZipcode: string): string {
    const a: string = testZipcode.replace(/[０-９]/g, (s: string) =>
      String.fromCharCode(s.charCodeAt(0) - 65248)
    );
    const b: RegExpMatchArray | [] = a.match(/\d/g) || [];
    return b.join('');
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

  convertHyphenatedZipCode: function (hasOptionHyphen: boolean) {
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

describe('convertZipCodeの動作をテストする', () => {
  test('ユーザーによって入力された郵便番号がすべて全角の時にすべて半角に変換', () => {
    const testZipcodeExcludingHyphen = '７３２００２１';
    const expectedZipcodeExcludingHyphen = '7320021';

    expect(goqZipCode.convertZipCode(testZipcodeExcludingHyphen)).toBe(
      expectedZipcodeExcludingHyphen
    );
  });

  test('ユーザーによって入力された郵便番号がすべて全角でかつハイフンが入っている場合に、数字は半角になりハイフンが摘出されているか', () => {
    const expectedZipcodeExcludingHyphen = '7320021';
    const testZipcodeIncludingHyphen = '７３２ー００２１';

    expect(goqZipCode.convertZipCode(testZipcodeIncludingHyphen)).toBe(
      expectedZipcodeExcludingHyphen
    );
  });

  test('ユーザーによって入力された郵便番号が半角と全角の混合の値だった場合に数字をすべて半角に変換', () => {
    const expectedZipcodeExcludingHyphen = '7320021';
    const testZipcodeMixtureFullAndHalf = '７３2００２1';

    expect(goqZipCode.convertZipCode(testZipcodeMixtureFullAndHalf)).toBe(
      expectedZipcodeExcludingHyphen
    );
  });
});

describe('checkLengthの動作をテストする', () => {
  test('完全一致検索で入力データが7文字ならtrueを返す', () => {
    expect(goqZipCode.checkLength(true, 7)).toBe(true);
  });

  test('部分一致検索で入力データが2文字以上ならtrueを返す', () => {
    expect(goqZipCode.checkLength(false, 2)).toBe(true);
  });

  test('完全一致検索で入力データが7文字以外ならfalseを返す', () => {
    expect(goqZipCode.checkLength(true, 8)).toBe(false);
  });

  test('部分一致検索で入力データが2文字未満の場合はfalseを返す', () => {
    expect(goqZipCode.checkLength(false, 1)).toBe(false);
  });
});

describe('convertHyphenatedZipCode', () => {
  test('オプションでハイフンありを指定している場合、郵便番号にハイフンを追加する', () => {
    expect(goqZipCode.convertHyphenatedZipCode(true)).toEqual(
      expectedAddressIncludeHyphenDataList
    );
  });

  test('オプションでハイフンなしを指定している場合、郵便番号にハイフンを追加しない', () => {
    expect(goqZipCode.convertHyphenatedZipCode(false)).toEqual(
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
    (element) => element.zipcode === fullInputZipcodeExcludingHyphen
  );

  expect(matchAddress).toEqual(expectedAddressData);
});
