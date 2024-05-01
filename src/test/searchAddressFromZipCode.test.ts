import { expect } from '@jest/globals';
import { goqZipCode } from './goqZipCode';
import { addresses } from './constants/address';
import { addressExcludingHyphenDataList } from './constants';
import { addressIncludingHyphenDataList } from './constants';

describe('オプションによってハイフンを付与', () => {
  test('オプションでハイフンありを指定している場合、郵便番号にハイフンを追加する', () => {
    expect(goqZipCode.convertHyphenatedZipCode(true, addresses)).toEqual(
      addressIncludingHyphenDataList
    );
  });

  test('オプションでハイフンなしを指定している場合、郵便番号にハイフンを追加しない', () => {
    expect(goqZipCode.convertHyphenatedZipCode(false, addresses)).toEqual(
      addressExcludingHyphenDataList
    );
  });
});
