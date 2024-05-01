import { expect } from '@jest/globals';
import { goqZipCode } from './utils/goqZipCode';
import { addresses } from './constants';

describe('郵便番号で住所データ検索', () => {
  test('郵便番号で検索して住所データを取得', () => {
    const expectedAddressData = {
      zipcode: '7340001',
      pref: '広島県',
      city: '広島市南区',
      town: '出汐',
    };

    expect(goqZipCode.searchMachingZipCode(addresses, '7340001')).toEqual(
      expectedAddressData
    );
  });

  test('郵便番号検索で一致するデータがない旨メッセージ表示', () => {
    expect(goqZipCode.searchMachingZipCode(addresses, '7330001')).toBe(
      '指定の住所に一致する郵便番号は見つかりませんでした'
    );
  });
});
