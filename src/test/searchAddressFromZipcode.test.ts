import { expect } from '@jest/globals';
import { addresses } from '../../constants/masterData/address';
import { fullinputZipcodeExcludingHyphen } from '../../constants/userInput/zipcode';

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
    return b.join('')
  }

  expect(convertZipCode(testDataExcludingHyphen)).toBe(expectedDataExcludingHyphen)
  expect(convertZipCode(testDataIncludingHyphen)).toBe(expectedDataExcludingHyphen)
  expect(convertZipCode(testDatamixtureFullAndHalf)).toBe(expectedDataExcludingHyphen)
});

test('オプションでハイフンありを指定している場合、郵便番号にハイフンを追加する', () => {
  const testOptionData = false;
  const testZipcodeData = '7320021';
  const expectedDataIncludingHyphen = '732-0021';
  const expectedDataExcludingHyphen = '7320021';
})

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
