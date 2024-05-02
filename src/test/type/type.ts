export type UnHyphenatedZipCodeAddress = {
  zipcode: string;
  pref: string;
  city: string;
  town: string;
};

export type HyphenatedZipCodeAddress = {
  zipcode: `${string}-${string}`;
  pref: string;
  city: string;
  town: string;
};

export type UnHyphenatedZipCode = `${number}`;
export type HyphenatedZipCode = `${number}-${number}`;
