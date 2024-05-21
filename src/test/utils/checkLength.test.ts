import { expect } from '@jest/globals';
import { checkLength } from '.';

describe('完全一致検索時の桁数はチェック', () => {
  test('完全一致検索で入力データが7文字ならtrueを返す', () => {
    expect(checkLength(true, 7)).toBe(true);
  });

  test('完全一致検索で入力データが7文字以外ならfalseを返す', () => {
    expect(checkLength(true, 0)).toBe(false);
    expect(checkLength(true, 2)).toBe(false);
    expect(checkLength(true, 4)).toBe(false);
    expect(checkLength(true, 6)).toBe(false);
    expect(checkLength(true, 8)).toBe(false);
    expect(checkLength(true, 10)).toBe(false);
  });

  test('部分一致検索で入力データが2文字以上ならtrueを返す', () => {
    expect(checkLength(false, 2)).toBe(true);
    expect(checkLength(false, 4)).toBe(true);
    expect(checkLength(false, 8)).toBe(true);
    expect(checkLength(false, 10)).toBe(true);
  });

  test('部分一致検索で入力データが1文字以下の場合はfalseを返す', () => {
    expect(checkLength(false, 0)).toBe(false);
    expect(checkLength(false, 1)).toBe(false);
  });
});
