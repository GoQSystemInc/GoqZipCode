import { expect } from '@jest/globals';
import { addresses } from '../../constants/masterData/address';
import { fullinputZipcodeExcludingHyphen } from '../../constants/userInput/zipcode';

test('ユーザー入力から取得した郵便番号の全角数字を半角に変換 ハイフンが入っていても数字のみの抽出', () => {
  const testDataExcludingHyphen = '７３２００２１';
  const testDataIncludingHyphen = '７３２ー００２１';
  const expectedDataExcludingHyphen = '7320021';
  const expectedDataIncludingHyphen = '732ー0021';
  const a: string = testData.replace(/[０-９]/g, (s: string) =>
    String.fromCharCode(s.charCodeAt(0) - 65248)
  );
  const b: RegExpMatchArray = a.match(/\d/g) || [];

  expect(b.join('')).toBe(expectedData)
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

// TODO:非同期でrejectされた時のテストどうやって書くか検討がつかいないので、一旦保留
// test('ユーザーから受け取ったデータがマスタデータと合致しない場合はアラート出力', () => {
//   const matchAddress = undefined;
//   if (matchAddress === undefined) {
//     return expect('指定の郵便番号に一致する住所は見つかりませんでした').rejects.toMatch('指定の郵便番号に一致する住所は見つかりませんでした');;
//   }
// })
