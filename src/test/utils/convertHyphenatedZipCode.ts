import type { HyphenatedZipCode } from '../types/type';

export const convertHyphenatedZipCode = (
  zipCode: string
): HyphenatedZipCode => {
  return `${zipCode.slice(0, 3)}-${zipCode.slice(3)}`;
};
