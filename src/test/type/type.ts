export type Address<ZipCode extends string> = {
  zipcode: ZipCode;
  pref: string;
  city: string;
  town: string;
};

export type UnHyphenatedZipCode = `${string}`;
export type HyphenatedZipCode = `${string}-${string}`;
