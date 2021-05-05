export type response = {
  address: string
  address_kana: string
  city: string
  city_kana: string
  pref: string
  pref_kana: string
  town: string
  town_kana: string
  zipcode: string
}

export type responses = response[]

export type requestSearchZipCode = {
  zipcode: string
  is_exact: boolean
}
