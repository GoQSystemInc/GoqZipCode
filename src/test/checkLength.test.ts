import { expect } from '@jest/globals';
import { goqZipCode } from './goqZipCode';

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
