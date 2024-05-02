import type { HyphenatedZipCode } from './type/type';

export const goqZipCode = {
  convertZipCode: function (testZipCode: string): string {
    const halfWidthZipCode: string = testZipCode.replace(
      /[０-９]/g,
      (s: string) => String.fromCharCode(s.charCodeAt(0) - 65248)
    );

    const halfWidthZipCodeExcludingHyphen = halfWidthZipCode.replaceAll(
      /\D/g,
      ''
    );

    return halfWidthZipCodeExcludingHyphen;
  },

  checkLength: function (isExact: boolean, length: number): boolean {
    if (isExact === true && length === 7) {
      return true;
    }

    if (isExact === false && length >= 2 && length <= 7) {
      return true;
    }

    return false;
  },

  convertHyphenatedZipCode: function (
    zipCode: string | HyphenatedZipCode
  ): HyphenatedZipCode | string {
    return `${zipCode.slice(0, 3)}-${zipCode.slice(3)}`;
  },
};
