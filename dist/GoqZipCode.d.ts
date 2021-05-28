import * as app from './types';
export declare class GoqZipCode {
    static addressJson: string;
    static addressData: app.responses;
    static isFetching: boolean;
    private options;
    constructor(options?: app.options);
    private static init;
    private static fetchAddressJson;
    private static convertZipCode;
    private static checkLength;
    static convertHyphenatedZipCode(addresses: app.response[], options: app.options): app.response[];
    searchAddressFromZipcode(data: app.requestSearchAddressFromZipcode): Promise<app.responses>;
    searchZipcodeFromAddress(data: app.requestSearchZipcodeFromAddress): Promise<app.responses>;
}
