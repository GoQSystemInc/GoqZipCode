import JSZip from 'jszip';

import * as app from './types';

export class GoqZipCode {
  static addressJson: string =
    'https://goqform-zipcode.s3-ap-northeast-1.amazonaws.com/data/zipcodes_min.json.zip';
  static addressData: app.responses = [];
  static isFetching: boolean = false;
  private limit: number = 50;
  private options: app.options = {
    is_hyphen: false
  };

  // TODO: カナありなしのオプションつけたい
  constructor(limit: number, options: app.options) {
    this.limit = limit;
    this.options = {
      ...this.options,
      ...options
    };
  }

  // 初期化
  // ※ユーザーがinit()した場合、jsonファイルの容量が大きく、
  // 他の動作に支障が出るため、ライブラリ側で実行する
  private static async init() {
    // 二重取得防止
    if (this.isFetching === true) return;
    this.isFetching = true;

    const zip: Blob = await this.fetchAddressJson(this.addressJson);

    // zipファイルを解凍
    const addressJson: string | undefined = await JSZip.loadAsync(zip).then(
      (zip: JSZip) => {
        return zip.file('zipcodes_min.json')?.async('text');
      }
    );

    if (addressJson) {
      this.addressData = await JSON.parse(addressJson);
    }

    this.isFetching = false;
  }

  // jsonデータを取得して保持
  private static async fetchAddressJson(path: string): Promise<Blob> {
    return new Promise(async (resolve, reject) => {
      await fetch(path)
        .then((data) => {
          resolve(data.blob());
        })
        .catch((e: Error) => {
          // TODO
          reject(e);
        });
    });
  }

  // 全角の数字を半角に変換 ハイフンが入っていても数字のみの抽出
  private static convertZipCode(zipCode: string): string {
    const a: string = zipCode.replace(/[０-９]/g, (s: string) =>
      String.fromCharCode(s.charCodeAt(0) - 65248)
    );
    const b: RegExpMatchArray = a.match(/\d/g) || [];

    return b.join('');
  }

  // 検索条件と郵便番号の桁数によってフラグを返す
  private static checkLength(isExact: boolean, length: number): boolean {
    // 一致検索する場合、7文字でない場合は処理しない
    if (isExact === true && length !== 7) {
      return false;
    }

    // 一致検索でない場合、2文字未満は処理しない
    if (isExact === false && length <= 1) {
      return false;
    }

    return true;
  }

  // オプションで指定している場合、郵便番号にハイフンを追加する
  static convertHyphenatedZipCode(addresses: app.response[], options: app.options): app.response[] {
    if (options.is_hyphen === false) {
      return addresses;
    }

    return addresses.map((address) => {
      return {
        ...address,
        zipcode: `${address.zipcode.slice(0, 3)}-${address.zipcode.slice(3)}`
      };
    });
  }

  // 郵便番号から検索
  async searchAddressFromZipcode(
    data: app.requestSearchAddressFromZipcode
  ): Promise<app.responses> {
    return new Promise(async (resolve, reject) => {
      const zipCode: string = GoqZipCode.convertZipCode(data.zipcode);
      const flag: boolean = GoqZipCode.checkLength(
        data.is_exact,
        zipCode.length
      );

      // 郵便番号の桁数が検索条件にマッチしない場合は、以降の検索処理を実行させない
      if (flag === false) {
        const message = data.is_exact
          ? '郵便番号は7文字必要です'
          : '郵便番号は2文字以上必要です';
        reject(message);
        return;
      }

      // jsonデータを取得してない場合
      if (GoqZipCode.addressData.length === 0) {
        await GoqZipCode.init();
      }

      // 一致検索の場合
      if (data.is_exact === true) {
        // 郵便番号7桁とマッチするデータを探す
        const matchAddress: app.response | undefined =
          GoqZipCode.addressData.find((element) => element.zipcode === zipCode);

        // データがないならreject
        if (matchAddress === undefined) {
          reject('指定の郵便番号に一致する住所は見つかりませんでした');
          return;
        }

        const payload = GoqZipCode.convertHyphenatedZipCode([matchAddress], this.options);
        resolve(payload);
        return;
      }

      // 一致検索でない場合
      const matchAddresses: app.response[] = [];
      const len: number = GoqZipCode.addressData.length;

      // mapやらreduceだとループの途中で抜けられないので
      // 普通のfor文で回すことにする
      for (let i: number = 0; i < len; i++) {
        // データはlimit(default: 50)で指定した件数まで
        if (matchAddresses.length >= this.limit) break;

        const rule: RegExp = new RegExp(`^${zipCode}`);
        const address: app.response = GoqZipCode.addressData[i];

        if (rule.test(address.zipcode) === true) {
          matchAddresses.push(address);
        }
      }

      const payload = GoqZipCode.convertHyphenatedZipCode(matchAddresses, this.options);
      resolve(payload);
    });
  }

  // 住所から検索
  async searchZipcodeFromAddress(
    data: app.requestSearchZipcodeFromAddress
  ): Promise<app.responses> {
    return new Promise(async (resolve, reject) => {
      // 住所が3文字未満の場合は、以降の検索処理を実行させない
      if (data.address.length <= 2) {
        const message = '住所は3文字以上必要です';
        reject(message);
        return;
      }

      // jsonデータを取得してない場合
      if (GoqZipCode.addressData.length === 0) {
        await GoqZipCode.init();
      }

      // 一致検索の場合
      if (data.is_exact === true) {
        // 住所とマッチするデータを探す
        const matchAddress: app.response | undefined =
          GoqZipCode.addressData.find((element) => {
            const fullAddress: string = `${element.pref}${element.city}${element.town}`;
            const fullKanaAddress: string = `${element.pref_kana}${element.city_kana}${element.town_kana}`;

            return (
              fullAddress === data.address || fullKanaAddress === data.address
            );
          });

        // データがないならreject
        if (matchAddress === undefined) {
          reject('指定の住所に一致する郵便番号は見つかりませんでした');
          return;
        }

        const payload = GoqZipCode.convertHyphenatedZipCode([matchAddress], this.options);
        resolve(payload);
        return;
      }

      // 一致検索でない場合
      const matchAddresses: app.response[] = [];
      const len: number = GoqZipCode.addressData.length;

      // mapやらreduceだとループの途中で抜けられないので
      // 普通のfor文で回すことにする
      for (let i: number = 0; i < len; i++) {
        // データはlimit(default: 50)で指定した件数まで
        if (matchAddresses.length >= this.limit) break;

        const address: app.response = GoqZipCode.addressData[i];
        const fullAddress: string = `${address.pref}${address.city}${address.town}`;
        const fullKanaAddress: string = `${address.pref_kana}${address.city_kana}${address.town_kana}`;

        // 前方一致か部分一致か
        if (data.is_left) {
          if (
            fullAddress.startsWith(data.address) === true ||
            fullKanaAddress.startsWith(data.address) === true
          ) {
            matchAddresses.push(address);
          }
        } else {
          if (
            fullAddress.includes(data.address) === true ||
            fullKanaAddress.includes(data.address) === true
          ) {
            matchAddresses.push(address);
          }
        }
      }

      const payload = GoqZipCode.convertHyphenatedZipCode(matchAddresses, this.options);
      resolve(payload);
    });
  }
}
