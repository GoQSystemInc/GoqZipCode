import type { HyphenatedZipCode } from '../type/type';

export const convertHyphenatedZipCode = (
  zipCode: string
): HyphenatedZipCode => {
  return `${zipCode.slice(0, 3)}-${zipCode.slice(3)}`;
};
