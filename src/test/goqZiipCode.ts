import type { Address } from './type';

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
    hasOptionHyphen: boolean,
    addresses: Address[]
  ): Address[] {
    if (hasOptionHyphen === false) {
      return addresses;
    }

    return addresses.map((address) => {
      return {
        ...address,
        zipcode: `${address.zipcode.slice(0, 3)}-${address.zipcode.slice(3)}`,
      };
    });
  },

  searchMachingZipCode: function (
    addresses: Address[],
    zipCode: string
  ): Address | string {
    const matchAddress = addresses.find(
      (address) => address.zipcode === zipCode
    );

    return matchAddress;
  },
};
