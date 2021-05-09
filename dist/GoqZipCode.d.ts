import * as app from './types';
export declare class GoqZipCode {
    static addressJson: string;
    static addressData: app.responses;
    private limit;
    constructor(limit: number);
    private static init;
    private static fetchAddressJson;
    private static convertZipCode;
    private static checkLength;
    searchAddressFromZipcode(data: app.requestSearchAddressFromZipcode): Promise<app.responses>;
    searchZipcodeFromAddress(data: app.requestSearchZipcodeFromAddress): Promise<app.responses>;
}
