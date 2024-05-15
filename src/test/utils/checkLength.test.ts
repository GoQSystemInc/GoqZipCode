import { expect } from '@jest/globals';
import { checkLength } from '.';

describe('郵便番号が期待する桁数かチェック', () => {
  test('完全一致検索で入力データが7文字ならtrueを返す', () => {
    expect(checkLength(true, 7)).toBe(true);
  });
  
  test('完全一致検索で入力データが6文字以下ならfalseを返す', () => {
    expect(checkLength(true, 6)).toBe(false);
  });

  test('完全一致検索で入力データが0文字ならfalseを返す', () => {
    expect(checkLength(true, 0)).toBe(false);
  });

  test('完全一致検索で入力データが7文字以上ならfalseを返す', () => {
    expect(checkLength(true, 8)).toBe(false);
  });

  test('部分一致検索で入力データが2文字以上ならtrueを返す', () => {
    expect(checkLength(false, 2)).toBe(true);
  });

  test('部分一致検索で入力データが1文字以下の場合はfalseを返す', () => {
    expect(checkLength(false, 1)).toBe(false);
  });
});
