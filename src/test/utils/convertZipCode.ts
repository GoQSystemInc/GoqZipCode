export const convertZipCode = (testZipCode: string): string => {
  const halfWidthZipCode: string = testZipCode.replace(
    /[０-９]/g,
    (s: string) => String.fromCharCode(s.charCodeAt(0) - 65248)
  );

  const halfWidthZipCodeExcludingHyphen = halfWidthZipCode.replaceAll(
    /\D/g,
    ''
  );

  return halfWidthZipCodeExcludingHyphen;
};
