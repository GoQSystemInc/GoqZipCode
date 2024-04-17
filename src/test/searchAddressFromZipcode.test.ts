import { expect } from '@jest/globals';
import { addresses } from '../../constants/masterData/address';
import { expectedadAddressDataListIncludHyphen } from '../../constants/masterData/address';
import { expectedadAddressDataListExcludingHyphen } from '../../constants/masterData/address';
import { fullinputZipcodeExcludingHyphen } from '../../constants/userInput/zipcode';
import { NumericDictionary } from 'cypress/types/lodash';

test('ユーザー入力から取得した郵便番号の全角数字を半角に変換 ハイフンが入っていても数字のみの抽出', () => {
  const testDataExcludingHyphen = '７３２００２１';
  const testDataIncludingHyphen = '７３２ー００２１';
  const testDatamixtureFullAndHalf = '７３2００２1';
  const expectedDataExcludingHyphen = '7320021';

  const convertZipCode = (testData: string): string => {
    const a: string = testData.replace(/[０-９]/g, (s: string) =>
      String.fromCharCode(s.charCodeAt(0) - 65248)
    );
    const b: RegExpMatchArray = a.match(/\d/g) || [];
    return b.join('');
  };

  expect(convertZipCode(testDataExcludingHyphen)).toBe(
    expectedDataExcludingHyphen
  );
  expect(convertZipCode(testDataIncludingHyphen)).toBe(
    expectedDataExcludingHyphen
  );
  expect(convertZipCode(testDatamixtureFullAndHalf)).toBe(
    expectedDataExcludingHyphen
  );
});

test('検索条件と郵便番号の桁数によって処理するか否かのフラグを返す', () => {
  const isExactTrue = true;
  const isExactFalse = false;
  const lengthNotSeven = 8;
  const lengthSeven = 7;
  const lengthLessThanTwo = 1;
  const lengthTwo = 2;
  let flag = true;

  const checkLength = (isExact: boolean, length: number) => {
    // 完全一致検索の場合は入力データが7文字ちょうどで処理を実行
    if (isExact === true && length !== 7) {
      return (flag = false);
    }

    // 部分一致検索の場合は入力データが2文字以上で処理を実行
    if (isExact === false && length <= 1) {
      return (flag = false);
    }

    return (flag = true);
  };

  // 完全一致検索で入力データが7文字なら処理が実行されるか
  expect(checkLength(isExactTrue, lengthSeven)).toBe(true);

  // 部分一致検索で入力データが2文字以上なら処理が実行されるか
  expect(checkLength(isExactFalse, lengthTwo)).toBe(true);

  // 完全一致検索の場合は7文字以外の場合は処理が実行されないか
  expect(checkLength(isExactTrue, lengthNotSeven)).toBe(false);

  // 部分一致検索の場合は2文字未満の場合は処理されないか
  expect(checkLength(isExactFalse, lengthLessThanTwo)).toBe(false);
});

test('オプションでハイフンありを指定している場合、郵便番号にハイフンを追加する', () => {
  const testOptionData = false;
  const testZipcodeData = '7320021';

  const convertHyphenatedZipCode = (testOptionData: boolean) => {
    if (testOptionData === false) {
      return addresses;
    }

    return addresses.map((address) => {
      return {
        ...address,
        zipcode: `${address.zipcode.slice(0, 3)}-${address.zipcode.slice(3)}`,
      };
    });
  };

  expect(convertHyphenatedZipCode(false)).toEqual(
    expectedadAddressDataListExcludingHyphen
  );
  expect(convertHyphenatedZipCode(true)).toEqual(
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
