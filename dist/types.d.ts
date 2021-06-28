export declare type response = {
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
export declare type responses = response[];
export declare type requestSearchAddressFromZipcode = {
    zipcode: string;
    is_exact: boolean;
};
export declare type requestSearchZipcodeFromAddress = {
    address: string;
    is_exact: boolean;
    is_left: boolean;
};
export declare type options = {
    limit: number;
    is_hyphen: boolean;
};
