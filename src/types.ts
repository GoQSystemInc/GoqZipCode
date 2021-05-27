export type response = {
  address: string;
  address_kana: string;
  city: string;
  city_kana: string;
  pref: string;
  pref_kana: string;
  town: string;
  town_kana: string;
  zipcode: string;
};

export type responses = response[];

export type requestSearchAddressFromZipcode = {
  zipcode: string;
  is_exact: boolean;
};

export type requestSearchZipcodeFromAddress = {
  address: string;
  is_exact: boolean;
  is_left: boolean;
};

export type options = {
  limit: number;
  is_hyphen: boolean;
};
