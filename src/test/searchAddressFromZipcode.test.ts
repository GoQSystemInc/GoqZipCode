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
  const expectedadAddressDataListIncludHyphen = [
    {
      zipcode: '734-0001',
      pref: '広島県',
      city: '広島市南区',
      town: '出汐',
    },
    {
      zipcode: '734-0002',
      pref: '広島県',
      city: '広島市南区',
      town: '西旭町',
    },
    {
      zipcode: '734-0003',
      pref: '広島県',
      city: '広島市南区',
      town: '宇品東',
    },
    {
      zipcode: '734-0004',
      pref: '広島県',
      city: '広島市南区',
      town: '宇品神田',
    },
    {
      zipcode: '734-0005',
      pref: '広島県',
      city: '広島市南区',
      town: '翠',
    },
    {
      zipcode: '732-0021',
      pref: '広島県',
      city: '広島市東区',
      town: '中山新町',
    },
    {
      zipcode: '732-0057',
      pref: '広島県',
      city: '広島市東区',
      town: '二葉の里',
    },
    {
      zipcode: '732-0061',
      pref: '広島県',
      city: '広島市東区',
      town: '牛田山',
    },
    {
      zipcode: '732-0062',
      pref: '広島県',
      city: '広島市東区',
      town: '牛田早稲田',
    },
  ];

  const expectedadAddressDataListExcludingHyphen = [
    {
      zipcode: '7340001',
      pref: '広島県',
      city: '広島市南区',
      town: '出汐',
    },
    {
      zipcode: '7340002',
      pref: '広島県',
      city: '広島市南区',
      town: '西旭町',
    },
    {
      zipcode: '7340003',
      pref: '広島県',
      city: '広島市南区',
      town: '宇品東',
    },
    {
      zipcode: '7340004',
      pref: '広島県',
      city: '広島市南区',
      town: '宇品神田',
    },
    {
      zipcode: '7340005',
      pref: '広島県',
      city: '広島市南区',
      town: '翠',
    },
    {
      zipcode: '7320021',
      pref: '広島県',
      city: '広島市東区',
      town: '中山新町',
    },
    {
      zipcode: '7320057',
      pref: '広島県',
      city: '広島市東区',
      town: '二葉の里',
    },
    {
      zipcode: '7320061',
      pref: '広島県',
      city: '広島市東区',
      town: '牛田山',
    },
    {
      zipcode: '7320062',
      pref: '広島県',
      city: '広島市東区',
      town: '牛田早稲田',
    },
  ];

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
  }

  expect(convertHyphenatedZipCode(false)).toEqual(expectedadAddressDataListExcludingHyphen)
  expect(convertHyphenatedZipCode(true)).toEqual(expectedadAddressDataListIncludHyphen)
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
