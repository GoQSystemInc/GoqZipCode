import * as app from './types';
/**
 * 住所を検索
 */
export declare class GoqZipCode {
    static addressJson: string;
    static addressData: app.responses;
    static isFetching: boolean;
    private options;
    /**
     * @param {app.options} options - オプション
     */
    constructor(options?: app.options);
    /**
     * 初期化
     * ※ユーザーがinit()した場合、jsonファイルの容量が大きく、
     * 他の動作に支障が出るため、ライブラリ側で実行する
     * @module init
     */
    private static init;
    /**
     * jsonデータを取得して保持
     * @module fetchAddressJson
     * @param {string} path - 住所一覧のjsonファイルが入った、zipファイルのパス
     * @return {Promise<Blob>} Blob
     */
    private static fetchAddressJson;
    /**
     * 全角の数字を半角に変換 ハイフンが入っていても数字のみの抽出
     * @module convertZipCode
     * @param {string} zipCode - 郵便番号
     * @return {string} 変換後の郵便番号
     */
    private static convertZipCode;
    /**
     * 検索条件と郵便番号の桁数によってフラグを返す
     * @module checkLength
     * @param {boolean} isExact - 検索条件
     * @param {number} length - 郵便番号の文字数
     * @return {boolean} trueかfalseか
     */
    private static checkLength;
    /**
     * オプションでハイフンありを指定している場合、郵便番号にハイフンを追加する
     * @param {app.response[]} addresses - 住所一覧
     * @param {app.options} options - オプション
     * @returns {app.response[]} 変換後の住所一覧
     */
    static convertHyphenatedZipCode(addresses: app.response[], options: app.options): app.response[];
    /**
     * 郵便番号から検索
     * @param {app.requestSearchAddressFromZipcode} data - 郵便番号と検索条件
     * @return {Promise<app.responses>} 検索結果（条件に合う住所またはエラー文）
     */
    searchAddressFromZipcode(data: app.requestSearchAddressFromZipcode): Promise<app.responses>;
    /**
     * 住所から検索
     * @param {app.requestSearchZipcodeFromAddress} data - 住所と検索条件
     * @return {Promise<app.responses>} 検索結果（条件に合う住所またはエラー文）
     */
    searchZipcodeFromAddress(data: app.requestSearchZipcodeFromAddress): Promise<app.responses>;
}
