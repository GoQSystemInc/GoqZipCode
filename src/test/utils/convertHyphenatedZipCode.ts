import type { HyphenatedZipCode } from '../type/type';

export const convertHyphenatedZipCode = (
  zipCode: string | HyphenatedZipCode
): HyphenatedZipCode | string => {
  return `${zipCode.slice(0, 3)}-${zipCode.slice(3)}`;
};
