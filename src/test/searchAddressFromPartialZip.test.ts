import { expect } from '@jest/globals';
import { goqZipCode } from './utils/goqZipCode';
import { addresses } from './constants';

test('郵便番号が部分一致する住所を検索', () => {
  const expectedAddressDatalist = [
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
  ];

  expect(goqZipCode.searchAddressFromPartialZip(addresses)).toEqual(
    expectedAddressDatalist
  );
});
