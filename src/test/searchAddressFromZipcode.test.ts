import { expect } from '@jest/globals';
import { addresses } from './constants/masterData/address';
import { expectedadAddressDataListIncludHyphen } from './constants/masterData/address';
import { expectedadAddressDataListExcludingHyphen } from './constants/masterData/address';
import { fullinputZipcodeExcludingHyphen } from './constants/userInput/zipcode';

const goqZipCode = {
  convertZipCode: function (testData: string): string {
    const a: string = testData.replace(/[０-９]/g, (s: string) =>
      String.fromCharCode(s.charCodeAt(0) - 65248)
    );
    const b: RegExpMatchArray | [] = a.match(/\d/g) || [];
    return b.join('');
  },

  checkLength: function (isExact: boolean, length: number) {
    // 完全一致検索の場合は入力データが7文字ちょうどで処理を実行
    if (isExact === true && length !== 7) {
      return false;
    }

    // 部分一致検索の場合は入力データが2文字以上で処理を実行
    if (isExact === false && length <= 1) {
      return false;
    }

    return true;
  },

  convertHyphenatedZipCode: function (testOptionData: boolean) {
    if (testOptionData === false) {
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
    const testDataExcludingHyphen = '７３２００２１';
    const expectedDataExcludingHyphen = '7320021';
  
    expect(goqZipCode.convertZipCode(testDataExcludingHyphen)).toBe(
      expectedDataExcludingHyphen
    );
  });
  
  test('ユーザーによって入力された郵便番号がすべて全角でかつハイフンが入っている場合に、数字は半角になりハイフンが摘出されているか', () => {
    const expectedDataExcludingHyphen = '7320021';
    const testDataIncludingHyphen = '７３２ー００２１';
  
    expect(goqZipCode.convertZipCode(testDataIncludingHyphen)).toBe(
      expectedDataExcludingHyphen
    );
  });
  
  test('ユーザーによって入力された郵便番号が半角と全角の混合の値だった場合に数字をすべて半角に変換', () => {
    const expectedDataExcludingHyphen = '7320021';
    const testDatamixtureFullAndHalf = '７３2００２1';
  
    expect(goqZipCode.convertZipCode(testDatamixtureFullAndHalf)).toBe(
      expectedDataExcludingHyphen
    );
  });
})

test('完全一致検索で入力データが7文字ならtrueを返す', () => {
  expect(goqZipCode.checkLength(true, 7)).toBe(true);
});

test('部分一致検索で入力データが2文字以上ならtrueを返す', () => {
  expect(goqZipCode.checkLength(false, 2)).toBe(true);
})

test('完全一致検索で入力データが7文字以外ならfalseを返す', () => {
  expect(goqZipCode.checkLength(true, 8)).toBe(false);
})

test('部分一致検索で入力データが2文字未満の場合はfalseを返す', () => {
  expect(goqZipCode.checkLength(false, 1)).toBe(false);
})

test('オプションでハイフンありを指定している場合、郵便番号にハイフンを追加する', () => {
  expect(goqZipCode.convertHyphenatedZipCode(false)).toEqual(
    expectedadAddressDataListExcludingHyphen
  );
  expect(goqZipCode.convertHyphenatedZipCode(true)).toEqual(
    expectedadAddressDataListIncludHyphen
  );
});

test('ユーザー入力から取得した郵便番号を元に、完全一致で郵便番号から住所を検索する', () => {
  const expectedData = {
    zipcode: '7320021',
    pref: '広島県',
    city: '広島市東区',
    town: '中山新町',
  };

  const matchAddress = addresses.find(
    (element) => element.zipcode === fullinputZipcodeExcludingHyphen
  );

  expect(matchAddress).toEqual(expectedData);
});
