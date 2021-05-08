// TODO: fetchに変更する
import axios from 'axios'

import { convertZipCode } from './utils/convertZipCode'
import * as app from './types'

export class GoqZipCode {
  static addressJson: string = './assets/zipcodes_min.json'
  static addressData: app.responses = []
  private limit: number = 50

  constructor(limit: number) {
    this.limit = limit
  }

  // 初期化
  // ※ユーザーがinit()した場合、jsonファイルの容量が大きく、
  // 他の動作に支障が出るため、ライブラリ側で実行する
  private static async init() {
    this.addressData = await this.fetchAddressJson(this.addressJson)
  }

  // jsonデータを取得して保持
  private static async fetchAddressJson(json: string): Promise<app.responses> {
    return new Promise(async (resolve, reject) => {
      await axios.get(json)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((e: Error) => {
          // TODO
          reject(e)
        })
    })
  }

  // 郵便番号から検索
  async searchZipcode(data: app.requestSearchZipCode): Promise<app.responses> {
    return new Promise(async (resolve, reject) => {
      const zipCode = convertZipCode(data.zipcode)
      const flag = GoqZipCode.checkLength(data.is_exact, zipCode.length)

      // 郵便番号の桁数が検索条件にマッチしない場合は、以降の検索処理を実行させない
      if (!flag) {
        const message = data.is_exact ? '郵便番号は7文字必要です' : '郵便番号は2文字以上必要です'
        reject(message)
        return
      }

      // jsonデータを取得してない場合
      if (!GoqZipCode.addressData.length) {
        await GoqZipCode.init()
      }

      // データの格納
      const payload: app.response[] = []
      const len: number = GoqZipCode.addressData.length

      // mapやらreduceだとループの途中で抜けられないので
      // 普通のfor文で回すことにする
      for (let i: number = 0; i < len; i++) {
        // データは50件まで
        if (payload.length >= this.limit) break

        const rule:RegExp = new RegExp(`^${zipCode}`)
        const address: app.response = GoqZipCode.addressData[i]

        if (rule.test(address.zipcode)) {
          payload.push(address)
        }
      }

      resolve(payload)
    })
  }

  // 検索条件と郵便番号の桁数によってフラグを返す
  private static checkLength (isExact: boolean, length: number): boolean {
    // 一致検索する場合、7文字でない場合は処理しない
    if (isExact && length !== 7) {
      return false
    }

    // 一致検索でない場合、2文字未満は処理しない
    if (!isExact && length <= 1) {
      return false
    }

    return true
  }
}
