export type response = {
  address: string;
  city: string;
  pref: string;
  town: string;
  zipcode: string;
};

export type responses = response[];

export type requestSearchAddressFromZipcode = {
  zipcode: string;
  is_exact?: boolean;
};

export type requestSearchZipcodeFromAddress = {
  address: string;
  is_exact?: boolean;
  is_left?: boolean;
};

export type options = {
  limit?: number;
  is_hyphen?: boolean;
};
