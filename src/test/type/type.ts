export type Address = {
  zipcode: string;
  pref: string;
  city: string;
  town: string;
};

export type HyphenatedZipCodeAddress = {
  zipcode: HyphenatedZipCode;
  pref: string;
  city: string;
  town: string;
};

export type HyphenatedZipCode = `${string}-${string}`;
